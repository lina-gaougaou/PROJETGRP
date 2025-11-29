<<<<<<< HEAD
const form = document.getElementById("payment-form");
const card = document.getElementById("card");
const expiry = document.getElementById("expiry");
const cvc = document.getElementById("cvc");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");

card.addEventListener("input", e => {
  e.target.value = e.target.value.replace(/\D/g, "")
                                 .replace(/(.{4})/g, "$1 ")
                                 .trim();
});

expiry.addEventListener("input", e => {
  const val = e.target.value.replace(/\D/g, "");
  e.target.value = val.length > 2 ? val.slice(0, 2) + "/" + val.slice(2, 4) : val;
});

form.addEventListener("submit", e => {
  e.preventDefault();

  if (card.value.length < 16 || !expiry.value.includes("/") || cvc.value.length < 3) {
    alert("Veuillez vérifier les informations de la carte 🌿");
    return;
  }

  modal.classList.add("open");
});

closeModal.addEventListener("click", () => modal.classList.remove("open"));


//############
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer TA_CLE_API"
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Bonjour, parle-moi de Bali" }]
  })
});
const data = await response.json();
console.log(data.choices[0].message.content);
=======

const map = L.map('map').setView([31.7917, -7.0926], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);


const destinations = [
  {
    coords: [33.5333, -5.1167],
    name: "🌲 Forêt d'Ifrane",
    desc: "Un havre de paix surnommé la petite Suisse du Maroc."
  },
  {
    coords: [30.9167, -6.9167],
    name: "⛰️ Haut Atlas",
    desc: "Destination idéale pour les amateurs de randonnée."
  },
  {
    coords: [31.6300, -8.0089],
    name: "🌴 Marrakech Oasis",
    desc: "Ville rouge entourée de palmeraies et montagnes."
  },
  {
    coords: [35.7595, -5.8339],
    name: "🌊 Cap Spartel",
    desc: "Là où la Méditerranée rencontre l’Atlantique."
  }
];

// Boucle sur les destinations
destinations.forEach(place => {
  const marker = L.marker(place.coords).addTo(map);
  marker.bindPopup(`
    <b>${place.name}</b><br>${place.desc}<br><br>
    <button style="
      background:#43a047;
      border:none;
      padding:8px 14px;
      border-radius:8px;
      color:white;
      cursor:pointer;
      font-size:0.9em;
    ">Explorer</button>
  `);
});

// Optionnel : animation au clic
map.on('popupopen', e => {
  e.popup._source._icon.classList.add('bounce');
  setTimeout(() => e.popup._source._icon.classList.remove('bounce'), 1000);
});

// Petite animation CSS sur le marqueur
const style = document.createElement('style');
style.innerHTML = `
  .bounce {
    animation: bounce 0.6s ease;
  }
  @keyframes bounce {
    0% { transform: translateY(0); }
    30% { transform: translateY(-10px); }
    60% { transform: translateY(0); }
    100% { transform: translateY(-4px); }
  }
`;
document.head.appendChild(style);
>>>>>>> ichraq
