import { Vector } from "./vector";

export class Bubble {
    public position: Vector;
    constructor(position: Vector) {
        this.position = position;
    }

    public update(): void {
        const xDiff = 5 * (Math.random() - 0.5);
        const yDiff = 5 * (Math.random() - 0.5);
        this.position = this.position.translate(xDiff, yDiff);
    }
}
