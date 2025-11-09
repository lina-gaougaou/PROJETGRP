// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // si tu utilises node 18+, tu peux utiliser global fetch
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());

// Serve les fichiers statiques (ta page chat.html, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Optionnel: si tu veux autoriser d'autres origines
app.use(cors());

// Endpoint pour le chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'message manquant' });

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      // Réponse factice si pas de clé (pour développement local gratuit)
      console.log('Aucune clé OpenAI — envoi d’une réponse factice.');
      const fakeReply = `Je suis en mode démo : tu as dit "${message}". Exemples: proposer 3 idées pour ton voyage.`;
      return res.json({ reply: fakeReply });
    }

    // Appel OpenAI Chat Completions
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const payload = {
      model,
      messages: [
        { role: 'system', content: 'Tu es Gazona, un assistant amical qui aide pour des idées de voyage, paiements et lieux.' },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.8
    };

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error('OpenAI error', r.status, errText);
      return res.status(502).json({ error: 'Erreur de l’API OpenAI', details: errText });
    }

    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content || 'Pas de réponse.';
    res.json({ reply, raw: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Fallback - redirige tout vers index si tu veux SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server démarré sur http://localhost:${PORT}`));
