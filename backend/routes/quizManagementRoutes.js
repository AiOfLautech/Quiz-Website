const express = require('express');
const router = express.Router();
const quizManagementController = require('../controllers/quizManagementController');
const authMiddleware = require('../middleware/authMiddleware');

// Course management
router.post('/course', authMiddleware, quizManagementController.addCourse);
router.patch('/course/:courseId', authMiddleware, quizManagementController.updateCourse);
router.delete('/course/:courseId', authMiddleware, quizManagementController.deleteCourse);
router.get('/courses', authMiddleware, quizManagementController.getCourses);

// Quiz question management per course
router.post('/questions/:courseCode', authMiddleware, quizManagementController.addQuestionsToCourse);
router.get('/questions/:courseCode', authMiddleware, quizManagementController.getQuestionsForCourse);
router.patch('/questions/:courseCode/:questionId', authMiddleware, quizManagementController.updateQuestion);
router.delete('/questions/:courseCode/:questionId', authMiddleware, quizManagementController.deleteQuestion);

module.exports = router;
