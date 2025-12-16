// src/js/Classes/Snakeg.js
// Classe Snakeg : gestion d'un serpent sur une grille (segments, direction, croissance, collisions, rendu)
import dessinerCarre from "../canvas/canvas";

export default class Snakeg {
    constructor(x = 5, y = 5, size = 30) {
        this.segments = [{ x, y }];
        this.dx = 0;
        this.dy = 1;
        this.size = size;
        this.growPending = 0; // nombre de segments à ajouter
        this._canvasHeight = 450;
        this._canvasWidth = 450;
    }

    get head() {
        return this.segments[0];
    }

    // Empêche l'inversion 180° et change la direction
    changeDirection(newDx, newDy) {
        if (this.dx === -newDx && this.dy === -newDy) return; // empêcher inversion
        this.dx = newDx;
        this.dy = newDy;
    }

    // Utilitaire pour gérer les touches fléchées
    setDirectionFromKey(key) {
        switch (key) {
            case 'ArrowUp':
                this.changeDirection(0, -1);
                break;
            case 'ArrowDown':
                this.changeDirection(0, 1);
                break;
            case 'ArrowLeft':
                this.changeDirection(-1, 0);
                break;
            case 'ArrowRight':
                this.changeDirection(1, 0);
                break;
        }
    }

    // Déplacement : ajoute une nouvelle tête et enlève la queue sauf si growPending > 0
    move() {
        const head = this.head;
        const newHead = { x: head.x + this.dx, y: head.y + this.dy };
        this.segments.unshift(newHead);

        if (this.growPending > 0) {
            this.growPending -= 1;
        } else {
            this.segments.pop();
        }
    }

    // Demande de croissance (par ex. lorsqu'il mange)
    grow(amount = 1) {
        this.growPending += amount;
    }

    // Collision avec murs ou auto-collision
    checkCollision() {
        const head = this.head;

        // collision murs (coord en cases * size)
        if (
            head.x < 0 ||
            head.y < 0 ||
            head.x * this.size >= this._canvasWidth ||
            head.y * this.size >= this._canvasHeight
        ) {
            return true;
        }

        // collision avec soi-même
        for (let i = 1; i < this.segments.length; i++) {
            if (head.x === this.segments[i].x && head.y === this.segments[i].y) {
                return true;
            }
        }

        return false;
    }

    // Rendu simple sur un context 2D
    draw(ctx, { headColor = 'darkgreen', bodyColor = 'green' } = {}) {
        this.segments.forEach((segment, index) => {
            if (index === 0) { dessinerCarre(segment.x, segment.y, this.size, headColor) }
            dessinerCarre(segment.x, segment.y, this.size, bodyColor)
        });
    }

    // Reset du serpent à une position initiale
    reset(x = 5, y = 5) {
        this.segments = [{ x, y }];
        this.dx = 1;
        this.dy = 0;
        this.growPending = 0;
    }
}
