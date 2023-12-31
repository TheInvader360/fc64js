let scene;
let menuIndex = 0;
let originalColors = [-1, COL_BLK, COL_BLU, COL_RED, COL_MAG, COL_GRN, COL_CYN, COL_YEL, COL_WHT];
let swapColors = [];
let ticks = 0;

function romInit() {
  scene = imgScene;
  resetSwapColors();
}

function romLoop() {
  ticks++;
  if (ticks > 120) {
    ticks = 0;
  }

  if (isJustPressed(BTN_U) && menuIndex > 0) {
    menuIndex--;
  }
  if (isJustPressed(BTN_D) && menuIndex < 8) {
    menuIndex++;
  }
  if (isJustPressed(BTN_L) && swapColors[menuIndex] > -1) {
    swapColors[menuIndex]--;
  }
  if (isJustPressed(BTN_R) && swapColors[menuIndex] < 7) {
    swapColors[menuIndex]++;
  }
  if (isJustPressed(BTN_A) || isJustPressed(BTN_B)) {
    resetSwapColors();
  }

  if (isJustPressed(BTN_L) || isJustPressed(BTN_R) || isJustPressed(BTN_A) || isJustPressed(BTN_B)) {
    scene = swapImageColors(imgScene, originalColors, swapColors);
  }

  const bgColor = cyclingColor();
  clearGfx(bgColor);
  drawImage(1, 1, 62, 62, scene);
  drawImage(40, 2, 22, 57, imgOverlay);
  drawRectangle(43, 5, 3, 3, bgColor, bgColor);
  for (let i = 0; i <= 8; i++) {
    const swapColor = swapColors[i];
    if (swapColor >= 0) {
      drawRectangle(56, i * 6 + 5, 3, 3, swapColor, swapColor);
    } else {
      drawRectangle(56, i * 6 + 5, 3, 3, bgColor, bgColor);
    }
  }
  drawImage(48, menuIndex * 6 + 4, 6, 5, imgArrow);
}

const cyclingColor = () => ticks < 30 ? COL_RED : ticks < 60 ? COL_GRN : ticks < 90 ? COL_BLU : COL_YEL;

const resetSwapColors = () => swapColors = [...originalColors];
