const frequencies = new Map([
  ['  ',   0.0000 ],
  ['G3', 195.9977 ],
  ['A3', 220.0000 ],
  ['B3', 246.9417 ],
  ['C4', 261.6256 ], // Middle C
  ['D4', 293.6648 ],
  ['E4', 329.6276 ],
  ['F4', 349.2282 ],
  ['G4', 391.9954 ],
  ['A4', 440.0000 ],
  ['B4', 493.8833 ],
  ['C5', 523.2511 ], // Tenor C
]);

const tuneHappyBirthdayToYou = {
  nameLine1: 'HAPPY BIRTHDAY',
  nameLine2: '',
  notes: [
    { ipn: 'G3', duration: 8},  // hap
    { ipn: '  ', duration: 2},
    { ipn: 'G3', duration: 8},  // py
    { ipn: '  ', duration: 2},
    { ipn: 'A3', duration: 20}, // birth
    { ipn: 'G3', duration: 20}, // day
    { ipn: 'C4', duration: 20}, // to
    { ipn: 'B3', duration: 40}, // you
    { ipn: '  ', duration: 20},
    { ipn: 'G3', duration: 8},  // hap
    { ipn: '  ', duration: 2},
    { ipn: 'G3', duration: 8},  // py
    { ipn: '  ', duration: 2},
    { ipn: 'A3', duration: 20}, // birth
    { ipn: 'G3', duration: 20}, // day
    { ipn: 'D4', duration: 20}, // to
    { ipn: 'C4', duration: 40}, // you
    { ipn: '  ', duration: 20},
    { ipn: 'G3', duration: 8},  // hap
    { ipn: '  ', duration: 2},
    { ipn: 'G3', duration: 8},  // py
    { ipn: '  ', duration: 2},
    { ipn: 'G4', duration: 20}, // birth
    { ipn: 'E4', duration: 20}, // day
    { ipn: 'C4', duration: 20}, // to
    { ipn: 'B3', duration: 20}, // your
    { ipn: 'A3', duration: 30}, // name
    { ipn: '  ', duration: 20},
    { ipn: 'F4', duration: 8},  // hap
    { ipn: '  ', duration: 2},
    { ipn: 'F4', duration: 8},  // py
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 20}, // birth
    { ipn: 'C4', duration: 20}, // day
    { ipn: 'D4', duration: 20}, // to
    { ipn: 'C4', duration: 60}, // you
    { ipn: '  ', duration: 100},
  ],
};

const tuneHenWladFyNhadau = {
  nameLine1: 'HEN WLAD FY',
  nameLine2: 'NHADAU',
  notes: [
    { ipn: 'C4', duration: 20}, // mae
    { ipn: '  ', duration: 4},
    { ipn: 'E4', duration: 20}, // hen
    { ipn: '  ', duration: 4},
    { ipn: 'D4', duration: 20}, // wlad
    { ipn: '  ', duration: 4},
    { ipn: 'C4', duration: 20}, // fy
    { ipn: '  ', duration: 4},
    { ipn: 'G4', duration: 20}, // nha
    { ipn: '  ', duration: 4},
    { ipn: 'F4', duration: 20}, // dau
    { ipn: '  ', duration: 4},
    { ipn: 'E4', duration: 20}, // yn
    { ipn: '  ', duration: 4},
    { ipn: 'C5', duration: 20}, // an
    { ipn: '  ', duration: 4},
    { ipn: 'C5', duration: 20}, // nwyl
    { ipn: '  ', duration: 4},
    { ipn: 'A4', duration: 10}, // i
    { ipn: '  ', duration: 2},
    { ipn: 'B4', duration: 10}, // i
    { ipn: '  ', duration: 4},
    { ipn: 'C5', duration: 40}, // mi
    { ipn: '  ', duration: 8},
    { ipn: 'A4', duration: 20}, // gwlad
    { ipn: '  ', duration: 4},
    { ipn: 'G4', duration: 20}, // beirdd
    { ipn: '  ', duration: 4},
    { ipn: 'E4', duration: 20}, // a
    { ipn: '  ', duration: 4},
    { ipn: 'C4', duration: 20}, // chan
    { ipn: '  ', duration: 4},
    { ipn: 'C4', duration: 20}, // to
    { ipn: '  ', duration: 4},
    { ipn: 'B3', duration: 20}, // rion
    { ipn: '  ', duration: 4},
    { ipn: 'C4', duration: 20}, // en
    { ipn: '  ', duration: 4},
    { ipn: 'E4', duration: 20}, // wo
    { ipn: '  ', duration: 4},
    { ipn: 'D4', duration: 20}, // gion
    { ipn: '  ', duration: 4},
    { ipn: 'D4', duration: 20}, // o
    { ipn: '  ', duration: 4},
    { ipn: 'D4', duration: 40}, // fri
    { ipn: '  ', duration: 8},
    { ipn: 'G4', duration: 20}, // ei
    { ipn: '  ', duration: 4},
    { ipn: 'G4', duration: 20}, // gw
    { ipn: '  ', duration: 4},
    { ipn: 'G4', duration: 20}, // rol
    { ipn: '  ', duration: 4},
    { ipn: 'E4', duration: 10}, // ry
    { ipn: '  ', duration: 2},
    { ipn: 'F4', duration: 10}, // y
    { ipn: '  ', duration: 4},
    { ipn: 'G4', duration: 20}, // fel
    { ipn: '  ', duration: 4},
    { ipn: 'G4', duration: 20}, // wyr
    { ipn: '  ', duration: 4},
    { ipn: 'A4', duration: 10}, // gw
    { ipn: '  ', duration: 2},
    { ipn: 'B4', duration: 10}, // lad
    { ipn: '  ', duration: 4},
    { ipn: 'C5', duration: 20}, // gar
    { ipn: '  ', duration: 4},
    { ipn: 'C5', duration: 20}, // wyr
    { ipn: '  ', duration: 4},
    { ipn: 'A4', duration: 10}, // tra
    { ipn: '  ', duration: 2},
    { ipn: 'B4', duration: 10}, // a
    { ipn: '  ', duration: 4},
    { ipn: 'C5', duration: 40}, // mad
    { ipn: '  ', duration: 8},
    { ipn: 'A4', duration: 20}, // dros
    { ipn: '  ', duration: 4},
    { ipn: 'G4', duration: 20}, // ry
    { ipn: '  ', duration: 4},
    { ipn: 'E4', duration: 20}, // ddid
    { ipn: '  ', duration: 4},
    { ipn: 'C4', duration: 20}, // co
    { ipn: '  ', duration: 4},
    { ipn: 'D4', duration: 10}, // lla
    { ipn: '  ', duration: 4},
    { ipn: 'E4', duration: 30}, // sant
    { ipn: '  ', duration: 4},
    { ipn: 'D4', duration: 20}, // eu
    { ipn: '  ', duration: 4},
    { ipn: 'C4', duration: 60}, // gwaed
    { ipn: '  ', duration: 100},
  ],
};

