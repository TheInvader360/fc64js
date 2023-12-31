(function (exports) {
    'use strict';

    // See: https://modernweb.com/audio-synthesis-javascript/
    let audioContext;
    let oscillator;
    function init$3() {
        audioContext = new window.AudioContext();
        oscillator = audioContext.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.value = 0;
        oscillator.connect(audioContext.destination);
        oscillator.start(0);
        window.addEventListener('mousedown', resumeAudio);
        window.addEventListener('touchstart', resumeAudio);
        window.addEventListener('keydown', resumeAudio);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                off();
            }
        });
    }
    function on(frequency) {
        oscillator.frequency.value = frequency;
    }
    function off() {
        oscillator.frequency.value = 0;
    }
    function resumeAudio() {
        audioContext.resume();
    }

    const BTN_U = 0;
    const BTN_D = 1;
    const BTN_L = 2;
    const BTN_R = 3;
    const BTN_A = 4;
    const BTN_B = 5;
    const STATE_PRESSED = 1;
    const STATE_JUST_PRESSED = 2;
    const STATE_JUST_RELEASED = 4;

    const GFX_W = 64;
    const GFX_H = 64;

    const buttons$1 = [
        { id: 'U', x: 13, y: 78, width: 9, height: 9, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
        { id: 'D', x: 13, y: 98, width: 9, height: 9, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
        { id: 'L', x: 3, y: 88, width: 9, height: 9, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
        { id: 'R', x: 23, y: 88, width: 9, height: 9, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
        { id: 'A', x: 42, y: 88, width: 12, height: 12, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
        { id: 'B', x: 57, y: 79, width: 12, height: 12, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
    ];
    let canvas$1;
    let caseUnscaledWidth$1;
    let caseUnscaledHeight$1;
    const pointers = new Map();
    function init$2(_canvas, _caseUnscaledWidth, _caseUnscaledHeight) {
        canvas$1 = _canvas;
        caseUnscaledWidth$1 = _caseUnscaledWidth;
        caseUnscaledHeight$1 = _caseUnscaledHeight;
        const canvasCtx = canvas$1.getContext('2d');
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
    function update$1() {
        for (const b of buttons$1) {
            b.pressedPrevious = b.pressedCurrent;
            b.pressedCurrent = isValueInMap(pointers, b.id); // any pointers (mouse/touch) on the button?
            b.isPressed = b.pressedCurrent;
            b.isJustPressed = b.pressedCurrent && !b.pressedPrevious;
            b.isJustReleased = !b.pressedCurrent && b.pressedPrevious;
        }
    }
    const isValueInMap = (map, value) => {
        return [...map.values()].includes(value) ? true : false;
    };
    const handleMouseDown = (e) => onDown(e.pageX, e.pageY, -1);
    const handleMouseMove = (e) => onMove(e.pageX, e.pageY, -1);
    const handleMouseUp = (e) => onUp(e.pageX, e.pageY, -1);
    const handleTouchStart = (e) => {
        for (const t of e.changedTouches) {
            onDown(t.pageX, t.pageY, t.identifier);
        }
    };
    const handleTouchMove = (e) => {
        e.preventDefault();
        for (const t of e.changedTouches) {
            onMove(t.pageX, t.pageY, t.identifier);
        }
    };
    const handleTouchEnd = (e) => {
        e.preventDefault();
        for (const t of e.changedTouches) {
            onUp(t.pageX, t.pageY, t.identifier);
        }
    };
    const onDown = (x, y, id) => {
        const unscaledPos = calculateUnscaledPos(x, y);
        const button = tryGetButtonAtUnscaledPos(unscaledPos.x, unscaledPos.y);
        button == null ? pointers.set(`${id}`, '-') : pointers.set(`${id}`, button.id);
    };
    const onMove = (x, y, id) => {
        if (pointers.get(`${id}`)) {
            const unscaledPos = calculateUnscaledPos(x, y);
            const button = tryGetButtonAtUnscaledPos(unscaledPos.x, unscaledPos.y);
            button == null ? pointers.set(`${id}`, '-') : pointers.set(`${id}`, button.id);
        }
    };
    const onUp = (x, y, id) => pointers.delete(`${id}`);
    const calculateUnscaledPos = (x, y) => {
        if (screen == null) {
            return;
        }
        return { x: Math.round(((x - canvas$1.offsetLeft) / canvas$1.clientWidth + 0.5) * caseUnscaledWidth$1), y: Math.round(((y - canvas$1.offsetTop) / canvas$1.clientHeight + 0.5) * caseUnscaledHeight$1) };
    };
    const tryGetButtonAtUnscaledPos = (x, y) => {
        for (let i = 0; i < buttons$1.length; i++) {
            const button = buttons$1[i];
            if (x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
                return button;
            }
        }
        return null;
    };

    const buttons = [
        { id: 'U', codes: ['ArrowUp', 'KeyW'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
        { id: 'D', codes: ['ArrowDown', 'KeyS'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
        { id: 'L', codes: ['ArrowLeft', 'KeyA'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
        { id: 'R', codes: ['ArrowRight', 'KeyD'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
        { id: 'A', codes: ['KeyZ', 'Period'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
        { id: 'B', codes: ['KeyX', 'Slash'], physicalKeyDown: false, pressedPrevious: false, pressedCurrent: false, isPressed: false, isJustPressed: false, isJustReleased: false },
    ];
    function init$1() {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    }
    function update() {
        for (const b of buttons) {
            b.pressedPrevious = b.pressedCurrent;
            b.pressedCurrent = b.physicalKeyDown; // any physical keys assigned to the button currently pressed?
            b.isPressed = b.pressedCurrent;
            b.isJustPressed = b.pressedCurrent && !b.pressedPrevious;
            b.isJustReleased = !b.pressedCurrent && b.pressedPrevious;
        }
    }
    const handleKeyDown = (e) => {
        if (e.code === 'F1' || e.code === 'F3' || e.code === 'F6' || e.code === 'F7' || e.code === 'Tab' || e.code === 'AltLeft' || e.code === 'AltRight' || e.code === 'ArrowRight' || e.code === 'ArrowDown' || e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
            e.preventDefault();
        }
        const button = tryGetButtonForCode(e.code);
        if (button != null) {
            button.physicalKeyDown = true;
        }
    };
    const handleKeyUp = (e) => {
        const button = tryGetButtonForCode(e.code);
        if (button != null) {
            button.physicalKeyDown = false;
        }
    };
    const tryGetButtonForCode = (code) => {
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            if (button.codes.includes(code)) {
                return button;
            }
        }
        return null;
    };

    const ADDRESS_GFX = 0;
    const ADDRESS_BTN = 4096;
    const ADDRESS_AUD = 4102;
    const ADDRESS_FPS = 4104;
    const ADDRESS_MAX = 4104;
    const ram = [];
    function init() {
        for (let i = 0; i <= ADDRESS_MAX; i++) {
            ram.push(0);
        }
    }
    function peek(address) {
        if (address < 0 || address > ADDRESS_MAX) {
            throw `Invalid address: peek ${address}`;
        }
        return ram[address];
    }
    function poke(address, value) {
        if (address < 0 || address > ADDRESS_MAX) {
            throw `Invalid address: poke ${address}`;
        }
        ram[address] = value;
    }

    const COL_BLK = 0;
    const COL_BLU = 1;
    const COL_RED = 2;
    const COL_MAG = 3;
    const COL_GRN = 4;
    const COL_CYN = 5;
    const COL_YEL = 6;
    const COL_WHT = 7;

    const defaultFont = {
        charWidth: 3,
        charHeight: 5,
        charTrackingDefault: 1,
        charMap: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // space
            [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], // ! exclamation mark
            [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // " double quote
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1], // # hash
            [0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0], // $ dollar
            [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1], // % percent
            [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1], // & ampersand
            [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // ' single quote
            [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1], // ( left bracket
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0], // ) right bracket
            [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0], // * asterisk
            [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0], // + plus
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0], //0, comma
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0], // - minus
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // . full stop
            [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0], // / slash
            [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], // 0
            [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1], // 1
            [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1], // 2
            [1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1], // 3
            [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], // 4
            [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 5
            [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], // 6
            [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], // 7
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], // 8
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 9
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // : colon
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0], // ; semicolon
            [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], // < less than
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0], // = equals
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0], // > more than
            [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0], // ? question mark
            [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1], // @ at
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1], // A
            [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1], // B
            [1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1], // C
            [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0], // D
            [1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1], // E
            [1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0], // F
            [1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1], // G
            [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1], // H
            [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1], // I
            [0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1], // J
            [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1], // K
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1], // L
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], // M
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1], // N
            [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], // O
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0], // P
            [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1], // Q
            [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1], // R
            [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1], // S
            [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], // T
            [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], // U
            [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0], // V
            [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1], // W
            [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1], // X
            [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0], // Y
            [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1], // Z
            [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1], // [ left square bracket
            [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], // \ backslash
            [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0], // ] right square bracket
            [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // ^ caret
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // _ underscore
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // ` backtick
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], // a
            [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], // b
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1], // c
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], // d
            [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1], // e
            [0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0], // f
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // g
            [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1], // h
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0], // i
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0], // j
            [0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1], // k
            [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1], // l
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1], // m
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1], // n
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], // o
            [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0], // p
            [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1], // q
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0], // r
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0], // s
            [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1], // t
            [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1], // u
            [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0], // v
            [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1], // w
            [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // x
            [0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0], // y
            [0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0], // z
            [0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1], // { left curly bracket
            [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], // | pipe
            [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0], // } right curly bracket
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], // ~ tilde
        ],
    };

    function beep(frequency, duration, force) {
        // play beep if one isn't currently playing, or replace the currently playing one if set to force
        if (peek(ADDRESS_AUD + 1) <= 0 || force) {
            poke(ADDRESS_AUD, Math.floor(frequency));
            poke(ADDRESS_AUD + 1, Math.floor(duration));
        }
    }
    function clearGfx(clearColor) {
        for (let i = ADDRESS_GFX; i < ADDRESS_GFX + GFX_W * GFX_H; i++) {
            poke(i, clearColor > 0 ? clearColor : COL_BLK);
        }
    }
    function drawCircle(centerX, centerY, radius, edgeColor, fillColor) {
        if (fillColor >= 0) {
            drawCircleFilled(centerX, centerY, radius, fillColor);
        }
        drawCircleOutline(centerX, centerY, radius, edgeColor);
    }
    function drawCircleFilled(centerX, centerY, radius, color) {
        let x = 0;
        let y = radius;
        let d = 1 - radius;
        while (x <= y) {
            drawHorizontalLine(centerX - x, centerX + x, centerY - y, color);
            drawHorizontalLine(centerX - y, centerX + y, centerY - x, color);
            drawHorizontalLine(centerX - y, centerX + y, centerY + x, color);
            drawHorizontalLine(centerX - x, centerX + x, centerY + y, color);
            if (d < 0) {
                d += 2 * x + 1;
            }
            else {
                d += 2 * (x - y) + 1;
                y--;
            }
            x++;
        }
    }
    function drawCircleOutline(centerX, centerY, radius, color) {
        let x = 0;
        let y = radius;
        let d = 1 - radius;
        while (x <= y) {
            drawPixel(centerX + x, centerY + y, color);
            drawPixel(centerX + x, centerY - y, color);
            drawPixel(centerX - x, centerY + y, color);
            drawPixel(centerX - x, centerY - y, color);
            drawPixel(centerX + y, centerY + x, color);
            drawPixel(centerX + y, centerY - x, color);
            drawPixel(centerX - y, centerY + x, color);
            drawPixel(centerX - y, centerY - x, color);
            if (d < 0) {
                d += 2 * x + 1;
            }
            else {
                d += 2 * (x - y) + 1;
                y--;
            }
            x++;
        }
    }
    function drawImage(x, y, width, height, pixelColors) {
        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
                const pc = pixelColors[i + j * width];
                if (pc >= 0) {
                    drawPixel(x + i, y + j, pc);
                }
            }
        }
    }
    function drawLine(x1, y1, x2, y2, color) {
        if (x1 === x2) {
            drawVerticalLine(x1, y1, y2, color);
        }
        else if (y1 === y2) {
            drawHorizontalLine(x1, x2, y1, color);
        }
        else {
            drawDiagonalLine(x1, y1, x2, y2, color);
        }
    }
    function drawVerticalLine(x, y1, y2, color) {
        if (y1 > y2) {
            const temp = y1;
            y1 = y2;
            y2 = temp;
        }
        for (let i = y1; i <= y2; i++) {
            drawPixel(x, i, color);
        }
    }
    function drawHorizontalLine(x1, x2, y, color) {
        if (x1 > x2) {
            const temp = x1;
            x1 = x2;
            x2 = temp;
        }
        for (let i = x1; i <= x2; i++) {
            drawPixel(i, y, color);
        }
    }
    function drawDiagonalLine(x1, y1, x2, y2, color) {
        // bresenham's line drawing algorithm
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = x1 < x2 ? 1 : -1;
        const sy = y1 < y2 ? 1 : -1;
        let e = dx - dy;
        drawPixel(x1, y1, color);
        drawPixel(x2, y2, color);
        while (x1 !== x2 && y1 !== y2) {
            const e2 = e << 1;
            if (e2 > -dy) {
                e -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                e += dx;
                y1 += sy;
            }
            drawPixel(x1, y1, color);
        }
    }
    function drawPattern(pixels, x, y, color) {
        for (let i = 0; i < pixels.length; i += 2) {
            const offsetX = pixels[i];
            const offsetY = pixels[i + 1];
            drawPixel(x + offsetX, y + offsetY, color);
        }
    }
    function drawPixel(x, y, color) {
        if (x < 0 || x >= GFX_W || y < 0 || y >= GFX_H) {
            return;
        }
        poke(ADDRESS_GFX + (x | 0) + (y | 0) * GFX_W, color);
    }
    function drawRectangle(x, y, width, height, edgeColor, fillColor) {
        let minX = 0;
        let minY = 0;
        let maxX = 0;
        let maxY = 0;
        if (width < 0) {
            minX = x + width + 1;
            maxX = x;
        }
        else {
            minX = x;
            maxX = x + width - 1;
        }
        if (height < 0) {
            minY = y + height + 1;
            maxY = y;
        }
        else {
            minY = y;
            maxY = y + height - 1;
        }
        for (let i = minX; i <= maxX; i++) {
            for (let j = minY; j <= maxY; j++) {
                if (i == minX || i == maxX || j == minY || j == maxY) {
                    drawPixel(i, j, edgeColor);
                }
                else if (fillColor >= 0) {
                    drawPixel(i, j, fillColor);
                }
            }
        }
    }
    function drawText(content, x, y, color, options) {
        const f = (options === null || options === void 0 ? void 0 : options.font) ? options.font : defaultFont;
        const t = (options === null || options === void 0 ? void 0 : options.tracking) >= 0 ? options.tracking : f.charTrackingDefault;
        let cursor = x;
        for (let i = 0; i < content.length; i++) {
            drawChar(content.charAt(i), f, cursor, y, color);
            cursor += f.charWidth + t;
        }
    }
    function drawChar(char, font, x, y, color) {
        const pattern = font.charMap[char.charCodeAt(0) - 32];
        for (let i = 0; i < font.charWidth; i++) {
            for (let j = 0; j < font.charHeight; j++) {
                if (pattern[i + j * font.charWidth] === 1) {
                    drawPixel(x + i, y + j, color);
                }
            }
        }
    }
    function getFps() {
        return peek(ADDRESS_FPS);
    }
    function getPixel(x, y) {
        if (x < 0 || x >= GFX_W || y < 0 || y >= GFX_H) {
            return -1;
        }
        return peek(ADDRESS_GFX + (x | 0) + (y | 0) * GFX_W);
    }
    function isJustPressed(btn) {
        return Boolean(peek(ADDRESS_BTN + btn) & STATE_JUST_PRESSED);
    }
    function isJustReleased(btn) {
        return Boolean(peek(ADDRESS_BTN + btn) & STATE_JUST_RELEASED);
    }
    function isPressed(btn) {
        return Boolean(peek(ADDRESS_BTN + btn) & STATE_PRESSED);
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(value, max));
    }
    function isEmptyObject(object) {
        return Object.keys(object).length === 0 && object.constructor === Object;
    }
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function swapImageColors(originalPixels, oldValues, newValues) {
        if (oldValues.length != newValues.length) {
            throw new Error('mismatched old/new list lengths');
        }
        const oldPixels = [...originalPixels];
        const newPixels = [...originalPixels];
        for (let i = 0; i < oldValues.length; i++) {
            for (let j = 0; j < oldPixels.length; j++) {
                if (oldPixels[j] === oldValues[i]) {
                    newPixels[j] = newValues[i];
                }
            }
        }
        return newPixels;
    }
    function wrap(value, minInclusive, maxExclusive) {
        // e.g. wrap(-3, 0, 2) = 1, wrap(-2, 0, 2) = 0, wrap(-1, 0, 2) = 1, wrap(0, 0, 2) = 0, wrap(1, 0, 2) = 1, wrap(2, 0, 2) = 0, wrap(3, 0, 2) = 1...
        const range = maxExclusive - minInclusive;
        return minInclusive + ((((value - minInclusive) % range) + range) % range);
    }

    let canvas;
    let canvasCtx;
    let colors;
    let screenImageData;
    let lastFrameAt = performance.now();
    const caseUnscaledWidth = 72;
    const caseUnscaledHeight = 128;
    const displayOffsetUnscaledX = 4;
    const displayOffsetUnscaledY = 4;
    window.addEventListener('load', onLoad);
    function onLoad() {
        init();
        init$3();
        init$1();
        initColors();
        initCanvas();
        init$2(canvas, caseUnscaledWidth, caseUnscaledHeight);
        romInit();
        window.requestAnimationFrame(mainLoop);
    }
    function mainLoop(now) {
        // throttle framerate to max 60fps
        if (now - lastFrameAt > 1000 / 61) {
            poke(ADDRESS_FPS, Math.round(1000 / (now - lastFrameAt)));
            lastFrameAt = now;
            update();
            update$1();
            updateBtn();
            updateAud();
            romLoop();
            updateGfx();
        }
        window.requestAnimationFrame(mainLoop); // keep requesting new frames
    }
    function updateBtn() {
        for (let i = 0; i < 6; i++) {
            let k = 0;
            if (buttons[i].isPressed || buttons$1[i].isPressed) {
                k |= STATE_PRESSED;
            }
            if (buttons[i].isJustPressed || buttons$1[i].isJustPressed) {
                k |= STATE_JUST_PRESSED;
            }
            if (buttons[i].isJustReleased || buttons$1[i].isJustReleased) {
                k |= STATE_JUST_RELEASED;
            }
            poke(ADDRESS_BTN + i, k);
        }
    }
    function updateAud() {
        const frequency = peek(ADDRESS_AUD);
        const duration = peek(ADDRESS_AUD + 1);
        frequency > 0 && duration > 0 ? on(frequency) : off();
        if (duration > 0) {
            poke(ADDRESS_AUD + 1, duration - 1);
        }
    }
    function updateGfx() {
        for (let i = ADDRESS_GFX; i < ADDRESS_GFX + GFX_W * GFX_H; i++) {
            const pixelColor = colors[peek(i)];
            screenImageData.data[i * 4 + 0] = pixelColor.r;
            screenImageData.data[i * 4 + 1] = pixelColor.g;
            screenImageData.data[i * 4 + 2] = pixelColor.b;
            screenImageData.data[i * 4 + 3] = 255;
        }
        canvasCtx.putImageData(screenImageData, displayOffsetUnscaledX, displayOffsetUnscaledY);
    }
    function initCanvas() {
        const bodyCss = '-webkit-touch-callout: none; -webkit-tap-highlight-color: #000; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background: #000; color: #888;';
        const canvasCss = 'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #000};';
        const crispCss = 'image-rendering: -moz-crisp-edges; image-rendering: -webkit-optimize-contrast; image-rendering: -o-crisp-edges; image-rendering: pixelated;';
        document.body.style.cssText = bodyCss;
        canvas = document.createElement('canvas');
        canvas.width = caseUnscaledWidth;
        canvas.height = caseUnscaledHeight;
        canvasCtx = canvas.getContext('2d', { alpha: false });
        canvasCtx.imageSmoothingEnabled = false;
        canvas.style.cssText = canvasCss + crispCss;
        canvasCtx.fillStyle = '#ddd';
        canvasCtx.fillRect(0, 0, caseUnscaledWidth, caseUnscaledHeight); // case
        canvasCtx.fillStyle = '#333';
        canvasCtx.fillRect(displayOffsetUnscaledX - 1, displayOffsetUnscaledY - 1, GFX_W + 2, GFX_H + 2); // bezel
        const setSize = () => {
            const windowRatio = innerWidth / innerHeight;
            const canvasRatio = caseUnscaledWidth / caseUnscaledHeight;
            const filledHorizontal = windowRatio < canvasRatio;
            const scaledCanvasWidth = filledHorizontal ? innerWidth : innerHeight * canvasRatio;
            const scaledCanvasHeight = !filledHorizontal ? innerHeight : innerWidth / canvasRatio;
            canvas.style.width = `${scaledCanvasWidth}px`;
            canvas.style.height = `${scaledCanvasHeight}px`;
        };
        window.addEventListener('resize', setSize);
        setSize();
        document.body.appendChild(canvas);
        screenImageData = canvasCtx.createImageData(GFX_W, GFX_H);
    }
    function initColors() {
        const rgbHex = [0x000000, 0x0000ff, 0xff0000, 0xff00ff, 0x00ff00, 0x00ffff, 0xffff00, 0xffffff]; // BLK, BLU, RED, MAG, GRN, CYN, YEL, WHT
        colors = [];
        for (let i = 0; i <= 7; i++) {
            const n = rgbHex[i];
            const r = (n & 0xff0000) >> 16;
            const g = (n & 0xff00) >> 8;
            const b = n & 0xff;
            colors.push({ r, g, b });
        }
    }

    exports.ADDRESS_AUD = ADDRESS_AUD;
    exports.ADDRESS_BTN = ADDRESS_BTN;
    exports.ADDRESS_FPS = ADDRESS_FPS;
    exports.ADDRESS_GFX = ADDRESS_GFX;
    exports.BTN_A = BTN_A;
    exports.BTN_B = BTN_B;
    exports.BTN_D = BTN_D;
    exports.BTN_L = BTN_L;
    exports.BTN_R = BTN_R;
    exports.BTN_U = BTN_U;
    exports.COL_BLK = COL_BLK;
    exports.COL_BLU = COL_BLU;
    exports.COL_CYN = COL_CYN;
    exports.COL_GRN = COL_GRN;
    exports.COL_MAG = COL_MAG;
    exports.COL_RED = COL_RED;
    exports.COL_WHT = COL_WHT;
    exports.COL_YEL = COL_YEL;
    exports.GFX_H = GFX_H;
    exports.GFX_W = GFX_W;
    exports.beep = beep;
    exports.clamp = clamp;
    exports.clearGfx = clearGfx;
    exports.drawCircle = drawCircle;
    exports.drawImage = drawImage;
    exports.drawLine = drawLine;
    exports.drawPattern = drawPattern;
    exports.drawPixel = drawPixel;
    exports.drawRectangle = drawRectangle;
    exports.drawText = drawText;
    exports.getFps = getFps;
    exports.getPixel = getPixel;
    exports.isEmptyObject = isEmptyObject;
    exports.isJustPressed = isJustPressed;
    exports.isJustReleased = isJustReleased;
    exports.isPressed = isPressed;
    exports.peek = peek;
    exports.poke = poke;
    exports.randomInt = randomInt;
    exports.swapImageColors = swapImageColors;
    exports.wrap = wrap;

})(window || {});
