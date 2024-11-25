import { imgExplosionLarge, imgExplosionSmall, imgInvaderBlueT, imgInvaderBlueX, imgInvaderOrangeA, imgInvaderOrangeO, imgInvaderPurpleA, imgInvaderPurpleO, imgUfo } from './assets.js';

export class Invader {
  static states = { normal: 0, exploding: 1, pendingRemoval: 2 };
  static width = 4;
  static height = 3;

  constructor(x, y, typeOf) {
    this.x = x;
    this.y = y;
    this.img1 = typeOf == 0 ? imgInvaderOrangeO : typeOf == 1 ? imgInvaderBlueT : imgInvaderPurpleA;
    this.img2 = typeOf == 0 ? imgInvaderOrangeA : typeOf == 1 ? imgInvaderBlueX : imgInvaderPurpleO;
    this.points = typeOf == 0 ? 3 : typeOf == 1 ? 2 : 1;
    this.changeState(Invader.states.normal);
  }

  changeState(newState) {
    this.state = newState;
    this.stateTicks = 0;
  }

  draw(speed) {
    if (this.state == Invader.states.normal) drawImage(this.x, this.y, 4, 3, Math.round(this.stateTicks / 4 * speed) % 2 == 1 ? this.img1 : this.img2);
    if (this.state == Invader.states.exploding) drawImage(this.x, this.y, 4, 3, imgExplosionSmall);
  }

  update(speed, dirX) {
    this.stateTicks++;
    if (this.state == Invader.states.normal) this.x += speed * dirX;
    if (this.state == Invader.states.exploding && this.stateTicks >= 6) this.changeState(Invader.states.pendingRemoval);
  }
}

export class Ufo {
  static states = { normal: 0, exploding: 1, pendingRemoval: 2 };
  static y = 8;
  static width = 7;
  static height = 3;
  static speed = 0.35; // pixels per tick
  static points = 5;

  constructor() {
    this.changeState(Ufo.states.normal);
    if (Math.random() < 0.5) {
      this.x = -Ufo.width;
      this.dirX = 1;
    }
    else {
      this.x = GFX_W;
      this.dirX = -1;
    }
  }

  changeState(newState) {
    this.state = newState;
    this.stateTicks = 0;
  }

  draw() {
    if (this.state == Ufo.states.normal) drawImage(this.x, Ufo.y, 7, 3, imgUfo);
    if (this.state == Ufo.states.exploding) drawImage(this.x + 1, Ufo.y, 5, 3, imgExplosionLarge);
  }

  update() {
    this.stateTicks++;
    if (this.state == Ufo.states.normal) this.x += Ufo.speed * this.dirX;
    if (this.state == Ufo.states.exploding && this.stateTicks >= 15) this.changeState(Ufo.states.pendingRemoval);
    if (this.x < -Ufo.width || this.x > GFX_W) this.changeState(Ufo.states.pendingRemoval);
  }
}

export class EnemyManager {
  static minBoltDelay = 45; // minimum ticks between bolts
  static maxBoltDelay = 90; // maximum ticks between bolts
  static minUfoDelay = 600; // minimum ticks between ufos
  static maxUfoDelay = 900; // maximum ticks between ufos

  constructor(audioManager) {
    this.audioManager = audioManager;
    this.invadersSpeed = 0.15; // pixels per tick (increases as the total number of invaders reduces)
    this.invadersDirX = 1; // flips between -1 (moving left) and +1 (moving right)
    this.invaders = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        this.invaders.push(new Invader(1 + i * 5, 12 + j * 5, j < 1 ? 0 : j < 3 ? 1 : 2));
      }
    }
    this.ufos = [];
    this.boltCountdownTimer = EnemyManager.maxBoltDelay;
    this.ufoCountdownTimer = EnemyManager.maxUfoDelay;
  }

  draw() {
    for (const invader of this.invaders) invader.draw(this.invadersSpeed);
    for (const ufo of this.ufos) ufo.draw();
  }

  getInvaders() {
    return this.invaders;
  }

  getUfos() {
    return this.ufos;
  }

  update() {
    let returnValue; // bolt spawn {x, y} location (no bolt spawned if left undefined)

    const ac = this.invaders.length;
    this.invadersSpeed = ac <= 1 ? 0.8 : ac <= 2 ? 0.65 : ac <= 3 ? 0.5 : ac <= 5 ? 0.4 : ac <= 10 ? 0.3 : ac <= 20 ? 0.25 : ac <= 30 ? 0.2 : ac <= 40 ? 0.15 : 0.1;

    this.audioManager.invadersSlowestPause();
    this.audioManager.invadersSlowPause();
    this.audioManager.invadersFastPause();
    this.audioManager.invadersFastestPause();
    (ac <= 1) ? this.audioManager.invadersFastestPlay() : (ac <= 5) ? this.audioManager.invadersFastPlay() : (ac <= 30) ? this.audioManager.invadersSlowPlay() : this.audioManager.invadersSlowestPlay();

    for (const invader of this.invaders) {
      if (Math.floor(invader.x) < 0 || Math.floor(invader.x) > GFX_W - Invader.width) {
        this.invadersDirX *= -1;
        for (const a of this.invaders) a.y++;
        break;
      }
    }
    for (const invader of this.invaders) invader.update(this.invadersSpeed, this.invadersDirX);
    this.invaders = this.invaders.filter((invader) => invader.state != Invader.states.pendingRemoval);

    for (const ufo of this.ufos) ufo.update();
    this.ufos = this.ufos.filter((ufo) => ufo.state != Ufo.states.pendingRemoval);

    this.boltCountdownTimer--;
    if (this.boltCountdownTimer <= 0 && this.invaders.length > 0) {
      this.boltCountdownTimer = randomInt(EnemyManager.minBoltDelay, EnemyManager.maxBoltDelay);
      const invader = this.invaders[Math.floor(Math.random() * this.invaders.length)]
      returnValue = { x: invader.x + 1, y: invader.y + 2 };
    }

    this.ufoCountdownTimer--;
    if (this.ufoCountdownTimer <= 0 && this.ufos.length == 0) {
      this.ufoCountdownTimer = randomInt(EnemyManager.minUfoDelay, EnemyManager.maxUfoDelay);
      this.ufos.push(new Ufo());
    }

    if (this.ufos.length > 0) this.audioManager.ufoPlay();
    else this.audioManager.ufoPause();

    return returnValue;
  }
}
