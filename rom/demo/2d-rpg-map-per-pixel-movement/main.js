// world units to pixels ratio: 1wu = 16px
// coordinate system (world and screen): origin (0,0) in top left corner

import '../../../lib/fc64.js';
import { levelData, playerAnimations, tileImages } from './data.js';
import { colors, directions } from './enums.js';

fc64Init(romInit, romLoop, [0x000000, 0x606060, 0xA8A8A8, 0xF8F8F8, 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00]);

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
  constructor(x, y) {
    this.x = x; // x position reference for internal use, for external collision detection and drawing purposes use the bounding rects
    this.y = y; // y position reference for internal use, for external collision detection and drawing purposes use the bounding rects
    this.state = Player.states.idle;
    this.stateTicks = 0;
    this.facingDir = directions.down;
    this.collisionBounds = new Rect(0, 0, 0.625, 0.5); // 10px wide 8px high (in world units 1/16*10=0.625wu wide 1/16*8=0.5wu high), real position set by updateBounds()
    this.drawBounds = new Rect(0, 0, 1, 1); // 16px wide 16px high (in world units 1/16*16=1wu wide 1/16*16=1wu high), real position set by updateBounds()
    this.velocityX = 0;
    this.velocityY = 0;
  }
  setState(newState) {
    if (this.state != newState) {
      this.state = newState;
      this.stateTicks = 0;
    }
  }
  updateBounds() {
    this.collisionBounds.x = this.x + 0.1875; // collision bounds offset 3px (or 0.1875wu) right
    this.collisionBounds.y = this.y + 0.5; // collision bounds offset 8px (or 0.5wu) down
    this.drawBounds.x = this.x;
    this.drawBounds.y = this.y;
  }
}

class Tile {
  static collisionMasks = [1, 1, 1, 1, 1, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 2]; // collision mask for each tile in sequential order
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.drawBounds = new Rect(x, y, 1, 1); // 16px wide 16px high (in world units 1/16*16=1wu wide 1/16*16=1wu high)
    const collisionMask = Tile.collisionMasks[id - 1];
    if (collisionMask == 0) this.collisionBounds = new Rect(-1, -1, 0, 0); // walkable
    if (collisionMask == 1) this.collisionBounds = new Rect(x, y, 1, 1); // solid
    if (collisionMask == 2) this.collisionBounds = new Rect(x, y, 1, 0.5); // top half solid bottom half walkable
    if (collisionMask == 3) this.collisionBounds = new Rect(x, y, 0.5, 1); // left half solid right half walkable
    if (collisionMask == 4) this.collisionBounds = new Rect(x + 0.5, y, 0.5, 1); // left half walkable right half solid
  }
}

