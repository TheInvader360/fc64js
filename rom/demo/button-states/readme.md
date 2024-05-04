# Button States (fc64js demo rom)

[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/button-states/docs/demo.gif" width="256"/>](https://theinvader360.github.io/fc64js/rom/demo/button-states/)

[Play in browser](https://theinvader360.github.io/fc64js/rom/demo/button-states/)

## Overview

A button states test rom for the [fc64js](https://github.com/TheInvader360/fc64js) fantasy console that demonstrates use of the ```isPressed```, ```isJustPressed``` and ```isJustReleased``` API functions

A table of buttons (U/D/L/R/A/B) and their states (Pressed/JustPressed/JustReleased) is displayed onscreen with a corresponding true/false indicator for each pairing

Note that the JustPressed and JustReleased indicators are held for a few ticks once triggered to improve the user experience (a button will only be in a "just" state for one "blink and you'll miss it" tick, but the indicators are lit for twelve ticks, or a fifth of a second)

* Press/hold/release any button (or button combination) to interact

## Credits

* Code by TheInvader360
