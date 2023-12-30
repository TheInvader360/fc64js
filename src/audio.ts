// See: https://modernweb.com/audio-synthesis-javascript/

let audioContext: AudioContext;
let oscillator: OscillatorNode;

export function init() {
  audioContext = new window.AudioContext();
  oscillator = audioContext.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.value = 0;
  oscillator.connect(audioContext.destination);
  oscillator.start(0);
  window.addEventListener('mousedown', resumeAudio);
  window.addEventListener('touchstart', resumeAudio);
  window.addEventListener('keydown', resumeAudio);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      off();
    }
  });
}

export function on(frequency: number) {
  oscillator.frequency.value = frequency;
}

export function off() {
  oscillator.frequency.value = 0;
}

function resumeAudio() {
  audioContext.resume();
}
