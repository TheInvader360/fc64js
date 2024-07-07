let viewMode;

function loopExplore() {
  //TODO: Remove "cheat" shortcuts...
  if (isPressed(BTN_A) && isJustPressed(BTN_U) && player.hp < player.hpMax) player.hp++;
  if (isPressed(BTN_A) && isJustPressed(BTN_D) && player.hp > 0) player.hp--;
  if (isPressed(BTN_A) && isJustPressed(BTN_L)) viewMode = 'normal';
  if (isPressed(BTN_A) && isJustPressed(BTN_R)) viewMode = 'minimal';
  // --- temp cheats end ---

  if (isJustPressed(BTN_A)) playerAction();
  if (isJustPressed(BTN_B)) changeState(states.status);

  let targetX = player.x;
  let targetY = player.y;
  if (isJustPressed(BTN_U) && player.y > 0) targetY--;
  if (isJustPressed(BTN_D) && player.y < currentLevel.height - 1) targetY++;
  if (isJustPressed(BTN_L) && player.x > 0) targetX--;
  if (isJustPressed(BTN_R) && player.x < currentLevel.width - 1) targetX++;
  if ((targetX != player.x || targetY != player.y) && (getTile(targetX, targetY) !== 2)) player.moveTo(targetX, targetY);

  if (player.hp <= 0) changeState(states.gameOver);

  if (viewMode == 'normal') {
    clearGfx();
    const viewport = getViewport();
    const tileOffsetX = viewport.width < 9 ? 8 - viewport.width : 0;
    const tileOffsetY = viewport.height < 9 ? 8 - viewport.height : 0;
    for (let x = 0; x < viewport.width; x++) {
      for (let y = 0; y < viewport.height; y++) {
        switch (getTile(x + viewport.x, y + viewport.y)) {
          case 0:
            drawImage((x + tileOffsetX) * 8 - 4, (y + tileOffsetY) * 8 - 4, 8, 8, images.get('layoutEmpty'));
            break;
          case 1:
            drawImage((x + tileOffsetX) * 8 - 4, (y + tileOffsetY) * 8 - 4, 8, 8, images.get('layoutFloor'));
            break;
          case 2:
            drawImage((x + tileOffsetX) * 8 - 4, (y + tileOffsetY) * 8 - 4, 8, 8, images.get('layoutWall'));
            break;
        }
        const entity = getEntity(x + viewport.x, y + viewport.y);
        if (typeof entity != 'undefined') {
          if (entity.entityType == 'exit') drawImage((x + tileOffsetX) * 8 - 4, (y + tileOffsetY) * 8 - 4, 8, 8, images.get(entity.img));
          if (entity.entityType == 'item') drawImage((x + tileOffsetX) * 8 - 4, (y + tileOffsetY) * 8 - 4, 8, 8, images.get(itemDefinitions.get(entity.ref).img));
        }
      }
    }
    drawImage((player.x - viewport.x + tileOffsetX) * 8 - 4, (player.y - viewport.y + tileOffsetY) * 8 - 4, 8, 8, images.get('player'));
    drawHealthBar(16, 63, 32);
  }

  if (viewMode == 'minimal') {
    clearGfx();
    for (let x = 0; x < currentLevel.width; x++) {
      for (let y = 0; y < currentLevel.height; y++) {
        switch (getTile(x, y)) {
          case 1:
            drawPixel(x, y, COL_BLK);
            break;
          case 2:
            drawPixel(x, y, COL_BLU);
            break;
        }
        const entity = getEntity(x, y);
        if (typeof entity != 'undefined') {
          if (entity.entityType == 'exit') drawPixel(x, y, COL_GRN);
          if (entity.entityType == 'item') drawPixel(x, y, COL_CYN);
        }
      }
    }
    drawPixel(player.x, player.y, COL_WHT);
  }
}

function playerAction() {
  const entity = getEntity(player.x, player.y);
  if (typeof entity == 'undefined') {
    console.log('TODO: wait action');
  } else {
    if (entity.entityType == 'exit') startLevel(entity.destination.id, entity.destination.x, entity.destination.y)
    if (entity.entityType == 'item') tryItemGet(entity);
  }
}

function getTile(x, y) {
  return currentLevel.tiles[y * currentLevel.width + x]
}

function getViewport() {
  return {
    x: clamp(player.x - 4, 0, currentLevel.width - 9),
    y: clamp(player.y - 4, 0, currentLevel.height - 9),
    width: currentLevel.width >= 9 ? 9 : currentLevel.width,
    height: currentLevel.height >= 9 ? 9 : currentLevel.height,
  };
}

function getEntity(x, y) {
  return currentLevel.entities.find(entity => entity.x === x && entity.y == y);
}

function drawHealthBar(x, y, width) {
  const fillWidth = Math.ceil(player.hp/player.hpMax*width);
  drawLine(x, y, x + width - 1, y, COL_WHT);
  if (fillWidth > 0) drawLine(x, y, x + fillWidth - 1, y, getHealthColor(COL_RED, COL_WHT));
}

function tryItemGet(entity) {
  const slot = inventory.getEmptyStoreSlot();
  if (slot < 0) {
    triggerNotification('ACTION FAILED:', 'STORAGE FULL');
  } else {
    inventory.slots.set(slot, entity.ref);
    const index = currentLevel.entities.indexOf(entity);
    currentLevel.entities.splice(index, 1);
  }
}
