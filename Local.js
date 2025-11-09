// Apparition fluide
window.addEventListener('load', () => {
  document.getElementById('card').classList.add('show');
});

// Neige
const snowContainer = document.body;
const snowCount = 40;
for (let i = 0; i < snowCount; i++) {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.textContent = '❄';
  snowflake.style.left = Math.random() * 100 + 'vw';
  snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
  snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
  snowflake.style.animationDelay = Math.random() * 5 + 's';
  snowContainer.appendChild(snowflake);
}

// Scroll section
window.addEventListener('scroll', () => {
  const section = document.getElementById('section2');
  if (section.getBoundingClientRect().top < window.innerHeight - 100) {
    section.classList.add('show');
  }

  // Bouton haut
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

document.getElementById('scrollTopBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Bouton son
const snowSound = document.getElementById('snowSound');
const soundBtn = document.getElementById('soundBtn');
let playing = false;

soundBtn.addEventListener('click', () => {
  if (!playing) {
    snowSound.play(); 
    playing = true; 
    soundBtn.textContent = "🔇 Neige Off";
  } else {
    snowSound.pause(); 
    playing = false; 
    soundBtn.textContent = "🔊 Neige On";
  }
});
