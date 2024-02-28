# Minimal Audio (fc64js demo rom)

A minimal audio test rom for the [fc64js](https://github.com/TheInvader360/fc64js) fantasy console that makes low level memory access API calls only

* Press A to start playing a tone (default 1500hz and set to continue playing for 60 ticks from button release)
* Press B to immediately stop playing the tone
* Press U/R to increase the tone's frequency (up to a maximum 1750hz)
* Press D/L to decrease the tone's frequency (down to a minimum 1250hz)

Uses the ```peek``` and ```poke``` API functions, and audio and button related constants

[Live preview](https://theinvader360.github.io/fc64js/rom/demo/minimal-audio/)

## Credits

* Code by TheInvader360
