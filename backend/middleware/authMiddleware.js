const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  console.log("Received token:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.error("User not found");
      return res.status(401).json({ message: "User not found" });
    }
    // If route is under /api/admin, ensure user is admin.
    if (req.originalUrl.startsWith("/api/admin") && user.role !== 'admin') {
      console.error("User is not admin");
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
