let video;
let pg; // 宣告圖層變數

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  
  // 建立與攝影機預設解析度相同的圖層 (通常預設為 640x480)
  pg = createGraphics(640, 480);
  imageMode(CENTER);
}

function draw() {
  background('#e7c6ff');
  let w = windowWidth * 0.6;
  let h = windowHeight * 0.6;
  
  // 在這個獨立圖層 (pg) 上畫圖
  pg.clear(); // 確保背景是透明的，才不會遮住底下的視訊
  pg.stroke(255);
  pg.strokeWeight(10);
  pg.noFill();
  pg.rect(0, 0, pg.width, pg.height); // 畫一個跟隨畫面邊界的白框
  pg.fill(255, 0, 0, 150);
  pg.noStroke();
  pg.circle(pg.width / 2, pg.height / 2, 100); // 畫一個半透明紅圓形

  push();
  translate(windowWidth / 2, windowHeight / 2); // 將畫布原點移動到中心
  scale(-1, 1); // 水平翻轉
  image(video, 0, 0, w, h); // 在新的原點 (0, 0) 畫出影像
  image(pg, 0, 0, w, h); // 將圖層也畫在正中央，與視訊畫面大小完美重疊
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
