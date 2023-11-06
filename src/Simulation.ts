import type Canvas from "./Canvas";

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
}

export default Simulation;
