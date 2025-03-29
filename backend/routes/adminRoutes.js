const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/announcement', authMiddleware, adminController.createAnnouncement);
router.patch('/announcement/:announcementId', authMiddleware, adminController.updateAnnouncement);
router.delete('/announcement/:announcementId', authMiddleware, adminController.deleteAnnouncement);

router.post('/accommodation', authMiddleware, adminController.createAccommodation);
router.patch('/accommodation/:accommodationId', authMiddleware, adminController.updateAccommodation);
router.delete('/accommodation/:accommodationId', authMiddleware, adminController.deleteAccommodation);

// Generate auto-password endpoint (public)
router.post('/generate-password', adminController.generateAutoPassword);

module.exports = router;
