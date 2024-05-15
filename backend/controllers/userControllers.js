const User = require('./../models/userModel');
const Class = require('./../models/classModel');
const File = require('./../models/fileModel');
const Lesson = require('./../models/lessonModel');
const Chat = require('./../models/chatModel');
const Message = require('./../models/messageModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const { liveLinkObj } = require('./../utils/liveLink');

// Accessing liveLink
let liveLink = liveLinkObj.value;

// User Controllers
exports.createUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    role,
  });

  if (!user) {
    return next(new AppError('Failed to create user', 500));
  }

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = password;
  user.phoneNumber = phoneNumber;
  user.role = role;
  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError(`User not found with id of ${req.params.id}`, 404));
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
    return next(new AppError('Failed to create file', 500));
  }

  res.status(201).json({
    success: true,
    data: file,
  });
});

exports.deleteFile = asyncHandler(async (req, res, next) => {
  const file = await File.findByIdAndDelete(req.params.id);

  if (!file) {
    return next(new AppError('File not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'File deleted successfully',
  });
});

// Lesson Controllers
exports.createLesson = asyncHandler(async (req, res, next) => {
  const { title, description, classId } = req.body;

  const lesson = await Lesson.create({
    title,
    description,
    classId,
  });

  if (!lesson) {
    return next(new AppError('Failed to create lesson', 500));
  }

  res.status(201).json({
    success: true,
    data: lesson,
  });
});

exports.updateLesson = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;

  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) {
    return next(new AppError('Lesson not found', 404));
  }

  lesson.title = title;
  lesson.description = description;
  await lesson.save();

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

// LiveLink Controllers
exports.updateLiveLink = asyncHandler(async (req, res, next) => {
  const { newLink } = req.body;

  liveLinkObj.value = newLink;

  res.status(200).json({
    success: true,
    message: 'Live link updated successfully',
  });
});