// adminPasswordLimiter.js placeholder
// /backend/middleware/adminPasswordLimiter.js
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.user.lastAutoPasswordAt) {
    const elapsed = Date.now() - req.user.lastAutoPasswordAt;
    const oneHour = 3600000; // 1 hour in milliseconds
    if (elapsed < oneHour) {
      return res.status(429).json({
        message: 'Auto-generated password can only be requested once per hour'
      });
    }
  }
  next();
};
