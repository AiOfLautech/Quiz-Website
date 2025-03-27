const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user registration (signup)
router.post('/signup', authController.registerUser);

// Route for user login using username and password
router.post('/login', authController.loginUser);

// Route for password reset using username and newPassword
router.post('/reset-password', authController.resetPassword);

module.exports = router;
