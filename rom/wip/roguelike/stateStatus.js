function loopStatus() {
  if (isJustPressed(BTN_A) && inventory.slots.get(inventory.selected) != '') changeState(states.item);
  if (isJustPressed(BTN_B)) changeState(states.explore);
  if (isJustPressed(BTN_U) && inventory.selected >= 2) inventory.selected -= 2;
  if (isJustPressed(BTN_D) && inventory.selected <= 9) inventory.selected += 2;
  if (isJustPressed(BTN_L) && inventory.selected % 2 === 1) inventory.selected--;
  if (isJustPressed(BTN_R) && inventory.selected % 2 === 0) inventory.selected++;

  clearGfx();

  drawImage(0, 0, 64, 64, images.get('screenStaticStatus'));

  const levelString = `${currentLevel.id}`;
  drawText(35 - (levelString.length * 4), 4, levelString, COL_YEL);

  let strMod = 0;
  let defMod = 0;
  let magMod = 0;
  for (let i = 0; i < 2; i++) {
    const slotItem = inventory.slots.get(i)
    if (slotItem != '') {
      const itemDefinition = itemDefinitions.get(slotItem);
      strMod += itemDefinition.strMod;
      defMod += itemDefinition.defMod;
      magMod += itemDefinition.magMod;
    }
  }
  drawText(18, 15, player.str.toString().padStart(2, '0'), COL_WHT);
  drawText(30, 15, `${strMod}`, COL_WHT);
  drawText(18, 24, player.def.toString().padStart(2, '0'), COL_WHT);
  drawText(30, 24, `${defMod}`, COL_WHT);
  drawText(18, 33, player.mag.toString().padStart(2, '0'), COL_WHT);
  drawText(30, 33, `${magMod}`, COL_WHT);
  drawText(15, 43, player.hp.toString().padStart(2, '0'), getHealthColor(COL_WHT, COL_RED));
  drawText(27, 43, player.hpMax.toString().padStart(2, '0'), COL_WHT);
  drawText(15, 53, player.gold.toString().padStart(5, '0'), COL_WHT);

  const x = inventory.selected % 2 === 0 ? 40 : 49;
  const y = inventory.selected < 2 ? 3 : 5 + Math.floor(inventory.selected / 2) * 9;
  drawRectangle(x, y, 10, 10, getCursorColor());

  for (let i = 0; i < 12; i++) {
    if (inventory.slots.get(i) !== '') {
      const x = i % 2 === 0 ? 41 : 50;
      const y = i < 2 ? 4 : 6 + Math.floor(i / 2) * 9;
      drawImage(x, y, 8, 8, images.get(itemDefinitions.get(inventory.slots.get(i)).img));
    }
  }
}
