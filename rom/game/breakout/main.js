class Paddle {
  constructor(x, y, maxVelocity) {
    this.bounds = new Rect(x, y, 11, 2);
    this.maxVelocity = maxVelocity;
  }
}

class Ball {
  constructor(x, y, vx, vy) {
    this.bounds = new Rect(x, y, 2, 2);
    this.velocity = new Vec2(vx, vy);
  }
}

class Brick {
  constructor(x, y, points, color) {
    this.bounds = new Rect(x, y, 7, 4);
    this.points = points;
    this.color = color;
  }
}

class FloatingText {
  constructor(x, y, content) {
    this.x = x;
    this.y = y;
    this.content = content;
    this.minY = y - 10;
  }
}

const imgHeart = [
  -1, 2,-1, 2,-1,
   2, 2, 2, 2, 2,
   2, 2, 2, 2, 2,
  -1, 2, 2, 2,-1,
  -1,-1, 2,-1,-1,
];

const floatingTextFont = {
  charWidth: 3,
  charHeight: 4,
  charTrackingDefault: 1,
  charMap: [
    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
    [1,1,1,1,0,1,1,0,1,1,1,1], // 0
    [0,1,0,1,1,0,0,1,0,0,1,0], // 1
    [1,1,0,0,0,1,1,1,0,1,1,1], // 2
    [],[],
    [1,1,1,1,1,0,0,0,1,1,1,0], // 5
    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
  ],
};

const states = {
  title: 0,
  waiting: 1,
  playing: 2,
  gameOver: 3,
};

let state;
let stateTicks;
let score;
let lives;
let level;
let arena;
let paddle;
let ball;
let bricks;
let floatingTexts;

function romInit() {
  changeState(states.title);
  score = 0;
  lives = 3;
  level = 0;
  newLevel();
}

function romLoop() {
  stateTicks++;
  clearGfx();
  if (state == states.title) {
    drawText(16, 29, 'BREAKOUT', COL_WHT);
    if (stateTicks > 60 && (isPressed(BTN_L) || isPressed(BTN_R) || isPressed(BTN_A) || isPressed(BTN_B))) {
      changeState(states.waiting);
    }
  } else if (state == states.waiting) {
    drawGameWorld();
    drawGameInfoPanel();
    if (stateTicks > 20 && (isPressed(BTN_L) || isPressed(BTN_R) || isPressed(BTN_A) || isPressed(BTN_B))) {
      newBall();
      changeState(states.playing);
    }
  } else if (state == states.playing) {
    handleGameInput();
    updateGameWorld();
    drawGameWorld();
    manageFloatingTexts();
    drawGameInfoPanel();
  } else if (state == states.gameOver) {
    drawGameWorld();
    drawGameInfoPanel();
    drawRectangle(20, 22, 23, 19, COL_WHT, COL_RED);
    drawText(24, 26, 'GAME', COL_WHT);
    drawText(24, 32, 'OVER', COL_WHT);
    if (stateTicks > 60 && (isPressed(BTN_L) || isPressed(BTN_R) || isPressed(BTN_A) || isPressed(BTN_B))) {
      romInit();
    }
  }
}

function newLevel() {
  level++;
  arena = new Rect(1, 1, 61, 63);
  paddle = new Paddle(26, 54, calculateMaxVelocity('paddle'));
  bricks = [];
  for (let i = 0; i < 7; i++) {
    bricks.push(new Brick(i * 8 + 4, 8, 50, COL_RED));
    bricks.push(new Brick(i * 8 + 4, 13, 25, COL_GRN));
    bricks.push(new Brick(i * 8 + 4, 18, 15, COL_BLU));
    bricks.push(new Brick(i * 8 + 4, 23, 10, COL_YEL));
  }
  floatingTexts = [];
}

