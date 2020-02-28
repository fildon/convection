import { Vector } from "./vector";

export class Bubble {
    public position: Vector;
    public velocity: Vector;
    public heat: number;
    constructor(position: Vector) {
        this.position = position;
        this.velocity = new Vector(0, 0);
        this.heat = 20;
    }

    public update(): void {
        // TODO wall repulsion/clipping
        // TODO bubble repulsion -> velocity
        this.applyGravity();
        // TODO apply velocity to position
        this.applyVelocity();
        // TODO decay momentum?
        this.applyBrownian();
    }

    private applyGravity(): void {
        this.velocity = this.velocity.add(new Vector(0, 0.1));
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
}
