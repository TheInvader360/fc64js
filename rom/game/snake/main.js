// inspired by https://wasm4.org/docs/tutorials/snake/goal

class Snake {
  constructor() {
    this.body = [];
    this.direction = {};
  }
  init() {
    this.body = [new Vec2(2, 0), new Vec2(1, 0), new Vec2(0, 0)];
    this.direction = new Vec2(1, 0);
  }
  draw() {
    for (const segment of this.body) {
      drawRectangle(segment.x * 4, segment.y * 4, 4, 4, COL_GRN, COL_YEL);
    }
    drawRectangle(this.body[0].x * 4, this.body[0].y * 4, 4, 4, COL_GRN, COL_GRN);
  }
  update() {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    const head = this.body[0];
    head.x = wrap(head.x + this.direction.x, 0, 16);
    head.y = wrap(head.y + this.direction.y, 0, 16);
  }
  tryUp() {
    if (this.direction.y == 0) {
      this.direction.x = 0;
      this.direction.y = -1;
    }
  }
  tryDown() {
    if (this.direction.y == 0) {
      this.direction.x = 0;
      this.direction.y = 1;
    }
  }
  tryLeft() {
    if (this.direction.x == 0) {
      this.direction.x = -1;
      this.direction.y = 0;
    }
  }
  tryRight() {
    if (this.direction.x == 0) {
      this.direction.x = 1;
      this.direction.y = 0;
    }
  }
  isDead() {
    const head = this.body[0];
    for (let i = 1; i < this.body.length; i++) {
      if (this.body[i].equals(head)) {
        return true;
      }
    }
    return false;
  }
}

const imgFruit = [
  -1, 2, 2,-1,
   2, 2, 2, 2,
   2, 2, 2, 2,
  -1, 2, 2,-1,
];

let snake;
let fruit;
let ticks;
let gameOver;

function romInit() {
  snake = new Snake();
  snake.init();
  fruit = new Vec2(randomInt(0, 15), randomInt(0, 15));
  ticks = 0;
  gameOver = false;
}

function romLoop() {
  ticks++;
  clearGfx(COL_WHT);
  if (gameOver) {
    drawText('GAME', 24, 26, COL_BLK);
    drawText('OVER', 24, 32, COL_BLK);
    drawText(`SCORE:${snake.body.length - 3}`, 16, 44, COL_BLK);
    if (isJustPressed(BTN_U) || isJustPressed(BTN_D) || isJustPressed(BTN_L) || isJustPressed(BTN_R) || isJustPressed(BTN_A) || isJustPressed(BTN_B)) {
      romInit();
    }
  } else {
    handleGameplayInput();
    drawImage(fruit.x * 4, fruit.y * 4, 4, 4, imgFruit);
    if (ticks % 10 == 0) {
      snake.update();
      if (snake.isDead()) {
        beep(280, 15, true);
        gameOver = true;
      }
      if (snake.body[0].equals(fruit)) {
        beep(1000, 5, true);
        const tailTip = snake.body[snake.body.length - 1];
        snake.body.push(new Vec2(tailTip.x, tailTip.y));
        fruit.x = randomInt(0, 15);
        fruit.y = randomInt(0, 15);
      }
    }
    snake.draw();
  }
}

function handleGameplayInput() {
  if (isJustPressed(BTN_U)) {
    snake.tryUp();
  }
  if (isJustPressed(BTN_D)) {
    snake.tryDown();
  }
  if (isJustPressed(BTN_L)) {
    snake.tryLeft();
  }
  if (isJustPressed(BTN_R)) {
    snake.tryRight();
  }
}
