let video;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  imageMode(CENTER);
}

function draw() {
  background('#e7c6ff');
  let w = windowWidth * 0.6;
  let h = windowHeight * 0.6;
  image(video, windowWidth / 2, windowHeight / 2, w, h);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
