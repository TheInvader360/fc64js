# fc64js - memory map

The following information may be of interest if you intend to ```peek``` and ```poke``` at a low level. For most practical purposes it isn't really required knowledge as the specifics have been abstracted away via various developer API functions (e.g. ```drawPixel``` and other drawing functions, ```getPixel```, ```isPressed``` and other input functions, ```beep```, ```getFps```, etc)

The fc64js memory map is defined [here](../../src/memory.ts)

There are 4104 memory address locations in total

The first 4096 locations (from 0 to 4095) each correspond to a single virtual pixel. The sequential memory address locations flow from left to right and top to bottom in screen space. Integer values from 0 to 7 each correspond to a particular [color](../../src/color.ts) - any other value is invalid

The next 6 locations (from 4096 to 4101) each correspond to a single input button. The ordered memory address locations correspond to the Up, Down, Left, Right, A, and B [buttons](../../src/button.ts). Each button can be in one of four states - currently pressed but not only just pressed in the last tick, currently pressed and was only just pressed in the last tick, not currently pressed and was only just released in the last tick, and not currently pressed and not only just released in the last tick. The value at the given button's memory location for each of these scenarios (in the specified order) would be 1, 3 (i.e. 1+2), 4, and 0

The next 2 locations (4102 and 4103) relate to audio output. The first location holds the current beep frequency in hertz - a value of 0 means the beeper is silent. The second location holds the remaining beep duration measured in ticks (which in normal circumstances last 1/60th of a second each) - again, a value of 0 means the beeper is silent

The final location (4104) holds the current frames per second value
