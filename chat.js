//-------------------------------------------
// ⚡ BASE DE CONNAISSANCES – GAZONA IA
//-------------------------------------------
const kb = [
  {
    patterns: ["bonjour","salut","slt","coucou","hey","bonsoir"],
    replies: [
      "Salut 🌿 ! Comment puis-je t’aider pour ton voyage aujourd’hui ?",
      "Bienvenue sur JungleTrip ! Tu veux une idée de destination ? 😄",
      "Hello ! Je suis Gazona, ton guide jungle. Pose-moi tes questions 🌍"
    ]
  },
  {
    patterns: ["prix","tarif","combien","budget","coût","promotion"],
    replies: [
      "Nos prix commencent à partir de **199 DH** selon la destination 🌍.",
      "Les tarifs varient selon le lieu et le groupe. Donne-moi une destination et je te donne un prix précis 💸.",
      "On propose toujours les meilleurs prix avec transport inclus 🚐."
    ]
  },
  {
    patterns: ["paiement","payer","payment","carte","réserver","reservation","book"],
    replies: [
      "Le paiement est simple 💳 : choisis ton trip → remplis tes infos → confirme.",
      "Tu peux payer après avoir choisi ta destination sur la page réservation ✔️.",
      "Paiement sécurisé et simple. Tu veux que je t’aide à réserver ? 😊"
    ]
  },
  {
    patterns: ["destination","ou aller","lieux","ville","trip","voyage","endroits"],
    replies: [
      "Voici nos top destinations : Ifrane, Akchour, Ouzoud, Sahara, Agadir, Chefchaouen 🌄.",
      "Tu préfères montagne, mer, désert ou ville ? Je te propose un trip parfait !",
      "On a des destinations nature, aventure, chill, culture et food. Tu veux une recommandation personnalisée ? 😍"
    ]
  },
  {
    patterns: ["groupe","amis","team","rejoindre","créer groupe"],
    replies: [
      "Tu peux créer ou rejoindre un groupe. Dis-moi combien de personnes 👥.",
      "On propose des groupes mixtes, groupes filles, ou groupes solo-friendly ✨.",
      "Tu voyages seule ou avec des amis ? Je peux t’aider à trouver un groupe idéal."
    ]
  },
  {
    patterns: ["materiel","hiking","equipement","sac","préparer","checklist"],
    replies: [
      "Pour rando : eau, powerbank, veste, chaussures, snacks, couverture 🎒.",
      "Tu veux une checklist complète par destination ? Je peux te la préparer ✔️.",
      "Toujours prévoir : eau, chaussures confortables et veste chaude."
    ]
  },
  {
    patterns: ["meteo","climat","froid","chaud","temps"],
    replies: [
      "Je peux te dire comment t’habiller si tu me donnes la destination 🌤️.",
      "Selon la météo, je recommande vêtements chauds pour montagne ❄️.",
      "Le climat dépend du lieu. Tu vas où exactement ?"
    ]
  },
  {
    patterns: ["aide","help","comment ça marche","explication"],
    replies: [
      "Très simple : choisis un trip → crée/rejoins un groupe → réserve → profite 😄.",
      "Je peux t’expliquer chaque étape si tu veux 🤗.",
      "Pose-moi une question sur : prix, destinations, paiement, météo…"
    ]
  },
  {
    patterns: ["secret","endroits cachés","lieux secrets"],
    replies: [
      "On a des ‘secret spots’ : cascades cachées, viewpoints, forêts 🌲.",
      "Tu veux des lieux uniques ? Je t’en propose selon ta ville 🔥.",
      "Les meilleurs spots secrets sont autour de Chefchaouen, Akchour et Ifrane ✨."
    ]
  }
];


//-------------------------------------------
// ⚡ FONCTION DE RECHERCHE DE RÉPONSE
//-------------------------------------------
function findBestReply(text) {
  text = text.toLowerCase();

  for (let item of kb) {
    if (item.patterns.some(p => text.includes(p))) {
      const replies = item.replies;
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }

  // Réponse par défaut
  const fallback = [
    "Je n'ai pas bien compris 😅, peux-tu reformuler ?",
    "Tu peux me poser une question sur : prix, destinations, paiement, météo…",
    "Désolé, répète un peu stp 😊."
  ];
  return fallback[Math.floor(Math.random() * fallback.length)];
}


//-------------------------------------------
// ⚡ SYSTEME DE CHAT (fonctionnement interface)
//-------------------------------------------
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user-message");
  input.value = "";

  // message de chargement
  const loading = addMessage("⏳ Gazona réfléchit...", "bot-message");

  setTimeout(() => {
    loading.remove();
    const reply = findBestReply(text);
    addMessage(reply, "bot-message");
  }, 700);
}