const tuneJingleBells = {
  nameLine1: 'JINGLE BELLS',
  nameLine2: '',
  notes: [
    { ipn: 'E4', duration: 15}, // jin
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 15}, // gle
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 30}, // bells
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 15}, // jin
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 15}, // gle
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 30}, // bells
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 15}, // jin
    { ipn: '  ', duration: 5},
    { ipn: 'G4', duration: 15}, // gle
    { ipn: '  ', duration: 5},
    { ipn: 'C4', duration: 25}, // all
    { ipn: '  ', duration: 2},
    { ipn: 'D4', duration: 15}, // the
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 50}, // way
    { ipn: '  ', duration: 10},
    { ipn: 'F4', duration: 15}, // oh
    { ipn: '  ', duration: 5},
    { ipn: 'F4', duration: 15}, // what
    { ipn: '  ', duration: 5},
    { ipn: 'F4', duration: 30}, // fun
    { ipn: '  ', duration: 5},
    { ipn: 'F4', duration: 10}, // it
    { ipn: '  ', duration: 2},
    { ipn: 'F4', duration: 10}, // is
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 15}, // to
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 25}, // ride
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 10}, // in
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 10}, // a
    { ipn: '  ', duration: 2},
    { ipn: 'G4', duration: 15}, // one
    { ipn: '  ', duration: 5},
    { ipn: 'G4', duration: 15}, // horse
    { ipn: '  ', duration: 5},
    { ipn: 'F4', duration: 15}, // o
    { ipn: '  ', duration: 5},
    { ipn: 'D4', duration: 15}, // pen
    { ipn: '  ', duration: 5},
    { ipn: 'C4', duration: 50}, // sleigh
    { ipn: '  ', duration: 100},
  ],
};

const tuneMaryHadALittleLamb = {
  nameLine1: 'MARY HAD A',
  nameLine2: 'LITTLE LAMB',
  notes: [
    { ipn: 'E4', duration: 15}, // ma
    { ipn: '  ', duration: 2},
    { ipn: 'D4', duration: 15}, // ry
    { ipn: '  ', duration: 2},
    { ipn: 'C4', duration: 15}, // had
    { ipn: '  ', duration: 2},
    { ipn: 'D4', duration: 15}, // a
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 15}, // lit
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 15}, // tle
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 30}, // lamb
    { ipn: '  ', duration: 2},
    { ipn: 'D4', duration: 15}, // lit
    { ipn: '  ', duration: 2},
    { ipn: 'D4', duration: 15}, // tle
    { ipn: '  ', duration: 2},
    { ipn: 'D4', duration: 30}, // lamb
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 15}, // lit
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 15}, // tle
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 30}, // lamb
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 15}, // ma
    { ipn: '  ', duration: 2},
    { ipn: 'D4', duration: 15}, // ry
    { ipn: '  ', duration: 2},
    { ipn: 'C4', duration: 15}, // had
    { ipn: '  ', duration: 2},
    { ipn: 'D4', duration: 15}, // a
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 15}, // lit
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 15}, // tle
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 15}, // lamb
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 15}, // its
    { ipn: '  ', duration: 2},
    { ipn: 'D4', duration: 15}, // fleece
    { ipn: '  ', duration: 2},
    { ipn: 'D4', duration: 15}, // was
    { ipn: '  ', duration: 2},
    { ipn: 'E4', duration: 15}, // white
    { ipn: '  ', duration: 2},
    { ipn: 'D4', duration: 15}, // as
    { ipn: '  ', duration: 2},
    { ipn: 'C4', duration: 30}, // snow
    { ipn: '  ', duration: 100},
  ],
};

