// world units to pixels ratio: 1wu = 16px
// coordinate system (world and screen): origin (0,0) in top left corner

import '../../../lib/fc64.js';
import { levelData, playerAnimations, tileImages } from './data.js';
import { colors, directions } from './enums.js';

fc64Init(romInit, romLoop, [0x181818, 0x5ABDFF, 0xBD8CFF, 0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00]);

class Level {
  constructor(ref) {
    const tilemap = levelData.get(ref).tilemap;
    this.width = tilemap[0].length;
    this.height = tilemap.length;
    this.tiles = [];
    const tm = [...tilemap]; // clone the tilemap
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) this.tiles.push(new Tile(i, j, tm[j][i]));
    }
    this.exits = [];
    for (let exit of levelData.get(ref).exits) {
      this.exits.push(new Exit(exit.x, exit.y, exit.target));
    }
  }
  getExit(x, y) {
    for (const exit of this.exits) {
      if (x == exit.x && y == exit.y) return exit;
    }
    return null;
  }
  getTile(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null;
    return this.tiles[y * this.width + x];
  }
  getTiles(minX, minY, maxX, maxY) {
    const tileSubset = [];
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        if (i >= minX && i <= maxX && j >= minY && j <= maxY) tileSubset.push(this.tiles[j * this.width + i]);
      }
    }
    return tileSubset;
  }
}

class Player {
  static states = { idle: 0, walk: 1 };
  static speed = 0.0625; // 1px per tick (in world units 1/16*1=0.0625wu)
  constructor(x, y, facingDir) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.state = Player.states.idle;
    this.facingDir = facingDir;
    this.movingDir = directions.none;
    this.animationTicks = 0;
    this.resetAnimationTicks = 1; // affords a short grace period before resetting on idle
  }
  lookAt(x, y) {
    if (y < this.y) this.facingDir = directions.up;
    if (y > this.y) this.facingDir = directions.down;
    if (x < this.x) this.facingDir = directions.left;
    if (x > this.x) this.facingDir = directions.right;
  }
  moveTo(x, y) {
    this.targetX = x;
    this.targetY = y;
    if (y < this.y) this.movingDir = directions.up;
    if (y > this.y) this.movingDir = directions.down;
    if (x < this.x) this.movingDir = directions.left;
    if (x > this.x) this.movingDir = directions.right;
    this.state = Player.states.walk;
  }
  update() {
    if (this.state == Player.states.walk) {
      this.animationTicks++;
      this.resetAnimationTicks = 0;
      let completedMove = false;
      if (this.movingDir == directions.up) {
        this.y -= Player.speed;
        if (this.y <= this.targetY) completedMove = true;
      }
      if (this.movingDir == directions.down) {
        this.y += Player.speed;
        if (this.y >= this.targetY) completedMove = true;
      }
      if (this.movingDir == directions.left) {
        this.x -= Player.speed;
        if (this.x <= this.targetX) completedMove = true;
      }
      if (this.movingDir == directions.right) {
        this.x += Player.speed;
        if (this.x >= this.targetX) completedMove = true;
      }
      if (completedMove) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.movingDir = directions.none;
        this.state = Player.states.idle;
        const exit = level.getExit(this.x, this.y);
        if (exit != null) transitionManager.triggerTransition(exit.target);
      }
    }
    if (this.state == Player.states.idle) {
      this.resetAnimationTicks++;
      if (this.resetAnimationTicks > 1) this.animationTicks = 0;
    }
  }
}

class Tile {
  static blockedList = [1,1,1,1,0,1,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,1,0,1,1,1,1,1,0,1,0,0,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1]; // blocked value for each tile in sequential order
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.blocked = Tile.blockedList[id - 1];
  }
}

class Exit {
  constructor(x, y, target) {
    this.x = x;
    this.y = y;
    this.target = target;
  }
}

