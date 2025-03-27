// /backend/utils/analyticsUtil.js
// Outline: Functions for processing analytics data

// Example: Calculate average quiz score from an array of scores
const calculateAverageScore = (scores) => {
  if (!scores || scores.length === 0) return 0;
  const total = scores.reduce((acc, score) => acc + score, 0);
  return total / scores.length;
};

module.exports = { calculateAverageScore };

