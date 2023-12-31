import * as button from './button';
import * as color from './color';
import * as display from './display';
import * as font from './font';
import * as memory from './memory';

export function beep(frequency: number, duration: number, force: boolean): void {
  //TODO: Implement
  console.log('stub', frequency, duration, force);
}

export function clearGfx(clearColor?: number): void {
  for (let i = memory.ADDRESS_GFX; i < memory.ADDRESS_GFX + display.GFX_W * display.GFX_H; i++) {
    memory.poke(i, clearColor > 0 ? clearColor : color.COL_BLK);
  }
}

export function drawCircle(centerX: number, centerY: number, radius: number, edgeColor: number, fillColor?: number): void {
  if (fillColor >= 0) {
    drawCircleFilled(centerX, centerY, radius, fillColor);
  }
  drawCircleOutline(centerX, centerY, radius, edgeColor);
}

function drawCircleFilled(centerX: number, centerY: number, radius: number, color: number): void {
  let x = 0;
  let y = radius;
  let d = 1 - radius;
  while (x <= y) {
    drawHorizontalLine(centerX - x, centerX + x, centerY - y, color);
    drawHorizontalLine(centerX - y, centerX + y, centerY - x, color);
    drawHorizontalLine(centerX - y, centerX + y, centerY + x, color);
    drawHorizontalLine(centerX - x, centerX + x, centerY + y, color);
    if (d < 0) {
      d += 2 * x + 1;
    } else {
      d += 2 * (x - y) + 1;
      y--;
    }
    x++;
  }
}

function drawCircleOutline(centerX: number, centerY: number, radius: number, color: number): void {
  let x = 0;
  let y = radius;
  let d = 1 - radius;
  while (x <= y) {
    drawPixel(centerX + x, centerY + y, color);
    drawPixel(centerX + x, centerY - y, color);
    drawPixel(centerX - x, centerY + y, color);
    drawPixel(centerX - x, centerY - y, color);
    drawPixel(centerX + y, centerY + x, color);
    drawPixel(centerX + y, centerY - x, color);
    drawPixel(centerX - y, centerY + x, color);
    drawPixel(centerX - y, centerY - x, color);
    if (d < 0) {
      d += 2 * x + 1;
    } else {
      d += 2 * (x - y) + 1;
      y--;
    }
    x++;
  }
}

export function drawImage(x: number, y: number, width: number, height: number, pixelColors: number[]): void {
  //TODO: Implement
  console.log('stub', x, y, width, height, pixelColors);
}

export function drawLine(x1: number, y1: number, x2: number, y2: number, color: number): void {
  if (x1 === x2) {
    drawVerticalLine(x1, y1, y2, color);
  } else if (y1 === y2) {
    drawHorizontalLine(x1, x2, y1, color);
  } else {
    drawDiagonalLine(x1, y1, x2, y2, color);
  }
}

function drawVerticalLine(x: number, y1: number, y2: number, color: number): void {
  if (y1 > y2) {
    const temp = y1;
    y1 = y2;
    y2 = temp;
  }
  for (let i = y1; i <= y2; i++) {
    drawPixel(x, i, color);
  }
}

function drawHorizontalLine(x1: number, x2: number, y: number, color: number): void {
  if (x1 > x2) {
    const temp = x1;
    x1 = x2;
    x2 = temp;
  }
  for (let i = x1; i <= x2; i++) {
    drawPixel(i, y, color);
  }
}

function drawDiagonalLine(x1: number, y1: number, x2: number, y2: number, color: number): void {
  // bresenham's line drawing algorithm
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let e = dx - dy;
  drawPixel(x1, y1, color);
  drawPixel(x2, y2, color);
  while (x1 !== x2 && y1 !== y2) {
    const e2 = e << 1;
    if (e2 > -dy) {
      e -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      e += dx;
      y1 += sy;
    }
    drawPixel(x1, y1, color);
  }
}

export function drawPattern(pixels: number[], x: number, y: number, color: number): void {
  //TODO: Implement
  console.log('stub', pixels, x, y, color);
}

export function drawPixel(x: number, y: number, color: number): void {
  if (x < 0 || x >= display.GFX_W || y < 0 || y >= display.GFX_H) {
    return;
  }
  memory.poke(memory.ADDRESS_GFX + (x | 0) + (y | 0) * display.GFX_W, color);
}

export function drawRectangle(x: number, y: number, width: number, height: number, edgeColor: number, fillColor?: number): void {
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;

  if (width < 0) {
    minX = x + width + 1;
    maxX = x;
  } else {
    minX = x;
    maxX = x + width - 1;
  }

  if (height < 0) {
    minY = y + height + 1;
    maxY = y;
  } else {
    minY = y;
    maxY = y + height - 1;
  }

  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      if (i == minX || i == maxX || j == minY || j == maxY) {
        drawPixel(i, j, edgeColor);
      } else if (fillColor >= 0) {
        drawPixel(i, j, fillColor);
      }
    }
  }
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
  return Boolean(memory.peek(memory.ADDRESS_BTN + btn) & button.STATE_JUST_PRESSED);
}

export function isJustReleased(btn: number): boolean {
  return Boolean(memory.peek(memory.ADDRESS_BTN + btn) & button.STATE_JUST_RELEASED);
}

export function isPressed(btn: number): boolean {
  return Boolean(memory.peek(memory.ADDRESS_BTN + btn) & button.STATE_PRESSED);
}
