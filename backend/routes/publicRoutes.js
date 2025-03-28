const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

// Public announcements
router.get('/announcement', publicController.getAnnouncements);

// Public courses (for quiz management)
router.get('/courses', publicController.getCourses);

// Public accommodations
router.get('/accommodation', publicController.getAccommodations);

// Public discussion board
router.get('/discussion', publicController.getDiscussions);

module.exports = router;
