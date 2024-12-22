// world units to pixels ratio: 1wu = 16px
// coordinate system (world and screen): origin (0,0) in top left corner

import '../../../lib/fc64.js';

fc64Init(romInit, romLoop, [0x000000, 0x606060, 0xA8A8A8, 0xF8F8F8, 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00]);

const colors = { black: 0, dark: 1, light: 2, white: 3, red: 4, green: 5, blue: 6, yellow: 7 }; // red/green/blue/yellow for debug use only
const directions = { up: 0, down: 1, left: 2, right: 3 };

const tileImages = new Map([
  [ 1, imageFromB64String('IiIiIiIiIiIjMzMzMzMzMyMRERERERERIxAAAAAAAAAjEAIiIiIiIiMQICIiIiIiIxAiAiIiIiIjECIgIiIiIiMQIiIAAAAAIxAiIgAiIiIjECIiAgERESMQIiICEBERIxAiIgIRAAAjECIiAhEAESMQIiICEQEAIxAiIgIRAQA')],
  [ 2, imageFromB64String('IiIiIiIiIiIzMzMzMzMzMxERERERERERAAAAAAAAAAAiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAIiIgIiIiICIRERAREREQEREREBERERARAAAAAAAAAAAQEREREBEREQAAAAAAAAAAAAAAAAAAAAA')],
  [ 3, imageFromB64String('AAAAAAAAAAADMzMzMzMzMAMzMzMzMzMwAzMzMzMzMzADMzMzMzMzMAAAAAAAAAAAAzMzMzMzMzACAAAAAAAAIAICIiIiIiAgAgIiIAIiICACAiIjMiIgIAIAAAAAAAAgAgIiIiIiICACAiIgAiIgIAICIiMyIiAgAgAAAAAAACA')],
  [ 4, imageFromB64String('IiIiIiIiIiIzMzMzMzMzMhEREREREREyAAAAAAAAATIiIiIiIiABMiIiIiIiAgEyIiIiIiAiATIiIiIiAiIBMgAAAAAiIgEyIiIiACIiATIRERAgIiIBMhERASAiIgEyAAARICIiATIRABEgIiIBMgAQESAiIgEyABARICIiATI')],
  [ 5, imageFromB64String('IxAiIgIRAQAjECIiAhEBACMQIiICEQEAIxAiIgAAAQAjECIiAhEBACMQIiICEQEAIxAiIgIRAAAjECIiAhEBACMQIiICEQEAIxAiIgIRAQAjECIiAhEBACMQIiIAAAEAIxAiIgIRAQAjECIiAhEBACMQIiICEQAAIxAiIgIRAQA')],
  [ 6, imageFromB64String('IjIiMiIjIiIiMzMyIiIyIjIyIjIiIjMzIyIiIyIiMiIjIiIjMzMyIiMyIjIiMiMiMiMzIiIyIjMiIiMiIjIiIyIiIjIiMiIjMiIjIzMzIiMjIjIiMiIzMiIzIiIyIiMiIiMiIjIiIyIiMzIjMyIjMjMiIzIiMzIjIyIiMiIjIiI')],
  [ 7, imageFromB64String('MzMzMzMzMzMzMzMzMzMzMzIjMzMzMzMzMzMzMzMzMzMzMzMzIiMzMzMzMzMzMzMzMzMzMzMzMzMiIiIiIiIiIjMiIzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMyIzMzMzMzMzMzMzMzMzMzMzMzMzMzIiMzMzIiIiIiIiIiI')],
  [ 8, imageFromB64String('AgIiIiIiICACAiIgAiIgIAICIiMyIiAgAgAAAAAAACACAiIiIiIgIAICIiACIiAgAgIiIzIiICACAAAAAAAAIDMiIzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMyIzMzMzMzMzMzMzMzMzMzMzMzMzMzIiMzMzIiIiIiIiIiI')],
  [ 9, imageFromB64String('MAAAAAAAAAMCIiIiIiIiIAEgIiIiIgIQAiIiIiIiIiABEREREREREAIiIiIiIiIgASAiIiIiAhACIiIiIiIiIAEREREREREQAiIiIiIiIiABICIiIiICEAIiIiIiIiIgAAAAAAAAAAABEBEBEBEBEAEQEQEQEQEQMAAAAAAAAAM')],
  [10, imageFromB64String('ABARICIiATIAEBEgIiIBMgAQESAiIgEyABAAACIiATIAEBEgIiIBMgAQESAiIgEyAAARICIiATIAEBEgIiIBMgAQESAiIgEyABARICIiATIAEBEgIiIBMgAQAAAiIgEyABARICIiATIAEBEgIiIBMgAAESAiIgEyABARICIiATI')],
  [11, imageFromB64String('MzMzMzMzMzMyAAAAAAAAIzACERERERADMCEREREREQMwIRAAAAERAzAAAzMzMAADMDMDIiIwMwMwAAAAAAAAAwIzMzMzMzMgAjMzMzMzMyACIiIjMzMyIAIjMzMzMzMgAjMzMzMzMyACMzMzMzMzIAIzMzMzMzMgAjMzMzMzMyA')],
  [12, imageFromB64String('AjMzMzMzMyACMzMzMzMzIAIiIiMzMzIgAiMzMzMzMyACMzMzMzMzIAIzMzMzMzMgAjMzMzMzMyACMzMzMzMzIAIjMzMzMzIgAiIiIiIiIiABIiIiIiIiEAAAAAAAAAAAIBEREREREQIhAAAAAAAAEzMzMzMzMzMzIiIiIiIiIiI')],
  [13, imageFromB64String('MzMzMzMzMzMzMAADMAADMzMCIiACIiAzMCIhEiIRIgMwIhIRESISAzECEiIiIhIDMQISEAEhIAMwIhIiIiEgEzAhIhERIhIDMCEREiIRIgMwAiIgACIgAzAQAAERAAEDMBEREREREQMyAREQABEQIzMgAAIyAAIzMzMzMzMzMzM')],
  [14, imageFromB64String('MzAAAAAAAAAzAiIiIiIiIjAiIiIiIiIiMCIiIiIiIiIwIiIiIiIiIjAiIiIiIiIiMCIiIiIiIiIwIiIiIiIiIjAiIiIiIiIiMDIiIiIiIiIwIyIiIiIiIjASMzMzMzMzMwEREREREREzAAAAAAAAADMBIhARERERMyAAAiIiIiI')],
  [15, imageFromB64String('AAAAAAAAAzMiIiIiIiIgMyIiIiIiIiIDIiIiIiIiIgMiIiIiIiIiAyIiIiIiIiIDIiIiIiIiIgMiIiIiIiIiAyIiIiIiIiIDIiIiIiIiIwMiIiIiIiIyAzMzMzMzMyEDEREREREREDMAAAAAAAAAMxEREREBIhAzIiIiIiAAAjM')],
  [16, imageFromB64String('MzMzAAAzMzMzMwAiIgAzMzMwIiIiIgMzMzAiEREiAzMzAiEAABIgMzACIAAAAiADMAIgAAACIAMwICIAACICAzAgEiIiIQIDMBIAIzIAIQMwEiIAACIhAzASEiIiISEDMwERIzIREDMzAREiIhEQMzMwARIhEAMzMzMwAAADMzM')],
  [17, imageFromB64String('IxAiIgIRAQAjECIiAhEBACMQIiICEQARIxAiIgIRAAAjECIiAhARESMQIiICARERIxAiIgAiIiIjECIiAAAAACMQIiAiIiIiIxAiAiIiIiIjECAiIiIiIiMQAiIiIiIiIxAAAAAAAAAjERERERERESMzMzMzMzMzIiIiIiIiIiI')],
  [18, imageFromB64String('AAAAAAAAAAAAAAAAAAAAABAREREQERERAAAAAAAAAAARERAREREQEREREBERERARIiIgIiIiICIAAAAAAAAAACIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiAAAAAAAAAAARERERERERETMzMzMzMzMzIiIiIiIiIiI')],
  [19, imageFromB64String('ABARICIiATIAEBEgIiIBMhEAESAiIgEyAAARICIiATIREQEgIiIBMhERECAiIgEyIiIiACIiATIAAAAAIiIBMiIiIiICIgEyIiIiIiAiATIiIiIiIgIBMiIiIiIiIAEyAAAAAAAAATIRERERERERMjMzMzMzMzMyIiIiIiIiIiI')],
  [20, imageFromB64String('AAAAAjMzMzMBEiIwMzMzMwESIjAzMzMzASEjMDMzMzMBISMwMzMzMwESIzAzMzMzARIiMDMzMzMBEiIwMzMzMwERIzAzMzMzASEjMDMzMzMBISMwMzMzMwEAADAzMzMzADMzADMzMzMDMRMwMzMzMwMTMTAzMzMzAxMxMDMzMzM')],
  [21, imageFromB64String('MzMzMyAAAAAzMzMzAyIhEDMzMzMDIiEQMzMzMwMyEhAzMzMzAzISEDMzMzMDMiEQMzMzMwMiIRAzMzMzAyIhEDMzMzMDMhEQMzMzMwMyEhAzMzMzAzISEDMzMzMDAAAQMzMzMwAzMwAzMzMzAzETMDMzMzMDEzEwMzMzMwMTMTA')],
  [22, imageFromB64String('MzMzMgAAAAAzMzIAEiIiIjMzABIiIiMzMzASIiEiMzMzASIiESIzMzIBIiERIiMzMBIiEREiIiIgEiIRERIiIgESIhERERIiARIiIREREREBEiIiEREREQESIiIiERERAREiIiIiEREBESIiIiIhEQERESIiIiIiARERESIiIiI')],
  [23, imageFromB64String('AAAAACMzMzMiIRERACMzMyIiESIRADMzMiIhEiIRAzMyIiERIiEQMyIiIRESIRAjIiIhERIiEQMiIhEREiIRAiIhERESIhEQERERESIiERARERESIiIREBEREiIiIhEQEREiIiIiERAREiIiIiERECIiIiIiEREQIiIiIhERERA')],
  [24, imageFromB64String('AREREREiIiIgERERERIiIiARERERERIiAgERERERERECIBEREREREQEiABERERERIAERAAABEREiIAAiIhARETIiAzIiIgERMiAzMiIiIAAzAjMiIQIjMzMCMiIQACMzMwIiEAEQEjMzIAABERECIjMzMiIhERAiMzMzMzMiIgA')],
  [25, imageFromB64String('IiIiERERERAiIiERERERAiIiERERERECERERERERECARERERERECIBERERERACIQEREQAAAREAIREQEiIgACIhEQIiIzICIjAAIiIjMyAiMiIiASIzMgMyIiAAEiMyAzIiEBEAEiIDMiIBEREAACMyIBERIiMzMzACIiMzMzMzM')],
  [26, imageFromB64String('MzMzMzMzMzMzMjMzMzMzMzIyMjMzMzMzMyMjMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMyMzMzMzMzMjIyMzMzMzMzIyMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM')],
  [27, imageFromB64String('MzMzMzMzMzMzMzMzMzMzMzMwAzMzMAMzMwMwMzMDMDMwMiMDMDIjAzAyIwMwMiMDMBMwAzATMAMwMQEDMDEBAzAxIQMwMSEDMDEhAzAxIQMwMyEDMDMhAzAxIQMwMSEDMCEhAzAhIQMwISEDMCEhAzMAADMzAAAzMzMzMzMzMzM')],
  [28, imageFromB64String('IjMyIyIzMiMyIzIzMiMyMzIiMzMyIjMzMyIzMjMiMzIzIjMiMyIzIjMiMiIzIjIiMzIyIzMyMiMzMjIjMzIyIyIzMiMiMzIjMiMyMzIjMjMyIjMzMiIzMzMiMzIzIjMyMyIzIjMiMyIzIjIiMyIyIjMyMiMzMjIjMzIyIzMyMiM')],
  [29, imageFromB64String('MiIiIzIiIiMiIiIiIiIiIiIiEiIiIhIiIiIiIiIiIiIhIiIiISIiIiIiIyIiIiMiIiIiIiIiIiIyIiIjMiIiIzIiIiMyIiIjIiIiIiIiIiIiIhIiIiISIiIiIiIiIiIiISIiIiEiIiIiIiMiIiIjIiIiIiIiIiIiMiIiIzIiIiM')],
  [30, imageFromB64String('IQAAEiEAABIQEiEBEBIhAQEjMhABIzIQASMyEAEjMhABIzIQASMyEAEjMhABIzIQASMiEAEjIhABIzIQASMyEAEjMhABIzIQASMyEAEjMhABIzIQASMyEAEiIhABIiIQARIhEAESIRABEREQAREREBAREQEQEREBIQAAEiEAABI')],
  [31, imageFromB64String('AAAAAAAAAAABEREREREREAMzMzMzMzMwAiIiIiIiIiAAAAAAAAAAAAEQIAAAAgEQAiAgAAACAiACICAAAAICIAIgIAAAAgIgAiAjMzMyAiABEAAAAAACEAESIiIzIiIQAiIRIjMhEiACIhEiIiESIAAAAAAAAAAAIiIiIiIiIiI')],
  [32, imageFromB64String('AAAAAAAAAAAzMzMzMzMzMzMzMzMzMzMzIiIiIiIiIiIiERERERERIiIQAAAAAAEiAAAAAAAAAAAREAAAAAABESIQAAAAAAIhIhAAAAAAAiEiEAAAAAACISIQAAAAAAIhIhAAAAAAAiEiEAAAAAACISIQAAAAAAIhAAAAAAAAAAA')],
]);

