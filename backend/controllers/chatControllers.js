// Importing required modules
const User = require('./../models/userModel');
const Class = require('./../models/classModel');
const Chat = require('./../models/chatModel');
const Message = require('./../models/messageModel');
const asyncHandler = require('express-async-handler');
const AppError = require('./../utils/AppError');
const authMiddleware = require('./../middleware/authMiddleware');


// Function to create a new message
exports.createMessage = asyncHandler(async (req, res, next) => {
  const { userId, chatId, messageText } = req.body;

  try {
    // Find the chat by its ID
    const existingChat = await Chat.findById(chatId);

    if (!existingChat) {
      return next(new AppError('Chat not found', 404));
    }

    // Create a new message
    const newMessage = new Message({
      authorId: userId,
      message: messageText
    });

    // Save the new message
    await newMessage.save();

    // Add the new message to the chat's array of messages
    existingChat.messages.push(newMessage);
    await existingChat.save();

    // Populate the chat object with the messages
    const populatedChat = await existingChat.populate('messages').execPopulate();

    // Respond with success and the populated chat
    res.status(201).json({
      success: true,
      chat: populatedChat
    });
  } catch (error) {
    // Handle any errors
    return next(new AppError('Something went wrong', 500));
  }
});



// Function to create a new chat
exports.createChat = asyncHandler(async (req, res, next) => {
  const { classId, studentId } = req.body;

  if (!classId || !studentId) {
    return next(new AppError('Class ID and Student ID are required', 400));
  }

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

// Protect routes
router.post('/createMessage', authMiddleware.protect, chatController.createMessage);
router.post('/createChat', authMiddleware.protect, chatController.createChat);
router.delete('/deleteMessage', authMiddleware.protect, chatController.deleteMessage);
