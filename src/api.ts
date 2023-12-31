import * as font from './font';

export function beep(frequency: number, duration: number, force: boolean): void {
  //TODO: Implement
  console.log('stub', frequency, duration, force);
}

export function clearGfx(clearColor?: number): void {
  //TODO: Implement
  console.log('stub', clearColor);
}

export function drawCircle(centerX: number, centerY: number, radius: number, edgeColor: number, fillColor?: number): void {
  //TODO: Implement
  console.log('stub', centerX, centerY, radius, edgeColor, fillColor);
}

export function drawImage(x: number, y: number, width: number, height: number, pixelColors: number[]): void {
  //TODO: Implement
  console.log('stub', x, y, width, height, pixelColors);
}

export function drawLine(x1: number, y1: number, x2: number, y2: number, color: number): void {
  //TODO: Implement
  console.log('stub', x1, y1, x2, y2, color);
}

export function drawPattern(pixels: number[], x: number, y: number, color: number): void {
  //TODO: Implement
  console.log('stub', pixels, x, y, color);
}

export function drawPixel(x: number, y: number, color: number): void {
  //TODO: Implement
  console.log('stub', x, y, color);
}

export function drawRectangle(x: number, y: number, width: number, height: number, edgeColor: number, fillColor?: number): void {
  //TODO: Implement
  console.log('stub', x, y, width, height, edgeColor, fillColor);
}

export function drawText(content: string, x: number, y: number, color: number, options?: { font?: font.fontDefinition; tracking?: number }): void {
  //TODO: Implement
  console.log('stub', content, x, y, color, options);
}

export function getFps(): number {
  //TODO: Implement
  console.log('stub');
  return 0;
}

export function getPixel(x: number, y: number): number {
  //TODO: Implement
  console.log('stub', x, y);
  return 0;
}

export function isJustPressed(btn: number): boolean {
  //TODO: Implement
  console.log('stub', btn);
  return false;
}

export function isJustReleased(btn: number): boolean {
  //TODO: Implement
  console.log('stub', btn);
  return false;
}

export function isPressed(btn: number): boolean {
  //TODO: Implement
  console.log('stub', btn);
  return false;
}
