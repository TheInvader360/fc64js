import * as button from './button';
import * as color from './color';
import * as display from './display';
import * as font from './font';
import * as memory from './memory';

export function beep(frequency: number, duration: number, force: boolean): void {
  // play beep if one isn't currently playing, or replace the currently playing one if set to force
  if (memory.peek(memory.ADDRESS_AUD + 1) <= 0 || force) {
    memory.poke(memory.ADDRESS_AUD, Math.floor(frequency));
    memory.poke(memory.ADDRESS_AUD + 1, Math.floor(duration));
  }
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

export function drawImage(x: number, y: number, width: number, height: number, pixelColors: number[], options?: { flipX?: boolean; flipY?: boolean }): void {
  const pixelColorsClone = [...pixelColors];
  if (options) {
    const pixelColors2D = [];
    while (pixelColorsClone.length) {
      pixelColors2D.push(pixelColorsClone.splice(0, width));
    }
    if (options.flipX) {
      for (let row = 0; row < height; row++) {
        pixelColors2D[row].reverse();
      }
    }
    if (options.flipY) {
      pixelColors2D.reverse();
    }
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        pixelColorsClone[row * width + col] = pixelColors2D[row][col];
      }
    }
  }

  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const pc = pixelColorsClone[i + j * width];
      if (pc >= 0) {
        drawPixel(x + i, y + j, pc);
      }
    }
  }
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

export function drawPattern(x: number, y: number, pixels: number[], color: number): void {
  for (let i = 0; i < pixels.length; i += 2) {
    const offsetX = pixels[i];
    const offsetY = pixels[i + 1];
    drawPixel(x + offsetX, y + offsetY, color);
  }
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

export function drawText(x: number, y: number, content: string, color: number, options?: { font?: font.fontDefinition; tracking?: number }): void {
  const f = options?.font ? options.font : font.defaultFont;
  const t = options?.tracking >= 0 ? options.tracking : f.charTrackingDefault;
  let cursor = x;
  for (let i = 0; i < content.length; i++) {
    drawChar(content.charAt(i), f, cursor, y, color);
    cursor += f.charWidth + t;
  }
}

function drawChar(char: string, font: font.fontDefinition, x: number, y: number, color: number): void {
  const pattern = font.charMap[char.charCodeAt(0) - 32];
  for (let i = 0; i < font.charWidth; i++) {
    for (let j = 0; j < font.charHeight; j++) {
      if (pattern[i + j * font.charWidth] === 1) {
        drawPixel(x + i, y + j, color);
      }
    }
  }
}

export function getFps(): number {
  return memory.peek(memory.ADDRESS_FPS);
}

export function getPixel(x: number, y: number): number {
  if (x < 0 || x >= display.GFX_W || y < 0 || y >= display.GFX_H) {
    return -1;
  }
  return memory.peek(memory.ADDRESS_GFX + (x | 0) + (y | 0) * display.GFX_W);
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
