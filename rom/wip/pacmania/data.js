const block_B64                = '//VVVVVVVVVf/1VVVVVVVVX/VVURERVVVV/1VRVVVRVVVfVVUREREVVRX1VVURERVVUVVVVVVVVVVRFVVVVVVVVVURVVFRUVFRUVEVUVFRUVFRVRX1UVFRUVFRUV9RUVFRUVFVX/VRUVFRUVFV/1FRUVFRUVX/9VVVVVVVVV//8'; // 17,15
const gate_B64                 = '8R8fEfH//////xHx8R8f'; // 10,3
const ghostBottom0_B64         = 'ARABERABABD/ARD/D/D//wD///8'; // 13,3
const ghostBottom1_B64         = 'AREQAREQ/wEQ/wEQ//8A//8A//8'; // 13,3
const ghostBottom2_B64         = '8AEREAERD/8BEP8BEP//AP//AP8'; // 13,3
const ghostEatenL_B64          = '8A8A///wdwdw//8HAHD///8P8P///w'; // 11,4
const ghostEatenR_B64          = '///wDwD///B3B3D///BwBw////D/Dw'; // 11,4
const ghostFleeingOverlayL_B64 = '//8PD/////8PAPAP/wAPAP///////w8AD///AAAP//D/8A//'; // 9,8
const ghostFleeingOverlayR_B64 = '/w8P//8P////D/8A8A//8A8AD////////wAP//8AAA//AP/w'; // 9,8
const ghostHuntingOverlayL_B64 = 'D/8PD/////8PAPAP/wD/D////////w//////////////////'; // 9,8
const ghostHuntingOverlayR_B64 = '/w8P/w8P////D/8A8A///w/wD///////////////////////'; // 9,8
const ghostOverlayU_B64        = '/w8P//8P////D///////////D///////////////////////'; // 9,8
const ghostTop_B64             = '//8AAA////8BEREP//8BERERD/8BEREREQ8BEREREREAEREREREQARERERERABEREREREAEREREREQARERERERABEREREREP'; // 13,11
const pacmanD0_B64             = '//AAAAD///AGZmYA//AGZmYGAPAGZmZmBgAGAGZgBgYAYGZmBmZgBmZmZmZmAAZmZmYGYAYAZmAGZgAGYABmZgDwBmZmZgD/8AZmZgD///AAAAD//w'; // 13,13
const pacmanD1_B64             = '//AAAAD///AGZmYA//AGZmYGAPAGZmZmBgAGAGZgBgYAYGZmBmZgBmZmZmZmAAZmZmZgYAYAAAAAZgAGAAAGZgDwBmZmZgD/8AZmZgD///AAAAD//w'; // 13,13
const pacmanD2_B64             = '//AAAAD///AGZmYA//AGZmYGAPAGZmZmBgAGAGZgBgYAYGZmBmZgAGZmZmZmAGAAAAAGYAYAAAAAZgAGAAAAZgDwZgAGZgD/8AZmZgD///AAAAD//w'; // 13,13
const pacmanL0_B64             = '//AAAAD///AGZmYA//AGZmYGAPAGZmZmBgAGAGZmZgYAYGZmZmZgBmZmZmYGAGZmZmZmYAAGZmZmZgAGBmZmZgDwBmZmZgD/8AZmZgD///AAAAD//w'; // 13,13
const pacmanL1_B64             = '//AAAAD///AGZmYA//AGZmYGAPAGZmZmBgAGAGZmZgYAYGZmZmZgBmZmZmYGAAZmZmZmYAAAZmZmZgAGAGZmZgDwBmZmZgD/8AZmZgD///AAAAD//w'; // 13,13
const pacmanL2_B64             = '//AAAAD///AGZmYA//AGZmYGAPAGZmZmBgAGAGZmZgYAYGZmZmZgAGZmZmYGDwBmZmZmYP8AZmZmZg/wAGZmZgDwBmZmZgD/8AZmZgD///AAAAD//w'; // 13,13
const pacmanR0_B64             = '//AAAAD///AGZmYA//AGBmZmAPAGBmZgBgAGBmYAYGYAZmZmBmZgBgZmZmZmAGZmZmZmAAZmZmZgBgAGZmAAZgDwBmZmZgD/8AZmZgD///AAAAD//w'; // 13,13
const pacmanR1_B64             = '//AAAAD///AGZmYA//AGBmZmAPAGBmZgBgAGBmYAYGYAZmZmBmZgBgZmZmZg8GZmZmYGDwZmZmAABgAGZmAABgDwBmZmZmD/8AZmZgD///AAAAD//w'; // 13,13
const pacmanR2_B64             = '//AAAAD///AGZmYA//AGBmZmAPAGBmZgBgAGBmYAYGYAZmZmBmAABgZmZmAP8GZmZgBgDwZmYAAAYPAGZgAABg/wBmYABmD/8AZmZmD///AAAAD//w'; // 13,13
const pacmanU0_B64             = '//AAAAD///AGZmYA//AGBmZmAPAGBmZmBgAGBmZmZmYAZmZmZmZgBgZmZmZgAGZmZmZmYAZmZmZmZgAGZmZmZgDwBmZmZgD/8AZmZgD///AAAAD//w'; // 13,13
const pacmanU1_B64             = '//AAAAD///AGZmYA//AGBmZmAPAGBmZmBgAGBmZmZmYAZmZmZmYABgZmZmYAAGZmZmZmYAZmZmZmZgAGZmZmZgDwBmZmZgD/8AZmZgD///AAAAD//w'; // 13,13
const pacmanU2_B64             = '//AAAAD///AGZmYA//AGBmZmAPAGBmZmBg8GBmZmZmDwZmZmZmAPBgZmZmAP8GZmZmYA/wZmZmZmAPAGZmZmZg/wBmZmZgD/8AZmZgD///AAAAD//w'; // 13,13
const pill_B64                 = '8ADwBgAGZgAGAPAA/w'; // 5,5
const powerPill_B64            = '/wAP/wZmDwZgBgBmYGAGZmYPBmYP/wAP/w'; // 7,7

// 0: empty, 1: block, 2: pill, 3: power pill, 4: gate, 5: bonus spawn point, 6: pacman spawn point
const levelMaps = [
  [
    [1,1,1,1,1],
    [1,3,4,5,1],
    [0,0,6,0,0],
    [1,2,2,2,1],
    [1,1,1,1,1],
  ],
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,2,1,2,1,1,2,1],
    [1,3,1,1,2,1,2,1,2,1,1,3,1],
    [1,2,1,1,2,2,2,2,2,1,1,2,1],
    [1,2,2,2,2,1,4,1,2,2,2,2,1],
    [1,1,2,1,2,1,0,1,2,1,2,1,1],
    [1,1,2,1,2,1,1,1,2,1,2,1,1],
    [1,2,2,2,2,2,5,2,2,2,2,2,1],
    [1,2,1,1,2,1,2,1,2,1,1,2,1],
    [1,2,1,2,2,1,2,1,2,2,1,2,1],
    [1,2,1,2,1,1,2,1,1,2,1,2,1],
    [1,2,2,2,2,2,6,2,2,2,2,2,1],
    [1,2,1,1,2,1,2,1,2,1,1,2,1],
    [1,3,1,1,2,1,2,1,2,1,1,3,1],
    [1,2,1,1,2,2,2,2,2,1,1,2,1],
    [1,2,2,2,2,1,1,1,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,4,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,5,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,6,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
];
