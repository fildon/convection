import { Bubble } from "./bubble";
import { Canvas } from "./canvas";

export class Simulation {
  private readonly canvas: Canvas;
  private readonly bubbles: Bubble[];
  private previousTime: number;
  private lag: number;

  constructor() {
    this.canvas = new Canvas();
    this.bubbles = Bubble.createRandomBubbles(300);
    this.previousTime = performance.now();
    this.lag = 0;
  }

  public start(): void {
    setInterval(() => {
      this.tick();
    }, 1000/20);
  }

  private tick(): void {
    const currentTime = performance.now();
    const elapsed = currentTime - this.previousTime;
    this.previousTime = currentTime
    this.lag += elapsed;

    while (this.lag >= 1000/20) {
      this.updateSimulation();
      this.lag -= 1000/20;
    }

    this.renderSimulation();
  }

  private updateSimulation(): void {
    this.bubbles.forEach(bubble => bubble.updateVelocity(this.bubbles));
    this.bubbles.forEach(bubble => bubble.updatePosition());
    this.applyHotAndCold();
  }

  private applyHotAndCold(): void {
    this.bubbles.sort((a, b) => {
      return a.position.y - b.position.y;
    });
    const warmBubbles = this.bubbles.filter(bubble => bubble.heat > 2)
    for (let i = 0; i < warmBubbles.length / 20; i++) {
      warmBubbles[i].coolDown();
      warmBubbles[warmBubbles.length - 1 - i].heatUp();
    }
  }

  private renderSimulation(): void {
    this.canvas.draw(this.bubbles);
  }
}
