const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected endpoints: user must be logged in to start and submit quizzes
router.post('/start', authMiddleware, quizController.startQuiz);
router.post('/submit', authMiddleware, quizController.submitQuiz);

module.exports = router;
