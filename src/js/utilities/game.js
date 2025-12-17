import { canvas, ctx, dessinerTerrain, dessinerNourriture, tailleCase } from "../canvas/canvas.js";
import Snake from "../Classes/Snake.js";

// grille
const GRID_W = 15;
const GRID_H = 15;

// instance du serpent
const snake = new Snake();
snake.size = tailleCase;

let food = null;
let score = 0;
let intervalId = null;
let started = false;

// Difficultés
const DIFFICULTIES = {
    easy: {
        speed: 250,
        grow: 1
    },
    normal: {
        speed: 180,
        grow: 1
    },
    hard: {
        speed: 120,
        grow: 2
    }
};

let currentDifficulty = DIFFICULTIES.normal;
let currentTick = currentDifficulty.speed;


// spawn nourriture
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

// dessiner le jeu
function draw() {
    dessinerTerrain();
    snake.draw();
    if (food) dessinerNourriture(food.x, food.y);

    const scoreEl = document.getElementById('gameScore');
    if (scoreEl) scoreEl.textContent = score;
}

function updateSpeed() {
    const newSpeed = Math.max(
        60,
        currentDifficulty.speed - Math.floor(score / 5) * 15
    );

    if (newSpeed !== currentTick) {
        currentTick = newSpeed;
        clearInterval(intervalId);
        intervalId = setInterval(gameLoop, currentTick);
    }
}


// fonction appelée à chaque étape de la boucle de jeu
function gameLoop() {
    // déplacer le serpent
    snake.move();

    // vérifier si nourriture mangée
    const head = snake.segments[0];
    if (food && head.x === food.x && head.y === food.y) {
        snake.grow(currentDifficulty.grow);
        score += 1;
        spawnFood();
        updateSpeed();
    }


    // vérifier collision
    if (snake.checkCollision()) {
        gameOver();
        return;
    }

    // redessiner
    draw();
}

// gestion fin de partie
function gameOver() {
    console.log("Game Over");
    // arrêter la boucle de jeu
    clearInterval(intervalId);
    intervalId = null;
    showGameOverMessage();

    // reset du jeu
    snake.reset();
    score = 0;
    spawnFood();
    draw();
    started = false;
}

function showGameOverMessage() {
    const overlay = document.getElementById("modalOverlay");
    overlay.classList.remove("hidden");

    const modal = document.createElement("div");
    modal.className = "pop-up";
    modal.innerHTML = `
        <h2>Game Over</h2>
        <p>Score final : <strong>${score}</strong></p>
        <button class="neon-btn">Fermer</button>
    `;

    document.body.appendChild(modal);

    modal.querySelector("button").addEventListener("click", () => {
        modal.remove();
        overlay.classList.add("hidden");
    });
}


// écoute clavier
window.addEventListener('keydown', (e) => {
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

function startGame() {
    const btn = document.getElementById("startBtn");

    btn.addEventListener("click", () => {
        if (!started) {
            currentTick = currentDifficulty.speed;
            intervalId = setInterval(gameLoop, currentTick);
            started = true;
        }
    });

}

// démarrage du jeu

const difficultySelect = document.getElementById("difficultySelect");

difficultySelect.addEventListener("change", () => {
    currentDifficulty = DIFFICULTIES[difficultySelect.value];
    currentTick = currentDifficulty.speed;
});

spawnFood();
draw();
startGame();



export { snake, spawnFood, gameLoop, gameOver };
