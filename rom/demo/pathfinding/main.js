const STATE_INIT = 'init';
const STATE_NEW = 'new';
const STATE_OBSTRUCT = 'obstruct';
const STATE_DONE = 'done';
let state;
let level;
let result;

function romInit() {
  state = STATE_INIT;
  clearGfx();
  drawText(8, 5, 'A-STAR', COL_WHT);
  drawText(8, 11, 'PATHFINDING', COL_WHT);
  drawText(8, 17, 'DEMO', COL_WHT);
  drawText(8, 29, 'A:NEW LEVEL', COL_GRN);
  drawText(8, 35, 'B:ADD BLOCK', COL_BLU);
  drawText(8, 41, 'U:SHOW PATH', COL_YEL);
  drawText(8, 47, 'L:SHOW OPEN', COL_CYN);
  drawText(8, 53, 'R:SHOW CLOSED', COL_MAG);
}

function romLoop() {
  if (state === STATE_INIT) {
    if (isJustPressed(BTN_A) || isJustPressed(BTN_B) || isJustPressed(BTN_U) || isJustPressed(BTN_D) || isJustPressed(BTN_L) || isJustPressed(BTN_R)) {
      state = STATE_NEW;
    }
  }
  else if (state === STATE_NEW) {
    level = generateLevel(randomInt(16, 32), randomInt(16, 32), 0.45, 0, 0, 0);
    const grid = generateGrid();
    result = aStarSolve(grid, level.start, level.exit);
    state = STATE_DONE;
  } else if (state === STATE_OBSTRUCT) {
    tryAddObstruction();
    const grid = generateGrid();
    result = aStarSolve(grid, level.start, level.exit);
    state = STATE_DONE;
  } else if (state === STATE_DONE) {
    if (isJustPressed(BTN_A)) {
      state = STATE_NEW;
    }
    if (isJustPressed(BTN_B)) {
      state = STATE_OBSTRUCT;
    }
    clearGfx();
    for (let y = 0; y < level.height; y++) {
      for (let x = 0; x < level.width; x++) {
        drawRectangle(x * 2, y * 2, 2, 2, level.tiles[y * level.width + x]);
      }
    }
    drawRectangle(level.start.x * 2, level.start.y * 2, 2, 2, COL_GRN);
    drawRectangle(level.exit.x * 2, level.exit.y * 2, 2, 2, COL_RED);
    if (isPressed(BTN_L)) {
      for (let i = 0; i < result.open.length; i++) {
        drawRectangle(result.open[i].x * 2, result.open[i].y * 2, 1, 1, COL_CYN);
      }
    }
    if (isPressed(BTN_R)) {
      for (let i = 0; i < result.closed.length; i++) {
        drawRectangle(result.closed[i].x * 2, result.closed[i].y * 2, 1, 1, COL_MAG);
      }
    }
    if (isPressed(BTN_U)) {
      if (result.path.length == 0) {
        drawText(25, 59, 'unsolvable', COL_YEL);
      } else {
        for (let i = 0; i < result.path.length; i++) {
          drawRectangle(result.path[i].x * 2, result.path[i].y * 2, 1, 1, COL_YEL);
        }
      }
    }
  }
}

function generateGrid() {
  let gridPoints = [];
  for (let i = 0; i < level.width; i++) {
    gridPoints[i] = new Array(level.height);
  }
  for (let i = 0; i < level.width; i++) {
    for (let j = 0; j < level.height; j++) {
      gridPoints[i][j] = new GridPoint(i, j, level.width, level.height);
    }
  }
  for (let i = 0; i < level.width; i++) {
    for (let j = 0; j < level.height; j++) {
      if (level.tiles[j * level.width + i] == 0) {
        gridPoints[i][j].updateNeighbors(gridPoints);
      }
    }
  }
  return { cols: level.width, rows: level.height, points: gridPoints, }
}

function tryAddObstruction() {
  let unobstructedTileCount = 0;
  for (let i = 0; i < level.tiles.length; i++) {
    if (level.tiles[i] == 0) {
      unobstructedTileCount++;
    }
  }
  if (unobstructedTileCount <= 10) {
    return; // abort if level is almost fully obstructed
  }
  // find a random traversable tile that's not the level start or exit...
  let x = randomInt(0, level.width - 1);
  let y = randomInt(0, level.height - 1);
  while (level.tiles[y * level.width + x] != 0 || (level.start.x == x && level.start.y == y) || (level.exit.x == x && level.exit.y == y)) {
    x = randomInt(0, level.width - 1);
    y = randomInt(0, level.height - 1);
  }
  level.tiles[y * level.width + x] = 1; // ...then obstruct it
}
