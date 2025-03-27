// backend/server.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static public pages (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend/pages')));
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));

// Serve static admin pages and assets
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// API Routes
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

// Fallback route for public pages (404 page)
app.get('*', (req, res) => {
  // If the URL starts with /admin, let the static middleware serve it
  if (req.url.startsWith('/admin')) {
    return res.status(404).send("Admin page not found");
  }
  // Otherwise, serve a 404 page from the public pages directory (if exists) or a default message
  res.status(404).sendFile(path.join(__dirname, '../frontend/pages/404.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