const playerWalkU0Image = imageFromB64String('////AA////////AAAP//////8DMzD/////ADAAAwD///AwAjMgAw//8DAiMyIDD//wMCAjIgMP//AgAiMiAg///wACIiAA////AgIiAgIP//AyAiAiAg//8DAgAiMgD///AjMzMiD///8AIiIgAP///wAAAAMwD///8AAAAAD/8');
const playerWalkU1Image = imageFromB64String('////8AD///////8AAA//////8DMzD/////ADAAAwD///AwAjMgAw//8DAiMyIDD//wMCIyAgMP//AgIjIgAg///wACIiAA///wICAiICD///AgIgIgIw//8AIyIAIDD///AiMzMyD///8AAiIiAP//8AMwAAAA////AAAAAA//8');
const playerWalkD0Image = imageFromB64String('////AAAP//////AiMyD////wAiIAIA///wMCMzMAMP//AwMAADAw//8DAAAAADD//wIgAAACIP//8DMDMDMP///wIwMwMg///wICMzMgIP//AgAAAAAjD/8CMwIiIAMP//AzAzMyAP///wAiIAAP///wAAADMgD///8AAAAAD/8');
const playerWalkD1Image = imageFromB64String('///wAAD//////wIzIg/////wAgAiIA///wMAMzMgMP//AwMAADAw//8DAAAAADD//wIgAAACIP//8DMDMDMP///wIwMwMg///wICMzMgIP/wMgAAAAAg//AwAiIgMyD//wAjMzAzD///8AACIgD///8AIzAAAA////AAAAAA//8');
const playerWalkL0Image = imageFromB64String('////AAAP/////wAjIiD////wMwIzIg//8AAjMCICIP//AAIzADAiD///AAICMCIP/wAwMAMwIP//AzAzAzAP///wIzMDIP////8CIgIA/////wAAACD/////AgMwIg////8DAzAiD////wIAAAAP////AAMzMP////AAAAAAD/8');
const playerWalkL1Image = imageFromB64String('//////////////8AAAD///8PACMyIgD//wAzAiMyIg//ACMwIgIiD//wAjMAMCIP//8AAgIwIP//ADAwAzAg//8DMDMDMA////AjMwMg/////wAAAAD/////8DMCIA/////wMwIgMP///wAAIgAw///wMzMAAzD///AAAAAAAA8');
const playerWalkR0Image = imageFromB64String('///wAAD//////wIiMgD////wIjMgMw///wIgIgMyAA/wIgMAMyAA//AiAyAgAP///wIDMAMDAP//8AMwMwMw////AjAzMg////8AICIg/////wIAAAD////wIgMwIP////AiAzAw////8AAAACD/////AzMwAP////AAAAAAD/8');
const playerWalkR1Image = imageFromB64String('/////////////wAAAP////8AIiMyAPD/8CIjMiAzAP/wIiAiAzIA//AiAwAzIA///wIDICAA////AgMwAwMA///wAzAzAzD///8CMDMyD////wAAAAD////wAiAzD////wMCIDMP////AwAiAAD///8DMAAzMw//8AAAAAAAD/8');
const playerAnimations = new Map([
  [directions.up,    new Anim([playerWalkU0Image, playerWalkU1Image], 10, true)],
  [directions.down,  new Anim([playerWalkD0Image, playerWalkD1Image], 10, true)],
  [directions.left,  new Anim([playerWalkL0Image, playerWalkL1Image], 10, true)],
  [directions.right, new Anim([playerWalkR0Image, playerWalkR1Image], 10, true)],
]);

