import LocalStorage from "./LocalStorage.js";
import Player from "./Player.js";
import { showTutorialPopup } from "./popUpTutorial.js";

// Éléments DOM
const popupConnexion = document.getElementById("connexionPopup");
const confirmBtn = document.getElementById("confirmUsernameBtn");
const usernameInput = document.getElementById("usernameInput");

// Afficher la popup de connexion au chargement
window.addEventListener("load", () => {
    popupConnexion.classList.remove("hidden");
});

// Gestion du bouton "Confirmer"
confirmBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();

    if (!username) {
        alert("Veuillez entrer un pseudo");
        return;
    }

    const isExistingPlayer = LocalStorage.playerExists(username);

    // Création ou connexion du joueur
    const player = new Player(username);

    // Fermer la popup de connexion
    popupConnexion.classList.add("hidden");

    // Si c'est un nouveau joueur → afficher le tutoriel
    if (!isExistingPlayer) {
        showTutorialPopup();
    }

    console.log(
        isExistingPlayer
            ? `Connexion du joueur existant : ${username}`
            : `Nouveau joueur créé : ${username}, tutoriel proposé`
    );
});
