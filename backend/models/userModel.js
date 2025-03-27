const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: false,  // Make email optional
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: ''
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastAutoPasswordAt: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
