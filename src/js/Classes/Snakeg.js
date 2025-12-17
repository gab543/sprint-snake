// src/js/Classes/Snakeg.js
// Classe Snakeg : gestion d'un serpent sur une grille (segments, direction, croissance, collisions, rendu)
import { dessinerCarre, dessinerTete } from "../canvas/canvas.js";

export default class Snakeg {
    constructor(x = 7, y = 9, size = 30) {
        this.yBody1 = x - 1
        this.yBody2 = y - 2
        this.segments = [{ x, y }, { x, ybody1 }, { x, ybody2 }];
        this.dx = 0;
        this.dy = 1;
        this._direction = "haut"
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
        // Empêche demi-tour (180°)
        if (this.dx === -newDx && this.dy === -newDy) { return console.log("annulée") };

        this.dx = newDx;
        this.dy = newDy;

        if (newDx === 0 && newDy === -1) this.direction = "haut";
        else if (newDx === 0 && newDy === 1) this.direction = "bas";
        else if (newDx === -1 && newDy === 0) this.direction = "gauche";
        else if (newDx === 1 && newDy === 0) this.direction = "droite";
    }

    // Utilitaire pour gérer les touches fléchées
    setDirectionFromKey(key) {
        switch (key) {
            case 'ArrowUp':
                this.changeDirection(0, -1);
                console.log("haut")
                break;
            case 'ArrowDown':
                this.changeDirection(0, 1);
                console.log("bas")
                break;
            case 'ArrowLeft':
                this.changeDirection(-1, 0);
                console.log("gauche")
                break;
            case 'ArrowRight':
                this.changeDirection(1, 0);
                console.log("droite")
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
        console.log(this.segments)
    }

    // Demande de croissance (par ex. lorsqu'il mange)
    grow(amount = 1) {
        console.log("on grandi")
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
    draw(bodyColor = 'green') {
        this.segments.forEach((segment, index) => {
            if (index === 0) dessinerTete(segment.x, segment.y, this.direction);
            dessinerCarre(segment.x, segment.y, this.size, bodyColor)
            console.log("snake déssiné en " + segment.x + ", " + segment.y)
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
