const User = require('./../models/userModel')
const Class = require('./../models/classModel')
const File = require('./../models/fileModel')
const Lesson = require('./../models/lessonModel')
const asyncHandler = require('express-async-handler')
const AppError = require('./../utils/AppError')
let liveLink = ''

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

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.createFile = asyncHandler(async (req, res, next) => {
  const { fileName, classId, category, fileLink } = req.body;

  try {
    const file = await File.create({
      fileName,
      classId,
      category,
      fileLink,
    });

    res.status(201).json({
      success: true,
      data: file,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'שגיאה ביצירת הקובץ ',
    });
  }
});

exports.createMessage = asyncHandler(async (req, res) => {
  const { userId, chat, messageText } = req.body;
  try {
    const existingChat = await Chat.findById(chat);
    if (!existingChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    const newMessage = new Message({
      chatId: chat,
      authorId: userId,
      message: messageText
    });
    await newMessage.save();
    return res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create message' });
  }
});

exports.createChat = asyncHandler(async (req, res) => {
  const { classId, userId } = req.body;
  try {
    const existingClass = await Class.findById(classId);
    const existingStudent = await User.findById(studentId);
    if (!existingClass || !existingStudent) {
      return res.status(404).json({ message: 'Class or student not found' });
    }
    const newChat = new Chat({
      classId: classId,
      studentId: studentId,
      messages: []
    });
    await newChat.save();
    return res.status(201).json({ success: true, chat: newChat });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create chat' });
  }
});

exports.renderStudentClass = asyncHandler(async (req, res) => {
  const { userId, classId } = req.body;
  const user = await User.findById(userId);
  const classData = await Class.findById(classId);
  if (!user || !classData) {
    return res.status(404).json({ message: 'User or class not found' });
  }
  const files = await File.find({ classId: classId });
  const lessons = await Lesson.find({ classId: classId });
  const chat = await Chat.findOne({ studentId: userId, classId: classId }).populate('messages');
  return res.status(200).json({ 
    files: files,
    lessons: lessons,
    userDetails: user,
    chat: chat,
    liveLink: liveLink
  });
});

exports.renderInstructorClass = asyncHandler(async (req, res) => {
  const { userId, classId } = req.body;
  const user = await User.findById(userId);
  const classData = await Class.findById(classId);
  if (!user || !classData) {
    return res.status(404).json({ message: 'User or class not found' });
  }
  const files = await File.find({ classId: classId });
  const lessons = await Lesson.find({ classId: classId });
  const students = await User.find({ _id: { $in: classData.students } });
  const chats = await Chat.find({ classId: classId }).populate('messages');
  return res.status(200).json({ 
    files: files,
    lessons: lessons,
    userDetails: user,
    students: students,
    chats: chats,
    liveLink: liveLink
  });
});


exports.updateUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;

  // Find the user
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Update the user
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = password;
  user.phoneNumber = phoneNumber;
  user.role = role;
  await user.save();

  // Send the response
  res.status(200).json({
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

exports.getUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return next(new AppError(`User not found with email of ${req.params.email}`, 404));
    }

    const classes = await Class.find({ students: user._id }).select('name instructor'); // Find classes with user's ID

    const userData = {
      ...user._doc,
      classes: classes.map((classObj) => ({
        name: classObj.name,
        instructor: classObj.instructor, // Assuming 'instructor' field exists in Class
      })),
    };
    res.status(200).json({ success: true, data: userData });

  } catch (err) {
    next(err); // Handle any errors gracefully
  }
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

const Chat = require('./chatModel');
const Message = require('./messageModel');

exports.getChatMessages = asyncHandler(async (req, res) => {
  const { userId, classId } = req.body;

  try {
    const chat = await Chat.findOne({ studentId: userId, classId: classId });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const messages = await Message.find({ chatId: chat._id });

    return res.status(200).json({ messages: messages });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});



exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(204).json({ success: true, data: null });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});

exports.deleteFile = asyncHandler(async (req, res, next) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    return next(new AppError('File not found', 404));
  }

  await file.remove();

  res.status(200).json({
    success: true,
    message: 'File deleted successfully',
  });
});

exports.deleteMessage = asyncHandler(async (req, res) => {
  const { messageId, userId } = req.body;
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    if (message.authorId.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this message' });
    }
    await message.remove();
    const chat = await Chat.findById(message.chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    const updatedMessages = chat.messages.filter(msg => msg.toString() !== messageId);
    chat.messages = updatedMessages;
    await chat.save();
    return res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete message' });
  }
});
