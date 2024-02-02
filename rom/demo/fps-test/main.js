class Smiley {
  constructor() {
    this.x = randomInt(MIN_COORD, MAX_COORD);
    this.y = randomInt(MIN_COORD, MAX_COORD);
    this.dx = randomInt(0, 1) == 0 ? -1: 1;
    this.dy = randomInt(0, 1) == 0 ? -1: 1;
    this.img = swapImageColors(imgSmiley, [7], [randomInt(1, 6)]);
  }
  update() {
    if(this.x + this.dx > MAX_COORD || this.x + this.dx < MIN_COORD) {
      this.dx = -this.dx;
    }
    if(this.y + this.dy > MAX_COORD || this.y + this.dy < MIN_COORD) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    drawImage(this.x, this.y, 10, 10, this.img);
  }
}

const MIN_COORD = 5;
const MAX_COORD = 49;

const imgSmiley = [
  -1,-1,-1, 0, 0, 0, 0,-1,-1,-1,
  -1,-1, 0, 7, 7, 7, 7, 0,-1,-1,
  -1, 0, 7, 7, 7, 7, 7, 7, 0,-1,
   0, 7, 7, 0, 7, 7, 0, 7, 7, 0,
   0, 7, 7, 0, 7, 7, 0, 7, 7, 0,
   0, 7, 7, 7, 7, 7, 7, 7, 7, 0,
   0, 7, 7, 0, 7, 7, 0, 7, 7, 0,
  -1, 0, 7, 7, 0, 0, 7, 7, 0,-1,
  -1,-1, 0, 7, 7, 7, 7, 0,-1,-1,
  -1,-1,-1, 0, 0, 0, 0,-1,-1,-1,
];

const smileys = [];

function romInit() {
  smileys.push(new Smiley());
}

function romLoop() {
  if ((isJustPressed(BTN_L) || isJustPressed(BTN_D) || isJustPressed(BTN_A))) {
    tryHalveSmileys();
  }
  if ((isJustPressed(BTN_R) || isJustPressed(BTN_U) || isJustPressed(BTN_B))) {
    tryDoubleSmileys();
  }
  clearGfx();
  smileys.forEach((s) => s.update());
  drawText(0, 0, `FPS:${getFps()}`, COL_WHT);
  drawText(0, 59, `${smileys.length}`, COL_WHT);
}

const tryHalveSmileys = () => {
  if (smileys.length >= 2) {
    smileys.splice(0, Math.ceil(smileys.length / 2));
  }
};

const tryDoubleSmileys = () => {
  if (getFps() > 15) {
    const count = smileys.length;
    for (let i = 0; i < count; i++) {
      smileys.push(new Smiley());
    }
  }
};
