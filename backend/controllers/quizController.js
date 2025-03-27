// quizController.js placeholder
const Course = require('../models/courseModel');
const QuizSession = require('../models/quizSessionModel');

// Start Quiz Session
exports.startQuiz = async (req, res) => {
  const { courseId } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: 'Course not found' });
    }
    const quizSession = new QuizSession({
      courseId,
      userId: req.user._id,
      questions: course.questionBank,
      startTime: Date.now(),
    });
    await quizSession.save();
    res.json({ message: 'Quiz started', quizSessionId: quizSession._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Submit Quiz Answers
exports.submitQuiz = async (req, res) => {
  const { quizSessionId, answers } = req.body;
  try {
    const quizSession = await QuizSession.findById(quizSessionId);
    if (!quizSession) {
      return res.status(400).json({ message: 'Quiz session not found' });
    }
    quizSession.answers = answers;
    quizSession.endTime = Date.now();
    await quizSession.save();
    res.json({ message: 'Quiz submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
