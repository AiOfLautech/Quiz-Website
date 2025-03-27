// courseModel.js placeholder
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    timerDuration: {
      type: Number,
      required: [true, 'Timer duration is required'],
    },
    numberOfQuestions: {
      type: Number,
      required: [true, 'Number of questions is required'],
    },
    // Question bank: an array containing question objects.
    // Each question object may include an "options" array (for multiple-choice) or no options (for open-ended answers)
    questionBank: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
