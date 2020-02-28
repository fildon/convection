import { Bubble } from './bubble';

export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d")!;
        this.setScreenSize();
    }

    public draw(bubbles: Bubble[]): void {
        this.setScreenSize();
        bubbles.forEach(bubble => this.drawBubble(bubble));
    }

    private setScreenSize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private drawBubble(bubble: Bubble): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(
            bubble.position.x,
            bubble.position.y,
            bubble.heat,
            0, 2 * Math.PI
        );
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
    }
}
