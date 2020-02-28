import { Vector } from "./vector";

export class Bubble {
    public position: Vector;
    public velocity: Vector;
    public heat: number;
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

    public update(bubbles: Bubble[]): void {
        this.applyBubbleBounce(bubbles);
        this.applyGravity();
        this.applyVelocity();
        this.applyBrownian();
        this.applyWallBounce();
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
        const repulsionVector = position.vectorTo(this.position).scaleBy(0.1);
        this.velocity = this.velocity.add(repulsionVector);
    }

    private applyGravity(): void {
        this.velocity = this.velocity.add(Bubble.gravity);
    }

    private applyVelocity(): void {
        this.position = this.position.add(this.velocity);
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
        if (this.position.x < 0) {
            const xDiff = -2 * this.position.x;
            this.position = this.position.add(new Vector(
                xDiff, 0
            ));
            if (this.velocity.x < 0) {
                this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            }
        }

        // top wall
        if (this.position.y < 0) {
            const yDiff = -2 * this.position.y;
            this.position = this.position.add(new Vector(
                0, yDiff
            ));
            if (this.velocity.y < 0) {
                this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            }
        }

        // right wall
        if (this.position.x > window.innerWidth) {
            const xDiff = -2 * (this.position.x - window.innerWidth);
            this.position = this.position.add(new Vector(
                xDiff, 0
            ));
            if (this.velocity.x > 0) {
                this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            }
        }

        // bottom wall
        if (this.position.y > window.innerHeight) {
            const yDiff = -2 * (this.position.y - window.innerHeight);
            this.position = this.position.add(new Vector(
                0, yDiff
            ));
            if (this.velocity.y > 0) {
                this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            }
        }
    }
}
