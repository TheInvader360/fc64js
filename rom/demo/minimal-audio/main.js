const FREQUENCY_MIN = 1250;
const FREQUENCY_MAX = 1750;
let frequency = 1500;

function romInit() {
  console.log('romInit');
  poke(ADDRESS_AUD, Math.floor(frequency));
}

function romLoop() {
  console.log(`romLoop - fps: ${peek(ADDRESS_FPS)} - frequency: ${peek(ADDRESS_AUD)} / duration: ${peek(ADDRESS_AUD + 1)}`);

  if ((peek(ADDRESS_BTN + BTN_U) > 0 || peek(ADDRESS_BTN + BTN_R) > 0) && frequency <= FREQUENCY_MAX) {
    poke(ADDRESS_AUD, Math.floor(frequency++));
  }
  if ((peek(ADDRESS_BTN + BTN_D) > 0 || peek(ADDRESS_BTN + BTN_L) > 0) && frequency >= FREQUENCY_MIN) {
    poke(ADDRESS_AUD, Math.floor(frequency--));
  }

  if (peek(ADDRESS_BTN + BTN_A) > 0) {
    poke(ADDRESS_AUD + 1, 60); // start playing sound for ~1 second
  }
  if (peek(ADDRESS_BTN + BTN_B) > 0) {
    poke(ADDRESS_AUD + 1, 0); // stop playing sound immediately
  }
}
