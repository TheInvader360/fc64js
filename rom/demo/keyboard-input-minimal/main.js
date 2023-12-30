function romInit() {
  console.log('romInit');
}

function romLoop() {
  console.log(`romLoop - fps: ${peek(ADDRESS_FPS)}`);

  let color = COL_BLK;

  if (peek(ADDRESS_BTN + BTN_U) > 0) {
    color = COL_BLU;
  }
  if (peek(ADDRESS_BTN + BTN_D) > 0) {
    color = COL_RED;
  }
  if (peek(ADDRESS_BTN + BTN_L) > 0) {
    color = COL_MAG;
  }
  if (peek(ADDRESS_BTN + BTN_R) > 0) {
    color = COL_GRN;
  }
  if (peek(ADDRESS_BTN + BTN_A) > 0) {
    color = COL_CYN;
  }
  if (peek(ADDRESS_BTN + BTN_B) > 0) {
    color = COL_YEL;
  }

  for (let i = ADDRESS_GFX; i < ADDRESS_GFX + GFX_W * GFX_H; i++) {
    poke(i, color);
  }
}
