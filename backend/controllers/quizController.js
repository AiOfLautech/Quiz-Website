const QuizSession = require('../models/quizSessionModel');
const Course = require('../models/courseModel');

/**
 * Start a quiz session.
 * - Expects a courseId in the request body.
 * - Looks up the course, shuffles the question bank,
 *   slices questions if needed, and saves a new quiz session.
 */
exports.startQuiz = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    // Check for an active session (if you want persistence)
    let session = await QuizSession.findOne({ userId, courseId, endTime: null });
    if (!session) {
      let questions = [...course.questionBank]; // clone question bank
      // Shuffle questions (Fisher-Yates)
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
      // Limit number of questions if course.numberOfQuestions is set
      if (course.numberOfQuestions && course.numberOfQuestions < questions.length) {
        questions = questions.slice(0, course.numberOfQuestions);
      }
      session = new QuizSession({
        userId,
        courseId,
        questions,
        startTime: Date.now()
      });
      await session.save();
    }
    res.json({
      message: "Quiz started",
      quizSessionId: session._id,
      questions: session.questions,
      timerDuration: course.timerDuration // timer in minutes
    });
  } catch (error) {
    console.error("Error starting quiz:", error);
    res.status(500).json({ message: "Server error starting quiz" });
  }
};

/**
 * Submit quiz answers.
 * - Expects quizSessionId and answers in the request body.
 * - Marks the end time and calculates a simple score.
 */
exports.submitQuiz = async (req, res) => {
  const { quizSessionId, answers } = req.body;
  try {
    const session = await QuizSession.findById(quizSessionId);
    if (!session) {
      return res.status(404).json({ message: "Quiz session not found" });
    }
    session.answers = answers;
    session.endTime = Date.now();
    await session.save();

    // Simple scoring: compare provided answers with correct ones
    let score = 0;
    session.questions.forEach((question, index) => {
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
