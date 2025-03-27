// authRoutes.js placeholder
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User Signup
router.post('/signup', authController.registerUser);

// User Login
router.post('/login', authController.loginUser);

// Reset Password (for simplicity, using one endpoint; adjust as needed)
router.post('/reset-password', authController.resetPassword);

// Update Profile (requires authentication)
// Uncomment the next line if you have an authentication middleware defined
// router.patch('/update-profile', authMiddleware, authController.updateProfile);

module.exports = router;
