const User = require('./../models/userModel');
const Class = require('./../models/classModel');
const File = require('./../models/fileModel');
const Lesson = require('./../models/lessonModel');
const Chat = require('./../models/chatModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const categorizeFiles = require('./../utils/categorize');
const { createChat } = require('./chatControllers');



// HOME-PAGE RENDERING 

exports.renderInstructorClasses = asyncHandler(async (req, res, next) => {
  console.log('renderInstructorClasses1');
  const { user } = req;

  if (!user) {
    return next(new AppError('User ID is required', 400));
  }

  const allClasses = await Class.find({});
  console.log('renderInstructorClasses2');

  const classes = allClasses.filter(classObj => classObj.instructor.equals(user._id));
  console.log('renderInstructorClasses3');

  const pendingStudents = await Promise.all(
    classes.reduce((acc, classObj) => {
      const classPendingStudents = classObj.pendingStudents.map(async (studentId) => {
        const student = await User.findById(studentId).select('firstName lastName email');
        return {
          ...student._doc,
          classId: classObj._id,
          className: classObj.name
        };
      });
      return acc.concat(classPendingStudents);
    }, [])
  );

  res.status(200).json({
    success: true,
    user,
    classes,
    pendingStudents
  });
});



exports.renderStudentClasses = asyncHandler(async (req, res, next) => {
  console.log('renderStudentClasses1');
  const { user } = req;
  console.log('renderStudentClasses2');

  if (!user._id) {
    return next(new AppError('User ID is required', 400));
  }

  console.log('renderStudentClasses3');
  const studentClasses = await Class.find({ students: user._id }).select('name instructor');

  const classesWithInstructors = await Promise.all(studentClasses.map(async (classObj) => {
    const instructorName = await User.findById(classObj.instructor).select('name');
    const instructor = { instructorName, instructorId: classObj.instructor };
    return {
      ...classObj._doc,
      instructor
    };
  }));

  res.status(200).json({
    success: true,
    classes: classesWithInstructors,
    user
  });
});



// CLASS RENDERING

exports.renderInstructorClass = asyncHandler(async (req, res, next) => {
  console.log('renderClass0');
  const { classId } = req.params;
  const userId = req.user._id;
  console.log('renderClass0', classId, userId);

  if (!userId || !classId) {
    return next(new AppError('User ID and Class ID are required', 400));
  }

  const user = await User.findById(userId);
  const classData = await Class.findById(classId);

  if (!user || !classData) {
    return next(new AppError('User or class not found', 404));
  }

  console.log('renderClass1');
  const files = await File.find({ classId: classId });
  console.log('renderClass2', files);
  const lessons = await Lesson.find({ classId: classId });
  console.log('renderClass3', lessons);
  const students = await User.find({ _id: { $in: classData.students } });
  console.log('renderClass4', students);
  const chats = await Chat.find({ classId: classId }).populate('messages');
  console.log('renderClass4', chats);
  const categorizedFiles = categorizeFiles(files);
  const liveLink = classData.liveLink;

  res.status(200).json({
    files: categorizedFiles,
    lessons: lessons,
    user: user,
    students: students,
    pendingStudents: classData.pendingStudents,
    chats: chats,
    liveLink: liveLink
  });
});



exports.renderStudentClass = asyncHandler(async (req, res, next) => {
  console.log('renderStudentClass0');
  const { classId } = req.params;
  const userId = req.user._id;

  if (!userId || !classId) {
    return next(new AppError('User ID and Class ID are required', 400));
  }

  const user = await User.findById(userId);
  const classData = await Class.findById(classId);

  if (!user || !classData) {
    return next(new AppError('User or class not found', 404));
  }

  console.log('renderStudentClass1');
  const files = await File.find({ classId: classId });
  console.log('renderStudentClass2', files);
  const lessons = await Lesson.find({ classId: classId });
  console.log('renderStudentClass3', lessons);
  const chat = await Chat.findOne({ studentId: userId, classId: classId }).populate('messages');
  console.log('renderStudentClass4', chat);
  const categorizedFiles = categorizeFiles(files);
  const liveLink = classData.liveLink;
  const instructorName = await User.findById(classData.instructor).select('firstName lastName');
  console.log('renderStudentClass5');

  res.status(200).json({
    files: categorizedFiles,
    lessons: lessons,
    user: user,
    chat: chat,
    liveLink: liveLink,
    instructorName: instructorName
  });
});



// PENDING STUDENTS

exports.addPendingStudent = asyncHandler(async (req, res, next) => {
  console.log('addPendingStudent0', req.params, req.user._id);
  const { classId } = req.params;
  const userId = req.user._id;

  if (!userId || !classId) {
    return next(new AppError('User ID and Class ID are required', 400));
  }

  const classData = await Class.findById(classId);
  console.log('addPendingStudent1', classData);

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



exports.handlePendingStudent = asyncHandler(async (req, res, next) => {
  console.log('handlePendingStudent0', req.body);
  const { studentId, classId, action } = req.body;
  console.log('handlePendingStudent1');

  if (!studentId || !classId || !['approve', 'reject'].includes(action)) {
    return next(new AppError('User ID, Class ID, and valid action are required', 400));
  }

  const classData = await Class.findById(classId);
  console.log('handlePendingStudent2');

  if (!classData) {
    return next(new AppError('Class not found', 404));
  }

  const studentIndex = classData.pendingStudents.indexOf(studentId);
  console.log('handlePendingStudent3', studentIndex);

  if (studentIndex === -1) {
    return next(new AppError('Student not in pending list', 404));
  }

  if (action === 'approve') {
    classData.students.push(studentId);
  }

  classData.pendingStudents.splice(studentIndex, 1);
  await classData.save();
  console.log('handlePendingStudent4');

  createChat(classId, studentId);

  res.status(200).json({ success: true, message: `Student ${action === 'approve' ? 'approved' : 'rejected'}` });
});
