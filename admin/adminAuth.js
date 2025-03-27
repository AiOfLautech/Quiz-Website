document.addEventListener('DOMContentLoaded', () => {
  const adminLoginForm = document.getElementById('adminLoginForm');
  const loginMessage = document.getElementById('loginMessage');

  adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        // Verify that the user is an admin
        if (data.user.role === 'admin') {
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = "admin.html"; // Redirect to admin dashboard
        } else {
          loginMessage.innerHTML = '<p style="color:red;">Access denied: Not an admin account.</p>';
        }
      } else {
        loginMessage.innerHTML = `<p style="color:red;">${data.message || "Login failed"}</p>`;
      }
    } catch (error) {
      console.error("Admin login error:", error);
      loginMessage.innerHTML = '<p style="color:red;">An error occurred during login.</p>';
    }
  });
});
