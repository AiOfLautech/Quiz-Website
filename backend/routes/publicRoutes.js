const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const publicController = require('../controllers/publicController');

// Public announcements
router.get('/announcement', publicController.getAnnouncements);

// Public courses (for quiz management)
router.get('/courses', publicController.getCourses);

// Public accommodations
router.get('/accommodation', publicController.getAccommodations);

// Public discussion board
router.get('/discussion', publicController.getDiscussions);

// Load quiz questions for a specific course (from JSON file)
router.get('/quiz/:courseCode', (req, res) => {
  const { courseCode } = req.params;
  const quizPath = path.join(__dirname, `../../quizzes/${courseCode}.json`);

  fs.readFile(quizPath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error loading quiz for ${courseCode}:`, err.message);
      return res.status(404).json({ error: 'Quiz not found for this course' });
    }

    try {
      const questions = JSON.parse(data);
      res.json({ success: true, questions });
    } catch (parseError) {
      res.status(500).json({ error: 'Invalid quiz data format' });
    }
  });
});

module.exports = router;
