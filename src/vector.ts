export class Vector {
    constructor (
        public readonly x: number,
        public readonly y: number
    ) {}

    public add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }
}
