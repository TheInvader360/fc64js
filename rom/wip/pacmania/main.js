romPalette = [0x000000, 0x0000ff, 0xff0000, 0xff00ff, 0x00ff00, 0x00ffff, 0xffff00, 0xe6e6e6]; // override COL_WHT

class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Level {
  constructor(tilemap) {
    this.width = tilemap[0].length;
    this.height = tilemap.length;
    this.blocks = [];
    this.pills = [];
    this.powerPills = [];
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        if (tilemap[j][i] == 1) this.blocks.push(new Coordinate(i, j));
        if (tilemap[j][i] == 2) this.pills.push(new Coordinate(i, j));
        if (tilemap[j][i] == 3) this.powerPills.push(new Coordinate(i, j));
        if (tilemap[j][i] == 4) this.gate = new Coordinate(i, j);
        if (tilemap[j][i] == 5) this.bonusSpawnPoint = new Coordinate(i, j);
        if (tilemap[j][i] == 6) this.pacmanSpawnPoint = new Coordinate(i, j);
      }
    }
  }
  getBlock(x, y) {
    let result = null;
    for (const block of level.blocks) {
      if (block.x === x && block.y === y) result = block;
    }
    return result;
  }
}

class Pacman {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
  }
  setDir(dir) {
    this.dir = dir;
  }
  update() {
    //this.x -= 0.01;
    //if (isPressed(BTN_U)) pacman.y -= 0.01;
    //if (isPressed(BTN_D)) pacman.y += 0.01;
    //if (isPressed(BTN_L)) pacman.x -= 0.01;
    //if (isPressed(BTN_R)) pacman.x += 0.01;
    if (isJustPressed(BTN_U)) pacman.y--;
    if (isJustPressed(BTN_D)) pacman.y++;
    if (isJustPressed(BTN_L)) pacman.x--;
    if (isJustPressed(BTN_R)) pacman.x++;
  }
}

const images = new Map();
const animations = new Map();
let mode; //Temp: 0 = mockup, 1 = ortho 3x3, 2 = ortho 16x16, 3 = iso
let ticks;
let currentLevel;
let level;
let pacman;

function romInit() {
  images.clear();
  images.set('block', imageFromB64String(block_B64));
  images.set('gate', imageFromB64String(gate_B64));
  images.set('ghostEatenL', imageFromB64String(ghostEatenL_B64));
  images.set('ghostEatenR', imageFromB64String(ghostEatenR_B64));
  images.set('ghostFleeingOverlayL', imageFromB64String(ghostFleeingOverlayL_B64));
  images.set('ghostFleeingOverlayR', imageFromB64String(ghostFleeingOverlayR_B64));
  images.set('ghostHuntingOverlayL', imageFromB64String(ghostHuntingOverlayL_B64));
  images.set('ghostHuntingOverlayR', imageFromB64String(ghostHuntingOverlayR_B64));
  images.set('ghostOverlayU', imageFromB64String(ghostOverlayU_B64));
  images.set('ghostTopBlu', imageFromB64String(ghostTop_B64));
  images.set('ghostTopRed', swapImageColors(images.get('ghostTopBlu'), [1], [2]));
  images.set('pill', imageFromB64String(pill_B64));
  images.set('powerPill', imageFromB64String(powerPill_B64));

  const ghostBottomBlu0 = imageFromB64String(ghostBottom0_B64);
  const ghostBottomBlu1 = imageFromB64String(ghostBottom1_B64);
  const ghostBottomBlu2 = imageFromB64String(ghostBottom2_B64);
  const ghostBottomRed0 = swapImageColors(ghostBottomBlu0, [COL_BLU], [COL_RED]);
  const ghostBottomRed1 = swapImageColors(ghostBottomBlu1, [COL_BLU], [COL_RED]);
  const ghostBottomRed2 = swapImageColors(ghostBottomBlu2, [COL_BLU], [COL_RED]);
  animations.clear();
  animations.set('ghostBottomBlu', new Anim([ghostBottomBlu0, ghostBottomBlu1, ghostBottomBlu2], 6, true));
  animations.set('ghostBottomRed', new Anim([ghostBottomRed0, ghostBottomRed1, ghostBottomRed2], 6, true));
  animations.set('pacmanD', new Anim([imageFromB64String(pacmanD0_B64), imageFromB64String(pacmanD1_B64), imageFromB64String(pacmanD2_B64)], 6, true));
  animations.set('pacmanL', new Anim([imageFromB64String(pacmanL0_B64), imageFromB64String(pacmanL1_B64), imageFromB64String(pacmanL2_B64)], 6, true));
  animations.set('pacmanR', new Anim([imageFromB64String(pacmanR0_B64), imageFromB64String(pacmanR1_B64), imageFromB64String(pacmanR2_B64)], 6, true));
  animations.set('pacmanU', new Anim([imageFromB64String(pacmanU0_B64), imageFromB64String(pacmanU1_B64), imageFromB64String(pacmanU2_B64)], 6, true));

  mode = 0;
  ticks = 0;
  currentLevel = 0;
  startNextLevel();
}

