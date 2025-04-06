const express = require('express');  
const router = express.Router();  
const quizManagementController = require('../controllers/quizManagementController');  
const authMiddleware = require('../middleware/authMiddleware');  
  
// These routes are protected (require admin token)  
router.post('/course', authMiddleware, quizManagementController.addCourse);  
router.patch('/course/:courseId', authMiddleware, quizManagementController.updateCourse);  
router.delete('/course/:courseId', authMiddleware, quizManagementController.deleteCourse);  
router.get('/courses', authMiddleware, quizManagementController.getCourses);  
module.exports = router;
