const ticksPerFrame = 4; // 15fps
let ticks = 0;
let decodedHexFrames = [];

romPalette = [0x000000, 0x222222, 0x444444, 0x666666, 0x888888, 0xaaaaaa, 0xcccccc, 0xeeeeee];


function romInit() {
  for (const frame of hexEncodedVideoFrames) {
    decodedHexFrames.push(hexStringToPixelColors(frame));
  }
}

function romLoop() {
  ticks++;
  if (ticks % ticksPerFrame === 0) drawImage(0, 0, 64, 64, decodedHexFrames[ticks / ticksPerFrame % decodedHexFrames.length]);
}

const hexStringToPixelColors = (hexString) => {
  const pixelColors = [];
  for (const hexDigit of hexString) {
    if (hexDigit === 'f') {
      pixelColors.push(-1);
    } else {
      pixelColors.push(parseInt(hexDigit, 16));
    }
  }
  return pixelColors;
}
