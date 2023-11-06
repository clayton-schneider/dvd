class Canvas {
  width: number;
  height: number;
  html: string;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.html = `<canvas id="canvas" width=${this.width} height=${this.height}></canvas>`;
  }

  getCtx() {
    return document
      .querySelector<HTMLCanvasElement>("#canvas")!
      .getContext("2d")!;
  }
}

export default Canvas;
