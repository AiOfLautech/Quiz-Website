document.addEventListener("DOMContentLoaded", () => {
  // Example: display the logged-in username if available
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.username) {
    document.getElementById("welcomeUser").textContent = user.username;
  }

  // Function to start quiz:
  window.startQuiz = (courseId) => {
    // Save the selected course id in localStorage
    localStorage.setItem("selectedCourseId", courseId);
    // Redirect to quiz page
    window.location.href = "quiz.html";
  };
});
