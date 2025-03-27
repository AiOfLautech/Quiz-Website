// discussion.js placeholder
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const discussionPosts = document.getElementById("discussionPosts");

  async function loadDiscussions() {
    try {
      const res = await fetch("/api/discussion", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.discussions) {
        discussionPosts.innerHTML = "";
        data.discussions.forEach(post => {
          const postDiv = document.createElement("div");
          postDiv.classList.add("discussion-post");
          if (post.createdBy && post.createdBy.role === "admin") {
            postDiv.classList.add("admin");
          }
          postDiv.innerHTML = `<p>${post.content}</p><small>By: ${post.createdBy.username}</small>`;
          discussionPosts.appendChild(postDiv);
        });
      } else {
        alert(data.message || "Failed to load discussions");
      }
    } catch (error) {
      console.error("Error loading discussions:", error);
    }
  }

  loadDiscussions();

  const discussionForm = document.getElementById("discussionForm");
  if (discussionForm) {
    discussionForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const content = document.getElementById("discussionContent").value;
      try {
        const res = await fetch("/api/discussion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ content })
        });
        const data = await res.json();
        if (res.ok) {
          document.getElementById("discussionContent").value = "";
          loadDiscussions();
        } else {
          alert(data.message || "Failed to post discussion");
        }
      } catch (error) {
        console.error("Discussion post error:", error);
      }
    });
  }
});
