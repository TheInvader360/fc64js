const max = 5;
let current = 0;

function romInit() {
  drawScene();
}

function romLoop() {
  const previous = current;
  if ((isJustPressed(BTN_L) || isJustPressed(BTN_D) || isJustPressed(BTN_A)) && current > 0) {
    current--;
  }
  if ((isJustPressed(BTN_R) || isJustPressed(BTN_U) || isJustPressed(BTN_B)) && current < max) {
    current++;
  }
  if (current != previous) {
    switch (current) {
      case 0:
        drawScene();
        break;
      case 1:
        drawLines();
        break;
      case 2:
        drawRectangles();
        break;
      case 3:
        drawCircles1();
        break;
      case 4:
        drawCircles2();
        break;
      case 5:
        drawCircles3();
        break;
      }
  }
}

function drawScene() {
  clearGfx(COL_CYN); // sky

  drawRectangle(0, 40, 64, 24, COL_GRN, COL_GRN); // ground

  drawCircle(52, 11, 5, COL_YEL, COL_YEL); // sun
  drawLine(52, 3, 52, 1, COL_YEL); // ray (from sun up)
  drawLine(58, 5, 59, 4, COL_YEL); // ray (from sun up-right)
  drawLine(60, 11, 62, 11, COL_YEL); // ray (from sun right)
  drawLine(58, 17, 59, 18, COL_YEL); // ray (from sun down-right)
  drawLine(52, 19, 52, 21, COL_YEL); // ray (from sun down)
  drawLine(46, 17, 45, 18, COL_YEL); // ray (from sun down-left)
  drawLine(44, 11, 42, 11, COL_YEL); // ray (from sun left)
  drawLine(46, 5, 45, 4, COL_YEL); // ray (from sun up-left)

  //drawPolygon([{ x: 3, y: 18 }, { x: 10, y: 3 }, { x: 34, y: 3 }, { x: 41, y: 18 }], COL_BLK, COL_MAG); // roof with outline - original method
  drawPolygon([3, 18, 10, 3, 34, 3, 41, 18], COL_BLK, COL_MAG); // roof with outline - alternative method

  drawRectangle(3, 18, 39, 34, COL_BLK, COL_YEL); // wall with outline

  drawRectangle(21, 37, -15, -11, COL_BLK, COL_BLU); // window with outline
  drawLine(8, 32, 20, 32, COL_BLK); // window lead (horizontal)
  drawLine(14, 28, 14, 36, COL_BLK); // window lead (vertical)

  drawRectangle(25, 27, 13, 25, COL_BLK, COL_RED); // door with outline
  drawRectangle(27, 39, 2, 2, COL_YEL); // door handle

  drawCircle(58, 45, 4, COL_BLU, COL_CYN); // ball

  drawLine(0, 55, 21, 55, COL_WHT); // fence rail (top left)
  drawLine(41, 55, 62, 55, COL_WHT); // fence rail (top right)
  drawLine(0, 62, 21, 62, COL_WHT); // fence rail (bottom left)
  drawLine(41, 62, 62, 62, COL_WHT); // fence rail (bottom right)
  for (let x = 2; x <= 24; x += 4) {
    drawRectangle(x, 53, 2, 11, COL_WHT); // fence boards (left)
  }
  for (let x = 39; x <= 64; x += 4) {
    drawRectangle(x, 53, 2, 11, COL_WHT); // fence boards (right)
  }

  for (let x = 25; x <= 37; x += 4) {
    for (let y = 52; y <= 63; y++) {
      if (y % 2 == 0) {
        if (x == 25 || x == 37) {
          drawPixel(x, y, COL_WHT); // path borders
        } else {
          drawPixel(x, y, COL_YEL); // path walkway (even rows)
        }
      } else  if (x < 37) {
        drawPixel(x + 2, y, COL_YEL); // path walkway (odd rows)
      }
    }
  }
}

