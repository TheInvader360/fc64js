const font = [
  0xF0, 0x90, 0x90, 0x90, 0xF0, // 0 memory[0x00:0x04]
  0x20, 0x60, 0x20, 0x20, 0x70, // 1 memory[0x05:0x09]
  0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2 memory[0x0A:0x0E]
  0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3 memory[0x0F:0x13]
  0x90, 0x90, 0xF0, 0x10, 0x10, // 4 memory[0x14:0x18]
  0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5 memory[0x19:0x1D]
  0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6 memory[0x1E:0x22]
  0xF0, 0x10, 0x20, 0x40, 0x40, // 7 memory[0x23:0x27]
  0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8 memory[0x28:0x2C]
  0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9 memory[0x2D:0x31]
  0xF0, 0x90, 0xF0, 0x90, 0x90, // A memory[0x32:0x36]
  0xE0, 0x90, 0xE0, 0x90, 0xE0, // B memory[0x37:0x3B]
  0xF0, 0x80, 0x80, 0x80, 0xF0, // C memory[0x3C:0x40]
  0xE0, 0x90, 0x90, 0x90, 0xE0, // D memory[0x41:0x45]
  0xF0, 0x80, 0xF0, 0x80, 0xF0, // E memory[0x46:0x4A]
  0xF0, 0x80, 0xF0, 0x80, 0x80, // F memory[0x4B:0x4F]
]

const state = {
  memory: new Uint8Array(4096),   // system memory (4kb total. 0x200-0xFFF: rom and ram)
  vRegisters: new Uint8Array(16), // v registers (v0-vE: general purpose. vF: carry flag)
  stack: new Uint16Array(16),     // store program counter in stack before jump/gosub
  display: new Uint8Array(2048),  // the current state of the 64x32 display
  keys: new Uint8Array(16),       // the current state of the hex keypad (0-F)
  pc: 0,                          // program counter (16 bit)
  ir: 0,                          // index register (16 bit)
  sp: 0,                          // stack pointer (to remember the level of stack used) (16 bit)
  dt: 0,                          // delay timer counts down to zero at 60hz (8 bit)
  st: 0,                          // sound timer counts down to zero at 60hz (8 bit)
}

const init = () => {
  for (let i = 0; i < state.memory.length; i++) state.memory[i] = 0;
  for (let i = 0; i < state.vRegisters.length; i++) state.vRegisters[i] = 0;
  for (let i = 0; i < state.stack.length; i++) state.stack[i] = 0;
  for (let i = 0; i < state.display.length; i++) state.display[i] = 0;
  releaseKeys();
  state.pc = 0x200; // rom data starts at memory address 0x200 (0d512)
  state.ir = 0;
  state.sp = 0;
  state.dt = 0;
  state.st = 0;
  for (let i = 0; i < font.length; i++) state.memory[i] = font[i]; // load font data into memory from address 0x000
}

const releaseKeys = () => {
  for (let i = 0; i < state.keys.length; i++) state.keys[i] = 0;
}

const pressKey = (key) => {
  if (key == '0') state.keys[0] = 1;
  if (key == '1') state.keys[1] = 1;
  if (key == '2') state.keys[2] = 1;
  if (key == '3') state.keys[3] = 1;
  if (key == '4') state.keys[4] = 1;
  if (key == '5') state.keys[5] = 1;
  if (key == '6') state.keys[6] = 1;
  if (key == '7') state.keys[7] = 1;
  if (key == '8') state.keys[8] = 1;
  if (key == '9') state.keys[9] = 1;
  if (key == 'A') state.keys[10] = 1;
  if (key == 'B') state.keys[11] = 1;
  if (key == 'C') state.keys[12] = 1;
  if (key == 'D') state.keys[13] = 1;
  if (key == 'E') state.keys[14] = 1;
  if (key == 'F') state.keys[15] = 1;
}

const cycle = () => {
  const instruction = fetchInstruction();
  const opcode = decodeInstruction(instruction);
  execute(opcode, instruction);
}

const fetchInstruction = () => {
  /*
    fetch and merge two bytes from memory locations pointed at by pc & pc+1 e.g. memory[pc] = 0b10100010, memory[pc+1] = 0b11110000
    shift first byte left 8 times e.g. 0b1010001000000000
    use bitwise OR operation to merge the bytes e.g. 0b1010001000000000 | 0b11110000 = 0b1010001011110000
  */
  return (state.memory[state.pc] << 8) | (state.memory[state.pc + 1]);
}

