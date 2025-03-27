const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Public user signup
router.post('/signup', authController.registerUser);

// Public login (for both users and admins)
router.post('/login', authController.loginUser);

// Reset password using username
router.post('/reset-password', authController.resetPassword);

// Admin signup (protected by invite key)
router.post('/admin-signup', authController.registerAdmin);

module.exports = router;
