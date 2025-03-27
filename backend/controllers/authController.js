const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Public user registration
exports.registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // Check if username already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    console.log("New user registered:", newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login a user (or admin) using username and password
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Reset password using username
exports.resetPassword = async (req, res) => {
  const { username, newPassword } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error during password reset" });
  }
};

// Admin registration endpoint (requires invite key)
exports.registerAdmin = async (req, res) => {
  const { username, password, inviteKey, email } = req.body;
  if (inviteKey !== process.env.ADMIN_INVITE_KEY) {
    return res.status(403).json({ message: "Invalid admin invitation key" });
  }
  try {
    const adminExists = await User.findOne({ username });
    if (adminExists) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({ username, password: hashedPassword, role: 'admin', email });
    await newAdmin.save();
    console.log("New admin registered:", newAdmin);
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Admin registration error:", error);
    res.status(500).json({ message: "Server error during admin registration" });
  }
};

module.exports = {
  registerUser: exports.registerUser,
  loginUser: exports.loginUser,
  resetPassword: exports.resetPassword,
  registerAdmin: exports.registerAdmin,
};