function newBall() {
  const targetVelocityXY = calculateMaxVelocity('ball');
  let velocityX = targetVelocityXY * (randomInt(0, 10) / 15);
  let velocityY = Math.sqrt(targetVelocityXY * targetVelocityXY - velocityX * velocityX);
  if (velocityY > 0) {
    velocityY = -velocityY;
  }
  if (Math.random() < 0.5) {
    velocityX = -velocityX;
  }
  ball = new Ball(paddle.bounds.x + 4, paddle.bounds.y - 3, velocityX, velocityY);
}

function handleGameInput() {
  if (isPressed(BTN_L) || isPressed(BTN_A)) {
    paddle.bounds.x = clamp(paddle.bounds.x - paddle.maxVelocity, arena.x, arena.x + arena.width - paddle.bounds.width);
  }
  if (isPressed(BTN_R) || isPressed(BTN_B)) {
    paddle.bounds.x = clamp(paddle.bounds.x + paddle.maxVelocity, arena.x, arena.x + arena.width - paddle.bounds.width);
  }
}

function updateGameWorld() {
  moveBall();
  handleBallOutOfBounds();
  handleBallAndPaddleCollisions();
  handleBallAndBrickCollisions();
  handleLevelClear();
}

function moveBall() {
  const ballMinX = arena.x;
  const ballMaxX = arena.x + arena.width - ball.bounds.width;
  const ballMinY = arena.y;
  const ballMaxY = arena.y + arena.height - ball.bounds.height;
  if (ball.bounds.x + ball.velocity.x > ballMaxX || ball.bounds.x + ball.velocity.x < ballMinX) {
    beep(500, 3, true);
    ball.velocity.x = -ball.velocity.x;
  }
  if (ball.bounds.y + ball.velocity.y > ballMaxY || ball.bounds.y + ball.velocity.y < ballMinY) {
    beep(500, 3, true);
    ball.velocity.y = -ball.velocity.y;
  }
  ball.bounds.x += ball.velocity.x;
  ball.bounds.y += ball.velocity.y;
}

function handleBallOutOfBounds() {
  if (ball.bounds.y > paddle.bounds.y) {
    ball.bounds.y = -10;
    lives--;
    if (lives > 0) {
      beep(400, 10, true);
      changeState(states.waiting);
    } else {
      beep(150, 30, true);
      changeState(states.gameOver);
    }
  }
}

function handleBallAndPaddleCollisions() {
  if (ball.bounds.overlaps(paddle.bounds)) {
    beep(2000, 3, true);
    // artificially adjust the ball's position to avoid it potentially getting stuck
    ball.bounds.y = paddle.bounds.y - ball.bounds.height;
    // see https://gamedev.stackexchange.com/a/21048...
    const ballCenterX = ball.bounds.x + ball.bounds.width / 2;
    const paddleCenterX = paddle.bounds.x + paddle.bounds.width / 2;
    // use pythagoras theorem to calculate the ball's overall velocity (always positive)
    const originalVelocityXY = Math.sqrt(ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y);
    // calculate ball position relative to the center of the paddle and express as a number between -1 and +1 (note: collisions at the ends of the paddle may exceed this range and that is ok)
    const relativePositionX = (ballCenterX - paddleCenterX) / (paddle.bounds.width / 2);
    // define a magic number (tweak as needed) to control the amount of influence the ball's position against the paddle has on x velocity (must be between 0 and 1)
    const influenceX = 0.5;
    // let the new x velocity be proportional to the ball's position on the paddle, and the original combined velocity, and limit it by the influence factor
    ball.velocity.x = originalVelocityXY * relativePositionX * influenceX;
    // calculate the new y velocity based on the new x velocity ensuring the new combined velocity remains constant (pythagoras again) - the new y velocity will always be non-zero provided x velocity is less than the original combined velocity
    ball.velocity.y = Math.sqrt(originalVelocityXY * originalVelocityXY - ball.velocity.x * ball.velocity.x) * (ball.velocity.y > 0 ? -1 : 1);
  }
}

