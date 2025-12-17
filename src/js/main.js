// main.js
import { startGame, restartGame } from "./utilities/game.js";
import { snake } from "./utilities/game.js";
import { dessinerTerrain, dessinerNourriture, dessinerTete } from "./canvas/canvas.js";
import { showConnexionPopup, initConnexionPopup } from "./utilities/connexionPopup.js";
import Player from "./Classes/Player.js";
import { initCanvas } from "./canvas/canvas.js";

document.addEventListener("DOMContentLoaded", () => {
    initCanvas();
    dessinerTerrain();
});



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
const player1 = new Player("Alice");
player1.addScore(150000000);
player1.addScore(200);
const player2 = new Player("Bob");
player2.addScore(300);

// pour empecher le scroll
document.addEventListener("keydown", function (e) {

  const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
 
  if (keys.includes(e.key)) {

    e.preventDefault();

  }

});
 