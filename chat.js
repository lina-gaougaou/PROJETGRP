// public/chat.js  (version frontend)
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  userInput.value = '';

  // message "en cours"
  addMessage('⏳ Gazona réfléchit...', 'bot');

  try {
    // Utilise une URL relative -> simplifie en local et en prod
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    // enlève le "réfléchit..."
    const lastBot = Array.from(document.querySelectorAll('.bot-message')).pop();
    if (lastBot && lastBot.textContent.includes('Gazona réfléchit')) lastBot.remove();

    if (!res.ok) {
      addMessage("⚠️ Erreur du serveur : " + (data.error || res.statusText), 'bot');
    } else {
      // Si l'API renvoie { reply: "..." }
      addMessage(data.reply || "Désolé, je n'ai pas de réponse.", 'bot');
    }
  } catch (err) {
    // enlève le "réfléchit..."
    const lastBot = Array.from(document.querySelectorAll('.bot-message')).pop();
    if (lastBot && lastBot.textContent.includes('Gazona réfléchit')) lastBot.remove();

    addMessage("⚠️ Erreur de connexion avec Gazona. Réessayez plus tard.", 'bot');
    console.error(err);
  }
}

function addMessage(message, sender) {
  const div = document.createElement('div');
  div.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  div.textContent = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