const levelData = new Map([
  ['inside', { 
    tilemap: [
      [ 1, 2, 2, 2, 2, 2, 2, 3, 2, 4],
      [ 5, 6, 6, 6, 6, 6, 7, 8, 9,10],
      [ 5,11, 6,11, 6, 6, 7, 7, 9,10],
      [ 5,12, 6,12, 6, 6, 7, 7, 7,10],
      [ 5, 6, 6, 6, 6, 6, 7, 7,13,10],
      [ 5, 7, 7, 7, 7, 7, 7,14,15,10],
      [ 5,16,16, 7, 7, 7, 7, 7,13,10],
      [17,18,18,18,20,21,18,18,18,19],
    ],
    exits: [{x: 5, y: 8, target: {ref: 'outside', x: 5, y: 4.5}}],
  }],
  ['outside', {
    tilemap: [
      [25,24,25,24,25,24,25,24,25,24],
      [23,26,27,27,27,27,27,27,27,22],
      [25,26,27,28,28,28,28,28,27,24],
      [23,26,27,28,30,30,30,28,27,22],
      [25,26,27,28,31,32,31,28,27,24],
      [23,26,27,28,28,29,28,28,27,22],
      [25,26,27,27,27,29,27,27,27,24],
      [23,26,26,29,29,29,29,29,26,22],
      [25,26,26,26,26,26,26,26,26,24],
      [23,22,23,22,23,22,23,22,23,22],
    ],
    exits: [{ x: 5.5, y: 4.5, target: {ref: 'inside', x: 4.5, y: 6.5}}],
  }],
]);

