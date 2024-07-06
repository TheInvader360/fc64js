import { RomBuffer } from './romBuffer.js';
import * as vm from './vm.js';

export async function loadRom(filename) {
  const response = await fetch(`./rom/bin/${filename}`);
  const arrayBuffer = await response.arrayBuffer();
  const uint8View = new Uint8Array(arrayBuffer);
  const romBuffer = new RomBuffer(uint8View);
  // console.log(romBuffer.hexDump());
  for (let i = 0; i < romBuffer.data.length; i++) { // load rom data into memory from address 0x200 (0d512) (8 bit memory and 16 bit opcodes means each opcode is split across two addresses)
    vm.state.memory[0x200 + 2 * i] = romBuffer.data[i] >> 8; // store the most significant byte first (e.g. 0x12 for 0x1234)
    vm.state.memory[0x200 + 2 * i + 1] = romBuffer.data[i] & 0x00ff; // then store the least significant byte (e.g. 0x34 for 0x1234)
  }
  // console.log(state.memory);
}
