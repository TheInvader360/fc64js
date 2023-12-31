let col = true;

function romInit() {}

function romLoop() {
  if (isJustPressed(BTN_U) || isJustPressed(BTN_D) || isJustPressed(BTN_L) || isJustPressed(BTN_R) || isJustPressed(BTN_A) || isJustPressed(BTN_B)) {
    col = !col;
  }
  for (let x = 0; x < GFX_W; x++) {
    for (let y = 0; y < GFX_H; y++) {
      col ? drawPixel(x, y, randomInt(0, 7)) : drawPixel(x, y, randomInt(0, 1) == 0 ? COL_BLK : COL_WHT);
    }
  }
}
