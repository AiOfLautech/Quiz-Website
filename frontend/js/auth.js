document.addEventListener("DOMContentLoaded", () => {
  // Signup Form Handler (Public)
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("name").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();
      const email = document.getElementById("email") ? document.getElementById("email").value.trim() : "";
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, email }),
        });
        const data = await res.json();
        if (res.ok) {
          alert("Signup successful! Please log in.");
          window.location.href = "login.html";
        } else {
          alert(data.message || "Signup failed");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("An error occurred during signup.");
      }
    });
  }

  // Login Form Handler (Public)
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.ok) {
          if (data.user.role === "admin") {
            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/admin/admin.html";
          } else {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "main.html";
          }
        } else {
          alert(data.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login.");
      }
    });
  }

  // Reset Password Form Handler (Public)
  const resetForm = document.getElementById("resetPasswordForm");
  if (resetForm) {
    resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("email").value.trim(); // Consider renaming this field to "username"
      const newPassword = document.getElementById("newPassword").value.trim();
      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, newPassword }),
        });
        const data = await res.json();
        alert(data.message);
        if (res.ok) {
          window.location.href = "login.html";
        }
      } catch (error) {
        console.error("Reset password error:", error);
        alert("An error occurred during password reset.");
      }
    });
  }
});
