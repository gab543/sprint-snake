import { displayGlobalScores } from "./utilities/utilities.js";
import LocalStorage from "./Classes/LocalStorage.js";
import Player from "./Classes/Player.js";

const player1 = new Player("Alice");
player1.addScore(150000000);
player1.addScore(200);
const player2 = new Player("Bob");
player2.addScore(300);

displayGlobalScores();


