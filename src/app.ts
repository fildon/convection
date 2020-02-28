document.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvasElement.getContext("2d")!;
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    ctx.beginPath();
    ctx.arc(
        window.innerWidth / 2,
        window.innerHeight / 2,
        20,
        0, 2 * Math.PI
    );
    ctx.fillStyle = 'red';
    ctx.fill();
});