function startNextLevel() {
  currentLevel++;
  if (currentLevel > levelMaps.length) currentLevel = 1;
  level = new Level(levelMaps[currentLevel - 1]);
  pacman = new Pacman(level.pacmanSpawnPoint.x, level.pacmanSpawnPoint.y, 'R');
}

function romLoop() {
  ticks++;

  if (isJustPressed(BTN_U)) pacman.setDir('U');
  if (isJustPressed(BTN_D)) pacman.setDir('D');
  if (isJustPressed(BTN_L)) pacman.setDir('L');
  if (isJustPressed(BTN_R)) pacman.setDir('R');
  if (isJustPressed(BTN_A)) mode = wrap(mode + 1, 0, 4);
  if (isJustPressed(BTN_B)) startNextLevel();

  pacman.update();
  //pacman.x = wrap(pacman.x, -1, level.width - 1);
  pacman.x = wrap(pacman.x, 0, level.width);
  pacman.y = wrap(pacman.y, 0, level.height);

  clearGfx(COL_BLK);

  if (mode === 0) { // mockup
    drawBlock(0, -8);
    drawBlock(14, -8);
    drawGate(30, 4);
    drawBlock(42, -8);
  
    drawBlock(-4, 0);
    drawBlock(52, 0);
  
    drawBlock(-8, 8);
    drawBlock(48, 8);
  
    drawBlock(-12, 16);
    drawBlock(2, 16);
    drawBlock(16, 16);
    drawBlock(30, 16);
    drawBlock(44, 16);
  
    drawPowerPill(3, 27);
    drawPill(18, 28);
    drawPill(32, 28);
    drawPowerPill(45, 27);
  
    //drawRectangle(3, 48, 58, 14, COL_MAG, COL_MAG);
  
    drawPacman(3, 49);
    drawGhostHunting(18, 48);
    drawGhostFleeing(33, 48);
    drawGhostEaten(49, 51);
  }

  if (mode === 1) { // ortho 3x3
    for (const block of level.blocks) drawRectangle(block.x * 3, block.y * 3, 3, 3, COL_CYN, COL_CYN);
    for (const pill of level.pills) drawPixel(pill.x * 3 + 1, pill.y * 3 + 1, COL_YEL);
    for (const powerPill of level.powerPills) ticks % 40 < 30 ? drawRectangle(powerPill.x * 3, powerPill.y * 3, 3, 3, COL_YEL, COL_YEL) : null;
    drawLine(level.gate.x * 3, level.gate.y * 3 + 1, level.gate.x * 3 + 2, level.gate.y * 3 + 1, COL_BLU);
    drawRectangle(level.bonusSpawnPoint.x * 3, level.bonusSpawnPoint.y * 3, 3, 3, COL_RED);
    drawRectangle(level.pacmanSpawnPoint.x * 3, level.pacmanSpawnPoint.y * 3, 3, 3, COL_YEL);
    const pacmanDirModX = pacman.dir == 'L' ? -1 : pacman.dir == 'R' ? 1 : 0;
    const pacmanDirModY = pacman.dir == 'U' ? -1 : pacman.dir == 'D' ? 1 : 0;
    drawRectangle(pacman.x * 3, pacman.y * 3, 3, 3, COL_YEL, COL_YEL);
    drawLine(pacman.x * 3 + 1, pacman.y * 3 + 1, pacman.x * 3 + 1 + pacmanDirModX, pacman.y * 3 + 1 + pacmanDirModY, COL_BLK);
  }

  if (mode ===2) { // ortho 16x16
    /*
    for (const block of level.blocks) drawRectangle((block.x - pacman.x) * 16 + 32 - 8, (block.y - pacman.y) * 16 + 32 - 8, 16, 16, COL_CYN, COL_CYN);

    //    for (const pill of level.pills) drawRectangle(pill.x * 16 + 8, pill.y * 16 + 8, 2, 2, COL_YEL);
    //    for (const powerPill of level.powerPills) ticks % 40 < 30 ? drawRectangle(powerPill.x * 16 + 7, powerPill.y * 16 + 7, 4, 4, COL_YEL, COL_YEL) : null;
    //    drawRectangle(level.gate.x * 16, level.gate.y * 16 + 8, 16, 2, COL_BLU);
    //    drawRectangle(level.bonusSpawnPoint.x * 16, level.bonusSpawnPoint.y * 16, 16, 16, COL_RED);
    //    drawRectangle(level.pacmanSpawnPoint.x * 16, level.pacmanSpawnPoint.y * 16, 16, 16, COL_YEL);
    //    const pacmanDirModX = pacman.dir == 'L' ? -4 : pacman.dir == 'R' ? 4 : 0;
    //    const pacmanDirModY = pacman.dir == 'U' ? -4 : pacman.dir == 'D' ? 4 : 0;
        drawRectangle(24, 24, 16, 16, COL_YEL, COL_YEL);
    //    drawLine(pacman.x * 16 + 8, pacman.y * 16 + 8, pacman.x * 16 + 8 + pacmanDirModX, pacman.y * 16 + 8 + pacmanDirModY, COL_BLK);
    */

    /*
    const viewport = getViewport();
    drawRectangle((pacman.x - viewport.x) * 16, (pacman.y - viewport.y) * 16, 16, 16, COL_YEL, COL_YEL);
    for (const block of level.blocks) {
      drawRectangle((block.x - viewport.x) * 16, (block.y - viewport.y) * 16, 16, 16, COL_CYN);
    }
    */
    const minX = Math.floor(pacman.x - 2);
    const maxX = Math.floor(pacman.x + 2);
    const minY = Math.floor(pacman.y - 2);
    const maxY = Math.floor(pacman.y + 2);
  
    //console.log('Loop');
    const viewportBlocks = [];
    for (let j = minY; j < maxY; j++) {
      for (let i = minX; i < maxX; i++) {
        //console.log(mod(i, level.width), mod(j, level.height));
        const block = level.getBlock(mod(i, level.width), mod(j, level.height));
        //if (block != null) {
          //drawRectangle(0, 0, 16, 16, COL_CYN);
          viewportBlocks.push(block)
        //}
      }
    }
  
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        if (viewportBlocks[j * 4 + i] != null) drawRectangle(i * 16, j * 16, 16, 16, COL_CYN);
      }
    }
  }

  if (mode === 3) {// iso
    //TODO: Implement...
  }
}

