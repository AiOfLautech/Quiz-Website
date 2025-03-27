// mainpage.js placeholder
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.username) {
    document.getElementById("usernameDisplay").textContent = user.username;
    const welcomeEl = document.getElementById("welcomeUser");
    if (welcomeEl) welcomeEl.textContent = user.username;
  }

  // Function to start quiz - stores selected course ID in localStorage
  window.startQuiz = (courseId) => {
    localStorage.setItem("selectedCourseId", courseId);
    window.location.href = "quiz.html";
  }
});
