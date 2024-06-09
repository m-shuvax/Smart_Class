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
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already in use' });
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
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
  console.log('updateUser1');
  const user = await User.findById(req.user._id);
  console.log(user);
  if (!user) {
    return handleError(next, 'User not found', 404);
  }
  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.password = password || user.password;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  await user.save({ validateBeforeSave: false });
  handleResponse(res, user);
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return handleError(next, `User not found with id of ${req.params.id}`, 404);
  }

  res.status(204).json({ success: true, data: null });
});

exports.addToPending = asyncHandler(async (req, res, next) => {
  log('addToPending');
  const { user } = req;
  const classId = req.body.classroomCode;
  log('addToPending2');
  const classData = await Class.findById(classId);
  log('addToPending3');
  log(classData);
  classData.pendingStudents.push(user);
  log('addToPending4');
  await classData.save();
  log('addToPending5');
  res.status(200).json({
    success: true,
    classData,
    message: 'Request sent successfully',
  });
});


// File Controllers
exports.createFile = asyncHandler(async (req, res, next) => {
  const { fileName, fileDate, classId, category, fileLink } = req.body;
  console.log(fileName, fileDate, classId, category, fileLink);

  const file = await File.create({
    name: fileName,
    date: fileDate,
    classId,
    category,
    fLink: fileLink,
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
  console.log('createClass');
  const { name } = req.body;
  const { user } = req;
  console.log('createClass2');
  try {
    const newClass = await Class.create({
      name,
      instructor: user
    });
    res.status(201).json(newClass);
  } catch (error) {
    next(new AppError('Failed to create class', 400));
  }
});

// New controller to update class liveLink
exports.updateClassLiveLink = asyncHandler(async (req, res, next) => {
  const { liveLink, classId } = req.body;

  const classData = await Class.findById(classId);

  if (!classData) {
    return next(new AppError('Class not found', 404));
  }

  classData.liveLink = liveLink;
  await classData.save();

  res.status(200).json({
    success: true,
    message: 'Class live link updated successfully',
  });
});


