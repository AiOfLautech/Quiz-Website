const QuizSession = require('../models/quizSessionModel');
const Course = require('../models/courseModel');

/**
 * Start or resume a quiz session.
 * - Expects courseId in req.body.
 * - Uses req.user._id for the user.
 * - If a session exists (endTime is null), return it with the remaining time.
 * - Otherwise, create a new session: shuffle questions, limit by numberOfQuestions, and store startTime.
 */
exports.startQuiz = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    let session = await QuizSession.findOne({ userId, courseId, endTime: null });
    const totalTimeSeconds = course.timerDuration * 60;
    if (session) {
      // Calculate remaining time: total - elapsed
      const elapsedSeconds = Math.floor((Date.now() - session.startTime.getTime()) / 1000);
      const remainingTime = Math.max(totalTimeSeconds - elapsedSeconds, 0);
      return res.json({
        message: "Quiz resumed",
        quizSessionId: session._id,
        questions: session.questions,
        remainingTime, // in seconds
      });
    }
    // New session: shuffle questions and limit them
    let questions = [...course.questionBank]; // clone the question bank
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    if (course.numberOfQuestions && course.numberOfQuestions < questions.length) {
      questions = questions.slice(0, course.numberOfQuestions);
    }
    session = new QuizSession({
      userId,
      courseId,
      questions,
      startTime: new Date(),
    });
    await session.save();
    return res.json({
      message: "Quiz started",
      quizSessionId: session._id,
      questions: session.questions,
      remainingTime: totalTimeSeconds,
    });
  } catch (error) {
    console.error("Error starting quiz:", error);
    res.status(500).json({ message: "Server error starting quiz" });
  }
};

/**
 * Submit quiz answers.
 * - Expects quizSessionId and answers array in req.body.
 * - Marks the session as ended and calculates a simple score.
 */
exports.submitQuiz = async (req, res) => {
  const { quizSessionId, answers } = req.body;
  try {
    const session = await QuizSession.findById(quizSessionId);
    if (!session) {
      return res.status(404).json({ message: "Quiz session not found" });
    }
    session.answers = answers;
    session.endTime = new Date();
    await session.save();

    let score = 0;
    session.questions.forEach((question, index) => {
      // Compare answers case-insensitively after trimming
      if (
        answers[index] &&
        answers[index].toString().trim().toLowerCase() ===
          question.answer.toString().trim().toLowerCase()
      ) {
        score++;
      }
    });
    res.json({ message: "Quiz submitted", score });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: "Server error submitting quiz" });
  }
};

module.exports = {
  startQuiz: exports.startQuiz,
  submitQuiz: exports.submitQuiz,
};
