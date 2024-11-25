import { imgExplosionLarge, imgPlayer } from './assets.js';

export class Player {
  static states = { normal: 0, exploding: 1 };
  static y = 56;
  static width = 5;
  static height = 3;
  static speed = 0.5; // pixels per tick
  static minX = 0;
  static maxX = 59;
  static laserFireRate = 20; // minimum ticks between shots

  constructor() {
    this.x = 29;
    this.laserCoolDownTimer = 0;
    this.state = Player.states.normal;
  }

  changeState(newState) {
    this.state = newState;
  }

  draw() {
    if (this.state == Player.states.normal) drawImage(this.x, Player.y, 5, 3, imgPlayer);
    if (this.state == Player.states.exploding) drawImage(this.x, Player.y, 5, 3, imgExplosionLarge);
  }

  tryFireLaser() {
    if (this.laserCoolDownTimer <= 0) {
      this.laserCoolDownTimer = Player.laserFireRate;
      return { x: this.x + 2, y: Player.y }; // laser spawn location
    }
  }

  tryMoveLeft() {
    this.x -= Player.speed;
    if (this.x < Player.minX) this.x = Player.minX;
  }

  tryMoveRight() {
    this.x += Player.speed;
    if (this.x > Player.maxX) this.x = Player.maxX;
  }

  update() {
    this.laserCoolDownTimer--;
  }
}
