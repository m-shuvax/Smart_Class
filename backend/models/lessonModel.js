const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  lLink: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
