import { canvas, ctx, tailleCase } from "../canvas/canvas.js";
import Snake from "../Classes/Snake.js";

const snake = new Snake(4, 8, tailleCase);

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw(ctx);
}

function initializeGame() {
    // Pour l'instant afficher uniquement le serpent au démarrage
    render();
}

function moveSquare(e){
    switch(e.key){
        case "ArrowRight":
            snake.changeDirection(1, 0);
            break;
        case "ArrowLeft":
            snake.changeDirection(-1, 0);
            break;
        case "ArrowUp": 
            snake.changeDirection(0, -1);
            break;
        case "ArrowDown": 
            snake.changeDirection(0, 1);
            break;
    }
    // redraw (le serpent ne bouge pas encore automatiquement)
    render();
}

document.addEventListener("keydown", moveSquare);

initializeGame();