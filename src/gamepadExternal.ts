// confirmed working (chrome):
// * xbox one powera gamepad over usb on ubuntu laptop
// * moga pro power gamepad over bluetooth on ubuntu laptop
// * moga pro power gamepad over bluetooth on android phone
// * stadia gamepad over usb on ubuntu laptop
// * stadia gamepad over bluetooth on ubuntu laptop
// * stadia gamepad over bluetooth on android phone
//
// confirmed not crashing (chrome):
// * nintendo switch powera gamepad over usb on ubuntu laptop (known to have non-standard button mapping so not expected to work)

type Button = { id: string; index: number; physicalButtonPressed: boolean; pressedPrevious: boolean; pressedCurrent: boolean; isPressed: boolean; isJustPressed: boolean; isJustReleased: boolean };

export const buttons: Button[] = [
  { id: 'U', index: 12, physicalButtonPressed: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'D', index: 13, physicalButtonPressed: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'L', index: 14, physicalButtonPressed: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'R', index: 15, physicalButtonPressed: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'A', index: 0, physicalButtonPressed: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'B', index: 1, physicalButtonPressed: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
];

export function init() {
  window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);
}

export function update() {
  const gamepad = navigator.getGamepads()[0];
  if (gamepad) {
    for (const b of buttons) {
      const gamepadButton = tryGetGamepadButton(gamepad, b.index);
      if (gamepadButton != null) {
        if (gamepadButton.pressed) {
          b.physicalButtonPressed = true;
        } else {
          b.physicalButtonPressed = false;
        }
      }
    }
  }

  for (const b of buttons) {
    b.pressedPrevious = b.pressedCurrent;
    b.pressedCurrent = b.physicalButtonPressed; // physical button currently pressed?
    b.isPressed = b.pressedCurrent;
    b.isJustPressed = b.pressedCurrent && !b.pressedPrevious;
    b.isJustReleased = !b.pressedCurrent && b.pressedPrevious;
  }
}

const handleGamepadDisconnected = () => {
  for (const b of buttons) {
    b.physicalButtonPressed = false;
  }
};

const tryGetGamepadButton = (gamepad: Gamepad, index: number) => {
  if (index > gamepad.buttons.length - 1) {
    return null;
  }
  return gamepad.buttons[index];
};
