import type Canvas from "./Canvas";
import Cursor from "./Cursor";

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

  run(canvas: Canvas, cursor: Cursor[] | Cursor) {
    window.requestAnimationFrame(() => {
      this.run(canvas, cursor);
    });

    this.update(canvas, cursor);
    this.render(canvas, cursor);
  }

  update(canvas: Canvas, cursor: Cursor[] | Cursor) {
    if (!this.running) {
      return;
    }

    // THE PATH OF THE CURSOR SHOULDN'T CHANGE WITH SPEED!
    // DIRECTION AND STARTING POSITION SHOULD BE ENOUGH TO DETERMINE THE OBJECTS PATH
    // VELOCITY SHOULD JUST BE HOW QUICKLY IT MOVES ALONG THAT PATH
    // CURRENTLY AS YOU INCREASE THE VELOCITY YOU INCREASE THE LIKELYHOOD THAT THE UPDATE
    // DIDN'T CATCH THAT IT WAS IN A SLOT AND SHOULD BE STOPPED.

    if (Array.isArray(cursor)) {
      cursor.forEach((c) => {
        this.checkImpact(canvas, c);
        c.x += c.velX;
        c.y += c.velY;
      });
    } else {
      this.checkImpact(canvas, cursor);

      cursor.x += cursor.velX;
      cursor.y += cursor.velY;
    }
  }

  render(canvas: Canvas, cursor: Cursor[] | Cursor) {
    canvas.getCtx().clearRect(0, 0, canvas.width, canvas.height);
    if (Array.isArray(cursor)) {
      cursor.forEach((c) => {
        canvas.getCtx().fillRect(c.x, c.y, c.width, c.height);
      });
    } else {
      canvas.getCtx().fillRect(cursor.x, cursor.y, cursor.width, cursor.height);

      // Code needed to draw paths
      const paths = cursor.getPath(canvas);

      for (let i = 1; i < paths.length; i++) {
        canvas.getCtx().beginPath();
        canvas.getCtx().moveTo(paths[i - 1].x, paths[i - 1].y);
        canvas.getCtx().lineTo(paths[i].x, paths[i].y);
        canvas.getCtx().stroke();
      }
    }
  }

  // handle impact detection
  checkImpact(canvas: Canvas, cursor: Cursor) {
    // check for two edges touching
    // improve collision detection

    // bottom right
    if (
      cursor.getRightEdge() === canvas.getRightEdge() &&
      cursor.getBottomEdge() === canvas.getBottomEdge()
    ) {
      this.toggleRunning();
    } else if (
      cursor.getRightEdge() === canvas.getRightEdge() &&
      cursor.getTopEdge() === canvas.getTopEdge()
    ) {
      this.toggleRunning();
    } else if (
      cursor.getLeftEdge() === canvas.getLeftEdge() &&
      cursor.getTopEdge() === canvas.getTopEdge()
    ) {
      this.toggleRunning();
    } else if (
      cursor.getLeftEdge() === canvas.getLeftEdge() &&
      cursor.getBottomEdge() === canvas.getBottomEdge()
    ) {
      this.toggleRunning();
    }

    // check for one edge touching
    if (cursor.getRightEdge() >= canvas.width) {
      cursor.velX = -1 * cursor.velX;
      this.incrementBounce();
    }
    if (cursor.getLeftEdge() <= 0) {
      cursor.velX = -1 * cursor.velX;
      this.incrementBounce();
    }
    if (cursor.getBottomEdge() >= canvas.height) {
      cursor.velY = -1 * cursor.velY;
      this.incrementBounce();
    }
    if (cursor.getTopEdge() <= 0) {
      cursor.velY = -1 * cursor.velY;
      this.incrementBounce();
    }
  }
}

export default Simulation;
