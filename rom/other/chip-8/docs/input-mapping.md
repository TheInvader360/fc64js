# Input mapping

* fc64js only has 6 input buttons
* Most chip-8 roms only use a few of the 16 available keys

Each supported rom has an entry in `romMetadata.js` that maps fc64js buttons to chip-8 keys. The button mappings are defined in order - `BTN_U`, `BTN_D`, `BTN_L`, `BTN_R`, `BTN_A`, `BTN_B`

Note also that the [Octo assembler](https://github.com/JohnEarnest/Octo) and my [desktop chip-8 emulator](https://github.com/TheInvader360/chip8) map chip-8 keys to qwerty keyboards as follows:

`
CHIP-8    QWERTY
-------   -------
1 2 3 C   1 2 3 4
4 5 6 D   q w e r
7 8 9 E   a s d f
A 0 B F   z x c v
`

## Examples

### Hello Octo

`'buttonKeyMapping': ['5', '8', '7', '9', '-', '-'], // WSAD--`

| fc64js | chip-8 | qwerty |
| ------ | ------ | ------ |
| BTN_U  | 5      | w      |
| BTN_D  | 8      | s      |
| BTN_L  | 7      | a      |
| BTN_R  | 9      | d      |
| BTN_A  | -      | -      |
| BTN_B  | -      | -      |

### Pong

`'buttonKeyMapping': ['1', '4', '-', '-', 'C', 'D'], // 1Q--4R`

| fc64js | chip-8 | qwerty |
| ------ | ------ | ------ |
| BTN_U  | 1      | 1      |
| BTN_D  | 4      | q      |
| BTN_L  | -      | -      |
| BTN_R  | -      | -      |
| BTN_A  | C      | 4      |
| BTN_B  | D      | r      |
