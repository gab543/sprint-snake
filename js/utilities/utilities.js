import LocalStorage from "../Classes/LocalStorage.js";

function displayGlobalScores() {
  console.log("Displaying global scores...");
  const scores = LocalStorage.getBestGlobalScores() || [];
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  const scoresList = document.getElementById("scoresList");
  scoresList.innerHTML = sortedScores
    .map((score) => `<li>${score.username}: ${score.score}</li>`)
    .join("");
}




export { displayGlobalScores };
