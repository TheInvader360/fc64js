import '../../../lib/fc64.js';

fc64Init(romInit, romLoop);

let x = 60;
let y = 60;
let color = 4;

function romInit() {
  drawPixel(3, 3, COL_WHT);
}

function romLoop() {
  if (isJustPressed(BTN_A) && color > 1) {
    color--;
  }
  if (isJustReleased(BTN_B) && color < 6) {
    color++;
  }
  drawPixel(x, y, COL_BLK);
  if (isPressed(BTN_U) && y > 0) {
    y--;
  }
  if (isPressed(BTN_D) && y < GFX_H - 1) {
    y++;
  }
  if (isPressed(BTN_L) && x > 0) {
    x--;
  }
  if (isPressed(BTN_R) && x < GFX_W - 1) {
    x++;
  }
  drawPixel(x, y, color);
}
