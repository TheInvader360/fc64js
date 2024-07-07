const itemDefinitions = new Map([
  // Healing
  ['POTION_SMALL',  { img: 'itemPotionSmall', useType: 'consumable', name: 'SMALL POTION', desc1: 'RESTORES 5',      desc2: 'HEALTH POINTS', }],
  ['POTION_LARGE',  { img: 'itemPotionLarge', useType: 'consumable', name: 'LARGE POTION', desc1: 'FULLY RESTORES',  desc2: 'HEALTH',        }],
  // Offence
  ['DAGGER_IRON',   { img: 'itemDagger',      useType: 'equippable', name: 'IRON DAGGER',  desc1: '//TODO:????????', desc2: '//TODO:????????', strMod: 1, defMod: 0, magMod: 0, }],
  ['SWORD_SILVER',  { img: 'itemSword',       useType: 'equippable', name: 'SILVER SWORD', desc1: '//TODO:????????', desc2: '//TODO:????????', strMod: 2, defMod: 0, magMod: 0, }],
  ['AXE_DIAMOND',   { img: 'itemAxe',         useType: 'equippable', name: 'DIAMOND AXE',  desc1: '//TODO:????????', desc2: '//TODO:????????', strMod: 3, defMod: 0, magMod: 0, }],
  // Defence
  ['SHIELD_IRON',   { img: 'itemShieldSmall', useType: 'equippable', name: 'SMALL SHIELD', desc1: '//TODO:????????', desc2: '//TODO:????????', strMod: 0, defMod: 1, magMod: 0, }],
  ['SHIELD_SILVER', { img: 'itemShieldLarge', useType: 'equippable', name: 'LARGE SHIELD', desc1: '//TODO:????????', desc2: '//TODO:????????', strMod: 0, defMod: 2, magMod: 0, }],
  //TODO: More item definitions...
]);
