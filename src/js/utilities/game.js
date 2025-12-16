import { canvas, ctx, dessinerTerrain, dessinerNourriture, tailleCase } from "../canvas/canvas.js";
import Snake from "../Classes/Snakeg.js";

// grille
const GRID_W = 15;
const GRID_H = 15;

// instance du serpent (utilise la classe Snake.js)
const snake = new Snake();
// s'assurer que la taille de case du serpent correspond au canvas
snake.size = tailleCase;

let food = null;
let score = 0;
const TICK_MS = 500;
let intervalId = null;

function spawnFood() {
    const isOnSnake = (x, y) => snake.segments.some(s => s.x === x && s.y === y);
    let tries = 0;
    do {
        const x = Math.floor(Math.random() * GRID_W);
        const y = Math.floor(Math.random() * GRID_H);
        if (!isOnSnake(x, y)) {
            food = { x, y };
            return;
        }
        tries++;
    } while (tries < 100);
    food = { x: 0, y: 0 };
}

function draw() {
    dessinerTerrain();
    // Le serpent se dessine via sa méthode draw(ctx)
    snake.draw();
    if (food) dessinerNourriture(food.x, food.y);

    const scoreEl = document.getElementById('gameScore');
    if (scoreEl) scoreEl.textContent = score;
}

function tick() {
    snake.move();

    const head = snake.segments[0];
    if (food && head.x === food.x && head.y === food.y) {
        snake.grow();
        score += 1;
        spawnFood();
    }

    if (snake.checkCollision(canvas.width, canvas.height)) {
        console.log('Game over');
        score = 0;
        snake.reset();
        spawnFood();
    }

    draw();
}

window.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'ArrowUp':
        case 'z':
        case 'Z':
            snake.changeDirection(0, -1);
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            snake.changeDirection(0, 1);
            break;
        case 'ArrowLeft':
        case 'q':
        case 'Q':
            snake.changeDirection(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            snake.changeDirection(1, 0);
            break;
    }
});

const btn = document.getElementById("startBtn")
// démarrage
spawnFood();
draw();
let started = false;
btn.addEventListener("click", () => {
    if (!started) {
        intervalId = setInterval(tick, TICK_MS);
        started = true;
    }
});

export { snake, spawnFood, tick };