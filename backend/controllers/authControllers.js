const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const User = require('./../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');


// Function to sign a JWT token with user id
const signToken = id => {
  return jwt.sign({ id, iat: Date.now() }, process.env.JWT_SECRET);
};


// Function to create and send a token to the client
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
  };

  res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production'});
  res.json({
    data: {
      user
    }
  });
};


exports.register = asyncHandler(async (req, res, next) => {
  const { email, password,  name } = req.body;
  if (!email || !password) return next(new AppError('Request details are missing', 400));
  const newUser = await User.create({ email, password, confirmPassword, name });
  createSendToken(newUser, 201, res);
});

// Middleware to protect routes
exports.protect = asyncHandler(async(req, res, next)=>{
    const token = req.headers.cookie.split('=')[1]
    if(!token) return next(new AppError(403, 'Please login'))
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    if(!decoded) return next(new AppError(403, 'Please login'))
    const {id} = decoded
    const user = await User.findById(id)
    if(!user) return next(new AppError(400, 'Please register'))
    req.user = user
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