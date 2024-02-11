const options = [
  // Default
  { name: 'DEFAULT',          palette: [0x000000, 0x0000ff, 0xff0000, 0xff00ff, 0x00ff00, 0x00ffff, 0xffff00, 0xffffff] },
  // 2 unique colors
  { name: 'MAC PAINT',        palette: [0x8bc8fe, 0x051b2c, 0x8bc8fe, 0x051b2c, 0x8bc8fe, 0x051b2c, 0x8bc8fe, 0x051b2c] }, // https://lospec.com/palette-list/mac-paint
  { name: 'BITBEE',           palette: [0x292b30, 0xcfab4a, 0x292b30, 0xcfab4a, 0x292b30, 0xcfab4a, 0x292b30, 0xcfab4a] }, // https://lospec.com/palette-list/bitbee
  { name: 'KNOCKIA3310',      palette: [0x212c28, 0x72a488, 0x212c28, 0x72a488, 0x212c28, 0x72a488, 0x212c28, 0x72a488] }, // https://lospec.com/palette-list/knockia3310
  { name: 'CASIO BASIC',      palette: [0x000000, 0x83b07e, 0x000000, 0x83b07e, 0x000000, 0x83b07e, 0x000000, 0x83b07e] }, // https://lospec.com/palette-list/casio-basic
  { name: 'PEACHY KEEN',      palette: [0xfacab8, 0x242234, 0xfacab8, 0x242234, 0xfacab8, 0x242234, 0xfacab8, 0x242234] }, // https://lospec.com/palette-list/peachy-keen
  { name: 'YS FUNKY JAM',     palette: [0x920244, 0xfec28c, 0x920244, 0xfec28c, 0x920244, 0xfec28c, 0x920244, 0xfec28c] }, // https://lospec.com/palette-list/ys-funky-jam
  { name: '1BIT BLUE',        palette: [0x0d132a, 0xadc3e8, 0x0d132a, 0xadc3e8, 0x0d132a, 0xadc3e8, 0x0d132a, 0xadc3e8] }, // https://lospec.com/palette-list/1bit-blue
  { name: 'YS POP IT',        palette: [0x00d4ff, 0xd61406, 0x00d4ff, 0xd61406, 0x00d4ff, 0xd61406, 0x00d4ff, 0xd61406] }, // https://lospec.com/palette-list/ys-pop-it
  { name: 'RUNES SPELLS',     palette: [0x000412, 0xd9b982, 0x000412, 0xd9b982, 0x000412, 0xd9b982, 0x000412, 0xd9b982] }, // https://lospec.com/palette-list/runes-spells
  { name: 'SANGRE',           palette: [0x610e0e, 0x120628, 0x610e0e, 0x120628, 0x610e0e, 0x120628, 0x610e0e, 0x120628] }, // https://lospec.com/palette-list/sangre
  { name: 'ONGBIT',           palette: [0x151d24, 0xed8463, 0x151d24, 0xed8463, 0x151d24, 0xed8463, 0x151d24, 0xed8463] }, // https://lospec.com/palette-list/ongbit
  { name: 'THE NIGHT',        palette: [0x413652, 0x6493ff, 0x413652, 0x6493ff, 0x413652, 0x6493ff, 0x413652, 0x6493ff] }, // https://lospec.com/palette-list/the-night
  { name: 'CHASING LIGHT',    palette: [0xffff02, 0x000000, 0xffff02, 0x000000, 0xffff02, 0x000000, 0xffff02, 0x000000] }, // https://lospec.com/palette-list/chasing-light
  { name: 'BLUEBROWN 1BIT',   palette: [0xb4e7ef, 0xaf5534, 0xb4e7ef, 0xaf5534, 0xb4e7ef, 0xaf5534, 0xb4e7ef, 0xaf5534] }, // https://lospec.com/palette-list/bluerown-1bit
  { name: 'BIT ZANTINE',      palette: [0x702963, 0xffbf00, 0x702963, 0xffbf00, 0x702963, 0xffbf00, 0x702963, 0xffbf00] }, // https://lospec.com/palette-list/bit-zantine
  { name: 'PIXELINK',         palette: [0x3e232c, 0xedf6d6, 0x3e232c, 0xedf6d6, 0x3e232c, 0xedf6d6, 0x3e232c, 0xedf6d6] }, // https://lospec.com/palette-list/pixel-ink
  // 4 unique colors
  { name: 'CANDIED HEART',    palette: [0xaed0cb, 0xff6e6e, 0xa36363, 0x6b617c, 0xaed0cb, 0xff6e6e, 0xa36363, 0x6b617c] }, // https://lospec.com/palette-list/candied-heart
  { name: '2 BIT PIPS',       palette: [0x3a3522, 0x7c3838, 0x647859, 0xb5a37e, 0x3a3522, 0x7c3838, 0x647859, 0xb5a37e] }, // https://lospec.com/palette-list/2-bit-pips
  { name: 'SWEETCYAN',        palette: [0xf5e2a9, 0x96cff2, 0xababeb, 0x7e84d9, 0xf5e2a9, 0x96cff2, 0xababeb, 0x7e84d9] }, // https://lospec.com/palette-list/sweetcyan
  { name: 'CALICO 4',         palette: [0xefebdf, 0xe8a053, 0x936a4e, 0x381701, 0xefebdf, 0xe8a053, 0x936a4e, 0x381701] }, // https://lospec.com/palette-list/calico-4
  { name: 'PUNKMYC',          palette: [0x000000, 0x4d0020, 0x00f2ff, 0xfefe9a, 0x000000, 0x4d0020, 0x00f2ff, 0xfefe9a] }, // https://lospec.com/palette-list/punkmyc
  { name: 'AETHER QUARTET',   palette: [0xd1d8ff, 0x968f79, 0x3c0197, 0x2c0148, 0xd1d8ff, 0x968f79, 0x3c0197, 0x2c0148] }, // https://lospec.com/palette-list/aether-quartet
  { name: 'LAVA GB',          palette: [0x051f39, 0x4a2480, 0xc53a9d, 0xff8e80, 0x051f39, 0x4a2480, 0xc53a9d, 0xff8e80] }, // https://lospec.com/palette-list/lava-gb
  { name: 'MOONLIGHT GB',     palette: [0x0f052d, 0x203671, 0x36868f, 0x5fc75d, 0x0f052d, 0x203671, 0x36868f, 0x5fc75d] }, // https://lospec.com/palette-list/moonlight-gb
  { name: 'RUSTIC GB',        palette: [0x2c2137, 0x764462, 0xedb4a1, 0xa96868, 0x2c2137, 0x764462, 0xedb4a1, 0xa96868] }, // https://lospec.com/palette-list/rustic-gb
  { name: 'MIST GB',          palette: [0x2d1b00, 0x1e606e, 0x5ab9a8, 0xc4f0c2, 0x2d1b00, 0x1e606e, 0x5ab9a8, 0xc4f0c2] }, // https://lospec.com/palette-list/mist-gb
  { name: 'WISH GB',          palette: [0x622e4c, 0x7550e8, 0x608fcf, 0x8be5ff, 0x622e4c, 0x7550e8, 0x608fcf, 0x8be5ff] }, // https://lospec.com/palette-list/wish-gb
  { name: 'CRIMSON',          palette: [0xeff9d6, 0xba5044, 0x7a1c4b, 0x1b0326, 0xeff9d6, 0xba5044, 0x7a1c4b, 0x1b0326] }, // https://lospec.com/palette-list/crimson
  { name: 'BLK AQU4',         palette: [0x002b59, 0x005f8c, 0x00b9be, 0x9ff4e5, 0x002b59, 0x005f8c, 0x00b9be, 0x9ff4e5] }, // https://lospec.com/palette-list/blk-aqu4
  { name: 'GOLD GB',          palette: [0x210b1b, 0x4d222c, 0x9d654c, 0xcfab51, 0x210b1b, 0x4d222c, 0x9d654c, 0xcfab51] }, // https://lospec.com/palette-list/gold-gb
  { name: 'CHERRYMELON',      palette: [0xfcdeea, 0xff4d6d, 0x265935, 0x012824, 0xfcdeea, 0xff4d6d, 0x265935, 0x012824] }, // https://lospec.com/palette-list/cherrymelon
  { name: 'FUZZYFOUR',        palette: [0x302387, 0xff3796, 0x00faac, 0xfffdaf, 0x302387, 0xff3796, 0x00faac, 0xfffdaf] }, // https://lospec.com/palette-list/fuzzyfour
  { name: 'KANKEI4',          palette: [0xffffff, 0xf42e1f, 0x2f256b, 0x060608, 0xffffff, 0xf42e1f, 0x2f256b, 0x060608] }, // https://lospec.com/palette-list/kankei4
  { name: 'NYMPH GB',         palette: [0x2c2137, 0x446176, 0x3fac95, 0xa1ef8c, 0x2c2137, 0x446176, 0x3fac95, 0xa1ef8c] }, // https://lospec.com/palette-list/nymph-gb
  { name: 'RED BLOOD PAIN',   palette: [0x7e1f23, 0xc4181f, 0x120a19, 0x5e4069, 0x7e1f23, 0xc4181f, 0x120a19, 0x5e4069] }, // https://lospec.com/palette-list/red-blood-pain
  { name: 'CORAL 4',          palette: [0xffd0a4, 0xf4949c, 0x7c9aac, 0x68518a, 0xffd0a4, 0xf4949c, 0x7c9aac, 0x68518a] }, // https://lospec.com/palette-list/coral-4
  { name: 'PURPLEDAWN',       palette: [0xeefded, 0x9a7bbc, 0x2d757e, 0x001b2e, 0xeefded, 0x9a7bbc, 0x2d757e, 0x001b2e] }, // https://lospec.com/palette-list/purpledawn
  { name: 'AMBER CRTGB',      palette: [0x0d0405, 0x5e1210, 0xd35600, 0xfed018, 0x0d0405, 0x5e1210, 0xd35600, 0xfed018] }, // https://lospec.com/palette-list/amber-crtgb
  { name: 'SOFTSERVE 4',      palette: [0xe64270, 0x64c1bd, 0xead762, 0xe3e6e8, 0xe64270, 0x64c1bd, 0xead762, 0xe3e6e8] }, // https://lospec.com/palette-list/softserve-4
  { name: 'EARTH GB',         palette: [0x774346, 0xb87652, 0xacb965, 0xf5f29e, 0x774346, 0xb87652, 0xacb965, 0xf5f29e] }, // https://lospec.com/palette-list/earth-gb
  { name: 'RETTIEPUNK',       palette: [0x151c18, 0x094466, 0xcc1242, 0xf0745c, 0x151c18, 0x094466, 0xcc1242, 0xf0745c] }, // https://lospec.com/palette-list/rettiepunk
  { name: 'BLUSH GB',         palette: [0xfe9192, 0xfcdebe, 0x0cc0d4, 0x5e5768, 0xfe9192, 0xfcdebe, 0x0cc0d4, 0x5e5768] }, // https://lospec.com/palette-list/blush-gb
  { name: 'HEART4',           palette: [0x3e2653, 0xa64777, 0xff4589, 0xebe5ce, 0x3e2653, 0xa64777, 0xff4589, 0xebe5ce] }, // https://lospec.com/palette-list/heart4
  { name: 'FOXFIRE',          palette: [0x5a0084, 0xe63900, 0xffc96b, 0xffffff, 0x5a0084, 0xe63900, 0xffc96b, 0xffffff] }, // https://lospec.com/palette-list/foxfire
  // 8 unique colors
  { name: 'DMG4EVR',          palette: [0x333030, 0x423d4d, 0x4d5966, 0x667f59, 0x88985b, 0xb3b37e, 0xd8ceae, 0xf0f0e4] }, // https://lospec.com/palette-list/dmg4evr
  { name: 'SLSO8',            palette: [0x0d2b45, 0x203c56, 0x544e68, 0x8d697a, 0xd08159, 0xffaa5e, 0xffd4a3, 0xffecd6] }, // https://lospec.com/palette-list/slso8
  { name: 'RUST GOLD 8',      palette: [0xf6cd26, 0xac6b26, 0x563226, 0x331c17, 0xbb7f57, 0x725956, 0x393939, 0x202020] }, // https://lospec.com/palette-list/rust-gold-8
  { name: 'AMMO 8',           palette: [0x040c06, 0x112318, 0x1e3a29, 0x305d42, 0x4d8061, 0x89a257, 0xbedc7f, 0xeeffcc] }, // https://lospec.com/palette-list/ammo-8
  { name: 'POLLEN8',          palette: [0x73464c, 0xab5675, 0xee6a7c, 0xffa7a5, 0xffe07e, 0xffe7d6, 0x72dcbb, 0x34acba] }, // https://lospec.com/palette-list/pollen8
  { name: 'JUSTPARCHMENT8',   palette: [0x292418, 0x524839, 0x73654a, 0x8b7d62, 0xa48d6a, 0xbda583, 0xcdba94, 0xe6ceac] }, // https://lospec.com/palette-list/justparchment8
  { name: 'CITRINK',          palette: [0xffffff, 0xfcf660, 0xb2d942, 0x52c33f, 0x166e7a, 0x254d70, 0x252446, 0x201533] }, // https://lospec.com/palette-list/citrink
  { name: 'FUNKYFUTURE 8',    palette: [0x2b0f54, 0xab1f65, 0xff4f69, 0xfff7f8, 0xff8142, 0xffda45, 0x3368dc, 0x49e7ec] }, // https://lospec.com/palette-list/funkyfuture-8
  { name: 'PAPER 8',          palette: [0x1f244b, 0x654053, 0xa8605d, 0xd1a67e, 0xf6e79c, 0xb6cf8e, 0x60ae7b, 0x3c6b64] }, // https://lospec.com/palette-list/paper-8
  { name: 'BORKFEST',         palette: [0xdfd785, 0xebc275, 0xf39949, 0xff7831, 0xca5a2e, 0x963c3c, 0x3a2802, 0x202215] }, // https://lospec.com/palette-list/borkfest
  { name: 'BERRY NEBULA',     palette: [0x6ceded, 0x6cb9c9, 0x6d85a5, 0x6e5181, 0x6f1d5c, 0x4f1446, 0x2e0a30, 0x0d001a] }, // https://lospec.com/palette-list/berry-nebula
  { name: 'DREAM HAZE 8',     palette: [0x3c42c4, 0x6e51c8, 0xa065cd, 0xce79d2, 0xd68fb8, 0xdda2a3, 0xeac4ae, 0xf4dfbe] }, // https://lospec.com/palette-list/dream-haze-8
  { name: 'ODD FEELING',      palette: [0x900c3f, 0xe84a5f, 0xff847c, 0xfc9d9d, 0xfeceab, 0xccafaf, 0x99b898, 0xffffff] }, // https://lospec.com/palette-list/odd-feeling
  { name: 'FAIRYDUST 8',      palette: [0xf0dab1, 0xe39aac, 0xc45d9f, 0x634b7d, 0x6461c2, 0x2ba9b4, 0x93d4b5, 0xf0f6e8] }, // https://lospec.com/palette-list/fairydust-8
  { name: 'RETROCAL 8',       palette: [0x6eb8a8, 0x2a584f, 0x74a33f, 0xfcffc0, 0xc6505a, 0x2f142f, 0x774448, 0xee9c5d] }, // https://lospec.com/palette-list/retrocal-8
  { name: 'SEAFOAM',          palette: [0x37364e, 0x355d69, 0x6aae9d, 0xb9d4b4, 0xf4e9d4, 0xd0baa9, 0x9e8e91, 0x5b4a68] }, // https://lospec.com/palette-list/seafoam
  { name: 'DAWNBRINGERS DB8', palette: [0x000000, 0x55415f, 0x646964, 0xd77355, 0x508cd7, 0x64b964, 0xe6c86e, 0xdcf5ff] }, // https://lospec.com/palette-list/dawnbringers-8-color
  { name: 'CLEMENT 8',        palette: [0x000871, 0x8854f3, 0x639bff, 0x63ffba, 0xff8c5c, 0xff79ae, 0xfff982, 0xffffff] }, // https://lospec.com/palette-list/clement-8
  { name: 'WITCHING HOUR',    palette: [0xf6dbba, 0xdb604c, 0xb13353, 0x5e2052, 0x74c99e, 0x317c87, 0x271854, 0x1a1016] }, // https://lospec.com/palette-list/witching-hour
  { name: 'CUSTODIAN 8',      palette: [0x2b3634, 0x474848, 0x6e5f52, 0xa2856c, 0xa0a294, 0xdcb9a0, 0xf3dbc6, 0xfffefe] }, // https://lospec.com/palette-list/custodian-8
  { name: 'GREYT BIT',        palette: [0x574368, 0x8488d3, 0xcfd3c1, 0xf8c868, 0x8ddb34, 0x69cfef, 0xd1b3ff, 0xff8e65] }, // https://lospec.com/palette-list/greyt-bit
  { name: 'KINKAN',           palette: [0x446176, 0x3eaaae, 0x8cefb6, 0xc4f0c2, 0xfffee4, 0xbec0c0, 0xffa7b9, 0xff7a8f] }, // https://lospec.com/palette-list/kinkan
  { name: 'ROSEMOSS 8',       palette: [0x0a0d11, 0x552804, 0xab3b1e, 0xb1743d, 0xc8ac93, 0x646c5e, 0x584a17, 0x2d291c] }, // https://lospec.com/palette-list/rosemoss-8
  { name: 'GRAYFRUIT8',       palette: [0x000000, 0xffffff, 0x623ea2, 0x2e1f49, 0x2eff6c, 0x1d775d, 0xe53aff, 0x9b20b7] }, // https://lospec.com/palette-list/grayfruit8
  { name: 'SECAM',            palette: [0x000000, 0x2121ff, 0xf03c79, 0xff50ff, 0x7fff00, 0x7fffff, 0xffff3f, 0xffffff] }, // https://lospec.com/palette-list/secam
  { name: 'COLDWOOD8',        palette: [0x372e4d, 0x5f699c, 0x65aed6, 0xa4ebcc, 0xeffae6, 0xf0b38d, 0xb56d7f, 0x614363] }, // https://lospec.com/palette-list/coldwood8
  { name: 'SUBMRGD CHIMERA',  palette: [0xf7faea, 0xffd2de, 0xf792e4, 0xde39e9, 0x8623ae, 0x6d4299, 0x2e1e5c, 0x120f28] }, // https://lospec.com/palette-list/submerged-chimera
  { name: 'ARGEEBEY 8',       palette: [0x000000, 0x1f246a, 0x8a1181, 0xd14444, 0x2ca53e, 0x68cbcb, 0xe3c72d, 0xffffff] }, // https://lospec.com/palette-list/argeebey-8
  { name: 'DESATUR8',         palette: [0xf0f0eb, 0xffff8f, 0x7be098, 0x849ad8, 0xe8b382, 0xd8828e, 0xa776c1, 0x545155] }, // https://lospec.com/palette-list/desatur8
  { name: 'TNR 8',            palette: [0x191e23, 0x1f2545, 0x412c35, 0x63374a, 0xa43838, 0xe95050, 0xff8d99, 0xffd7d7] }, // https://lospec.com/palette-list/tnr-8
  { name: 'MAHYELLAW 22',     palette: [0x060b11, 0x0c1023, 0x10182e, 0x182634, 0x5e1a20, 0x8d402f, 0xbe794f, 0xe3b47a] }, // https://lospec.com/palette-list/mahyellaw-22
  { name: 'RETRO 8',          palette: [0x041026, 0x051a44, 0x1f0398, 0x5000c3, 0x7521ee, 0x0099c3, 0x00c38f, 0x3ee3b7] }, // https://lospec.com/palette-list/retro-8
  { name: 'NOSTALGI8',        palette: [0xbfbfbf, 0x71a668, 0x6a86b0, 0x76568f, 0xab5c74, 0xb89d6e, 0x4c5b6b, 0x2e253d] }, // https://lospec.com/palette-list/nostalgi8
  { name: 'IMAGINE8',         palette: [0xde024e, 0xfc4e51, 0xffab89, 0x24793d, 0x0e3abf, 0x9350aa, 0x8e252e, 0x401b20] }, // https://lospec.com/palette-list/imagine8
  { name: 'BAUHAUS',          palette: [0x1a1616, 0x4f186b, 0x3e4db4, 0x91144e, 0xea1f25, 0xad6d37, 0xf1ca00, 0xecddbe] }, // https://lospec.com/palette-list/bauhaus
  { name: 'ATOM 8',           palette: [0xb30000, 0xff8000, 0xffffaa, 0x6cd900, 0x008000, 0x000000, 0x404080, 0x888888] }, // https://lospec.com/palette-list/atom-8
  { name: 'GOLDEN FLAME',     palette: [0x1a1a1a, 0x2d1c0e, 0x4d2d06, 0x6a3c0b, 0xa66916, 0xe3a72b, 0xffe17a, 0xf3edea] }, // https://lospec.com/palette-list/golden-flame
  { name: 'PRIMAL8',          palette: [0x1a1828, 0x4d5a6c, 0x6da9e3, 0xffffff, 0xeeb333, 0x259322, 0xb04848, 0x5b2e33] }, // https://lospec.com/palette-list/primal8
  { name: 'SUNSET 8',         palette: [0xffff78, 0xffd647, 0xffc247, 0xffa936, 0xff8b6f, 0xe67595, 0x9a6390, 0x464678] }, // https://lospec.com/palette-list/sunset-8
  { name: 'SATUR8D',          palette: [0x0d0214, 0x520644, 0x604564, 0xcf3e78, 0x077299, 0x5fb874, 0xdda856, 0xe9e37f] }, // https://lospec.com/palette-list/satur8d
  { name: 'CRAYON PAINT',     palette: [0x76a1f1, 0x2f6a5d, 0x69bf2b, 0xfbf7b6, 0xe98e33, 0xa03030, 0x151212, 0x9e969b] }, // https://lospec.com/palette-list/crayon-paint
  { name: 'EXISTENTIAL DEMO', palette: [0xf8f3fd, 0xfac6b4, 0x9adae7, 0x97cb1d, 0x5da2ca, 0xda298e, 0x0b8633, 0x2e2b12] }, // https://lospec.com/palette-list/existential-demo
  { name: 'DULL GLOW 8',      palette: [0xfbe9c1, 0xe1a854, 0xdc6b56, 0x39363a, 0x67585b, 0x9c7fa6, 0x4eb1aa, 0x6b8d5f] }, // https://lospec.com/palette-list/dull-glow-8
  { name: 'ROARIN 80S V2',    palette: [0xa40038, 0xd43e1f, 0xdf892e, 0x4e7026, 0x09177e, 0x330043, 0x01000e, 0xf5c1c5] }, // https://lospec.com/palette-list/the-roarin-80s-v2
  { name: 'ENDESGA 8',        palette: [0xfdfdf8, 0xd32734, 0xda7d22, 0xe6da29, 0x28c641, 0x2d93dd, 0x7b53ad, 0x1b1c33] }, // https://lospec.com/palette-list/endesga-8
  { name: 'SRIRACHA',         palette: [0x750500, 0xbc210a, 0xcd5532, 0xf1af8d, 0x077d22, 0x289f4f, 0x4ec580, 0xe2e2c0] }, // https://lospec.com/palette-list/sriracha
  { name: 'MARSEILLE',        palette: [0x0c0c0c, 0x273dd9, 0x007738, 0xff3f14, 0xe3c72b, 0xffb080, 0x94b3ff, 0xffd8cc] }, // https://lospec.com/palette-list/palette-of-marseille
  { name: 'ST 8 R B REMAKE',  palette: [0x1a0908, 0x4d1313, 0xb3242d, 0xf26174, 0x85b1f2, 0x335ccc, 0x141f66, 0x0a0a1a] }, // https://lospec.com/palette-list/st-8-r-b-remake
  { name: 'SUNSET MKII',      palette: [0x282b57, 0x443482, 0x703e9c, 0xc2469d, 0xe35f8d, 0xeb7a7e, 0xf59182, 0xfab88e] }, // https://lospec.com/palette-list/sunset-mkii
  { name: 'PRIMARY 8',        palette: [0xf5ffe0, 0x1b1926, 0x262157, 0x323da1, 0xbd2f40, 0xf0e143, 0x6ca84d, 0x23574d] }, // https://lospec.com/palette-list/primary-8
  { name: 'OASIS KLUB 8',     palette: [0x2323c7, 0x7f70ff, 0xc735fb, 0xdc65b1, 0x00a8b1, 0x37cfb7, 0xe3d170, 0xfef3c0] }, // https://lospec.com/palette-list/oasis-klub-8
  { name: 'TRICK OR TREAT 8', palette: [0xfffddc, 0xc7a7ce, 0x8b3ec9, 0x192662, 0x167268, 0x2ebe00, 0xffd300, 0xe4782b] }, // https://lospec.com/palette-list/trick-or-treat-8
  { name: '4PI',              palette: [0xffe2ce, 0xf56214, 0xffc414, 0x3bd827, 0x147658, 0x14c4ce, 0x1d3162, 0xa73176] }, // https://lospec.com/palette-list/4pi
  { name: 'RAINBOW HORROR',   palette: [0x000000, 0xffffff, 0xe81c1c, 0xfa7d17, 0xfff81f, 0x5bcf29, 0x215cff, 0xc421ff] }, // https://lospec.com/palette-list/1bit-rainbow-horror
  { name: 'SUPERB 8',         palette: [0xf6faff, 0xeeea18, 0xedc495, 0x3d9c09, 0x0891cd, 0x776b7d, 0xe62800, 0x000800] }, // https://lospec.com/palette-list/superb-8
  { name: 'SWAMPY SUMMER',    palette: [0xf5e16e, 0xd98f41, 0x8c4323, 0x4a1816, 0x6ff2ae, 0x17a668, 0x02732e, 0x004726] }, // https://lospec.com/palette-list/swampy-summer
  { name: 'ST 8 GREENERY',    palette: [0x040d04, 0x11260b, 0x1d4010, 0x356614, 0x68991f, 0xb4cc52, 0xe4f285, 0xf1f2e6] }, // https://lospec.com/palette-list/st-8-greenery
  { name: 'SYNTHWAVE CITY',   palette: [0xf36688, 0xda3182, 0x9e316b, 0xbb3ad3, 0x684dda, 0x5033db, 0x261a5a, 0x1a1044] }, // https://lospec.com/palette-list/synthwave-city
  { name: 'AMAZON 8',         palette: [0x4dc2da, 0x1179aa, 0x0d4e7e, 0x06333d, 0xd4824a, 0xa92c22, 0x681517, 0x310a0b] }, // https://lospec.com/palette-list/amazon-8
  { name: 'BLACKM0LD',        palette: [0x101010, 0x353334, 0x4d4c43, 0x727356, 0x734d25, 0x917421, 0xb58b31, 0x9d9e8a] }, // https://lospec.com/palette-list/blackm0ld
  { name: 'PICO MICRO',       palette: [0x000000, 0x544e5e, 0x4d8ed9, 0x00d43b, 0xffe4d2, 0xffbb0d, 0xff3b7a, 0x913f33] }, // https://lospec.com/palette-list/pico-micro
  { name: 'PC 88',            palette: [0x0000db, 0x00b6db, 0x00db6d, 0xffb600, 0xff926d, 0xdb0000, 0xdbdbdb, 0x000000] }, // https://lospec.com/palette-list/pc-88
  { name: 'WEEN 8',           palette: [0x000000, 0x150050, 0x3f0071, 0x610094, 0x872717, 0xad460b, 0xe68014, 0xfff75a] }, // https://lospec.com/palette-list/ween-8
  { name: 'NATURAL COLOUR 8', palette: [0x252018, 0x006462, 0x67a387, 0xb9b9ac, 0xffffe3, 0xeddd3d, 0x916f51, 0x7b0304] }, // https://lospec.com/palette-list/natural-colour-system-8
  { name: 'HALLOWEEN CANDY',  palette: [0x001122, 0x221155, 0x771188, 0xcc2222, 0xcc8811, 0x44cc44, 0xddee55, 0xeeddff] }, // https://lospec.com/palette-list/halloween-candy
  { name: 'MELON TREE',       palette: [0x451c22, 0x61342b, 0x4b7332, 0x799e51, 0xf02259, 0xff5c7c, 0xf78fa5, 0xffdae7] }, // https://lospec.com/palette-list/melon-tree
  { name: 'FINAL 8',          palette: [0xffffff, 0xff8ad0, 0x9b5bb4, 0x413c74, 0x5183b9, 0x61d478, 0xffdc6d, 0xe67d4c] }, // https://lospec.com/palette-list/final-8
  { name: 'COMMODORE 8',      palette: [0x000000, 0x683f11, 0xb76954, 0xffffff, 0xbbdd86, 0x869d8d, 0x736788, 0x4e318d] }, // https://lospec.com/palette-list/commodore-8
  { name: 'COLORBLIND 8',     palette: [0x000000, 0x900030, 0x0030a3, 0x05a300, 0xd300ce, 0x4abeff, 0xffd217, 0xffffff] }, // https://lospec.com/palette-list/colorblind-8
  { name: 'ADVENTURE',        palette: [0x22211b, 0x3e4836, 0x5d6677, 0x778194, 0x514136, 0x725449, 0xce9513, 0xefc156] }, // https://lospec.com/palette-list/adventure
  { name: 'GOLDIBLOCKS',      palette: [0x662640, 0x8c3f5d, 0xba6156, 0xf2a65e, 0xffe478, 0xffeb9e, 0xfff5d3, 0xffffff] }, // https://lospec.com/palette-list/goldiblocks
  { name: 'LIBRA 8',          palette: [0x56465e, 0x8e3785, 0xc04394, 0xe7ae43, 0xcdcd74, 0x7ea881, 0xf1edd7, 0xffb587] }, // https://lospec.com/palette-list/libra-8
  { name: 'HAG',              palette: [0x10101f, 0x193a3b, 0x10634f, 0x51849c, 0xe5dcd3, 0xc7bf2a, 0x8a4d24, 0x92072e] }, // https://lospec.com/palette-list/hag
  { name: 'SCALED AND ICY',   palette: [0x3d3a39, 0xf8fefe, 0xdad7cc, 0xf9a4cb, 0x93d1de, 0xf6e518, 0xec7e15, 0x718dbc] }, // https://lospec.com/palette-list/scaled-and-icy
  { name: 'BATPALETTE',       palette: [0x000000, 0x7f7f7f, 0xffffff, 0x681e99, 0x3f48cc, 0x88ff82, 0xbfa621, 0xcc3d18] }, // https://lospec.com/palette-list/batpalette
];
