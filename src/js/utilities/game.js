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
const FOOD_COLORS = ["red", "blue", "yellow", "green"];

function spawnFood() {
    const isOnSnake = (x, y) => snake.segments.some(s => s.x === x && s.y === y);

    let tries = 0;
    do {
        const x = Math.floor(Math.random() * GRID_W);
        const y = Math.floor(Math.random() * GRID_H);

        if (!isOnSnake(x, y)) {
            const isSpecial = Math.random() < 0.2; // 20%

            food = {
                x,
                y,
                isSpecial,
                couleur: FOOD_COLORS[Math.floor(Math.random() * FOOD_COLORS.length)],
                couleursClignotantes: FOOD_COLORS
            };
            return;
        }
        tries++;
    } while (tries < 100);
}



// dessiner le jeu
function draw() {
    dessinerTerrain();
    snake.draw();

    if (food) dessinerNourriture(food);

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
        score += food.isSpecial ? 2 : 1;
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
    const score = document.querySelector("#gameScore").textContent
    player.addScore(score)
    clearInterval(intervalId);
    intervalId = null;
    started = false;

    showGameOverMessage();
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
        restartGame();
    });

}



function startGame() {
    const btn = document.getElementById("startBtn");
    const difficultySelect = document.getElementById("difficultySelect");

    difficultySelect.addEventListener("change", () => {
        currentDifficulty = DIFFICULTIES[difficultySelect.value];
        currentTick = currentDifficulty.speed;
    });

    spawnFood();
    draw();
    if (!started) {
        currentTick = currentDifficulty.speed;
        intervalId = setInterval(gameLoop, currentTick);
        started = true;
    }
}

function restartGame() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    score = 0;
    currentTick = currentDifficulty.speed;
    snake.reset();
    spawnFood();
    draw();
    started = false;
}




export { snake, spawnFood, gameLoop, gameOver, startGame, restartGame };
