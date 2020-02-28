import { Vector } from "./vector";

export class Bubble {
    public position: Vector;
    public velocity: Vector;
    public heat: number;
    public colour = 'blue';
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
    }

    public updateVelocity(bubbles: Bubble[]): void {
        this.applyBubbleBounce(bubbles);
        this.applyGravity();
        this.applyWallBounce();
    }

    public updatePosition(): void {
        this.applyVelocity();
        // this.applyBrownian();
    }

    public heatUp(): void {
        this.heat += 0.1;
    }

    public coolDown(): void {
        if (this.heat < 0.1) {
            return;
        }
        this.heat -= 0.1;
    }

    private applyBubbleBounce(bubbles: Bubble[]): void {
        this.colour = 'blue';
        bubbles.forEach(bubble => {
            if (this === bubble) {
                return;
            }
            if (this.position.distanceTo(bubble.position) < this.heat + bubble.heat) {
                this.repelFrom(bubble.position);
                this.colour = 'red';
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

    private applyBrownian(): void {
        const brownian = new Vector(
            5 * (Math.random() - 0.5),
            5 * (Math.random() - 0.5)
        );
        this.position = this.position.add(brownian);
    }

    private applyWallBounce(): void {
        // left wall
        if (this.position.x < this.heat) {
            const xDiff = -2 * (this.position.x - this.heat);
            this.position = this.position.add(new Vector(
                xDiff, 0
            ));
            if (this.velocity.x < 0) {
                this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            }
        }

        // top wall
        if (this.position.y < this.heat) {
            const yDiff = -2 * (this.position.y - this.heat);
            this.position = this.position.add(new Vector(
                0, yDiff
            ));
            if (this.velocity.y < 0) {
                this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            }
        }

        // right wall
        if (this.position.x > window.innerWidth - this.heat) {
            const xDiff = -2 * (this.position.x + this.heat - window.innerWidth);
            this.position = this.position.add(new Vector(
                xDiff, 0
            ));
            if (this.velocity.x > 0) {
                this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            }
        }

        // bottom wall
        if (this.position.y > window.innerHeight - this.heat) {
            const yDiff = -2 * (this.position.y + this.heat - window.innerHeight);
            this.position = this.position.add(new Vector(
                0, yDiff
            ));
            if (this.velocity.y > 0) {
                this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            }
        }
    }
}
