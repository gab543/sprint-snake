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

  const playerData = LocalStorage.loadPlayerData(username) || { scores: [] };
  let scores = Array.isArray(playerData.scores) ? playerData.scores.slice() : [];

  // remove duplicates, sort descending and keep top 10
  scores = [...new Set(scores)].sort((a, b) => b - a).slice(0, 10);
  const scoresList = document.getElementById("playerScoresList");

  console.log(scores)
  if (!scoresList) return;

  if (scores.length === 0) {
    scoresList.style.listStyle = "none";
    scoresList.innerHTML = "<li>Aucun score enregistré pour ce joueur.</li>";
    return;
  }

  scoresList.style.listStyle = "";
  scoresList.innerHTML = scores
    .map((s) => `<li>${s}</li>`)
    .join("");
}



export { displayGlobalScores, displayPlayerScores };
