function romInit() {
}

function romLoop() {
  clearGfx();
  if (isPressed(BTN_U) || isPressed(BTN_D) || isPressed(BTN_L) || isPressed(BTN_R)) {
    drawHello();
  } else if (isPressed(BTN_A) || isPressed(BTN_B)) {
    drawPangrams();
  } else {
    drawCharMap();
  }
}

function drawHello() {
  for (let i = 1; i < 8; i ++) {
    drawText(4, i * 8 - 2, 'HELLO!', i, { tracking: i });
  }
}

function drawPangrams() {
  drawText(1, 0, 'The quick brown', COL_RED);
  drawText(1, 6, 'fox jumps over', COL_RED);
  drawText(1, 12, 'the lazy dog.', COL_RED);
  drawText(1, 23, 'How vexingly', COL_GRN);
  drawText(1, 29, 'quick daft', COL_GRN);
  drawText(1, 35, 'zebras jump!', COL_GRN);
  drawText(1, 46, 'Sphinx of black', COL_BLU);
  drawText(1, 52, 'quartz, judge my', COL_BLU);
  drawText(1, 58, 'vow.', COL_BLU);
}

function drawCharMap() {
  drawText(1, 6, ' !"#$%&\'()*+,-./', COL_BLU);
  drawText(1, 12, '0123456789', COL_RED);
  drawText(1, 18, ':;<=>?@', COL_MAG);
  drawText(1, 24, 'ABCDEFGHIJKLM', COL_GRN);
  drawText(1, 30, 'NOPQRSTUVWXYZ', COL_GRN);
  drawText(1, 36, '[\\]^_`', COL_CYN);
  drawText(1, 42, 'abcdefghijklm', COL_YEL);
  drawText(1, 48, 'nopqrstuvwxyz', COL_YEL);
  drawText(1, 54, '{|}~', COL_WHT);
}
