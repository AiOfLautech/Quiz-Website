// adminRoutes.js placeholder
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Announcement Endpoints
router.post('/announcement', /* authMiddleware, */ adminController.createAnnouncement);
router.patch('/announcement/:announcementId', /* authMiddleware, */ adminController.updateAnnouncement);
router.delete('/announcement/:announcementId', /* authMiddleware, */ adminController.deleteAnnouncement);

// Accommodation Endpoints
router.post('/accommodation', /* authMiddleware, */ adminController.createAccommodation);
router.patch('/accommodation/:accommodationId', /* authMiddleware, */ adminController.updateAccommodation);
router.delete('/accommodation/:accommodationId', /* authMiddleware, */ adminController.deleteAccommodation);

// Admin Auto-Generated Password
router.post('/generate-password', /* authMiddleware, */ adminController.generateAutoPassword);

module.exports = router;
