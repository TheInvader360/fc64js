import * as api from '../../../src/api';
import * as memory from '../../../src/memory';
import { circles, images, lines, patterns, pixel, pixels, polygons, rectangles, text1, text2 } from '../../fixtures/gfx';
import { getRamAud, getRamGfx } from '../../utils/memory';

describe('beep', () => {
  beforeAll(() => memory.init());
  test('beep with frequency 2000, duration 60, force false (expect 2000, 60 - init)', () => {
    api.beep(2000, 60, false);
    expect(getRamAud()).toEqual([2000, 60]);
  });
  test('beep with frequency 2500, duration 30, force false (expect 2000, 60 - unforced)', () => {
    api.beep(2500, 30, false);
    expect(getRamAud()).toEqual([2000, 60]);
  });
  test('beep with frequency 2750, duration 15, force true (expect 2750, 15 - forced)', () => {
    api.beep(2750, 15, true);
    expect(getRamAud()).toEqual([2750, 15]);
  });
  test('beep with frequency 2900, duration 0, force true (expect 2900, 0 - forced)', () => {
    api.beep(2900, 0, true);
    expect(getRamAud()).toEqual([2900, 0]);
  });
  test('beep with frequency 3000, duration 45, force false (expect 3000, 45 - previous finished)', () => {
    api.beep(3000, 45, false);
    expect(getRamAud()).toEqual([3000, 45]);
  });
});

describe('clearGfx', () => {
  beforeAll(() => memory.init());
  test('clear with color 1', () => {
    api.clearGfx(1);
    expect(getRamGfx()).toEqual(Array(4096).fill(1));
  });
  test('clear with color 0', () => {
    api.clearGfx(0);
    expect(getRamGfx()).toEqual(Array(4096).fill(0));
  });
  test('clear with color 2', () => {
    api.clearGfx(2);
    expect(getRamGfx()).toEqual(Array(4096).fill(2));
  });
  test('clear with default', () => {
    api.clearGfx();
    expect(getRamGfx()).toEqual(Array(4096).fill(0));
  });
});

describe('drawCircle', () => {
  beforeAll(() => memory.init());
  test('draw multiple circles (filled and outline)', () => {
    api.drawCircle(7, 7, 6, 2, 2);
    api.drawCircle(23, 7, 6, 4, 4);
    api.drawCircle(7, 23, 6, 1, 1);
    api.drawCircle(23, 23, 6, 6, 6);
    api.drawCircle(39, 7, 6, 2);
    api.drawCircle(55, 7, 6, 4);
    api.drawCircle(39, 23, 6, 1);
    api.drawCircle(55, 23, 6, 6);
    api.drawCircle(7, 39, 6, 1, 2);
    api.drawCircle(23, 39, 6, 6, 4);
    api.drawCircle(7, 55, 6, 2, 1);
    api.drawCircle(23, 55, 6, 4, 6);
    api.drawCircle(47, 47, 14, 3, 5);
    expect(getRamGfx()).toEqual(circles);
  });
});

