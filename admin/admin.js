document.addEventListener("DOMContentLoaded", function() {
  console.log("Admin Panel Loaded");

  // Load admin username from localStorage and display it in header
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if(user.username) {
    document.getElementById("usernameDisplay").textContent = user.username;
  }

  // --- Announcement Management ---
  const announcementForm = document.getElementById("announcementForm");
  if (announcementForm) {
    announcementForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const title = document.getElementById("announcementTitle").value;
      const content = document.getElementById("announcementContent").value;
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch("/api/admin/announcement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ title, content })
        });
        const data = await res.json();
        if (res.ok) {
          alert("Announcement created successfully");
          announcementForm.reset();
          loadAnnouncements();
        } else {
          alert(data.message || "Failed to create announcement");
        }
      } catch (error) {
        console.error("Error creating announcement:", error);
      }
    });
  }

  async function loadAnnouncements() {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/announcement", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.announcements) {
        const announcementsList = document.getElementById("announcementsList");
        announcementsList.innerHTML = data.announcements.map(announcement => `
          <div class="announcement-item" data-id="${announcement._id}">
            <h2>${announcement.title}</h2>
            <p>${announcement.content}</p>
            <button onclick="editAnnouncement('${announcement._id}')">Edit</button>
            <button onclick="deleteAnnouncement('${announcement._id}')">Delete</button>
          </div>
        `).join('');
      } else {
        console.error("Failed to load announcements:", data.message);
      }
    } catch (error) {
      console.error("Error loading announcements:", error);
    }
  }
  loadAnnouncements();

  window.deleteAnnouncement = async function(announcementId) {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/announcement/${announcementId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert("Announcement deleted successfully");
        loadAnnouncements();
      } else {
        alert(data.message || "Failed to delete announcement");
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  window.editAnnouncement = async function(announcementId) {
    const newTitle = prompt("Enter new title:");
    const newContent = prompt("Enter new content:");
    if (!newTitle || !newContent) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/announcement/${announcementId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTitle, content: newContent })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Announcement updated successfully");
        loadAnnouncements();
      } else {
        alert(data.message || "Failed to update announcement");
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  // --- Accommodation Management ---
  const accommodationForm = document.getElementById("accommodationForm");
  if (accommodationForm) {
    accommodationForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const title = document.getElementById("accommodationTitle").value;
      const description = document.getElementById("accommodationDescription").value;
      const videoUrl = document.getElementById("accommodationVideoUrl").value;
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch("/api/admin/accommodation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ title, description, videoUrl })
        });
        const data = await res.json();
        if (res.ok) {
          alert("Accommodation created successfully");
          accommodationForm.reset();
          loadAccommodations();
        } else {
          alert(data.message || "Failed to create accommodation");
        }
      } catch (error) {
        console.error("Error creating accommodation:", error);
      }
    });
  }

  async function loadAccommodations() {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/accommodation", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.accommodations) {
        const accommodationsList = document.getElementById("accommodationsList");
        accommodationsList.innerHTML = data.accommodations.map(post => `
          <div class="accommodation-item" data-id="${post._id}">
            <h2>${post.title}</h2>
            <p>${post.description}</p>
            ${post.videoUrl ? `<iframe src="${post.videoUrl}" allowfullscreen></iframe>` : ""}
            <button onclick="editAccommodation('${post._id}')">Edit</button>
            <button onclick="deleteAccommodation('${post._id}')">Delete</button>
          </div>
        `).join('');
      } else {
        console.error("Failed to load accommodations:", data.message);
      }
    } catch (error) {
      console.error("Error loading accommodations:", error);
    }
  }
  loadAccommodations();

  window.deleteAccommodation = async function(accommodationId) {
    if (!confirm("Are you sure you want to delete this accommodation?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/accommodation/${accommodationId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert("Accommodation deleted successfully");
        loadAccommodations();
      } else {
        alert(data.message || "Failed to delete accommodation");
      }
    } catch (error) {
      console.error("Error deleting accommodation:", error);
    }
  };

  window.editAccommodation = async function(accommodationId) {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");
    const newVideoUrl = prompt("Enter new video URL (optional):");
    if (!newTitle || !newDescription) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/accommodation/${accommodationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTitle, description: newDescription, videoUrl: newVideoUrl })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Accommodation updated successfully");
        loadAccommodations();
      } else {
        alert(data.message || "Failed to update accommodation");
      }
    } catch (error) {
      console.error("Error updating accommodation:", error);
    }
  };

  // Additional admin functionalities (messaging, profile update, etc.) can be added here.
});
