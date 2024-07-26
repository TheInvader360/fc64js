const parrotUnencodedPixelColors = [
 -1,-1,-1,-1,-1,-1,-1,-1,-1, 7, 7, 6, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
 -1,-1,-1,-1,-1,-1, 7, 6, 6, 6, 7, 2, 7, 7, 6, 7, 6, 6, 6, 6, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,
 -1,-1,-1,-1,-1, 2, 2, 2, 2, 7, 6, 7, 7, 7, 6, 6, 6, 7, 7, 7, 6, 6,-1,-1,-1,-1,-1,-1,-1,-1,
 -1,-1,-1,-1,-1, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 6, 2, 2, 6, 6, 6, 6, 6,-1,-1,-1,-1,-1,-1,-1,
 -1,-1,-1,-1,-1, 0, 0, 2, 7, 0, 7, 7, 7, 6, 6, 7, 7, 7, 2, 2, 7, 7, 7, 6,-1,-1,-1,-1,-1,-1,
 -1,-1,-1,-1, 0, 7, 7, 2, 7, 7, 7, 7, 7, 6, 2, 7, 2, 6, 6, 6, 2, 2, 7, 6,-1,-1,-1,-1,-1,-1,
 -1,-1,-1,-1, 0, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 2, 6, 2, 7, 2, 2, 2, 2, 7, 7, 6,-1,-1,-1,-1,
 -1,-1,-1,-1, 0, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 2, 2, 7, 2, 2, 2, 2, 7, 7, 2, 2, 6, 7,-1,-1,
 -1,-1,-1,-1, 0, 7, 0, 0, 7, 7, 7, 7, 2, 2, 2, 7, 2, 2, 2, 7, 2, 7, 2, 7, 7, 2, 2, 2, 7,-1,
 -1,-1,-1,-1,-1, 0, 2, 0, 0, 0, 0, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 7, 7, 2, 7, 2, 2, 2, 7,-1,
 -1,-1,-1,-1,-1, 7, 7, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 7, 2, 7, 2, 2, 2, 2, 2, 2, 7, 7, 2,
 -1,-1,-1,-1, 6, 2, 2, 7, 7, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 0, 2, 2, 2,
 -1,-1,-1, 7, 7, 7, 2, 0, 7, 2, 0, 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 7, 2, 7,
 -1,-1,-1, 7, 7, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 7,
 -1,-1, 0, 2, 7, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 3, 0,
 -1, 0, 7, 7, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 7,
  5, 0, 7, 3, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0, 2, 7, 3, 1,
  6, 7, 7, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 7,
  4, 0, 7, 7, 0, 2, 2, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 2, 0, 2, 2, 3, 7,
  0, 0, 0, 2, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 0,
  5, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 0, 2, 7, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 6, 0,
  4, 0, 2, 2, 2, 7, 7, 7, 0, 0, 7, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 6, 5,
  6, 5, 2, 0, 2, 7, 6, 7, 0, 0, 0, 2, 2, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 6, 6,
  4, 7, 0, 0, 2, 6, 6, 0, 0, 0, 2, 2, 2, 2, 7, 7, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 4, 0, 6, 0,
  0, 5, 7, 2, 0, 6, 0, 6, 0, 0, 6, 2, 2, 7, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 7, 4, 0, 0, 0, 0,
  6, 4, 0, 7, 0, 0, 2, 0, 0, 0, 7, 0, 7, 0, 7, 7, 7, 0, 0, 0, 7, 0, 7, 7, 7, 7, 7, 0, 0, 0,
  0, 0, 0, 7, 2, 7, 7, 7, 0, 0, 5, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 5, 0, 0,
  0, 6, 4, 0, 0, 0, 0, 0, 7, 5, 5, 5, 7, 0, 0, 0, 0, 0, 7, 0, 7, 0, 0, 0, 0, 0, 7, 5, 0, 0,
  6, 4, 7, 7, 0, 0, 7, 7, 7, 5, 5, 7, 2, 0, 7, 0, 7, 7, 7, 0, 0, 0, 2, 4, 0, 0, 0, 5, 0, 5,
];
const parrotHexString = 'fffffffff7767fffffffffffffffffffffff766672776766667ffffffffffffff22227677766677766fffffffffffff222227222262266666ffffffffffff0027077766777227776ffffffffff07727777762726662276ffffffffff0770777777726272222776ffffffff077077777772272222772267ffffff0700777722272227272772227ffffff020000227222222277272227ffffff7720002222222727222222772ffff62277222220022222272220222fff777207200022002222022222727fff772020000020000022222222007ff0272220020022202222222722230f07700222222022200000222222007507302220000002220002222202731677020222222000222222022222207407702200220222222220200202237000202222000222222222022022220500202200000022222222222222220002722222002202222222222220060402227770072220222022220202065652027670002200020222020000066470026600022227722020000004060057206060062270770000000740000640700200070707770007077777000000727770057777700000000077500064000007555700000707000007500647700777557207077700024000505';
const parrotB64String = '//////d2f///////////////dmZyd2dmZn/////////yIidnd2Znd2b////////yIiJyIiYiZmZv///////wAnB3dmd3Ind2//////8Hcnd3dicmZiJ2//////8HcHd3d3JiciIndv////8HcHd3d3InIiJ3Imf///8HAHd3IiciJycnciJ////wIAACJyIiIidyciJ////3cgACIiIicnIiIidy//9iJ3IiIgAiIiJyIgIi//d3IHIAAiACIiAiIicn//dyAgAAAgAAAiIiIiAH/wJyIgAgAiICIiIiciIw8HcAIiIiAiIAAAIiIiAHUHMCIgAAACIgACIiICcxZ3AgIiIiAAIiIiAiIiIHQHcCIAIgIiIiIgIAICI3AAICIiAAIiIiIiAiAiIgUAICIAAAAiIiIiIiIiIgACciIiACICIiIiIiIgBgQCIndwByIgIiAiIgICBlZSAnZwACIAAgIiAgAABmRwAmYAAiInciAgAAAEBgBXIGBgBiJwdwAAAAdAAAZAcAIABwcHdwAHB3d3AAAAcndwBXd3cAAAAAB3UABkAAAHVVcAAAcHAAAHUAZHcAd3VXIHB3cAAkAAUF';

