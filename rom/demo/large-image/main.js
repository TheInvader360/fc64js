const w = 240;
const h = 160;
const margin = 5;
const startX = -40;
const startY = -22;
let pos = {x: startX, y: startY};

function romInit() {}

function romLoop() {
  if (isPressed(BTN_U) && pos.y < margin) {
    pos.y++;
  }
  if (isPressed(BTN_D) && pos.y > GFX_H - h - margin) {
    pos.y--;
  }
  if (isPressed(BTN_L) && pos.x < margin) {
    pos.x++;
  }
  if (isPressed(BTN_R) && pos.x > GFX_W - w - margin) {
    pos.x--;
  }
  if (isPressed(BTN_A) || isPressed(BTN_B)) {
    pos = {x: startX, y: startY};
  }
  clearGfx();
  drawImage(pos.x, pos.y, w, h, img);
}
