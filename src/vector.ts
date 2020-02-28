export class Vector {
    constructor (
        public readonly x: number,
        public readonly y: number
    ) {}

    public translate(xDiff: number, yDiff: number): Vector {
        return new Vector(this.x + xDiff, this.y + yDiff);
    }
}
