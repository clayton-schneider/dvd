import "./style.css";
import Cursor from "./Cursor";
import Canvas from "./Canvas";
import Simulation from "./Simulation";

const canvas = new Canvas(1600, 900);
const cursor = new Cursor(100, 100, 10, 10, 160, 90);

const sim = new Simulation();
sim.mountCanvas(document.querySelector<HTMLDivElement>("#app")!, canvas);

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
  canvas.getCtx().clearRect(0, 0, canvas.width, canvas.height);

  canvas.getCtx().fillRect(cursor.x, cursor.y, cursor.width, cursor.height);
}
