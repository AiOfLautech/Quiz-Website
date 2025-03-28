document.addEventListener("DOMContentLoaded", () => {
  async function loadAccommodations() {
    try {
      const res = await fetch("/api/public/accommodation");
      const data = await res.json();
      if (res.ok && data.accommodations) {
        const accommodationsList = document.getElementById("accommodationsList");
        accommodationsList.innerHTML = data.accommodations
          .map(post =>
            `<div class="accommodation-item">
               <h2>${post.title}</h2>
               <p>${post.description}</p>
               ${post.videoUrl ? `<iframe src="${post.videoUrl}" allowfullscreen></iframe>` : ""}
             </div>`
          )
          .join('');
      } else {
        console.error("Failed to load accommodations:", data.message);
      }
    } catch (error) {
      console.error("Error loading accommodations:", error);
    }
  }
  loadAccommodations();
});
