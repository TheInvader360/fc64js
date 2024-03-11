class Player {
  constructor(x, y, facing) {
    this.x = x;
    this.y = y;
    this.facing = facing; // 0 = north | 1 = east | 2 = south | 3 = west
  }
  getFovLevelLocations() { // locations are listed in draw order 0-f from the player's perspective
    switch (this.facing) {
      case 0: return [
        // 02431
        // -576-
        // -8a9-
        // -bdc-
        // -eNf-
        {x: this.x - 2, y: this.y - 4}, {x: this.x + 2, y: this.y - 4}, {x: this.x - 1, y: this.y - 4}, {x: this.x + 1, y: this.y - 4}, {x: this.x, y: this.y - 4},
        {x: this.x - 1, y: this.y - 3}, {x: this.x + 1, y: this.y - 3}, {x: this.x, y: this.y - 3},
        {x: this.x - 1, y: this.y - 2}, {x: this.x + 1, y: this.y - 2}, {x: this.x, y: this.y - 2},
        {x: this.x - 1, y: this.y - 1}, {x: this.x + 1, y: this.y - 1}, {x: this.x, y: this.y - 1},
        {x: this.x - 1, y: this.y}, {x: this.x + 1, y: this.y},
      ];
      case 1: return [
        // ----0
        // eb852
        // Eda74
        // fc963
        // ----1
        {x: this.x + 4, y: this.y - 2}, {x: this.x + 4, y: this.y + 2}, {x: this.x + 4, y: this.y - 1}, {x: this.x + 4, y: this.y + 1}, {x: this.x + 4, y: this.y},
        {x: this.x + 3, y: this.y - 1}, {x: this.x + 3, y: this.y + 1}, {x: this.x + 3, y: this.y},
        {x: this.x + 2, y: this.y - 1}, {x: this.x + 2, y: this.y + 1}, {x: this.x + 2, y: this.y},
        {x: this.x + 1, y: this.y - 1}, {x: this.x + 1, y: this.y + 1}, {x: this.x + 1, y: this.y},
        {x: this.x, y: this.y - 1}, {x: this.x, y: this.y + 1},
      ];
      case 2: return [
        // -fSe-
        // -cdb-
        // -9a8-
        // -675-
        // 13420
        {x: this.x + 2, y: this.y + 4}, {x: this.x - 2, y: this.y + 4}, {x: this.x + 1, y: this.y + 4}, {x: this.x - 1, y: this.y + 4}, {x: this.x, y: this.y + 4},
        {x: this.x + 1, y: this.y + 3}, {x: this.x - 1, y: this.y + 3}, {x: this.x, y: this.y + 3},
        {x: this.x + 1, y: this.y + 2}, {x: this.x - 1, y: this.y + 2}, {x: this.x, y: this.y + 2},
        {x: this.x + 1, y: this.y + 1}, {x: this.x - 1, y: this.y + 1}, {x: this.x, y: this.y + 1},
        {x: this.x + 1, y: this.y}, {x: this.x - 1, y: this.y},
      ];
      case 3: return [
        // 1----
        // 369cf
        // 47adW
        // 258be
        // 0----
        {x: this.x - 4, y: this.y + 2}, {x: this.x - 4, y: this.y - 2}, {x: this.x - 4, y: this.y + 1}, {x: this.x - 4, y: this.y - 1}, {x: this.x - 4, y: this.y},
        {x: this.x - 3, y: this.y + 1}, {x: this.x - 3, y: this.y - 1}, {x: this.x - 3, y: this.y},
        {x: this.x - 2, y: this.y + 1}, {x: this.x - 2, y: this.y - 1}, {x: this.x - 2, y: this.y},
        {x: this.x - 1, y: this.y + 1}, {x: this.x - 1, y: this.y - 1}, {x: this.x - 1, y: this.y},
        {x: this.x, y: this.y + 1}, {x: this.x, y: this.y - 1},
      ];
    }
  }
  getMapMarkerPattern() {
    switch (this.facing) {
      case 0: return [ 0,-1,-1, 0, 0, 0, 1, 0,-1, 1, 1, 1]; // north
      case 1: return [-1,-1, 0,-1, 0, 0, 1, 0,-1, 1, 0, 1]; // east
      case 2: return [-1,-1, 1,-1,-1, 0, 0, 0, 1, 0, 0, 1]; // south
      case 3: return [ 0,-1, 1,-1,-1, 0, 0, 0, 0, 1, 1, 1]; // west
    }
  }
  turn(direction) { // -1 = anticlockwise | +1 = clockwise
    this.facing = wrap(this.facing + direction, 0, 4);
  }
}

