const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  userInput.value = '';

  addMessage('⏳ Gazona réfléchit...', 'bot');

  try {
    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();

    document.querySelector('.bot-message:last-child').remove(); // enlève le "réfléchit"
    addMessage(data.reply, 'bot');
  } catch (err) {
    document.querySelector('.bot-message:last-child').remove();
    addMessage("⚠️ Erreur de connexion avec Gazona. Réessayez plus tard.", 'bot');
  }
}

function addMessage(message, sender) {
  const div = document.createElement('div');
  div.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  div.textContent = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
