class Pad {
  constructor(x, y, color, frequency) {
    this.color = color;
    this.frequency = frequency;
    this.x = x;
    this.y = y;
    this.on = false;
  }
}

const imgGameOver = [
  -1, 2, 2, 2,-1,-1,-1, 2, 2, 2,-1,-1, 2,-1,-1,-1, 2,-1, 2, 2, 2, 2, 2,-1,-1,-1,-1,-1,-1, 2, 2, 2,-1,-1, 2,-1,-1,-1, 2,-1, 2, 2, 2, 2, 2,-1, 2, 2, 2, 2,-1,
   2,-1,-1,-1, 2,-1, 2,-1,-1,-1, 2,-1, 2, 2,-1, 2, 2,-1, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1,-1,-1, 2,-1,-1,-1, 2,
   2,-1,-1,-1,-1,-1, 2,-1,-1,-1, 2,-1, 2,-1, 2,-1, 2,-1, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1,-1,-1, 2,-1,-1,-1, 2,
   2,-1,-1,-1,-1,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1, 2,-1, 2, 2, 2, 2,-1,-1,-1,-1,-1,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1, 2,-1, 2, 2, 2, 2,-1,-1, 2,-1,-1,-1, 2,
   2,-1, 2, 2, 2,-1, 2, 2, 2, 2, 2,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1,-1,-1, 2, 2, 2, 2,-1,
   2,-1,-1,-1, 2,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2,-1,-1,-1, 2,-1,-1, 2,-1, 2,-1,-1, 2,-1,-1,-1,-1,-1, 2,-1,-1,-1, 2,
  -1, 2, 2, 2,-1,-1, 2,-1,-1,-1, 2,-1, 2,-1,-1,-1, 2,-1, 2, 2, 2, 2, 2,-1,-1,-1,-1,-1,-1, 2, 2, 2,-1,-1,-1,-1, 2,-1,-1,-1, 2, 2, 2, 2, 2,-1, 2,-1,-1,-1, 2,
];

const imgTitle = [
  -1, 6, 6, 6, 6, 6, 6, 2,-1, 6, 6, 6, 2,-1, 6, 6, 2,-1,-1, 6, 6, 2,-1,-1, 6, 6, 6, 6, 6, 2,-1,-1, 6, 6, 2,-1,-1, 6, 6, 2,
   6, 6, 6, 2, 2, 2, 2, 2,-1, 6, 6, 6, 2,-1, 6, 6, 6, 2, 6, 6, 6, 2,-1, 6, 6, 6, 2, 6, 6, 6, 2,-1, 6, 6, 6, 6, 2, 6, 6, 2,
   2, 6, 6, 6, 6, 6, 2,-1,-1, 6, 6, 6, 2,-1, 6, 6, 6, 6, 6, 6, 6, 2,-1, 6, 6, 6, 2, 6, 6, 6, 2,-1, 6, 6, 6, 6, 6, 6, 6, 2,
  -1, 2, 2, 2, 6, 6, 6, 2,-1, 6, 6, 6, 2,-1, 6, 6, 2, 6, 2, 6, 6, 2,-1, 6, 6, 6, 2, 6, 6, 6, 2,-1, 6, 6, 2, 6, 6, 6, 6, 2,
   6, 6, 6, 6, 6, 6, 2, 2,-1, 6, 6, 6, 2,-1, 6, 6, 2, 2, 2, 6, 6, 2,-1, 2, 6, 6, 6, 6, 6, 2, 2,-1, 6, 6, 2, 2, 2, 6, 6, 2,
   2, 2, 2, 2, 2, 2, 2,-1,-1, 2, 2, 2, 2,-1, 2, 2, 2,-1,-1, 2, 2, 2,-1,-1, 2, 2, 2, 2, 2, 2,-1,-1, 2, 2, 2,-1,-1, 2, 2, 2,
];

