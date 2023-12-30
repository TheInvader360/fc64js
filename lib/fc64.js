(function (exports) {
    'use strict';

    const GFX_W = 64;
    const GFX_H = 64;

    const ADDRESS_GFX = 0;
    const ADDRESS_FPS = 4096;
    const ADDRESS_MAX = 4096;
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
            romLoop();
            updateGfx();
        }
        window.requestAnimationFrame(mainLoop); // keep requesting new frames
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

    exports.ADDRESS_FPS = ADDRESS_FPS;
    exports.ADDRESS_GFX = ADDRESS_GFX;
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
