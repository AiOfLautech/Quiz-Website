// result.js placeholder
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.username) {
    document.getElementById("usernameDisplay").textContent = user.username;
  }
  const resultData = JSON.parse(localStorage.getItem("quizResult") || "{}");
  if (resultData.score !== undefined) {
    document.getElementById("totalScore").textContent = resultData.score;
    // You can add additional result processing here
  } else {
    document.getElementById("resultChart").innerHTML = "<p>No results found.</p>";
  }
});
