// Admin-related JavaScript
document.addEventListener("DOMContentLoaded", function() {
  console.log("Admin Panel Loaded");

  // --- Quiz Management Example ---
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

  // --- Announcement Management Example ---
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

  // --- Accommodation Management Example ---
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
          alert("Accommodation post created successfully");
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
        accommodationsList.innerHTML = "";
        data.accommodations.forEach(post => {
          const div = document.createElement("div");
          div.classList.add("accommodation-item");
          div.innerHTML = `<h2>${post.title}</h2><p>${post.description}</p>`;
          if (post.videoUrl) {
            div.innerHTML += `<iframe src="${post.videoUrl}" allowfullscreen></iframe>`;
          }
          accommodationsList.appendChild(div);
        });
      }
    } catch (error) {
      console.error("Error loading accommodations:", error);
    }
  }

  loadAccommodations();

  // --- Admin Messaging, Profile, and Auto Password handling should be similarly implemented.
});
