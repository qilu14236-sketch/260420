let video;
let pg; // 宣告圖層變數

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

  // 當 video 準備好後(寬度>0)，根據 video 的尺寸來建立 pg 圖層
  if (!pg && video.width > 0) {
    pg = createGraphics(video.width, video.height);
  }

  // 如果 pg 已經建立，我們就在上面進行像素處理
  if (pg) {
    video.loadPixels(); // 載入當前視訊的像素資料
    pg.clear(); // 清空圖層，準備繪製新的內容

    const stepSize = 20; // 設定處理單位的網格大小
    pg.textAlign(CENTER, CENTER);
    pg.textSize(8);
    pg.fill(255); // 設定文字為白色
    pg.noStroke();

    // 遍歷整個畫面，以 stepSize 為單位
    for (let y = 0; y < video.height; y += stepSize) {
      for (let x = 0; x < video.width; x += stepSize) {
        let totalR = 0, totalG = 0, totalB = 0;
        // 計算 20x20 單位內的平均 RGB
        for (let j = 0; j < stepSize; j++) {
          for (let i = 0; i < stepSize; i++) {
            const pixelIndex = ((y + j) * video.width + (x + i)) * 4;
            totalR += video.pixels[pixelIndex + 0];
            totalG += video.pixels[pixelIndex + 1];
            totalB += video.pixels[pixelIndex + 2];
          }
        }
        const avgValue = (totalR + totalG + totalB) / (stepSize * stepSize * 3);
        pg.text(floor(avgValue), x + stepSize / 2, y + stepSize / 2);
      }
    }
  }

  push();
  translate(windowWidth / 2, windowHeight / 2); // 將畫布原點移動到中心
  scale(-1, 1); // 水平翻轉
  image(video, 0, 0, w, h); // 在新的原點 (0, 0) 畫出影像
  if (pg) {
    image(pg, 0, 0, w, h); // 將處理完的圖層疊加在視訊上
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