class Level {
  constructor(ref) {
    const tilemap = levelData.get(ref).tilemap;
    this.width = tilemap[0].length;
    this.height = tilemap.length;
    this.tiles = [];
    const tm = [...tilemap]; // clone the tilemap
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) this.tiles.push(new Tile(i, j, tm[j][i]));
    }
    this.exits = [];
    for (let exit of levelData.get(ref).exits) {
      this.exits.push(new Exit(exit.x, exit.y, exit.target));
    }
  }
  getTiles(minX, minY, maxX, maxY) {
    const tileSubset = [];
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        if (i >= minX && i <= maxX && j >= minY && j <= maxY) tileSubset.push(this.tiles[j * this.width + i]);
      }
    }
    return tileSubset;
  }
}

class Player {
  static states = { idle: 0, walk: 1 };
  static speed = 0.0625; // 1px per tick (in world units 1/16*1=0.0625wu)
  constructor(x, y) {
    this.x = x; // x position reference for internal use, for external collision detection and drawing purposes use the bounding rects
    this.y = y; // y position reference for internal use, for external collision detection and drawing purposes use the bounding rects
    this.state = Player.states.idle;
    this.stateTicks = 0;
    this.facing = directions.down;
    this.collisionBounds = new Rect(0, 0, 0.625, 0.5); // 10px wide 8px high (in world units 1/16*10=0.625wu wide 1/16*8=0.5wu high), real position set by updateBounds()
    this.drawBounds = new Rect(0, 0, 1, 1); // 16px wide 16px high (in world units 1/16*16=1wu wide 1/16*16=1wu high), real position set by updateBounds()
    this.velocityX = 0;
    this.velocityY = 0;
  }
  setState(newState) {
    if (this.state != newState) {
      this.state = newState;
      this.stateTicks = 0;
    }
  }
  updateBounds() {
    this.collisionBounds.x = this.x + 0.1875; // collision bounds offset 3px (or 0.1875wu) right
    this.collisionBounds.y = this.y + 0.5; // collision bounds offset 8px (or 0.5wu) down
    this.drawBounds.x = this.x;
    this.drawBounds.y = this.y;
  }
}

