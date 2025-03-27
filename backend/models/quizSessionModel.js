// quizSessionModel.js placeholder
const mongoose = require('mongoose');

const quizSessionSchema = new mongoose.Schema(
  {
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
    // Array of question objects (shuffled for this session)
    questions: {
      type: Array,
      required: true,
    },
    // User responses, corresponding to the questions order
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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuizSession', quizSessionSchema);
