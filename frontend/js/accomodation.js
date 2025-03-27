// accomodation.js placeholder
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const accommodationPosts = document.getElementById("accommodationPosts");

  async function loadAccommodations() {
    try {
      const res = await fetch("/api/admin/accommodation", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.accommodations) {
        accommodationPosts.innerHTML = "";
        data.accommodations.forEach(post => {
          const div = document.createElement("div");
          div.classList.add("accommodation");
          div.innerHTML = `<h2>${post.title}</h2><p>${post.description}</p>`;
          if (post.videoUrl) {
            div.innerHTML += `<iframe src="${post.videoUrl}" allowfullscreen></iframe>`;
          }
          accommodationPosts.appendChild(div);
        });
      } else {
        alert(data.message || "Failed to load accommodations");
      }
    } catch (error) {
      console.error("Error loading accommodations:", error);
    }
  }

  loadAccommodations();
});
