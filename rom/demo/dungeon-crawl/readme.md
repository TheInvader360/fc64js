# Dungeon Crawl (fc64js demo rom)

[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/dungeon-crawl/docs/demo.gif" width="256"/>](https://theinvader360.github.io/fc64js/rom/demo/dungeon-crawl/)

[Play in browser](https://theinvader360.github.io/fc64js/rom/demo/dungeon-crawl/)

## Overview

First person grid based dungeon crawler demo for the [fc64js](https://github.com/TheInvader360/fc64js) fantasy console

Reminiscent of classic games like [3D Monster Maze](https://en.wikipedia.org/wiki/3D_Monster_Maze), [Dungeon Master](https://en.wikipedia.org/wiki/Dungeon_Master_(video_game)), and [Eye of the Beholder](https://en.wikipedia.org/wiki/Eye_of_the_Beholder_(video_game))

The player rotates at a fixed 90 degrees (press L/R), and movement is limited to full grid cell steps forwards or backwards (press U/D)

The first person view is composed of a number of overlaid images (or more accurately - overlaid rectangles and lines), each one corresponding to a cell in the level grid within the player's field of view:

![tile-images](docs/tile-images.gif)

When these images are drawn over each other (and a static background), in the correct order, a first person view is formed:

![draw-order](docs/draw-order.gif)

The first person view uses 43x43 of the 64x64 available pixels - this leaves room for the addition of other potential ui elements (compass, status information, minimap, etc)

The level map view (press A/B to toggle) has been kept intentionally simple as it's not the focus of the demo. Any further development would benefit from a scrolling viewport and support for variable level sizes

Views are only refreshed if the model is likely to have changed - an unnecessary optimization these days but trivial to implement

## Credits

* Code by TheInvader360
* [Palette](https://lospec.com/palette-list/paper-8) by Frosty Rabbid
