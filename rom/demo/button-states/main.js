class Indicator {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
  }
  trigger(l) {
    this.l = l;
  }
  updateAndDraw() {
    this.l > 0 ? drawCircle(this.x, this.y, 2, this.c, this.c) : drawCircle(this.x, this.y, 2, this.c);
    this.l--;
  }
}

const indicators = new Map([
  ['U-P', new Indicator(26, 16, COL_BLU)],
  ['U-JP', new Indicator(38, 16, COL_BLU)],
  ['U-JR', new Indicator(50, 16, COL_BLU)],
  ['D-P', new Indicator(26, 24, COL_RED)],
  ['D-JP', new Indicator(38, 24, COL_RED)],
  ['D-JR', new Indicator(50, 24, COL_RED)],
  ['L-P', new Indicator(26, 32, COL_MAG)],
  ['L-JP', new Indicator(38, 32, COL_MAG)],
  ['L-JR', new Indicator(50, 32, COL_MAG)],
  ['R-P', new Indicator(26, 40, COL_GRN)],
  ['R-JP', new Indicator(38, 40, COL_GRN)],
  ['R-JR', new Indicator(50, 40, COL_GRN)],
  ['A-P', new Indicator(26, 48, COL_CYN)],
  ['A-JP', new Indicator(38, 48, COL_CYN)],
  ['A-JR', new Indicator(50, 48, COL_CYN)],
  ['B-P', new Indicator(26, 56, COL_YEL)],
  ['B-JP', new Indicator(38, 56, COL_YEL)],
  ['B-JR', new Indicator(50, 56, COL_YEL)],
]);

function romInit() {}

function romLoop() {
  clearGfx();

  drawText('P', 25, 6, COL_WHT);
  drawText('JP JR', 35, 6, COL_WHT);
  drawText('U', 13, 14, COL_BLU);
  drawText('D', 13, 22, COL_RED);
  drawText('L', 13, 30, COL_MAG);
  drawText('R', 13, 38, COL_GRN);
  drawText('A', 13, 46, COL_CYN);
  drawText('B', 13, 54, COL_YEL);

  if (isPressed(BTN_U)) {
    indicators.get('U-P').trigger(1);
  }
  if (isJustPressed(BTN_U)) {
    indicators.get('U-JP').trigger(12);
  }
  if (isJustReleased(BTN_U)) {
    indicators.get('U-JR').trigger(12);
  }
  if (isPressed(BTN_D)) {
    indicators.get('D-P').trigger(1);
  }
  if (isJustPressed(BTN_D)) {
    indicators.get('D-JP').trigger(12);
  }
  if (isJustReleased(BTN_D)) {
    indicators.get('D-JR').trigger(12);
  }
  if (isPressed(BTN_L)) {
    indicators.get('L-P').trigger(1);
  }
  if (isJustPressed(BTN_L)) {
    indicators.get('L-JP').trigger(12);
  }
  if (isJustReleased(BTN_L)) {
    indicators.get('L-JR').trigger(12);
  }
  if (isPressed(BTN_R)) {
    indicators.get('R-P').trigger(1);
  }
  if (isJustPressed(BTN_R)) {
    indicators.get('R-JP').trigger(12);
  }
  if (isJustReleased(BTN_R)) {
    indicators.get('R-JR').trigger(12);
  }
  if (isPressed(BTN_A)) {
    indicators.get('A-P').trigger(1);
  }
  if (isJustPressed(BTN_A)) {
    indicators.get('A-JP').trigger(12);
  }
  if (isJustReleased(BTN_A)) {
    indicators.get('A-JR').trigger(12);
  }
  if (isPressed(BTN_B)) {
    indicators.get('B-P').trigger(1);
  }
  if (isJustPressed(BTN_B)) {
    indicators.get('B-JP').trigger(12);
  }
  if (isJustReleased(BTN_B)) {
    indicators.get('B-JR').trigger(12);
  }

  indicators.forEach((v) => v.updateAndDraw());
}
