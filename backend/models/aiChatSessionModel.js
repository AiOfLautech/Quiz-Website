// aiChatSessionModel.js placeholder
const mongoose = require('mongoose');

const aiChatSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Stores conversation history as an array of message objects
    messages: [
      {
        sender: { type: String, required: true }, // "user" or "ai"
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('AiChatSession', aiChatSessionSchema);