const decodeInstruction = (instruction) => {
  /*
    read the first 4 bits of the current instruction using bitwise AND operation e.g. 0x2105 & 0xF000 = 0x2000
    go on to examine other relevant nibbles where necessary
    return the opcode extracted from the instruction
  */
  const n1 = (instruction & 0xF000) >> 12;
  const n2 = (instruction & 0x0F00) >> 8;
  const n3 = (instruction & 0x00F0) >> 4;
  const n4 = instruction & 0x000F;
  let opcode = instruction & 0xF000; // catchall default (0NNN, 1NNN, 2NNN, 3XNN, 4XNN, 5XY0, 6XNN, 7XNN, 9XY0, ANNN, BNNN, CXNN, DXYN)
  if (n1 == 0x0 && n2 == 0x0 && n3 == 0xC)              opcode = 0x00C0; // 00CN
  if (n1 == 0x0 && n2 == 0x0 && n3 == 0xE && n4 == 0x0) opcode = 0x00E0; // 00E0
  if (n1 == 0x0 && n2 == 0x0 && n3 == 0xE && n4 == 0xE) opcode = 0x00EE; // 00EE
  if (n1 == 0x0 && n2 == 0x0 && n3 == 0xF && n4 == 0xB) opcode = 0x00FB; // 00FB
  if (n1 == 0x0 && n2 == 0x0 && n3 == 0xF && n4 == 0xC) opcode = 0x00FC; // 00FC
  if (n1 == 0x0 && n2 == 0x0 && n3 == 0xF && n4 == 0xD) opcode = 0x00FD; // 00FD
  if (n1 == 0x0 && n2 == 0x0 && n3 == 0xF && n4 == 0xE) opcode = 0x00FE; // 00FE
  if (n1 == 0x0 && n2 == 0x0 && n3 == 0xF && n4 == 0xF) opcode = 0x00FF; // 00FF
  if (n1 == 0x8 && n4 == 0x0)                           opcode = 0x8000; // 8XY0
  if (n1 == 0x8 && n4 == 0x1)                           opcode = 0x8001; // 8XY1
  if (n1 == 0x8 && n4 == 0x2)                           opcode = 0x8002; // 8XY2
  if (n1 == 0x8 && n4 == 0x3)                           opcode = 0x8003; // 8XY3
  if (n1 == 0x8 && n4 == 0x4)                           opcode = 0x8004; // 8XY4
  if (n1 == 0x8 && n4 == 0x5)                           opcode = 0x8005; // 8XY5
  if (n1 == 0x8 && n4 == 0x6)                           opcode = 0x8006; // 8XY6
  if (n1 == 0x8 && n4 == 0x7)                           opcode = 0x8007; // 8XY7
  if (n1 == 0x8 && n4 == 0xE)                           opcode = 0x800E; // 8XYE
  if (n1 == 0xE && n3 == 0x9 && n4 == 0xE)              opcode = 0xE09E; // EX9E
  if (n1 == 0xE && n3 == 0xA && n4 == 0x1)              opcode = 0xE0A1; // EXA1
  if (n1 == 0xF && n3 == 0x0 && n4 == 0x7)              opcode = 0xF007; // FX07
  if (n1 == 0xF && n3 == 0x0 && n4 == 0xA)              opcode = 0xF00A; // FX0A
  if (n1 == 0xF && n3 == 0x1 && n4 == 0x5)              opcode = 0xF015; // FX15
  if (n1 == 0xF && n3 == 0x1 && n4 == 0x8)              opcode = 0xF018; // FX18
  if (n1 == 0xF && n3 == 0x1 && n4 == 0xE)              opcode = 0xF01E; // FX1E
  if (n1 == 0xF && n3 == 0x2 && n4 == 0x9)              opcode = 0xF029; // FX29
  if (n1 == 0xF && n3 == 0x3 && n4 == 0x0)              opcode = 0xF030; // FX30
  if (n1 == 0xF && n3 == 0x3 && n4 == 0x3)              opcode = 0xF033; // FX33
  if (n1 == 0xF && n3 == 0x5 && n4 == 0x5)              opcode = 0xF055; // FX55
  if (n1 == 0xF && n3 == 0x6 && n4 == 0x5)              opcode = 0xF065; // FX65
  if (n1 == 0xF && n3 == 0x7 && n4 == 0x5)              opcode = 0xF075; // FX75
  if (n1 == 0xF && n3 == 0x8 && n4 == 0x5)              opcode = 0xF085; // FX85
  return opcode;
}

