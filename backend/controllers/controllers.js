const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Class = require('../models/classModel');
const File = require('../models/fileModel');
const Lesson = require('../models/lessonModel');
const AppError = require('../utils/AppError');

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
    return next(new AppError('Failed to create user', 500));
  }

  console.log('User created');
  res.status(201).json({ success: true, data: user });
});


exports.updateUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.password = password || user.password;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  await user.save({ validateBeforeSave: false });

  console.log('User updated');
  res.status(200).json({ success: true, data: user });
});


exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError(`User not found with id of ${req.params.id}`, 404));
  }

  console.log('User deleted');
  res.status(204).json({ success: true, data: null });
});


exports.createFile = asyncHandler(async (req, res, next) => {
  const { fileName, fileDate, classId, category, fileLink } = req.body;

  const file = await File.create({
    name: fileName,
    date: fileDate,
    classId,
    category,
    fLink: fileLink,
  });

  if (!file) {
    return next(new AppError('Failed to create file', 500));
  }

  console.log('File created');
  res.status(201).json({ success: true, data: file });
});


exports.deleteFile = asyncHandler(async (req, res, next) => {
  const file = await File.findByIdAndDelete(req.params.id);

  if (!file) {
    return next(new AppError('File not found', 404));
  }

  console.log('File deleted');
  res.status(200).json({ success: true, message: 'File deleted successfully' });
});


exports.createLesson = asyncHandler(async (req, res, next) => {
  const { name, classId, lLink, date } = req.body;

  const lesson = await Lesson.create({
    name,
    classId,
    lLink,
    date
  });

  if (!lesson) {
    return next(new AppError('Failed to create lesson', 500));
  }

  console.log('Lesson created');
  res.status(201).json({ success: true, data: lesson });
});


exports.deleteLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);

  if (!lesson) {
    return next(new AppError('Lesson not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Lesson deleted successfully',
  });
});


exports.createClass = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { user } = req;

  try {
    const newClass = await Class.create({ name, instructor: user });
    console.log('Class created');
    res.status(201).json(newClass);
  } catch (error) {
    next(new AppError('Failed to create class', 400));
  }
});


exports.updateClassLiveLink = asyncHandler(async (req, res, next) => {
  const { liveLink, classId } = req.body;
  const classData = await Class.findById(classId);

  if (!classData) {
    return next(new AppError('Class not found', 404));
  }

  classData.liveLink = liveLink;
  await classData.save();

  console.log('Class live link updated');
  res.status(200).json({ success: true, message: 'Class live link updated successfully' });
});
