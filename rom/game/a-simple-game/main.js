// inspired by https://libgdx.com/wiki/start/a-simple-game

const imgBucket = [
  -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,
   0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
   0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  -1, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0,-1,
  -1, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0,-1,
  -1,-1, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0,-1,-1,
  -1,-1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0,-1,-1,
  -1,-1,-1, 0, 2, 2, 2, 2, 2, 2, 0,-1,-1,-1,
  -1,-1,-1, 0, 2, 2, 2, 2, 2, 2, 0,-1,-1,-1,
  -1,-1,-1,-1, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,
];

const imgDrop = [
  -1,-1, 5,-1,-1,
  -1,-1, 5,-1,-1,
  -1, 5, 5, 5,-1,
  -1, 5, 5, 5,-1,
   5, 5, 5, 5, 5,
   5, 5, 5, 5, 5,
   5, 5, 5, 5, 5,
  -1, 5, 5, 5,-1,
  -1,-1, 5,-1,-1,
];

let bucket;
let drops = [];
let score = 0;
let ticks = 0;

function romInit() {
  // create a rectangle to logically represent the bucket, centered horizontally, a pixel above the bottom screen edge, 14 pixels wide and 10 pixels high
  bucket = new Rect(GFX_W / 2 - 14 / 2, GFX_H - 11, 14, 10);
  // spawn the first drop
  spawnDrop();
}

function romLoop() {
  // increment the tick counter
  ticks++;

  // clear the screen with blue to represent the sky
  clearGfx(COL_BLU);

  // draw a filled green rectangle to represent the ground
  drawRectangle(0, GFX_H - 8, GFX_W, 8, COL_GRN, COL_GRN);

  // draw the bucket
  drawImage(Math.round(bucket.x), bucket.y, bucket.width, bucket.height, imgBucket);

  // draw all the drops
  drops.forEach(d => {
    drawImage(d.x, Math.round(d.y), d.width, d.height, imgDrop);
  });

  // draw the current score
  drawText(1, 1, `${score}`, COL_YEL);

  // draw the current frames per second
  drawText(1, GFX_H - 6, `FPS:${getFps()}`, COL_WHT);

  // process user input
  if (isPressed(BTN_L)) {
    bucket.x -= 40 * 1/60;
  }
  if (isPressed(BTN_R)) {
    bucket.x += 40 * 1/60;
  }

  // make sure the bucket stays within screen bounds
  if (bucket.x < 0) {
    bucket.x = 0;
  }
  if (bucket.x > GFX_W - bucket.width) {
    bucket.x = GFX_W - bucket.width;
  }

  // create a new raindrop if it's time
  if (ticks > 60) {
    ticks = 0;
    spawnDrop();
  }

  // for each drop...
  for (let i = drops.length - 1; i >= 0; i--) {
    // move down
    drops[i].y += 50 * 1/60;
    // remove any that touch the ground, play a fail sound, and decrement score
    if (drops[i].y + drops[i].height > GFX_H - 8) {
      drops.splice(i, 1);
      beep(200, 10, true);
      score--;
    }
    // remove any caught by the bucket, play a success sound, and increment score
    // note: collision check could be improved, decided to leave unchanged for simplicity and to closely match https://libgdx.com/wiki/start/a-simple-game
    if (drops[i].overlaps(bucket)) {
      drops.splice(i, 1);
      beep(400, 5, true);
      score++;
    }
  }
}

function spawnDrop() {
  // create a new drop one pixel into the top screen edge and at a random horizontal position within screen bounds
  drops.push(new Rect(randomInt(0, GFX_W - 5), -8, 5, 9));
}
