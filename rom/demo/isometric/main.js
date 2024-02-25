class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Player extends Entity {
  constructor(x, y, facing) {
    super(x, y);
    this.facing = facing; // 0 = Up(+Right) | 1 = Right(+Down) | 2 = Down(+Left) | 3 = Left(+Up)
  }
  drawIso(x, y) {
    if (this.facing == 0) drawImage(x, y, 6, 7, imgIsoPlayerUR);                  // UR
    if (this.facing == 1) drawImage(x, y, 6, 7, imgIsoPlayerDL, { flipX: true }); // RD
    if (this.facing == 2) drawImage(x, y, 6, 7, imgIsoPlayerDL);                  // DL
    if (this.facing == 3) drawImage(x, y, 6, 7, imgIsoPlayerUR, { flipX: true }); // LU
  }
  drawOrtho(x, y) {
    if (this.facing == 0) drawImage(x, y, 6, 6, imgOrthoPlayerU);                  // U
    if (this.facing == 1) drawImage(x, y, 6, 6, imgOrthoPlayerR);                  // R
    if (this.facing == 2) drawImage(x, y, 6, 6, imgOrthoPlayerU, { flipY: true }); // D
    if (this.facing == 3) drawImage(x, y, 6, 6, imgOrthoPlayerR, { flipX: true }); // L
  }
  turn(direction) { // -1 = anticlockwise | +1 = clockwise
    this.facing = wrap(this.facing + direction, 0, 4);
  }
}

class Enemy extends Entity {
  constructor(x, y, label, imgIso) {
    super(x, y);
    this.label = label;
    this.imgIso = imgIso;
  }
  drawIso(x, y) {
    drawImage(x, y, 6, 7, this.imgIso);
  }
  drawOrtho(x, y) {
    drawImage(x, y, 6, 6, imgOrthoEnemy);
  }
}

const palette = { // lookup enum for convenience
  black: 0, // 333333 (20%)
  dGrey: 1, // 666666 (40%)
  lGrey: 2, // 999999 (60%)
  white: 3, // cccccc (80%)
  brown: 4, // 875812
  peach: 5, // f7c29f
  green: 6, // 118357
  red:   7, // b01241
};

romPalette = [0x333333, 0x666666, 0x999999, 0xcccccc, 0x875812, 0xf7c29f, 0x118357, 0xb01241];

const offsetIsoX = 28;
const offsetIsoY = -24;
const offsetOrthoX = 2;
const offsetOrthoY = 2;
const entities = [];

let modeIso = true;
let player = new Player(1, 47, 1);
let message = '';

function romInit() {
  entities.push(player);
  entities.push(new Enemy(7, 50, 'slime', imgIsoEnemySlimeDL));
  entities.push(new Enemy(9, 44, 'imp', imgIsoEnemyImpDL));
  entities.push(new Enemy(17, 49, 'flame', imgIsoEnemyFlameDL));
  entities.push(new Enemy(25, 46, 'orc', imgIsoEnemyOrcDL));
  entities.push(new Enemy(33, 50, 'flame', imgIsoEnemyFlameDL));
  entities.push(new Enemy(40, 49, 'goblin', imgIsoEnemyGoblinDL));
  entities.push(new Enemy(48, 48, 'imp', imgIsoEnemyImpDL));
  entities.push(new Enemy(60, 45, 'slime', imgIsoEnemySlimeDL));
  entities.push(new Enemy(63, 43, 'orc', imgIsoEnemyOrcDL));
  entities.push(new Enemy(45, 39, 'slime', imgIsoEnemySlimeDL));
}

function romLoop() {
  handleGameplayInput();
  modeIso ? drawWorldIso() : drawWorldOrtho();
  if (message.length > 0) {
    drawRectangle(0, 0, 64, 6, palette.black, palette.black);
    drawText((64 - message.length * 4) / 2, 0, message, palette.peach);
  }
}

function handleGameplayInput() {
  if (isJustPressed(BTN_U) || isJustPressed(BTN_D)) { // try to move forwards or backwards
    let targetX = player.x;
    let targetY = player.y;
    if (player.facing == 0) isJustPressed(BTN_U) ? targetY-- : targetY++;
    if (player.facing == 1) isJustPressed(BTN_U) ? targetX++ : targetX--;
    if (player.facing == 2) isJustPressed(BTN_U) ? targetY++ : targetY--;
    if (player.facing == 3) isJustPressed(BTN_U) ? targetX-- : targetX++;
    message = '';
    const occupyingEntity = getLevelMapTileEntity(targetX, targetY); // simple tile based blocking collision check
    if (occupyingEntity) {
      message = `${occupyingEntity.label} encounter`.toUpperCase();
    } else if (isLevelMapTileReachable(targetX, targetY)) { // simple tile based move validity check
      player.x = targetX;
      player.y = targetY;
    }
  } else if (isJustPressed(BTN_L) || isJustPressed(BTN_R)) {
    player.turn(isJustPressed(BTN_L) ? -1 : 1);
  }

  if (isJustPressed(BTN_A) || isJustPressed(BTN_B)) modeIso = !modeIso;
}

