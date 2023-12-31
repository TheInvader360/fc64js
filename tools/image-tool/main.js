const imageCanvas = document.getElementById('canvas');
const imageCanvasCtx = canvas.getContext('2d');
const input = document.getElementById('file');
const fileReader = new FileReader();
const image = new Image();
const messageElement = document.getElementById('message');
const summaryElement = document.getElementById('summary');
const imageColors = [];
const palette = new Map([['#000000', 0], ['#0000ff', 1], ['#ff0000', 2], ['#ff00ff', 3], ['#00ff00', 4], ['#00ffff', 5], ['#ffff00', 6], ['#ffffff', 7]]);
const imagePaletteRefs = [];

function loadImage() {
  reset();
  if (!input.files[0]) {
    messageElement.innerText = 'Choose then load a file!';
  } else {
    fileReader.onload = createImage;
    fileReader.readAsDataURL(input.files[0]);
  }
}

function reset() {
  messageElement.innerText = '';
  summaryElement.innerText = '';
  imageColors.length = 0;
  imagePaletteRefs.length = 0;
}

function createImage() {
  image.onload = imageLoaded;
  image.src = fileReader.result;
}

function imageLoaded() {
  imageCanvas.width = image.width;
  imageCanvas.height = image.height;
  imageCanvasCtx.drawImage(image, 0, 0);
  populateImageColors();
  populateImagePaletteRefs();
  updateSummary();
}

function populateImageColors() {
  const pixelData = imageCanvasCtx.getImageData(0, 0, canvas.width, canvas.height).data;
  for (let i = 0; i < canvas.width * canvas.height; i++) {
    const r = pixelData[i * 4 + 0];
    const g = pixelData[i * 4 + 1];
    const b = pixelData[i * 4 + 2];
    const a = pixelData[i * 4 + 3];
    a > 128 ? imageColors[i] = rgbToHex(r, g, b) : imageColors[i] = 'transparent';
  }
}

function rgbToHex(r, g, b) {
  if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
    throw "Invalid color component";
  }
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function populateImagePaletteRefs() {
  for (let i = 0; i < imageColors.length; i++) {
    const ref = palette.get(imageColors[i]);
    imagePaletteRefs[i] = (ref == undefined) ? -1 : ref;
  }
}
  
function updateSummary() {
  let content = 'Image Summary\n=============\n\n';
  content = content.concat(`W: ${image.width}\n`);
  content = content.concat(`H: ${image.height}\n\n`);

  for (let i = 0; i < image.width * image.height; i += image.width) {
    const rowPaletteRefs = imagePaletteRefs.slice(i, i + image.width);
    for (const pr of rowPaletteRefs) {
      content = content.concat(pr < 0 ? `${pr},` : ` ${pr},`);
    }
    content = content.concat('\n');
  }
  summaryElement.innerText = content;
}