// const smileUnencodedPixelColors = [
//   -1,-1,-1, 0, 0, 0, 0,-1,-1,-1,
//   -1,-1, 0, 7, 7, 7, 7, 0,-1,-1,
//   -1, 0, 7, 7, 7, 7, 7, 7, 0,-1,
//    0, 7, 7, 0, 7, 7, 0, 7, 7, 0,
//    0, 7, 7, 0, 7, 7, 0, 7, 7, 0,
//    0, 7, 7, 7, 7, 7, 7, 7, 7, 0,
//    0, 7, 7, 0, 7, 7, 0, 7, 7, 0,
//   -1, 0, 7, 7, 0, 0, 7, 7, 0,-1,
//   -1,-1, 0, 7, 7, 7, 7, 0,-1,-1,
//   -1,-1,-1, 0, 0, 0, 0,-1,-1,-1,
// ];
// const smileHexString = 'fff0000fffff077770fff07777770f0770770770077077077007777777700770770770f07700770fff077770fffff0000fff';
// const smileB64String = '//AAD///B3dw//B3d3cPB3B3B3AHcHcHcAd3d3dwB3B3B3DwdwB3D/8Hd3D///AAD/8';

let parrotDecodedHexStringPixelColors;
let parrotDecodedB64StringPixelColors;

function romInit() {
  parrotDecodedHexStringPixelColors = imageFromHexString(parrotHexString);
  parrotDecodedB64StringPixelColors = imageFromB64String(parrotB64String);
}

function romLoop() {
  clearGfx(COL_WHT);
  drawRectangle(0, 7, 64, 32, COL_MAG, COL_MAG);
  if (isPressed(BTN_A)) {
    drawTextCentered(1, 'DECODED HEX', COL_BLK);
    drawImage(17, 9, 30, 30, parrotDecodedHexStringPixelColors);
    // drawImage(53, 8, 10, 10, hexStringToPixelColors(smileHexString));
    // drawImage(60, 35, 3, 3, hexStringToPixelColors('0123f4567'));
    drawTextCentered(49, '903 BYTES', COL_BLK);
  } else if (isPressed(BTN_B)) {
    drawTextCentered(1, 'DECODED B64', COL_BLK);
    drawImage(17, 9, 30, 30, parrotDecodedB64StringPixelColors);
    // drawImage(53, 8, 10, 10, b64StringToPixelColors(smileB64String));
    // drawImage(60, 35, 3, 3, b64StringToPixelColors('ASP0Vn8'));
    drawTextCentered(49, '603 BYTES', COL_BLK);
  } else {
    drawTextCentered(1, 'UNENCODED ARRAY', COL_BLK);
    drawImage(17, 9, 30, 30, parrotUnencodedPixelColors);
    // drawImage(53, 8, 10, 10, smileUnencodedPixelColors);
    // drawImage(60, 35, 3, 3, [0, 1, 2, 3, -1, 4, 5, 6, 7]);
    drawTextCentered(40, '2764 BYTES', COL_BLK);
    drawTextCentered(46, 'FORMATTED', COL_BLK);
    drawTextCentered(52, '1932 BYTES', COL_BLK);
    drawTextCentered(58, 'STRIPPED', COL_BLK);
  }
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
*/

const drawTextCentered = (y, content, color) => drawText((64 - content.length * 4) / 2, y, content, color);
