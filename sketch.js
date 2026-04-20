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
  
  push();
  translate(windowWidth / 2, windowHeight / 2); // 將畫布原點移動到中心
  scale(-1, 1); // 水平翻轉
  image(video, 0, 0, w, h); // 在新的原點 (0, 0) 畫出影像
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
