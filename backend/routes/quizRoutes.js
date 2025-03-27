// quizRoutes.js placeholder
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Start a Quiz Session (creates a persistent session)
router.post('/start', /* authMiddleware, */ quizController.startQuiz);

// Submit Quiz Answers
router.post('/submit', /* authMiddleware, */ quizController.submitQuiz);

module.exports = router;
