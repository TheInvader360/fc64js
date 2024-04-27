# fc64js

fc64js is a small browser based fantasy console

* 64x64 pixels
* 8 colors
* 6 buttons
* 1 beeper

It supports keyboard, touch, and gamepad input across desktop and mobile devices

The minified [library](lib/fc64.min.js) weighs in at just 16 kilobytes

## Selected examples

[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/game/snake/docs/demo.gif" width="128"/>](https://theinvader360.github.io/fc64js/rom/game/snake/) 
[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/game/breakout/docs/demo.gif" width="128"/>](https://theinvader360.github.io/fc64js/rom/game/breakout/) 
[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/game/simon/docs/demo.gif" width="128"/>](https://theinvader360.github.io/fc64js/rom/game/simon/) 
[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/ray-casting/docs/demo.gif" width="128"/>](https://theinvader360.github.io/fc64js/rom/demo/ray-casting/) 
[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/platformer/docs/demo.gif" width="128"/>](https://theinvader360.github.io/fc64js/rom/demo/platformer/) 
[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/dungeon-crawl/docs/demo.gif" width="128"/>](https://theinvader360.github.io/fc64js/rom/demo/dungeon-crawl/) 
[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/isometric/docs/demo.gif" width="128"/>](https://theinvader360.github.io/fc64js/rom/demo/isometric/) 
[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/rotating-cube/docs/demo.gif" width="128"/>](https://theinvader360.github.io/fc64js/rom/demo/rotating-cube/) 
[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/collision-detection/docs/demo.gif" width="128"/>](https://theinvader360.github.io/fc64js/rom/demo/collision-detection/) 
[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/video/docs/demo.gif" width="128"/>](https://theinvader360.github.io/fc64js/rom/demo/video/) 
[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/tcc-2023/docs/demo.gif" width="128"/>](https://theinvader360.github.io/fc64js/rom/demo/tcc-2023/) 

Click or tap a gif to play :sunglasses:

## Getting started

All you need to get started developing fc64js games is the [library](lib/fc64.min.js), your text editor or IDE of choice (e.g. [vscode](https://code.visualstudio.com/download)), and a modern web browser to run and debug it on (e.g. [google chrome](https://www.google.com/chrome))

fc64js "roms" (i.e. games/demos) are simply [javascript scripts](rom/demo/a-simple-game/main.js) that are included on a [html page](rom/demo/a-simple-game/index.html) alongside the [fc64js library](lib/fc64.min.js)

Each rom must include a ```romInit()``` function (called once on page load/reload) and a ```romLoop()``` function (called continuously at a targeted 60 frames per second)

This basic example can be saved locally (e.g. in a file named ```basic-example.html```) and simply opened in a web browser:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>basic-example</title>
    <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, initial-scale=1, maximum-scale=1" />
    <script src="https://theinvader360.github.io/fc64js/lib/fc64.min.js"></script>
    <script>
      let x = 60;
      let y = 60;
      let color = 4;

      function romInit() {
        drawPixel(3, 3, COL_WHT);
      }

      function romLoop() {
        if (isJustPressed(BTN_A) && color > 1) {
          color--;
        }
        if (isJustReleased(BTN_B) && color < 6) {
          color++;
        }
        drawPixel(x, y, COL_BLK);
        if (isPressed(BTN_U) && y > 0) {
          y--;
        }
        if (isPressed(BTN_D) && y < GFX_H - 1) {
          y++;
        }
        if (isPressed(BTN_L) && x > 0) {
          x--;
        }
        if (isPressed(BTN_R) && x < GFX_W - 1) {
          x++;
        }
        drawPixel(x, y, color);
      }
    </script>
  </head>
  <body>
  </body>
</html>
```

## Javascript modules

See [here](rom/demo/basic-example-module-import/) for an example that uses javascript modules

The key differences are changes to the html ```script``` elements [here](rom/demo/basic-example-module-import/index.html), and the introduction of ```import``` and ```fc64Init``` javascript statements [here](rom/demo/basic-example-module-import/main.js)

## Typescript starter

See [here](https://github.com/TheInvader360/fc64js-typescript-starter) for a convenient starter project to help create roms using typescript

The result of following the [fc64js-typescript-starter](https://github.com/TheInvader360/fc64js-typescript-starter) readme instructions is available [here](https://github.com/TheInvader360/fc64js-typescript-basic-example)

## Demos

Various demos are available [here](rom/demo/)

## Games

* [Snake](rom/game/snake/)
* [Breakout](rom/game/breakout/)
* [Simon](rom/game/simon/)

## Tools

* [Image tool](tools/image-tool/)

## Developer guides

* This [declaration file](lib/fc64.d.ts) gives an overview of the developer API
* These [example roms](rom/) cover all fc64js functionality
* [Memory map](docs/memory-map/)
* [Custom palette](docs/custom-palette/)
* [Library development](docs/library-development/)
* [Tutorial - Snake (js)](docs/tutorial/snake-js/)

## Credits

fc64js is comprised of original code by TheInvader360

Inspiration has been drawn from many sources - real machines like the zx spectrum, commodore 64, bbc micro, and various handhelds, virtual machines like hack (nand2tetris) and chip-8, and fantasy consoles like pico-8, tic-80, and wasm-4

Special mention goes out to the [peekpoke](https://github.com/abagames/peekpoke) minimal fantasy console - a great example of how to architect this kind of project

These credits relate to the fc64js fantasy console itself - credits for specific roms can be found in their accompanying readme files, or in code comments, or both

## License

[MIT](LICENSE) © TheInvader360
