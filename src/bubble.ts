import { Vector } from "./vector";

export class Bubble {
  public position: Vector;
  public velocity: Vector;
  public heat: number;
  public colour = 'black';
  private static gravity = new Vector(0, 0.15);

  public static createRandomBubbles(n: number): Bubble[] {
    const bubbles: Bubble[] = [];
    for (let i = 0; i < n; i++) {
      bubbles.push(Bubble.createRandomBubble());
    }
    return bubbles;
  }

  public static createRandomBubble(): Bubble {
    const randomX = window.innerWidth * Math.random();
    const randomY = window.innerHeight * Math.random();
    return new Bubble(new Vector(randomX, randomY));
  }

  constructor(position: Vector) {
    this.position = position;
    this.velocity = new Vector(0, 0);
    this.heat = 20;
    this.updateColour();
  }

  public updateVelocity(bubbles: Bubble[]): void {
    this.applyBubbleBounce(bubbles);
    this.applyGravity();
    this.applyWallBounce();
  }

  public updatePosition(): void {
    this.applyVelocity();
  }

  public heatUp(): void {
    this.heat += 0.1;
    this.updateColour();
  }

  public coolDown(): void {
    if (this.heat < 0.1) {
      return;
    }
    this.heat -= 0.1;
    this.updateColour();
  }

  private updateColour(): void {
    let hue = 235 - 8 * this.heat;
    hue = hue < 0 ? 0 : hue;
    this.colour = `hsl(${hue}, 100%, 50%)`;
  }

  private applyBubbleBounce(bubbles: Bubble[]): void {
    bubbles.forEach(bubble => {
      if (this === bubble) {
        return;
      }
      if (this.position.distanceTo(bubble.position) < this.heat + bubble.heat) {
        this.repelFrom(bubble.position);
      }
    });
  }

  private repelFrom(position: Vector): void {
    const repulsionVector = position.vectorTo(this.position).scaleBy(0.05);
    this.velocity = this.velocity.add(repulsionVector);
  }

  private applyGravity(): void {
    this.velocity = this.velocity.add(Bubble.gravity);
  }

  private applyVelocity(): void {
    this.position = this.position.add(this.velocity);
    this.velocity = this.velocity.scaleBy(0.99);
  }

  private applyWallBounce(): void {
    // left wall
    if (this.position.x < this.heat) {
      const xDiff = 2 * (this.heat - this.position.x);
      this.position = this.position.add(new Vector(
        xDiff, 0
      ));
      if (this.velocity.x < 0) {
        this.velocity = new Vector(-this.velocity.x, this.velocity.y);
      }
    }

    // top wall
    if (this.position.y < this.heat) {
      const yDiff = 2 * (this.heat - this.position.y);
      this.position = this.position.add(new Vector(
        0, yDiff
      ));
      if (this.velocity.y < 0) {
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
      }
    }

    // right wall
    if (this.position.x > window.innerWidth - this.heat) {
      const xDiff = 2 * (window.innerWidth - this.position.x - this.heat);
      this.position = this.position.add(new Vector(
        xDiff, 0
      ));
      if (this.velocity.x > 0) {
        this.velocity = new Vector(-this.velocity.x, this.velocity.y);
      }
    }

    // bottom wall
    if (this.position.y > window.innerHeight - this.heat) {
      const yDiff = 2 * (window.innerHeight - this.position.y - this.heat);
      this.position = this.position.add(new Vector(
        0, yDiff
      ));
      if (this.velocity.y > 0) {
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
      }
    }
  }
}
