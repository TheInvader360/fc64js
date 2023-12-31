function generateLevel(width, height, targetClearedCellProportion, targetEnemyCount, targetGoldCount, targetItemCount) {
  let level = {
    width: width,
    height: height,
    tiles: [],
    clearedTiles: [], // useful when generating a level, can be removed once done...
    start: {},
    exit: {},
    enemies: [],
    gold: [],
    items: [],
  };

  const targetClearedCellCount = Math.floor(width * height * targetClearedCellProportion);

  for (let i = 0; i < width * height; i++) {
    level.tiles[i] = 1;
  }

  const candidateRects = [
    { x: Math.floor(width / 8), y: Math.floor(height / 8),  width: Math.ceil(width / 4), height: Math.ceil(height / 4) },
    { x: Math.ceil(width / 8 + width / 2), y: Math.floor(height / 8),  width: Math.ceil(width / 4), height: Math.ceil(height / 4) },
    { x: Math.floor(width / 8), y: Math.ceil(height / 8 + height / 2),  width: Math.ceil(width / 4), height: Math.ceil(height / 4) },
    { x: Math.ceil(width / 8 + width / 2), y: Math.ceil(height / 8 + height / 2),  width: Math.ceil(width / 4), height: Math.ceil(height / 4) },
  ];

  const midPoint = { x: Math.floor(width / 2), y: Math.floor(height / 2) };

  const endPoints = [];
  for (let i = 0; i < 4; i++) {
    endPoints.push({ x: randomInt(candidateRects[i].x, candidateRects[i].x + candidateRects[i].width - 1), y: randomInt(candidateRects[i].y, candidateRects[i].y + candidateRects[i].height - 1) });
  }

  const directedPaths = [];
  for (let i = 0; i < endPoints.length; i++) {
    directedPaths.push(carveDirectedPath(level, midPoint, endPoints[i]));
  }

  const randomWalkPaths = [];
  for (let i = 0; i < 4; i++) {
    randomWalkPaths.push(carveRandomWalkPath(level, endPoints[i], targetClearedCellCount * (0.4 + i * 0.1)));
  }
  for (let i = 0; i < 4; i++) {
    randomWalkPaths.push(carveRandomWalkPath(level, midPoint, targetClearedCellCount * (0.8 + i * 0.05)));
  }

  const startEndpointIndex = randomInt(0, 3);
  let exitEndpointIndex = randomInt(0, 3);
  while (startEndpointIndex == exitEndpointIndex) {
    exitEndpointIndex = randomInt(0, 3);
  }
  level.start = { x: endPoints[startEndpointIndex].x, y: endPoints[startEndpointIndex].y };
  level.exit = Object.assign({}, endPoints[exitEndpointIndex]);

  let candidateEntityTiles = level.clearedTiles.map(a => {return {...a}});
  const startIndex = candidateEntityTiles.findIndex(obj => obj.x == level.start.x && obj.y == level.start.y);
  candidateEntityTiles.splice(startIndex, 1);
  const exitIndex = candidateEntityTiles.findIndex(obj => obj.x == level.exit.x && obj.y == level.exit.y);
  candidateEntityTiles.splice(exitIndex, 1);

  targetEnemyCount = clamp(targetEnemyCount, 0, candidateEntityTiles.length * 0.25);
  targetGoldCount = clamp(targetGoldCount, 0, candidateEntityTiles.length * 0.25);
  targetItemCount = clamp(targetItemCount, 0, candidateEntityTiles.length * 0.25);

  for (let i = 0; i < targetEnemyCount; i++) {
    const index = randomInt(0, candidateEntityTiles.length - 1);
    level.enemies.push(Object.assign({}, candidateEntityTiles[index]));
    candidateEntityTiles.splice(index, 1);
  }

  for (let i = 0; i < targetGoldCount; i++) {
    const index = randomInt(0, candidateEntityTiles.length - 1);
    level.gold.push(Object.assign({}, candidateEntityTiles[index]));
    candidateEntityTiles.splice(index, 1);
  }

  for (let i = 0; i < targetItemCount; i++) {
    const index = randomInt(0, candidateEntityTiles.length - 1);
    level.items.push(Object.assign({}, candidateEntityTiles[index]));
    candidateEntityTiles.splice(index, 1);
  }

  return level;
}

function carveDirectedPath(level, start, end) {
  let x = start.x;
  let y = start.y;
  let path = [{ x: x, y: y }];
  clearTile(level, x, y);
  while (x != end.x || y != end.y) {
    let axis = Math.random() < 0.5 ? 'x' : 'y';
    if (x == end.x) {
      axis = 'y';
    }
    if (y == end.y) {
      axis = 'x';
    }
    if (axis == 'x') {
      x < end.x ? x++ : x--;
    }
    if (axis == 'y') {
      y < end.y ? y++ : y--;
    }
    path.push({ x: x, y: y });
    clearTile(level, x, y);
  }
  return path;
}

function carveRandomWalkPath(level, start, clearedCellCountCutoff) {
  let x = start.x;
  let y = start.y;
  let path = [{ x: x, y: y }];
  clearTile(level, x, y);
  while (level.clearedTiles.length < clearedCellCountCutoff) {
    let axis = Math.random() < 0.5 ? 'x' : 'y';
    let potentialX = axis == 'x' ? Math.random() < 0.5 ? x - 1 : x + 1 : x;
    let potentialY = axis == 'y' ? Math.random() < 0.5 ? y - 1 : y + 1 : y;
    if (potentialX > 0 && potentialX < level.width - 1 && potentialY > 0 && potentialY < level.height - 1 ) {
      x = potentialX;
      y = potentialY;
      path.push({ x: x, y: y });
      clearTile(level, x, y);
    }
  }
  return path;
}

function clearTile(level, x, y) {
  if (level.tiles[y * level.width + x] == 1) {
    level.tiles[y * level.width + x] = 0;
    level.clearedTiles.push({ x: x, y: y });
  }
}