const tuneTwinkleTwinkleLittleStar = {
  nameLine1: 'TWINKLE TWINKLE',
  nameLine2: 'LITTLE STAR',
  notes: [
    { ipn: 'G3', duration: 20}, // twin
    { ipn: '  ', duration: 5},
    { ipn: 'G3', duration: 20}, // kle
    { ipn: '  ', duration: 5},
    { ipn: 'D4', duration: 20}, // twin
    { ipn: '  ', duration: 5},
    { ipn: 'D4', duration: 20}, // kle
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 20}, // lit
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 20}, // tle
    { ipn: '  ', duration: 5},
    { ipn: 'D4', duration: 40}, // star
    { ipn: '  ', duration: 10},
    { ipn: 'C4', duration: 20}, // how
    { ipn: '  ', duration: 5},
    { ipn: 'C4', duration: 20}, // i
    { ipn: '  ', duration: 5},
    { ipn: 'B3', duration: 20}, // won
    { ipn: '  ', duration: 5},
    { ipn: 'B3', duration: 20}, // der
    { ipn: '  ', duration: 5},
    { ipn: 'A3', duration: 20}, // what
    { ipn: '  ', duration: 5},
    { ipn: 'A3', duration: 20}, // you
    { ipn: '  ', duration: 5},
    { ipn: 'G3', duration: 40}, // are
    { ipn: '  ', duration: 10},
    { ipn: 'D4', duration: 20}, // up
    { ipn: '  ', duration: 5},
    { ipn: 'D4', duration: 20}, // a
    { ipn: '  ', duration: 5},
    { ipn: 'C4', duration: 20}, // bove
    { ipn: '  ', duration: 5},
    { ipn: 'C4', duration: 20}, // the
    { ipn: '  ', duration: 5},
    { ipn: 'B3', duration: 20}, // world
    { ipn: '  ', duration: 5},
    { ipn: 'B3', duration: 20}, // so
    { ipn: '  ', duration: 5},
    { ipn: 'A3', duration: 40}, // high
    { ipn: '  ', duration: 10},
    { ipn: 'D4', duration: 20}, // like
    { ipn: '  ', duration: 5},
    { ipn: 'D4', duration: 20}, // a
    { ipn: '  ', duration: 5},
    { ipn: 'C4', duration: 20}, // dia
    { ipn: '  ', duration: 5},
    { ipn: 'C4', duration: 20}, // mond
    { ipn: '  ', duration: 5},
    { ipn: 'B3', duration: 20}, // in
    { ipn: '  ', duration: 5},
    { ipn: 'B3', duration: 20}, // the
    { ipn: '  ', duration: 5},
    { ipn: 'A3', duration: 40}, // sky
    { ipn: '  ', duration: 10},
    { ipn: 'G3', duration: 20}, // twin
    { ipn: '  ', duration: 5},
    { ipn: 'G3', duration: 20}, // kle
    { ipn: '  ', duration: 5},
    { ipn: 'D4', duration: 20}, // twin
    { ipn: '  ', duration: 5},
    { ipn: 'D4', duration: 20}, // kle
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 20}, // lit
    { ipn: '  ', duration: 5},
    { ipn: 'E4', duration: 20}, // tle
    { ipn: '  ', duration: 5},
    { ipn: 'D4', duration: 40}, // star
    { ipn: '  ', duration: 10},
    { ipn: 'C4', duration: 20}, // how
    { ipn: '  ', duration: 5},
    { ipn: 'C4', duration: 20}, // i
    { ipn: '  ', duration: 5},
    { ipn: 'B3', duration: 20}, // won
    { ipn: '  ', duration: 5},
    { ipn: 'B3', duration: 20}, // der
    { ipn: '  ', duration: 5},
    { ipn: 'A3', duration: 20}, // what
    { ipn: '  ', duration: 5},
    { ipn: 'A3', duration: 20}, // you
    { ipn: '  ', duration: 5},
    { ipn: 'G3', duration: 40}, // are
    { ipn: '  ', duration: 100},
  ],
};
