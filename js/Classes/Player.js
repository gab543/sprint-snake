import LocalStorage from "./LocalStorage";

class Player {
    constructor(username) {
        this._username = username;

        if (LocalStorage.playerExists(username)) {
            const data = LocalStorage.loadPlayerData(username);
            this._scores = data.scores;
        } else {
            this._scores = [];
            this._save(); // création en DB
        }
    }

    _save() {
        LocalStorage.savePlayerData(this._username, {
            scores: this._scores,
        });
    }

    addScore(score) {
        this._scores.push(score);
        this._save();
    }

    get username() {
        return this._username;
    }

    get scores() {
        return this._scores;
    }
}

export default Player;
