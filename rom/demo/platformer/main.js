// inspired by https://github.com/libgdx/libgdx/blob/master/tests/gdx-tests/src/com/badlogic/gdx/tests/superkoalio/SuperKoalio.java

// world units to pixels ratio: 1 world unit = 8px
// player size: 6px wide 7px high (in world units 1/8*6=0.75 wide 1/8*7=0.875 high)
// tile size: 8px wide 8px high (in world units 1/8*8=1 wide 1/8*8=1 high)
// world coordinate system: origin (0,0) in bottom left corner
// screen coordinate system: origin (0,0) in top left corner

class Anim {
  constructor(frames, frameTicks, looping) {
    this.frames = frames;
    this.frameTicks = frameTicks;
    this.looping = looping;
  }
  getKeyFrame(stateTicks) {
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
}

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  overlaps(rect) {
    return this.x < rect.x + rect.width && this.x + this.width > rect.x && this.y < rect.y + rect.height && this.y + this.height > rect.y;
  }
}

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  set(x, y) {
    this.x = x;
    this.y = y;
  }
  add(x, y) {
    this.x += x;
    this.y += y;
  }
  scl(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }
}

class Level {
  constructor({ width, height, tilemap }) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    const tm = [...tilemap]; // clone the initial tilemap
    tm.reverse(); // flip vertically (for convenience we draw the tilemap from left to right and top to bottom, but the game world's coordinate system has the origin in the bottom left corner)
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        if (tm[j][i] == 1) {
          this.tiles.push(new Tile(i, j));
        }  
      }
    }
  }
  getTiles(minX, minY, maxX, maxY) {
    const tileSubset = [];
    for (const tile of this.tiles) {
      if (tile.bounds.x >= minX && tile.bounds.x <= maxX && tile.bounds.y >= minY && tile.bounds.y <= maxY) {
        tileSubset.push(tile);
      }
    } 
    return tileSubset;
  }
}

class Player {
  constructor(x, y) {
    this.maxVelocity = 8;
    this.jumpVelocity = 20;
    this.damping = 0.92;
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.state = playerState.walk;
    this.stateTicks = 0;
    this.facingRight = true;
    this.grounded = false;
    this.bounds = new Rectangle(this.position.x, this.position.y, 0.75, 0.875); // player size: 6px wide 7px high (in world units 1/8*6=0.75 wide 1/8*7=0.875 high)
  }
  changeState(newState) {
    this.state = newState;
    this.stateTicks = 0;
  }
  updateBounds() {
    this.bounds.x = this.position.x;
    this.bounds.y = this.position.y;
  }
}

class Tile {
  constructor(x, y) {
    this.bounds = new Rectangle(x, y, 1, 1); // tile size: 8px wide 8px high (in world units 1/8*8=1 wide 1/8*8=1 high)
  }
}

const gravity = -1.25;

const playerState = { idle: 'playerIdle', walk: 'playerWalk', jump: 'playerJump' };

const playerAnims = new Map([
  [playerState.idle, new Anim([imgPlayerStand], 0, false)],
  [playerState.walk, new Anim([imgPlayerStand, imgPlayerStep], 8, true)],
  [playerState.jump, new Anim([imgPlayerJump], 0, false)],
]);

let level;
let player;
let debug;

function romInit() {
  startLevel(1, 6, 13);
}

function romLoop() {
  clearGfx();
  updatePlayer();
  if (debug) {
    drawDebug();
  } else {
    draw();
  }
}

function startLevel(id, x, y) {
  level = new Level(initialLevelsData.get(id));
  player = new Player(x, y);
}

