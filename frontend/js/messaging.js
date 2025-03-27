// messaging.js placeholder
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const inbox = document.getElementById("inbox");

  async function loadInbox() {
    try {
      const res = await fetch("/api/messaging/inbox", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.messages) {
        inbox.innerHTML = "";
        data.messages.forEach(message => {
          const div = document.createElement("div");
          div.classList.add("message");
          div.innerHTML = `<strong>${message.sender.username}:</strong> ${message.content}`;
          inbox.appendChild(div);
        });
      } else {
        alert(data.message || "Failed to load messages");
      }
    } catch (error) {
      console.error("Inbox load error:", error);
    }
  }

  loadInbox();

  const messageForm = document.getElementById("messageForm");
  if (messageForm) {
    messageForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const receiverId = document.getElementById("receiverId").value;
      const content = document.getElementById("messageContent").value;
      try {
        const res = await fetch("/api/messaging/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ receiverId, content })
        });
        const data = await res.json();
        if (res.ok) {
          document.getElementById("messageContent").value = "";
          loadInbox();
        } else {
          alert(data.message || "Failed to send message");
        }
      } catch (error) {
        console.error("Send message error:", error);
      }
    });
  }
});
