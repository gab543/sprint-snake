import LocalStorage from "./LocalStorage";

class Player {
  constructor(username) {
    this._username = username;
    this._scores = LocalStorage.getScores(username);
  }

  addScore(score) {
    this._scores.push(score);
    LocalStorage.addScore(this._username, score);
  }

  get username() {
    return this._username;
  }

  get scores() {
    return this._scores;
  }
}

export default Player;
