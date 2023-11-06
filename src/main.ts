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
  width: 160,
  height: 90,
  draw() {
    ctx?.fillRect(this.x, this.y, this.width, this.height);
  },
};

ctx!.fillRect(cursor.x, cursor.y, cursor.width, cursor.height);

function render() {
  ctx?.clearRect(0, 0, canvas.width, canvas.height);
  cursor.draw();
  cursor.x += 1;
  cursor.y += 1;
  window.requestAnimationFrame(render);
}
function init() {
  window.requestAnimationFrame(render);
}

init();