class TransitionManager {
  static states = { none: 0, fadingOut: 1, faded: 2, fadingIn: 3 };
  static fadingOutTicks = 12;
  static fadedTicks = 6;
  static fadingInTicks = 12;
  constructor() {
    this.state = TransitionManager.states.none;
    this.remainingTicks = 0;
    this.target = {};
  }
  triggerTransition(target) {
    this.target = target;
    this.state = TransitionManager.states.fadingOut;
    this.remainingTicks = TransitionManager.fadingInTicks + TransitionManager.fadedTicks + TransitionManager.fadingOutTicks;
  }
  update() {
    if (this.remainingTicks == TransitionManager.fadingInTicks + TransitionManager.fadedTicks) {
      this.state = TransitionManager.states.faded;
      level = new Level(this.target.ref);
      player.x = this.target.x;
      player.y = this.target.y;
      player.facingDir = this.target.facingDir;
      this.target = {};
    }
    if (this.remainingTicks == TransitionManager.fadingInTicks) this.state = TransitionManager.states.fadingIn;
    if (this.remainingTicks == 0) this.state = TransitionManager.states.none;
    if (this.remainingTicks > 0) this.remainingTicks--;
  }
  applyGraphicsEffect() {
    if (transitionManager.state == TransitionManager.states.none) return;
    let fadeLevel = 0;
    if (transitionManager.state == TransitionManager.states.fadingOut) fadeLevel = transitionManager.remainingTicks >= TransitionManager.fadingInTicks + TransitionManager.fadedTicks + TransitionManager.fadingOutTicks / 2 ? 1 : 2;
    if (transitionManager.state == TransitionManager.states.faded) fadeLevel = 3;
    if (transitionManager.state == TransitionManager.states.fadingIn) fadeLevel = transitionManager.remainingTicks >= TransitionManager.fadingInTicks / 2 ? 2 : 1;
    if (fadeLevel > 0 && fadeLevel < 3) {
      for (let i = ADDRESS_GFX; i < ADDRESS_GFX + GFX_W * GFX_H; i++) {
        let val = peek(i);
        if (val < 4) val -= fadeLevel;
        if (val < 0) val = 0;
        poke(i, val);
      }
    }
    if (fadeLevel == 3) clearGfx();
  }
}

let transitionManager, level, player, debug;

function romInit() {
  transitionManager = new TransitionManager();
  level = new Level('Home2');
  player = new Player(3, 6, directions.up);
}

function romLoop() {
  handleInput();
  player.update();
  transitionManager.update();
  draw();
}

function handleInput() {
  if (transitionManager.state == TransitionManager.states.none) {
    if (isPressed(BTN_U)) tryMovePlayer(directions.up);
    if (isPressed(BTN_D)) tryMovePlayer(directions.down);
    if (isPressed(BTN_L)) tryMovePlayer(directions.left);
    if (isPressed(BTN_R)) tryMovePlayer(directions.right);
    if (isJustPressed(BTN_A) || isJustPressed(BTN_B)) debug = !debug;
  }
}

function tryMovePlayer(dir) {
  if (player.state == Player.states.idle) {
    let targetX = player.x;
    let targetY = player.y;
    if (dir == directions.up) targetY -= 1;
    if (dir == directions.down) targetY += 1;
    if (dir == directions.left) targetX -= 1;
    if (dir == directions.right) targetX += 1;
    player.lookAt(targetX, targetY);
    const targetExit = level.getExit(targetX, targetY);
    const targetTile = level.getTile(targetX, targetY);
    if (targetExit != null || (targetTile != null && !targetTile.blocked)) player.moveTo(targetX, targetY);
  }
}

export function draw() {
  const viewport = getViewport();
  // tilemap
  for (const tile of level.getTiles(Math.floor(viewport.x), Math.floor(viewport.y), Math.floor(viewport.x + viewport.width - 1), Math.floor(viewport.y + viewport.height - 1))) { // only draw tiles that can be on screen
    drawImage((tile.x - viewport.x) * 16, (tile.y - viewport.y) * 16, 16, 16, tileImages.get(tile.id));
    if (debug && tile.blocked) drawRectangle((tile.x - viewport.x) * 16, (tile.y - viewport.y) * 16, 16, 16, colors.red);
  }
  // exits
  for (const exit of level.exits) { // the number of exits will always be quite small, just get them all
    if (debug) drawRectangle((exit.x - viewport.x) * 16, (exit.y - viewport.y) * 16, 16, 16, colors.green);
  }
  // player
  if (debug) drawRectangle(Math.round((player.x - viewport.x) * 16), Math.round((player.y - viewport.y) * 16), 16, 16, colors.yellow, colors.yellow);
  drawImage(Math.round((player.x - viewport.x) * 16), Math.round((player.y - viewport.y) * 16) - 4, 16, 16, playerAnimations.get(player.facingDir).getKeyFrame(player.animationTicks));
  if (debug) {
    drawRectangle(Math.round((player.x - viewport.x) * 16) + 1, Math.round((player.y - viewport.y) * 16) - 4, 14, 16, colors.blue);
    const facingDirText = player.facingDir == directions.up ? 'U' : player.facingDir == directions.down ? 'D' : player.facingDir == directions.left ? 'L' : player.facingDir == directions.right ? 'R' : '';
    drawText(Math.round((player.x - viewport.x) * 16) + 3, Math.round((player.y - viewport.y) * 16) - 2, facingDirText, colors.blue);
  }
  // transition effect
  transitionManager.applyGraphicsEffect();
}

function getViewport() {
  return {
    x: clamp(player.x + 0.5 - (GFX_W / 16 / 2), 0, level.width + 1 - GFX_W / 16 - 1),
    y: clamp(player.y + 0.5 - (GFX_H / 16 / 2), 0, level.height + 1 - GFX_H / 16 - 1),
    width: GFX_W / 16 + 1,
    height: GFX_H / 16 + 1,
  };
}
