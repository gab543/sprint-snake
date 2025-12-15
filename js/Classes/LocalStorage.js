class LocalStorage {
  static KEY = "players";

  static _getPlayers() {
    return JSON.parse(localStorage.getItem(this.KEY)) || {};
  }

  static _savePlayers(players) {
    localStorage.setItem(this.KEY, JSON.stringify(players));
  }

  // Vérifier si un player existe
  static playerExists(username) {
    const players = this._getPlayers();
    return !!players[username];
  }

  // Créer un nouveau player
  static createPlayer(username) {
    const players = this._getPlayers();

    if (players[username]) {
      throw new Error("Ce pseudo existe déjà");
    }

    players[username] = { scores: [] };
    this._savePlayers(players);
  }

  // Charger un player existant
  static getPlayer(username) {
    const players = this._getPlayers();
    return players[username] || null;
  }

  // Ajouter un score à un player
  static addScore(username, score) {
    const players = this._getPlayers();

    if (!players[username]) {
      throw new Error("Player introuvable");
    }

    players[username].scores.push(score);
    this._savePlayers(players);
  }

  // Récupérer les scores d’un player
  static getScores(username) {
    const players = this._getPlayers();
    return players[username]?.scores || [];
  }
}

export default LocalStorage;
