function loopGameOver() {
  //if (stateTicks > 6 && (isJustPressed(BTN_U) || isJustPressed(BTN_D) || isJustPressed(BTN_L) || isJustPressed(BTN_R) || isJustPressed(BTN_A) || isJustPressed(BTN_B))) resetGame();
  clearGfx();
  drawImage(0, 0, 64, 64, images.get('screenStaticGameOver'));
  drawText(0, 37, 'GOLD', COL_WHT);
  drawText(0, 43, `${player.gold}`, COL_WHT);
}