function drawLines() {
  clearGfx();
  drawLine(32, 32, 32, 0, COL_RED);
  drawLine(32, 32, 40, 0, COL_GRN);
  drawLine(32, 32, 48, 0, COL_BLU);
  drawLine(32, 32, 56, 0, COL_YEL);
  drawLine(32, 32, 64, 0, COL_RED);
  drawLine(32, 32, 64, 8, COL_GRN);
  drawLine(32, 32, 64, 16, COL_BLU);
  drawLine(32, 32, 64, 24, COL_YEL);
  drawLine(32, 32, 64, 32, COL_RED);
  drawLine(32, 32, 64, 40, COL_GRN);
  drawLine(32, 32, 64, 48, COL_BLU);
  drawLine(32, 32, 64, 56, COL_YEL);
  drawLine(32, 32, 64, 64, COL_RED);
  drawLine(32, 32, 56, 64, COL_GRN);
  drawLine(32, 32, 48, 64, COL_BLU);
  drawLine(32, 32, 40, 64, COL_YEL);
  drawLine(32, 32, 32, 64, COL_RED);
  drawLine(32, 32, 24, 64, COL_GRN);
  drawLine(32, 32, 16, 64, COL_BLU);
  drawLine(32, 32, 8, 64, COL_YEL);
  drawLine(32, 32, 0, 64, COL_RED);
  drawLine(32, 32, 0, 56, COL_GRN);
  drawLine(32, 32, 0, 48, COL_BLU);
  drawLine(32, 32, 0, 40, COL_YEL);
  drawLine(32, 32, 0, 32, COL_RED);
  drawLine(32, 32, 0, 24, COL_GRN);
  drawLine(32, 32, 0, 16, COL_BLU);
  drawLine(32, 32, 0, 8, COL_YEL);
  drawLine(32, 32, 0, 0, COL_RED);
  drawLine(32, 32, 8, 0, COL_GRN);
  drawLine(32, 32, 16, 0, COL_BLU);
  drawLine(32, 32, 24, 0, COL_YEL);
}

function drawRectangles() {
  clearGfx();
  drawRectangle(30, 30, -30, -30, COL_RED);
  drawRectangle(25, 25, -20, -20, COL_RED, COL_RED);
  drawRectangle(33, 30, 30, -30, COL_YEL);
  drawRectangle(38, 25, 20, -20, COL_YEL, COL_YEL);
  drawRectangle(33, 33, 30, 30, COL_BLU);
  drawRectangle(38, 38, 20, 20, COL_BLU, COL_BLU);
  drawRectangle(30, 33, -30, 30, COL_GRN);
  drawRectangle(25, 38, -20, 20, COL_GRN, COL_GRN);
}

function drawCircles1() {
  clearGfx();
  for (let r = 0; r <= 88; r++) {
    const c = Math.ceil(r % 7) + 1;
    drawCircle(0, 0, r, c);
  }
}

function drawCircles2() {
  clearGfx();
  for (let r = 0; r <= 44; r++) {
    const c = Math.ceil(r % 7) + 1;
    drawCircle(32, 32, r, c);
  }
}

function drawCircles3() {
  clearGfx();
  for (let x = 0; x < GFX_W; x++) {
    for (let y = 0; y < GFX_H; y++) {
      if (x % 2 == 0 && y % 2 == 0) {
        drawPixel(x, y, COL_WHT);
      }
    }
  }
  drawCircle(7, 7, 6, COL_RED, COL_RED);
  drawCircle(23, 7, 6, COL_GRN, COL_GRN);
  drawCircle(7, 23, 6, COL_BLU, COL_BLU);
  drawCircle(23, 23, 6, COL_YEL, COL_YEL);
  drawCircle(39, 7, 6, COL_RED);
  drawCircle(55, 7, 6, COL_GRN);
  drawCircle(39, 23, 6, COL_BLU);
  drawCircle(55, 23, 6, COL_YEL);
  drawCircle(7, 39, 6, COL_BLU, COL_RED);
  drawCircle(23, 39, 6, COL_YEL, COL_GRN);
  drawCircle(7, 55, 6, COL_RED, COL_BLU);
  drawCircle(23, 55, 6, COL_GRN, COL_YEL);
  drawCircle(47, 47, 14, COL_MAG, COL_CYN);
}
