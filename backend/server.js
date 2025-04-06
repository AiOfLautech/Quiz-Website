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

// Serve static admin pages on /admin
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Serve static public pages on root
app.use('/', express.static(path.join(__dirname, '../frontend/pages')));
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/js', express.static(path.join(__dirname, '../frontend/js')));
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));

// API Routes
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const quizManagementRoutes = require('./routes/quizManagementRoutes');
const adminRoutes = require('./routes/adminRoutes');
const messagingRoutes = require('./routes/messagingRoutes');
const aiChatRoutes = require('./routes/aiChatRoutes');
const publicRoutes = require('./routes/publicRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/quiz-management', quizManagementRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messaging', messagingRoutes);
app.use('/api/ai-chat', aiChatRoutes);
app.use('/api/public', publicRoutes);

// Fallback 404: serve admin 404 for /admin, public 404 for others
app.use((req, res) => {
  if (req.originalUrl.startsWith('/admin')) {
    res.status(404).sendFile(path.join(__dirname, '../admin/admin.html'));
  } else {
    res.status(404).sendFile(path.join(__dirname, '../frontend/pages/signup.html'));
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