class Tile {
  static collisionMasks = [1, 1, 1, 1, 1, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 2]; // collision mask for each tile in sequential order
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.drawBounds = new Rect(x, y, 1, 1); // 16px wide 16px high (in world units 1/16*16=1wu wide 1/16*16=1wu high)
    const collisionMask = Tile.collisionMasks[id - 1];
    if (collisionMask == 0) this.collisionBounds = new Rect(-1, -1, 0, 0); // walkable
    if (collisionMask == 1) this.collisionBounds = new Rect(x, y, 1, 1); // solid
    if (collisionMask == 2) this.collisionBounds = new Rect(x, y, 1, 0.5); // top half solid bottom half walkable
    if (collisionMask == 3) this.collisionBounds = new Rect(x, y, 0.5, 1); // left half solid right half walkable
    if (collisionMask == 4) this.collisionBounds = new Rect(x + 0.5, y, 0.5, 1); // left half walkable right half solid
  }
}

class Exit {
  constructor(x, y, target) {
    this.bounds = new Rect(x - 0.25, y - 0.25, 0.5, 0.5); // 8px wide 8px high (in world units 1/16*8=0.5wu wide 1/16*8=0.5wu high)
    this.target = target;
  }
}

class TransitionManager {
  static states = { none: 0, fadingOut: 1, faded: 2, fadingIn: 3 };
  static fadingOutTicks = 12;
  static fadedTicks = 6;
  static fadingInTicks = 12;
  constructor() {
    this.state = TransitionManager.states.none;
    this.remainingTicks = 0;
    this.target = {};
  }
  triggerTransition(target) {
    this.target = target;
    this.state = TransitionManager.states.fadingOut;
    this.remainingTicks = TransitionManager.fadingInTicks + TransitionManager.fadedTicks + TransitionManager.fadingOutTicks;
  }
  update() {
    if (this.remainingTicks == TransitionManager.fadingInTicks + TransitionManager.fadedTicks) {
      this.state = TransitionManager.states.faded;
      level = new Level(this.target.ref);
      player.x = this.target.x;
      player.y = this.target.y;
      updatePlayer();
      this.target = {};
    }
    if (this.remainingTicks == TransitionManager.fadingInTicks) this.state = TransitionManager.states.fadingIn;
    if (this.remainingTicks == 0) this.state = TransitionManager.states.none;
    if (this.remainingTicks > 0) this.remainingTicks--;
  }
  applyGraphicsEffect() {
    if (transitionManager.state == TransitionManager.states.none) return;
    let fadeLevel = 0;
    if (transitionManager.state == TransitionManager.states.fadingOut) fadeLevel = transitionManager.remainingTicks >= TransitionManager.fadingInTicks + TransitionManager.fadedTicks + TransitionManager.fadingOutTicks / 2 ? 1 : 2;
    if (transitionManager.state == TransitionManager.states.faded) fadeLevel = 3;
    if (transitionManager.state == TransitionManager.states.fadingIn) fadeLevel = transitionManager.remainingTicks >= TransitionManager.fadingInTicks / 2 ? 2 : 1;
    if (fadeLevel > 0 && fadeLevel < 3) {
      for (let i = ADDRESS_GFX; i < ADDRESS_GFX + GFX_W * GFX_H; i++) {
        let val = peek(i);
        if (val < 4) val -= fadeLevel;
        if (val < 0) val = 0;
        poke(i, val);
      }
    }
    if (fadeLevel == 3) clearGfx();
  }
}

