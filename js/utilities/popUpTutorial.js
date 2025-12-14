const overlay = document.getElementById("modalOverlay");
const popup = document.getElementById("tutoPopUp");
const yesBtn = document.getElementById("yes-button");
const noBtn = document.getElementById("no-button");

// Afficher la popup au chargement
window.addEventListener("load", () => {
  overlay.classList.remove("hidden");
  popup.classList.remove("hidden");
});

// Fermer la popup
function closePopup() {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
}

// Boutons
yesBtn.addEventListener("click", () => {
  closePopup();
  console.log("L'utilisateur sait jouer");
});

noBtn.addEventListener("click", () => {
  closePopup();
  console.log("Afficher le tutoriel");
});
