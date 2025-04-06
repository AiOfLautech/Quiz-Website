const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/announcement', publicController.getAnnouncements);
router.get('/courses', publicController.getCourses);
router.get('/accommodation', publicController.getAccommodations);
router.get('/discussion', publicController.getDiscussions);

module.exports = router;
