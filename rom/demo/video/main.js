const ticksPerFrame = 4; // 15fps
let ticks = 0;
let decodedB64Frames = [];

romPalette = [0x000000, 0x222222, 0x444444, 0x666666, 0x888888, 0xaaaaaa, 0xcccccc, 0xeeeeee];


function romInit() {
  for (const frame of b64EncodedVideoFrames) {
    decodedB64Frames.push(b64StringToPixelColors(frame));
  }
}

function romLoop() {
  ticks++;
  if (ticks % ticksPerFrame === 0) drawImage(0, 0, 64, 64, decodedB64Frames[ticks / ticksPerFrame % decodedB64Frames.length]);
}

/*
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
*/

const b64StringToPixelColors = (b64String) => {
  const padCount = Math.ceil(b64String.length / 4) * 4;
  const b64StringPadded = b64String.padEnd(padCount, '=');
  const binaryString = atob(b64StringPadded);
  const pixelColors = [];
  for (let i = 0; i < binaryString.length; i++) {
    const byte = binaryString.charCodeAt(i);
    let pixel1 = (byte >> 4) & 0b00001111;
    let pixel2 = byte & 0b00001111;
    pixelColors.push(pixel1 === 15 ? -1 : pixel1, pixel2 === 15 ? -1 : pixel2);
  }
  return pixelColors;
}
