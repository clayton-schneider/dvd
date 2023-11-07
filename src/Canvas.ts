class Canvas {
  width: number;
  height: number;
  html: string;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.html = `<canvas class="bg-red-800" id="canvas" width=${this.width} height=${this.height}></canvas>`;
  }

  getCtx() {
    return document
      .querySelector<HTMLCanvasElement>("#canvas")!
      .getContext("2d")!;
  }

  getLeftEdge() {
    return 0;
  }

  getRightEdge() {
    return this.width;
  }

  getBottomEdge() {
    return this.height;
  }

  getTopEdge() {
    return 0;
  }
}

export default Canvas;
