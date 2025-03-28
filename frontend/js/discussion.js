document.addEventListener("DOMContentLoaded", () => {
  async function loadDiscussions() {
    try {
      const res = await fetch("/api/public/discussion");
      const data = await res.json();
      if (res.ok && data.discussions) {
        const discussionPosts = document.getElementById("discussionPosts");
        discussionPosts.innerHTML = data.discussions
          .map(post =>
            `<div class="discussion-post">
               <p>${post.content}</p>
               <small>Posted by: ${post.createdBy ? post.createdBy.username : "Unknown"}</small>
             </div>`
          )
          .join('');
      } else {
        console.error("Failed to load discussions:", data.message);
      }
    } catch (error) {
      console.error("Error loading discussions:", error);
    }
  }
  loadDiscussions();
});
