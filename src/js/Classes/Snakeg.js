class Snake {
    constructor(x, y) {
        this._body = [[x, y]]
    }
    moveSnake(newX, newY) {
        this.lastBox = this._body[this._body.length]
        this._body.unshift = [newX, newY]
        this._body.pop()
    }

}