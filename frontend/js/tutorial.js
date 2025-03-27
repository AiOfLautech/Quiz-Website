// tutorial.js placeholder
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.username) {
    document.getElementById("usernameDisplay").textContent = user.username;
  }
});
