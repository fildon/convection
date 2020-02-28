import { Bubble } from "./bubble";
import { Vector } from "./vector";
import { Canvas } from "./canvas";

export class Simulation {
    private readonly canvas: Canvas;
    private readonly bubbles: Bubble[];

    constructor() {
        this.canvas = new Canvas();
        this.bubbles = [new Bubble(new Vector(
                window.innerWidth / 2,
                window.innerHeight / 2
        ))];
    }

    public start(): void {
        this.tick(performance.now(), 0);
    }

    private tick(previousTime: number, lag: number): void {
        const currentTime = performance.now();
        const elapsed = currentTime - previousTime;
        previousTime = currentTime
        lag += elapsed;

        while (lag >= 1000/60) {
            this.updateSimulation();
            lag -= 1000/60;
        }

        this.renderSimulation();
        setTimeout(() => {
            this.tick(previousTime, lag)
        }, 0);
    }

    private updateSimulation(): void {
        this.bubbles.forEach(bubble => bubble.update());
    }

    private renderSimulation(): void {
        this.canvas.draw(this.bubbles);
    }
}
