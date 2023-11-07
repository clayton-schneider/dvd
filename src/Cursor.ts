import Canvas from "./Canvas";

class Cursor {
  startX: number;
  startY: number;
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
    this.startX = x;
    this.startY = y;
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

  getPath(canvas: Canvas) {
    // check to see which wall will be hit first
    // draw line to wall
    // change direction of v

    const startCords = {
      x: this.startX,
      y: this.startY,
    };

    const coordinates = [];
    // can't pass directly in becuase then we would pass the reference
    // and since we update later those values would be overwritten
    coordinates.push({ x: startCords.x, y: startCords.y });

    const v = {
      x: this.velX,
      y: this.velY,
    };

    for (let i = 0; i < 4; i++) {
      if (v.x > 0 && v.y > 0) {
        // moving bottom right
        const horDist = canvas.getRightEdge() - startCords.x;
        const vertDist = canvas.getBottomEdge() - startCords.y;

        let newCords = { x: 0, y: 0 };
        // what side is going to hit first
        if (horDist > vertDist) {
          // bottom will be hit
          newCords.x = startCords.x + vertDist;
          newCords.y = startCords.y + vertDist;
          coordinates.push(newCords);
          v.y = -1 * v.y;
          startCords.x = newCords.x;
          startCords.y = newCords.y;
        } else if (horDist < vertDist) {
          // right will be hit
          newCords.y = startCords.y + horDist;
          newCords.x = startCords.x + horDist;
          coordinates.push(newCords);
          v.x = -1 * v.x;
          startCords.x = newCords.x;
          startCords.y = newCords.y;
        } else if (horDist === vertDist) {
          // hits corner
          console.log("slot!");
        } else {
          console.log("Error calculating distance");
        }
      } else if (v.x > 0 && v.y < 0) {
        // moving top right
        const horDist = canvas.getRightEdge() - startCords.x;
        const vertDist = Math.abs(canvas.getTopEdge() - startCords.y);

        let newCords = { x: 0, y: 0 };
        // what side is going to hit first
        if (horDist > vertDist) {
          // top will be hit
          newCords.x = startCords.x + vertDist;
          newCords.y = startCords.y - vertDist;
          coordinates.push(newCords);
          v.y = -1 * v.y;
          startCords.x = newCords.x;
          startCords.y = newCords.y;
        } else if (horDist < vertDist) {
          // right will be hit
          newCords.y = startCords.y - horDist;
          newCords.x = startCords.x + horDist;
          coordinates.push(newCords);
          v.x = -1 * v.x;
          startCords.x = newCords.x;
          startCords.y = newCords.y;
        } else if (horDist === vertDist) {
          // hits corner
          console.log("slot!");
        } else {
          console.log("Error calculating distance");
        }
      } else if (v.x < 0 && v.y > 0) {
        // moving bottom left
        const horDist = Math.abs(canvas.getLeftEdge() - startCords.x);
        const vertDist = Math.abs(canvas.getBottomEdge() - startCords.y);

        let newCords = { x: 0, y: 0 };
        // what side is going to hit first
        if (horDist > vertDist) {
          // bottom will be hit
          newCords.x = startCords.x - vertDist;
          newCords.y = startCords.y + vertDist;
          coordinates.push(newCords);
          v.y = -1 * v.y;
          startCords.x = newCords.x;
          startCords.y = newCords.y;
        } else if (horDist < vertDist) {
          // left will be hit
          newCords.y = startCords.y - horDist;
          newCords.x = startCords.x - horDist;
          coordinates.push(newCords);
          v.x = -1 * v.x;
          startCords.x = newCords.x;
          startCords.y = newCords.y;
        } else if (horDist === vertDist) {
          // hits corner
          console.log("slot!");
        } else {
          console.log("Error calculating distance");
        }
      } else if (v.x < 0 && v.y < 0) {
        // moving top left
        const horDist = Math.abs(canvas.getLeftEdge() - startCords.x);
        const vertDist = Math.abs(canvas.getTopEdge() - startCords.y);

        let newCords = { x: 0, y: 0 };
        // what side is going to hit first
        if (horDist > vertDist) {
          // top will be hit
          newCords.x = startCords.x - vertDist;
          newCords.y = startCords.y - vertDist;
          coordinates.push(newCords);
          v.y = -1 * v.y;
          startCords.x = newCords.x;
          startCords.y = newCords.y;
        } else if (horDist < vertDist) {
          // right will be hit
          newCords.y = startCords.y - horDist;
          newCords.x = startCords.x - horDist;
          coordinates.push(newCords);
          v.x = -1 * v.x;
          startCords.x = newCords.x;
          startCords.y = newCords.y;
        } else if (horDist === vertDist) {
          // hits corner
          console.log("slot!");
        } else {
          console.log("Error calculating distance");
        }
      } else {
        console.log("Error reading v for path-gen");
      }
    }

    return coordinates;
  }
}

export default Cursor;
