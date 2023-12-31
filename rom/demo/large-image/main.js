const startX = -20;
const startY = -8;
let pos = {x: startX, y: startY};

function romInit() {}

function romLoop() {
  if (isPressed(BTN_U) && pos.y < 4) {
    pos.y++;
  }
  if (isPressed(BTN_D) && pos.y > -20) {
    pos.y--;
  }
  if (isPressed(BTN_L) && pos.x < 4) {
    pos.x++;
  }
  if (isPressed(BTN_R) && pos.x > -60) {
    pos.x--;
  }
  if (isPressed(BTN_A) || isPressed(BTN_B)) {
    pos = {x: startX, y: startY};
  }
  clearGfx();
  drawImage(pos.x, pos.y, 120, 80, img);
}
