// admin.js - Client-side admin functionality
document.addEventListener("DOMContentLoaded", function() {
  console.log("Admin Panel Loaded");

  // --- Quiz Management Section ---
  const addCourseForm = document.getElementById("addCourseForm");
  if (addCourseForm) {
    addCourseForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const courseCode = document.getElementById("courseCode").value;
      const timerDuration = document.getElementById("timer").value;
      const numberOfQuestions = document.getElementById("numQuestions").value;
      const questionsBankText = document.getElementById("questionsBank").value;
      let questionBank;
      try {
        questionBank = JSON.parse(questionsBankText);
      } catch (err) {
        alert("Invalid JSON in Questions Bank");
        return;
      }
      try {
        const token = localStorage.getItem("adminToken"); // Admin token stored after login
        const res = await fetch("/api/quiz-management/course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            courseCode,
            timerDuration,
            numberOfQuestions,
            questionBank
          })
        });
        const data = await res.json();
        if (res.ok) {
          alert("Course added successfully!");
          addCourseForm.reset();
          loadCourses();
        } else {
          alert(data.message || "Failed to add course");
        }
      } catch (error) {
        console.error("Error adding course:", error);
      }
    });
  }

  async function loadCourses() {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/quiz-management/courses", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.courses) {
        const tbody = document.querySelector("#courseTable tbody");
        tbody.innerHTML = "";
        data.courses.forEach(course => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${course.courseCode}</td>
            <td>${course.timerDuration}</td>
            <td>${course.numberOfQuestions}</td>
            <td>
              <button onclick="updateCourse('${course._id}')">Update</button>
              <button onclick="deleteCourse('${course._id}')">Delete</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      } else {
        alert(data.message || "Failed to load courses");
      }
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  }
  loadCourses();

  window.deleteCourse = async function(courseId) {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/quiz-management/course/${courseId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert("Course deleted successfully");
        loadCourses();
      } else {
        alert(data.message || "Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // --- Announcement Management Section ---
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
        announcementsList.innerHTML = "";
        data.announcements.forEach(announcement => {
          const div = document.createElement("div");
          div.classList.add("announcement-item");
          div.innerHTML = `<h2>${announcement.title}</h2><p>${announcement.content}</p>`;
          announcementsList.appendChild(div);
        });
      }
    } catch (error) {
      console.error("Error loading announcements:", error);
    }
  }
  loadAnnouncements();

  // --- Accommodation Management Section ---
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("accommodationForm");
  const listContainer = document.getElementById("accommodationsList");

  async function loadAccommodations() {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/accommodation", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.accommodations) {
        listContainer.innerHTML = data.accommodations
          .map(post =>
            `<div class="accommodation-item" data-id="${post._id}">
              <h2>${post.title}</h2>
              <p>${post.description}</p>
              ${post.videoUrl ? `<iframe src="${post.videoUrl}" allowfullscreen></iframe>` : ""}
              <button onclick="editAccommodation('${post._id}')">Edit</button>
              <button onclick="deleteAccommodation('${post._id}')">Delete</button>
            </div>`
          ).join('');
      } else {
        listContainer.innerHTML = "<p>No accommodations found.</p>";
      }
    } catch (error) {
      console.error("Error loading accommodations:", error);
    }
  }

  window.editAccommodation = (id) => {
    const item = document.querySelector(`.accommodation-item[data-id="${id}"]`);
    const title = item.querySelector("h2").innerText;
    const description = item.querySelector("p").innerText;
    // For video URL, you may need to extract from an iframe if available
    const iframe = item.querySelector("iframe");
    const videoUrl = iframe ? iframe.getAttribute("src") : "";
    document.getElementById("accommodationId").value = id;
    document.getElementById("accommodationTitle").value = title;
    document.getElementById("accommodationDescription").value = description;
    document.getElementById("accommodationVideoUrl").value = videoUrl;
  };

  window.deleteAccommodation = async (id) => {
    if (!confirm("Are you sure you want to delete this accommodation?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/accommodation/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      alert(data.message);
      loadAccommodations();
    } catch (error) {
      console.error("Error deleting accommodation:", error);
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("accommodationId").value;
    const title = document.getElementById("accommodationTitle").value;
    const description = document.getElementById("accommodationDescription").value;
    const videoUrl = document.getElementById("accommodationVideoUrl").value;
    const token = localStorage.getItem("adminToken");
    let url = "/api/admin/accommodation";
    let method = "POST";
    if (id) {
      url = `/api/admin/accommodation/${id}`;
      method = "PATCH";
    }
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, videoUrl })
      });
      const data = await res.json();
      alert(data.message);
      form.reset();
      loadAccommodations();
    } catch (error) {
      console.error("Error saving accommodation:", error);
    }
  });

  loadAccommodations();
    
  // --- Admin Profile Management (Example) ---
  const adminProfileForm = document.getElementById("adminProfileForm");
  if (adminProfileForm) {
    adminProfileForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const name = document.getElementById("adminName").value;
      const email = document.getElementById("adminEmail").value;
      const avatar = document.getElementById("adminAvatar").value;
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch("/api/auth/update-profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ username: name, email, avatar })
        });
        const data = await res.json();
        if (res.ok) {
          alert("Profile updated successfully");
        } else {
          alert(data.message || "Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating admin profile:", error);
      }
    });
  }

  // --- Admin Messaging: Load Inbox ---
  async function loadAdminInbox() {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/messaging/inbox", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.messages) {
        const adminInbox = document.getElementById("adminInbox");
        adminInbox.innerHTML = "";
        data.messages.forEach(message => {
          const div = document.createElement("div");
          div.classList.add("message");
          div.innerHTML = `<strong>${message.sender.username}:</strong> ${message.content}`;
          adminInbox.appendChild(div);
        });
      }
    } catch (error) {
      console.error("Error loading admin inbox:", error);
    }
  }
  loadAdminInbox();

  // --- Admin Auto Password Generation ---
  const autoPassForm = document.getElementById("autoPassForm");
  if (autoPassForm) {
    autoPassForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("adminUsername").value;
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch("/api/admin/generate-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ username })
        });
        const data = await res.json();
        if (res.ok) {
          document.getElementById("generatedPassword").textContent = "New Password: " + data.autoPassword;
        } else {
          alert(data.message || "Failed to generate password");
        }
      } catch (error) {
        console.error("Error generating auto-password:", error);
      }
    });
  }
});
