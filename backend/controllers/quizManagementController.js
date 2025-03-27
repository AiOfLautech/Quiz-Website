// quizManagementController.js placeholder
const Course = require('../models/courseModel');

// Add New Course
exports.addCourse = async (req, res) => {
  const { courseCode, timerDuration, numberOfQuestions, questionBank } = req.body;
  try {
    const newCourse = new Course({
      courseCode,
      timerDuration,
      numberOfQuestions,
      questionBank,
    });
    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { courseCode, timerDuration, numberOfQuestions, questionBank } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: 'Course not found' });
    }
    course.courseCode = courseCode || course.courseCode;
    course.timerDuration = timerDuration || course.timerDuration;
    course.numberOfQuestions = numberOfQuestions || course.numberOfQuestions;
    course.questionBank = questionBank || course.questionBank;
    await course.save();
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: 'Course not found' });
    }
    await course.remove();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