const execute = (opcode, instruction) => {
  if (opcode === 0x0000) exec0NNN();            // no op
  if (opcode === 0x00C0) exec00CN();            // not implemented (super chip opcode)
  if (opcode === 0x00E0) exec00E0();            // cls
  if (opcode === 0x00EE) exec00EE();            // return (decrement sp, set pc from stack)
  if (opcode === 0x00FB) exec00FB();            // not implemented (super chip opcode)
  if (opcode === 0x00FC) exec00FC();            // not implemented (super chip opcode)
  if (opcode === 0x00FD) exec00FD();            // not implemented (super chip opcode)
  if (opcode === 0x00FE) exec00FE();            // not implemented (super chip opcode)
  if (opcode === 0x00FF) exec00FF();            // not implemented (super chip opcode)
  if (opcode === 0x1000) exec1NNN(instruction); // goto nnn
  if (opcode === 0x2000) exec2NNN(instruction); // call subroutine (put current pc on stack, increment sp, set pc to nnn)
  if (opcode === 0x3000) exec3XNN(instruction); // if (vx == nn) skip next instruction
  if (opcode === 0x4000) exec4XNN(instruction); // if (vx != nn) skip next instruction
  if (opcode === 0x5000) exec5XY0(instruction); // if (vx == vy) skip next instruction
  if (opcode === 0x6000) exec6XNN(instruction); // vx = nn
  if (opcode === 0x7000) exec7XNN(instruction); // vx += nn
  if (opcode === 0x8000) exec8XY0(instruction); // vx = vy
  if (opcode === 0x8001) exec8XY1(instruction); // vx = vx|vy (bitwise OR)
  if (opcode === 0x8002) exec8XY2(instruction); // vx = vx&vy (bitwise AND)
  if (opcode === 0x8003) exec8XY3(instruction); // vx = vx^vy (bitwise XOR)
  if (opcode === 0x8004) exec8XY4(instruction); // vx += vy (only stores lowest 8 bits of result, if result > 0xFF then vF = 1)
  if (opcode === 0x8005) exec8XY5(instruction); // vx -= vy (if vx > vy then vF = 1)
  if (opcode === 0x8006) exec8XY6(instruction); // vx >>= 1 (vF = the lsb of vx, then vx is divided by 2)
  if (opcode === 0x8007) exec8XY7(instruction); // vx = vy - vx (if vy > vx then vF = 1)
  if (opcode === 0x800E) exec8XYE(instruction); // vx <<= 1 (vF = the msb of vx, then vx is multiplied by 2)
  if (opcode === 0x9000) exec9XY0(instruction); // if (vx != vy) skip next instruction
  if (opcode === 0xA000) execANNN(instruction); // i = nnn
  if (opcode === 0xB000) execBNNN(instruction); // pc = v0 + nnn
  if (opcode === 0xC000) execCXNN(instruction); // vx = rand() & nn
  if (opcode === 0xD000) execDXYN(instruction); // draw(vx, vy, n)
  if (opcode === 0xE09E) execEX9E(instruction); // if the key stored in vx is pressed skip next instruction
  if (opcode === 0xE0A1) execEXA1(instruction); // if the key stored in vx is not pressed skip next instruction
  if (opcode === 0xF007) execFX07(instruction); // vx = delay_timer
  if (opcode === 0xF00A) execFX0A(instruction); // vx = get_key() (wait for a key press then store the key value in vx)
  if (opcode === 0xF015) execFX15(instruction); // delay_timer = vx
  if (opcode === 0xF018) execFX18(instruction); // sound_timer = vx
  if (opcode === 0xF01E) execFX1E(instruction); // i += vx
  if (opcode === 0xF029) execFX29(instruction); // i = sprite_addr[vx] (point i at 5 byte font sprite for hex char at vx)
  if (opcode === 0xF030) execFX30();            // not implemented (super chip opcode)
  if (opcode === 0xF033) execFX33(instruction); // store binary-coded decimal of vx value in memory[i:i+2] (e.g. if i=0 and vx=128, m[0]=1 m[1]=2 m[2]=8)
  if (opcode === 0xF055) execFX55(instruction); // reg_dump(vx,&i) (store v0:vx inclusive in memory[i] onwards, i is not modified)
  if (opcode === 0xF065) execFX65(instruction); // reg_load(vx,&i) (fill v0:vx inclusive from memory[i] onwards, i is not modified)
  if (opcode === 0xF075) execFX75();            // not implemented (super chip opcode)
  if (opcode === 0xF085) execFX85();            // not implemented (super chip opcode)
}