describe('drawImage', () => {
  beforeAll(() => memory.init());
  test('draw image that includes transparent pixels in all flip combinations', () => {
    const img = [
      0,-1,-1,-1,-1,-1,-1,-1,-1, 7, 7, 6, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
      0, 0, 0, 0, 0, 0, 7, 6, 6, 6, 7, 2, 7, 7, 6, 7, 6, 6, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,-1,
      0, 0, 0, 0, 0, 2, 2, 2, 2, 7, 6, 7, 7, 7, 6, 6, 6, 7, 7, 7, 6, 6, 0, 0, 0, 0, 0, 0, 0,-1,
      0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 6, 2, 2, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 4,
      0, 0, 0, 0, 0, 0, 0, 2, 7, 0, 7, 7, 7, 6, 6, 7, 7, 7, 2, 2, 7, 7, 7, 6, 0, 0, 0, 7, 0, 4,
      0, 0, 0, 0, 0, 7, 7, 2, 7, 7, 7, 7, 7, 6, 2, 7, 2, 6, 6, 6, 2, 2, 7, 6, 0, 0, 0, 0, 0,-1,
      0, 0, 0, 0, 0, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 2, 6, 2, 7, 2, 2, 2, 2, 7, 7, 6, 0, 0, 0, 5,
      0, 0, 0, 0, 0, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 2, 2, 7, 2, 2, 2, 2, 7, 7, 2, 2, 6, 7, 4, 6,
      0, 0, 0, 0, 0, 7, 0, 0, 7, 7, 7, 7, 2, 2, 2, 7, 2, 2, 2, 7, 2, 7, 2, 7, 7, 2, 2, 2, 7, 4,
      0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 7, 7, 2, 7, 2, 2, 2, 7,-1,
      4, 6, 0, 0, 0, 7, 7, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 7, 2, 7, 2, 2, 2, 2, 2, 2, 7, 7, 2,
      7, 5, 0, 0, 6, 2, 2, 7, 7, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 0, 2, 2, 2,
      0, 0, 0, 7, 7, 7, 2, 0, 7, 2, 0, 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 7, 2, 7,
      0, 0, 0, 7, 7, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 7,
      4, 0, 0, 2, 7, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 3,-1,
      7, 0, 7, 7, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 7,
      5, 0, 7, 3, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0, 2, 7, 3, 1,
      6, 7, 7, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 7,
      4, 0, 7, 7, 0, 2, 2, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 2, 0, 2, 2, 3, 7,
      0, 0, 0, 2, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2,-1,
      5, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,-1,
      0, 0, 2, 7, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 6,-1,
      4, 0, 2, 2, 2, 7, 7, 7, 0, 0, 7, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 6, 5,
      6, 5, 2, 0, 2, 7, 6, 7, 0, 0, 0, 2, 2, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 6, 6,
      4, 7, 0, 0, 2, 6, 6, 0, 0, 0, 2, 2, 2, 2, 7, 7, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 4, 0, 6,-1,
      0, 5, 7, 2, 0, 6, 0, 6, 0, 0, 6, 2, 2, 7, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 7, 4, 0, 0, 0,-1,
      6, 4, 0, 7, 0, 0, 2, 0, 0, 0, 7, 0, 7, 0, 7, 7, 7, 0, 0, 0, 7, 0, 7, 7, 7, 7, 7, 0, 0,-1,
      0, 0, 0, 7, 2, 7, 7, 7, 0, 0, 5, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 5, 0,-1,
      0, 6, 4, 0, 0, 0, 0, 0, 7, 5, 5, 5, 7, 0, 0, 0, 0, 0, 7, 0, 7, 0, 0, 0, 0, 0, 7, 5, 0,-1,
      6, 4, 7, 7, 0, 0, 7, 7, 7, 5, 5, 7, 2, 0, 7, 0, 7, 7, 7, 0, 0, 0, 2, 4, 0, 0, 0, 5, 0, 5,
    ];
    api.drawImage(1, 1, 30, 30, img);
    api.drawImage(33, 1, 30, 30, img, { flipX: true });
    api.drawImage(1, 33, 30, 30, img, { flipY: true });
    api.drawImage(33, 33, 30, 30, img, { flipX: true, flipY: true });
    expect(getRamGfx()).toEqual(images);
  });
});

describe('drawLine', () => {
  beforeAll(() => memory.init());
  test('draw multiple lines (horizontal, vertical, and diagonal)', () => {
    api.drawLine(32, 25, 32, 0, 2);
    api.drawLine(34, 25, 40, 0, 4);
    api.drawLine(35, 25, 48, 0, 1);
    api.drawLine(36, 26, 56, 0, 6);
    api.drawLine(37, 27, 64, 0, 2);
    api.drawLine(38, 28, 64, 8, 4);
    api.drawLine(39, 29, 64, 16, 1);
    api.drawLine(39, 30, 64, 24, 6);
    api.drawLine(39, 32, 64, 32, 2);
    api.drawLine(39, 34, 64, 40, 4);
    api.drawLine(39, 35, 64, 48, 1);
    api.drawLine(38, 36, 64, 56, 6);
    api.drawLine(37, 37, 64, 64, 2);
    api.drawLine(36, 38, 56, 64, 4);
    api.drawLine(35, 39, 48, 64, 1);
    api.drawLine(34, 39, 40, 64, 6);
    api.drawLine(32, 39, 32, 64, 2);
    api.drawLine(30, 39, 24, 64, 4);
    api.drawLine(29, 39, 16, 64, 1);
    api.drawLine(28, 38, 8, 64, 6);
    api.drawLine(27, 37, 0, 64, 2);
    api.drawLine(26, 36, 0, 56, 4);
    api.drawLine(25, 35, 0, 48, 1);
    api.drawLine(25, 34, 0, 40, 6);
    api.drawLine(25, 32, 0, 32, 2);
    api.drawLine(25, 30, 0, 24, 4);
    api.drawLine(25, 29, 0, 16, 1);
    api.drawLine(26, 28, 0, 8, 6);
    api.drawLine(27, 27, 0, 0, 2);
    api.drawLine(28, 26, 8, 0, 4);
    api.drawLine(29, 25, 16, 0, 1);
    api.drawLine(30, 25, 24, 0, 6);
    expect(getRamGfx()).toEqual(lines);
  });
});