let transitionManager, level, player, debug;

function romInit() {
  transitionManager = new TransitionManager();
  level = new Level('inside');
  player = new Player(2, 2.5);
}

function romLoop() {
  if (transitionManager.state == TransitionManager.states.none) {
    updatePlayer();
    if (isJustPressed(BTN_A) || isJustPressed(BTN_B)) debug = !debug;
  }
  transitionManager.update();
  draw();
}

function updatePlayer() {
  player.stateTicks++;

  // temporarily set velocity to zero on both axes (without changing player.state)...
  player.velocityX = 0;
  player.velocityY = 0;
  // ...then set velocity (and facing/state) based on current input...
  if (isPressed(BTN_U)) {
    player.velocityY = -Player.speed;
    player.facing = directions.up;
    player.setState(Player.states.walk);
  }
  if (isPressed(BTN_D)) {
    player.velocityY = Player.speed;
    player.facing = directions.down;
    player.setState(Player.states.walk);
  }
  if (isPressed(BTN_L)) {
    player.velocityX = -Player.speed;
    player.facing = directions.left;
    player.setState(Player.states.walk);
  }
  if (isPressed(BTN_R)) {
    player.velocityX = Player.speed;
    player.facing = directions.right;
    player.setState(Player.states.walk);
  }
  // ...if player velocity is still zero on both axes and state is not already idle - set state to idle
  if (player.velocityX == 0 && player.velocityY == 0) player.setState(Player.states.idle);

  let minX, minY, maxX, maxY;
  // perform collision detection and response on each axis separately - if moving right check tiles to the right of bounding box edge, else to the left
  if (player.velocityX > 0) minX = maxX = Math.floor(player.collisionBounds.x + player.collisionBounds.width + player.velocityX);
  else minX = maxX = Math.floor(player.collisionBounds.x + player.velocityX);
  minY = Math.floor(player.collisionBounds.y);
  maxY = Math.floor(player.collisionBounds.y + player.collisionBounds.height);
  player.collisionBounds.x += player.velocityX;
  for (const tile of level.getTiles(minX, minY, maxX, maxY)) {
    if (player.collisionBounds.overlaps(tile.collisionBounds)) {
      if (player.velocityX > 0) player.collisionBounds.x = tile.collisionBounds.x - player.collisionBounds.width;
      else player.collisionBounds.x = tile.collisionBounds.x + tile.collisionBounds.width;
      player.velocityX = 0;
      break;
    }
  }
  // perform collision detection and response on each axis separately - if moving up check tiles to the top of bounding box edge, else to the bottom
  if (player.velocityY < 0) minY = maxY = Math.floor(player.collisionBounds.y + player.velocityY);
  else minY = maxY = Math.floor(player.collisionBounds.y + player.collisionBounds.height + player.velocityY);
  minX = Math.floor(player.collisionBounds.x);
  maxX = Math.floor(player.collisionBounds.x + player.collisionBounds.width);
  player.collisionBounds.y += player.velocityY;
  for (const tile of level.getTiles(minX, minY, maxX, maxY)) {
    if (player.collisionBounds.overlaps(tile.collisionBounds)) {
      if (player.velocityY < 0) player.collisionBounds.y = tile.collisionBounds.y + tile.collisionBounds.height;
      else player.collisionBounds.y = tile.collisionBounds.y - player.collisionBounds.height;
      player.velocityY = 0;
      break;
    }
  }

  // set the latest position
  player.x += player.velocityX;
  player.y += player.velocityY;
  player.updateBounds();

  for (const exit of level.exits) {
    if (player.collisionBounds.overlaps(exit.bounds)) transitionManager.triggerTransition(exit.target);
  }
}