//-------------------------------------------
// ⚡ Ajouter message dans le chat
//-------------------------------------------
function addMessage(text, className) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.className = className;
  msg.textContent = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  return msg;
}
//-------------------------------------------
/* ---------- Interactive choices system (buttons + sublists) ---------- */

/*
How it works:
- showInitialChoices() -> renders top-level buttons
- When user clicks a button, handleChoice(choiceId) runs and displays bot reply + next choices
- The system builds a simple tree of choices (you can extend it)
*/

const CHOICES_TREE = {
  id: 'root',
  text: "Hi! Choose a category to start. (Cliquez sur une option ci-dessous.)",
  options: [
    { id: 'dest', label: '🌍 Destinations' },
    { id: 'price', label: '💸 Prix & Budget' },
    { id: 'pay', label: '💳 Paiement' },
    { id: 'group', label: '👥 Groupes' },
    { id: 'equip', label: '🎒 Matériel' },
    { id: 'ideas', label: '💡 Idées de trips' },
    { id: 'help', label: '❓ Aide / Fonctionnement' }
  ]
};

// Subtrees / replies (extendable)
const CHOICES_DATA = {
  dest: {
    reply: "Quel type de destination préfères-tu ?",
    options: [
      { id: 'dest_mnt', label: '⛰️ Montagne' },
      { id: 'dest_sea', label: '🏖️ Mer' },
      { id: 'dest_des', label: '🏜️ Désert' },
      { id: 'dest_city', label: '🏙️ Ville' }
    ]
  },

  dest_mnt: {
    reply: "Top montagnes : Ifrane, Akchour, Oukaïmeden, Azrou. Que veux-tu faire ?",
    options: [
      { id: 'details_ifr', label: '📄 Détails Ifrane' },
      { id: 'price_ifr', label: '💸 Prix Ifrane' },
      { id: 'back_dest', label: '🔙 Retour Destinations' }
    ]
  },

  dest_sea: {
    reply: "Top plages : Agadir, Essaouira, Legzira. Voulez-vous voir détails ou prix ?",
    options: [
      { id: 'details_agadir', label: '📄 Détails Agadir' },
      { id: 'price_agadir', label: '💸 Prix Agadir' },
      { id: 'back_dest', label: '🔙 Retour Destinations' }
    ]
  },

  price: {
    reply: "Pour estimer le prix, dis-moi la destination et le nombre de personnes, ou choisis une option :",
    options: [
      { id: 'price_estimate', label: '🧮 Estimer le prix' },
      { id: 'promos', label: '🔖 Promotions' },
      { id: 'back_root', label: '🔙 Retour' }
    ]
  },

  pay: {
    reply: "La page Paiement est sécurisée. Tu veux connaître les méthodes acceptées ?",
    options: [
      { id: 'methods', label: '💳 Méthodes de paiement' },
      { id: 'help_pay', label: '❓ Aide paiement' },
      { id: 'back_root', label: '🔙 Retour' }
    ]
  },

  group: {
    reply: "Tu peux rejoindre ou créer un groupe. Combien de personnes êtes-vous ?",
    options: [
      { id: 'join_group', label: '🔎 Rejoindre un groupe' },
      { id: 'create_group', label: '➕ Créer un groupe' },
      { id: 'back_root', label: '🔙 Retour' }
    ]
  },

  equip: {
    reply: "Checklist rapide : sac 30L, eau, powerbank, veste imperméable, chaussures de rando.",
    options: [
      { id: 'full_check', label: '✅ Checklist complète' },
      { id: 'tips_pack', label: '🧭 Conseils de packing' },
      { id: 'back_root', label: '🔙 Retour' }
    ]
  },

  ideas: {
    reply: "Idées : Trip surprise, Trip photo, Sunrise trip. Veux-tu une recommandation ?",
    options: [
      { id: 'idea_surprise', label: '🎁 Trip surprise' },
      { id: 'idea_photo', label: '📸 Trip photo' },
      { id: 'back_root', label: '🔙 Retour' }
    ]
  },

  help: {
    reply: "Processus : Choisir destination → Créer/Rejoindre groupe → Payer → Partir. Tu veux plus de détails ?",
    options: [
      { id: 'proc_details', label: 'ℹ️ Plus de détails' },
      { id: 'back_root', label: '🔙 Retour' }
    ]
  },

  // actions (leaf nodes)
  details_ifr: { reply: "Ifrane — Montagne, forêts, climat doux. Durée suggérée : 2-3 jours." },
  price_ifr: { reply: "Prix Ifrane : à partir de 299 DH par personne (transport + guide selon formule)." },
  details_agadir: { reply: "Agadir — plage, surf, détente. Durée suggérée : 2-4 jours." },
  price_agadir: { reply: "Prix Agadir : à partir de 349 DH par personne." },

  methods: { reply: "Nous acceptons : carte bancaire, virement, et paiement mobile (PayPal/Local)." },
  help_pay: { reply: "Si tu as un problème de paiement, contacte notre support via WhatsApp ou email." },

  join_group: { reply: "Indique ta ville et la date souhaitée et je cherche un groupe près de chez toi." },
  create_group: { reply: "Donne un nom au groupe, la date et le nombre de places. Je peux créer et partager le lien." },

  full_check: { reply: "Checklist complète envoyée ! (ex: vêtements, med kit, powerbank, lamp, snacks...)" },
  tips_pack: { reply: "Astuce : range les objets lourds en bas du sac et garde eau + carte en poche." },

  idea_surprise: { reply: "Trip surprise : tu choisis la date et on garde la destination secrète jusqu'au départ 🎁." },
  idea_photo: { reply: "Trip photo : on propose les meilleurs viewpoints et golden hours pour tes photos 📸." },

  proc_details: { reply: "Étape 1: Choix → 2: Groupe → 3: Paiement → 4: Confirmation → 5: Départ. Besoin d'aide à une étape ?" },

  price_estimate: { reply: "Pour estimer : dis-moi destination + nb personnes (ex: Ifrane, 4 personnes)." },
  promos: { reply: "Actuellement : -10% sur certaines destinations le weekend. Veux-tu la liste ?" },

  back_dest: { reply: "Retour aux destinations.", redirect: 'dest' },
  back_root: { reply: "Retour au menu principal.", redirect: 'root' }
};

