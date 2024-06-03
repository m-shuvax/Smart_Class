const User = require('./../models/userModel');
const Class = require('./../models/classModel');
const File = require('./../models/fileModel');
const Lesson = require('./../models/lessonModel');
const Chat = require('./../models/chatModel');
const Message = require('./../models/messageModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const bcrypt = require('bcryptjs');



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
  const { firstName, lastName, email, password, phoneNumber } = req.body;

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


// Function to create a new class
exports.createClass = asyncHandler(async (req, res, next) => {
  const { name, instructor, description } = req.body;

  try {
    const newClass = await Class.create({
      name,
      instructor,
      description,
      students: [], 
      pendingStudents: [], 
    });

    res.status(201).json(newClass);
  } catch (error) {
    next(new AppError('Failed to create class', 400));
  }
});

// New controller to update class liveLink
exports.updateClassLiveLink = asyncHandler(async (req, res, next) => {
  const { classId, newLink } = req.body;

  const classData = await Class.findById(classId);

  if (!classData) {
    return next(new AppError('Class not found', 404));
  }

  classData.liveLink = newLink || null;  // Set to null if not provided
  await classData.save();

  res.status(200).json({
    success: true,
    message: 'Class live link updated successfully',
  });
});