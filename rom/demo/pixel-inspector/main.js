let ticks = 0;
let pos = {x: 32, y: 28};

function romInit() {}

function romLoop() {
  ticks++;
  ticks = wrap(ticks, 0, 21);

  if (isJustPressed(BTN_U)) {
    pos.y--;
  }
  if (isJustPressed(BTN_D)) {
    pos.y++;
  }
  if (isJustPressed(BTN_L)) {
    pos.x--;
  }
  if (isJustPressed(BTN_R)) {
    pos.x++;
  }
  pos.x = wrap(pos.x, 0, 64);
  pos.y = wrap(pos.y, 0, 57);

  drawImage(0, 0, 64, 57, img);
  drawPattern([0, -1, -1, 0, 1, 0, 0, 1], pos.x, pos.y, cyclingColor());
  const pixelColor = getPixel(pos.x, pos.y);
  const panelColor = pixelColor < 4 ? COL_WHT : COL_BLK;
  drawRectangle(0, 57, 64, 7, panelColor, panelColor);
  drawText(`Pixel (${pos.x},${pos.y})`, 1, 58, pixelColor);
}

const cyclingColor = () => ticks < 5 ? COL_RED : ticks < 10 ? COL_GRN : ticks < 15 ? COL_BLU : COL_YEL;