describe('drawPattern', () => {
  beforeAll(() => memory.init());
  test('draw multiple patterns', () => {
    const p1 = [-2,-1, -1,-2, 1,-2, 2,-1, 2,1, 1,2, -1,2, -2,1];
    const p2 = [0,-1, 0,-2, -1,0, -2,0, 1,0, 2,0, 0,1, 0,2];
    const p3 = [0,-2, 1,-1, 2,0, 1,1, 0,2, -1,1, -2,0, -1,-1];
    const p4 = [0,0, -2,-1, -3,-2, 2,-1, 3,-2, -2,1, -3,2, 2,1, 3,2];
    const p5 = [0,0, -1,-1, -2,-1, -1,-2, 1,-1, 2,-1, 1,-2, 1,1, 2,1, 1,2, -1,1, -2,1, -1,2];
    const p6 = [0,0, -1,-1, -1,-2, -1,-3, 1,-1, 1,-2, 1,-3, 1,1, 1,2, 1,3, -1,1, -1,2, -1,3];
    const p7 = [-1,-1, 1,-1, 1,1, -1,1];
    api.drawPattern(58, 5, p1, 1);
    api.drawPattern(27, 16, p1, 1);
    api.drawPattern(58, 34, p1, 1);
    api.drawPattern(18, 37, p1, 1);
    api.drawPattern(34, 8, p2, 2);
    api.drawPattern(29, 37, p2, 2);
    api.drawPattern(6, 44, p2, 2);
    api.drawPattern(58, 58, p2, 2);
    api.drawPattern(18, 8, p3, 3);
    api.drawPattern(60, 21, p3, 3);
    api.drawPattern(35, 27, p3, 3);
    api.drawPattern(5, 58, p3, 3);
    api.drawPattern(42, 17, p4, 4);
    api.drawPattern(19, 24, p4, 4);
    api.drawPattern(56, 46, p4, 4);
    api.drawPattern(21, 58, p4, 4);
    api.drawPattern(43, 8, p5, 5);
    api.drawPattern(6, 30, p5, 5);
    api.drawPattern(46, 33, p5, 5);
    api.drawPattern(27, 48, p5, 5);
    api.drawPattern(8, 18, p6, 6);
    api.drawPattern(52, 18, p6, 6);
    api.drawPattern(43, 44, p6, 6);
    api.drawPattern(35, 55, p6, 6);
    api.drawPattern(4, 4, p7, 7);
    api.drawPattern(50, 4, p7, 7);
    api.drawPattern(13, 51, p7, 7);
    api.drawPattern(46, 55, p7, 7);
    expect(getRamGfx()).toEqual(patterns);
  });
});

