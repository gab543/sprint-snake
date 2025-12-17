// main.js
import { startGame, restartGame } from "./utilities/game.js";
import { snake } from "./utilities/game.js";
import { dessinerTerrain, dessinerNourriture, dessinerTete } from "./canvas/canvas.js";
import { showConnexionPopup, initConnexionPopup } from "./utilities/connexionPopUp.js";
import Player from "./Classes/Player.js";

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

const startBtn = document.getElementById("startBtn");
if (startBtn) {
    startBtn.addEventListener("click", startGame);
}

const restartBtn = document.getElementById("restartBtn");
if (restartBtn) {
    restartBtn.addEventListener("click", restartGame);
}

document.addEventListener("DOMContentLoaded", () => {
    initConnexionPopup();
    showConnexionPopup();
    dessinerTerrain();
});

//Création de joueur fictifs pour afficher les scores
const player1 = new Player("gabriel");
player1.addScore(1500);
player1.addScore(2000);

const player2 = new Player("ali");
player2.addScore(3000);