import LocalStorage from "../Classes/LocalStorage.js";

function displayGlobalScores() {
  console.log("Displaying global scores...");
  const scores = LocalStorage.getGlobalScores() || [];
  const sortedScores = [...scores].sort((a, b) => Number(b) - Number(a));
  const scoresList = document.getElementById("scoresList");
  scoresList.innerHTML = sortedScores
    .map((score) => `<li>${score}</li>`)
    .join("");
}

function addGlobalScores(arrayOfScores) {
  arrayOfScores.forEach((score) => LocalStorage.saveGlobalScore(score));
}

function generateFood(snake) {}

export { displayGlobalScores, addGlobalScores };
