import '../../../lib/fc64.js';
import { AudioManager } from './audio.js';
import { Player } from './player.js';
import { Invader, Ufo, EnemyManager } from './enemy.js';
import { Bolt, Laser, ProjectileManager } from './projectile.js';
import { ShieldManager } from './shield.js';
import { readHighScore, writeHighScore } from './persistentMemory.js';
import { palette, colors, imgInvaderBlueT, imgInvaderBlueX, imgInvaderOrangeA, imgInvaderOrangeO, imgInvaderPurpleA, imgInvaderPurpleO, imgPlayer, imgUfo, imgLogo } from './assets.js';

fc64Init(romInit, romLoop, palette);

const states = { info: 0, play: 1, dead: 2, over: 3 };
const maxScore = 99999;

let audioManager;
let player;
let enemyManager;
let projectileManager;
let shieldManager;
let score;
let highScore;
let lives;
let state;
let stateTicks;

function romInit() {
  audioManager = new AudioManager();
  changeState(states.info);
}

function romLoop() {
  stateTicks++;

  if (state == states.info) {
    if (stateTicks > 60 && (isJustPressed(BTN_L) || isJustPressed(BTN_R) || isJustPressed(BTN_A))) startNewGame();
  }

  if (state == states.play) {
    // console.log(`invaders ${enemyManager.getInvaders().length} | ufos ${enemyManager.getUfos().length} | bolts ${projectileManager.getBolts().length} | lasers ${projectileManager.getLasers().length} | score ${score} | lives ${lives}`);
    handleGameplayInput();
    updateSimulation();
    if (enemyManager.getInvaders().length < 1 && enemyManager.getUfos().length < 1) startNewWave();
    audioManager.update();
  }

  if (state == states.dead) {
    if (stateTicks < 1) projectileManager.reset();
    if (stateTicks > 60) {
      player.changeState(Player.states.normal);
      changeState(lives > 0 ? states.play : states.over);
    }
    audioManager.update();
  }

  if (state == states.over) {
    if (stateTicks > 60 && (isJustPressed(BTN_L) || isJustPressed(BTN_R) || isJustPressed(BTN_A))) romInit();
  }

  draw();
}

const changeState = (newState) => {
  state = newState;
  stateTicks = 0;
}

function startNewGame() {
  score = 0;
  highScore = readHighScore(0, maxScore);
  lives = 3;
  startNewWave();
}

function startNewWave() {
  player = new Player();
  enemyManager = new EnemyManager(audioManager);
  projectileManager = new ProjectileManager(audioManager);
  shieldManager = new ShieldManager();
  changeState(states.play);
}

function handleGameplayInput() {
  if (isPressed(BTN_L)) player.tryMoveLeft();
  if (isPressed(BTN_R)) player.tryMoveRight();
  if (isJustPressed(BTN_A)) projectileManager.addLaser(player.tryFireLaser());
  // if (isJustPressed(BTN_B)) enemyManager.getUfos().push(new Ufo());
  // if (isJustPressed(BTN_D)) for (const invader of enemyManager.getInvaders()) invader.y++;
  // if (isJustPressed(BTN_U)) lives++;
}

function updateSimulation() {
  player.update();
  const boltSpawnLocation = enemyManager.update();
  projectileManager.addBolt(boltSpawnLocation);
  projectileManager.update();
  handleCollisions();
}

function handleCollisions() {
  handleCollisionsLasersAndUfos();
  handleCollisionsLasersAndInvaders();
  handleCollisionsLasersAndShields();
  handleCollisionsBoltsAndPlayer();
  handleCollisionsBoltsAndShields();
  handleCollisionsInvadersAndShields();
  handleCollisionsInvadersAndPlayer();
  handleCollisionsInvadersAndGround();
}

function handleCollisionsLasersAndUfos() {
  for (const laser of projectileManager.getLasers()) {
    for (const ufo of enemyManager.getUfos()) {
      if (ufo.state == Ufo.states.normal) {
        const laserRect = new Rect(laser.x, laser.y, 1, Laser.height);
        const ufoRect = new Rect(ufo.x, Ufo.y, Ufo.width, Ufo.height);
        if (laserRect.overlaps(ufoRect)) {
          laser.pendingRemoval = true;
          ufo.changeState(Ufo.states.exploding);
          increaseScore(Ufo.points);
        }
      }
    }
  }
}

function handleCollisionsLasersAndInvaders() {
  for (const laser of projectileManager.getLasers()) {
    for (const invader of enemyManager.getInvaders()) {
      if (invader.state == Invader.states.normal) {
        const laserRect = new Rect(laser.x, laser.y, 1, Laser.height);
        const invaderRect = new Rect(invader.x, invader.y, Invader.width, Invader.height);
        if (laserRect.overlaps(invaderRect)) {
          laser.pendingRemoval = true;
          invader.changeState(Invader.states.exploding);
          increaseScore(invader.points);
          audioManager.explosionInvader();          
        }
      }
    }
  }
}

