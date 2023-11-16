// import Cursor from "./Cursor";
// import Simulation from "./Simulation";

import Canvas from "./Canvas";

type Line = {
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
};

const showLines = true;

const app = document.querySelector<HTMLDivElement>("#app")!;
let CONTAINER_WIDTH = app.offsetWidth;
let CONTAINER_HEIGHT = app.offsetHeight;

let CANVAS_WIDTH = CONTAINER_WIDTH;
let CANVAS_HEIGHT = CONTAINER_HEIGHT;

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let CURSOR_WIDTH = 160;
let CURSOR_HEIGHT = 90;

const ctx = canvas!.getContext("2d")!;

const xInp = document.querySelector("#x")! as HTMLInputElement;
const yInp = document.querySelector("#y")! as HTMLInputElement;

let lines = generateLines(xInp.valueAsNumber, yInp.valueAsNumber);
let currLine = 0;
let t = 0;

window.addEventListener("resize", () => {
  CONTAINER_WIDTH = app.offsetWidth;
  CONTAINER_HEIGHT = app.offsetHeight;

  CANVAS_WIDTH = CONTAINER_WIDTH;
  CANVAS_HEIGHT = CONTAINER_HEIGHT;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  lines = generateLines(xInp.valueAsNumber, yInp.valueAsNumber);
});

run();

function run() {
  window.requestAnimationFrame(run);

  render(lines);

  t += 0.005 / scaleTime(lines[currLine]);

  if (currLine < lines.length - 1) {
    if (t > 1) {
      t = 0;
      currLine++;
    }
  } else if (currLine === lines.length - 1) {
    if (t > 1) {
      t = 1;
    }
  }
}

function scaleTime(line: Line) {
  const maxLength = Math.sqrt(
    Math.pow(CANVAS_WIDTH - CURSOR_WIDTH, 2) +
      Math.pow(CANVAS_HEIGHT - CURSOR_HEIGHT, 2)
  );

  const deltaX = line.xEnd - line.xStart;
  const deltaY = line.yEnd - line.yStart;

  const lineLength = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

  const percentage = lineLength / maxLength;
  return percentage;
}

xInp.addEventListener("input", () => {
  if (xInp.valueAsNumber > CANVAS_WIDTH - CURSOR_WIDTH) {
    alert(
      "Please choose a value between 0 and " + (CANVAS_WIDTH - CURSOR_WIDTH)
    );
    return;
  }
  lines = generateLines(xInp.valueAsNumber, yInp.valueAsNumber);
  render(lines);
});

yInp.addEventListener("input", () => {
  if (yInp.valueAsNumber > CANVAS_HEIGHT - CURSOR_HEIGHT) {
    alert(
      "Please choose a value between 0 and " + (CANVAS_HEIGHT - CURSOR_HEIGHT)
    );
    return;
  }

  lines = generateLines(xInp.valueAsNumber, yInp.valueAsNumber);
  render(lines);
});

function generateLines(x = 100, y = 100) {
  const lineArr = [];
  const line = {
    xStart: x,
    yStart: y,
    xEnd: 0,
    yEnd: 0,
  };
  const v = {
    x: 10,
    y: 10,
  };

  let count = 0;

  while (count < 100) {
    const dist = {
      x: 0,
      y: 0,
    };

    if (findDirection(v.x, v.y) === "tl") {
      dist.x = line.xStart;
      dist.y = line.yStart;

      if (dist.x > dist.y) {
        v.y = v.y * -1;

        line.xEnd = line.xStart - dist.y;
        line.yEnd = 0;
      } else if (dist.x < dist.y) {
        v.x = v.x * -1;

        line.xEnd = 0;
        line.yEnd = line.yStart - dist.x;
      } else if (dist.x === dist.y) {
        v.x = v.x * -1;
        v.y = v.y * -1;

        line.xEnd = 0;
        line.yEnd = 0;
      }

      lineArr.push({
        xStart: line.xStart,
        xEnd: line.xEnd,
        yStart: line.yStart,
        yEnd: line.yEnd,
      });

      line.xStart = line.xEnd;
      line.yStart = line.yEnd;
    } else if (findDirection(v.x, v.y) === "tr") {
      line.xStart += CURSOR_WIDTH;

      dist.x = CANVAS_WIDTH - line.xStart;
      dist.y = line.yStart;

      if (dist.x > dist.y) {
        v.y = v.y * -1;

        line.xEnd = line.xStart + dist.y;
        line.yEnd = 0;
      } else if (dist.x < dist.y) {
        v.x = v.x * -1;

        line.xEnd = CANVAS_WIDTH;
        line.yEnd = line.yStart - dist.x;
      } else if (dist.x === dist.y) {
        v.x = v.x * -1;
        v.y = v.y * -1;

        line.xEnd = CANVAS_WIDTH;
        line.yEnd = 0;
      }

      lineArr.push({
        xStart: line.xStart,
        xEnd: line.xEnd,
        yStart: line.yStart,
        yEnd: line.yEnd,
      });

      line.xStart = line.xEnd - CURSOR_WIDTH;
      line.yStart = line.yEnd;
    } else if (findDirection(v.x, v.y) === "br") {
      line.xStart += CURSOR_WIDTH;
      line.yStart += CURSOR_HEIGHT;

      dist.x = CANVAS_WIDTH - line.xStart;
      dist.y = CANVAS_HEIGHT - line.yStart;

      if (dist.x > dist.y) {
        v.y = v.y * -1;

        line.xEnd = line.xStart + dist.y;
        line.yEnd = CANVAS_HEIGHT;
      } else if (dist.x < dist.y) {
        v.x = v.x * -1;

        line.xEnd = CANVAS_WIDTH;
        line.yEnd = line.yStart + dist.x;
      } else if (dist.x === dist.y) {
        v.x = v.x * -1;
        v.y = v.y * -1;

        line.xEnd = CANVAS_WIDTH;
        line.yEnd = CANVAS_HEIGHT;
      }

      lineArr.push({
        xStart: line.xStart,
        xEnd: line.xEnd,
        yStart: line.yStart,
        yEnd: line.yEnd,
      });
      line.xStart = line.xEnd - CURSOR_WIDTH;
      line.yStart = line.yEnd - CURSOR_HEIGHT;
    } else if (findDirection(v.x, v.y) === "bl") {
      line.yStart += CURSOR_HEIGHT;

      dist.x = line.xStart;
      dist.y = CANVAS_HEIGHT - line.yStart;

      if (dist.x > dist.y) {
        v.y = v.y * -1;

        line.xEnd = line.xStart - dist.y;
        line.yEnd = CANVAS_HEIGHT;
      } else if (dist.x < dist.y) {
        v.x = v.x * -1;

        line.xEnd = 0;
        line.yEnd = line.yStart + dist.x;
      } else if (dist.x === dist.y) {
        v.x = v.x * -1;
        v.y = v.y * -1;

        line.xEnd = 0;
        line.yEnd = CANVAS_HEIGHT;
      }

      lineArr.push({
        xStart: line.xStart,
        xEnd: line.xEnd,
        yStart: line.yStart,
        yEnd: line.yEnd,
      });
      line.xStart = line.xEnd;
      line.yStart = line.yEnd - CURSOR_HEIGHT;
    }

    count++;
  }
  return lineArr;
}

