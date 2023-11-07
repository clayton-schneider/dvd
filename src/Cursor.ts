class Cursor {
  x: number;
  y: number;
  velX: number;
  velY: number;
  width: number;
  height: number;

  constructor(
    x: number,
    y: number,
    velX: number,
    velY: number,
    width: number,
    height: number
  ) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.width = width;
    this.height = height;
  }
  getRightEdge() {
    return this.x + this.width;
  }
  getLeftEdge() {
    return this.x;
  }
  getTopEdge() {
    return this.y;
  }
  getBottomEdge() {
    return this.y + this.height;
  }
}

export default Cursor;
