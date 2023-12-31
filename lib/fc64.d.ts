import { fontDefinition } from '../src/font';

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

// rom lifecycle hooks
declare function romInit(): void;
declare function romLoop(): void;

// low level memory access
declare function peek(address: number): number;
declare function poke(address: number, value: number): void;

// developer api
declare function beep(frequency: number, duration: number, force: boolean): void;
declare function clearGfx(color?: number): void;
declare function drawCircle(centerX: number, centerY: number, radius: number, edgeColor: number, fillColor?: number): void;
declare function drawImage(x: number, y: number, width: number, height: number, pixelColors: number[]): void;
declare function drawLine(x1: number, y1: number, x2: number, y2: number, color: number): void;
declare function drawPattern(pixels: number[], x: number, y: number, color: number): void;
declare function drawPixel(x: number, y: number, color: number): void;
declare function drawRectangle(x: number, y: number, width: number, height: number, edgeColor: number, fillColor?: number): void;
declare function drawText(content: string, x: number, y: number, color: number, options?: { font?: fontDefinition, tracking?: number }): void;
declare function getFps(): number;
declare function getPixel(x: number, y: number): number;
declare function isJustPressed(btn: number): boolean;
declare function isJustReleased(btn: number): boolean;
declare function isPressed(btn: number): boolean;

// handy utils
declare function clamp(value: number, min: number, max: number): number;
declare function isEmptyObject(object: object): boolean;
declare function randomInt(min: number, max: number): number;
declare function swapImageColors(originalPixels: number[], oldValues: number[], newValues: number[]): number[];
declare function wrap(value: number, max: number): number;