function handleBallAndBrickCollisions() {
  for (let i = bricks.length - 1; i >= 0; i--) {
    const brick = bricks[i];
    if (ball.bounds.overlaps(brick.bounds)) {
      beep(500 + (brick.points * 2), 3, true);
      const ballRelativeBrickU = ball.bounds.y < brick.bounds.y;
      const ballRelativeBrickD = ball.bounds.y + ball.bounds.height > brick.bounds.y + brick.bounds.height;
      const ballRelativeBrickL = ball.bounds.x < brick.bounds.x;
      const ballRelativeBrickR = ball.bounds.x + ball.bounds.width > brick.bounds.x + brick.bounds.width;
      if ((ballRelativeBrickU && ballRelativeBrickL) || (ballRelativeBrickU && ballRelativeBrickR) || (ballRelativeBrickD && ballRelativeBrickL) || (ballRelativeBrickD && ballRelativeBrickR)) {
        ball.velocity.x = Math.abs(ball.velocity.x);
        ball.velocity.y = Math.abs(ball.velocity.y);
        if (ballRelativeBrickU && ballRelativeBrickL) {
          ball.velocity.x *= -1;
          ball.velocity.y *= -1;
        } else if (ballRelativeBrickU && ballRelativeBrickR) {
          ball.velocity.y *= -1;
        } else if (ballRelativeBrickD && ballRelativeBrickL) {
          ball.velocity.x *= -1;
        }
      } else if (ballRelativeBrickU || ballRelativeBrickD) {
        ball.velocity.y *= -1;
      } else {
        ball.velocity.x *= -1;
      }
      score += brick.points;
      floatingTexts.push(new FloatingText(brick.bounds.x, brick.bounds.y, `${bricks[i].points}`));
      bricks.splice(i, 1);
    }
  }
}

function handleLevelClear() {
  if (bricks.length == 0) {
    ball.bounds.y = -10;
    newLevel();
    changeState(states.waiting);
  }
}

function drawGameWorld() {
  drawLine(0, 63, 0, 0, COL_CYN);
  drawLine(0, 0, 62, 0, COL_CYN);
  drawLine(62, 0, 62, 63, COL_CYN);
  drawRectangle(Math.round(paddle.bounds.x), Math.round(paddle.bounds.y), paddle.bounds.width, paddle.bounds.height, COL_MAG);
  if (ball) {
    drawRectangle(Math.round(ball.bounds.x), Math.round(ball.bounds.y), ball.bounds.width, ball.bounds.height, COL_WHT);
  }
  bricks.forEach(brick => {
    drawRectangle(brick.bounds.x, brick.bounds.y, brick.bounds.width, brick.bounds.height, brick.color, brick.color);
  });
}

function drawGameInfoPanel() {
  drawText(4, 59, 'SCORE', COL_YEL);
  drawPattern(24, 61, [{ x: 0, y: -1 }, { x: 0, y: 1 }], COL_YEL);
  drawText(26, 59, `${score < 999999 ? score : 999999}`, COL_WHT);
  if (lives > 0) {
    drawImage(50, 59, 5, 5, imgHeart);
    drawText(56, 59, `${lives}`, COL_WHT);
  }
}

function manageFloatingTexts() {
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const floatingText = floatingTexts[i];
    floatingText.y -= 0.2;
    drawText(floatingText.x, Math.round(floatingText.y), floatingText.content, stateTicks % 15 < 5 ? COL_CYN : stateTicks % 15 < 10 ? COL_MAG : COL_YEL, { font: floatingTextFont });
    if (floatingText.y < floatingText.minY) {
      floatingTexts.splice(i, 1);
    }
  }
}

function changeState(newState) {
  state = newState;
  stateTicks = 0;
}

function calculateMaxVelocity(entity) {
  const baseValue = clamp(0.6 + ((0.1 * level)), 0.7, 1.2);
  return (entity == 'ball') ? baseValue : baseValue + 0.1;
}
