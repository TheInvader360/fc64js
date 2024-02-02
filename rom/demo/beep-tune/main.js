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
      drawText(1, 2, `${tune.nameLine1}`, COL_RED);
      drawText(1, 8, `${tune.nameLine2}`, COL_RED);
      drawText(1, 18, 'IPN', COL_CYN);
      drawText(1, 24, `${note.ipn}`, COL_CYN);
      drawText(1, 34, 'Frequency', COL_MAG);
      drawText(1, 40, frequency > 0 ? `${Math.round(frequency)}hz` : '', COL_MAG);
      drawText(1, 50, 'Duration', COL_YEL);
      drawText(1, 56, `${note.duration} ticks`, COL_YEL);
    }
    tickCountdown--;
  } else {
    clearGfx();
    drawText(3, 10, `BEEP-TUNE`, COL_YEL);
    drawText(3, 20, `L: PREV TUNE`, COL_WHT);
    drawText(3, 30, `R: NEXT TUNE`, COL_WHT);
    drawText(3, 40, `A: PLAY/PAUSE`, COL_WHT);
    drawText(3, 50, `B: RESTART`, COL_WHT);
  }
}

function restartTune() {
  currentNoteIndex = -1;
  tickCountdown = -1;
}
