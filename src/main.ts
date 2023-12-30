import * as button from './button';
import * as color from './color';
import * as display from './display';
import * as keyboard from './keyboard';
import * as memory from './memory';

export { BTN_U, BTN_D, BTN_L, BTN_R, BTN_A, BTN_B } from './button';
export { COL_BLK, COL_BLU, COL_RED, COL_MAG, COL_GRN, COL_CYN, COL_YEL, COL_WHT } from './color';
export { GFX_W, GFX_H } from './display';
export { ADDRESS_GFX, ADDRESS_BTN, ADDRESS_FPS, peek, poke } from './memory';

declare function romInit(): void;
declare function romLoop(): void;

let canvas: HTMLCanvasElement;
let canvasCtx: CanvasRenderingContext2D;
let colors: color.RGB[];
let screenImageData: ImageData;
let lastFrameAt = performance.now();

window.addEventListener('load', onLoad);

function onLoad() {
  memory.init();
  keyboard.init();
  initColors();
  initCanvas();
  romInit();
  window.requestAnimationFrame(mainLoop);
}

function mainLoop(now: number) {
  // throttle framerate to max 60fps
  if (now - lastFrameAt > 1000 / 61) {
    memory.poke(memory.ADDRESS_FPS, Math.round(1000 / (now - lastFrameAt)));
    lastFrameAt = now;
    keyboard.update();
    updateBtn();
    romLoop();
    updateGfx();
  }
  window.requestAnimationFrame(mainLoop); // keep requesting new frames
}

function updateBtn() {
  for (let i = 0; i < 6; i++) {
    let k = 0;

    if (keyboard.buttons[i].isPressed) {
      k |= button.STATE_PRESSED;
    }
    if (keyboard.buttons[i].isJustPressed) {
      k |= button.STATE_JUST_PRESSED;
    }
    if (keyboard.buttons[i].isJustReleased) {
      k |= button.STATE_JUST_RELEASED;
    }

    memory.poke(memory.ADDRESS_BTN + i, k);
  }
}

function updateGfx() {
  for (let i = memory.ADDRESS_GFX; i < memory.ADDRESS_GFX + display.GFX_W * display.GFX_H; i++) {
    const pixelColor = colors[memory.peek(i)];
    screenImageData.data[i * 4 + 0] = pixelColor.r;
    screenImageData.data[i * 4 + 1] = pixelColor.g;
    screenImageData.data[i * 4 + 2] = pixelColor.b;
    screenImageData.data[i * 4 + 3] = 255;
  }
  canvasCtx.putImageData(screenImageData, 0, 0);
}

function initCanvas() {
  const bodyCss = '-webkit-touch-callout: none; -webkit-tap-highlight-color: #000; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background: #000; color: #888;';
  const canvasCss = 'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #000};';
  const crispCss = 'image-rendering: -moz-crisp-edges; image-rendering: -webkit-optimize-contrast; image-rendering: -o-crisp-edges; image-rendering: pixelated;';
  document.body.style.cssText = bodyCss;
  canvas = document.createElement('canvas');
  canvas.width = display.GFX_H;
  canvas.height = display.GFX_H;
  canvasCtx = canvas.getContext('2d', { alpha: false });
  canvasCtx.imageSmoothingEnabled = false;
  canvas.style.cssText = canvasCss + crispCss;
  const setSize = () => {
    const windowRatio = innerWidth / innerHeight;
    const canvasRatio = display.GFX_W / display.GFX_H;
    const filledHorizontal = windowRatio < canvasRatio;
    const scaledCanvasWidth = filledHorizontal ? innerWidth : innerHeight * canvasRatio;
    const scaledCanvasHeight = !filledHorizontal ? innerHeight : innerWidth / canvasRatio;
    canvas.style.width = `${scaledCanvasWidth}px`;
    canvas.style.height = `${scaledCanvasHeight}px`;
  };
  window.addEventListener('resize', setSize);
  setSize();
  document.body.appendChild(canvas);
  screenImageData = canvasCtx.createImageData(display.GFX_W, display.GFX_H);
}

function initColors() {
  const rgbHex = [0x000000, 0x0000ff, 0xff0000, 0xff00ff, 0x00ff00, 0x00ffff, 0xffff00, 0xffffff]; // BLK, BLU, RED, MAG, GRN, CYN, YEL, WHT
  colors = [];
  for (let i = 0; i <= 7; i++) {
    const n = rgbHex[i];
    const r = (n & 0xff0000) >> 16;
    const g = (n & 0xff00) >> 8;
    const b = n & 0xff;
    colors.push({ r, g, b });
  }
}
