// see: https://github.com/vinibiavatti1/RayCastingTutorial/wiki/Basic-Introduction

const FIELD_OF_VIEW = 60;
const RAY_PRECISION = 256;
const gfxHalfHeight = GFX_H / 2;
let drawSimple = false;

const player = {
  x: 29.5,
  y: 50.5,
  angle: 0, // 0=r 90=d 180=l 270=u
  radius: 0.3,
  speed: { movement: 0.05, rotation: 3 },
  rays: [],
};

function romInit() {}

function romLoop() {
  updatePlayer();
  castRays();
  drawFirstPersonView();
  if (isPressed(BTN_A)) {
    drawLevelMapView();
  } else {
    drawRectangle(0, 58, 24, 6, COL_BLK, COL_BLK);
    drawText(`FPS:${getFps()}`, 0, 59, COL_WHT);
  }
  if (isJustPressed(BTN_B)) {
    drawSimple = !drawSimple;
  }
}

function updatePlayer() {
  const playerDir = getPlayerDir();
  if (isPressed(BTN_U)) {
    const newX = player.x + Math.cos(degreesToRadians(player.angle)) * player.speed.movement;
    const newY = player.y + Math.sin(degreesToRadians(player.angle)) * player.speed.movement;
    const collisionCheckX = newX + playerDir.x * player.radius;
    const collisionCheckY = newY + playerDir.y * player.radius;
    tryMovePlayer(newX, newY, collisionCheckX, collisionCheckY);
  }
  if (isPressed(BTN_D)) {
    const newX = player.x - Math.cos(degreesToRadians(player.angle)) * player.speed.movement;
    const newY = player.y - Math.sin(degreesToRadians(player.angle)) * player.speed.movement;
    const collisionCheckX = newX - playerDir.x * player.radius;
    const collisionCheckY = newY - playerDir.y * player.radius;
    tryMovePlayer(newX, newY, collisionCheckX, collisionCheckY);
  }
  if (isPressed(BTN_L)) {
    player.angle -= player.speed.rotation;
  }
  if (isPressed(BTN_R)) {
    player.angle += player.speed.rotation;
  }
  player.angle = mod(player.angle, 360);
}

function tryMovePlayer(newX, newY, collisionCheckX, collisionCheckY) {
  // note: imperfect collision detection (convex corners) but not a problem in practice
  if (level[Math.floor(player.y)][Math.floor(collisionCheckX)] != 2) {
    player.x = newX;
  }
  if (level[Math.floor(collisionCheckY)][Math.floor(player.x)] != 2) {
    player.y = newY;
  }
}

function castRays() {
  player.rays = [];
  let rayAngle = player.angle - FIELD_OF_VIEW / 2;
  for (let i = 0; i < GFX_W; i++) {
    const ray = { startX: player.x, startY: player.y, endX: player.x, endY: player.y, angle: rayAngle, visualObstruction: 0 };
    const rayCos = Math.cos(degreesToRadians(rayAngle)) / RAY_PRECISION;
    const raySin = Math.sin(degreesToRadians(rayAngle)) / RAY_PRECISION;
    while (ray.visualObstruction == 0) {
      ray.endX += rayCos;
      ray.endY += raySin;
      ray.visualObstruction = level[Math.floor(ray.endY)][Math.floor(ray.endX)];
    }
    player.rays.push(ray);
    rayAngle += FIELD_OF_VIEW / GFX_W;
  }
}

function drawFirstPersonView() {
  drawSky();
  drawGround();
  drawSurfaces();
}

function drawSky() {
  if (drawSimple) {
    drawRectangle(0, 0, GFX_W, gfxHalfHeight, COL_BLU, COL_BLU);
  } else {
    for (let y = 0; y < gfxHalfHeight; y++) {
      for (let x = 0; x < GFX_W; x++) {
        drawPixel(x, y, x % 2 == 0 && ((x % 4 == 0 && y % 2 == 0) || (x % 4 == 2 && y % 2 == 1)) ? COL_BLU : COL_BLK);
      }
    }
  }
}

function drawGround() {
  if (drawSimple) {
    drawRectangle(0, gfxHalfHeight, GFX_W, gfxHalfHeight, COL_GRN, COL_GRN);
  } else {
    for (let y = gfxHalfHeight; y < GFX_H; y++) {
      for (let x = 0; x < GFX_W; x++) {
        drawPixel(x, y, x % 2 == 0 && ((x % 4 == 0 && y % 2 == 0) || (x % 4 == 2 && y % 2 == 1)) ? COL_BLK : COL_GRN);
      }
    }
  }
}

function drawSurfaces() {
  for (let i = 0; i < player.rays.length; i++) {
    const ray = player.rays[i];
    let distance = Math.sqrt(Math.pow(ray.startX - ray.endX, 2) + Math.pow(ray.startY - ray.endY, 2)); // pythagoras theorem
    distance = distance * Math.cos(degreesToRadians(ray.angle - player.angle)); // fish eye fix
    const wallHeight = Math.floor(gfxHalfHeight / distance);
    const texture = textures[ray.visualObstruction];
    const texturePositionX = Math.floor(mod(texture.width * (ray.endX + ray.endY), texture.width)); // note: descending x values (when facing d/l) result in a horizontally flipped texture
    if (drawSimple) {
      drawLine(i, gfxHalfHeight - wallHeight, i, gfxHalfHeight + wallHeight, ray.visualObstruction);
    } else {
      drawTexture(i, wallHeight, texturePositionX, texture);
    }
  }
}

function drawLevelMapView() {
  clearGfx(COL_RED);
  const levelSize = [level.length, level[0].length];
  for (let y = 0; y < levelSize[0]; y++) {
    for (let x = 0; x < levelSize[1]; x++) {
      drawPixel(x, y, level[y][x]);
    }
  }
  const firstRay = player.rays[0];
  const lastRay = player.rays[player.rays.length - 1];
  drawLine(Math.floor(firstRay.startX), Math.floor(firstRay.startY), Math.floor(firstRay.endX), Math.floor(firstRay.endY), COL_YEL);
  drawLine(Math.floor(lastRay.startX), Math.floor(lastRay.startY), Math.floor(lastRay.endX), Math.floor(lastRay.endY), COL_MAG);
  drawPixel(Math.floor(player.x), Math.floor(player.y), COL_GRN);
}

function drawTexture(x, wallHeight, texturePositionX, texture) {
  const yIncrementer = wallHeight * 2 / texture.height;
  let y = gfxHalfHeight - wallHeight;
  for (let i = 0; i < texture.height; i++) {
    drawLine(x, y, x, Math.floor(y + yIncrementer), texture.bitmap[i][texturePositionX]);
    y += yIncrementer;
  }
}

const degreesToRadians = (degrees) => degrees * Math.PI / 180;

const mod = (n, m) => (n % m + m) % m; // mod function returns positive remainder

const getPlayerDir = () => player.angle < 90 ? { x: 1, y: 1} : player.angle < 180 ? { x: -1, y: 1} : player.angle < 270 ? { x: -1, y: -1} : { x: 1, y: -1};
