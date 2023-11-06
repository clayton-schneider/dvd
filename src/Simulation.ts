import type Canvas from "./Canvas";
import type Cursor from "./Cursor";

class Simulation {
  bounces: number;
  running: boolean;

  constructor() {
    this.bounces = 0;
    this.running = false;
  }

  mountCanvas(entry: HTMLDivElement, canvas: Canvas) {
    entry.innerHTML = canvas.html;
  }

  toggleRunning() {
    this.running = !this.running;
  }

  incrementBounce() {
    this.bounces++;
    document.querySelector(
      "#bounces"
    )!.innerHTML = `<p>Bounces: ${this.bounces.toString()} </p>`;
  }

  run(canvas: Canvas, cursor: Cursor) {
    window.requestAnimationFrame(() => {
      this.run(canvas, cursor);
    });

    this.update(canvas, cursor);
    this.render(canvas, cursor);
  }

  update(canvas: Canvas, cursor: Cursor) {
    if (!this.running) {
      return;
    }

    if (cursor.getRightEdge() >= canvas.width) {
      cursor.velX = -1 * cursor.velX;
      this.incrementBounce();
    }
    if (cursor.getLeftEdge() <= 0) {
      cursor.velX = -1 * cursor.velX;
    }
    if (cursor.getBottomEdge() >= canvas.height) {
      cursor.velY = -1 * cursor.velY;
    }
    if (cursor.getTopEdge() <= 0) {
      cursor.velY = -1 * cursor.velY;
    }

    cursor.x += cursor.velX;
    cursor.y += cursor.velY;
  }

  render(canvas: Canvas, cursor: Cursor) {
    canvas.getCtx().clearRect(0, 0, canvas.width, canvas.height);

    canvas.getCtx().fillRect(cursor.x, cursor.y, cursor.width, cursor.height);
  }
}

export default Simulation;
