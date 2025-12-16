const canvas = document.querySelector("#snakeCanvas");
const ctx = canvas.getContext("2d");

function dessinerCarre(x, y, l, couleur) {
    ctx.fillStyle = couleur;
    ctx.fillRect(x, y, l, l);
}

function dessinerTerrain() {
    for (let i=0; i<15; ++i) {
        for (let j=0; j<15; ++j) {
            dessinerCarre(i*30, j*30, 30, "#006400")
        }
    }
}

dessinerTerrain()

