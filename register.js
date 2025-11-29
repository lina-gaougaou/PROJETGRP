// === Imports Firebase ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// === Configuration Firebase ===
const firebaseConfig = {
  apiKey: "AIzaSyD0-qES65abpNgnrIKIlv8J3DfLXOMHE6g",
  authDomain: "breath-f1f0c.firebaseapp.com",
  projectId: "breath-f1f0c",
  storageBucket: "breath-f1f0c.firebasestorage.app",
  messagingSenderId: "822609264741",
  appId: "1:822609264741:web:249d2c48dbfbb57fef068c",
  measurementId: "G-ECVQVNNB1L"
};

// === Initialisation Firebase ===
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// === Gestion du formulaire de connexion ===
const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    messageDiv.textContent = 'Veuillez remplir tous les champs !';
    messageDiv.style.color = '#ff4d4d';
    return;
  }

  try {
  // Tentative de connexion
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  messageDiv.textContent = '✅ Connexion réussie !';
  messageDiv.style.color = '#6ae7b3';
  console.log('Utilisateur connecté :', user);

  // Redirection vers after.html après connexion réussie
  window.location.href = "after.html";
} catch (error) {
  console.error(error);
  messageDiv.textContent = '❌ Erreur : ' + error.message;
  messageDiv.style.color = '#ff4d4d';
}

});