/*
function getViewport() {
  return {
    x: clamp(pacman.x - (GFX_W / 16 / 2), 0, level.width + 1 - GFX_W / 16 - 1),
    y: clamp(pacman.y - (GFX_H / 16 / 2), 0, level.height + 1 - GFX_H / 16 - 1),
    width: GFX_W / 16 + 1,
    height: GFX_H / 16 + 1,
  };
}
*/

const drawBlock = (x, y) => drawImage(x, y, 17, 15, images.get('block'));

const drawGate = (x, y) => drawImage(x, y, 10, 3, images.get('gate'));

const drawGhostEaten = (x, y) => {
  if (pacman.dir === 'U' || pacman.dir === 'R') drawImage(x, y, 11, 4, images.get('ghostEatenR'));
  if (pacman.dir === 'D' || pacman.dir === 'L') drawImage(x, y, 11, 4, images.get('ghostEatenL'));
}

const drawGhostFleeing = (x, y) => {
  drawImage(x, y, 13, 11, images.get('ghostTopBlu'));
  drawImage(x, y + 11, 13, 3, animations.get('ghostBottomBlu').getKeyFrame(ticks));
  if (pacman.dir === 'U') drawImage(x + 2, y + 2, 9, 8, images.get('ghostOverlayU'));
  if (pacman.dir === 'D' || pacman.dir === 'L') drawImage(x + 2, y + 2, 9, 8, images.get('ghostFleeingOverlayL'));
  if (pacman.dir === 'R') drawImage(x + 2, y + 2, 9, 8, images.get('ghostFleeingOverlayR'));
}

const drawGhostHunting = (x, y) => {
  drawImage(x, y, 13, 11, images.get('ghostTopRed'));
  drawImage(x, y + 11, 13, 3, animations.get('ghostBottomRed').getKeyFrame(ticks));
  if (pacman.dir === 'U') drawImage(x + 2, y + 2, 9, 8, images.get('ghostOverlayU'));
  if (pacman.dir === 'D' || pacman.dir === 'L') drawImage(x + 2, y + 2, 9, 8, images.get('ghostHuntingOverlayL'));
  if (pacman.dir === 'R') drawImage(x + 2, y + 2, 9, 8, images.get('ghostHuntingOverlayR'));
}

const drawPacman = (x, y) => {
  if (pacman.dir === 'U') drawImage(x, y, 13, 13, animations.get('pacmanU').getKeyFrame(ticks));
  if (pacman.dir === 'D') drawImage(x, y, 13, 13, animations.get('pacmanD').getKeyFrame(ticks));
  if (pacman.dir === 'L') drawImage(x, y, 13, 13, animations.get('pacmanL').getKeyFrame(ticks));
  if (pacman.dir === 'R') drawImage(x, y, 13, 13, animations.get('pacmanR').getKeyFrame(ticks));
}

const drawPill = (x, y) => drawImage(x, y, 5, 5, images.get('pill'));

const drawPowerPill = (x, y) => ticks % 40 < 30 ? drawImage(x, y, 7, 7, images.get('powerPill')) : null;

const mod = (n, m) => (n % m + m) % m; // mod function returns positive remainder
