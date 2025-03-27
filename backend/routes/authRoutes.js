const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Public user signup and login routes
router.post('/signup', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/reset-password', authController.resetPassword);

// Admin signup route (protected by invite key)
router.post('/admin-signup', authController.registerAdmin);

module.exports = router;
