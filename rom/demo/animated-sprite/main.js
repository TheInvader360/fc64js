class Anim {
  constructor(frames, frameTicks, looping) {
    this.frames = frames;
    this.frameTicks = frameTicks;
    this.looping = looping;
  }
  getKeyFrame(stateTicks) {
    if (this.frames.length === 1) {
      return this.frames[0];
    }
    let index = Math.floor(stateTicks / this.frameTicks);
    if (this.looping) {
      index = index % this.frames.length;
    } else {
      index = Math.min(this.frames.length - 1, index);
    }
    return this.frames[index];
  }
  isFinished(stateTicks) {
    if (this.looping) {
      return false;
    }
    return stateTicks >= this.frames.length * this.frameTicks;
  }
}

const STATE_IDLE = 'IDLE';
const STATE_KICK = 'KICK';
const STATE_SLASH = 'SLASH';
const STATE_WALK = 'WALK';

const animations = new Map([
  [STATE_IDLE, new Anim([imgStance], 0, false)],
  [STATE_KICK, new Anim([imgStance, imgKick0, imgKick1, imgKick0], 10, false)],
  [STATE_SLASH, new Anim([imgStance, imgSlash0, imgSlash1, imgSlash2, imgSlash1], 10, false)],
  [STATE_WALK, new Anim([imgWalk0, imgWalk1, imgWalk2, imgStance], 10, true)],
]);

let state = STATE_IDLE;
let stateTicks = 0;

function romInit() {}

function romLoop() {
  stateTicks++;
  handleInput();
  clearGfx(COL_CYN);
  drawRectangle(0, 46, 64, 18, COL_GRN, COL_GRN);
  drawText(state, 44, 3, COL_RED);
  drawImage(1, 1, 58, 63, animations.get(state).getKeyFrame(stateTicks));
}

function handleInput() {
  switch(state) {
    case STATE_IDLE:
      if (isPressed(BTN_L) || isPressed(BTN_R)) {
        changeState(STATE_WALK);
      }
      if (isJustPressed(BTN_A)) {
        changeState(STATE_SLASH);
      }
      if (isJustPressed(BTN_B)) {
        changeState(STATE_KICK);
      }
      break;
    case STATE_KICK:
      if (animations.get(STATE_KICK).isFinished(stateTicks)) {
        changeState(STATE_IDLE);
      }
      break;
    case STATE_SLASH:
      if (animations.get(STATE_SLASH).isFinished(stateTicks)) {
        changeState(STATE_IDLE);
      }
      break;
    case STATE_WALK:
      if (!isPressed(BTN_L) && !isPressed(BTN_R)) {
        changeState(STATE_IDLE);
      }
      if (isJustPressed(BTN_A)) {
        changeState(STATE_SLASH);
      }
      if (isJustPressed(BTN_B)) {
        changeState(STATE_KICK);
      }
      break;
  }
}

function changeState(newState) {
  state = newState;
  stateTicks = 0;
}
