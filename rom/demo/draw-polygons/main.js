function romInit() {
  drawPolygon([{ x: 15, y:  1 }, { x: 30, y: 11 }, { x: 24, y: 29 }, { x:  6, y: 29 }, { x:  0, y: 11 }], COL_GRN);
  drawPolygon([{ x: 48, y:  1 }, { x: 63, y: 11 }, { x: 57, y: 29 }, { x: 39, y: 29 }, { x: 33, y: 11 }], COL_RED, COL_BLU);
  drawPolygon([{ x:  0, y: 33 }, { x: 12, y: 61 }, { x: 20, y: 48 }, { x: 25, y: 58 }, { x: 30, y: 39 }], COL_YEL);
  drawPolygon([{ x: 33, y: 33 }, { x: 45, y: 61 }, { x: 53, y: 48 }, { x: 58, y: 58 }, { x: 63, y: 39 }], COL_MAG, COL_CYN);
}

function romLoop() {}
