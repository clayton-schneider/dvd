import "./style.css";

class Canvas {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

const canvas = new Canvas(1600, 900);

const APP = document.querySelector<HTMLDivElement>("#app")!;

APP.innerHTML = `<canvas id="canvas" width=${canvas.width} height=${canvas.height}></canvas>`;

const can = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = can.getContext("2d");

const cursor = {
  x: 160,
  y: 90,
  velX: 10,
  velY: 10,
  width: 160,
  height: 90,

  getRightEdge() {
    return this.x + this.width;
  },
  getLeftEdge() {
    return this.x;
  },
  getTopEdge() {
    return this.y;
  },
  getBottomEdge() {
    return this.y + this.height;
  },
};

function main() {
  window.requestAnimationFrame(main);

  update();
  render();
}

main();

function update() {
  if (cursor.getRightEdge() >= canvas.width) {
    cursor.velX = -1 * cursor.velX;
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

function render() {
  ctx?.clearRect(0, 0, canvas.width, canvas.height);

  ctx!.fillRect(cursor.x, cursor.y, cursor.width, cursor.height);
}
