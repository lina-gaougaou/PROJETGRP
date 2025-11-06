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