const exec0NNN = () => {} // intentional no op (does nothing)

const exec00CN = () => state.pc += 2; // intentional stub (super chip opcode - skip to next instruction)

const exec00E0 = () => { // cls
  for (let i = 0; i < state.display.length; i++) state.display[i] = 0;
  state.pc += 2;
}

const exec00EE = () => { // return (decrement sp, set pc from stack)
  state.sp--;
  state.pc = state.stack[state.sp] + 2;
}

const exec00FB = () => state.pc += 2; // intentional stub (super chip opcode - skip to next instruction)

const exec00FC = () => state.pc += 2; // intentional stub (super chip opcode - skip to next instruction)

const exec00FD = () => state.pc += 2; // intentional stub (super chip opcode - skip to next instruction)

const exec00FE = () => state.pc += 2; // intentional stub (super chip opcode - skip to next instruction)

const exec00FF = () => state.pc += 2; // intentional stub (super chip opcode - skip to next instruction)

const exec1NNN = (instruction) => { // goto nnn
  state.pc = instruction & 0x0FFF;
}

const exec2NNN = (instruction) => { // call subroutine (put current pc on stack, increment sp, set pc to nnn)
  const nnn = instruction & 0x0FFF;
  state.stack[state.sp] = state.pc;
  state.sp++;
  state.pc = nnn;
}

const exec3XNN = (instruction) => { // if (vx == nn) skip next instruction
  const x = (instruction & 0x0F00) >> 8;
  const nn = instruction & 0x00FF;
  if (state.vRegisters[x] == nn) state.pc += 2;
  state.pc += 2;
}

const exec4XNN = (instruction) => { // if (vx != nn) skip next instruction
  const x = (instruction & 0x0F00) >> 8;
  const nn = instruction & 0x00FF;
  if (state.vRegisters[x] != nn) state.pc += 2;
  state.pc += 2;
}

const exec5XY0 = (instruction) => { // if (vx == vy) skip next instruction
  const x = (instruction & 0x0F00) >> 8;
  const y = (instruction & 0x00F0) >> 4;
  if (state.vRegisters[x] == state.vRegisters[y]) state.pc += 2;
  state.pc += 2;
}

const exec6XNN = (instruction) => { // vx = nn
  const x = (instruction & 0x0F00) >> 8;
  const nn = instruction & 0x00FF;
  state.vRegisters[x] = nn;
  state.pc += 2;
}

const exec7XNN = (instruction) => { // vx += nn
  const x = (instruction & 0x0F00) >> 8;
  const nn = instruction & 0x00FF;
  state.vRegisters[x] += nn;
  state.pc += 2;
}

const exec8XY0 = (instruction) => { // vx = vy
  const x = (instruction & 0x0F00) >> 8;
  const y = (instruction & 0x00F0) >> 4;
  state.vRegisters[x] = state.vRegisters[y];
  state.pc += 2;
}

const exec8XY1 = (instruction) => { // vx = vx|vy (bitwise OR)
  const x = (instruction & 0x0F00) >> 8;
  const y = (instruction & 0x00F0) >> 4;
  state.vRegisters[x] = state.vRegisters[x] | state.vRegisters[y];
  state.pc += 2;
}

const exec8XY2 = (instruction) => { // vx = vx&vy (bitwise AND)
  const x = (instruction & 0x0F00) >> 8;
  const y = (instruction & 0x00F0) >> 4;
  state.vRegisters[x] = state.vRegisters[x] & state.vRegisters[y];
  state.pc += 2;
}

