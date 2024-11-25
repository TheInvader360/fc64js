//TODO: consider introducing a small amount of persistent memory to fc64js (accessible via the api not localStorage directly)

const highScoreKey = 'fc64js_space-invaders_high-score';

export const readHighScore = (minValid, maxValid) => {
  let value = +localStorage.getItem(highScoreKey);
  if (isNaN(value) || value === null || value < minValid || value > maxValid) {
    value = 0;
  }
  return value;
}

export const writeHighScore = (value) => localStorage.setItem(highScoreKey, value);
