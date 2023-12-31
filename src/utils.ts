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

export function swapImageColors(originalPixels: number[], oldValues: number[], newValues: number[]) {
  if (oldValues.length != newValues.length) {
    throw new Error('mismatched old/new list lengths');
  }
  const oldPixels: number[] = [...originalPixels];
  const newPixels: number[] = [...originalPixels];
  for (let i = 0; i < oldValues.length; i++) {
    for (let j = 0; j < oldPixels.length; j++) {
      if (oldPixels[j] === oldValues[i]) {
        newPixels[j] = newValues[i];
      }
    }
  }
  return newPixels;
}

export function wrap(value: number, max: number): number {
  //TODO: Implement
  console.log('stub', value, max);
  return 0;
}
