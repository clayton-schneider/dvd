import "./style.css";
import Cursor from "./Cursor";
import Canvas from "./Canvas";
import Simulation from "./Simulation";

const canvas = new Canvas(1600, 900);
const cursor = new Cursor(100, 100, 10, 10, 160, 90);

const sim = new Simulation();
sim.mountCanvas(document.querySelector<HTMLDivElement>("#app")!, canvas);

sim.run(canvas, cursor);

document.querySelector("#start")!.addEventListener("click", () => {
  sim.toggleRunning();
});
