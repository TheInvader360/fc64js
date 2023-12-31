// see: https://dev.to/codesphere/pathfinding-with-javascript-the-a-algorithm-3jlb

class GridPoint {
  constructor(x, y, gridCols, gridRows) {
    this.x = x; // x grid location of the point
    this.y = y; // y grid location of the point
    this.f = 0; // total cost function
    this.g = 0; // cost function from start to the current grid point
    this.h = 0; // heuristic estimated cost function from current grid point to the goal
    this.neighbors = []; // neighbors of the current grid point
    this.parent = undefined; // immediate source of the current grid point
    this.updateNeighbors = function (gridPoints) {
      let i = this.x;
      let j = this.y;
      if (i < gridCols - 1) {
        this.neighbors.push(gridPoints[i + 1][j]);
      }
      if (i > 0) {
        this.neighbors.push(gridPoints[i - 1][j]);
      }
      if (j < gridRows - 1) {
        this.neighbors.push(gridPoints[i][j + 1]);
      }
      if (j > 0) {
        this.neighbors.push(gridPoints[i][j - 1]);
      }
    };
  }
}

function aStarSolve(grid, start, goal) {
  const openSet = []; // array containing unevaluated grid points
  const closedSet = []; // array containing completely evaluated grid points
  const path = [];
  const end = grid.points[goal.x][goal.y];
  openSet.push(grid.points[start.x][start.y]);
  while (openSet.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    let current = openSet[lowestIndex];
    if (current === end) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      path.reverse(); // path from start to goal
      break;
    }
    openSet.splice(lowestIndex, 1); // remove current from openSet
    closedSet.push(current); // add current to closedSet
    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!closedSet.includes(neighbor)) {
        let possibleG = current.g + 1;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (possibleG >= neighbor.g) {
          continue;
        }
        neighbor.g = possibleG;
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;
      }
    }
  }
  return { open: openSet, closed: closedSet, path: path };
}

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // manhattan distance
}
