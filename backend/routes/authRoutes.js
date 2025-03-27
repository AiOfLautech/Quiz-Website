const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Public user signup
router.post('/signup', authController.registerUser);

// Public login route (for both public users and admins)
router.post('/login', authController.loginUser);

// Reset password route
router.post('/reset-password', authController.resetPassword);

// Admin signup route (protected by invite key)
router.post('/admin-signup', authController.registerAdmin);

module.exports = router;
