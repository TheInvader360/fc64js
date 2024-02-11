const selected = options[Math.floor(Math.random() * options.length)];
romPalette = selected.palette;

function romInit() {
  for (let i = 0; i < 8; i++) {
    drawRectangle(0, i * 8, 64, 8, i, i);
  }
  drawText(18, 9, 'PALETTE', 6);
  drawText(32 - selected.name.length * 2, 17, selected.name, 5);
  drawText(14, 41, 'RELOAD TO', 2);
  drawText(14, 49, 'RANDOMIZE', 1);
}

function romLoop() {}
