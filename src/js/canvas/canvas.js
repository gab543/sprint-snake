export const canvas = document.querySelector("#canvas");
export const ctx = canvas.getContext("2d");

export const tailleCase = 30;

export function dessinerCarre(x, y, taille, couleur, border = "") {
    ctx.fillStyle = couleur;
    ctx.fillRect(x, y, taille, taille);

    if (border) {
        ctx.strokeStyle = border;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, taille, taille);
    }
}


export function dessinerTerrain() {
    for (let i = 0; i < 18; i++) {
        for (let j = 0; j < 18; j++) {

            const couleur = (i + j) % 2 === 0 ? "#000000" : "#1a1a1a";

            dessinerCarre(i * tailleCase, j * tailleCase, tailleCase, couleur);
        }
    }

    console.log("background fini");
}


export function dessinerTete(x, y, direction) {

    const px = x * tailleCase;
    const py = y * tailleCase;

    dessinerCarre(px, py, tailleCase, "#483D8B");
    console.log('dessin de tete en ' + px + ", " + py)
    const tailleOeil = tailleCase / 5;
    let oeilX = tailleCase / 4;
    let oeilY = tailleCase / 4;

    switch (direction) {
        case "haut":
            dessinerCarre(px + oeilX, py + oeilY, tailleOeil, "white");
            dessinerCarre(px + 2 * oeilX, py + oeilY, tailleOeil, "white");
            dessinerCarre(px + tailleCase / 2 - tailleOeil / 2, py - tailleOeil, tailleOeil, "white");
            break;
        case "bas":
            dessinerCarre(px + oeilX, py + 2 * oeilY, tailleOeil, "white");
            dessinerCarre(px + 2 * oeilX, py + 2 * oeilY, tailleOeil, "white");
            dessinerCarre(px + tailleCase / 2 - tailleOeil / 2, py + tailleCase, tailleOeil, "white");
            break;
        case "gauche":
            dessinerCarre(px + oeilX, py + oeilY, tailleOeil, "white");
            dessinerCarre(px + oeilX, py + 2 * oeilY, tailleOeil, "white");
            dessinerCarre(px - tailleOeil, py + tailleCase / 2 - tailleOeil / 2, tailleOeil, "white");
            break;
        case "droite":
            dessinerCarre(px + 2 * oeilX, py + oeilY, tailleOeil, "white");
            dessinerCarre(px + 2 * oeilX, py + 2 * oeilY, tailleOeil, "white");
            dessinerCarre(px + tailleCase, py + tailleCase / 2 - tailleOeil / 2, tailleOeil, "white");
            break;
    }
}

export function dessinerCorps(x, y, tileSize) {
    dessinerCarre(x, y, tileSize, "#43008F");
}

export function dessinerNourriture(x, y) {
    dessinerCarre(x * tailleCase, y * tailleCase, tailleCase, "red");
}

