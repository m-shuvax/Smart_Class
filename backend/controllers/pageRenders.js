// Importing required modules and models
const User = require('./../models/userModel');
const Class = require('./../models/classModel');
const File = require('./../models/fileModel');
const Lesson = require('./../models/lessonModel');
const Chat = require('./../models/chatModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const { liveLinkObj } = require('./../utils/liveLink');
// Accessing liveLink
let liveLink = liveLinkObj.value;


// Function to render user classes
exports.renderUserClasses = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return next(new AppError(`User not found with email of ${req.params.email}`, 404));
    }
  
    const classes = await Class.find({ students: user._id }).select('name instructor');
  
    const userData = {
      ...user._doc,
      classes: classes.map((classObj) => ({
        name: classObj.name,
        instructor: classObj.instructor,
      })),
    };
  
    res.status(200).json({ success: true, data: userData });
  });
  

// Function to render student class
exports.renderStudentClass = asyncHandler(async (req, res, next) => {
  const { userId, classId } = req.body;

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

  // Fetching user and class data
  const user = await User.findById(userId);
  const classData = await Class.findById(classId);

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
    chats: chats,
    liveLink: liveLink
  });
});