const User = require('./../models/userModel')
const asyncHandler = require('express-async-handler')
const AppError = require('./../utils/AppError')

exports.getUsers = asyncHandler(async (req, res) => {
    const { filter } = req.query
    const users = await User.find(filter)
    res.status(200).json({
        status: 'success',
        users
    })
})

exports.createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Send a success response
  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(new AppError(`User not found with id of ${req.params.id}`, 404));
    }
  
    res.status(200).json({ success: true, data: user });
  });

exports.updateUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
  
    // Find the user
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Update the user
    user.name = name ? name : user.name;
    user.email = email;
    user.password = password;
    await user.save();
  
    // Send the response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  });