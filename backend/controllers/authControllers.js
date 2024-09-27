const asyncHandler = require('express-async-handler');
const meir = require('C:/Users/msnbi/OneDrive/שולחן העבודה/meir.js');
const AppError = require('./../utils/AppError');
const { cookieSettings, signToken } = require('./../utils/cookies')
const User = require('./../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');
const customDate = require('./../features/dates');
const log = console.log;



// TOKEN

const createSendToken = (user, res) => {
  meir.print('as');
  const token = signToken(user._id);
  res.cookie('jwt',
    token,
    cookieSettings);
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};



// ROUTE PROTECTION

exports.protect = asyncHandler(async (req, res, next) => {

  let token;
  console.log('JWT_COOKIE_EXPIRES_IN:', process.env.JWT_COOKIE_EXPIRES_IN);

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
// exports.isInstructor = asyncHandler(async (req, res, next) => {
//   if (req.user.role != 'instructor') return next(new AppError("The user isn't permitted", 407));
// }
// )



exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Email or password is missing', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user || !await user.checkPassword(password, user.password)) return next(new AppError('Email or password is incorrect', 401));

  user.password = undefined;

  createSendToken(user, res);
});



exports.logout = asyncHandler(async (req, res, next) => {
  log(1000);
  res.cookie('jwt',
    'loggedout',
    {
      expires: new Date(Date.now() + 10),
      httpOnly: true
    }
  );
  log(2000);
  res.status(200).json({ status: 'success' });
});



// PASSWORD RESETTING

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  try {
    await user.save({ validateBeforeSave: false });
  }
  catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('There was an error seving user. Try again later!', 500));
  }

  const name = user.firstName + (' ') + user.lastName;
  const resetURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
  const message = `
    <div style="width: 100%; display: flex; justify-content: center; align-items: center; background-color: #f7f7f7;">
        <div style="max-width: 600px; width: 100%; padding: 20px; display: flex; justify-content: center; margin-right: 20%; margin-left:20%; ">
            <div style="background-color: white; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center; border: 2px solid #c0d6ff;">
                <div style="padding: 20px;">
                    <h3 style="font-size: 24px;">Hi ${name}</h3>
                    <p style="font-size: 16px;">We received a request to reset your password.</p>
                    <p style="font-size: 16px;">We have sent a link to reset the password, the link is valid for 10 minutes.</p>
                    <p style="font-size: 16px;">Click the button below to reset your password:</p>
                    <a href="${resetURL}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; margin-top: 10px; margin-bottom: 20px;">Reset Password</a>
                    <p style="font-size: 16px;">If you did not request to reset the password, please ignore this email!</p>
                </div>
            </div>
        </div>
    </div>
  `
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset | smart class',
      html: message
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