const level = [
  // 0 = empty | 1 = wall
  // for best results respect the player fov depth limit of 4 tiles (maximum 5 consecutive empty tiles in any direction)
  // in order to keep the demo level map view simple (non-scrolling) the level size must be 20x15 tiles exactly
  // ensure the outer edge of the level is always fully bound by wall tiles
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,1,1,0,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,0,0,0,1,1,0,0,0,1,0,1],
  [1,0,1,0,0,0,0,0,1,1,0,1,1,0,0,0,1,1,0,1],
  [1,0,1,1,0,1,1,0,1,0,0,0,0,0,1,0,0,1,1,1],
  [1,0,0,0,0,1,0,0,1,1,1,0,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,1,0,1,1,0,1,0,0,0,0,0,1,0,0,1],
  [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,1,0,1],
  [1,1,0,1,1,1,0,1,0,0,1,1,0,1,1,0,0,0,0,1],
  [1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,1,1,0,0,0,1,1,0,1,0,0,1,1,0,0,0,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const palette = { // lookup enum for convenience
  darkBlue:   0, // 0x1f244b
  darkBrown:  1, // 0x654053
  brown:      2, // 0xa8605d
  lightBrown: 3, // 0xd1a67e
  yellow:     4, // 0xf6e79c
  lightGreen: 5, // 0xb6cf8e
  green:      6, // 0x60ae7b
  darkGreen:  7, // 0x3c6b64
};

romPalette = [0x1f244b, 0x654053, 0xa8605d, 0xd1a67e, 0xf6e79c, 0xb6cf8e, 0x60ae7b, 0x3c6b64]; // https://lospec.com/palette-list/paper-8

let player;
let firstPersonMode;

function romInit() {
  player = new Player(1, 5, 2);
  firstPersonMode = true;
  drawView();
}

function romLoop() {
  let redrawView = false;

  if (isJustPressed(BTN_U) || isJustPressed(BTN_D)) { // try to move forwards or backwards
    let targetX = player.x;
    let targetY = player.y;
    if (player.facing == 0) {
      isJustPressed(BTN_U) ? targetY-- : targetY++;
    }
    if (player.facing == 1) {
      isJustPressed(BTN_U) ? targetX++ : targetX--;
    }
    if (player.facing == 2) {
      isJustPressed(BTN_U) ? targetY++ : targetY--;
    }
    if (player.facing == 3) {
      isJustPressed(BTN_U) ? targetX-- : targetX++;
    }
    if (level[targetY][targetX] == 0) { // simple tile based collision check
      player.x = targetX;
      player.y = targetY;
    }
    redrawView = true;
  } else if (isJustPressed(BTN_L) || isJustPressed(BTN_R)) {
    player.turn(isJustPressed(BTN_L) ? -1 : 1);
    redrawView = true;
  }

  if (isJustPressed(BTN_A) || isJustPressed(BTN_B)) {
    firstPersonMode = !firstPersonMode;
    redrawView = true;
  }

  if (redrawView) {
    drawView();
  }
}

function drawView() {
  clearGfx();
  drawText(7, 1, 'DUNGEON CRAWL', palette.yellow);
  firstPersonMode ? drawFirstPersonView(12, 9) : drawLevelMapView(2, 7);
  drawText(5, 53, `LOCATION:${player.x},${player.y}`, palette.lightGreen);
  drawText(5, 59, `FACING:  ${player.facing == 0 ? 'NORTH' : player.facing == 1 ? 'EAST' : player.facing == 2 ? 'SOUTH' : 'WEST'}`, palette.lightGreen);
}

function drawFirstPersonView(x, y) {
  const wallFaceColor = player.facing == 0 || player.facing == 2 ? palette.brown : palette.darkBrown;
  const wallSideColor = player.facing == 0 || player.facing == 2 ? palette.darkBrown : palette.brown;
  drawRectangle(x, y, 41, 15, palette.darkBlue, palette.darkBlue); // sky
  drawRectangle(x, y + 15, 41, 11, wallFaceColor, wallFaceColor); // wall (constant size at fov limit and beyond)
  drawRectangle(x, y + 26, 41, 15, palette.darkGreen, palette.darkGreen); // ground
  const l = player.getFovLevelLocations();
  for (let i = 0; i < l.length; i++) {
    if (l[i].x >= 0 && l[i].x < level[0].length && l[i].y >= 0 && l[i].y < level.length && level[l[i].y][l[i].x] == 1) {
      drawWall(x, y, i, wallFaceColor, wallSideColor); // overdraw walls within the player's field of view sequentially
    }
  }
  drawRectangle(11, 8, 43, 43, palette.green); // border
}

function drawLevelMapView(x, y) {
  for (let tileY = 0; tileY < level.length; tileY++) {
    for (let tileX = 0; tileX < level[0].length; tileX++) {
      drawRectangle(x + tileX * 3, y + tileY * 3, 3, 3, level[tileY][tileX], level[tileY][tileX]); // level tile
    }
  }
  const l = player.getFovLevelLocations();
  for (let i = 0; i < l.length; i++) {
    if (l[i].x >= 0 && l[i].x < level[0].length && l[i].y >= 0 && l[i].y < level.length) {
      drawPixel(x + l[i].x * 3 + 1, y + l[i].y * 3 + 1, palette.lightBrown); // fov marker
    }
  }
  drawPattern(x + player.x * 3 + 1, y + player.y * 3 + 1, player.getMapMarkerPattern(), palette.yellow); // directional player marker
  drawRectangle(2, 7, 60, 45, palette.green); // border
}

function drawWall(x, y, drawOrderIndex, faceColor, sideColor) {
  if (drawOrderIndex == 0) {
    drawLine(x, y + 14, x, y + 26, faceColor);
  }
  if (drawOrderIndex == 1) {
    drawLine(x + 40, y + 14, x + 40, y + 26, faceColor);
  }
  if (drawOrderIndex == 2) {
    drawRectangle(x + 1, y + 14, 13, 13, faceColor, faceColor);
  }
  if (drawOrderIndex == 3) {
    drawRectangle(x + 27, y + 14, 13, 13, faceColor, faceColor);
  }
  if (drawOrderIndex == 4) {
    drawRectangle(x + 14, y + 14, 13, 13, faceColor, faceColor);
  }
  if (drawOrderIndex == 5) {
    drawRectangle(x, y + 13, 13, 15, faceColor, faceColor);
    drawLine(x + 13, y + 14, x + 13, y + 26, sideColor);
  }
  if (drawOrderIndex == 6) {
    drawRectangle(x + 28, y + 13, 13, 15, faceColor, faceColor);
    drawLine(x + 27, y + 14, x + 27, y + 26, sideColor);
  }
  if (drawOrderIndex == 7) {
    drawRectangle(x + 13, y + 13, 15, 15, faceColor, faceColor);
  }
  if (drawOrderIndex == 8) {
    drawRectangle(x, y + 10, 10, 21, faceColor, faceColor);
    drawPolygon([{ x: x + 10, y: y + 11 }, { x: x + 10, y: y + 29 }, { x: x + 11, y: y + 28 }, { x: x + 11, y: y + 12 }], sideColor);
  }
  if (drawOrderIndex == 9) {
    drawRectangle(x + 31, y + 10, 10, 21, faceColor, faceColor);
    drawPolygon([{ x: x + 30, y: y + 11 }, { x: x + 30, y: y + 29 }, { x: x + 29, y: y + 28 }, { x: x + 29, y: y + 12 }], sideColor);
  }
  if (drawOrderIndex == 10) {
    drawRectangle(x + 10, y + 10, 21, 21, faceColor, faceColor);
  }
  if (drawOrderIndex == 11) {
    drawRectangle(x, y + 6, 5, 29, faceColor, faceColor);
    drawPolygon([{ x: x + 5, y: y + 7 }, { x: x + 5, y: y + 33 }, { x: x + 8, y: y + 30 }, { x: x + 8, y: y + 10 }], sideColor, sideColor);
  }
  if (drawOrderIndex == 12) {
    drawRectangle(x + 36, y + 6, 5, 29, faceColor, faceColor);
    drawPolygon([{ x: x + 35, y: y + 7 }, { x: x + 35, y: y + 33 }, { x: x + 32, y: y + 30 }, { x: x + 32, y: y + 10 }], sideColor, sideColor);
  }
  if (drawOrderIndex == 13) {
    drawRectangle(x + 5, y + 6, 31, 29, faceColor, faceColor);
  }
  if (drawOrderIndex == 14) {
    drawPolygon([{ x: x, y: y + 2 }, { x: x, y: y + 38 }, { x: x + 3, y: y + 35 }, { x: x + 3, y: y + 5 }], sideColor, sideColor);
  }
  if (drawOrderIndex == 15) {
    drawPolygon([{ x: x + 40, y: y + 2 }, { x: x + 40, y: y + 38 }, { x: x + 37, y: y + 35 }, { x: x + 37, y: y + 5 }], sideColor, sideColor);
  }
}
