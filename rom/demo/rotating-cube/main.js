// based on https://drive.google.com/file/d/1JYGqFOyOmspxPdsfQe46a5yPqbbPM70z

//   y
//   |
//   *--x
//  /
// z

const centreX = GFX_W / 2;
const centreY = GFX_H / 2;
const centreZ = 0;
const size = GFX_H / 4;

const vertices = [
  { x: centreX - size, y: centreY - size, z: centreZ - size },
  { x: centreX + size, y: centreY - size, z: centreZ - size },
  { x: centreX + size, y: centreY + size, z: centreZ - size },
  { x: centreX - size, y: centreY + size, z: centreZ - size },
  { x: centreX - size, y: centreY - size, z: centreZ + size },
  { x: centreX + size, y: centreY - size, z: centreZ + size },
  { x: centreX + size, y: centreY + size, z: centreZ + size },
  { x: centreX - size, y: centreY + size, z: centreZ + size },
];

const edges = [
  [0, 1], [1, 2], [2, 3], [3, 0], // (RED) back face
  [4, 5], [5, 6], [6, 7], [7, 4], // (GRN) front face
  [0, 4], [1, 5], [2, 6], [3, 7]  // (BLU) connecting sides
];

const faces = [
  [0, 1, 2, 3], // (BLU) back
  [4, 5, 6, 7], // (RED) front
  [0, 4, 7, 3], // (MAG) left
  [1, 5, 6, 2], // (GRN) right
  [0, 1, 5, 4], // (CYN) top
  [2, 3, 7, 6], // (YEL) bottom
];

let speedX, speedY, speedZ;
let demoMode;
let ticks;

function romInit() {
  demoMode = true;
  ticks = 0;
}

function romLoop() {
  clearGfx();
  handleInput();
  rotateCube();
  drawCube();
}

function handleInput() {
  if (isPressed(BTN_U) || isPressed(BTN_D) || isPressed(BTN_L) || isPressed(BTN_R) || isPressed(BTN_A) || isPressed(BTN_B)) {
    demoMode = false;
  }

  if (demoMode) {
    speedX = speedY = speedZ = 0.005;
    return;
  }

  if (isPressed(BTN_U)) {
    speedX = 0.005;
  } else if (isPressed(BTN_D)) {
    speedX = -0.005;
  } else {
    speedX = 0;
  }

  if (isPressed(BTN_L)) {
    speedY = -0.005;
  } else if (isPressed(BTN_R)) {
    speedY = 0.005;
  } else {
    speedY = 0;
  }

  if (isPressed(BTN_A)) {
    speedZ = -0.005;
  } else if (isPressed(BTN_B)) {
    speedZ = 0.005;
  } else {
    speedZ = 0;
  }
}

function rotateCube() {
  let angleX = speedX * Math.PI * 2;
  for (const v of vertices) {
    let dy = v.y - centreY;
    let dz = v.z - centreZ;
    let y = dy * Math.cos(angleX) - dz * Math.sin(angleX);
    let z = dy * Math.sin(angleX) + dz * Math.cos(angleX);
    v.y = y + centreY;
    v.z = z + centreZ;
  }
  let angleY = speedY * Math.PI * 2;
  for (const v of vertices) {
    let dx = v.x - centreX;
    let dz = v.z - centreZ;
    let x = dz * Math.sin(angleY) + dx * Math.cos(angleY);
    let z = dz * Math.cos(angleY) - dx * Math.sin(angleY);
    v.x = x + centreX;
    v.z = z + centreZ;
  }
  let angleZ = speedZ * Math.PI * 2;
  for (const v of vertices) {
    let dx = v.x - centreX;
    let dy = v.y - centreY;
    let x = dx * Math.cos(angleZ) - dy * Math.sin(angleZ);
    let y = dx * Math.sin(angleZ) + dy * Math.cos(angleZ);
    v.x = x + centreX;
    v.y = y + centreY;
  }
}

function drawCube() {
  ticks++;
  ticks < 300 ? drawCubeFaces() : drawCubeEdges();
  if (ticks == 600) {
    ticks = 0;
  }
}

function drawCubeEdges() {
  for (let i = 0; i < edges.length; i++) {
    const v0 = vertices[edges[i][0]];
    const v1 = vertices[edges[i][1]];
    drawLine(Math.round(v0.x), Math.round(v0.y), Math.round(v1.x), Math.round(v1.y), i < 4 ? COL_RED : i < 8 ? COL_GRN : COL_BLU);
  }
}

function drawCubeFaces() {
  const averageFaceDepths = faces.map(face => { // calculate average depth for each face
    const faceVertices = face.map(index => vertices[index]);
    const sumDepth = faceVertices.reduce((sum, vertex) => sum + vertex.z, 0);
    return sumDepth / faceVertices.length;
  });
  const depthSortedFaceIndices = averageFaceDepths.map((_depth, index) => index).sort((a, b) => averageFaceDepths[b] - averageFaceDepths[a]);
  for (let i = 0; i < 3; i++) { // draw nearest three faces
    const faceIndex = depthSortedFaceIndices[i];
    const faceVertices = faces[faceIndex].map(index => vertices[index]);
    const faceColor = faceIndex + 1;
    const v0 = { x: Math.round(faceVertices[0].x), y: Math.round(faceVertices[0].y) };
    const v1 = { x: Math.round(faceVertices[1].x), y: Math.round(faceVertices[1].y) };
    const v2 = { x: Math.round(faceVertices[2].x), y: Math.round(faceVertices[2].y) };
    const v3 = { x: Math.round(faceVertices[3].x), y: Math.round(faceVertices[3].y) };
    drawPolygon([v0, v1, v2, v3], faceColor, faceColor);
  }
}
