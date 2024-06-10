const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const User = require('./../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');
const customDate = require('./../features/dates');
const {log} = require('console')



// TOKEN

const signToken = id => {
  return jwt.sign({ id, iat: Date.now() }, process.env.JWT_SECRET);
};


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
  console.log('createSendToken', token, '\n', cookieOptions);
  res.cookie('jwt', token, cookieOptions);
  console.log('createSendToken2');
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};



// ROUTE PROTECTION

exports.protect = asyncHandler(async (req, res, next) => {
  console.log('protect', customDate.getFormatDate(), '\n', req.headers.cookie);
  let token;
  if (req.headers.cookie) {
    token = req.headers.cookie.split('=')[1];
  }
  if (!token) return console.log('protect', new AppError('Please login', 401));
  if (!token) return next(new AppError('Please login', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log('protect2', decoded);
  if (!decoded) return next(new AppError('Token is invalid or has expired', 401));

  const user = await User.findById(decoded.id);

  if (!user) return next(new AppError('The user belonging to this token does no longer exist', 401));

  req.user = user;
  next();
});



exports.login = asyncHandler(async (req, res, next) => {
  console.log('login');
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Email or password is missing', 400));
  const user = await User.findOne({ email }).select('+password');
  console.log(user);
  if (!user || !await user.checkPassword(password, user.password)) return next(new AppError('Email or password is incorrect', 401));
  createSendToken(user, 200, res);
});



exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
});



// PASSWORD RESETING

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  log(customDate.getFormatDate(), 'forgetPassword');
  // Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    log('user not found')
    return next(new AppError('There is no user with that email address.', 404));
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  log('resetToken: ', resetToken);
  const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  log('resetPasswordToken: ', resetPasswordToken);
  const resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // Token expires in 10 minutes
  log('resetPasswordExpires: ', resetPasswordExpires);
  // Save the hashed token and expiration time to the user document
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpires = resetPasswordExpires;
  try {
    await user.save({ validateBeforeSave: false });
  }
  catch (err) {

    log('error sending user: ', err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('There was an error seving user . Try again later!', 500));
  }

  console.log(`Reset token (raw): ${resetToken}`);
  console.log(`Reset token (hashed): ${resetPasswordToken}`);

  const resetURL = `${req.protocol}://localhost:5173/resetPassword/${resetToken}`;

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
  console.log(`Received reset token: ${req.params.token}`);

  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }
  });

  console.log(`Hashed reset token: ${hashedToken}`);

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});
