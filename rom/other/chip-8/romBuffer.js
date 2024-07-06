// rom data from a raw binary (see https://github.com/taniarascia/chip8/blob/master/classes/RomBuffer.js)
export class RomBuffer {
  constructor(fileContents) {
    this.data = [];
    const buffer = fileContents; // read the raw data buffer from the file
    for (let i = 0; i < buffer.length; i += 2) this.data.push((buffer[i] << 8) | (buffer[i + 1])); // create 16 bit big endian opcodes from the buffer
  }
  hexDump() {
    let lines = [];
    for (let i = 0; i < this.data.length; i += 8) {
      const address = (i * 2).toString(16).padStart(6, '0');
      const block = this.data.slice(i, i + 8);
      const hexString = block.map(value => value.toString(16).padStart(4, '0')).join(' ');
      lines.push(`${address} ${hexString}`);
    }
    return lines.join('\n');
  }
}
