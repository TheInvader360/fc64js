(function (exports) {
    'use strict';

    // See: https://modernweb.com/audio-synthesis-javascript/
    let audioContext;
    let oscillator;
    function init$2() {
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

    let canvas;
    let canvasCtx;
    let colors;
    let screenImageData;
    let lastFrameAt = performance.now();
    window.addEventListener('load', onLoad);
    function onLoad() {
        init();
        init$2();
        init$1();
        initColors();
        initCanvas();
        romInit();
        window.requestAnimationFrame(mainLoop);
    }
    function mainLoop(now) {
        // throttle framerate to max 60fps
        if (now - lastFrameAt > 1000 / 61) {
            poke(ADDRESS_FPS, Math.round(1000 / (now - lastFrameAt)));
            lastFrameAt = now;
            update();
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
            if (buttons[i].isPressed) {
                k |= STATE_PRESSED;
            }
            if (buttons[i].isJustPressed) {
                k |= STATE_JUST_PRESSED;
            }
            if (buttons[i].isJustReleased) {
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
        canvasCtx.putImageData(screenImageData, 0, 0);
    }
    function initCanvas() {
        const bodyCss = '-webkit-touch-callout: none; -webkit-tap-highlight-color: #000; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background: #000; color: #888;';
        const canvasCss = 'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #000};';
        const crispCss = 'image-rendering: -moz-crisp-edges; image-rendering: -webkit-optimize-contrast; image-rendering: -o-crisp-edges; image-rendering: pixelated;';
        document.body.style.cssText = bodyCss;
        canvas = document.createElement('canvas');
        canvas.width = GFX_H;
        canvas.height = GFX_H;
        canvasCtx = canvas.getContext('2d', { alpha: false });
        canvasCtx.imageSmoothingEnabled = false;
        canvas.style.cssText = canvasCss + crispCss;
        const setSize = () => {
            const windowRatio = innerWidth / innerHeight;
            const canvasRatio = GFX_W / GFX_H;
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
    exports.peek = peek;
    exports.poke = poke;

})(window || {});
