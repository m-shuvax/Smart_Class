const User = require('./../models/userModel');
const Class = require('./../models/classModel');
const File = require('./../models/fileModel');
const Lesson = require('./../models/lessonModel');
const Chat = require('./../models/chatModel');
const Message = require('./../models/messageModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const { liveLinkObj } = require('./../utils/liveLink');
const bcrypt = require('bcryptjs');


let liveLink = liveLinkObj.value;

// Utility function to handle response
const handleResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};

// Utility function to handle errors
const handleError = (next, message, statusCode) => {
  return next(new AppError(message, statusCode));
};


// User Controllers
exports.createUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phoneNumber,
    role,
  });
  if (!user) {
    return handleError(next, 'Failed to create user', 500);
  }
  handleResponse(res, user, 201);
  
  console.log('hhhh');

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    return handleError(next, 'User not found', 404);
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  if (password) {
    user.password = await bcrypt.hash(password, 12);
  }
  user.phoneNumber = phoneNumber;
  user.role = role;
  await user.save();

  handleResponse(res, user);
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return handleError(next, `User not found with id of ${req.params.id}`, 404);
  }

  res.status(204).json({ success: true, data: null });
});

// File Controllers
exports.createFile = asyncHandler(async (req, res, next) => {
  const { fileName, classId, category, fileLink } = req.body;

  const file = await File.create({
    fileName,
    classId,
    category,
    fileLink,
  });

  if (!file) {
    return handleError(next, 'Failed to create file', 500);
  }

  handleResponse(res, file, 201);
});

exports.deleteFile = asyncHandler(async (req, res, next) => {
  const file = await File.findByIdAndDelete(req.params.id);

  if (!file) {
    return handleError(next, 'File not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'File deleted successfully',
  });
});

// Lesson Controllers
exports.createLesson = asyncHandler(async (req, res, next) => {
  const { name, classId, lLink } = req.body;

  const lesson = await Lesson.create({
    name,
    classId,
    lLink,
  });

  if (!lesson) {
    return handleError(next, 'Failed to create lesson', 500);
  }

  handleResponse(res, lesson, 201);
});

exports.deleteLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);

  if (!lesson) {
    return handleError(next, 'Lesson not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Lesson deleted successfully',
  });
});

// LiveLink Controller
exports.updateLiveLink = asyncHandler(async (req, res, next) => {
  const { newLink } = req.body;

  liveLinkObj.value = newLink;

  res.status(200).json({
    success: true,
    message: 'Live link updated successfully',
  });
});

exports.aaa = asyncHandler(async (req, res, next) => {
  console.log('hhhh');
  console.log(req);}
  );
  //const user
