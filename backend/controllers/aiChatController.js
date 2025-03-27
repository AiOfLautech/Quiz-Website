// aiChatController.js placeholder
const express = require('express');
const router = express.Router();
const aiChatController = require('../controllers/aiChatController');

// Get current AI Chat session (if needed)
router.get('/session', /* authMiddleware, */ aiChatController.getChatSession);

// Post a new message to the AI Chat and receive response with markup and inline keyboard
router.post('/message', /* authMiddleware, */ aiChatController.postMessage);

module.exports = router;
