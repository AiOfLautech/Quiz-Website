// analyticsRoutes.js placeholder
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Get Analytics Data (Outline endpoint)
router.get('/data', /* authMiddleware, */ analyticsController.getAnalyticsData);

module.exports = router;
