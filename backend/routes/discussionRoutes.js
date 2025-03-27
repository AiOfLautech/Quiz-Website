// discussionRoutes.js placeholder
const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');

// Get All Discussion Posts
router.get('/', /* authMiddleware, */ discussionController.getDiscussions);

// Create a New Discussion Post
router.post('/', /* authMiddleware, */ discussionController.createDiscussion);

// Update a Discussion Post (by post ID)
router.patch('/:postId', /* authMiddleware, */ discussionController.updateDiscussion);

// Delete a Discussion Post (by post ID)
router.delete('/:postId', /* authMiddleware, */ discussionController.deleteDiscussion);

module.exports = router;
