// discussionController.js placeholder
const Discussion = require('../models/discussionModel');

/**
 * Get all discussion posts.
 */
exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('createdBy', 'username role');
    return res.json({ discussions });
  } catch (error) {
    console.error('Error retrieving discussions:', error);
    return res.status(500).json({ message: 'Server error retrieving discussions' });
  }
};

/**
 * Create a new discussion post.
 */
exports.createDiscussion = async (req, res) => {
  try {
    const { content, parent } = req.body;
    const newPost = new Discussion({
      content,
      createdBy: req.user._id,
      isAdminPost: req.user.role === 'admin',
      parent: parent || null,
    });
    await newPost.save();
    return res.status(201).json({ message: 'Discussion post created', post: newPost });
  } catch (error) {
    console.error('Error creating discussion post:', error);
    return res.status(500).json({ message: 'Server error creating discussion post' });
  }
};

/**
 * Update a discussion post.
 */
exports.updateDiscussion = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const updatedPost = await Discussion.findByIdAndUpdate(postId, { content }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Discussion post not found' });
    }
    return res.json({ message: 'Discussion post updated', post: updatedPost });
  } catch (error) {
    console.error('Error updating discussion post:', error);
    return res.status(500).json({ message: 'Server error updating discussion post' });
  }
};

/**
 * Delete a discussion post.
 */
exports.deleteDiscussion = async (req, res) => {
  try {
    const { postId } = req.params;
    await Discussion.findByIdAndDelete(postId);
    return res.json({ message: 'Discussion post deleted' });
  } catch (error) {
    console.error('Error deleting discussion post:', error);
    return res.status(500).json({ message: 'Server error deleting discussion post' });
  }
};

module.exports = {
  getDiscussions: exports.getDiscussions,
  createDiscussion: exports.createDiscussion,
  updateDiscussion: exports.updateDiscussion,
  deleteDiscussion: exports.deleteDiscussion,
};
