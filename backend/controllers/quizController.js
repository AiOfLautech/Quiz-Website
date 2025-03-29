const QuizSession = require('../models/quizSessionModel');
const Course = require('../models/courseModel');

/**
 * Start a quiz session:
 *  - Retrieve the course by ID.
 *  - Shuffle questions.
 *  - Limit the number of questions if specified.
 *  - Save a new quiz session for the user.
 */
exports.startQuiz = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user ? req.user._id : null;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    // Check for existing active quiz session for this user & course
    let session = await QuizSession.findOne({ userId, courseId, endTime: null });
    if (!session) {
      let questions = course.questionBank;
      // Shuffle questions using Fisher-Yates
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
      // Limit the number of questions if specified
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
      timerDuration: course.timerDuration // in minutes
    });
  } catch (error) {
    console.error("Error starting quiz:", error);
    res.status(500).json({ message: "Server error starting quiz" });
  }
};

/**
 * Submit quiz answers:
 *  - Save user answers.
 *  - Mark the end time.
 *  - Calculate a simple score.
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

    // Calculate score (assumes each question object has a property 'answer')
    let score = 0;
    session.questions.forEach((question, index) => {
      if (
        answers[index] &&
        answers[index].toString().trim().toLowerCase() === question.answer.toString().trim().toLowerCase()
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
