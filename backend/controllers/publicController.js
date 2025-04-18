const Announcement = require('../models/announcementModel');
const Course = require('../models/courseModel');
const Accommodation = require('../models/accommodationModel');
const Discussion = require('../models/discussionModel');

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json({ announcements });
  } catch (error) {
    console.error("Error retrieving announcements:", error);
    res.status(500).json({ message: "Server error retrieving announcements" });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (error) {
    console.error("Error retrieving courses:", error);
    res.status(500).json({ message: "Server error retrieving courses" });
  }
};

exports.getAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find().sort({ createdAt: -1 });
    res.json({ accommodations });
  } catch (error) {
    console.error("Error retrieving accommodations:", error);
    res.status(500).json({ message: "Server error retrieving accommodations" });
  }
};

exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('createdBy', 'username').sort({ createdAt: -1 });
    res.json({ discussions });
  } catch (error) {
    console.error("Error retrieving discussions:", error);
    res.status(500).json({ message: "Server error retrieving discussions" });
  }
};