const exec8XY3 = (instruction) => { // vx = vx^vy (bitwise XOR)
  const x = (instruction & 0x0F00) >> 8;
  const y = (instruction & 0x00F0) >> 4;
  state.vRegisters[x] = state.vRegisters[x] ^ state.vRegisters[y];
  state.pc += 2;
}

const exec8XY4 = (instruction) => { // vx += vy (only stores lowest 8 bits of result, if result > 0xFF then vF = 1)
  const x = (instruction & 0x0F00) >> 8;
  const y = (instruction & 0x00F0) >> 4;
  const result = state.vRegisters[x] + state.vRegisters[y];
  state.vRegisters[0xF] = result > 0xFF ? 1 : 0;
  state.vRegisters[x] = result;
  state.pc += 2;
}

const exec8XY5 = (instruction) => { // vx -= vy (if vx > vy then vF = 1)
  const x = (instruction & 0x0F00) >> 8;
  const y = (instruction & 0x00F0) >> 4;
  state.vRegisters[0xF] = state.vRegisters[x] > state.vRegisters[y] ? 1 : 0;
  state.vRegisters[x] -= state.vRegisters[y];
  state.pc += 2;
}

const exec8XY6 = (instruction) => { // vx >>= 1 (vF = the lsb of vx, then vx is divided by 2)
  const x = (instruction & 0x0F00) >> 8;
  state.vRegisters[0xF] = state.vRegisters[x] & 0b00000001;
  state.vRegisters[x] >>= 1;
  state.pc += 2;
}

const exec8XY7 = (instruction) => { // vx = vy - vx (if vy > vx then vF = 1)
  const x = (instruction & 0x0F00) >> 8;
  const y = (instruction & 0x00F0) >> 4;
  state.vRegisters[0xF] = state.vRegisters[y] > state.vRegisters[x] ? 1 : 0;
  state.vRegisters[x] = state.vRegisters[y] - state.vRegisters[x];
  state.pc += 2;
}

const exec8XYE = (instruction) => { // vx <<= 1 (vF = the msb of vx, then vx is multiplied by 2)
  const x = (instruction & 0x0F00) >> 8;
  state.vRegisters[0xF] = state.vRegisters[x] & 0b10000000;
  state.vRegisters[0xF] >>= 7;
  state.vRegisters[x] <<= 1;
  state.pc += 2;
}

const exec9XY0 = (instruction) => { // if (vx != vy) skip next instruction
  const x = (instruction & 0x0F00) >> 8;
  const y = (instruction & 0x00F0) >> 4;
  if (state.vRegisters[x] != state.vRegisters[y]) state.pc += 2;
  state.pc += 2;
}

const execANNN = (instruction) => { // i = nnn
  state.ir = instruction & 0x0FFF;
  state.pc += 2;
}

const execBNNN = (instruction) => { // pc = v0 + nnn
  const nnn = instruction & 0x0FFF;
  state.pc = state.vRegisters[0x0] + nnn;
}

const execCXNN = (instruction) => { // vx = rand() & nn
  const x = (instruction & 0x0F00) >> 8;
  const nn = instruction & 0x00FF;
  state.vRegisters[x] = Math.floor(Math.random() * 256) & nn;
  state.pc += 2;
}

const execDXYN = (instruction) => { // draw(vx, vy, n)
  /*
    read n bytes (data) from memory, starting at ir.
    display bytes (data) as sprites on screen at coordinates vx,vy.
    sprites are XORed onto the existing screen.
    if any pixels are erased, v[F] is set to 1, otherwise it is set to 0.
    sprites wrap to opposite side of screen if they overlap an edge.
  */
  const vx = state.vRegisters[(instruction & 0x0F00) >> 8];
  const vy = state.vRegisters[(instruction & 0x00F0) >> 4];
  const n = instruction & 0x000F;
  state.vRegisters[0xF] = 0;
  for (let row = 0; row < n; row++) { // iterate over all of the sprite's rows
    const data = state.memory[state.ir + row]; // get the byte for the current sprite row
    for (let col = 0; col < 8; col++) { // iterate over all cols in the current sprite row
      let x = (vx + col) % 64; // wrapped x value
      let y = (vy + row) % 32; // wrapped y value
      let idx = (x + y * 64); // display index
      if ((data & (0b10000000) >> col) !== 0) { // apply bitwise AND mask to extract the pixel's state from data
        if (state.display[idx] === 1) state.vRegisters[0xF] = 1; // set v[F] = 1 if pixel is to be erased
        state.display[idx] ^= 1; // bitwise XOR operation to toggle gfx pixel state
      }
    }
  }
  state.pc += 2;
}

