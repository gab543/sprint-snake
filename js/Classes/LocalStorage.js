class LocalStorage {
  static saveGlobalScore(score) {
    const globalScores = JSON.parse(localStorage.getItem("globalScores")) || [];
    globalScores.push(score);
    localStorage.setItem("globalScores", JSON.stringify(globalScores));
  }
  static getGlobalScores() {
    return JSON.parse(localStorage.getItem("globalScores")) || [];
  }
  static clearGlobalScores() {
    localStorage.removeItem("globalScores");
  }
  static saveScores(score) {
    const scores = JSON.parse(localStorage.getItem("Scores")) || [];
    scores.push(score);
    localStorage.setItem("Scores", JSON.stringify(scores));
  }
  static getScores() {
    return JSON.parse(localStorage.getItem("scores")) || [];
  }
  static clearScores() {
    localStorage.removeItem("scores");
  }
}

export default LocalStorage;
