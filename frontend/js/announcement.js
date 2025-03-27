// announcement.js placeholder
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const announcementsList = document.getElementById("announcementsList");

  async function loadAnnouncements() {
    try {
      const res = await fetch("/api/admin/announcement", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.announcements) {
        announcementsList.innerHTML = "";
        data.announcements.forEach(announcement => {
          const div = document.createElement("div");
          div.classList.add("announcement");
          div.innerHTML = `<h2>${announcement.title}</h2><p>${announcement.content}</p>`;
          announcementsList.appendChild(div);
        });
      } else {
        alert(data.message || "Failed to load announcements");
      }
    } catch (error) {
      console.error("Error loading announcements:", error);
    }
  }

  loadAnnouncements();
});
