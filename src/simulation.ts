import { Bubble } from "./bubble";
import { Canvas } from "./canvas";
import { take, takeRight } from "lodash"

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
    const groupSize = this.bubbles.length / 20
    const highestGroup = take(this.bubbles.filter(bubble => bubble.heat > 10), groupSize)
    const lowestGroup = takeRight(this.bubbles, groupSize)
    highestGroup.forEach(bubble => bubble.coolDown())
    lowestGroup.forEach(bubble => bubble.heatUp())
  }

  private renderSimulation(): void {
    this.canvas.draw(this.bubbles);
  }
}
