import { sfxExplosionPlayer, sfxUfo, sfxExplosionInvader, sfxLaser, sfxInvadersFastest, sfxInvadersFast, sfxInvadersSlow, sfxInvadersSlowest } from './assets.js';

class Track {
  constructor(entries, looping) {
    this.ticksPerEntry = 3; // 3 ticks per entry = 20 entries per second at 60 ticks per second
    this.entries = entries;
    this.looping = looping;
    this.currentTick = 0;
    this.playing = false;
  }
  play() {
    this.playing = true;
  }
  pause() {
    this.playing = false;
  }
  rewind() {
    this.currentTick = 0;
  }
  update() {
    if (this.playing) {
      this.currentTick++;
      if (this.currentTick >= this.entries.length * this.ticksPerEntry) {
        if (this.looping) {
          this.rewind();
        } else {
          this.rewind();
          this.pause();
        }
      }
    }
  }
  getEntry() {
    if (this.playing) return this.entries[Math.floor(this.currentTick / this.ticksPerEntry)];
    else return null;
  }
}

export class AudioManager {
  constructor() {
    this.track1 = new Track(sfxExplosionPlayer, false);
    this.track2 = new Track(sfxUfo, true);
    this.track3 = new Track(sfxExplosionInvader, false);
    this.track4 = new Track(sfxLaser, false);
    this.track5 = new Track(sfxInvadersFastest, true);
    this.track6 = new Track(sfxInvadersFast, true);
    this.track7 = new Track(sfxInvadersSlow, true);
    this.track8 = new Track(sfxInvadersSlowest, true);
  }

  update() {
    // update all tracks
    this.track1.update();
    this.track2.update();
    this.track3.update();
    this.track4.update();
    this.track5.update();
    this.track6.update();
    this.track7.update();
    this.track8.update();

    // beep the frequency of the current entry of the highest priority track that's currently in a playing state
    if (this.track1.playing) beep(this.track1.getEntry(), 1, true);
    else if (this.track2.playing) beep(this.track2.getEntry(), 1, true);
    else if (this.track3.playing) beep(this.track3.getEntry(), 1, true);
    else if (this.track4.playing) beep(this.track4.getEntry(), 1, true);
    else if (this.track5.playing) beep(this.track5.getEntry(), 1, true);
    else if (this.track6.playing) beep(this.track6.getEntry(), 1, true);
    else if (this.track7.playing) beep(this.track7.getEntry(), 1, true);
    else if (this.track8.playing) beep(this.track8.getEntry(), 1, true);

    // console.log(`${this.track1.getEntry()}|${this.track2.getEntry()}|${this.track3.getEntry()}|${this.track4.getEntry()}|${this.track5.getEntry()}|${this.track6.getEntry()}|${this.track7.getEntry()}|${this.track8.getEntry()}`);
  }

  explosionPlayer() {
    this.track1.rewind();
    this.track1.play();
  }

  ufoPause() {
    this.track2.pause();
  }

  ufoPlay() {
    this.track2.play();
  }

  explosionInvader() {
    this.track3.rewind();
    this.track3.play();
  }

  laser() {
    this.track4.rewind();
    this.track4.play();
  }

  invadersFastestPause() {
    this.track5.pause();
  }

  invadersFastestPlay() {
    this.track5.play();
  }

  invadersFastPause() {
    this.track6.pause();
  }

  invadersFastPlay() {
    this.track6.play();
  }

  invadersSlowPause() {
    this.track7.pause();
  }

  invadersSlowPlay() {
    this.track7.play();
  }

  invadersSlowestPause() {
    this.track8.pause();
  }

  invadersSlowestPlay() {
    this.track8.play();
  }
}
