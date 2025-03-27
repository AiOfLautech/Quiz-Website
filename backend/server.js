// /backend/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const quizManagementRoutes = require('./routes/quizManagementRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const messagingRoutes = require('./routes/messagingRoutes');
const aiChatRoutes = require('./routes/aiChatRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/quiz-management', quizManagementRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/discussion', discussionRoutes);
app.use('/api/messaging', messagingRoutes);
app.use('/api/ai-chat', aiChatRoutes);

// Fallback: serve the landing page (signup.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/signup.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

