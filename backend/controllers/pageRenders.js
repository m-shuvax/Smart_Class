// Importing required modules and models
const User = require('./../models/userModel');
const Class = require('./../models/classModel');
const File = require('./../models/fileModel');
const Lesson = require('./../models/lessonModel');
const Chat = require('./../models/chatModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const { liveLinkObj } = require('./../utils/liveLink');
const message = require('../models/messageModel');
const categorizeFiles = require('./../utils/categorize');
let liveLink = liveLinkObj.value;

// Function to render instructor classes and pending students
exports.renderInstructorClasses = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new AppError('User ID is required', 400));
  }

  // Fetching all classes
  const allClasses = await Class.find({});

  // Filtering classes where the user is the instructor
  const instructorClasses = allClasses.filter(classObj => classObj.instructor.equals(userId));

  // Gathering all pending students
  const pendingStudents = instructorClasses.reduce((acc, classObj) => {
    return acc.concat(classObj.pendingStudents);
  }, []);

  res.status(200).json({
    success: true,
    data: {
      instructorClasses,
      pendingStudents,
    },
  });
});

// Function to render student classes
exports.renderStudentClasses = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new AppError('User ID is required', 400));
  }

  // Fetching all classes where the user is a student
  const studentClasses = await Class.find({ students: userId }).select('name instructor');

  res.status(200).json({
    success: true,
    data: studentClasses,
  });
});


// Function to render student class
exports.renderStudentClass = asyncHandler(async (req, res, next) => {
  const { userId, classId } = req.body;

  if (!userId || !classId) {
    return next(new AppError('User ID and Class ID are required', 400));
  }

  // Fetching user and class data
  const user = await User.findById(userId);
  const classData = await Class.findById(classId);

  // If user or class not found, throw an error
  if (!user || !classData) {
    return next(new AppError('User or class not found', 404));
  }

  // Fetching files, lessons and chat related to the class
  const files = await File.find({ classId: classId });
  const lessons = await Lesson.find({ classId: classId });
  const chat = await Chat.findOne({ studentId: userId, classId: classId }).populate('messages');

  // Categorize files
  const categorizedFiles = categorizeFiles(files);

  // Sending response
  res.status(200).json({ 
    files: files,
    lessons: lessons,
    userDetails: user,
    chat: chat,
    liveLink: liveLink
  });
});

// Function to render instructor class
exports.renderInstructorClass = asyncHandler(async (req, res, next) => {
  const { userId, classId } = req.body;

  if (!userId || !classId) {
    return next(new AppError('User ID and Class ID are required', 400));
  }

  // Fetching user and class data
  const user = await User.findById(userId);
  const classData = await Class.findById(classId).populate('pendingStudents');

  // If user or class not found, throw an error
  if (!user || !classData) {
    return next(new AppError('User or class not found', 404));
  }

  // Fetching files, lessons, students and chats related to the class
  const files = await File.find({ classId: classId });
  const lessons = await Lesson.find({ classId: classId });
  const students = await User.find({ _id: { $in: classData.students } });
  const chats = await Chat.find({ classId: classId }).populate('messages');

  // Sending response
  res.status(200).json({ 
    files: files,
    lessons: lessons,
    userDetails: user,
    students: students,
    pendingStudents: classData.pendingStudents,
    chats: chats,
    liveLink: liveLink
  });
});

// Function to add a student to the pending list
exports.addPendingStudent = asyncHandler(async (req, res, next) => {
  const { userId, classId } = req.body;

  if (!userId || !classId) {
    return next(new AppError('User ID and Class ID are required', 400));
  }

  const classData = await Class.findById(classId);

  if (!classData) {
    return next(new AppError('Class not found', 404));
  }

  if (classData.pendingStudents.includes(userId)) {
    return next(new AppError('Student already in pending list', 400));
  }

  classData.pendingStudents.push(userId);
  await classData.save();

  res.status(200).json({ success: true, message: 'Student added to pending list' });
});

// Function to approve or reject a pending student
exports.handlePendingStudent = asyncHandler(async (req, res, next) => {
  const { userId, classId, action } = req.body;

  if (!userId || !classId || !['approve', 'reject'].includes(action)) {
    return next(new AppError('User ID, Class ID, and valid action are required', 400));
  }

  const classData = await Class.findById(classId);

  if (!classData) {
    return next(new AppError('Class not found', 404));
  }

  const studentIndex = classData.pendingStudents.indexOf(userId);

  if (studentIndex === -1) {
    return next(new AppError('Student not in pending list', 404));
  }

  if (action === 'approve') {
    classData.students.push(userId);
  }

  classData.pendingStudents.splice(studentIndex, 1);
  await classData.save();

  res.status(200).json({ success: true, message: `Student ${action === 'approve' ? 'approved' : 'rejected'}` });
});
