const imgPlayerJump = [
   6, 6, 6, 6, 6,-1,
  -1, 3, 3, 6, 6,-1,
  -1, 3, 3, 3, 6, 6,
  -1, 1, 1, 1, 1,-1,
   3, 1, 1, 1, 3, 3,
   7, 1, 1, 1, 1, 7,
  -1,-1,-1,-1,-1,-1,
];

const imgPlayerStand = [
   6, 6, 6, 6, 6,-1,
  -1, 3, 3, 6, 6,-1,
  -1, 3, 3, 3, 6,-1,
  -1, 1, 1, 1, 1, 6,
  -1, 1, 1, 1, 3,-1,
  -1, 1, 1, 1, 3,-1,
  -1, 7,-1,-1, 7,-1,
];

const imgPlayerStep = [
   6, 6, 6, 6, 6,-1,
  -1, 3, 3, 6, 6,-1,
  -1, 3, 3, 3, 6, 6,
  -1, 1, 1, 1, 1,-1,
   3, 1, 1, 1, 1, 3,
  -1, 1, 1, 1, 1, 3,
  -1,-1, 7, 7,-1,-1,
];

const imgTile = [
  6,2,6,2,6,2,6,2,
  2,6,2,6,2,6,2,6,
  6,2,6,2,6,2,6,2,
  2,6,2,6,2,6,2,6,
  6,2,6,2,6,2,6,2,
  2,6,2,6,2,6,2,6,
  6,2,6,2,6,2,6,2,
  2,6,2,6,2,6,2,6,
];

const initialLevelsData = new Map([
  [
    1, {
      width: 15,
      height: 18,
      tilemap: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1,1,1,1,0,1],
        [1,0,0,0,1,1,1,1,1,1,1,0,0,0,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,0,0,0,0,0,1,1,1,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,1,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,0,0,0,0,0,0,1,1,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      ]
    }
  ],
]);
