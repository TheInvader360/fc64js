export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export function isEmptyObject(object: object): boolean {
  return Object.keys(object).length === 0 && object.constructor === Object;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function swapImageColors(originalPixels: number[], oldValues: number[], newValues: number[]): number[] {
  if (oldValues.length != newValues.length) {
    throw new Error('mismatched old/new list lengths');
  }
  const newPixels: number[] = [...originalPixels];
  for (let i = 0; i < oldValues.length; i++) {
    for (let j = 0; j < originalPixels.length; j++) {
      if (originalPixels[j] === oldValues[i]) {
        newPixels[j] = newValues[i];
      }
    }
  }
  return newPixels;
}

export function wrap(value: number, minInclusive: number, maxExclusive: number): number {
  // e.g. wrap(-3, 0, 2) = 1, wrap(-2, 0, 2) = 0, wrap(-1, 0, 2) = 1, wrap(0, 0, 2) = 0, wrap(1, 0, 2) = 1, wrap(2, 0, 2) = 0, wrap(3, 0, 2) = 1...
  const range = maxExclusive - minInclusive;
  return minInclusive + ((((value - minInclusive) % range) + range) % range);
}
