import * as vm from '../../../vm.js';

describe('pressKey', () => {
  test('press each key one at a time', () => {
    for (let i = 0; i < 16; i++) {
      vm.init();
      const clonedState = {...vm.state};
      vm.pressKey(i.toString(16).toUpperCase());
      clonedState.keys[i] = 1;
      expect(vm.state).toEqual(clonedState);
    }
  });

  test('press a few keys together at the same time', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.pressKey('3');
    vm.pressKey('7');
    vm.pressKey('D');
    clonedState.keys[0x3] = 1;
    clonedState.keys[0x7] = 1;
    clonedState.keys[0xD] = 1;
    expect(vm.state).toEqual(clonedState);
  });
});

describe('cycle', () => {
  test('run through a single fetch-decode-execute cycle', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.memory[0x200] = 0x64;
    vm.state.memory[0x201] = 0xA9;
    vm.cycle(); // fetch: 0x64A9, decode(0x64A9): 0x6000, execute(0x6000, 0x64A9): vReg[4]=0xA9 and pc+=2
    clonedState.vRegisters[0x4] = 0xA9;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });
});

describe('fetchInstruction', () => {
  test('fetch 5 instructions', () => {
    vm.init();
    vm.state.memory[0x200] = 0xA2;
    vm.state.memory[0x201] = 0xF0;
    vm.state.memory[0x202] = 0xC5;
    vm.state.memory[0x203] = 0x02;
    vm.state.memory[0x204] = 0x0F;
    vm.state.memory[0x205] = 0xF0;
    vm.state.memory[0x206] = 0xAB;
    vm.state.memory[0x207] = 0x50;
    vm.state.memory[0x208] = 0x20;
    vm.state.memory[0x209] = 0xFF;
    for (let i = 0; i < 5; i++) {
      vm.state.pc = 0x200 + i * 2;
      if (i === 0) expect(vm.fetchInstruction()).toEqual(0xA2F0);
      if (i === 1) expect(vm.fetchInstruction()).toEqual(0xC502);
      if (i === 2) expect(vm.fetchInstruction()).toEqual(0x0FF0);
      if (i === 3) expect(vm.fetchInstruction()).toEqual(0xAB50);
      if (i === 4) expect(vm.fetchInstruction()).toEqual(0x20FF);
    }
  });
});

describe('decodeInstruction', () => {
  test('decode an instruction for each opcode', () => {
    expect(vm.decodeInstruction(0x0123)).toEqual(0x0000);
    expect(vm.decodeInstruction(0x00C5)).toEqual(0x00C0);
    expect(vm.decodeInstruction(0x00E0)).toEqual(0x00E0);
    expect(vm.decodeInstruction(0x00EE)).toEqual(0x00EE);
    expect(vm.decodeInstruction(0x00FB)).toEqual(0x00FB);
    expect(vm.decodeInstruction(0x00FC)).toEqual(0x00FC);
    expect(vm.decodeInstruction(0x00FD)).toEqual(0x00FD);
    expect(vm.decodeInstruction(0x00FE)).toEqual(0x00FE);
    expect(vm.decodeInstruction(0x00FF)).toEqual(0x00FF);
    expect(vm.decodeInstruction(0x1AB3)).toEqual(0x1000);
    expect(vm.decodeInstruction(0x205F)).toEqual(0x2000);
    expect(vm.decodeInstruction(0x3303)).toEqual(0x3000);
    expect(vm.decodeInstruction(0x45B0)).toEqual(0x4000);
    expect(vm.decodeInstruction(0x55FF)).toEqual(0x5000);
    expect(vm.decodeInstruction(0x6FA5)).toEqual(0x6000);
    expect(vm.decodeInstruction(0x7B09)).toEqual(0x7000);
    expect(vm.decodeInstruction(0x8120)).toEqual(0x8000);
    expect(vm.decodeInstruction(0x8341)).toEqual(0x8001);
    expect(vm.decodeInstruction(0x8562)).toEqual(0x8002);
    expect(vm.decodeInstruction(0x8783)).toEqual(0x8003);
    expect(vm.decodeInstruction(0x89A4)).toEqual(0x8004);
    expect(vm.decodeInstruction(0x8BC5)).toEqual(0x8005);
    expect(vm.decodeInstruction(0x8DE6)).toEqual(0x8006);
    expect(vm.decodeInstruction(0x8F07)).toEqual(0x8007);
    expect(vm.decodeInstruction(0x80FE)).toEqual(0x800E);
    expect(vm.decodeInstruction(0x9A90)).toEqual(0x9000);
    expect(vm.decodeInstruction(0xABCD)).toEqual(0xA000);
    expect(vm.decodeInstruction(0xB963)).toEqual(0xB000);
    expect(vm.decodeInstruction(0xC5B0)).toEqual(0xC000);
    expect(vm.decodeInstruction(0xD8AF)).toEqual(0xD000);
    expect(vm.decodeInstruction(0xEF9E)).toEqual(0xE09E);
    expect(vm.decodeInstruction(0xE5A1)).toEqual(0xE0A1);
    expect(vm.decodeInstruction(0xF507)).toEqual(0xF007);
    expect(vm.decodeInstruction(0xFA0A)).toEqual(0xF00A);
    expect(vm.decodeInstruction(0xF915)).toEqual(0xF015);
    expect(vm.decodeInstruction(0xF318)).toEqual(0xF018);
    expect(vm.decodeInstruction(0xF81E)).toEqual(0xF01E);
    expect(vm.decodeInstruction(0xFD29)).toEqual(0xF029);
    expect(vm.decodeInstruction(0xFE30)).toEqual(0xF030);
    expect(vm.decodeInstruction(0xF233)).toEqual(0xF033);
    expect(vm.decodeInstruction(0xF155)).toEqual(0xF055);
    expect(vm.decodeInstruction(0xFF65)).toEqual(0xF065);
    expect(vm.decodeInstruction(0xF375)).toEqual(0xF075);
    expect(vm.decodeInstruction(0xF685)).toEqual(0xF085);
  });
});

