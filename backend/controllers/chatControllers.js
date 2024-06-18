const User = require('./../models/userModel');
const Class = require('./../models/classModel');
const Chat = require('./../models/chatModel');
const Message = require('./../models/messageModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');

exports.createChat = asyncHandler(async (classId, studentId) => {
  console.log ('createChat1', classId, studentId);

  const existingClass = await Class.findById(classId);
  const existingStudent = await User.findById(studentId);

  console.log ('createChat2', existingClass, existingStudent);

  if (!existingClass || !existingStudent) {
    return next(new AppError('Class or student not found', 404));
  }

  const newChat = new Chat({
    classId: classId,
    studentId: studentId,
    messages: []
  });

  console.log ('createChat3', newChat);

  await newChat.save();

  const studentMessage = new Message({
    authorId: studentId,
    message: 'Thank you for approving'
  });
  
  const instructorMessage = new Message({
    authorId: existingClass.instructorId, // Assuming the class model has an instructorId field
    message: 'Do you have any questions?'
  });

  console.log ('createChat4', studentMessage, instructorMessage);

  await studentMessage.save();
  await instructorMessage.save();

  newChat.messages.push(studentMessage);
  newChat.messages.push(instructorMessage);
  await newChat.save();

  console.log ('createChat5', newChat); 
});



exports.createMessage = asyncHandler(async (req, res, next) => {
  const { authorId, chatId, message } = req.body;

  try {
    const existingChat = await Chat.findById(chatId);

    if (!existingChat) {
      return next(new AppError('Chat not found', 404));
    }

    const newMessage = new Message({
      authorId,
      message
    });

    await newMessage.save();

    existingChat.messages.push(newMessage);
    await existingChat.save();

    const populatedChat = await existingChat.populate('messages').execPopulate();

    res.status(201).json({
      success: true,
      chat: populatedChat
    });
  } catch (error) {
    return next(new AppError('Something went wrong', 500));
  }
});



exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const userId = req.user._id
  const { messageId } = req.params;

  if (!messageId || !userId) {
    return next(new AppError('Message ID and User ID are required', 400));
  }

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

