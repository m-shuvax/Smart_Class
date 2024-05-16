const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const User = require('./../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id, iat: Date.now() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
  };

  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword, name } = req.body;
  if (!email || !password || !confirmPassword) return next(new AppError('Request details are missing', 400));
  if (password !== confirmPassword) return next(new AppError('Passwords do not match', 400));
  const newUser = await User.create({ email, password, confirmPassword, name });
  createSendToken(newUser, 201, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Email or password is missing', 400));
  const user = await User.findOne({ email }).select('+password');
  if (!user || !await user.checkPassword(password, user.password)) return next(new AppError('Email or password is incorrect', 401));
  createSendToken(user, 200, res);
});

exports.protect = asyncHandler(async (req, res, next) => {
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

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};
