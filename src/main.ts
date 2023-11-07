import Cursor from "./Cursor";
import Canvas from "./Canvas";
import Simulation from "./Simulation";

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;

const CURSOR_WIDTH = CANVAS_WIDTH / 10;
const CURSOR_HEIGHT = CANVAS_HEIGHT / 10;

const canvas = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT);
const cursor = new Cursor(100, 100, 10, 10, CURSOR_WIDTH, CURSOR_HEIGHT);

function cursorFactory(n: number) {
  const cursorArr = [];

  // prevent from generating in the wall
  const maxWidth = CANVAS_WIDTH - CURSOR_WIDTH;
  const maxHeight = CANVAS_HEIGHT - CURSOR_HEIGHT;

  for (let i = 0; i < n; i++) {
    cursorArr.push(
      new Cursor(randomPos(maxWidth), randomPos(maxHeight), 10, 10, 160, 90)
    );
  }

  return cursorArr;

  function randomPos(max: number) {
    return Math.floor(Math.random() * max);
  }
}

// const cursors = cursorFactory(1);

const sim = new Simulation();
sim.mountCanvas(document.querySelector<HTMLDivElement>("#app")!, canvas);

sim.run(canvas, cursor);

document.querySelector("#start")!.addEventListener("click", () => {
  sim.toggleRunning();
});
