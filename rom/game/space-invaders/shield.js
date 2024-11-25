import { colors } from './assets.js';

export class ShieldManager {
  static shape = [
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,0,0,1,1,1],
    [1,1,0,0,0,0,1,1],
  ];

  constructor() {
    this.elements = new Map(); // shield elements keyed on 'x,y' coords
    for (let i = 0; i < 4; i++) {
      for (let row = 0; row < ShieldManager.shape.length; row++) {
        for (let col = 0; col < ShieldManager.shape[0].length; col++) {
          if (ShieldManager.shape[row][col]) this.elements.set(`${8 + 13 * i + col},${48 + row}`, true);
        }
      }
    }
  }

  draw() {
    this.elements.forEach((_value, key) => {
      const coords = key.split(',');
      drawPixel(coords[0], coords[1], colors.red)
    });
  }

  isShielded(x, y) {
    return this.elements.get(`${x},${y}`);
  }

  destroy(x, y) {
    this.elements.delete(`${x},${y}`);
  }

  explodeOut(x, y) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        this.destroy(i, j); // destroy shield elements at the point of impact and all immediately surrounding spaces
      }
    }
  }

  tunnelUp(x, y) {
    for (let i = y; i > y - 2; i--) {
      this.destroy(x, i); // destroy shield elements at the point of impact and up to two spaces above
    }
  }
}
