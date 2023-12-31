const tunes = [
  tuneHappyBirthdayToYou,
  tuneHenWladFyNhadau,
  tuneJingleBells,
  tuneMaryHadALittleLamb,
  tuneTwinkleTwinkleLittleStar,
];

let playing;
let currentTuneIndex = 0;
let currentNoteIndex = -1;
let tickCountdown = -1;

function romInit() {}

function romLoop() {
  if (isJustPressed(BTN_L) && currentTuneIndex > 0) {
    currentTuneIndex--;
    restartTune();
  }
  if (isJustPressed(BTN_R) && currentTuneIndex < tunes.length - 1) {
    currentTuneIndex++;
    restartTune();
  }
  if (isJustPressed(BTN_A)) {
    playing = !playing;
  }
  if (isJustPressed(BTN_B)) {
    restartTune();
  }

  if (playing) {
    if (tickCountdown <= 0) {
      const tune = tunes[currentTuneIndex];
      currentNoteIndex++;
      if (currentNoteIndex >= tune.notes.length) {
        currentNoteIndex = 0;
      }
      const note = tune.notes[currentNoteIndex];
      const frequency = frequencies.get(note.ipn);
      tickCountdown = note.duration;
      beep(frequency, note.duration, true);
      clearGfx();
      drawText(`${tune.nameLine1}`, 1, 2, COL_RED);
      drawText(`${tune.nameLine2}`, 1, 8, COL_RED);
      drawText('IPN', 1, 18, COL_CYN);
      drawText(`${note.ipn}`, 1, 24, COL_CYN);
      drawText('Frequency', 1, 34, COL_MAG);
      drawText(frequency > 0 ? `${Math.round(frequency)}hz` : '', 1, 40, COL_MAG);
      drawText('Duration', 1, 50, COL_YEL);
      drawText(`${note.duration} ticks`, 1, 56, COL_YEL);
    }
    tickCountdown--;
  } else {
    clearGfx();
    drawText(`BEEP-TUNE`, 3, 10, COL_YEL);
    drawText(`L: PREV TUNE`, 3, 20, COL_WHT);
    drawText(`R: NEXT TUNE`, 3, 30, COL_WHT);
    drawText(`A: PLAY/PAUSE`, 3, 40, COL_WHT);
    drawText(`B: RESTART`, 3, 50, COL_WHT);
  }
}

function restartTune() {
  currentNoteIndex = -1;
  tickCountdown = -1;
}
