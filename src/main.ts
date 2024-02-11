import * as audio from './audio';
import * as button from './button';
import * as color from './color';
import * as display from './display';
import * as gamepadExternal from './gamepadExternal';
import * as gamepadTouch from './gamepadTouch';
import * as keyboard from './keyboard';
import * as memory from './memory';

export * from './api';
export * from './classes';
export * from './utils';
export { BTN_U, BTN_D, BTN_L, BTN_R, BTN_A, BTN_B } from './button';
export { COL_BLK, COL_BLU, COL_RED, COL_MAG, COL_GRN, COL_CYN, COL_YEL, COL_WHT } from './color';
export { GFX_W, GFX_H } from './display';
export { ADDRESS_GFX, ADDRESS_BTN, ADDRESS_AUD, ADDRESS_FPS, peek, poke } from './memory';

declare const window: {
  romInit: () => void;
  romLoop: () => void;
  romPalette: number[];
} & Window;

declare function romInit(): void;
declare function romLoop(): void;

let canvas: HTMLCanvasElement;
let canvasCtx: CanvasRenderingContext2D;
let screenImageData: ImageData;
let lastFrameAt = performance.now();
const caseUnscaledWidth = 72;
const caseUnscaledHeight = 128;
const displayOffsetUnscaledX = 4;
const displayOffsetUnscaledY = 4;

window.addEventListener('load', onLoad);
window.romPalette = [0x000000, 0x0000ff, 0xff0000, 0xff00ff, 0x00ff00, 0x00ffff, 0xffff00, 0xffffff]; // BLK, BLU, RED, MAG, GRN, CYN, YEL, WHT

export function fc64Init(romInit: () => void, romLoop: () => void, romPalette?: number[]) {
  window.romInit = romInit;
  window.romLoop = romLoop;
  if (romPalette) {
    window.romPalette = romPalette;
  }
}

function onLoad() {
  memory.init();
  audio.init();
  keyboard.init();
  initCanvas();
  gamepadExternal.init();
  gamepadTouch.init(canvas, caseUnscaledWidth, caseUnscaledHeight);
  romInit();
  color.init(window.romPalette);
  window.requestAnimationFrame(mainLoop);
}

function mainLoop(now: number) {
  // throttle framerate to max 60fps
  if (now - lastFrameAt > 1000 / 61) {
    memory.poke(memory.ADDRESS_FPS, Math.round(1000 / (now - lastFrameAt)));
    lastFrameAt = now;
    keyboard.update();
    gamepadExternal.update();
    gamepadTouch.update();
    updateBtn();
    updateAud();
    romLoop();
    updateGfx();
  }
  window.requestAnimationFrame(mainLoop); // keep requesting new frames
}

function updateBtn() {
  for (let i = 0; i < 6; i++) {
    let k = 0;

    if (keyboard.buttons[i].isPressed || gamepadExternal.buttons[i].isPressed || gamepadTouch.buttons[i].isPressed) {
      k |= button.STATE_PRESSED;
    }
    if (keyboard.buttons[i].isJustPressed || gamepadExternal.buttons[i].isJustPressed || gamepadTouch.buttons[i].isJustPressed) {
      k |= button.STATE_JUST_PRESSED;
    }
    if (keyboard.buttons[i].isJustReleased || gamepadExternal.buttons[i].isJustReleased || gamepadTouch.buttons[i].isJustReleased) {
      k |= button.STATE_JUST_RELEASED;
    }

    memory.poke(memory.ADDRESS_BTN + i, k);
  }
}

function updateAud() {
  const frequency = memory.peek(memory.ADDRESS_AUD);
  const duration = memory.peek(memory.ADDRESS_AUD + 1);
  frequency > 0 && duration > 0 ? audio.on(frequency) : audio.off();
  if (duration > 0) {
    memory.poke(memory.ADDRESS_AUD + 1, duration - 1);
  }
}

function updateGfx() {
  for (let i = memory.ADDRESS_GFX; i < memory.ADDRESS_GFX + display.GFX_W * display.GFX_H; i++) {
    const pixelColor = color.palette[memory.peek(i)];
    screenImageData.data[i * 4 + 0] = pixelColor.r;
    screenImageData.data[i * 4 + 1] = pixelColor.g;
    screenImageData.data[i * 4 + 2] = pixelColor.b;
    screenImageData.data[i * 4 + 3] = 255;
  }
  canvasCtx.putImageData(screenImageData, displayOffsetUnscaledX, displayOffsetUnscaledY);
}

function initCanvas() {
  const bodyCss = '-webkit-touch-callout: none; -webkit-tap-highlight-color: #000; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background: #000; color: #888;';
  const canvasCss = 'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #000};';
  const crispCss = 'image-rendering: -moz-crisp-edges; image-rendering: -webkit-optimize-contrast; image-rendering: -o-crisp-edges; image-rendering: pixelated;';
  document.body.style.cssText = bodyCss;
  canvas = document.createElement('canvas');
  canvas.width = caseUnscaledWidth;
  canvas.height = caseUnscaledHeight;
  canvasCtx = canvas.getContext('2d', { alpha: false });
  canvasCtx.imageSmoothingEnabled = false;
  canvas.style.cssText = canvasCss + crispCss;
  canvasCtx.fillStyle = '#ddd';
  canvasCtx.fillRect(0, 0, caseUnscaledWidth, caseUnscaledHeight); // case
  canvasCtx.fillStyle = '#333';
  canvasCtx.fillRect(displayOffsetUnscaledX - 1, displayOffsetUnscaledY - 1, display.GFX_W + 2, display.GFX_H + 2); // bezel
  const setSize = () => {
    const windowRatio = innerWidth / innerHeight;
    const canvasRatio = caseUnscaledWidth / caseUnscaledHeight;
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
