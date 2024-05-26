class Ship {
  constructor(x, y) {
    this.position = new Vec2(x, y);
    this.rotation = Math.PI * 1.5;
    this.velocity = new Vec2(0, 0);
    this.rotationSpeed = 0.075;
    this.acceleration = 0.05;
    this.momentum = 0.95;
    this.polygon = [
      { x: -2, y: -2 },
      { x:  3, y:  0 },
      { x: -2, y:  2 },
    ];
  }
  thrust() {
    const heading = new Vec2(Math.cos(this.rotation), Math.sin(this.rotation)); // normalized heading vector
    this.velocity.add(heading.x * this.acceleration, heading.y * this.acceleration);
  }
  turnLeft() {
    this.rotation = wrap(this.rotation - this.rotationSpeed, 0, Math.PI * 2);
  }
  turnRight() {
    this.rotation = wrap(this.rotation + this.rotationSpeed, 0, Math.PI * 2);
  }
  fire() {
    bullets.push(new Bullet(this.position.x + Math.cos(this.rotation) * 3, this.position.y + Math.sin(this.rotation) * 3, Math.cos(this.rotation) * 1.5, Math.sin(this.rotation) * 1.5));
  }
  teleport() {
    this.position.set(randomInt(0, GFX_W - 1), randomInt(0, GFX_H - 1));
  }
  update() {
    this.position.add(this.velocity.x, this.velocity.y);
    this.velocity.scl(this.momentum);
    this.position.x = wrap(this.position.x, 0, GFX_W);
    this.position.y = wrap(this.position.y, 0, GFX_H);
  }
}

class Bullet {
  constructor(x, y, xVelocity, yVelocity) {
    this.position = new Vec2(x, y);
    this.velocity = new Vec2(xVelocity, yVelocity);
    this.life = 30;
  }
  update() {
    this.position.add(this.velocity.x, this.velocity.y);
    this.position.x = wrap(this.position.x, 0, GFX_W);
    this.position.y = wrap(this.position.y, 0, GFX_H);
    this.life--;
  }
}

class Asteroid {
  constructor(x, y, vertices, rotationSpeed) {
    this.position = new Vec2(x, y);
    this.polygon = vertices;
    this.rotation = 0;
    this.rotationSpeed = rotationSpeed;
  }
  update() {
    this.rotation = wrap(this.rotation - this.rotationSpeed, 0, Math.PI * 2);
  }
}

let ship;
let bullets;
let asteroids;

function romInit() {
  ship = new Ship(GFX_W / 2, GFX_H / 2);
  bullets = [];
  asteroids = [];
  asteroids.push(buildAsteroid(12, 12, 'S'));
  asteroids.push(buildAsteroid(50, 12, 'M'));
  asteroids.push(buildAsteroid(12, 50, 'L'));
}

function romLoop() {
  handleInput();
  updateAsteroids();
  updateBullets();
  ship.update();
  clearGfx();
  drawAsteroids();
  drawBullets();
  drawShip();
}

function handleInput() {
  if (isPressed(BTN_U)) ship.thrust();
  if (isPressed(BTN_L)) ship.turnLeft();
  if (isPressed(BTN_R)) ship.turnRight();
  if (isJustPressed(BTN_A)) ship.fire();
  if (isJustPressed(BTN_B)) ship.teleport();
}

const drawAsteroids = () => asteroids.forEach((asteroid) => drawPolygon(roundPolygon(translatePolygon(rotatePolygon(asteroid.polygon, asteroid.rotation), asteroid.position.x, asteroid.position.y)), COL_MAG, COL_BLU));

const drawBullets = () => bullets.forEach((bullet) => drawPixel(bullet.position.x, bullet.position.y, COL_GRN));

const drawShip = () => drawPolygon(roundPolygon(translatePolygon(rotatePolygon(ship.polygon, ship.rotation), ship.position.x, ship.position.y)), COL_YEL, COL_YEL);

function updateAsteroids() {
  for (let i = asteroids.length - 1; i >= 0; --i) {
    asteroids[i].update();
  }
}

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; --i) {
    bullets[i].update();
    if (bullets[i].life <= 0) {
      bullets.splice(i, 1);
    }
  }
}

const buildAsteroid = (x, y, size) => {
  let vertexCount, minRadius, maxRadius;
  if (size == 'S') {
    vertexCount = 5;
    minRadius = 2;
    maxRadius = 3;
  }
  if (size == 'M') {
    vertexCount = 6;
    minRadius = 3;
    maxRadius = 5;
  }
  if (size == 'L') {
    vertexCount = 7;
    minRadius = 5;
    maxRadius = 8;
  }

  const vertices = [];
  const angleIncrement = (Math.PI * 2) / vertexCount;
  for (let i = 0; i < vertexCount; i++) {
    let angle = i * angleIncrement
    let radius = randomInt(minRadius, maxRadius);
    vertices.push({ x: Math.round(Math.cos(angle) * radius), y: Math.round(Math.sin(angle) * radius) });
  }

  const rand = Math.random();
  const rotationSpeed = rand > 0.5 ? (rand + 0.5) * -0.025 : (rand + 0.5) * 0.025;

  return new Asteroid(x, y, vertices, rotationSpeed);
}

const rotatePolygon = (polygon, angleRadians) => {
  return polygon.map(function(vertex) {
    return { x: Math.cos(angleRadians) * vertex.x - Math.sin(angleRadians) * vertex.y, y: Math.sin(angleRadians) * vertex.x + Math.cos(angleRadians) * vertex.y };
  });
}

const translatePolygon = (polygon, dx, dy) => {
  return polygon.map(function(vertex) {
    return { x: vertex.x + dx, y: vertex.y + dy };
  });
}

const roundPolygon = (polygon) => {
  return polygon.map(function(vertex) {
    return { x: Math.round(vertex.x), y: Math.round(vertex.y) };
  });
}
