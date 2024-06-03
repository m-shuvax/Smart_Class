// Importing required modules and models
const User = require('./../models/userModel');
const Class = require('./../models/classModel');
const { log } = require('console');
const File = require('./../models/fileModel');
const Lesson = require('./../models/lessonModel');
const Chat = require('./../models/chatModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const message = require('../models/messageModel');
const categorizeFiles = require('./../utils/categorize');

// Function to render instructor classes and pending students
exports.renderInstructorClasses = asyncHandler(async (req, res, next) => {
  log('renderInstructorClasses1');
  const { user } = req;

  if (!user) {
    return next(new AppError('User ID is required', 400));
  }

  // Fetching all classes
  const allClasses = await Class.find({});
  log('renderInstructorClasses2');

  // Filtering classes where the user is the instructor
  const classes = allClasses.filter(classObj => classObj.instructor.equals(user._id));
  log('renderInstructorClasses3');

  // Gathering all pending students
  const pendingStudents = await Promise.all(
    classes.reduce((acc, classObj) => {
      const classPendingStudents = classObj.pendingStudents.map(async (studentId) => {
        const student = await User.findById(studentId).select('firstName lastName email'); // Select the fields you need
        return {
          ...student._doc,
          classId: classObj._id,
          className: classObj.name
        };
      });
      return acc.concat(classPendingStudents);
    }, [])
  );
console.log('renderInstructorClasses4', pendingStudents);


  res.status(200).json({
    success: true,
    user,
    classes,
    pendingStudents
  });
});

// Function to render student classes
exports.renderStudentClasses = asyncHandler(async (req, res, next) => {
  log('renderStudentClasses1');
  const { user } = req;
  log('renderStudentClasses2');
  if (!user._id) {
    return next(new AppError('User ID is required', 400));
  }
  log('renderStudentClasses3');
  // Fetching all classes where the user is a student
  const studentClasses = await Class.find({ students: user._id }).select('name instructor');
      // Map through the classes to fetch instructor details
      const classesWithInstructors = await Promise.all(studentClasses.map(async (classObj) => {
        const instructorName = await User.findById(classObj.instructor).select('name');
      const instructor = { instructorName, instructorId: classObj.instructor };
      return { ...classObj._doc, instructor
        };
      }));
  log('renderStudentClasses4');
  res.status(200).json({
    success: true,
    data: {
      classes: classesWithInstructors,
      user
    }
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
  log('handlePendingStudent0', req.body);
  const { studentId, classId, action } = req.body;
  log('handlePendingStudent1');

if (!studentId || !classId || !['approve', 'reject'].includes(action)) {
    return next(new AppError('User ID, Class ID, and valid action are required', 400));
  }
log('handlePendingStudent22');
  const classData = await Class.findById(classId);
  log('handlePendingStudent2');
  if (!classData) {
    return next(new AppError('Class not found', 404));
  }
  log('handlePendingStudent3');

  const studentIndex = classData.pendingStudents.indexOf(studentId);
  log('handlePendingStudent4', studentIndex);

  if (studentIndex === -1) {
    return next(new AppError('Student not in pending list', 404));
  }

  if (action === 'approve') {
    classData.students.push(studentId);
  }

  classData.pendingStudents.splice(studentIndex, 1);
  await classData.save();
  log('handlePendingStudent5');

  res.status(200).json({ success: true, message: `Student ${action === 'approve' ? 'approved' : 'rejected'}` });
});