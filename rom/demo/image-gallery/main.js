const slides = [
  imgParrot,
  imgLena,
  imgAmericanGothic,
  imgMonaLisa,
  imgPearlEarring,
  imgPersistenceMemory,
  imgScream,
  imgSonMan,
  imgStarryNight,
  imgMondrian,
];

let currentSlide = 0;

function romInit() {
  drawImage(0, 0, 64, 64, slides[currentSlide]);
}

function romLoop() {
  const previousSlide = currentSlide;
  if ((isJustPressed(BTN_L) || isJustPressed(BTN_D) || isJustPressed(BTN_A)) && currentSlide > 0) {
    currentSlide--;
  }
  if ((isJustPressed(BTN_R) || isJustPressed(BTN_U) || isJustPressed(BTN_B)) && currentSlide < slides.length - 1) {
    currentSlide++;
  }
  if (previousSlide == currentSlide) {
    return;
  }
  drawImage(0, 0, 64, 64, slides[currentSlide]);
}
