export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export function isEmptyObject(object: object): boolean {
  //TODO: Implement
  console.log('stub', object);
  return false;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function swapImageColors(originalPixels: number[], oldValues: number[], newValues: number[]): number[] {
  //TODO: Implement
  console.log('stub', originalPixels, oldValues, newValues);
  return [];
}

export function wrap(value: number, max: number): number {
  //TODO: Implement
  console.log('stub', value, max);
  return 0;
}
