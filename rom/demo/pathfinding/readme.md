# Pathfinding (fc64js demo rom)

[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/pathfinding/docs/demo.gif" width="256"/>](https://theinvader360.github.io/fc64js/rom/demo/pathfinding/)

[Play in browser](https://theinvader360.github.io/fc64js/rom/demo/pathfinding/)

## Overview

Pathfinding demo for the [fc64js](https://github.com/TheInvader360/fc64js) fantasy console

Randomly generates a tile based level then calculates a path from the start tile to the exit tile using the A* pathfinding algorithm

* Press A to generate (and solve) a new level
* Press B to block a random traversable tile (and then re-solve)
* Press U to reveal the path (i.e. an efficient traversable route between the start and exit tiles)... Or report that the level is unsolvable!
* Press L to reveal the open set of tiles (i.e. all the unevaluated grid points)
* Press R to reveal the closed set of tiles (i.e. all the completely evaluated grid points)

## Credits

* Code by TheInvader360
* Based on [this](https://dev.to/codesphere/pathfinding-with-javascript-the-a-algorithm-3jlb) article
* Borrows level generation code from the [dungeon-generator](https://github.com/TheInvader360/fc64js/tree/main/rom/demo/dungeon-generator) demo