describe('execute', () => {
  test('execute 0NNN: no op', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0x0000, 0x0123); // console.log(`${vm.state}\n${JSON.stringify(clonedState)}`);
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 00CN: super chip stub', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0x00C0, 0x00C0);
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 00E0: cls', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.display.fill(1, 512, 1024);
    vm.execute(0x00E0, 0x00E0); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.display}`);
    clonedState.display.fill(0);
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 00EE: return (decrement sp, set pc from stack)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.stack[0x0] = 0x1234;
    vm.state.sp = 1;
    vm.execute(0x00EE, 0x00EE); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.sp.toString(16)}\n${vm.state.stack}`);
    clonedState.stack[0x0] = 0x1234;
    clonedState.sp = 0;
    clonedState.pc = 0x1236;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 00FB: super chip stub', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0x00FB, 0x00FB);
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 00FC: super chip stub', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0x00FC, 0x00FC);
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 00FD: super chip stub', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0x00FD, 0x00FD);
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 00FE: super chip stub', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0x00FE, 0x00FE);
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 00FF: super chip stub', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0x00FF, 0x00FF);
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 1NNN: goto nnn', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0x1000, 0x12C5); // console.log(`${vm.state.pc.toString(16)}`);
    clonedState.pc = 0x2C5;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 2NNN: call subroutine (put current pc on stack, increment sp, set pc to nnn)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0x2000, 0x2F08); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.sp.toString(16)}\n${vm.state.stack}`);
    clonedState.stack[0x0] = 0x200;
    clonedState.sp = 0x1;
    clonedState.pc = 0xF08;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 3XNN: if (vx == nn) skip next instruction', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0xA] = 0x1D;
    vm.execute(0x3000, 0x3A1D); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0xA] = 0x1D;
    clonedState.pc = 0x204; // value stored in vRegister A (1D) matches NN (1D), so the next instruction is skipped
    expect(vm.state).toEqual(clonedState);
    vm.state.vRegisters[0xA] = 0xFD;
    vm.execute(0x3000, 0x3A1D); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0xA] = 0xFD;
    clonedState.pc = 0x206; // value stored in vRegister A (F3) does not match NN (1D), so the next instruction is not skipped
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 4XNN: if (vx != nn) skip next instruction', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x2] = 0xAC;
    vm.execute(0x4000, 0x4247); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x2] = 0xAC;
    clonedState.pc = 0x204; // value stored in vRegister 2 (AC) does not match NN (47), so the next instruction is skipped
    expect(vm.state).toEqual(clonedState);
    vm.state.vRegisters[0x2] = 0x47;
    vm.execute(0x4000, 0x4247); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x2] = 0x47;
    clonedState.pc = 0x206; // value stored in vRegister 2 (47) matches NN (47), so the next instruction is not skipped
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 5XY0: if (vx == vy) skip next instruction', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x1] = 0xAC;
    vm.state.vRegisters[0x9] = 0xAC;
    vm.execute(0x5000, 0x5190); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x1] = 0xAC;
    clonedState.vRegisters[0x9] = 0xAC;
    clonedState.pc = 0x204; // value stored in vRegister 1 (AC) matches vRegister 9 (AC), so the next instruction is skipped
    expect(vm.state).toEqual(clonedState);
    vm.state.vRegisters[0x1] = 0x47;
    vm.execute(0x5000, 0x5190); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x1] = 0x47;
    clonedState.pc = 0x206; // value stored in vRegister 1 (47) does not match vRegister 9 (AC), so the next instruction is not skipped
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 6XNN: vx = nn', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0x6000, 0x64A9); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x4] = 0xA9;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 7XNN: vx += nn', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x3] = 0x2A;
    vm.execute(0x7000, 0x7312); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x3] = 0x3C; // 42 (i.e. 0x2A) + 18 (i.e. 0x12) = 60 (i.e. 0x3C)
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 8XY0: vx = vy', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x9] = 0x0F;
    vm.state.vRegisters[0xB] = 0x0A;
    vm.execute(0x8000, 0x89B0); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x9] = 0x0A;
    clonedState.vRegisters[0xB] = 0x0A;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 8XY1: vx = vx|vy (bitwise OR)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0xD] = 0b01010101;
    vm.state.vRegisters[0xE] = 0b00110011;
    vm.execute(0x8001, 0x8DE1); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0xD] = 0b01110111;
    clonedState.vRegisters[0xE] = 0b00110011;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 8XY2: vx = vx&vy (bitwise AND)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x3] = 0b01010101;
    vm.state.vRegisters[0xF] = 0b00110011;
    vm.execute(0x8002, 0x83F2); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x3] = 0b00010001;
    clonedState.vRegisters[0xF] = 0b00110011;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 8XY3: vx = vx^vy (bitwise XOR)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0xA] = 0b01010101;
    vm.state.vRegisters[0xC] = 0b00110011;
    vm.execute(0x8003, 0x8AC3); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0xA] = 0b01100110;
    clonedState.vRegisters[0xC] = 0b00110011;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 8XY4: vx += vy (only stores lowest 8 bits of result, if result > 0xFF then vF = 1)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x4] = 0b11111111;
    vm.state.vRegisters[0x7] = 0b00000001;
    vm.execute(0x8004, 0x8474); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x4] = 0b00000000; // i.e. 0b11111111 + 0b00000001 (overflows)
    clonedState.vRegisters[0x7] = 0b00000001;
    clonedState.vRegisters[0xF] = 1;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
    vm.state.vRegisters[0x4] = 0b11000011;
    vm.state.vRegisters[0x7] = 0b00001111;
    vm.execute(0x8004, 0x8474); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x4] = 0b11010010; // i.e. 0b11000011 + 0b00001111
    clonedState.vRegisters[0x7] = 0b00001111;
    clonedState.vRegisters[0xF] = 0;
    clonedState.pc = 0x204;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 8XY5: vx -= vy (if vx > vy then vF = 1)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x9] = 0b00001111;
    vm.state.vRegisters[0xA] = 0b00000110;
    vm.execute(0x8005, 0x89A5); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x9] = 0b00001001; // i.e. 0b00001111 - 0b00000110
    clonedState.vRegisters[0xA] = 0b00000110;
    clonedState.vRegisters[0xF] = 1;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
    vm.state.vRegisters[0x9] = 0b00000110;
    vm.state.vRegisters[0xA] = 0b00001111;
    vm.execute(0x8005, 0x89A5); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x9] = 0b11110111; // i.e. 0b00000110 - 0b00001111 = -0b1001 (or 0b100000110 - 0b00001111)
    clonedState.vRegisters[0xA] = 0b00001111;
    clonedState.vRegisters[0xF] = 0;
    clonedState.pc = 0x204;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 8XY6: vx >>= 1 (vF = the lsb of vx, then vx is divided by 2)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x2] = 0b01010101;
    vm.execute(0x8006, 0x8206); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x2] = 0b00101010; // i.e. 0b01010101 / 2 (0b01010101 right shifted by 1)
    clonedState.vRegisters[0xF] = 1;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
    vm.state.vRegisters[0x2] = 0b00111100;
    vm.execute(0x8006, 0x8206); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x2] = 0b00011110; // i.e. 0b00111100 / 2 (0b00111100 right shifted by 1)
    clonedState.vRegisters[0xF] = 0;
    clonedState.pc = 0x204;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 8XY7: vx = vy - vx (if vy > vx then vF = 1)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x1] = 0b01010101;
    vm.state.vRegisters[0x9] = 0b00011100;
    vm.execute(0x8007, 0x8197); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x1] = 0b11000111; // i.e. 0b00011100 - 0b01010101 = -0b111001 (or 0b100011100 - 0b01010101)
    clonedState.vRegisters[0x9] = 0b00011100;
    clonedState.vRegisters[0xF] = 0;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
    vm.state.vRegisters[0x1] = 0b00011100;
    vm.state.vRegisters[0x9] = 0b01010101;
    vm.execute(0x8007, 0x8197); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x1] = 0b00111001; // i.e. 0b01010101 - 0b00011100
    clonedState.vRegisters[0x9] = 0b01010101;
    clonedState.vRegisters[0xF] = 1;
    clonedState.pc = 0x204;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 8XYE: vx <<= 1 (vF = the msb of vx, then vx is multiplied by 2)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0xE] = 0b01010101;
    vm.execute(0x800E, 0x8EEE); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0xF] = 0; // msb of 0b01010101 is 0
    clonedState.vRegisters[0xE] = 0b10101010; // 85 (i.e. 0b01010101) * 2 = 170 (i.e. 0b10101010)
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
    vm.state.vRegisters[0xE] = 0b11000000;
    vm.execute(0x800E, 0x8EEE); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0xF] = 1; // msb of 0b11000000 is 1
    clonedState.vRegisters[0xE] = 0b10000000; // 192 (i.e. 0b11000000) * 2 − 256 (due to overflow) = 128 (i.e. 0b10000000)
    clonedState.pc = 0x204;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute 9XY0: if (vx != vy) skip next instruction', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x7] = 0xAC;
    vm.state.vRegisters[0x3] = 0x47;
    vm.execute(0x9000, 0x9730); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x7] = 0xAC;
    clonedState.vRegisters[0x3] = 0x47;
    clonedState.pc = 0x204; // value stored in vRegister 7 (AC) does not match vRegister 3 (47), so the next instruction is skipped
    expect(vm.state).toEqual(clonedState);
    vm.state.vRegisters[0x3] = 0xAC;
    vm.execute(0x9000, 0x9730); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x3] = 0xAC;
    clonedState.pc = 0x206; // value stored in vRegister 7 (AC) matches vRegister 3 (AC), so the next instruction is not skipped
    expect(vm.state).toEqual(clonedState);
  });

  test('execute ANNN: i = nnn', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0xA000, 0xA5B2); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.ir.toString(16)}`);
    clonedState.ir = 0x5B2;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute BNNN: pc = v0 + nnn', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x0] = 0x23;
    vm.execute(0xB000, 0xBAF2); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x0] = 0x23;
    clonedState.pc = 0xB15; // i.e. 0x23 + 0xAF2
    expect(vm.state).toEqual(clonedState);
  });

  test('execute CXNN: vx = rand() & nn', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0xC000, 0xC400); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x4] = 0x00; // would be nice to be able to test where nn is not zero...
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute DXYN: draw(vx, vy, n)', () => {
    vm.init();
    const clonedState = {...vm.state};
    // draw a 2x2 sprite at 20,10 (sprite: filled square)...
    vm.state.memory[0x0101] = 0xC0;
    vm.state.memory[0x0102] = 0xC0;
    vm.state.ir = 0x0101;
    vm.state.vRegisters[0x7] = 20;
    vm.state.vRegisters[0x9] = 10;
    vm.execute(0xD000, 0xD792); // console.log(`${JSON.stringify(vm.state)}`);
    clonedState.vRegisters[0x7] = 20;
    clonedState.vRegisters[0x9] = 10
    clonedState.vRegisters[0xF] = 0;
    clonedState.display[20 + 10 * 64] = 1;
    clonedState.display[21 + 10 * 64] = 1;
    clonedState.display[20 + 11 * 64] = 1;
    clonedState.display[21 + 11 * 64] = 1;
    clonedState.memory[0x0101] = 0xC0;
    clonedState.memory[0x0102] = 0xC0;
    clonedState.ir = 0x0101;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
    // draw the sprite again at 63,31 (overlaps all edges)...
    vm.state.vRegisters[0x7] = 63;
    vm.state.vRegisters[0x9] = 31;
    vm.execute(0xD000, 0xD792); // console.log(`${JSON.stringify(vm.state)}`);
    clonedState.vRegisters[0x7] = 63;
    clonedState.vRegisters[0x9] = 31;
    clonedState.vRegisters[0xF] = 0;
    clonedState.display[ 0 +  0 * 64] = 1;
    clonedState.display[ 0 + 31 * 64] = 1;
    clonedState.display[63 +  0 * 64] = 1;
    clonedState.display[63 + 31 * 64] = 1;
    clonedState.display[ 1 +  1 * 64] = 0;
    clonedState.display[ 1 + 30 * 64] = 0;
    clonedState.display[62 +  1 * 64] = 0;
    clonedState.display[62 + 30 * 64] = 0;
    clonedState.pc = 0x204;
    expect(vm.state).toEqual(clonedState);
    // draw the sprite again at 22,12 (no pixels erased)...
    vm.state.vRegisters[0x7] = 22;
    vm.state.vRegisters[0x9] = 12;
    vm.execute(0xD000, 0xD792); // console.log(`${JSON.stringify(vm.state)}`);
    clonedState.vRegisters[0x7] = 22;
    clonedState.vRegisters[0x9] = 12;
    clonedState.vRegisters[0xF] = 0;
    clonedState.display[22 + 12 * 64] = 1;
    clonedState.display[23 + 12 * 64] = 1;
    clonedState.display[22 + 13 * 64] = 1;
    clonedState.display[23 + 13 * 64] = 1;
    clonedState.pc = 0x206;
    expect(vm.state).toEqual(clonedState);
    // draw the sprite again at 23,13 (pixel erased)...
    vm.state.vRegisters[0x7] = 23;
    vm.state.vRegisters[0x9] = 13;
    vm.execute(0xD000, 0xD792); // console.log(`${JSON.stringify(vm.state)}`);
    clonedState.vRegisters[0x7] = 23;
    clonedState.vRegisters[0x9] = 13;
    clonedState.vRegisters[0xF] = 1;
    clonedState.display[23 + 13 * 64] = 0;
    clonedState.display[24 + 13 * 64] = 1;
    clonedState.display[23 + 14 * 64] = 1;
    clonedState.display[24 + 14 * 64] = 1;
    clonedState.pc = 0x208;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute EX9E: if the key stored in vx is pressed skip next instruction', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x3] = 6;
    vm.execute(0xE09E, 0xE39E); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}\n${vm.state.keys}`);
    clonedState.vRegisters[0x3] = 6;
    clonedState.pc = 0x202; // key 6 (stored in vRegister 3) is not pressed, so the next instruction is not skipped
    expect(vm.state).toEqual(clonedState);
    vm.state.keys[0x6] = 1;
    vm.execute(0xE09E, 0xE39E); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}\n${vm.state.keys}`);
    clonedState.keys[0x6] = 1;
    clonedState.pc = 0x206; // key 6 (stored in vRegister 3) is pressed, so the next instruction is skipped
    expect(vm.state).toEqual(clonedState);
  });

  test('execute EXA1: if the key stored in vx is not pressed skip next instruction', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x2] = 5;
    vm.execute(0xE0A1, 0xE2A1); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}\n${vm.state.keys}`);
    clonedState.vRegisters[0x2] = 5;
    clonedState.pc = 0x204; // key 5 (stored in vRegister 2) is not pressed, so the next instruction is skipped
    expect(vm.state).toEqual(clonedState);
    vm.state.keys[0x5] = 1;
    vm.execute(0xE0A1, 0xE2A1); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}\n${vm.state.keys}`);
    clonedState.keys[0x5] = 1;
    clonedState.pc = 0x206; // key 5 (stored in vRegister 2) is pressed, so the next instruction is not skipped
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX07: vx = delay_timer', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.dt = 0xAB;
    vm.execute(0xF007, 0xF807); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.dt.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.dt = 0xAB;
    clonedState.vRegisters[0x8] = 0xAB;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX0A: vx = get_key() (wait for a key press then store the key value in vx)', () => {
    vm.init();
    const clonedState = {...vm.state};
    for (let i = 0; i < 10; i++) { // repeated calls while key not pressed, pc value unchanged
      vm.execute(0xF00A, 0xFC0A); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}\n${vm.state.keys}`);
      expect(vm.state).toEqual(clonedState);
    }
    vm.state.keys[0xE] = 1; // press the E key
    vm.execute(0xF00A, 0xFC0A); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.vRegisters}\n${vm.state.keys}`);
    clonedState.keys[0xE] = 1;
    clonedState.vRegisters[0xC] = 0xE; // key value stored in the specified register
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX15: delay_timer = vx', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x7] = 0xA1;
    vm.execute(0xF015, 0xF715); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.dt.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x7] = 0xA1;
    clonedState.dt = 0xA1;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX18: sound_timer = vx', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x1] = 0xD4;
    vm.execute(0xF018, 0xF118); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.st.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x1] = 0xD4;
    clonedState.st = 0xD4;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX1E: i += vx', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0xE] = 0xA6;
    vm.state.ir = 0x24;
    vm.execute(0xF01E, 0xFE1E); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.ir.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0xE] = 0xA6;
    clonedState.ir = 0xCA;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX29: i = sprite_addr[vx] (point i at 5 byte font sprite for hex char at vx)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x3] = 0xF;
    vm.execute(0xF029, 0xF329); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.ir.toString(16)}\n${vm.state.vRegisters}`);
    clonedState.vRegisters[0x3] = 0xF;
    clonedState.ir = 0x004B // F character data should be stored in memory[0x4B:0x4F]
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX30: super chip stub', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0xF030, 0xF030);
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX33: store binary-coded decimal of vx value in memory[i:i+2] (e.g. if i=0 and vx=128, m[0]=1 m[1]=2 m[2]=8)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x5] = 128;
    vm.state.ir = 0xA0;
    vm.execute(0xF033, 0xF533); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.ir.toString(16)}\n${vm.state.vRegisters}\n${vm.state.memory}`);
    clonedState.vRegisters[0x5] = 128;
    clonedState.ir = 0xA0;
    clonedState.memory[0xA0] = 1;
    clonedState.memory[0xA1] = 2;
    clonedState.memory[0xA2] = 8;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX55: reg_dump(vx,&i) (store v0:vx inclusive in memory[i] onwards, i is not modified)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.vRegisters[0x0] = 0x42;
    vm.state.vRegisters[0x1] = 0xD4;
    vm.state.vRegisters[0x2] = 0xAB;
    vm.state.ir = 0x100;
    vm.execute(0xF055, 0xF255); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.ir.toString(16)}\n${vm.state.vRegisters}\n${vm.state.memory}`);
    clonedState.vRegisters[0x0] = 0x42;
    clonedState.vRegisters[0x1] = 0xD4;
    clonedState.vRegisters[0x2] = 0xAB;
    clonedState.ir = 0x100;
    clonedState.memory[0x100] = 0x42;
    clonedState.memory[0x101] = 0xD4;
    clonedState.memory[0x102] = 0xAB;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX65: reg_load(vx,&i) (fill v0:vx inclusive from memory[i] onwards, i is not modified)', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.state.memory[0x100] = 0x26;
    vm.state.memory[0x101] = 0xC2;
    vm.state.memory[0x102] = 0x6A;
    vm.state.memory[0x103] = 0x22;
    vm.state.ir = 0x100;
    vm.execute(0xF065, 0xF365); // console.log(`${vm.state.pc.toString(16)}\n${vm.state.ir.toString(16)}\n${vm.state.vRegisters}\n${vm.state.memory}`);
    clonedState.memory[0x100] = 0x26;
    clonedState.memory[0x101] = 0xC2;
    clonedState.memory[0x102] = 0x6A;
    clonedState.memory[0x103] = 0x22;
    clonedState.ir = 0x100;
    clonedState.vRegisters[0x100] = 0x26;
    clonedState.vRegisters[0x101] = 0xC2;
    clonedState.vRegisters[0x102] = 0x6A;
    clonedState.vRegisters[0x103] = 0x22;
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX75: super chip stub', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0xF075, 0xF075);
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });

  test('execute FX85: super chip stub', () => {
    vm.init();
    const clonedState = {...vm.state};
    vm.execute(0xF085, 0xF085);
    clonedState.pc = 0x202;
    expect(vm.state).toEqual(clonedState);
  });
});
