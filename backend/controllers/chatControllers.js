// Importing required modules
const User = require('./../models/userModel');
const Class = require('./../models/classModel');
const Chat = require('./../models/chatModel');
const Message = require('./../models/messageModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');


// Function to create a new message
exports.createMessage = asyncHandler(async (req, res, next) => {
  const { userId, chat, messageText } = req.body;

  const existingChat = await Chat.findById(chat);

  if (!existingChat) {
    return next(new AppError('Chat not found', 404));
  }

  const newMessage = new Message({
    chatId: chat,
    authorId: userId,
    message: messageText
  });

  await newMessage.save();

  res.status(201).json({
    success: true,
    message: newMessage
  });
});


// Function to create a new chat
exports.createChat = asyncHandler(async (req, res, next) => {
  const { classId, studentId } = req.body;

  const existingClass = await Class.findById(classId);
  const existingStudent = await User.findById(studentId);

  if (!existingClass || !existingStudent) {
    return next(new AppError('Class or student not found', 404));
  }

  const newChat = new Chat({
    classId: classId,
    studentId: studentId,
    messages: []
  });

  await newChat.save();

  res.status(201).json({
    success: true,
    chat: newChat
  });
});


// Function to delete a message
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const { messageId, userId } = req.body;

  const message = await Message.findById(messageId);

  if (!message) {
    return next(new AppError('Message not found', 404));
  }

  if (message.authorId.toString() !== userId) {
    return next(new AppError('You are not authorized to delete this message', 403));
  }

  await message.remove();

  const chat = await Chat.findById(message.chatId);

  if (!chat) {
    return next(new AppError('Chat not found', 404));
  }

  const updatedMessages = chat.messages.filter(msg => msg.toString() !== messageId);
  chat.messages = updatedMessages;
  await chat.save();

  res.status(200).json({
    success: true,
    message: 'Message deleted successfully'
  });
});