describe('drawPixel', () => {
  beforeEach(() => memory.init());
  test('try to draw a pixel off the left edge of the screen', () => {
    api.drawPixel(-1, 32, 1);
    expect(getRamGfx()).toEqual(Array(4096).fill(0));
  });
  test('try to draw a pixel off the right edge of the screen', () => {
    api.drawPixel(64, 32, 1);
    expect(getRamGfx()).toEqual(Array(4096).fill(0));
  });
  test('try to draw a pixel off the top edge of the screen', () => {
    api.drawPixel(32, -1, 1);
    expect(getRamGfx()).toEqual(Array(4096).fill(0));
  });
  test('try to draw a pixel off the bottom edge of the screen', () => {
    api.drawPixel(32, 64, 1);
    expect(getRamGfx()).toEqual(Array(4096).fill(0));
  });
  test('draw a single pixel', () => {
    api.drawPixel(32, 32, 7);
    expect(getRamGfx()).toEqual(pixel);
  });
  test('draw multiple pixels', () => {
    api.drawPixel(0, 0, 1);
    api.drawPixel(12, 35, 1);
    api.drawPixel(58, 3, 1);
    api.drawPixel(34, 52, 2);
    api.drawPixel(22, 62, 2);
    api.drawPixel(7, 19, 2);
    api.drawPixel(51, 55, 3);
    api.drawPixel(60, 33, 3);
    api.drawPixel(24, 24, 3);
    api.drawPixel(62, 47, 4);
    api.drawPixel(57, 21, 4);
    api.drawPixel(0, 63, 4);
    api.drawPixel(43, 27, 5);
    api.drawPixel(44, 15, 5);
    api.drawPixel(20, 44, 5);
    api.drawPixel(21, 11, 6);
    api.drawPixel(36, 46, 6);
    api.drawPixel(3, 36, 6);
    api.drawPixel(12, 55, 7);
    api.drawPixel(63, 63, 7);
    api.drawPixel(32, 1, 7);
    api.drawPixel(63, 0, 4);
    api.drawPixel(63, 1, 4);
    api.drawPixel(63, 2, 4);
    api.drawPixel(63, 1, 0); // replace 4 with 0
    api.drawPixel(63, 2, 2); // replace 4 with 2
    expect(getRamGfx()).toEqual(pixels);
  });
});

describe('drawPolygon', () => {
  beforeAll(() => memory.init());
  test('draw multiple polygons (filled and outline)', () => {
    api.drawPolygon([{ x: 15, y:  1 }, { x: 30, y: 11 }, { x: 24, y: 29 }, { x:  6, y: 29 }, { x:  0, y: 11 }], 4);
    api.drawPolygon([{ x: 48, y:  1 }, { x: 63, y: 11 }, { x: 57, y: 29 }, { x: 39, y: 29 }, { x: 33, y: 11 }], 2, 1);
    api.drawPolygon([{ x:  0, y: 33 }, { x: 12, y: 61 }, { x: 20, y: 48 }, { x: 25, y: 58 }, { x: 30, y: 39 }], 6);
    api.drawPolygon([{ x: 33, y: 33 }, { x: 45, y: 61 }, { x: 53, y: 48 }, { x: 58, y: 58 }, { x: 63, y: 39 }], 3, 5);
    expect(getRamGfx()).toEqual(polygons);
  });
});

describe('drawRectangle', () => {
  beforeAll(() => memory.init());
  test('draw multiple rectangles (filled and outline)', () => {
    api.drawRectangle(30, 30, -30, -30, 2);
    api.drawRectangle(25, 25, -20, -20, 2, 2);
    api.drawRectangle(33, 30, 30, -30, 6);
    api.drawRectangle(38, 25, 20, -20, 6, 6);
    api.drawRectangle(33, 33, 30, 30, 1);
    api.drawRectangle(38, 38, 20, 20, 1, 1);
    api.drawRectangle(30, 33, -30, 30, 4);
    api.drawRectangle(25, 38, -20, 20, 4, 4);
    expect(getRamGfx()).toEqual(rectangles);
  });
});

