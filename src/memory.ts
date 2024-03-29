export const ADDRESS_GFX = 0;
export const ADDRESS_BTN = 4096;
export const ADDRESS_AUD = 4102;
export const ADDRESS_FPS = 4104;
const ADDRESS_MAX = 4104;

const ram: number[] = [];

export function init(): void {
  ram.length = 0;
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
