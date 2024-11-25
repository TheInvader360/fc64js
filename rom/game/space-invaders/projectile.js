import { colors } from './assets.js';

export class Bolt {
  static height = 3;
  static speed = 0.5; // pixels per tick

  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.pendingRemoval = false;
  }

  draw() {
    drawLine(this.x, this.y, this.x, this.y + Bolt.height - 1, colors.yellow);
  }

  update() {
    this.y += Bolt.speed;
    if (this.y > GFX_H) this.pendingRemoval = true;
  }
}

export class Laser {
  static height = 2;
  static speed = 1; // pixels per tick

  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.pendingRemoval = false;
  }

  draw() {
    drawLine(this.x, this.y, this.x, Math.floor(this.y + Laser.height), colors.yellow);
  }

  update() {
    this.y -= Laser.speed;
    if (this.y < 5) this.pendingRemoval = true;
  }
}

export class ProjectileManager {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.lasers = [];
    this.bolts = [];
  }

  addBolt(spawnLocation) {
    if (spawnLocation) this.bolts.push(new Bolt(spawnLocation));
  }

  addLaser(spawnLocation) {
    if (spawnLocation) {
      this.lasers.push(new Laser(spawnLocation));
      this.audioManager.laser();
    }
  }

  draw() {
    for (const laser of this.lasers) laser.draw();
    for (const bolt of this.bolts) bolt.draw();
  }

  getBolts() {
    return this.bolts;
  }

  getLasers() {
    return this.lasers;
  }

  reset() {
    this.lasers = [];
    this.bolts = [];
  }

  update() {
    for (const laser of this.lasers) laser.update();
    this.lasers = this.lasers.filter((laser) => !laser.pendingRemoval);

    for (const bolt of this.bolts) bolt.update();
    this.bolts = this.bolts.filter((bolt) => !bolt.pendingRemoval);
  }
}