const imgYouWin = [
   4,-1,-1,-1, 4,-1,-1, 4, 4, 4,-1,-1, 4,-1,-1,-1, 4,-1,-1,-1,-1,-1, 4,-1,-1,-1, 4,-1, 4, 4, 4,-1, 4,-1,-1,-1, 4,-1, 4,
   4,-1,-1,-1, 4,-1, 4,-1,-1,-1, 4,-1, 4,-1,-1,-1, 4,-1,-1,-1,-1,-1, 4,-1,-1,-1, 4,-1,-1, 4,-1,-1, 4,-1,-1,-1, 4,-1, 4,
   4,-1,-1,-1, 4,-1, 4,-1,-1,-1, 4,-1, 4,-1,-1,-1, 4,-1,-1,-1,-1,-1, 4,-1,-1,-1, 4,-1,-1, 4,-1,-1, 4, 4,-1,-1, 4,-1, 4,
  -1, 4,-1, 4,-1,-1, 4,-1,-1,-1, 4,-1, 4,-1,-1,-1, 4,-1,-1,-1,-1,-1, 4,-1,-1,-1, 4,-1,-1, 4,-1,-1, 4,-1, 4,-1, 4,-1, 4,
  -1,-1, 4,-1,-1,-1, 4,-1,-1,-1, 4,-1, 4,-1,-1,-1, 4,-1,-1,-1,-1,-1, 4,-1, 4,-1, 4,-1,-1, 4,-1,-1, 4,-1,-1, 4, 4,-1, 4,
  -1,-1, 4,-1,-1,-1, 4,-1,-1,-1, 4,-1, 4,-1,-1,-1, 4,-1,-1,-1,-1,-1, 4, 4,-1, 4, 4,-1,-1, 4,-1,-1, 4,-1,-1,-1, 4,-1,-1,
  -1,-1, 4,-1,-1,-1,-1, 4, 4, 4,-1,-1,-1, 4, 4, 4,-1,-1,-1,-1,-1,-1, 4,-1,-1,-1, 4,-1, 4, 4, 4,-1, 4,-1,-1,-1, 4,-1, 4,
];

const fontLevel = {
  charWidth: 6,
  charHeight: 8,
  charTrackingDefault: 1,
  charMap: [
    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
    [0,1,1,1,1,0,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,0], // 0
    [0,0,1,1,0,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,1,1,0], // 1
    [0,1,1,1,1,0,1,1,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1], // 2
    [0,1,1,1,1,0,1,1,0,0,1,1,0,0,0,0,1,1,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,0], // 3
    [0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,1,0,1,1,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,0], // 4
    [1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,0], // 5
    [0,1,1,1,1,0,1,1,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,0], // 6
    [1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0], // 7
    [0,1,1,1,1,0,1,1,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,0,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,0], // 8
    [0,1,1,1,1,0,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,0], // 9
    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
  ],
};

const states = { title: 0, demo: 1, input: 2, over: 3 };
const firstLevel = 1;
const lastLevel = 25;

let state;
let ticks;
let pads;
let targetSequence;
let inputSequence;
let currentInputPadIndex;
let currentSequenceIndex;
let currentLevel;

function romInit() {
  pads = [new Pad(22,  1, COL_CYN, 329.6276), new Pad(22, 43, COL_YEL, 277.1826), new Pad( 1, 22, COL_RED, 220.0000), new Pad(43, 22, COL_GRN, 164.8138)];
  targetSequence = [];
  for (let i = 0; i < lastLevel; i++) {
    targetSequence[i] = randomInt(0, 3);
  }
  /*
  let debugInfo = ''
  for (let i = 0; i < targetSequence.length; i++) {
    debugInfo += targetSequence[i] === 0 ? 'U ' : targetSequence[i] === 1 ? 'D ' : targetSequence[i] === 2 ? 'L ' : 'R ';
    if ((i + 1) % 5 === 0) debugInfo += '\n';
  }
  console.log(debugInfo);
  */
  inputSequence = [];
  currentInputPadIndex = -1;
  currentSequenceIndex = 0;
  currentLevel = firstLevel;
  changeState(states.title);
}

function romLoop() {
  ticks++;
  clearGfx();
  if (state === states.title) {
    loopStateTitle();
  } else if (state === states.demo) {
    loopStateDemo();
  } else if (state === states.input) {
    loopStateInput();
  } else {
    loopStateOver();
  }
}