function updatePlayer() {
  player.stateTicks++;

  // check input and apply to velocity and state
  if ((isPressed(BTN_U) || isPressed(BTN_A)) && player.grounded) {
    player.velocity.y += player.jumpVelocity;
    player.changeState(playerState.jump);
    player.grounded = false;
  }
  if (isPressed(BTN_L)) {
    player.velocity.x = -player.maxVelocity;
    if (player.grounded && player.state != playerState.walk) {
      player.changeState(playerState.walk);
    }
    player.facingRight = false;
  }
  if (isPressed(BTN_R)) {
    player.velocity.x = player.maxVelocity;
    if (player.grounded && player.state != playerState.walk) {
      player.changeState(playerState.walk);
    }
    player.facingRight = true;
  }
  if (isJustPressed(BTN_B)) {
    debug = !debug;
  }

  // apply gravity
  player.velocity.add(0, gravity);

  // clamp x-axis velocity to max
  player.velocity.x = clamp(player.velocity.x, -player.maxVelocity, player.maxVelocity);

  // change state from jump immediately on grounding
  if (player.grounded && player.state == playerState.jump) {
    player.changeState(playerState.walk);
  }

  // stand still if x-axis velocity < 1
  if (Math.abs(player.velocity.x) < 1) {
    player.velocity.x = 0;
    if (player.grounded && player.state != playerState.idle) {
      player.changeState(playerState.idle);
    }
  }

  // multiply by target ticks per second so we know how far to move this tick
  player.velocity.scl(1/60);

  // perform collision detection and response on each axis separately
  player.updateBounds();

  let minX;
  let minY;
  let maxX;
  let maxY;

  // if moving right check tiles to the right of bounding box edge, else to the left
  if (player.velocity.x > 0) {
    minX = maxX = Math.floor(player.position.x + player.bounds.width + player.velocity.x);
  } else {
    minX = maxX = Math.floor(player.position.x + player.velocity.x);
  }
  minY = Math.floor(player.position.y);
  maxY = Math.floor(player.position.y + player.bounds.height);

  player.bounds.x += player.velocity.x;
  for (const tile of level.getTiles(minX, minY, maxX, maxY)) {
    if (player.bounds.overlaps(tile.bounds)) {
      if (player.velocity.x > 0) {
        player.position.x = tile.bounds.x - player.bounds.width;
      } else {
        player.position.x = tile.bounds.x + tile.bounds.width;
      }
      player.velocity.x = 0;
      break;
    }
  }
  player.bounds.x = player.position.x;

  // if moving up check tiles to the top of bounding box edge, else to the bottom
  if (player.velocity.y > 0) {
    minY = maxY = Math.floor(player.position.y + player.bounds.height + player.velocity.y);
  } else {
    minY = maxY = Math.floor(player.position.y + player.velocity.y);
  }
  minX = Math.floor(player.position.x);
  maxX = Math.floor(player.position.x + player.bounds.width);

  player.bounds.y += player.velocity.y;
  for (const tile of level.getTiles(minX, minY, maxX, maxY)) {
    if (player.bounds.overlaps(tile.bounds)) {
      // reset y-position to just below/above the collision tile to avoid bouncing
      if (player.velocity.y > 0) {
        player.position.y = tile.bounds.y - player.bounds.height;
      } else {
        player.position.y = tile.bounds.y + tile.bounds.height;
        player.grounded = true;
      }
      player.velocity.y = 0;
      break;
    }
  }

  // set the latest position then undo earlier velocity scaling
	player.position.add(player.velocity.x, player.velocity.y);
  player.velocity.scl(60);

  // apply x-axis damping (don't walk forever following a l/r key press)
  player.velocity.x *= player.damping;

  // can't be grounded if falling
  if (player.velocity.y < 0) {
    player.grounded = false;
  }

  player.updateBounds();
}

function draw() {
  const viewport = getViewport();
  drawImage((player.bounds.x - viewport.x) * 8, flipY((player.bounds.y - viewport.y) * 8, player.bounds.height * 8), player.bounds.width * 8, player.bounds.height * 8, playerAnims.get(player.state).getKeyFrame(player.stateTicks), {flipX: player.facingRight});
  for (const tile of level.getTiles(Math.floor(viewport.x), Math.floor(viewport.y), Math.floor(viewport.x + viewport.width - 1), Math.floor(viewport.y + viewport.height - 1))) { // only draw tiles that can be on screen
    drawImage((tile.bounds.x - viewport.x) * 8, flipY((tile.bounds.y - viewport.y) * 8, tile.bounds.height * 8), tile.bounds.width * 8, tile.bounds.height * 8, imgTile);
  }
}

function drawDebug() {
  const viewport = getViewport();
  const playerColor = player.state == playerState.idle ? COL_RED : player.state == playerState.walk ? COL_GRN : COL_BLU
  drawRectangle((player.bounds.x - viewport.x) * 8, flipY((player.bounds.y - viewport.y) * 8, 1), player.bounds.width * 8, -player.bounds.height * 8, playerColor, player.grounded ? playerColor : COL_BLK);
  for (const tile of level.getTiles(Math.floor(viewport.x), Math.floor(viewport.y), Math.floor(viewport.x + viewport.width - 1), Math.floor(viewport.y + viewport.height - 1))) { // only draw tiles that can be on screen
    drawRectangle((tile.bounds.x - viewport.x) * 8, flipY((tile.bounds.y - viewport.y) * 8, 1), tile.bounds.width * 8, -tile.bounds.height * 8, COL_YEL);
  }
}

function getViewport() {
  return {
    x: clamp(player.position.x - (GFX_W / 8 / 2), 0, level.width + 1 - GFX_W / 8 - 1),
    y: clamp(player.position.y - (GFX_H / 8 / 2), 0, level.height + 1 - GFX_H / 8 - 1),
    width: GFX_W / 8 + 1,
    height: GFX_H / 8 + 1,
  };
}

const flipY = (y, offset) => GFX_H - y - offset;
