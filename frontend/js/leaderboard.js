// leaderboard.js placeholder
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch("/api/leaderboard", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok && data.leaderboard) {
      const tbody = document.querySelector("#leaderboardTable tbody");
      tbody.innerHTML = "";
      data.leaderboard.forEach((entry, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${entry.username}</td>
          <td>${entry.score}</td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      alert(data.message || "Failed to load leaderboard");
    }
  } catch (error) {
    console.error("Leaderboard error:", error);
  }
});
