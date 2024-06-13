const background_B64 = 'EREREREREREREXdxERERERERERERERERERERERERERERERERERERERF3d3dxERERERERERERERd3EREREREREXEREXcXd3cRF3d3d3dxd3EREREREREXd3d3F3EREREXd3cXd3d3d3d3d3d3d3d3d3ERd3dxF3d3d3d3d3dxF3d3d3d3d3d3d3d3d3d3d3d3dxd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3dXd3d3d3d3d3dXd1d3d3d3d3d3d3d3d3d3d3d3d3d3dVV3d3VVVVd1VVV1VVV3d3d3dVd1VVd3VVVXd3dVV3d1VVV3VVVVVVVVVVVVVVV3d3dVVVVVVVVVVVVVdVVVd1VVVVVVVVVVVVVVVVVVVVd1VVVVVVVVVVVVVVVVVVVVU' // 64x19
const bird0_B64 = '///yL/ZiIg8iZmIm8iZiL/8iIv8' // 8x5
const bird1_B64 = '///yL/8iIg8mZmIm8iZiL/8iIv8' // 8x5
const bird2_B64 = '///yL/8iIg8iJmIm8mZiL/9iIv8' // 8x5
const ground_B64 = 'JSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSVmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmY' // 64x4
const logo_B64 = '/wAAAAAP/////////////////wAAAP/////////wAPB3d3B3D/////////////////8Hd3cP////////B3AHd3dwdw//////////////////B3d3cP///////wdwB3d3cHcP8AAAAAD/AAAP8AAAAAdwd3AAD/AAD/AHcAdwAAB3Dwd3cHd3Dwd3cPB3B3cHcAdwdw8Hdw8Hd3AHd3dwdwB3d3B3d3AHd3cAdwd3B3B3cHcAd3cAd3dwB3d3cHcHd3dwd3d3B3d3cHcHdwd3dwAAB3d3B3d3cAd3d3B3B3cHcHcHdwdwd3B3B3cHd3dwdwd3cAd3B3AHcAAAdwdwB3B3AHcHcAdwd3d3B3B3cHcHdw8HcAdwB3D/8HcHdwdwdwd3B3B3cHd3dwdwB3B3B3cPB3cHcAdw//B3B3d3cHd3dwd3d3AHd3cHcHdwdwd3Dwd3d3AHcP/wdwd3d3B3d3cHd3dw8Ad3B3d3cHcHdw8Hd3dwB3D/8HcAd3dwd3dwB3d3D/8Hdwd3dwB3B3cP8Hd3cAAA//AADwAAAHdwDwd3AP/wd3cAAADwAAAA//8AAAD///////////B3cP8Hdw//8Hd3D//////////////////////////wd3D/B3cP//B3cP//////////////////////////8AAA/wAAD//wAA////////////////8' // 62x17
const pipe_B64 = 'BEVVQARFVUAERVVABEVVQARFVUAERVVABEVVQARFVUAERVVABEVVQARFVUAERVVABEVVQARFVUAERVVABEVVQARFVUAERVVABEVVQARFVUAERVVABEVVQARFVUAERVVABEVVQARFVUAERVVABEVVQARFVUAERVVABEVVQAAAAAAERVVABEVVQARFVUAAAAAA' // 8x36

const images = new Map();
const animations = new Map();

const loadAssets = () => {
  images.clear();
  images.set('background', imgFromB64(background_B64));
  images.set('bird0', imgFromB64(bird0_B64));
  images.set('bird1', imgFromB64(bird1_B64));
  images.set('bird2', imgFromB64(bird2_B64));
  images.set('ground', imgFromB64(ground_B64));
  images.set('logo', imgFromB64(logo_B64));
  images.set('pipe', imgFromB64(pipe_B64));
  animations.clear();
  animations.set('bird', new Anim([images.get('bird0'), images.get('bird1'), images.get('bird2'), images.get('bird1')], 6, true));
}

const imgFromB64 = (b64) => {
  const padCount = Math.ceil(b64.length / 4) * 4;
  const padded = b64.padEnd(padCount, '=');
  const binStr = atob(padded);
  const img = [];
  for (let i = 0; i < binStr.length; i++) {
    const byte = binStr.charCodeAt(i);
    let pix1 = (byte >> 4) & 0b00001111;
    let pix2 = byte & 0b00001111;
    img.push(pix1 === 15 ? -1 : pix1, pix2 === 15 ? -1 : pix2);
  }
  return img;
}
