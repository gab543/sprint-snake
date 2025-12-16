import { displayGlobalScores, addGlobalScores } from "./utilities/utilities.js";
import LocalStorage from "./Classes/LocalStorage.js";

// démarrage des utilitaires du jeu
import "./utilities/game.js";

LocalStorage.clearGlobalScores();

// ajout de scores factices
addGlobalScores([15938, 20378, 25348, 39216, 17840]);

displayGlobalScores();
