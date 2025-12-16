import { dessinerCorps, dessinerTete } from "../canvas/canvas.js";

class Snake {
    constructor(x, y, tileSize = 30) {
     
        this.segments = [
            { x: x, y: y }
        ];

        // la direction initiale 
        this.dx = 1;
        this.dy = 0;

        // taille d'une case (en pixels)
        this.size = tileSize;
    }

    // changer la direction 
    changeDirection(newDx, newDy) {
        if (this.dx === -newDx && this.dy === -newDy) {
            return;
        }
        this.dx = newDx;
        this.dy = newDy;
    }

    // deplacer le serpent
    move() {
        const head = this.segments[0];

        const newHead = {
            x: head.x + this.dx,
            y: head.y + this.dy
        };

        this.segments.unshift(newHead);
        this.segments.pop();
    }

    // grandir quand il mange
    grow() {
        const head = this.segments[0];

        const newHead = {
            x: head.x + this.dx,
            y: head.y + this.dy
        };

        this.segments.unshift(newHead);
    }

    // verifier les collisions
    checkCollision(canvasWidth, canvasHeight) {
        const head = this.segments[0];

        //collision avec les murs
        if (
            head.x < 0 ||
            head.y < 0 ||
            head.x * this.size >= canvasWidth ||
            head.y * this.size >= canvasHeight
        ) {
            return true;
        }

        // Collision avec lui-meme
        for (let i = 1; i < this.segments.length; i++) {
            if (
                head.x === this.segments[i].x &&
                head.y === this.segments[i].y
            ) {
                return true;
            }
        }

        return false;
    }

    draw() {
        const head = this.segments[0];

        let direction = "droite";
        if (this.dx === -1 && this.dy === 0) direction = "gauche";
        else if (this.dx === 0 && this.dy === -1) direction = "haut";
        else if (this.dx === 0 && this.dy === 1) direction = "bas";

        dessinerTete(head.x, head.y, direction);

        for (let i = 1; i < this.segments.length; i++) {
            const seg = this.segments[i];
            dessinerCorps(seg.x * this.size, seg.y * this.size, this.size);
        }
    }
}

export default Snake;
