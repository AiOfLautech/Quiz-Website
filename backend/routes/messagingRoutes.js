const express = require('express');
const router = express.Router();
const messagingController = require('../controllers/messagingController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/inbox', authMiddleware, messagingController.getInbox);
router.post('/send', authMiddleware, messagingController.sendMessage);
router.get('/conversation/:otherUserId', authMiddleware, messagingController.getConversation);

module.exports = router;
