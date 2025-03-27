// messagingRoutes.js placeholder
const express = require('express');
const router = express.Router();
const messagingController = require('../controllers/messagingController');

// Get Inbox Messages for the logged-in user
router.get('/inbox', /* authMiddleware, */ messagingController.getInbox);

// Send a New Private Message
router.post('/send', /* authMiddleware, */ messagingController.sendMessage);

// Get Conversation between logged-in user and another user (by otherUserId)
router.get('/conversation/:otherUserId', /* authMiddleware, */ messagingController.getConversation);

module.exports = router;
