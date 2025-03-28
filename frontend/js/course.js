document.addEventListener("DOMContentLoaded", () => {
  async function loadCourses() {
    try {
      const res = await fetch("/api/public/courses");
      const data = await res.json();
      if (res.ok && data.courses) {
        const coursesContainer = document.querySelector('.courses');
        coursesContainer.innerHTML = data.courses
          .map(course =>
            `<div class="course">
               <h2>${course.courseCode}</h2>
               <button onclick="startQuiz('${course._id}')">Start Quiz</button>
             </div>`
          )
          .join('');
      } else {
        console.error("Failed to load courses:", data.message);
      }
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  }
  loadCourses();
});
