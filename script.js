
const serverUrl = "https://1478e6f5-068a-4386-997f-ce8b8be34200-00-12wqafukis46u.riker.replit.dev";

const chatbox = document.getElementById("chatbox");

function displayUserMessage(message) {
  const msg = document.createElement("div");
  msg.className = "chat-message user-message";
  msg.innerText = `👤 ${message}`;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function displayBotMessage(message) {
  const msg = document.createElement("div");
  msg.className = "chat-message bot-message";
  msg.innerText = `🤖 ${message}`;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function handleTextInput() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  displayUserMessage(userMessage);
  input.value = "";

  try {
    const response = await fetch(`${serverUrl}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: userMessage })
    });

    const data = await response.json();
    displayBotMessage(data.reply);
  } catch (error) {
    console.error(error);
    displayBotMessage("❌ Maaf, terjadi kesalahan saat mengambil jawaban.");
  }
}
