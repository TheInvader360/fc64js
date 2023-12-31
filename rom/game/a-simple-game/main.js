// See: https://libgdx.com/wiki/start/a-simple-game (ported from java/libgdx to javascript/fc64js)

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  overlaps(rect) {
    return this.x < rect.x + rect.w && this.x + this.w > rect.x && this.y < rect.y + rect.h && this.y + this.h > rect.y;
  }
}

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
  bucket = new Rectangle(GFX_W / 2 - 14 / 2, GFX_H - 11, 14, 10);
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
  drawImage(Math.round(bucket.x), bucket.y, bucket.w, bucket.h, imgBucket);

  // draw all the drops
  drops.forEach(d => {
    drawImage(d.x, Math.round(d.y), d.w, d.h, imgDrop);
  });

  // draw the current score
  drawText(`${score}`, 1, 1, COL_YEL);

  // draw the current frames per second
  drawText(`FPS:${getFps()}`, 1, GFX_H - 6, COL_WHT);

  // process user input
  if (isPressed(BTN_L)) {
    bucket.x -= 20 * 1/60;
  }
  if (isPressed(BTN_R)) {
    bucket.x += 20 * 1/60;
  }

  // make sure the bucket stays within screen bounds
  if (bucket.x < 0) {
    bucket.x = 0;
  }
  if (bucket.x > GFX_W - bucket.w) {
    bucket.x = GFX_W - bucket.w;
  }

  // create a new raindrop if it's time
  if (ticks > 60) {
    ticks = 0;
    spawnDrop();
  }

  // for each drop...
  drops.forEach((d) => {
    // move down
    d.y += 20 * 1/60;
    // remove any that touch the ground, play a fail sound, and decrement score
    if (d.y + d.h > GFX_H - 8) {
      drops.shift();
      beep(200, 10, true);
      score--;
    }
    // remove any caught by the bucket, play a success sound, and increment score
    if (d.overlaps(bucket)) {
      drops.shift();
      beep(400, 5, true);
      score++;
    }
  });
}

function spawnDrop() {
  // create a new drop one pixel into the top screen edge and at a random horizontal position within screen bounds
  drops.push(new Rectangle(randomInt(0, GFX_W - 5), -8, 5, 9));
}

/*
Note:
Collisions between the bucket and drops could be much improved
Adding something like this to the existing overlap check would be better: d.y + d.h - 3 < bucket.y && d.x + d.w / 2 > bucket.x && d.x + d.w / 2 < bucket.x + bucket.w
Introducing smaller rectangles to each entity for collision purposes (i.e. a smaller hit box than drawn area) could also work well
Decided to leave things unchanged to keep things simple and to more faithfully replicate the original example found here https://libgdx.com/wiki/start/a-simple-game
*/
