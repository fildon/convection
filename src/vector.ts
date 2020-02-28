export class Vector {
    constructor (
        public readonly x: number,
        public readonly y: number
    ) {}

    public add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    public distanceTo(other: Vector): number {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }

    public vectorTo(other: Vector): Vector {
        return new Vector(
            other.x - this.x, other.y - this.y
        );
    }

    public scaleBy(scalar: number): Vector {
        return new Vector(scalar * this.x, scalar * this.y);
    }
}
