let currentGroup = 0;
const groups = document.querySelectorAll('.destination-group');

function showGroup(index) {
  groups.forEach((group, i) => {
    group.classList.toggle('active', i === index);
  });
}

function nextGroup() {
  currentGroup = (currentGroup + 1) % groups.length;
  showGroup(currentGroup);
}

function prevGroup() {
  currentGroup = (currentGroup - 1 + groups.length) % groups.length;
  showGroup(currentGroup);
}

// Affiche le premier groupe au chargement
showGroup(currentGroup);
