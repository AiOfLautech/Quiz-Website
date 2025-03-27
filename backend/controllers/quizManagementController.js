const Course = require('../models/courseModel');

exports.addCourse = async (req, res) => {
  try {
    const { courseCode, timerDuration, numberOfQuestions, questionBank } = req.body;
    const newCourse = new Course({
      courseCode,
      timerDuration,
      numberOfQuestions,
      questionBank,
    });
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Server error adding course" });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { courseCode, timerDuration, numberOfQuestions, questionBank } = req.body;
    const course = await Course.findByIdAndUpdate(
      courseId,
      { courseCode, timerDuration, numberOfQuestions, questionBank },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server error updating course" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error deleting course" });
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

module.exports = {
  addCourse: exports.addCourse,
  updateCourse: exports.updateCourse,
  deleteCourse: exports.deleteCourse,
  getCourses: exports.getCourses,
};
