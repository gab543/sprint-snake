// Éléments DOM
const overlay = document.getElementById("modalOverlay");
const popup = document.getElementById("tutoPopUp");
const yesBtn = document.getElementById("yes-button");
const noBtn = document.getElementById("no-button");

// Afficher la popup tutoriel
export function showTutorialPopup() {
  overlay.classList.remove("hidden");
  popup.classList.remove("hidden");
}

// Fermer la popup tutoriel
function closePopup() {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
}

// Boutons de la popup
yesBtn.addEventListener("click", () => {
  closePopup();
  console.log("L'utilisateur sait jouer → pas de tutoriel");
});

noBtn.addEventListener("click", () => {
  closePopup();
  console.log("Afficher le tutoriel → démarrage tutoriel");
  // Ici tu peux appeler ta fonction de tutoriel
});
