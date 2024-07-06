import '../../../lib/fc64.js';
import { loadRom } from './romLoader.js';
import { romMetadata } from './romMetadata.js';
import * as persistentMemory from './persistentMemory.js';
import * as vm from './vm.js';

fc64Init(romInit, romLoop, [0x000000, 0x404040, 0xff0000, 0xff00ff, 0x00ff00, 0x00ffff, 0xffff00, 0xffffff]); // swap out blue for dark grey

const romStates = { menu: 0, emulator: 1 };
let ticks;
let romState;
let menuPointer;
let cyclesPerTick;
let cyclesCountdown;
let userInstructions;
let inputMap;
let displayBufferChip8;

function romInit() {
  ticks = 0;
  romState = romStates.menu;
  menuPointer = persistentMemory.readMenuPointer(0, romMetadata.length - 1);
  cyclesPerTick = 0;
  cyclesCountdown = 0;
  userInstructions = 'A:SELECT\nRELOAD:RESET';
  inputMap = new Map();
  displayBufferChip8 = [];
  vm.init();
}

function romLoop() {
  ticks++;
  clearGfx(1); // dark grey background
  drawText(5, 2, 'FC64JS', COL_YEL);
  drawText(37, 2, 'CHIP-8', COL_YEL);
  drawTextCentered(9, romMetadata[menuPointer].romName, COL_WHT);
  drawRectangle(0, 16, 64, 32, COL_BLK, COL_BLK);
  drawPanelUserInstructions();

  if (romState === romStates.menu) {
    if (isJustPressed(BTN_L) && menuPointer > 0) menuPointer--;
    if (isJustPressed(BTN_R) && menuPointer < romMetadata.length - 1) menuPointer++;
    if (isJustPressed(BTN_A)) {
      persistentMemory.writeMenuPointer(menuPointer);
      const selectedRomMetadata = romMetadata[menuPointer];
      cyclesPerTick = selectedRomMetadata.cyclesPerTick;
      userInstructions = selectedRomMetadata.userInstructions;
      inputMap.set('U', selectedRomMetadata.buttonKeyMapping[0]);
      inputMap.set('D', selectedRomMetadata.buttonKeyMapping[1]);
      inputMap.set('L', selectedRomMetadata.buttonKeyMapping[2]);
      inputMap.set('R', selectedRomMetadata.buttonKeyMapping[3]);
      inputMap.set('A', selectedRomMetadata.buttonKeyMapping[4]);
      inputMap.set('B', selectedRomMetadata.buttonKeyMapping[5]);
      loadRom(selectedRomMetadata.romFile);
      romState = romStates.emulator;
    }
    if (menuPointer > 0 && ticks % 40 > 10) drawText(1, 9, '<', COL_WHT);
    if (menuPointer < romMetadata.length - 1 && ticks % 40 > 10) drawText(60, 9, '>', COL_WHT);
    drawPanelRomDescription();
  }

  if (romState === romStates.emulator) {
    updateInputsChip8();
    while (cyclesCountdown > 0) {
      vm.cycle();
      cyclesCountdown--;
    }
    cyclesCountdown = cyclesPerTick;
    if (vm.state.dt > 0) vm.state.dt--;
    if (vm.state.st > 0) vm.state.st--;
    beep(400, vm.state.st, true);
    drawPanelChip8();
  }
}

const drawTextCentered = (y, content, color) => drawText(((64 - content.length * 4) / 2) + 1, y, content, color);

const drawPanelUserInstructions = () => {
  let lines = userInstructions.split('\n');
  lines.length = Math.min(lines.length, 2); // limit to a maximum of 2 lines
  const baseY = 56 - lines.length * 3;
  for (let i = 0; i < lines.length; i++ ) drawTextCentered(baseY + i * 6 + i, lines[i], COL_CYN);
}

const drawPanelRomDescription = () => {
  let lines = romMetadata[menuPointer].romDescription.split('\n');
  lines.length = Math.min(lines.length, 5); // limit to a maximum of 5 lines
  const baseY = 32 - lines.length * 3;
  for (let i = 0; i < lines.length; i++ ) drawTextCentered(baseY + i * 6, lines[i], COL_MAG);
}

const drawPanelChip8 = () => {
  drawImage(0, 16, 64, 32, displayBufferChip8); // draw chip8 display per its state in the previous tick (reduces flicker)
  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 64; x++) {
      if (vm.state.display[y * 64 + x] == 1) drawPixel(x, y + 16, COL_GRN); // overdraw any currently lit chip8 pixels (reduces flicker)
      displayBufferChip8[y * 64 + x] = vm.state.display[y * 64 + x] == 1 ? COL_GRN : COL_BLK; // update buffer
    }
  }
}

const updateInputsChip8 = () => {
  vm.releaseKeys();
  if (isPressed(BTN_U)) vm.pressKey(inputMap.get('U'));
  if (isPressed(BTN_D)) vm.pressKey(inputMap.get('D'));
  if (isPressed(BTN_L)) vm.pressKey(inputMap.get('L'));
  if (isPressed(BTN_R)) vm.pressKey(inputMap.get('R'));
  if (isPressed(BTN_A)) vm.pressKey(inputMap.get('A'));
  if (isPressed(BTN_B)) vm.pressKey(inputMap.get('B'));
  // consoleLogState();
}

const consoleLogState = () => {
  const vregString = `vreg:${vm.state.vRegisters.join(',')}`;
  const stackString = `stack:${vm.state.stack.join(',')}`;
  const keysString = `keys:${vm.state.keys.join('')}`;
  const intsString = `pc:${vm.state.pc} | ir:${vm.state.ir} | sp:${vm.state.sp} | dt:${vm.state.dt} | st:${vm.state.st}`;
  console.log(`${vregString}\n${stackString}\n${keysString}\n${intsString}`);
  console.log('display: ', vm.state.display);
  console.log('memory: ', vm.state.memory);
}
