// global constants
declare const ADDRESS_BTN: number;
declare const ADDRESS_FPS: number;
declare const ADDRESS_GFX: number;
declare const GFX_W: number;
declare const GFX_H: number;
declare const COL_BLK: number;
declare const COL_BLU: number;
declare const COL_RED: number;
declare const COL_MAG: number;
declare const COL_GRN: number;
declare const COL_CYN: number;
declare const COL_YEL: number;
declare const COL_WHT: number;
declare const BTN_U: number;
declare const BTN_D: number;
declare const BTN_L: number;
declare const BTN_R: number;
declare const BTN_A: number;
declare const BTN_B: number;

// rom lifecycle hooks
declare function romInit(): void;
declare function romLoop(): void;

// low level memory access
declare function peek(address: number): number;
declare function poke(address: number, value: number): void;
