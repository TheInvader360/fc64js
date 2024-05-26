romPalette = [0x000000, 0x0000ff, 0xff0000, 0xff00ff, 0x00ff00, 0x00ffff, 0xffff00, 0xe6e6e6]; // override COL_WHT

let ticks;
let direction;
const images = new Map();
const animations = new Map();

function romInit() {
  ticks = 0;

  direction = 'R';

  images.clear();
  images.set('block', imgFromB64(block_B64));
  images.set('gate', imgFromB64(gate_B64));
  images.set('ghostEatenL', imgFromB64(ghostEatenL_B64));
  images.set('ghostEatenR', imgFromB64(ghostEatenR_B64));
  images.set('ghostFleeingOverlayL', imgFromB64(ghostFleeingOverlayL_B64));
  images.set('ghostFleeingOverlayR', imgFromB64(ghostFleeingOverlayR_B64));
  images.set('ghostHuntingOverlayL', imgFromB64(ghostHuntingOverlayL_B64));
  images.set('ghostHuntingOverlayR', imgFromB64(ghostHuntingOverlayR_B64));
  images.set('ghostOverlayU', imgFromB64(ghostOverlayU_B64));
  images.set('ghostTopBlu', imgFromB64(ghostTop_B64));
  images.set('ghostTopRed', swapImageColors(images.get('ghostTopBlu'), [1], [2]));
  images.set('pill', imgFromB64(pill_B64));
  images.set('powerPill', imgFromB64(powerPill_B64));

  const ghostBottomBlu0 = imgFromB64(ghostBottom0_B64);
  const ghostBottomBlu1 = imgFromB64(ghostBottom1_B64);
  const ghostBottomBlu2 = imgFromB64(ghostBottom2_B64);
  const ghostBottomRed0 = swapImageColors(ghostBottomBlu0, [COL_BLU], [COL_RED]);
  const ghostBottomRed1 = swapImageColors(ghostBottomBlu1, [COL_BLU], [COL_RED]);
  const ghostBottomRed2 = swapImageColors(ghostBottomBlu2, [COL_BLU], [COL_RED]);
  animations.clear();
  animations.set('ghostBottomBlu', new Anim([ghostBottomBlu0, ghostBottomBlu1, ghostBottomBlu2], 6, true));
  animations.set('ghostBottomRed', new Anim([ghostBottomRed0, ghostBottomRed1, ghostBottomRed2], 6, true));
  animations.set('pacmanD', new Anim([imgFromB64(pacmanD0_B64), imgFromB64(pacmanD1_B64), imgFromB64(pacmanD2_B64)], 6, true));
  animations.set('pacmanL', new Anim([imgFromB64(pacmanL0_B64), imgFromB64(pacmanL1_B64), imgFromB64(pacmanL2_B64)], 6, true));
  animations.set('pacmanR', new Anim([imgFromB64(pacmanR0_B64), imgFromB64(pacmanR1_B64), imgFromB64(pacmanR2_B64)], 6, true));
  animations.set('pacmanU', new Anim([imgFromB64(pacmanU0_B64), imgFromB64(pacmanU1_B64), imgFromB64(pacmanU2_B64)], 6, true));
}

function romLoop() {
  ticks++;

  if (isJustPressed(BTN_U)) direction = 'U';
  if (isJustPressed(BTN_D)) direction = 'D';
  if (isJustPressed(BTN_L)) direction = 'L';
  if (isJustPressed(BTN_R)) direction = 'R';

  clearGfx(COL_BLK);

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

const drawBlock = (x, y) => drawImage(x, y, 17, 15, images.get('block'));

const drawGate = (x, y) => drawImage(x, y, 10, 3, images.get('gate'));

const drawGhostEaten = (x, y) => {
  if (direction === 'U' || direction === 'R') drawImage(x, y, 11, 4, images.get('ghostEatenR'));
  if (direction === 'D' || direction === 'L') drawImage(x, y, 11, 4, images.get('ghostEatenL'));
}

const drawGhostFleeing = (x, y) => {
  drawImage(x, y, 13, 11, images.get('ghostTopBlu'));
  drawImage(x, y + 11, 13, 3, animations.get('ghostBottomBlu').getKeyFrame(ticks));
  if (direction === 'U') drawImage(x + 2, y + 2, 9, 8, images.get('ghostOverlayU'));
  if (direction === 'D' || direction === 'L') drawImage(x + 2, y + 2, 9, 8, images.get('ghostFleeingOverlayL'));
  if (direction === 'R') drawImage(x + 2, y + 2, 9, 8, images.get('ghostFleeingOverlayR'));
}

const drawGhostHunting = (x, y) => {
  drawImage(x, y, 13, 11, images.get('ghostTopRed'));
  drawImage(x, y + 11, 13, 3, animations.get('ghostBottomRed').getKeyFrame(ticks));
  if (direction === 'U') drawImage(x + 2, y + 2, 9, 8, images.get('ghostOverlayU'));
  if (direction === 'D' || direction === 'L') drawImage(x + 2, y + 2, 9, 8, images.get('ghostHuntingOverlayL'));
  if (direction === 'R') drawImage(x + 2, y + 2, 9, 8, images.get('ghostHuntingOverlayR'));
}

const drawPacman = (x, y) => {
  if (direction === 'U') drawImage(x, y, 13, 13, animations.get('pacmanU').getKeyFrame(ticks));
  if (direction === 'D') drawImage(x, y, 13, 13, animations.get('pacmanD').getKeyFrame(ticks));
  if (direction === 'L') drawImage(x, y, 13, 13, animations.get('pacmanL').getKeyFrame(ticks));
  if (direction === 'R') drawImage(x, y, 13, 13, animations.get('pacmanR').getKeyFrame(ticks));
}

const drawPill = (x, y) => drawImage(x, y, 5, 5, images.get('pill'));

const drawPowerPill = (x, y) => ticks % 40 < 30 ? drawImage(x, y, 7, 7, images.get('powerPill')) : null;

const imgFromB64 = (b64) => {
  const padCount = Math.ceil(b64.length / 4) * 4;
  const padded = b64.padEnd(padCount, '=');
  const binStr = atob(padded);
  const img = [];
  for (let i = 0; i < binStr.length; i++) {
    const byte = binStr.charCodeAt(i);
    let pix1 = (byte >> 4) & 0b00001111;
    let pix2 = byte & 0b00001111;
    img.push(pix1 === 15 ? -1 : pix1, pix2 === 15 ? -1 : pix2);
  }
  return img;
}
