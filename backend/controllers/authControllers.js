// Importing required modules
const asyncHandler = require('express-async-handler')
const AppError = require('./../utils/AppError')
const User = require('./../models/userModel')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')

// Function to sign a JWT token with user id
const signToken = id => {
  return jwt.sign({ id, iat: Date.now() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Function to create and send a token to the client
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRES_IN
      ),
      httpOnly: true,
      secure : true
    }
    
    // Setting the JWT token as a cookie
    res.cookie('jwt', token, cookieOptions);
    // Sending the response with the token and user data
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
};

// Controller for user registration
exports.register = asyncHandler(async(req, res, next)=>{
    const {email, password, confirmPassword,name} = req.body
    if (!email ||!password||!confirmPassword) return next(new AppError(403,'Request details are missing'))
    const newUser = await User.create({email, password, confirmPassword, name})
    createSendToken(newUser, 201 , res)
})

// Controller for user login
exports.login = asyncHandler(async (req, res, next)=>{
    const {email, password} = req.body
    if(!email || !password) return next(new AppError(403, 'Email or password is missing'))
    const user = await User.findOne({email}).select('+password')
    if (! user || !await  user.checkPassword(password, user.password) ) return next(new AppError(403, 'Email or password is not correct 1'))
    createSendToken(user, 201 , res)  
})

// Middleware to protect routes
exports.protect = asyncHandler(async(req,res, next)=>{
    const token = req.headers.cookie.split('=')[1]
    if(!token) return next(new AppError(403, 'Please login '))
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    if(!decoded) return next(new AppError(403, 'Please login '))
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
        return next(
          new AppError(403, 'You do not have permission to perform this action')
        );
      }  
      next();
    };
};