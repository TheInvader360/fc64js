class Level {
  constructor(width, height, tileWidth, tileHeight, tiles) {
    this.width = width;
    this.height = height;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tiles = tiles;
  }
  getTile(x, y) {
    return this.tiles[y * this.width + x];
  }
}

class Hero {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
  }
  setDir(dir) {
    this.dir = dir;
  }
  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}

let level;
let hero;
let sprites;

function romInit() {
  init('16x16');
}

function init(pref) {
  if (pref == '8x8') {
    level = new Level(15, 11, 8, 8, [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
    hero = new Hero(7, 5, 'd');
    sprites = new Map([['grass', imgGrass8], ['tree', imgTree8], ['hero-u', imgHero8], ['hero-d', imgHero8],['hero-l', imgHero8], ['hero-r', imgHero8]]);
  }
  if (pref == '16x16') {
    level = new Level(11, 11, 16, 16, [1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1]);
    hero = new Hero(5, 5, 'd');
    sprites = new Map([['grass', imgGrass16], ['tree', imgTree16], ['hero-u', imgHero16U], ['hero-d', imgHero16D], ['hero-l', imgHero16L], ['hero-r', imgHero16R]]);
  }
}

function romLoop() {
  if (isJustPressed(BTN_A)) {
    init('8x8');
  }
  if (isJustPressed(BTN_B)) {
    init('16x16');
  }

  let targetX = hero.x;
  let targetY = hero.y;

  if (isJustPressed(BTN_U) && hero.y > 0) {
    hero.setDir('u');
    targetY--;
  }
  if (isJustPressed(BTN_D) && hero.y < level.height - 1) {
    hero.setDir('d');
    targetY++;
  }
  if (isJustPressed(BTN_L) && hero.x > 0) {
    hero.setDir('l');
    targetX--;
  }
  if (isJustPressed(BTN_R) && hero.x < level.width - 1) {
    hero.setDir('r');
    targetX++;
  }

  if (targetX != hero.x || targetY != hero.y) {
    if (level.getTile(targetX, targetY) !== 1) {
      hero.setPos(targetX, targetY);
    }
  }

  clearGfx();
  const viewport = getViewport();
  for (let x = 0; x < viewport.width; x++) {
    for (let y = 0; y < viewport.height; y++) {
      const tile = level.getTile(x + viewport.x, y + viewport.y);
      if (tile == 0) {
        drawImage(x * level.tileWidth - level.tileWidth / 2, y * level.tileHeight - level.tileHeight / 2, level.tileWidth, level.tileHeight, sprites.get('grass'));
      }
      if (tile == 1) {
        drawImage(x * level.tileWidth - level.tileWidth / 2, y * level.tileHeight - level.tileHeight / 2, level.tileWidth, level.tileHeight, sprites.get('tree'));
      }
    }
  }
  drawImage((hero.x - viewport.x) * level.tileWidth - level.tileWidth / 2, (hero.y - viewport.y) * level.tileHeight - level.tileHeight / 2, level.tileWidth, level.tileHeight, sprites.get(`hero-${hero.dir}`));
}

function getViewport() {
  return {
    x: clamp(hero.x - (GFX_W / level.tileWidth / 2), 0, level.width - GFX_W / level.tileWidth - 1),
    y: clamp(hero.y - (GFX_H / level.tileHeight / 2), 0, level.height - GFX_H / level.tileHeight - 1),
    width: GFX_W / level.tileWidth + 1,
    height: GFX_H / level.tileHeight + 1,
  };
}
