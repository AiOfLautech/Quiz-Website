// quizSessionMiddleware.js placeholder
// /backend/middleware/quizSessionMiddleware.js
const QuizSession = require('../models/quizSessionModel');

module.exports = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;
    // Check if there's an active session for this user and course
    const existingSession = await QuizSession.findOne({ userId, courseId, endTime: null });
    if (existingSession) {
      req.quizSession = existingSession;
    }
    next();
  } catch (error) {
    next(error);
  }
};