class Exit {
  constructor(x, y, target) {
    this.bounds = new Rect(x - 0.25, y - 0.25, 0.5, 0.5); // 8px wide 8px high (in world units 1/16*8=0.5wu wide 1/16*8=0.5wu high)
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
      updatePlayer();
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
  level = new Level('Inside');
  player = new Player(2, 2.5);
}

function romLoop() {
  if (transitionManager.state == TransitionManager.states.none) {
    updatePlayer();
    if (isJustPressed(BTN_A) || isJustPressed(BTN_B)) debug = !debug;
  }
  transitionManager.update();
  draw();
}

function updatePlayer() {
  player.stateTicks++;

  // temporarily set velocity to zero on both axes (without changing player.state)...
  player.velocityX = 0;
  player.velocityY = 0;
  // ...then set velocity (and facingDir/state) based on current input...
  if (isPressed(BTN_U)) {
    player.velocityY = -Player.speed;
    player.facingDir = directions.up;
    player.setState(Player.states.walk);
  }
  if (isPressed(BTN_D)) {
    player.velocityY = Player.speed;
    player.facingDir = directions.down;
    player.setState(Player.states.walk);
  }
  if (isPressed(BTN_L)) {
    player.velocityX = -Player.speed;
    player.facingDir = directions.left;
    player.setState(Player.states.walk);
  }
  if (isPressed(BTN_R)) {
    player.velocityX = Player.speed;
    player.facingDir = directions.right;
    player.setState(Player.states.walk);
  }
  // ...if player velocity is still zero on both axes and state is not already idle - set state to idle
  if (player.velocityX == 0 && player.velocityY == 0) player.setState(Player.states.idle);

  let minX, minY, maxX, maxY;
  // perform collision detection and response on each axis separately - if moving right check tiles to the right of bounding box edge, else to the left
  if (player.velocityX > 0) minX = maxX = Math.floor(player.collisionBounds.x + player.collisionBounds.width + player.velocityX);
  else minX = maxX = Math.floor(player.collisionBounds.x + player.velocityX);
  minY = Math.floor(player.collisionBounds.y);
  maxY = Math.floor(player.collisionBounds.y + player.collisionBounds.height);
  player.collisionBounds.x += player.velocityX;
  for (const tile of level.getTiles(minX, minY, maxX, maxY)) {
    if (player.collisionBounds.overlaps(tile.collisionBounds)) {
      if (player.velocityX > 0) player.collisionBounds.x = tile.collisionBounds.x - player.collisionBounds.width;
      else player.collisionBounds.x = tile.collisionBounds.x + tile.collisionBounds.width;
      player.velocityX = 0;
      break;
    }
  }
  // perform collision detection and response on each axis separately - if moving up check tiles to the top of bounding box edge, else to the bottom
  if (player.velocityY < 0) minY = maxY = Math.floor(player.collisionBounds.y + player.velocityY);
  else minY = maxY = Math.floor(player.collisionBounds.y + player.collisionBounds.height + player.velocityY);
  minX = Math.floor(player.collisionBounds.x);
  maxX = Math.floor(player.collisionBounds.x + player.collisionBounds.width);
  player.collisionBounds.y += player.velocityY;
  for (const tile of level.getTiles(minX, minY, maxX, maxY)) {
    if (player.collisionBounds.overlaps(tile.collisionBounds)) {
      if (player.velocityY < 0) player.collisionBounds.y = tile.collisionBounds.y + tile.collisionBounds.height;
      else player.collisionBounds.y = tile.collisionBounds.y - player.collisionBounds.height;
      player.velocityY = 0;
      break;
    }
  }

  // set the latest position
  player.x += player.velocityX;
  player.y += player.velocityY;
  player.updateBounds();

  for (const exit of level.exits) {
    if (player.collisionBounds.overlaps(exit.bounds)) transitionManager.triggerTransition(exit.target);
  }
}

export function draw() {
  const viewport = getViewport();
  // tilemap
  for (const tile of level.getTiles(Math.floor(viewport.x), Math.floor(viewport.y), Math.floor(viewport.x + viewport.width - 1), Math.floor(viewport.y + viewport.height - 1))) { // only draw tiles that can be on screen
    drawImage((tile.drawBounds.x - viewport.x) * 16, (tile.drawBounds.y - viewport.y) * 16, tile.drawBounds.width * 16, tile.drawBounds.height * 16, tileImages.get(tile.id));
    if (debug) drawRectangle((tile.collisionBounds.x - viewport.x) * 16, (tile.collisionBounds.y - viewport.y) * 16, tile.collisionBounds.width * 16, tile.collisionBounds.height * 16, colors.red);
  }
  // exits
  for (const exit of level.exits) { // the number of exits will always be quite small, just get them all
    if (debug) drawRectangle((exit.bounds.x - viewport.x) * 16, (exit.bounds.y - viewport.y) * 16, exit.bounds.width * 16, exit.bounds.height * 16, colors.blue);
  }
  // player
  if (debug) drawRectangle((player.drawBounds.x - viewport.x) * 16, (player.drawBounds.y - viewport.y) * 16, 16, 16, colors.green);
  drawImage((player.drawBounds.x - viewport.x) * 16, (player.drawBounds.y - viewport.y) * 16, 16, 16, playerAnimations.get(player.facingDir).getKeyFrame(player.state == Player.states.idle ? 0 : player.stateTicks));
  if (debug) {
    drawRectangle((player.collisionBounds.x - viewport.x) * 16, (player.collisionBounds.y - viewport.y) * 16, player.collisionBounds.width * 16, player.collisionBounds.height * 16, player.state == Player.states.idle ? colors.blue : colors.yellow);
    const facingDirText = player.facingDir == directions.up ? 'U' : player.facingDir == directions.down ? 'D' : player.facingDir == directions.left ? 'L' : player.facingDir == directions.right ? 'R' : '';
    drawText((player.x - viewport.x) * 16 + 3, (player.y - viewport.y) * 16 + 2, facingDirText, colors.blue);
  }
  // transition effect
  transitionManager.applyGraphicsEffect();
}

function getViewport() {
  return {
    x: clamp(player.drawBounds.x + 0.5 - (GFX_W / 16 / 2), 0, level.width + 1 - GFX_W / 16 - 1),
    y: clamp(player.drawBounds.y + 0.5 - (GFX_H / 16 / 2), 0, level.height + 1 - GFX_H / 16 - 1),
    width: GFX_W / 16 + 1,
    height: GFX_H / 16 + 1,
  };
}
