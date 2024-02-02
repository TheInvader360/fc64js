const FREQUENCY_MIN = 100;
const FREQUENCY_MAX = 3000;
const DURATION_MIN = 3;
const DURATION_MAX = 200;

let list = [
  { frequency:  100, duration: 200 },
  { frequency:  500, duration: 160 },
  { frequency: 1000, duration: 120 },
  { frequency: 2000, duration:  80 },
  { frequency: 3000, duration:  40 },
];
let selected;
let state;

function romInit() {
  selected = 0;
  state = 'init';
  clearGfx();
  drawText(1, 5, `BEEP-EFFECTS`, COL_YEL);
  drawText(1, 13, `U: LIST UP`, COL_WHT);
  drawText(1, 21, `D: LIST DOWN`, COL_WHT);
  drawText(1, 29, `L: RANDOM FREQ`, COL_WHT);
  drawText(1, 37, `R: RANDOM DUR`, COL_WHT);
  drawText(1, 45, `A: BEEP (FORCE)`, COL_WHT);
  drawText(1, 53, `B: BEEP (TRY)`, COL_WHT);
}

function romLoop() {
  if (state == 'main') {
    if (isJustPressed(BTN_U) && selected > 0) {
      selected--;
    }
    if (isJustPressed(BTN_D) && selected < list.length - 1) {
      selected++;
    }
    if (isJustPressed(BTN_L)) {
      list[selected].frequency = randomInt(FREQUENCY_MIN, FREQUENCY_MAX);
    }
    if (isJustPressed(BTN_R)) {
      list[selected].duration = randomInt(DURATION_MIN, DURATION_MAX);
    }
    if (isJustPressed(BTN_A)) {
      beep(list[selected].frequency, list[selected].duration, true);
    }
    if (isJustPressed(BTN_B)) {
      beep(list[selected].frequency, list[selected].duration, false);
    }

    clearGfx();
    drawText(1, 5, `BEEP-EFFECTS`, COL_YEL);
    drawText(13, 13, `FREQ`, COL_RED);
    drawText(33, 13, `DUR`, COL_GRN);
    for (let i = 0; i < list.length; i++) {
      drawText(13, 21 + i * 8, `${list[i].frequency}`, COL_WHT);
      drawText(33, 21 + i * 8, `${list[i].duration}`, COL_WHT);
    }
    drawCircle(6, 23 + selected * 8, 2, COL_CYN);
  }

  if (state == 'init') {
    if (isJustPressed(BTN_U) || isJustPressed(BTN_D) || isJustPressed(BTN_L) || isJustPressed(BTN_R) || isJustPressed(BTN_A) || isJustPressed(BTN_B)) {
      state = 'main';
    }
  }
}
