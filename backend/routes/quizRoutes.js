const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/start', authMiddleware, quizController.startQuiz);
router.post('/submit', authMiddleware, quizController.submitQuiz);

module.exports = router;
