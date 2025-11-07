document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("play-music");
  const music = document.getElementById("bg-music");

  button.addEventListener("click", function() {
    if (music.paused) {
      music.play();
      button.textContent = "🔇mute the sound";
    } else {
      music.pause();
      button.textContent = "🎵 Play the sound";
    }
  });
});
