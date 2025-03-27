// aiChat.js placeholder
document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("aiChatForm");
  const chatInput = document.getElementById("chatInput");
  const chatWindow = document.getElementById("chatWindow");
  const token = localStorage.getItem("token");

  // Helper to append message
  function appendMessage(sender, content) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${content}`;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  if (chatForm) {
    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userMessage = chatInput.value.trim();
      if (!userMessage) return;
      appendMessage("You", userMessage);
      chatInput.value = "";
      try {
        const res = await fetch("/api/ai-chat/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ message: userMessage })
        });
        const data = await res.json();
        if (res.ok) {
          // data.response should contain AI answer with markup and inline keyboard options
          appendMessage("AI", data.response);
          // If inline keyboard data exists, render buttons (optional)
          if (data.inlineKeyboard) {
            const keyboardDiv = document.createElement("div");
            keyboardDiv.classList.add("inline-keyboard");
            data.inlineKeyboard.forEach(button => {
              const btn = document.createElement("button");
              btn.textContent = button.text;
              btn.onclick = () => {
                chatInput.value = button.callbackData;
              };
              keyboardDiv.appendChild(btn);
            });
            chatWindow.appendChild(keyboardDiv);
          }
        } else {
          appendMessage("AI", data.message || "Error processing message");
        }
      } catch (error) {
        console.error("AI chat error:", error);
        appendMessage("AI", "Server error");
      }
    });
  }
});
