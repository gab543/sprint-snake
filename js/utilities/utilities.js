import LocalStorage from "../Classes/LocalStorage.js";

//global scores

function displayGlobalScores() {

    console.log("Displaying global scores...");

    const scores = LocalStorage.getGlobalScores() || [];

    const sortedScores = [...scores].sort((a, b) => Number(b) - Number(a));

    const scoresList = document.getElementById("scoresList");

    if (!scoresList) return;

    scoresList.innerHTML = sortedScores

        .map(score => `<li>${score}</li>`)

        .join("");

}

function addGlobalScores(arrayOfScores) {

    arrayOfScores.forEach(score => {

        LocalStorage.saveGlobalScore(score);

    });

}

//generate food

function generateFood(snake, canvasSize, cellSize) {

    let food;

    let collision;

    do {

        food = {

            x: Math.floor(Math.random() * (canvasSize / cellSize)) * cellSize,

            y: Math.floor(Math.random() * (canvasSize / cellSize)) * cellSize

        };

        collision = snake.segments.some(segment =>

            segment.x === food.x && segment.y === food.y

        );

    } while (collision);

    return food;

}