export type RGB = { r: number; g: number; b: number };
export const palette: RGB[] = [];

export const COL_BLK = 0;
export const COL_BLU = 1;
export const COL_RED = 2;
export const COL_MAG = 3;
export const COL_GRN = 4;
export const COL_CYN = 5;
export const COL_YEL = 6;
export const COL_WHT = 7;

export function init(romPalette: number[]) {
  for (let i = 0; i <= 7; i++) {
    const n = romPalette[i];
    const r = (n & 0xff0000) >> 16;
    const g = (n & 0xff00) >> 8;
    const b = n & 0xff;
    palette.push({ r, g, b });
  }
}
