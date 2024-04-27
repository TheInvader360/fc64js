# Basic Example (fc64js demo rom)

[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/basic-example/docs/demo.gif" width="256"/>](https://theinvader360.github.io/fc64js/rom/demo/basic-example/)

[Play in browser](https://theinvader360.github.io/fc64js/rom/demo/basic-example/)

## Overview

A basic example rom for the [fc64js](https://github.com/TheInvader360/fc64js) fantasy console that makes some simple developer API calls

* Draws a single white pixel at position 3,3 on ```romInit``` only
* Clears and redraws a single user controlled pixel on each ```romLoop``` tick (defaults to green and position 60,60)
* Press U/D/L/R to move the player controlled pixel within screen bounds
* On pressing A the player controlled pixel steps down through the color range (order: yellow, cyan, green, magenta, red, blue)
* On releasing B the player controlled pixel steps up through the color range (order: blue, red, magenta, green, cyan, yellow)

Uses the ```drawPixel```, ```isJustPressed```, ```isJustReleased```, and ```isPressed``` API functions, and button, graphics, and color related constants

## Credits

* Code by TheInvader360
