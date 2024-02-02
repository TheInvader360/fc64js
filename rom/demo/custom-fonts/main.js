let fonts = [customFontA, customFontB, customFontC, customFontD];
let current = 0;

function romInit() {}

function romLoop() {
  clearGfx();

  if (isPressed(BTN_U)) {
    current = 0;
  }
  if (isPressed(BTN_D)) {
    current = 1;
  }
  if (isPressed(BTN_L)) {
    current = 2;
  }
  if (isPressed(BTN_R)) {
    current = 3;
  }

  if (isJustPressed(BTN_A) || isJustPressed(BTN_B)) {
    let r = current;
    while (r == current) {
      r = randomInt(0, 3);
    }
    current = r;
  }

  const font = fonts[current];
  drawRectangle(0, 0, GFX_W, font.charHeight + 2, COL_WHT, COL_WHT);
  drawText(1, 1, 'HELLO!', COL_BLK, { font: font }); // use font's default tracking
  const lineCount = Math.ceil(GFX_H / (font.charHeight + 2));
  for (let i = 1; i < lineCount; i ++) {
    drawText(1, i * (font.charHeight + 1) + 1, 'HELLO!', i, { tracking: i, font: font }); // override tracking
  }
}
