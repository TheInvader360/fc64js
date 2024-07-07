function loopTitle() {
  if (stateTicks > 6 && (isJustPressed(BTN_U) || isJustPressed(BTN_D) || isJustPressed(BTN_L) || isJustPressed(BTN_R) || isJustPressed(BTN_A) || isJustPressed(BTN_B))) changeState(states.explore);
  clearGfx();
  drawText(14, 28, 'ROGUELIKE', COL_WHT);
}
