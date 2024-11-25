const palette = [ 0x1b1c33, 0x2d93dd, 0xd32734, 0x7b53ad, 0x28c641, 0xda6658, 0xe6da29, 0xe2e2c9 ];
const colors = { black: 0, blue: 1, red: 2, purple: 3, green: 4, orange: 5, yellow: 6, white: 7 };

const imgExplosionLarge = imageFromHexString('2f2f2f666f2f2f2'); // 5x3
const imgExplosionSmall = imageFromHexString('2ff2f66f2ff2'); // 4x3
const imgInvaderA = imageFromHexString('f00f00000ff0'); // 4x3
const imgInvaderO = imageFromHexString('f00f0000f00f'); // 4x3
const imgInvaderT = imageFromHexString('0000f00ff00f'); // 4x3
const imgInvaderX = imageFromHexString('0000f00f0ff0'); // 4x3
const imgInvaderBlueT = swapImageColors(imgInvaderT, [0], [1]); // 4x3
const imgInvaderBlueX = swapImageColors(imgInvaderX, [0], [1]); // 4x3
const imgInvaderOrangeA = swapImageColors(imgInvaderA, [0], [5]); // 4x3
const imgInvaderOrangeO = swapImageColors(imgInvaderO, [0], [5]); // 4x3
const imgInvaderPurpleA = swapImageColors(imgInvaderA, [0], [3]); // 4x3
const imgInvaderPurpleO = swapImageColors(imgInvaderO, [0], [3]); // 4x3
const imgPlayer = imageFromHexString('ff4ff4444444444'); // 5x3
const imgUfo = imageFromHexString('f22222f2f2f2f2f22222f'); // 7x3
const imgLogo = imageFromB64String('////////IiIv/yIiIv/yIiL//yIiL/IiIiIv////////////8iIiIv8iIiIv8iIi//IiIi/yIiIiL/////////////JmZmIvZmZmL/ZmZv8iZmZv9mZmZm/////////////2ZmZmL2ZmZm/2Zmb/JmZmb/ZmZmb/////////////9mZmZm9mb2Zv9mZm/2ZmZm8mZv////////////////9mb2ZvZm9mb/ZmZv9mb2ZvJmYi////////////////ZmJmb2ZiZm/2b2b/Zm///2ZiIv///////////////2ZiIiL2YmZvJm9mL2ZvIv9mZmb////////////////2ZmZi9mZmbyZiZi9mbyLyZmZv/////////////////2ZmZvZmZm9mYmZvZmJm8mZv//////////////////8iJmb2Zmb/ZmZmb2ZiZvZmIi//////////////////ZiZm9mb//2ZmZm9mZmb2ZiIv/////////////////2ZmZv9m//9mb2ZvZmZm9mZmb//////////////////2Zmb/Zv//Zm9mb/Zmb/ZmZv////////8iLyIv8iLyIv8iL/IiL/8iIiL/8iIiIvIiIv//8iIvIiIiIvIi8iL/Ii/yIiL/IiIiL/IiIiLyIiIv/yIiImZiZmL2ZiZmL2Zv9mZi/2ZmZi8mZmZmJmZmL/ImZmJmZiZmJmYmZi9mYvZmZv9mZmZvJmZmbyZmZm8iZmZm9mYvZiJmb2ZiZmL2Zmb/Zm9mb2Zm//9mYmZvJmYmZv9mYmZiZmJmYvZm9mZmL2ZvZm9mYi/yZmJmYmZiZm//ZmImZmZi9mb2ZvZvZi9mb2ZvZmIv8mZmZvJmYi////ZmJmZmZiZmJmb2YmZvZm9mb2Zmb/ZmZm/2ZmZv////ZmJmZmYvZiZm9mJmb2ZvZmJmZv8mZmZvImZmb////2ZiZmJmb2ZmZvZmZm9mYmZiZiIvJmJmYiIiZm/////2ZiZmJmL2Zmb2ZmZvZmJm9mYiImZiZvJmJmb//////2YmZiZi9mZm9mb2b2ZmZvZmZmJm9mb2ZmZv//////9mb2ZvZv9mZvZm9m9mZm/2Zmb2ZvZm/2Zv////'); // 62x27

const sfxExplosionPlayer  = [320, 320, 40, 120, 20, 40, 20, 0, 0, 40, 20, 20, 80, 20, 40, 40, 40, 40, 40, 40, 0, 80, 40, 100, 20, 40];
const sfxUfo              = [840, 1140, 920, 180, 1180, 1240, 280, 980, 1140, 680, 200, 1260, 680, 360, 1000, 1180, 680, 700, 1260, 1080, 340, 1080, 1240, 200, 880, 1080, 880, 180, 1260, 1180, 340, 980, 1180, 260, 700, 1260, 1100, 400, 600];
const sfxExplosionInvader = [1580, 720, 1300, 280, 1020, 1640];
const sfxLaser            = [2541, 2581, 2581, 2501, 2561, 2481];
const sfxInvadersFastest  = [60, 0, 0, 60, 0, 0, 60, 0, 0, 100, 0, 0];
const sfxInvadersFast     = [60, 0, 0, 0, 0, 60, 0, 0, 0, 0, 60, 0, 0, 0, 0, 100, 0, 0, 0, 0];
const sfxInvadersSlow     = [60, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0];
const sfxInvadersSlowest  = [60, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0];

export { palette, colors, imgExplosionLarge, imgExplosionSmall, imgInvaderBlueT, imgInvaderBlueX, imgInvaderOrangeA, imgInvaderOrangeO, imgInvaderPurpleA, imgInvaderPurpleO, imgPlayer, imgUfo, imgLogo, sfxExplosionPlayer, sfxUfo, sfxExplosionInvader, sfxLaser, sfxInvadersFastest, sfxInvadersFast, sfxInvadersSlow, sfxInvadersSlowest }
