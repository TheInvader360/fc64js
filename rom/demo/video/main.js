const ticksPerFrame = 4; // 15fps
let ticks = 0;
let decodedB64Frames = [];

romPalette = [0x000000, 0x222222, 0x444444, 0x666666, 0x888888, 0xaaaaaa, 0xcccccc, 0xeeeeee];


function romInit() {
  for (const frame of b64EncodedVideoFrames) {
    decodedB64Frames.push(imageFromB64String(frame));
  }
}

function romLoop() {
  ticks++;
  if (ticks % ticksPerFrame === 0) drawImage(0, 0, 64, 64, decodedB64Frames[ticks / ticksPerFrame % decodedB64Frames.length]);
}
