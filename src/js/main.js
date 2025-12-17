// main.js
import { startGame, restartGame } from "./utilities/game.js";
import { snake } from "./utilities/game.js";
import { dessinerTerrain, dessinerNourriture, dessinerTete } from "./canvas/canvas.js";
import { showConnexionPopup, initConnexionPopup } from "./utilities/connexionPopup.js";
import Player from "./Classes/Player.js";
import { initCanvas } from "./canvas/canvas.js";
import { displayGlobalScores } from "./utilities/utilities.js";





window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
        case "z":
        case "Z":
            snake.changeDirection(0, -1);
            break;
        case "ArrowDown":
        case "s":
        case "S":
            snake.changeDirection(0, 1);
            break;
        case "ArrowLeft":
        case "q":
        case "Q":
            snake.changeDirection(-1, 0);
            break;
        case "ArrowRight":
        case "d":
        case "D":
            snake.changeDirection(1, 0);
            break;
    }
});

//Regarder le bouton start
const startBtn = document.getElementById("startBtn");
if (startBtn) {
    startBtn.addEventListener("click", startGame);
}


document.addEventListener("DOMContentLoaded", () => {
    initConnexionPopup();
    showConnexionPopup();
    initCanvas();
    dessinerTerrain();
    displayGlobalScores();
});

//Création de joueur fictifs pour afficher les scores
const player1 = new Player("Alice");
player1.addScore(1500);
player1.addScore(2000);
const player2 = new Player("Bob");
player2.addScore(3000);

// pour empecher le scroll
document.addEventListener("keydown", function (e) {

    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    if (keys.includes(e.key)) {

        e.preventDefault();

    }

});