function loopStateTitle() {
  drawImage(12, 29, 40, 6, imgTitle);
  if (ticks > 60 && (isPressed(BTN_U) || isPressed(BTN_D) || isPressed(BTN_L) || isPressed(BTN_R) || isPressed(BTN_A) || isPressed(BTN_B))) {
    changeState(states.demo);
  }
}

function loopStateDemo() {
  if (currentSequenceIndex < currentLevel) {
    if (ticks < 15) {
      pads[targetSequence[currentSequenceIndex]].on = false;
    } else if (ticks < 40) {
      pads[targetSequence[currentSequenceIndex]].on = true;
    } else if (ticks < 50) {
      pads[targetSequence[currentSequenceIndex]].on = false;
    } else {
      currentSequenceIndex++;
      ticks = 0;
    }
  } else {
    currentInputPadIndex = -1;
    currentSequenceIndex = 0;
    changeState(states.input);
  }
  const levelText = `${currentLevel}`;
  drawText(Math.ceil((64 - levelText.length * 7) / 2), 28, levelText, COL_WHT, {font: fontLevel});
  padsOutput();
}

function loopStateInput() {
  if (currentSequenceIndex < currentLevel) {
    if (currentInputPadIndex < 0) {
      if (isPressed(BTN_U)) {
        currentInputPadIndex = 0;
      } else if (isPressed(BTN_D)) {
        currentInputPadIndex = 1;
      } else if (isPressed(BTN_L)) {
        currentInputPadIndex = 2;
      } else if (isPressed(BTN_R)) {
        currentInputPadIndex = 3;
      }
    } else {
      pads[currentInputPadIndex].on = true;
      if (!isPressed(BTN_U) && !isPressed(BTN_D) && !isPressed(BTN_L) && !isPressed(BTN_R)) {
        pads[currentInputPadIndex].on = false;
        inputSequence[currentSequenceIndex] = currentInputPadIndex;
        if (inputSequence[currentSequenceIndex] != targetSequence[currentSequenceIndex]) {
          changeState(states.over);
        } else {
          currentInputPadIndex = -1;
          currentSequenceIndex++;
        }
      }
    }
  } else {
    if (currentLevel < lastLevel) {
      currentLevel++;
      currentSequenceIndex = 0;
      changeState(states.demo);
    } else {
      changeState(states.over);
    }
  }
  padsOutput();
}

function loopStateOver() {
  if (inputSequence.toString() === targetSequence.toString()) {
    drawImage(12, 4, 39, 7, imgYouWin);
  } else {
    drawImage(6, 4, 51, 7, imgGameOver);
  }
  for (let i = 0; i < currentLevel; i++) {
    const targetColor = targetSequence[i] === 0 ? COL_CYN : targetSequence[i] === 1 ? COL_YEL : targetSequence[i] === 2 ? COL_RED : targetSequence[i] === 3 ? COL_GRN : COL_BLK;
    const inputColor = inputSequence[i] === 0 ? COL_CYN : inputSequence[i] === 1 ? COL_YEL : inputSequence[i] === 2 ? COL_RED : inputSequence[i] === 3 ? COL_GRN : COL_BLK;
    drawRectangle(12 + (i % 5) * 8, 14 + Math.floor(i / 5) * 8, 7, 7, targetColor, inputColor);
  }
  const levelText = `LEVEL ${currentLevel}`;
  drawText((64 - levelText.length * 4) / 2, 56, levelText, COL_WHT);
  if (ticks > 60 && (isPressed(BTN_U) || isPressed(BTN_D) || isPressed(BTN_L) || isPressed(BTN_R) || isPressed(BTN_A) || isPressed(BTN_B))) {
    romInit();
  }
}

function changeState(newState) {
  state = newState;
  ticks = 0;
}

function padsOutput() {
  for (const pad of pads) {
    drawRectangle(pad.x, pad.y, 20, 20, pad.color, pad.on ? pad.color : 0);
    if (pad.on) {
      beep(pad.frequency, 1, true);
    }
  }
}
