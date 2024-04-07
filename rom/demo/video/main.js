const ticksPerFrame = 4; // 15fps
let ticks = 0;

romPalette = [0x000000, 0x222222, 0x444444, 0x666666, 0x888888, 0xaaaaaa, 0xcccccc, 0xeeeeee];

function romInit() {}

function romLoop() {
  ticks++;
  if (ticks % ticksPerFrame === 0) drawImage(0, 0, 64, 64, videoFrames[ticks / ticksPerFrame % videoFrames.length]);
}
