type Button = { id: string; x: number; y: number; width: number; height: number; pressedPrevious: boolean; pressedCurrent: boolean; isPressed: boolean; isJustPressed: boolean; isJustReleased: boolean };
export const buttons: Button[] = [
  { id: 'U', x: 13, y: 78, width: 9, height: 9, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'D', x: 13, y: 98, width: 9, height: 9, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'L', x: 3, y: 88, width: 9, height: 9, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'R', x: 23, y: 88, width: 9, height: 9, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'A', x: 42, y: 88, width: 12, height: 12, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
  { id: 'B', x: 57, y: 79, width: 12, height: 12, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
];
let canvas: HTMLCanvasElement;
let caseUnscaledWidth: number;
let caseUnscaledHeight: number;
const pointers = new Map<string, string>();

export function init(_canvas: HTMLCanvasElement, _caseUnscaledWidth: number, _caseUnscaledHeight: number) {
  canvas = _canvas;
  caseUnscaledWidth = _caseUnscaledWidth;
  caseUnscaledHeight = _caseUnscaledHeight;
  const canvasCtx = canvas.getContext('2d');
  canvasCtx.fillRect(13, 78, 9, 29); // d-pad u/d
  canvasCtx.fillRect(3, 88, 29, 9); // d-pad l/r
  const imgLogo = new Image();
  imgLogo.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAFAQMAAACU+uVzAAAABlBMVEUAAAAzM2bT8ENbAAAAAXRSTlMAQObYZgAAABtJREFUCNdjePdKj6GjS4PhxDsgvWgRQ9+jdwBZWAlP4hlWSwAAAABJRU5ErkJggg==';
  imgLogo.onload = () => {
    canvasCtx.drawImage(imgLogo, 6, 71);
  };
  const imgButton = new Image();
  imgButton.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAQMAAABsu86kAAAABlBMVEUAAACZADPodVumAAAAAXRSTlMAQObYZgAAABxJREFUCNdj4GdgsD/AUP8AhP5/gCOICFAKqAAAEwUPVSVDKX4AAAAASUVORK5CYII=';
  imgButton.onload = () => {
    canvasCtx.drawImage(imgButton, 42, 88);
    canvasCtx.drawImage(imgButton, 57, 79);
  };
  const imgLabelA = new Image();
  imgLabelA.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFAQMAAABYY9+YAAAABlBMVEUAAAAzM2bT8ENbAAAAAXRSTlMAQObYZgAAABFJREFUCNdjSGCYwPABiCcAAA5KAwFW2JXuAAAAAElFTkSuQmCC';
  imgLabelA.onload = () => {
    canvasCtx.drawImage(imgLabelA, 46, 101);
  };
  const imgLabelB = new Image();
  imgLabelB.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFAQMAAABYY9+YAAAABlBMVEUAAAAzM2bT8ENbAAAAAXRSTlMAQObYZgAAAA1JREFUCNdjeMAwAYIBEsoDwUh7niQAAAAASUVORK5CYII=';
  imgLabelB.onload = () => {
    canvasCtx.drawImage(imgLabelB, 61, 92);
  };
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchEnd, { passive: false });
}

export function update() {
  for (const b of buttons) {
    b.pressedPrevious = b.pressedCurrent;
    b.pressedCurrent = isValueInMap(pointers, b.id); // any pointers (mouse/touch) on the button?
    b.isPressed = b.pressedCurrent;
    b.isJustPressed = b.pressedCurrent && !b.pressedPrevious;
    b.isJustReleased = !b.pressedCurrent && b.pressedPrevious;
  }
}

const isValueInMap = (map: Map<string, string>, value: string) => {
  return [...map.values()].includes(value) ? true : false;
};

const handleMouseDown = (e: MouseEvent) => onDown(e.pageX, e.pageY, -1);

const handleMouseMove = (e: MouseEvent) => onMove(e.pageX, e.pageY, -1);

const handleMouseUp = (e: MouseEvent) => onUp(e.pageX, e.pageY, -1);

const handleTouchStart = (e: TouchEvent) => {
  for (const t of e.changedTouches) {
    onDown(t.pageX, t.pageY, t.identifier);
  }
};

const handleTouchMove = (e: TouchEvent) => {
  e.preventDefault();
  for (const t of e.changedTouches) {
    onMove(t.pageX, t.pageY, t.identifier);
  }
};

const handleTouchEnd = (e: TouchEvent) => {
  e.preventDefault();
  for (const t of e.changedTouches) {
    onUp(t.pageX, t.pageY, t.identifier);
  }
};

const onDown = (x: number, y: number, id: number) => {
  const unscaledPos = calculateUnscaledPos(x, y);
  const button = tryGetButtonAtUnscaledPos(unscaledPos.x, unscaledPos.y);
  button == null ? pointers.set(`${id}`, '-') : pointers.set(`${id}`, button.id);
};

const onMove = (x: number, y: number, id: number) => {
  if (pointers.get(`${id}`)) {
    const unscaledPos = calculateUnscaledPos(x, y);
    const button = tryGetButtonAtUnscaledPos(unscaledPos.x, unscaledPos.y);
    button == null ? pointers.set(`${id}`, '-') : pointers.set(`${id}`, button.id);
  }
};

const onUp = (x: number, y: number, id: number) => pointers.delete(`${id}`);

const calculateUnscaledPos = (x: number, y: number) => {
  if (screen == null) {
    return;
  }
  return { x: Math.round(((x - canvas.offsetLeft) / canvas.clientWidth + 0.5) * caseUnscaledWidth), y: Math.round(((y - canvas.offsetTop) / canvas.clientHeight + 0.5) * caseUnscaledHeight) };
};

const tryGetButtonAtUnscaledPos = (x: number, y: number) => {
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    if (x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
      return button;
    }
  }
  return null;
};
