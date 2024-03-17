import * as memory from '../../../src/memory';
import { getRam } from '../../utils/memory';

describe('init', () => {
  test('init (expect all ram values to be set to 0)', () => {
    memory.init();
    expect(getRam()).toEqual(Array(4105).fill(0));
  });
});

describe('peek & poke', () => {
  beforeEach(() => memory.init());
  test('peek at invalid ram address -1', () => {
    expect(() => memory.peek(-1)).toThrow('Invalid address: peek -1');
  });
  test('peek at invalid ram address 4105', () => {
    expect(() => memory.peek(4105)).toThrow('Invalid address: peek 4105');
  });
  test('poke into invalid ram address -1', () => {
    expect(() => memory.poke(-1, 3)).toThrow('Invalid address: poke -1');
  });
  test('poke into invalid ram address 4105', () => {
    expect(() => memory.poke(4105, 3)).toThrow('Invalid address: poke 4105');
  });
  test('poke the same value into all ram addresses then peek at all ram addresses', () => {
    for (let i = 0; i <= 4104; i++) {
      memory.poke(i, 3);
      expect(memory.peek(i)).toEqual(3);
    }
  });
  test('poke unique values into some non-contiguous ram addresses then peek at all ram addresses', () => {
    memory.poke(1, 13118);
    memory.poke(12, 11618);
    memory.poke(17, 1217);
    memory.poke(26, 652);
    for (let i = 0; i <= 4104; i++) {
      if (i === 1) {
        expect(memory.peek(i)).toEqual(13118);
      } else if (i === 12) {
        expect(memory.peek(i)).toEqual(11618);
      } else if (i === 17) {
        expect(memory.peek(i)).toEqual(1217);
      } else if (i === 26) {
        expect(memory.peek(i)).toEqual(652);
      } else {
        expect(memory.peek(i)).toEqual(0);
      }
    }
  });
});
