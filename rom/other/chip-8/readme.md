# Chip-8 (fc64js rom)

[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/other/chip-8/docs/demo.gif" width="256"/>](https://theinvader360.github.io/fc64js/rom/other/chip-8/)

[Play in browser](https://theinvader360.github.io/fc64js/rom/other/chip-8/)

## Overview

Chip-8 is an interpreted programming language that was initially used on the COSMAC VIP and Telmac 1800 microcomputers in the 1970s

Chip-8 virtual machines exist for lots of platforms. I've previously written one myself in [golang](https://github.com/TheInvader360/chip8)

The Chip-8 spec is pretty [minimal](https://en.wikipedia.org/wiki/CHIP-8). Input is limited to a 16 key hexadecimal keypad (and most roms only use a few keys each), output is limited to a 64x32 pixel monochrome display and a monotone beeper

With some careful input mapping the Chip-8 system can be implemented as a fc64js rom...

The idea of implementing a Chip-8 virtual machine on the fc64js fantasy console really appealed to me - a virtual machine on your fantasy console so you can play while you play!

![yo-dawg](docs/yo-dawg.jpg)

Run the fc64js Chip-8 (VM) rom and you'll be presented with a menu for selecting your desired Chip-8 (game) rom

* Use the L/R buttons to navigate the menu
* Press A to select a rom

Controls for each rom are displayed on screen (inputs differ from one rom to the next)

Reload fc64js to 'reset' the machine and return to the main menu

The fc64js Chip-8 (VM) rom persists the most recently opened Chip-8 (game) rom in local storage for a much improved user experience

34 public domain roms have been included, the input mappings along with other meta data for each are defined in `romMetadata.js`

## Run locally

```bash
npm ci
npm run browser-sync-start
```

## Run tests

```bash
npm ci
npm test -- rom/other/chip-8/test/unit/src/vm.test.ts --coverage --collectCoverageFrom rom/other/chip-8/vm.js --verbose
```

## Credits

* Code by TheInvader360
* Rom loading code heavily based on [this](https://github.com/taniarascia/chip8) by Tania Rascia
