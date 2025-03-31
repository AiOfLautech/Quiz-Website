const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  timerDuration: { type: Number, required: true }, // in minutes
  numberOfQuestions: { type: Number, required: true },
  questionBank: {
    type: Array,
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
