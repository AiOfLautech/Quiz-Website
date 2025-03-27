// profile.js placeholder
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.username) {
    document.getElementById("usernameDisplay").textContent = user.username;
    // Populate profile form if available
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    if (nameField) nameField.value = user.username;
    if (emailField) emailField.value = user.email;
  }

  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const avatar = document.getElementById("avatar").value;
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("/api/auth/update-profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ username, email, avatar }),
        });
        const data = await res.json();
        if (res.ok) {
          alert("Profile updated successfully");
          localStorage.setItem("user", JSON.stringify(data.user));
          document.getElementById("usernameDisplay").textContent = data.user.username;
        } else {
          alert(data.message || "Update failed");
        }
      } catch (error) {
        console.error("Profile update error:", error);
      }
    });
  }
});