describe('drawText', () => {
  beforeEach(() => memory.init());
  test('draw character map using default font', () => {
    api.drawText(1, 6, ' !"#$%&\'()*+,-./', 1);
    api.drawText(1, 12, '0123456789', 2);
    api.drawText(1, 18, ':;<=>?@', 3);
    api.drawText(1, 24, 'ABCDEFGHIJKLM', 4);
    api.drawText(1, 30, 'NOPQRSTUVWXYZ', 4);
    api.drawText(1, 36, '[\\]^_`', 5);
    api.drawText(1, 42, 'abcdefghijklm', 6);
    api.drawText(1, 48, 'nopqrstuvwxyz', 6);
    api.drawText(1, 54, '{|}~', 7);
    expect(getRamGfx()).toEqual(text1);
  });
  test('draw text using custom font and variable tracking', () => {
    const font = { charWidth: 7, charHeight: 8, charTrackingDefault: 1, charMap: [
      [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
      [1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,1,1,1,1,1,0,0,0,0,1,0,1,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//E
      [],[],
      [1,1,1,1,1,1,1,1,0,0,1,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],//H
      [],[],[],
      [1,1,1,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//L
      [],[],
      [1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,1,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//O
      [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
    ]};
    api.drawText(1, 1, 'HELLO', 1, { tracking: 0, font: font });
    api.drawText(1, 10, 'HELLO', 2, { font: font });
    api.drawText(1, 19, 'HELLO', 3, { tracking: 2, font: font });
    api.drawText(1, 28, 'HELLO', 4, { tracking: 3, font: font });
    api.drawText(1, 37, 'HELLO', 5, { tracking: 4, font: font });
    api.drawText(1, 46, 'HELLO', 6, { tracking: 5, font: font });
    api.drawText(1, 55, 'HELLO', 7, { tracking: 6, font: font });
    expect(getRamGfx()).toEqual(text2);
  });
});

describe('getFps', () => {
  beforeAll(() => memory.init());
  test('retrieve fps value (expect 0)', () => {
    expect(api.getFps()).toBe(0);
  });
  test('set fps value then retrieve it again (expect 60)', () => {
    memory.poke(4104, 60);
    expect(api.getFps()).toBe(60);
  });
});

describe('getPixel', () => {
  beforeAll(() => memory.init());
  test('try to get a pixel off the left edge of the screen', () => {
    expect(api.getPixel(-1, 32)).toBe(-1);
  });
  test('try to get a pixel off the right edge of the screen', () => {
    expect(api.getPixel(64, 32)).toBe(-1);
  });
  test('try to get a pixel off the top edge of the screen', () => {
    expect(api.getPixel(32, -1)).toBe(-1);
  });
  test('try to get a pixel off the bottom edge of the screen', () => {
    expect(api.getPixel(32, 64)).toBe(-1);
  });
  test('retrieve pixel value (expect 0)', () => {
    expect(api.getPixel(32, 32)).toBe(0);
  });
  test('draw pixel then retrieve value again (expect 7)', () => {
    api.drawPixel(32, 32, 7);
    expect(api.getPixel(32, 32)).toBe(7);
  });
});

describe('isJustPressed & isJustReleased & isPressed', () => {
  beforeAll(() => memory.init()); // all values 0 - not currently pressed and not only just released
  test('poll button states', () => {
    expect(api.isJustPressed(0)).toBe(false);
    expect(api.isJustPressed(1)).toBe(false);
    expect(api.isJustPressed(2)).toBe(false);
    expect(api.isJustPressed(3)).toBe(false);
    expect(api.isJustPressed(4)).toBe(false);
    expect(api.isJustPressed(5)).toBe(false);
    expect(api.isJustReleased(0)).toBe(false);
    expect(api.isJustReleased(1)).toBe(false);
    expect(api.isJustReleased(2)).toBe(false);
    expect(api.isJustReleased(3)).toBe(false);
    expect(api.isJustReleased(4)).toBe(false);
    expect(api.isJustReleased(5)).toBe(false);
    expect(api.isPressed(0)).toBe(false);
    expect(api.isPressed(1)).toBe(false);
    expect(api.isPressed(2)).toBe(false);
    expect(api.isPressed(3)).toBe(false);
    expect(api.isPressed(4)).toBe(false);
    expect(api.isPressed(5)).toBe(false);
  });
  test('set various button states then poll again', () => {
    memory.poke(4096, 1); // button 0 - currently pressed but not only just pressed in the last tick (value 1)
    memory.poke(4098, 3); // button 2 - currently pressed and was only just pressed in the last tick (value 3 i.e. 1+2)
    memory.poke(4100, 4); // button 4 - not currently pressed and was only just released in the last tick (value 4)
    expect(api.isJustPressed(0)).toBe(false);
    expect(api.isJustPressed(1)).toBe(false);
    expect(api.isJustPressed(2)).toBe(true);
    expect(api.isJustPressed(3)).toBe(false);
    expect(api.isJustPressed(4)).toBe(false);
    expect(api.isJustPressed(5)).toBe(false);
    expect(api.isJustReleased(0)).toBe(false);
    expect(api.isJustReleased(1)).toBe(false);
    expect(api.isJustReleased(2)).toBe(false);
    expect(api.isJustReleased(3)).toBe(false);
    expect(api.isJustReleased(4)).toBe(true);
    expect(api.isJustReleased(5)).toBe(false);
    expect(api.isPressed(0)).toBe(true);
    expect(api.isPressed(1)).toBe(false);
    expect(api.isPressed(2)).toBe(true);
    expect(api.isPressed(3)).toBe(false);
    expect(api.isPressed(4)).toBe(false);
    expect(api.isPressed(5)).toBe(false);
  });
});
