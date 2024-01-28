export class Anim {
  frames: number[][];
  frameTicks: number;
  looping: boolean;
  constructor(frames: number[][], frameTicks: number, looping: boolean) {
    this.frames = frames;
    this.frameTicks = frameTicks;
    this.looping = looping;
  }
  getKeyFrame(stateTicks: number): number[] {
    if (this.frames.length === 1) {
      return this.frames[0];
    }
    let index = Math.floor(stateTicks / this.frameTicks);
    if (this.looping) {
      index = index % this.frames.length;
    } else {
      index = Math.min(this.frames.length - 1, index);
    }
    return this.frames[index];
  }
  isFinished(stateTicks: number): boolean {
    if (this.looping) {
      return false;
    }
    return stateTicks >= this.frames.length * this.frameTicks;
  }
}

export class Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  overlaps(other: Rect): boolean {
    return this.x < other.x + other.width && this.x + this.width > other.x && this.y < other.y + other.height && this.y + this.height > other.y;
  }
}

export class Vec2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
  add(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }
  scl(scalar: number): void {
    this.x *= scalar;
    this.y *= scalar;
  }
  equals(other: Vec2) {
    return this.x == other.x && this.y == other.y;
  }
}