export function draw() {
  const viewport = getViewport();
  // tilemap
  for (const tile of level.getTiles(Math.floor(viewport.x), Math.floor(viewport.y), Math.floor(viewport.x + viewport.width - 1), Math.floor(viewport.y + viewport.height - 1))) { // only draw tiles that can be on screen
    drawImage((tile.drawBounds.x - viewport.x) * 16, (tile.drawBounds.y - viewport.y) * 16, tile.drawBounds.width * 16, tile.drawBounds.height * 16, tileImages.get(tile.id));
    if (debug) drawRectangle((tile.collisionBounds.x - viewport.x) * 16, (tile.collisionBounds.y - viewport.y) * 16, tile.collisionBounds.width * 16, tile.collisionBounds.height * 16, colors.red);
  }
  // exits
  for (const exit of level.exits) { // the number of exits will always be quite small, just get them all
    if (debug) drawRectangle((exit.bounds.x - viewport.x) * 16, (exit.bounds.y - viewport.y) * 16, exit.bounds.width * 16, exit.bounds.height * 16, colors.blue);
  }
  // player
  const frameFinder = player.state == Player.states.idle ? 0 : player.stateTicks;
  if (debug) drawRectangle((player.drawBounds.x - viewport.x) * 16, (player.drawBounds.y - viewport.y) * 16, 16, 16, colors.green);
  drawImage((player.drawBounds.x - viewport.x) * 16, (player.drawBounds.y - viewport.y) * 16, 16, 16, playerAnimations.get(player.facing).getKeyFrame(frameFinder));
  if (debug) drawRectangle((player.collisionBounds.x - viewport.x) * 16, (player.collisionBounds.y - viewport.y) * 16, player.collisionBounds.width * 16, player.collisionBounds.height * 16, player.state == Player.states.idle ? colors.blue : colors.yellow);
  // transition effect
  transitionManager.applyGraphicsEffect();
}

function getViewport() {
  return {
    x: clamp(player.drawBounds.x + 0.5 - (GFX_W / 16 / 2), 0, level.width + 1 - GFX_W / 16 - 1),
    y: clamp(player.drawBounds.y + 0.5 - (GFX_H / 16 / 2), 0, level.height + 1 - GFX_H / 16 - 1),
    width: GFX_W / 16 + 1,
    height: GFX_H / 16 + 1,
  };
}
