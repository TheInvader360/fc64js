import * as utils from '../../../src/utils';

describe('clamp', () => {
  test('clamp -5 to min -3 and max 3 (expect -3)', () => {
    expect(utils.clamp(-5, -3, 3)).toBe(-3);
  });
  test('clamp -3 to min -3 and max 3 (expect -3)', () => {
    expect(utils.clamp(-3, -3, 3)).toBe(-3);
  });
  test('clamp -1 to min -3 and max 3 (expect -1)', () => {
    expect(utils.clamp(-1, -3, 3)).toBe(-1);
  });
  test('clamp 0 to min -3 and max 3 (expect 0)', () => {
    expect(utils.clamp(0, -3, 3)).toBe(0);
  });
  test('clamp 1 to min -3 and max 3 (expect 1)', () => {
    expect(utils.clamp(1, -3, 3)).toBe(1);
  });
  test('clamp 3 to min -3 and max 3 (expect 3)', () => {
    expect(utils.clamp(3, -3, 3)).toBe(3);
  });
  test('clamp 5 to min -3 and max 3 (expect 3)', () => {
    expect(utils.clamp(5, -3, 3)).toBe(3);
  });
});

describe('imageFromB64String', () => {
  test('empty', () => {
    expect(utils.imageFromB64String('')).toEqual([]);
  });
  test('smiley', () => {
    expect(utils.imageFromB64String('//AAD///B3dw//B3d3cPB3B3B3AHcHcHcAd3d3dwB3B3B3DwdwB3D/8Hd3D///AAD/8')).toEqual([-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,0,7,7,7,7,0,-1,-1,-1,0,7,7,7,7,7,7,0,-1,0,7,7,0,7,7,0,7,7,0,0,7,7,0,7,7,0,7,7,0,0,7,7,7,7,7,7,7,7,0,0,7,7,0,7,7,0,7,7,0,-1,0,7,7,0,0,7,7,0,-1,-1,-1,0,7,7,7,7,0,-1,-1,-1,-1,-1,0,0,0,0,-1,-1,-1]);
  });
});

describe('imageFromHexString', () => {
  test('empty', () => {
    expect(utils.imageFromHexString('')).toEqual([]);
  });
  test('smiley', () => {
    expect(utils.imageFromHexString('fff0000fffff077770fff07777770f0770770770077077077007777777700770770770f07700770fff077770fffff0000fff')).toEqual([-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,0,7,7,7,7,0,-1,-1,-1,0,7,7,7,7,7,7,0,-1,0,7,7,0,7,7,0,7,7,0,0,7,7,0,7,7,0,7,7,0,0,7,7,7,7,7,7,7,7,0,0,7,7,0,7,7,0,7,7,0,-1,0,7,7,0,0,7,7,0,-1,-1,-1,0,7,7,7,7,0,-1,-1,-1,-1,-1,0,0,0,0,-1,-1,-1]);
  });
});

describe('isEmptyObject', () => {
  test('empty object', () => {
    expect(utils.isEmptyObject({})).toBe(true);
  });
  test('not empty object', () => {
    expect(utils.isEmptyObject({ foo: 'bar' })).toBe(false);
  });
});

describe('randomInt', () => {
  test('verify that 100 random ints between -5 and 5 are all within the expected range', () => {
    for (let i = 0; i < 100; i++) {
      const val = utils.randomInt(-5, 5);
      expect(val).toBeGreaterThanOrEqual(-5);
      expect(val).toBeLessThanOrEqual(5);
    }
  });
});

describe('swapImageColors', () => {
  test('try swapping colors providing more old values than new values', () => {
    expect(() => utils.swapImageColors([0, 1, 2, 3], [0, 1], [3])).toThrow('mismatched old/new list lengths');
  });
  test('try swapping colors providing less old values than new values', () => {
    expect(() => utils.swapImageColors([0, 1, 2, 3], [0], [3, 2])).toThrow('mismatched old/new list lengths');
  });
  test('swap a single color with an existing color in the original image', () => {
    expect(utils.swapImageColors([0, 1, 2, 3, 3, 2, 1, 0], [1], [3])).toEqual([0, 3, 2, 3, 3, 2, 3, 0]);
  });
  test('swap a single color with a new color not in the original image', () => {
    expect(utils.swapImageColors([0, 1, 2, 3, 3, 2, 1, 0], [2], [5])).toEqual([0, 1, 5, 3, 3, 5, 1, 0]);
  });
  test('swap multiple colors with some existing and some new colors', () => {
    expect(utils.swapImageColors([0, 1, 2, 3, 3, 2, 1, 0], [0, 1, 2, 3], [4, 3, 5, 0])).toEqual([4, 3, 5, 0, 0, 5, 3, 4]);
  });
});

describe('wrap', () => {
  test('wrap -3 to min inclusive 0 and max exclusive 2 (expect 1)', () => {
    expect(utils.wrap(-3, 0, 2)).toBe(1);
  });
  test('wrap -2 to min inclusive 0 and max exclusive 2 (expect 0)', () => {
    expect(utils.wrap(-2, 0, 2)).toBe(0);
  });
  test('wrap -1 to min inclusive 0 and max exclusive 2 (expect 1)', () => {
    expect(utils.wrap(-1, 0, 2)).toBe(1);
  });
  test('wrap 0 to min inclusive 0 and max exclusive 2 (expect 0)', () => {
    expect(utils.wrap(0, 0, 2)).toBe(0);
  });
  test('wrap 1 to min inclusive 0 and max exclusive 2 (expect 1)', () => {
    expect(utils.wrap(1, 0, 2)).toBe(1);
  });
  test('wrap 2 to min inclusive 0 and max exclusive 2 (expect 0)', () => {
    expect(utils.wrap(2, 0, 2)).toBe(0);
  });
  test('wrap 3 to min inclusive 0 and max exclusive 2 (expect 1)', () => {
    expect(utils.wrap(3, 0, 2)).toBe(1);
  });
});