const execEX9E = (instruction) => { // if the key stored in vx is pressed skip next instruction
  const x = (instruction & 0x0F00) >> 8;
  const vx = state.vRegisters[x];
  if (state.keys[vx] == 1) state.pc += 2;
  state.pc += 2;
}

const execEXA1 = (instruction) => { // if the key stored in vx is not pressed skip next instruction
  const x = (instruction & 0x0F00) >> 8;
  if (state.keys[state.vRegisters[x]] == 0) state.pc += 2;
  state.pc += 2;
}

const execFX07 = (instruction) => { // vx = delay_timer
  const x = (instruction & 0x0F00) >> 8;
  state.vRegisters[x] = state.dt;
  state.pc += 2;
}

const execFX0A = (instruction) => { // vx = get_key() (wait for a key press then store the key value in vx)
  const x = (instruction & 0x0F00) >> 8;
  for (let i = 0; i < state.keys.length; i++) {
    if (state.keys[i] == 1) {
      state.vRegisters[x] = i; // e.g. if chip8 D key is pressed vr[x] = 0xD
      state.pc += 2;           // execution paused until a key is pressed
      break;
    }
  }
}

const execFX15 = (instruction) => { // delay_timer = vx
  const x = (instruction & 0x0F00) >> 8;
  state.dt = state.vRegisters[x];
  state.pc += 2;
}

const execFX18 = (instruction) => { // sound_timer = vx
  const x = (instruction & 0x0F00) >> 8;
  state.st = state.vRegisters[x];
  state.pc += 2;
}

const execFX1E = (instruction) => { // i += vx
  const x = (instruction & 0x0F00) >> 8;
  state.ir += state.vRegisters[x];
  state.pc += 2;
}

const execFX29 = (instruction) => { // i = sprite_addr[vx] (point i at 5 byte font sprite for hex char at vx)
  const x = (instruction & 0x0F00) >> 8;
  state.ir = state.vRegisters[x] * 5;
  state.pc += 2;
}

const execFX30 = () => state.pc += 2; // intentional stub (super chip opcode - skip to next instruction)

const execFX33 = (instruction) => { // store binary-coded decimal of vx value in memory[i:i+2] (e.g. if i=0 and vx=128, m[0]=1 m[1]=2 m[2]=8)
  const x = (instruction & 0x0F00) >> 8;
  const vx = state.vRegisters[x];
  state.memory[state.ir] = Math.floor(vx / 100);         // e.g. Math.floor(128 / 100) = 1                     i.e. m[i+0] = 1
  state.memory[state.ir + 1] = Math.floor(vx / 10) % 10; // e.g. Math.floor(128 / 10) = 12, then 12 % 10 = 2   i.e. m[i+1] = 2
  state.memory[state.ir + 2] = vx % 10;                  // e.g. 128 % 10 = 8                                  i.e. m[i+2] = 8
  state.pc += 2;
}

const execFX55 = (instruction) => { // reg_dump(vx,&i) (store v0:vx inclusive in memory[i] onwards, i is not modified)
  const x = (instruction & 0x0F00) >> 8;
  for (let i = 0; i <= x; i++) state.memory[state.ir + i] = state.vRegisters[i];
  state.pc += 2;
}

const execFX65 = (instruction) => { // reg_load(vx,&i) (fill v0:vx inclusive from memory[i] onwards, i is not modified)
  const x = (instruction & 0x0F00) >> 8;
  for (let i = 0; i <= x; i++) state.vRegisters[i] = state.memory[state.ir + i];
  state.pc += 2;
}

const execFX75 = () => state.pc += 2; // intentional stub (super chip opcode - skip to next instruction)

const execFX85 = () => state.pc += 2; // intentional stub (super chip opcode - skip to next instruction)

export {
  state,
  init,
  releaseKeys,
  pressKey,
  cycle,
  fetchInstruction,
  decodeInstruction,
  execute,
}
