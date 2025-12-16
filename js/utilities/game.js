import { canvas, ctx, dessinerTete, tailleCase } from "../canvas/canvas.js";
import Snake from "../Classes/Snake.js";

const snake = new Snake(4, 8, tailleCase);

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw();
}

function initializeGame() {
    dessinerTete(4, 8, "droite")
    console.log("Game initialized");
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
    render();
}

document.addEventListener("keydown", moveSquare);

initializeGame();