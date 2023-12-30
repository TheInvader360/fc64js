type Button = { id: string; codes: string[]; physicalKeyDown: boolean; pressedPrevious: boolean; pressedCurrent: boolean; isPressed: boolean; isJustPressed: boolean; isJustReleased: boolean };
export const buttons: Button[] = [
  { id: 'U', codes: ['ArrowUp', 'KeyW'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'D', codes: ['ArrowDown', 'KeyS'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'L', codes: ['ArrowLeft', 'KeyA'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'R', codes: ['ArrowRight', 'KeyD'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'A', codes: ['KeyZ', 'Period'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'B', codes: ['KeyX', 'Slash'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
];

export function init() {
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
}

export function update() {
  for (const b of buttons) {
    b.pressedPrevious = b.pressedCurrent;
    b.pressedCurrent = b.physicalKeyDown; // any physical keys assigned to the button currently pressed?
    b.isPressed = b.pressedCurrent;
    b.isJustPressed = b.pressedCurrent && !b.pressedPrevious;
    b.isJustReleased = !b.pressedCurrent && b.pressedPrevious;
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.code === 'F1' || e.code === 'F3' || e.code === 'F6' || e.code === 'F7' || e.code === 'Tab' || e.code === 'AltLeft' || e.code === 'AltRight' || e.code === 'ArrowRight' || e.code === 'ArrowDown' || e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
    e.preventDefault();
  }
  const button = tryGetButtonForCode(e.code);
  if (button != null) {
    button.physicalKeyDown = true;
  }
};

const handleKeyUp = (e: KeyboardEvent) => {
  const button = tryGetButtonForCode(e.code);
  if (button != null) {
    button.physicalKeyDown = false;
  }
};

const tryGetButtonForCode = (code: string) => {
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    if (button.codes.includes(code)) {
      return button;
    }
  }
  return null;
};
