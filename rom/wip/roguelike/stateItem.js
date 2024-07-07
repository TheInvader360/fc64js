let menu;

function initItem() {
  const def = itemDefinitions.get(inventory.slots.get(inventory.selected));
  const use = def.useType == 'consumable' ? 'DRINK' : inventory.selected < 2 ? 'STORE' : 'EQUIP';
  menu = {
    definition: def,
    useAction: use,
    selected: 2,
  };
}

function loopItem() {
  if (isJustPressed(BTN_A)) {
    if (menu.selected == 0) {
      switch (menu.useAction) {
        case 'DRINK':
          tryItemDrink();
          break;
        case 'EQUIP':
          tryItemEquip();
          break;
        case 'STORE':
          tryItemStore();
          break;
      }
    }
    if (menu.selected == 1) tryItemDrop();
    if (menu.selected == 2) changeState(states.status);
  }
  if (isJustPressed(BTN_B)) changeState(states.status);
  if (isJustPressed(BTN_U) && menu.selected > 0) menu.selected--;
  if (isJustPressed(BTN_D) && menu.selected < 2) menu.selected++;

  clearGfx();
  drawRectangle(1, 1, 62, 7, COL_BLU, COL_BLU);
  drawText(2, 2, menu.definition.name, COL_YEL);
  drawImage(2, 9, 12, 12, images.get('uiItemBezel'));
  drawImage(4, 11, 8, 8, images.get(menu.definition.img));
  drawText(2, 23, menu.definition.desc1, COL_WHT);
  drawText(2, 29, menu.definition.desc2, COL_WHT);
  drawText(20, 38, menu.useAction, COL_CYN);
  drawText(20, 46, 'DROP', COL_CYN);
  drawText(20, 54, 'CANCEL', COL_CYN);
  drawRectangle(18, 36 + (menu.selected * 8), 27, 9, getCursorColor());
}

function tryItemDrink() {
  if (player.hp >= player.hpMax) {
    triggerNotification('ACTION FAILED:', 'AT FULL HEALTH');
  } else {
    const ref = inventory.slots.get(inventory.selected);
    if (ref == 'POTION_SMALL') player.hp += 5;
    if (ref == 'POTION_LARGE') player.hp = player.hpMax;
    if (player.hp > player.hpMax) player.hp = player.hpMax;
    inventory.slots.set(inventory.selected, '');
  }
  changeState(states.status);
}

function tryItemEquip() {
  const slot = inventory.getEmptyEquipSlot();
  const ref = inventory.slots.get(inventory.selected);
  if (slot < 0) {
    triggerNotification('ACTION FAILED:', 'FULLY EQUIPPED');
  } else {
    inventory.slots.set(slot, ref);
    inventory.slots.set(inventory.selected, '');
  }
  changeState(states.status);
}

function tryItemStore() {
  const slot = inventory.getEmptyStoreSlot();
  const ref = inventory.slots.get(inventory.selected);
  if (slot < 0) {
    triggerNotification('ACTION FAILED:', 'STORAGE FULL');
  } else {
    inventory.slots.set(slot, ref);
    inventory.slots.set(inventory.selected, '');
  }
  changeState(states.status);
}

function tryItemDrop() {
  const entity = getEntity(player.x, player.y);
  if (typeof entity != 'undefined') {
    triggerNotification('ACTION FAILED:', 'OCCUPIED SPACE');
  } else {
    currentLevel.entities.push({entityType: 'item', x: player.x, y: player.y, ref: inventory.slots.get(inventory.selected)});
    inventory.slots.set(inventory.selected, '');
  }
  changeState(states.status);
}
