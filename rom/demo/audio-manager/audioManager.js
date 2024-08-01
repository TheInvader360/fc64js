export class AudioManager {
  constructor(ticksPerEntry) {
    this.ticksPerEntry = ticksPerEntry; // e.g. 3 ticks per entry = 20 entries per second at 60 ticks per second
    this.reset();
  }
  reset() {
    this.currentClipData = null;
    this.currentClipPriority = null; // lower values trump higher values e.g. a priority 1 clip beats a priority 2 clip
    this.tick = -1;
  }
  tryPlay(data, priority) {
    if (this.currentClipData == null || this.currentClipPriority >= priority) {
      this.currentClipData = data;
      this.currentClipPriority = priority;
      this.tick = -1;
    }
  }
  update() {
    this.tick++;
    if (this.currentClipData) { 
      if (this.tick < this.currentClipData.length * this.ticksPerEntry && this.tick % this.ticksPerEntry == 0) {
        beep(this.currentClipData[Math.floor(this.tick / this.ticksPerEntry)], this.ticksPerEntry, true);
      }
      if (this.tick >= this.currentClipData.length * this.ticksPerEntry) {
        this.reset();
      }
    }
  }
}
