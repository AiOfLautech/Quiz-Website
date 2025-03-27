const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Announcement = require('../models/announcementModel');
const Accommodation = require('../models/accommodationModel');

exports.generateAutoPassword = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { username } = req.body;
    const user = await User.findOne({ username, role: 'admin' });
    if (!user) {
      return res.status(404).json({ message: 'Admin user not found' });
    }
    if (user.lastAutoPasswordAt && Date.now() - user.lastAutoPasswordAt < 3600000) {
      return res.status(429).json({ message: 'Auto-generated password can only be requested once per hour' });
    }
    const autoPassword = crypto.randomBytes(4).toString('hex');
    const hashedPassword = await bcrypt.hash(autoPassword, 10);
    user.password = hashedPassword;
    user.lastAutoPasswordAt = Date.now();
    await user.save();
    return res.json({ message: 'Auto-generated password set', autoPassword });
  } catch (error) {
    console.error('Error generating auto-password:', error);
    return res.status(500).json({ message: 'Server error in auto password generation' });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { title, content } = req.body;
    const newAnnouncement = new Announcement({
      title,
      content,
      createdBy: req.user._id,
    });
    await newAnnouncement.save();
    return res.status(201).json({ message: 'Announcement created successfully', announcement: newAnnouncement });
  } catch (error) {
    console.error('Error creating announcement:', error);
    return res.status(500).json({ message: 'Server error creating announcement' });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { announcementId } = req.params;
    const { title, content } = req.body;
    const announcement = await Announcement.findByIdAndUpdate(
      announcementId,
      { title, content },
      { new: true }
    );
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    return res.json({ message: 'Announcement updated successfully', announcement });
  } catch (error) {
    console.error('Error updating announcement:', error);
    return res.status(500).json({ message: 'Server error updating announcement' });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { announcementId } = req.params;
    await Announcement.findByIdAndDelete(announcementId);
    return res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return res.status(500).json({ message: 'Server error deleting announcement' });
  }
};

exports.createAccommodation = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { title, description, videoUrl } = req.body;
    const newAccommodation = new Accommodation({
      title,
      description,
      videoUrl,
      createdBy: req.user._id,
    });
    await newAccommodation.save();
    return res.status(201).json({ message: 'Accommodation created successfully', accommodation: newAccommodation });
  } catch (error) {
    console.error('Error creating accommodation:', error);
    return res.status(500).json({ message: 'Server error creating accommodation' });
  }
};

exports.updateAccommodation = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { accommodationId } = req.params;
    const { title, description, videoUrl } = req.body;
    const accommodation = await Accommodation.findByIdAndUpdate(
      accommodationId,
      { title, description, videoUrl },
      { new: true }
    );
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    return res.json({ message: 'Accommodation updated successfully', accommodation });
  } catch (error) {
    console.error('Error updating accommodation:', error);
    return res.status(500).json({ message: 'Server error updating accommodation' });
  }
};

exports.deleteAccommodation = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { accommodationId } = req.params;
    await Accommodation.findByIdAndDelete(accommodationId);
    return res.json({ message: 'Accommodation deleted successfully' });
  } catch (error) {
    console.error('Error deleting accommodation:', error);
    return res.status(500).json({ message: 'Server error deleting accommodation' });
  }
};

module.exports = {
  generateAutoPassword: exports.generateAutoPassword,
  createAnnouncement: exports.createAnnouncement,
  updateAnnouncement: exports.updateAnnouncement,
  deleteAnnouncement: exports.deleteAnnouncement,
  createAccommodation: exports.createAccommodation,
  updateAccommodation: exports.updateAccommodation,
  deleteAccommodation: exports.deleteAccommodation,
};