function render(lines: Line[]) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (showLines) {
    ctx.beginPath();
    ctx.moveTo(lines[currLine].xStart, lines[currLine].yStart);
    ctx.lineTo(lines[currLine].xEnd, lines[currLine].yEnd);
    ctx.stroke();
    // lines.forEach((line) => {
    //   canvas.getCtx().beginPath();
    //   canvas.getCtx().moveTo(line.xStart, line.yStart);
    //   canvas.getCtx().lineTo(line.xEnd, line.yEnd);
    //   canvas.getCtx().stroke();
  }

  drawCursorAlongLine(lines[currLine], t);
}

function drawCursorAlongLine(line: Line, t: number) {
  const deltaX = line.xEnd - line.xStart;
  const x = deltaX * t + line.xStart;

  const deltaY = line.yEnd - line.yStart;
  const y = deltaY * t + line.yStart;

  if (deltaX > 0 && deltaY > 0) {
    ctx.fillRect(
      x - CURSOR_WIDTH,
      y - CURSOR_HEIGHT,
      CURSOR_WIDTH,
      CURSOR_HEIGHT
    );
  } else if (deltaX > 0 && deltaY < 0) {
    ctx.fillRect(x - CURSOR_WIDTH, y, CURSOR_WIDTH, CURSOR_HEIGHT);
  } else if (deltaX < 0 && deltaY > 0) {
    ctx.fillRect(x, y - CURSOR_HEIGHT, CURSOR_WIDTH, CURSOR_HEIGHT);
  } else if (deltaX < 0 && deltaY < 0) {
    ctx.fillRect(x, y, CURSOR_WIDTH, CURSOR_HEIGHT);
  } else {
    console.log("error finding edge to draw box from");
  }
}

function findDirection(x: number, y: number) {
  if (x < 0 && y < 0) {
    return "tl";
  } else if (x > 0 && y < 0) {
    return "tr";
  } else if (x > 0 && y > 0) {
    return "br";
  } else if (x < 0 && y > 0) {
    return "bl";
  }
}

// const cursor = new Cursor(100, 100, 10, 10, CURSOR_WIDTH, CURSOR_HEIGHT);

// function cursorFactory(n: number) {
//   const cursorArr = [];

//   // prevent from generating in the wall
//   const maxWidth = CANVAS_WIDTH - CURSOR_WIDTH;
//   const maxHeight = CANVAS_HEIGHT - CURSOR_HEIGHT;

//   for (let i = 0; i < n; i++) {
//     cursorArr.push(
//       new Cursor(randomPos(maxWidth), randomPos(maxHeight), 10, 10, 160, 90)
//     );
//   }

//   return cursorArr;

//   function randomPos(max: number) {
//     return Math.floor(Math.random() * max);
//   }
// }

// // const cursors = cursorFactory(1);

// const sim = new Simulation();
// sim.mountCanvas(document.querySelector<HTMLDivElement>("#app")!, canvas);

// sim.run(canvas, cursor);

// document.querySelector("#start")!.addEventListener("click", () => {
//   sim.toggleRunning();
// });
