// quizManagementRoutes.js placeholder
const express = require('express');
const router = express.Router();
const quizManagementController = require('../controllers/quizManagementController');

// Add a New Course
router.post('/course', /* authMiddleware, */ quizManagementController.addCourse);

// Update Course Settings (by course ID)
router.patch('/course/:courseId', /* authMiddleware, */ quizManagementController.updateCourse);

// Delete a Course (by course ID)
router.delete('/course/:courseId', /* authMiddleware, */ quizManagementController.deleteCourse);

module.exports = router;
