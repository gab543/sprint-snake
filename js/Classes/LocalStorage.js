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
    return players[username] || null;
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

  static getGlobalScores() {
    const players = this.loadPlayers();
    let scores = [];
    for (const player in players) {
      scores = scores.concat(players[player].scores);
    }
    return scores;
  }
}

export default LocalStorage;
