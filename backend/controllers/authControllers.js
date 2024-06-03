const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const User = require('./../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');
const customDate = require('./../features/dates');
const { log } = require('console');

// Function to sign a JWT token with user id
const signToken = id => {
  console.log('signToken');
  return jwt.sign({ id, iat: Date.now() }, process.env.JWT_SECRET);
};

// Function to create and send a token to the client
const createSendToken = (user, statusCode, res) => {
  console.log(customDate.getFormatDate());

  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
  };
  console.log('createSendToken' , token, '\n', cookieOptions );
  res.cookie('jwt', token, cookieOptions);
  console.log('createSendToken2');
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};



// Middleware to protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  console.log(345);
  let token;
  if (req.headers.cookie) {
    token = req.headers.cookie.split('=')[1];
  }
  if (!token) return next(new AppError('Please login', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded) return next(new AppError('Token is invalid or has expired', 401));

  const user = await User.findById(decoded.id);

  if (!user) return next(new AppError('The user belonging to this token does no longer exist', 401));

  req.user = user;
  next();
});

// Controller for user login
exports.login = asyncHandler(async (req, res, next) => {
  console.log('login');
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Email or password is missing', 400));
  const user = await User.findOne({ email }).select('+password');
  console.log(user);
  if (!user || !await user.checkPassword(password, user.password)) return next(new AppError('Email or password is incorrect', 401));
  createSendToken(user, 200, res);
});


// Logout function
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
});


exports.register = asyncHandler(async (req, res, next) => {
  console.log('register1');
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;
  if (!email || !firstName || !lastName || !password || !phoneNumber || !role) return next(new AppError('Request details are missing', 400));
  console.log('register2');
  console.log('register3');
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    role,
  });
  console.log('register4');
  createSendToken(newUser, 201, res);
});


// Middleware to protect routes
exports.protect1 = asyncHandler(async (req, res, next) => {
  //if (!req.headers.cookie) return next(new AppError(403, 'Please login'))     
  if (!req.headers.cookie) return next()
  const token = req.headers.cookie.split('=')[1]
  if (!token) return next(new AppError(403, 'Please login'))
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  if (!decoded) return next(new AppError(403, 'Please login'))
  const { id } = decoded
  const user = await User.findById(id)
  if (!user) return next(new AppError(400, 'Please register'))
  req.user = user
  console.log('protect');
  next()
})


// Middleware to restrict routes to certain user roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};
exports.forgetPassword = asyncHandler(async (req, res, next) => {
  // Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // Generate the random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

  // Save the hashed token and expiration time to the user document
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpires = resetPasswordExpires;
  await user.save({ validateBeforeSave: false });

  // Log the reset token
  console.log(`Reset token (raw): ${resetToken}`);
  console.log(`Reset token (hashed): ${resetPasswordToken}`);

  // Send the reset token to the user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Log the received token
  console.log(`Received reset token: ${req.params.token}`);

  // Get user based on the token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }
  });

  // Log the hashed token
  console.log(`Hashed reset token: ${hashedToken}`);

  // If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  // Log the user in, send JWT
  createSendToken(user, 200, res);
});