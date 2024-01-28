function romInit() {
  //console.log('romInit');
}

function romLoop() {
  //console.log(`romLoop - fps: ${peek(ADDRESS_FPS)}`);
  for (let i = ADDRESS_GFX; i < ADDRESS_GFX + GFX_W * GFX_H; i++) {
    poke(i, Math.floor(Math.random() * 8));
  }
}