function handleCollisionsLasersAndShields() {
  for (const laser of projectileManager.getLasers()) {
    const x = Math.floor(laser.x);
    const y = Math.floor(laser.y);
    if (shieldManager.isShielded(x, y)) {
      laser.pendingRemoval = true;
      shieldManager.tunnelUp(x, y);
    }
  }
}

function handleCollisionsBoltsAndPlayer() {
  for (const bolt of projectileManager.getBolts()) {
    const boltRect = new Rect(bolt.x, bolt.y, 1, Bolt.height);
    const playerRect = new Rect(player.x, Player.y, Player.width, Player.height);
    if (boltRect.overlaps(playerRect)) {
      bolt.pendingRemoval = true;
      player.changeState(Player.states.exploding);
      lives--;
      changeState(states.dead);
      audioManager.explosionPlayer();
    }
  }
}

function handleCollisionsBoltsAndShields() {
  for (const bolt of projectileManager.getBolts()) {
    const x = Math.floor(bolt.x);
    const y = Math.floor(bolt.y + Bolt.height);
    if (shieldManager.isShielded(x, y)) {
      bolt.pendingRemoval = true;
      shieldManager.explodeOut(x, y);
    }
  }
}

function handleCollisionsInvadersAndShields() {
  for (const invader of enemyManager.getInvaders()) {
    for (let x = invader.x; x < invader.x + Invader.width; x++) {
      for (let y = invader.y; y < invader.y + Invader.height; y++) {
        shieldManager.destroy(Math.floor(x), Math.floor(y));
      }
    }
  }
}

function handleCollisionsInvadersAndPlayer() {
  for (const invader of enemyManager.getInvaders()) {
    const invaderRect = new Rect(invader.x, invader.y, Invader.width, Invader.height);
    const playerRect = new Rect(player.x, Player.y, Player.width, Player.height);
    if (invaderRect.overlaps(playerRect)) changeState(states.over);
  }
}

function handleCollisionsInvadersAndGround() {
  for (const invader of enemyManager.getInvaders()) {
    if (invader.y > 55) changeState(states.over);
  }
}

function increaseScore(points) {
  score += points;
  if (score > maxScore) score = maxScore;
  highScore = Math.max(score, highScore);
  writeHighScore(highScore);
}

function draw() {
  clearGfx();

  if (state == states.info) {
    drawImage(1, 1, 62, 27, imgLogo);
    drawImage(5, 38, 7, 3, imgUfo);
    const animationFlipFlop = stateTicks % 60 > 30;
    drawImage(8, 45, 4, 3, animationFlipFlop ? imgInvaderOrangeO : imgInvaderOrangeA);
    drawImage(39, 38, 4, 3, animationFlipFlop ? imgInvaderBlueT : imgInvaderBlueX);
    drawImage(39, 45, 4, 3, animationFlipFlop ? imgInvaderPurpleA : imgInvaderPurpleO);
    drawText(13, 37, ': PT', colors.white);
    drawText(13, 44, ': PT', colors.white);
    drawText(44, 37, ': PT', colors.white);
    drawText(44, 44, ': PT', colors.white);
    drawText(17, 37, '5', colors.yellow);
    drawText(17, 44, '3', colors.yellow);
    drawText(48, 37, '2', colors.yellow);
    drawText(48, 44, '1', colors.yellow);
    drawText(1, 58, 'L/R:MOVE', colors.white);
    drawText(40, 58, 'A:FIRE', colors.white);
  }

  if (state == states.play || state == states.dead) {
    enemyManager.draw();
    projectileManager.draw();
    player.draw();
    shieldManager.draw();
    drawRectangle(0, 0, GFX_W, 7, colors.black, colors.black);
    drawRectangle(0, 59, GFX_W, 5, colors.black, colors.black);
    drawText(1, 1, `S:${score.toString().padStart(5, '0')}`, colors.white);
    drawText(36, 1, `H:${highScore.toString().padStart(5, '0')}`, colors.white);
    for (let i = 0; i < lives; i++) drawImage(1 + i * 6, 60, 5, 3, imgPlayer);
  }

  if (state == states.over) {
    enemyManager.draw();
    shieldManager.draw();
    drawText(1, 1, `S:${score.toString().padStart(5, '0')}`, colors.white);
    drawText(36, 1, `H:${highScore.toString().padStart(5, '0')}`, colors.white);
    const bgColor = stateTicks % 60 > 30 ? colors.white : colors.red;
    const textColor = stateTicks % 60 > 30 ? colors.red : colors.white;
    drawRectangle(20, 22, 23, 19, textColor, bgColor);
    drawText(24, 26, 'GAME', textColor);
    drawText(24, 32, 'OVER', textColor);
  }
}
