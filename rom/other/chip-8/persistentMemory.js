//TODO: consider introducing a small amount of persistent memory to fc64js (accessible via the api not localStorage directly)

const menuPointerKey = 'fc64js_chip-8_menu-pointer';

export const readMenuPointer = (minValid, maxValid) => {
  let value = +localStorage.getItem(menuPointerKey);
  if (isNaN(value) || value === null || value < minValid || value > maxValid) {
    value = 0;
  }
  return value;
}

export const writeMenuPointer = (value) => localStorage.setItem(menuPointerKey, value);
