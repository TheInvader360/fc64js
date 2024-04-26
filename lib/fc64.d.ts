// global constants
declare const ADDRESS_AUD: number;
declare const ADDRESS_BTN: number;
declare const ADDRESS_FPS: number;
declare const ADDRESS_GFX: number;
declare const GFX_W: number;
declare const GFX_H: number;
declare const COL_BLK: number;
declare const COL_BLU: number;
declare const COL_RED: number;
declare const COL_MAG: number;
declare const COL_GRN: number;
declare const COL_CYN: number;
declare const COL_YEL: number;
declare const COL_WHT: number;
declare const BTN_U: number;
declare const BTN_D: number;
declare const BTN_L: number;
declare const BTN_R: number;
declare const BTN_A: number;
declare const BTN_B: number;

// rom hooks
declare function romInit(): void;
declare function romLoop(): void;
declare let romPalette: number[];

// initialize library
declare function fc64Init(romInit: () => void, romLoop: () => void, romPalette?: number[]): void;

// low level memory access
declare function peek(address: number): number;
declare function poke(address: number, value: number): void;

// developer api
declare function beep(frequency: number, duration: number, force: boolean): void;
declare function clearGfx(color?: number): void;
declare function drawCircle(centerX: number, centerY: number, radius: number, edgeColor: number, fillColor?: number): void;
declare function drawImage(x: number, y: number, width: number, height: number, pixelColors: number[], options?: { flipX?: boolean, flipY?: boolean }): void;
declare function drawLine(x1: number, y1: number, x2: number, y2: number, color: number): void;
declare function drawPattern(x: number, y: number, offsets: number[] | point2[], color: number): void;
declare function drawPixel(x: number, y: number, color: number): void;
declare function drawPolygon(path: number[] | point2[], edgeColor: number, fillColor?: number): void;
declare function drawRectangle(x: number, y: number, width: number, height: number, edgeColor: number, fillColor?: number): void;
declare function drawText(x: number, y: number, content: string, color: number, options?: { font?: fontDefinition, tracking?: number }): void;
declare function getFps(): number;
declare function getPixel(x: number, y: number): number;
declare function isJustPressed(btn: number): boolean;
declare function isJustReleased(btn: number): boolean;
declare function isPressed(btn: number): boolean;

// useful classes
declare class Anim {
  frames: number[][];
  frameTicks: number;
  looping: boolean;
  constructor(frames: number[][], frameTicks: number, looping: boolean);
  getKeyFrame(stateTicks: number): number[];
  isFinished(stateTicks: number): boolean;
}
declare class Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  constructor(x: number, y: number, width: number, height: number);
  overlaps(Rect): boolean;
}
declare class Vec2 {
  x: number;
  y: number;
  constructor(x: number, y: number);
  set(x: number, y: number): void;
  add(x: number, y: number): void;
  scl(scalar: number): void;
  equals(Vec2): boolean;
}

// useful utils
declare function clamp(value: number, min: number, max: number): number;
declare function isEmptyObject(object: object): boolean;
declare function randomInt(min: number, max: number): number;
declare function swapImageColors(originalPixels: number[], oldValues: number[], newValues: number[]): number[];
declare function wrap(value: number, minInclusive: number, maxExclusive: number): number;

// types
declare type fontDefinition = {
  charWidth: number;
  charHeight: number;
  charTrackingDefault: number;
  charMap: number[][]; // characters defined in ascii code order from 32 (space) to 126 (tilde)
}

// interfaces
declare interface point2 {
  x: number;
  y: number;
}