// Render a choice container (bot message with buttons)
function renderChoices(optionsArray) {
  // build HTML for choice group
  const container = document.createElement('div');
  container.className = 'choice-container';

  const group = document.createElement('div');
  group.className = 'choice-group';

  optionsArray.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = opt.label;
    btn.dataset.choiceId = opt.id;
    btn.addEventListener('click', () => handleChoiceClick(opt.id));
    group.appendChild(btn);
  });

  container.appendChild(group);

  // Insert into chat as a bot-message box (use addMessage wrapper)
  const chatBox = document.getElementById('chat-box');
  const wrapper = document.createElement('div');
  wrapper.className = 'bot-message';
  wrapper.appendChild(container);
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Public: show initial choices when page loads or when user requests menu
function showInitialChoices() {
  // first show a short intro from bot (use addMessage if you want)
  addMessage("Choisis une catégorie ci-dessous pour commencer : ", "bot-message");
  renderChoices(CHOICES_TREE.options);
}

// Handle choice button clicks
function handleChoiceClick(choiceId) {
  // clear possible last choice-group UI (optional: keep history)
  // find in CHOICES_DATA
  const data = CHOICES_DATA[choiceId];
  if (!data) {
    // fallback: if not in CHOICES_DATA but exists in CHOICES_DATA as leaf
    const leaf = CHOICES_DATA[choiceId] || CHOICES_DATA[choiceId];
    if (leaf && leaf.reply) {
      addMessage(leaf.reply, "bot-message");
      // if it has redirect
      if (leaf.redirect) {
        setTimeout(() => { handleRedirect(leaf.redirect); }, 350);
      }
    } else {
      addMessage("Désolé, je n'ai pas d'info pour cette option.", "bot-message");
    }
    return;
  }

  // Show reply then next options (if any)
  addMessage(data.reply, "bot-message");

  // if the node has options -> render them as buttons
  if (data.options && Array.isArray(data.options) && data.options.length > 0) {
    // small delay before showing buttons for better UX
    setTimeout(() => {
      renderChoices(data.options);
    }, 300);
  }
}

// Handle redirect nodes (back navigation)
function handleRedirect(targetId) {
  if (targetId === 'root') {
    showInitialChoices();
    return;
  }
  if (CHOICES_DATA[targetId]) {
    addMessage(CHOICES_DATA[targetId].reply, "bot-message");
    setTimeout(() => { renderChoices(CHOICES_DATA[targetId].options || []); }, 300);
    return;
  }
  // default fallback
  showInitialChoices();
}

// Optional: allow keyboard command "/menu" or clicking the Open Menu button
document.addEventListener('keydown', (e) => {
  if (e.key === '/' ) {
    showInitialChoices();
  }
});

const openMenuBtn = document.getElementById('open-menu-choices');
if (openMenuBtn) {
  openMenuBtn.addEventListener('click', showInitialChoices);
}

// Show initial choices on load (comment out if unwanted)
window.addEventListener('load', () => {
  // small delay so header loads
  setTimeout(() => showInitialChoices(), 700);
});
