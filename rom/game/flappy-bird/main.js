romPalette = [0x254a25, 0xa5e2f1, 0xb57935, 0xac0029, 0x3cbe3a, 0xcae5ca, 0xfad981, 0xf7fcf7]; // 0=BLK 1=BLU 2=RED 3=MAG 4=GRN 5=CYN 6=YEL 7=WHT

class Bird {
  static width = 8;
  static height = 5;
  constructor() {
    this.velocityY = 0;
  }
  reset() {
    this.x = 6;
    this.y = GFX_H / 2 - Bird.height / 2
    this.alive = true;
  }
  flap() {
    this.velocityY = -1.25;
  }
  update() {
    this.velocityY += gravity;
    this.y += this.velocityY;
  }
}

class PipePair {
  static width = 8;
  static gap = 26;
  constructor(slot) {
    this.x = GFX_W + slot * (PipePair.width + PipePair.gap);
    this.randomiseY();
  }
  randomiseY() {
    this.y = randomInt(6, 28); // the y value refers to the bottom edge of the top pipe
  }
  update() {
    this.x -= speed;
  }
}

const states = { waiting: 0, playing: 1, gameOver: 2 };
const bird = new Bird();
const pipePairs = [];
const gravity = 0.05;
const speed = 0.6;
const groundLevel = 60;
let sceneryScrollCounter = 0;
let highScore = 0;
let score, state, stateTicks;

function romInit() {
  loadAssets();
  resetGame();
}

function romLoop() {
  stateTicks++;
  if (state == states.waiting) {
    if (isJustPressed(BTN_A) && stateTicks > 30) changeState(states.playing);
    sceneryScrollCounter--;
  }
  if (state == states.playing) {
    if (isJustPressed(BTN_A)) {
      beep(300, 3, true);
      bird.flap();
    }
    sceneryScrollCounter--;
    bird.update();
    pipePairs.map(pipePair => {
      pipePair.update();
      // when a pair of pipes go off screen: play a sound, increment score, reposition the pipes to the furthest slot, randomise their height, and move them to the end of the pipePairs array
      if (pipePair.x <= -PipePair.width){
        beep(800, 3, true);
        score++;
        highScore = Math.max(score, highScore);
        pipePairs[0].x += 3 * (PipePair.width + PipePair.gap);
        pipePairs[0].randomiseY();
        pipePairs.push(pipePairs.shift());
      }
      // if the bird hits the ground or a pipe it's game over... collision logic:
      // bottom of bird below ground OR (left edge of pipes <= right edge of bird AND right edge of pipes >= left edge of bird AND (bottom of top pipe below top of bird OR top of bottom pipe above bottom of bird))
      if (bird.y + Bird.height > groundLevel || (pipePair.x <= bird.x + Bird.width && pipePair.x + PipePair.width >= bird.x && (pipePair.y > bird.y || pipePair.y + PipePair.gap < bird.y + Bird.height))) {
        beep(85, 30, true);
        bird.flap();
        bird.alive = false;
        changeState(states.gameOver);
      }
    });
  }
  if (state == states.gameOver) {
    if (isJustPressed(BTN_A) && gameOverSequenceComplete()) resetGame();
    bird.update();
    if (bird.y + Bird.height > groundLevel) bird.y = groundLevel - Bird.height;
  }
  drawWorld();
  drawHud();
}

const resetGame = () => {
  bird.reset();
  bird.flap();
  pipePairs.length = 0;
  for (let i = 0; i < 3; i++) pipePairs.push(new PipePair(i));
  score = 0;
  changeState(states.waiting);
}

const changeState = (newState) => {
  state = newState;
  stateTicks = 0;
}

const drawWorld = () => {
  drawRectangle(0, 0, GFX_W, 34, COL_BLU, COL_BLU); // static sky
  drawImage((Math.round((sceneryScrollCounter * speed / 2) % GFX_W) + GFX_W), 34, GFX_W, 19, images.get('background')); // parallax scrolling background slide 1 (sky, clouds, and trees)
  drawImage(Math.round((sceneryScrollCounter * speed / 2) % GFX_W), 34, GFX_W, 19, images.get('background')); // parallax scrolling background slide 2 (sky, clouds, and trees)
  drawRectangle(0, 53, GFX_W, 12, COL_CYN, COL_CYN); // static trees
  pipePairs.map(pipePair => {
    drawImage(Math.round(pipePair.x), Math.round(pipePair.y) - 36, PipePair.width, 36, images.get('pipe')) // top pipe
    drawImage(Math.round(pipePair.x), Math.round(pipePair.y + PipePair.gap), PipePair.width, 36, images.get('pipe'), { flipY: true }) // bottom pipe
  });
  drawImage((Math.round((sceneryScrollCounter * speed) % GFX_W) + GFX_W), Math.round(groundLevel), GFX_W, Math.round(GFX_H - groundLevel), images.get('ground')); // parallax scrolling foreground slide 1 (ground)
  drawImage(Math.round((sceneryScrollCounter * speed) % GFX_W), Math.round(groundLevel), GFX_W, Math.round(GFX_H - groundLevel), images.get('ground')); // parallax scrolling foreground slide 2 (ground)
  if (bird.alive) drawImage(Math.round(bird.x), Math.round(bird.y), Math.round(Bird.width), Math.round(Bird.height), animations.get('bird').getKeyFrame(stateTicks)); // animated live bird
  else drawImage(Math.round(bird.x), Math.round(bird.y), Math.round(Bird.width), Math.round(Bird.height), images.get('bird0'), { flipY: true }); // non-animated dead bird
}

const drawHud = () => {
  if (state == states.waiting) {
    drawImage(1, 2, 62, 17, images.get('logo'));
    if (stateTicks % 60 > 20) drawHudTextLine('C', 41, 'PRESS A TO PLAY', -1, COL_MAG);
  }
  if (gameOverSequenceComplete()) {
    const bgColor = stateTicks % 60 > 30 ? COL_YEL : COL_MAG;
    const textColor = stateTicks % 60 > 30 ? COL_MAG : COL_YEL;
    drawHudTextLine('C', 21, 'GAME', bgColor, textColor);
    drawHudTextLine('C', 27, 'OVER', bgColor, textColor);
  }
  if (state != states.waiting) drawHudTextLine('R', 1, `S=${score}`, COL_MAG, COL_YEL);
  drawHudTextLine('R', 58, `H=${highScore}`, COL_MAG, COL_YEL);
}

const drawHudTextLine = (alignment, y, content, bgColor, textColor) => {
  const contentWidth = content.length * 4;
  const x = alignment == 'C' ? (GFX_W - contentWidth) / 2 : alignment == 'R' ? GFX_W - contentWidth : 0;
  if (bgColor >= 0 && bgColor < 8) drawRectangle(x - 1, y - 1, contentWidth + 1, 7, bgColor, bgColor)
  drawText(x, y, content, textColor);
}

const gameOverSequenceComplete = () => state == states.gameOver && stateTicks > 30 && bird.y + Bird.height >= groundLevel;
