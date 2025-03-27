// discussionModel.js placeholder
const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isAdminPost: {
      type: Boolean,
      default: false,
    },
    // Optional parent field for threaded replies
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discussion',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Discussion', discussionSchema);
