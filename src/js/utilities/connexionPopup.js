// connexionPopup.js
import LocalStorage from "../Classes/LocalStorage.js";
import Player from "../Classes/Player.js";
import { showTutorialPopup } from "./tutorialPopup.js";
import { displayPlayerScores } from "./utilities.js";

// Éléments DOM
const overlay = document.getElementById("modalOverlay");
const popupConnexion = document.getElementById("connexionPopup");
const confirmBtn = document.getElementById("confirmUsernameBtn");
const usernameInput = document.getElementById("usernameInput");

// Afficher la popup de connexion
export function showConnexionPopup() {
    popupConnexion.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

// Initialiser les événements
export function initConnexionPopup() {
    confirmBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();

        if (!username) {
            alert("Veuillez entrer un pseudo");
            return;
        }

        const isExistingPlayer = LocalStorage.playerExists(username);

        // Création ou connexion du joueur
        new Player(username);

        // Fermer la popup de connexion
        popupConnexion.classList.add("hidden");
        overlay.classList.add("hidden");

        // Si nouveau joueur → tutoriel
        if (!isExistingPlayer) {
            showTutorialPopup();
        }

        displayPlayerScores(username);


        console.log(
            isExistingPlayer
                ? `Connexion du joueur existant : ${username}`
                : `Nouveau joueur créé : ${username}, tutoriel proposé`
        );
    });
}
