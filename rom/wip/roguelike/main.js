const states = { title: 0, explore: 1, status: 2, item: 3, gameOver: 4 };
let state;
let stateTicks;
let player;
let inventory;
let notification;
let currentLevel;

function romInit() {
  loadImages();
  resetGame();
}

function romLoop() {
  stateTicks++;
  if (notification.active) {
    drawRectangle(1, 22, 62, 13, COL_RED, COL_RED);
    const c = stateTicks % 20 < 10 ? COL_WHT : COL_YEL;
    drawText(2, 23, notification.line1, c);
    drawText(2, 29, notification.line2, c);
    if (isJustPressed(BTN_U) || isJustPressed(BTN_D) || isJustPressed(BTN_L) || isJustPressed(BTN_R) || isJustPressed(BTN_A) || isJustPressed(BTN_B)) notification.active = false;
  } else {
    if (state === states.title) loopTitle();
    else if (state === states.explore) loopExplore();
    else if (state === states.status) loopStatus();
    else if (state === states.item) loopItem();
    else if (state === states.gameOver) loopGameOver();
  }
}

const changeState = (newState) => {
  state = newState;
  stateTicks = 0;
  if (state === states.item) initItem();
}

function resetGame() {
  viewMode = 'normal';

  player = {
    x: 0,
    y: 0,
    str: 3,
    def: 9,
    mag: 12,
    hp: 12,
    hpMax: 24,
    gold: 740,
    moveTo: function(x, y) {
      this.x = x;
      this.y = y;
    },
  };

  inventory = {
    slots: new Map([
      [0,'DAGGER_IRON'],
      [1,''],
      [2,'POTION_SMALL'],
      [3,''],
      [4,''],
      [5,''],
      [6,''],
      [7,''],
      [8,''],
      [9,''],
      [10,''],
      [11,''],
    ]),
    selected: 0,
    getEmptyEquipSlot: function() {
      let slot = -1;
      for (let i = 0; i < 2; i++) {
        if (inventory.slots.get(i) == '') {
          slot = i;
          break;
        }
      }
      return slot;
    },
    getEmptyStoreSlot: function() {
      let slot = -1;
      for (let i = 2; i < 12; i++) {
        if (inventory.slots.get(i) == '') {
          slot = i;
          break;
        }
      }
      return slot;
    },
  };

  notification = {
    line1: '',
    line2: '',
  };

  startLevel(1, 3, 3);

  changeState(states.title);
}

function startLevel(id, x, y) {
  console.log(`Start level ${id} at ${x},${y}`);
  currentLevel = levels.get(id);
  player.moveTo(x, y);
}

function triggerNotification(line1, line2) {
  notification.line1 = line1;
  notification.line2 = line2;
  notification.active = true;
}

const getHealthColor = (normalColor, dangerColor) => player.hp <= player.hpMax * 0.25 && stateTicks % 20 < 10 ? dangerColor : normalColor;

const getCursorColor = () => stateTicks % 20 < 5 ? COL_RED : stateTicks % 20 < 10 ? COL_GRN : stateTicks % 20 < 15 ? COL_BLU : COL_YEL;
