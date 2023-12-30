export const ADDRESS_GFX = 0;
export const ADDRESS_BTN = 4096;
export const ADDRESS_FPS = 4102;
const ADDRESS_MAX = 4102;

const ram: number[] = [];

export function init() {
  for (let i = 0; i <= ADDRESS_MAX; i++) {
    ram.push(0);
  }
}

export function peek(address: number): number {
  if (address < 0 || address > ADDRESS_MAX) {
    throw `Invalid address: peek ${address}`;
  }
  return ram[address];
}

export function poke(address: number, value: number): void {
  if (address < 0 || address > ADDRESS_MAX) {
    throw `Invalid address: poke ${address}`;
  }
  ram[address] = value;
}
