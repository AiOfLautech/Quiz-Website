const Message = require('../models/messageModel');

exports.getInbox = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const messages = await Message.find({ receiver: req.user._id })
      .populate('sender', 'username email')
      .sort({ createdAt: -1 });
    return res.json({ messages });
  } catch (error) {
    console.error("Error retrieving inbox:", error);
    return res.status(500).json({ message: "Server error retrieving inbox" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { receiverId, content } = req.body;
    const newMessage = new Message({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });
    await newMessage.save();
    return res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Server error sending message" });
  }
};

exports.getConversation = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { otherUserId } = req.params;
    const conversation = await Message.find({
      $or: [
        { sender: req.user._id, receiver: otherUserId },
        { sender: otherUserId, receiver: req.user._id }
      ]
    })
      .populate('sender', 'username email')
      .populate('receiver', 'username email')
      .sort({ createdAt: 1 });
    return res.json({ conversation });
  } catch (error) {
    console.error("Error retrieving conversation:", error);
    return res.status(500).json({ message: "Server error retrieving conversation" });
  }
};

module.exports = {
  getInbox: exports.getInbox,
  sendMessage: exports.sendMessage,
  getConversation: exports.getConversation,
};