function drawWorldIso() {
  const viewport = getViewportIso();
  const tiles = getLevelMapTiles(viewport.x, viewport.y, viewport.x + viewport.width, viewport.y + viewport.height);
  const size = tiles.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < i + 1; j++) {
      const indexX = j;
      const indexY = i - j;
      drawTileStackIso(indexX, indexY, tiles[indexY][indexX], getLevelMapTileEntity(indexX + viewport.x, indexY + viewport.y));
    }
  }
  for (let i = 1; i < size + 1; i++) {
    for (let j = 0; j < size - i; j++) {
      const indexX = i + j;
      const indexY = size - j - 1;
      drawTileStackIso(indexX, indexY, tiles[indexY][indexX], getLevelMapTileEntity(indexX + viewport.x, indexY + viewport.y));
    }
  }
}

function drawWorldOrtho() {
  clearGfx(palette.black);
  const viewport = getViewportOrtho();
  const tiles = getLevelMapTiles(viewport.x, viewport.y, viewport.x + viewport.width, viewport.y + viewport.height);
  for (let y = 0; y < tiles.length; y++) {
    for (let x = 0; x < tiles[0].length; x++) {
      drawTileStackOrtho(x, y, tiles[y][x], getLevelMapTileEntity(x + viewport.x, y + viewport.y));
    }
  }
}

function drawTileStackIso(indexX, indexY, blocks, entity) {
  const screenX = (indexX - indexY) * 4;
  const screenY = (indexX + indexY) * 2;
  if (blocks > 0) {
    for (let i = 0; i < blocks; i++) {
      drawImage(offsetIsoX + screenX, offsetIsoY + screenY - (i * 4), 8, 8, imgIsoBlock);
    }
  } else {
    drawImage(offsetIsoX + screenX, offsetIsoY + screenY + 4, 8, 4, imgIsoFloor);
  }

  if (entity) entity.drawIso(offsetIsoX + screenX + 1, offsetIsoY + screenY - 1  - blocks * 4);
}

function drawTileStackOrtho(indexX, indexY, blocks, entity) {
  if (blocks < 1) drawRectangle(offsetOrthoX + indexX * 6, offsetOrthoY + indexY * 6, 6, 6, palette.white, palette.white);
  else if (blocks < 2) drawCheckerboardRectangle(offsetOrthoX + indexX * 6, offsetOrthoY + indexY * 6, 6, 6, palette.white, palette.lGrey);
  else if (blocks < 3) drawRectangle(offsetOrthoX + indexX * 6, offsetOrthoY + indexY * 6, 6, 6, palette.lGrey, palette.lGrey);
  else if (blocks < 4) drawCheckerboardRectangle(offsetOrthoX + indexX * 6, offsetOrthoY + indexY * 6, 6, 6, palette.lGrey, palette.dGrey);
  else if (blocks < 5) drawRectangle(offsetOrthoX + indexX * 6, offsetOrthoY + indexY * 6, 6, 6, palette.dGrey, palette.dGrey);
  else if (blocks < 6) drawCheckerboardRectangle(offsetOrthoX + indexX * 6, offsetOrthoY + indexY * 6, 6, 6, palette.dGrey, palette.black);
  else drawRectangle(offsetOrthoX + indexX * 6, offsetOrthoY + indexY * 6, 6, 6, palette.black, palette.black);

  if (entity) entity.drawOrtho(offsetOrthoX + indexX * 6, offsetOrthoY + indexY * 6);
}

function drawCheckerboardRectangle(x, y, width, height, col1, col2) {
  for (let i = x; i < x + width; i++) {
    for (let j = y; j < y + height; j++) {
      drawPixel(i, j, (i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1) ? col1: col2);
    }
  }
}

function getViewportIso() {
  return {
    x: player.x - 16,
    y: player.y - 16,
    width: 32,
    height: 32,
  };
}

function getViewportOrtho() {
  return {
    x: clamp(player.x - 5, 0, levelMap[0].length - 10),
    y: clamp(player.y - 5, 0, levelMap.length - 10),
    width: 10,
    height: 10,
  };
}

function getLevelMapTiles(startX, startY, endX, endY) {
  const viewportTiles = [];
  let row = 0;
  for (let y = startY; y < endY; y++) {
    viewportTiles.push([]);
    for (let x = startX; x < endX; x++) {
      if (x < 0 || x > levelMap[0].length - 1 || y < 0 || y > levelMap.length - 1) {
        viewportTiles[row].push(0);
      } else {
        viewportTiles[row].push(levelMap[y][x]);
      }
    }
    row++;
  }
  return viewportTiles;
}

function getLevelMapTileEntity(x, y) {
  for (const entity of entities) {
    if (x == entity.x && y == entity.y) {
      return entity;
    }
  }
}

function isLevelMapTileReachable(x, y) {
  const heightDifference = levelMap[y][x] - levelMap[player.y][player.x];
  return heightDifference >= -1 && heightDifference <= 1;
}
