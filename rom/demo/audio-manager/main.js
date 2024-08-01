import '../../../lib/fc64.js';
import { sfxCoin, sfxJumpSmall, sfxJumpSuper, sfxOneUp, sfxPipe, sfxPowerUp } from './data.js';
import { AudioManager } from './audioManager.js';

fc64Init(romInit, romLoop);

let audioManager;

function romInit() {
  audioManager = new AudioManager(3);
  drawText(6, 4, 'AUDIO MANAGER', COL_WHT);
  drawText(4, 15, 'U:1UP       P1', COL_GRN);
  drawText(4, 23, 'D:PIPE      P1', COL_GRN);
  drawText(4, 31, 'L:COIN      P2', COL_CYN);
  drawText(4, 39, 'R:POWERUP   P2', COL_CYN);
  drawText(4, 47, 'A:JUMPSMALL P3', COL_BLU);
  drawText(4, 55, 'B:JUMPSUPER P3', COL_BLU);
}

function romLoop() {
  if (isJustPressed(BTN_U)) audioManager.tryPlay(sfxOneUp, 1);
  if (isJustPressed(BTN_D)) audioManager.tryPlay(sfxPipe, 1);
  if (isJustPressed(BTN_L)) audioManager.tryPlay(sfxCoin, 2);
  if (isJustPressed(BTN_R)) audioManager.tryPlay(sfxPowerUp, 2);
  if (isJustPressed(BTN_A)) audioManager.tryPlay(sfxJumpSmall, 3);
  if (isJustPressed(BTN_B)) audioManager.tryPlay(sfxJumpSuper, 3);
  audioManager.update();
}
