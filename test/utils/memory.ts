import { peek } from '../../src/memory';

export const getRam = () => {
  const ram: number[] = [];
  for (let i = 0; i < 4105; i++) {
    ram[i] = peek(i);
  }
  return ram;
}

export const getRamGfx = () => {
  const ramGfx: number[] = [];
  for (let i = 0; i < 4096; i++) {
    ramGfx[i] = peek(i);
  }
  return ramGfx;
}

export const getRamAud = () => {
  return [peek(4102), peek(4103)];
}
