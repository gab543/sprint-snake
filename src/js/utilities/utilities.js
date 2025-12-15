import LocalStorage from "../Classes/LocalStorage.js";

function displayGlobalScores() {
  console.log("Displaying global scores...");

  const scores = LocalStorage.getBestGlobalScores() || [];
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  const scoresList = document.getElementById("globalScoresList");

  scoresList.innerHTML = sortedScores
    .map((score) => `<li>${score.username}: ${score.score}</li>`)
    .join("");
}

function displayPlayerScores(username) {
  console.log(`Displaying scores for player: ${username}`);

  const scores = LocalStorage.getPlayerScores(username) || [];
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  const scoresList = document.getElementById("playerScoresList");

  if (sortedScores.length === 0) {
    scoresList.innerHTML = "<li>Aucun score enregistré pour ce joueur.</li>";
    return;
  }
  scoresList.innerHTML = sortedScores
    .map((score) => `<li>${score.username}: ${score.score}</li>`)
    .join("");
}

export { displayGlobalScores, displayPlayerScores };
