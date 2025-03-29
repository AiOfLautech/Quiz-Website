const mongoose = require('mongoose');

const quizSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
  answers: {
    type: Array,
    default: [],
  },
  startTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endTime: {
    type: Date,
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model('QuizSession', quizSessionSchema);
