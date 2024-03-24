let defaultMode;
let vertexCount;
let polygon;
let edgeColor;
let fillColor;

function romInit() {
  defaultMode = true;
  vertexCount = 6;
}

function romLoop() {
  if ((isJustPressed(BTN_U) || isJustPressed(BTN_R)) && vertexCount < 9) {
    vertexCount++;
  }
  if ((isJustPressed(BTN_D) || isJustPressed(BTN_L)) && vertexCount > 3) {
    vertexCount--;
  }
  if (isJustPressed(BTN_A)) {
    defaultMode = false;
    polygon = roundPolygon(translatePolygon(generatePolygon(vertexCount, 10, 30), 32, 32));
    edgeColor = randomInt(1, 6);
    fillColor = randomInt(1, 6);
  }
  if (isJustPressed(BTN_B)) {
    defaultMode = true;
  }

  clearGfx();
  if (defaultMode) {
    drawPolygon([{ x: 15, y:  1 }, { x: 30, y: 11 }, { x: 24, y: 29 }, { x:  6, y: 29 }, { x:  0, y: 11 }], COL_GRN);
    drawPolygon([{ x: 48, y:  1 }, { x: 63, y: 11 }, { x: 57, y: 29 }, { x: 39, y: 29 }, { x: 33, y: 11 }], COL_RED, COL_BLU);
    drawPolygon([{ x:  0, y: 33 }, { x: 12, y: 61 }, { x: 20, y: 48 }, { x: 25, y: 58 }, { x: 30, y: 39 }], COL_YEL);
    drawPolygon([{ x: 33, y: 33 }, { x: 45, y: 61 }, { x: 53, y: 48 }, { x: 58, y: 58 }, { x: 63, y: 39 }], COL_MAG, COL_CYN);
  } else {
    drawPolygon(polygon, edgeColor, fillColor);
  }
}

const generatePolygon = (vertexCount, minRadius, maxRadius) => {
  const vertices = [];
  const angleIncrement = (Math.PI * 2) / vertexCount;
  for (let i = 0; i < vertexCount; i++) {
    let angle = i * angleIncrement
    let radius = randomInt(minRadius, maxRadius);
    vertices.push({ x: Math.round(Math.cos(angle) * radius), y: Math.round(Math.sin(angle) * radius) });
  }
  return vertices;
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
