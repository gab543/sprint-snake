class LocalStorage {
  static KEY = "players";

  static loadPlayers() {
    return JSON.parse(localStorage.getItem(this.KEY)) || {};
  }

  static savePlayers(players) {
    localStorage.setItem(this.KEY, JSON.stringify(players));
  }

  static loadPlayerData(username) {
    const players = this.loadPlayers();
    console.log(players[username] || [])
    return players[username] || [];
  }

  static savePlayerData(username, data) {
    const players = this.loadPlayers();
    players[username] = data;
    this.savePlayers(players);
  }

  static playerExists(username) {
    const players = this.loadPlayers();
    return username in players;
  }

  static getBestGlobalScores() {
    const players = this.loadPlayers();
    const result = [];

    for (const username in players) {
      if (players[username].scores.length === 0) continue;
      const bestScore = Math.max(...players[username].scores);
      result.push({ username, score: bestScore });
    }

    return result.sort((a, b) => b.score - a.score);
  }


}

export default LocalStorage;
