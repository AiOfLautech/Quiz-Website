document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("announcementForm");
  const listContainer = document.getElementById("announcementsList");

  async function loadAnnouncements() {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/announcement", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      // Assume the response returns { announcements: [...] }
      const data = await res.json();
      if (res.ok && data.announcements) {
        listContainer.innerHTML = data.announcements
          .map(ann =>
            `<div class="announcement-item" data-id="${ann._id}">
              <h2>${ann.title}</h2>
              <p>${ann.content}</p>
              <button onclick="editAnnouncement('${ann._id}')">Edit</button>
              <button onclick="deleteAnnouncement('${ann._id}')">Delete</button>
            </div>`
          ).join('');
      } else {
        listContainer.innerHTML = "<p>No announcements found.</p>";
      }
    } catch (error) {
      console.error("Error loading announcements:", error);
    }
  }

  window.editAnnouncement = (id) => {
    const item = document.querySelector(`.announcement-item[data-id="${id}"]`);
    const title = item.querySelector("h2").innerText;
    const content = item.querySelector("p").innerText;
    document.getElementById("announcementId").value = id;
    document.getElementById("announcementTitle").value = title;
    document.getElementById("announcementContent").value = content;
  };

  window.deleteAnnouncement = async (id) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/announcement/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      alert(data.message);
      loadAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("announcementId").value;
    const title = document.getElementById("announcementTitle").value;
    const content = document.getElementById("announcementContent").value;
    const token = localStorage.getItem("adminToken");
    let url = "/api/admin/announcement";
    let method = "POST";
    if (id) {
      url = `/api/admin/announcement/${id}`;
      method = "PATCH";
    }
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });
      const data = await res.json();
      alert(data.message);
      form.reset();
      loadAnnouncements();
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  });

  loadAnnouncements();
});
