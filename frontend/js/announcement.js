document.addEventListener("DOMContentLoaded", () => {
  async function loadPublicAnnouncements() {
    try {
      const res = await fetch("/api/public/announcement");
      const data = await res.json();
      if (res.ok && data.announcements) {
        const announcementsList = document.getElementById("announcementsList");
        announcementsList.innerHTML = data.announcements
          .map(announcement =>
            `<div class="announcement-item">
               <h2>${announcement.title}</h2>
               <p>${announcement.content}</p>
             </div>`
          )
          .join('');
      } else {
        console.error("Failed to load announcements:", data.message);
      }
    } catch (error) {
      console.error("Error loading announcements:", error);
    }
  }
  loadPublicAnnouncements();
});
