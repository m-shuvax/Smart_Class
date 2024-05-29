const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A class must have a name'],
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A class must have an instructor'],
  },
  students: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: []  // Default value to an empty array
  }],
  pendingStudents: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: []  // Default value to an empty array
  }],
  liveLink: {
    type: String,
    default: null  // Default value to null
  }
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
