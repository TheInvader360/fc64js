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
    drawText('HELLO!', 4, i * 8 - 2, i, { tracking: i });
  }
}

function drawPangrams() {
  drawText('The quick brown ', 1, 0,  COL_RED);
  drawText('fox jumps over  ', 1, 6,  COL_RED);
  drawText('the lazy dog.   ', 1, 12, COL_RED);
  drawText('How vexingly    ', 1, 23, COL_GRN);
  drawText('quick daft      ', 1, 29, COL_GRN);
  drawText('zebras jump!    ', 1, 35, COL_GRN);
  drawText('Sphinx of black ', 1, 46, COL_BLU);
  drawText('quartz, judge my', 1, 52, COL_BLU);
  drawText('vow.            ', 1, 58, COL_BLU);
}

function drawCharMap() {
  drawText(' !"#$%&\'()*+,-./', 1, 6, COL_BLU);
  drawText('0123456789', 1, 12, COL_RED);
  drawText(':;<=>?@', 1, 18, COL_MAG);
  drawText('ABCDEFGHIJKLM', 1, 24, COL_GRN);
  drawText('NOPQRSTUVWXYZ', 1, 30, COL_GRN);
  drawText('[\\]^_`', 1, 36, COL_CYN);
  drawText('abcdefghijklm', 1, 42, COL_YEL);
  drawText('nopqrstuvwxyz', 1, 48, COL_YEL);
  drawText('{|}~', 1, 54, COL_WHT);
}
