import { Bubble } from "./bubble";
import { Vector } from "./vector";
import { Canvas } from "./canvas";

export class Simulation {
    private readonly canvas: Canvas;

    constructor() {
        this.canvas = new Canvas();
    }

    public start(): void {
        const bubble = new Bubble(new Vector(window.innerWidth / 2, window.innerHeight / 2));
        this.canvas.draw([bubble]);
    }
}
