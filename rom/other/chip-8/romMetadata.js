/*
  Mapping the 16 chip-8 keys to a qwerty keyboard:
    CHIP-8    QWERTY
    1 2 3 C   1 2 3 4
    4 5 6 D   q w e r
    7 8 9 E   a s d f
    A 0 B F   z x c v

  * fc64js only has 6 input buttons
  * most chip-8 roms only use a few of the 16 chip-8 keys
  * required keys can be mapped to the available fc64js buttons on a rom by rom basis
  * fc64js buttons are mapped in order - BTN_U, BTN_D, BTN_L, BTN_R, BTN_A, BTN_B

  Example - Pong: `'buttonKeyMapping': ['1', '4', '-', '-', 'C', 'D'], // 1Q--4R`
    FC64JS   CHIP-8   QWERTY
    BTN_U    1        1
    BTN_D    4        q
    BTN_L    -        -
    BTN_R    -        -
    BTN_A    C        4
    BTN_B    D        r
*/

export const romMetadata = [
  {
    'romName':          'THEINVADER360',
    'romDescription':   'A test rom by\nTheInvader360\nthat draws a\nstatic splash\nscreen',
    'cyclesPerTick':    6,
    'userInstructions': 'NO USER INPUT',
    'buttonKeyMapping': ['-', '-', '-', '-', '-', '-'], // QWERTY:------
    'romFile':          'ti360.ch8'
  },
  {
    'romName':          'HELLO OCTO',
    'romDescription':   'A test rom by\nJohn Earnest\nthat features a\ncontrollable\ncharacter',
    'cyclesPerTick':    6,
    'userInstructions': 'U/D/L/R:MOVE',
    'buttonKeyMapping': ['5', '8', '7', '9', '-', '-'], // QWERTY:WSAD--
    'romFile':          'hello-octo.ch8'
  },
  {
    'romName':          'TEST OPCODES',
    'romDescription':   'A test rom by\ncorax89 that\ntests Chip-8\nopcodes',
    'cyclesPerTick':    6,
    'userInstructions': 'NO USER INPUT',
    'buttonKeyMapping': ['-', '-', '-', '-', '-', '-'], // QWERTY:------
    'romFile':          'test_opcode.ch8'
  },
  {
    'romName':          'TEST OPCODES+',
    'romDescription':   'A test rom by\nTimendus that\ntests Chip-8\nopcodes',
    'cyclesPerTick':    6,
    'userInstructions': 'NO USER INPUT',
    'buttonKeyMapping': ['-', '-', '-', '-', '-', '-'], // QWERTY:------
    'romFile':          'test_opcode-plus.ch8'
  },
  {
    'romName':          'TEST BEEP',
    'romDescription':   'A test rom by\nTimendus that\ndemonstrates\nsound output',
    'cyclesPerTick':    6,
    'userInstructions': 'B:MANUAL BEEP',
    'buttonKeyMapping': ['-', '-', '-', '-', '-', 'B'], // QWERTY:-----C
    'romFile':          'test_beep.ch8'
  },
  {
    'romName':          'TEST DELAY',
    'romDescription':   'A test rom by\nmattmikolay that\ndemonstrates\ndelay timing',
    'cyclesPerTick':    6,
    'userInstructions': 'U/D:SET DURATION\nA:START',
    'buttonKeyMapping': ['2', '8', '-', '-', '5', '-'], // QWERTY:2S--W-
    'romFile':          'test_delay.ch8'
  },
  {
    'romName':          'TEST RANDOM',
    'romDescription':   'A test rom by\nmattmikolay that\ndemonstrates\nrandom number\ngeneration',
    'cyclesPerTick':    6,
    'userInstructions': 'ANY:GENERATE',
    'buttonKeyMapping': ['5', '8', '7', '9', '1', '2'], // QWERTY:WSAD12
    'romFile':          'test_random.ch8'
  },
  {
    'romName':          'AIRPLANE',
    'romDescription':   'Drop packets\nfrom your\nairplane so they\nland without\ncolliding',
    'cyclesPerTick':    8,
    'userInstructions': 'B:DROP',
    'buttonKeyMapping': ['-', '-', '-', '-', '-', '8'], // QWERTY:-----S
    'romFile':          'airplane.ch8'
  },
  {
    'romName':          'BLINKY',
    'romDescription':   'Pacman clone.\nEat all the\ndots and avoid\nthe enemies',
    'cyclesPerTick':    12,
    'userInstructions': 'U/D/L/R:MOVE\nB:CONTINUE',
    'buttonKeyMapping': ['3', '6', '7', '8', '-', 'F'], // QWERTY:3EAS-V
    'romFile':          'blinky.ch8'
  },
  {
    'romName':          'BREAKOUT',
    'romDescription':   'Breakout clone.\nDestroy all the\nbricks, you have\n5 lives',
    'cyclesPerTick':    8,
    'userInstructions': 'L/R:MOVE',
    'buttonKeyMapping': ['-', '-', '4', '6', '-', '-'], // QWERTY:--QE--
    'romFile':          'breakout.ch8'
  },
  {
    'romName':          'BRIX',
    'romDescription':   'Breakout clone.\nDestroy all the\nbricks, you have\n5 lives',
    'cyclesPerTick':    8,
    'userInstructions': 'L/R:MOVE',
    'buttonKeyMapping': ['-', '-', '4', '6', '-', '-'], // QWERTY:--QE--
    'romFile':          'brix.ch8'
  },
  {
    'romName':          'CAVE',
    'romDescription':   'Move through the\ncave without\nhitting the\nwalls',
    'cyclesPerTick':    6,
    'userInstructions': 'U/D/L/R:MOVE\nB:START',
    'buttonKeyMapping': ['2', '8', '4', '6', '-', 'F'], // QWERTY:2SQE-V
    'romFile':          'cave.ch8'
  },
  {
    'romName':          'CONNECT4',
    'romDescription':   'A two player\nconnect 4 game\nwithout built-in\nwin detection',
    'cyclesPerTick':    1,
    'userInstructions': 'L/R:SELECT\nB:DROP',
    'buttonKeyMapping': ['-', '-', '4', '6', '-', '5'], // QWERTY:--QE-W
    'romFile':          'connect4.ch8'
  },
  {
    'romName':          'FILTER',
    'romDescription':   'Catch everything\nthat falls',
    'cyclesPerTick':    8,
    'userInstructions': 'L/R:MOVE',
    'buttonKeyMapping': ['-', '-', '4', '6', '-', '-'], // QWERTY:--QE--
    'romFile':          'filter.ch8'
  },
  {
    'romName':          'GUESS',
    'romDescription':   'Pick a number\nfrom 1 to 62\npress A if shown\npress B if not',
    'cyclesPerTick':    8,
    'userInstructions': 'A:NUMBER PRESENT\nB:NUMBER MISSING',
    'buttonKeyMapping': ['-', '-', '-', '-', '5', '8'], // QWERTY:----WS
    'romFile':          'guess.ch8'
  },
  {
    'romName':          'HIDDEN',
    'romDescription':   'Memory card\nmatching game',
    'cyclesPerTick':    3,
    'userInstructions': 'U/D/L/R:MOVE\nA:SELECT',
    'buttonKeyMapping': ['2', '8', '4', '6', '5', '-'], // QWERTY:2SQEW-
    'romFile':          'hidden.ch8'
  },
  {
    'romName':          'INVADERS',
    'romDescription':   'Space Invaders\nclone.\nShoot the aliens\nbefore they land',
    'cyclesPerTick':    8,
    'userInstructions': 'L/R:MOVE\nA:FIRE',
    'buttonKeyMapping': ['-', '-', '4', '6', '5', '-'], // QWERTY:--QEW-
    'romFile':          'invaders.ch8'
  },
  {
    'romName':          'KALEIDOSCOPE',
    'romDescription':   'Kaleidoscope\ndemo',
    'cyclesPerTick':    8,
    'userInstructions': 'U/D/L/R:MOVE\nB:REPEAT',
    'buttonKeyMapping': ['2', '8', '4', '6', '-', '0'], // QWERTY:2SQE-X
    'romFile':          'kaleid.ch8'
  },
  {
    'romName':          'LANDING',
    'romDescription':   'Try to flatten\nthe field for\na safe landing',
    'cyclesPerTick':    6,
    'userInstructions': 'A:BOMB',
    'buttonKeyMapping': ['-', '-', '-', '-', '8', '-'], // QWERTY:----S-
    'romFile':          'landing.ch8'
  },
  {
    'romName':          'MAZE',
    'romDescription':   'Maze demo.\nDraws random\nmazes',
    'cyclesPerTick':    32,
    'userInstructions': 'NO USER INPUT',
    'buttonKeyMapping': ['-', '-', '-', '-', '-', '-'], // QWERTY:------
    'romFile':          'maze.ch8'
  },
  {
    'romName':          'MERLIN',
    'romDescription':   'Simon clone.\nTry to copy the\nlight sequences\ncorrectly',
    'cyclesPerTick':    2,
    'userInstructions': 'L/R:TOP-L/R\nA/B:BOTTOM-L/R',
    'buttonKeyMapping': ['-', '-', '4', '5', '7', '8'], // QWERTY:--QWAS
    'romFile':          'merlin.ch8'
  },
  {
    'romName':          'PONG',
    'romDescription':   'A two player\ntable tennis\ngame',
    'cyclesPerTick':    8,
    'userInstructions': 'U/D:P1 MOVE\nA/B:P2 MOVE',
    'buttonKeyMapping': ['1', '4', '-', '-', 'C', 'D'], // QWERTY:1Q--4R
    'romFile':          'pong.ch8'
  },
  {
    'romName':          'PUZZLE',
    'romDescription':   'Arrange tiles in\nascending order\nfrom left to\nright and top to\nbottom',
    'cyclesPerTick':    2,
    'userInstructions': 'U/D/L/R:SLIDE',
    'buttonKeyMapping': ['8', '2', '4', '6', '-', '-'], // QWERTY:S2QE--
    'romFile':          'puzzle.ch8'
  },
  {
    'romName':          'ROCKET',
    'romDescription':   'Avoid crashing\ninto the tunnel\nwalls',
    'cyclesPerTick':    12,
    'userInstructions': 'L/R:MOVE\nA:START',
    'buttonKeyMapping': ['-', '-', '4', '6', 'B', '-'], // QWERTY:--QEC-
    'romFile':          'rocket.ch8'
  },
  {
    'romName':          'SOCCER',
    'romDescription':   'A two player\ntable football\npong like game',
    'cyclesPerTick':    8,
    'userInstructions': 'U/D:P1 MOVE\nA/B:P2 MOVE',
    'buttonKeyMapping': ['1', '4', '-', '-', 'C', 'D'], // QWERTY:1Q--4R
    'romFile':          'soccer.ch8'
  },
  {
    'romName':          'SPACE FLIGHT',
    'romDescription':   'Fly without\ncrashing.\nComplete four\npasses to finish\neach level',
    'cyclesPerTick':    8,
    'userInstructions': 'U/D:MOVE\nA/B:START',
    'buttonKeyMapping': ['1', '4', '-', '-', 'E', 'F'], // QWERTY:1Q--FV
    'romFile':          'space-flight.ch8'
  },
  {
    'romName':          'SQUASH',
    'romDescription':   'Keep the ball in\nplay as long as\npossible - you\nhave 5 lives',
    'cyclesPerTick':    8,
    'userInstructions': 'U/D:MOVE',
    'buttonKeyMapping': ['1', '4', '-', '-', '-', '-'], // QWERTY:1Q----
    'romFile':          'squash.ch8'
  },
  {
    'romName':          'SUBMARINE',
    'romDescription':   'Hit enemy\nsubmarines with\ndepth charges\nLarge: 5 points\nSmall: 10 points',
    'cyclesPerTick':    4,
    'userInstructions': 'B:DEPTH CHARGE',
    'buttonKeyMapping': ['-', '-', '-', '-', '-', '5'], // QWERTY:-----W
    'romFile':          'submarine.ch8'
  },
  {
    'romName':          'TANK',
    'romDescription':   'Shoot the enemy\n& avoid crashing\nStart 25 shells\nCrash -5 shells\nGame over at 0',
    'cyclesPerTick':    24,
    'userInstructions': 'U/D/L/R:MOVE\nB:FIRE',
    'buttonKeyMapping': ['8', '2', '4', '6', '-', '5'], // QWERTY:S2QE-W
    'romFile':          'tank.ch8'
  },
  {
    'romName':          'TAPEWORM',
    'romDescription':   'Snake clone.\nSurvive as long\nas possible\nwithout crashing\ninto yourself',
    'cyclesPerTick':    8,
    'userInstructions': 'U/D/L/R:MOVE\nB:START',
    'buttonKeyMapping': ['2', '8', '4', '6', '-', 'F'], // QWERTY:2SQE-V
    'romFile':          'tapeworm.ch8'
  },
  {
    'romName':          'TETRIS',
    'romDescription':   'Tetris clone.\nUse falling\npuzzle pieces to\nbuild complete\nrows',
    'cyclesPerTick':    8,
    'userInstructions': 'D/L/R:MOVE\nB:ROTATE',
    'buttonKeyMapping': ['-', '7', '5', '6', '-', '4'], // QWERTY:-AWE-Q
    'romFile':          'tetris.ch8'
  },
  {
    'romName':          'UFO',
    'romDescription':   'Shoot the UFOs\nLarge: 5 points\nSmall: 15 points\nGame ends after\nfiring 15 shots',
    'cyclesPerTick':    12,
    'userInstructions': 'L/U/R:FIRE',
    'buttonKeyMapping': ['5', '-', '4', '6', '-', '-'], // QWERTY:W-QE--
    'romFile':          'ufo.ch8'
  },
  {
    'romName':          'WALL',
    'romDescription':   'Keep the ball in\nplay and aim for\nas high a streak\nas possible',
    'cyclesPerTick':    7,
    'userInstructions': 'U/D:MOVE',
    'buttonKeyMapping': ['1', '4', '-', '-', '-', '-'], // QWERTY:1Q----
    'romFile':          'wall.ch8'
  },
  {
    'romName':          'X-MIRROR',
    'romDescription':   'Draw symmetric\npatterns',
    'cyclesPerTick':    8,
    'userInstructions': 'U/D/L/R:MOVE',
    'buttonKeyMapping': ['2', '8', '4', '6', '-', '-'], // QWERTY:2SQE--
    'romFile':          'x-mirror.ch8'
  }
];
