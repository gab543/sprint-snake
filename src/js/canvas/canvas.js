export const canvas = document.querySelector("#canvas");
export const ctx = canvas.getContext("2d");

export const tailleCase = 30;

export function dessinerCarre(x, y, taille, couleur) {
    ctx.fillStyle = couleur;
    ctx.fillRect(x, y, taille, taille);
}

export function dessinerTerrain() {
    for (let i = 0; i < 18; i++) {
        for (let j = 0; j < 18; j++) {
            dessinerCarre(i * tailleCase, j * tailleCase, tailleCase, "black");
        }
    }
}

export function dessinerTete(x, y, direction) {
    const px = x * tailleCase;
    const py = y * tailleCase;

    dessinerCarre(px, py, tailleCase, "#483D8B");

    const tailleOeil = tailleCase / 5;
    let oeilX = tailleCase / 4;
    let oeilY = tailleCase / 4;

    switch (direction) {
        case "haut":
            dessinerCarre(px + oeilX, py + oeilY, tailleOeil, "black");
            dessinerCarre(px + 2*oeilX, py + oeilY, tailleOeil, "black");
            dessinerCarre(px + tailleCase/2 - tailleOeil/2, py - tailleOeil, tailleOeil, "red");
            break;
        case "bas":
            dessinerCarre(px + oeilX, py + 2*oeilY, tailleOeil, "black");
            dessinerCarre(px + 2*oeilX, py + 2*oeilY, tailleOeil, "black");
            dessinerCarre(px + tailleCase/2 - tailleOeil/2, py + tailleCase, tailleOeil, "red");
            break;
        case "gauche":
            dessinerCarre(px + oeilX, py + oeilY, tailleOeil, "black");
            dessinerCarre(px + oeilX, py + 2*oeilY, tailleOeil, "black");
            dessinerCarre(px - tailleOeil, py + tailleCase/2 - tailleOeil/2, tailleOeil, "red");
            break;
        case "droite":
            dessinerCarre(px + 2*oeilX, py + oeilY, tailleOeil, "black");
            dessinerCarre(px + 2*oeilX, py + 2*oeilY, tailleOeil, "black");
            dessinerCarre(px + tailleCase, py + tailleCase/2 - tailleOeil/2, tailleOeil, "red");
            break;
    }
}

export function dessinerCorps(x, y, tileSize) {
    dessinerCarre(x, y, tileSize, "#43008F");
}

