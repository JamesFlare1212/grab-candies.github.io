let tilePaths = [];
let colorA, colorB;
let fluorpink, cornflower;

let decreaseButton, increaseButton;
let currentValue = 1; // 初始值
let minValue = 1; // 最小值
let maxValue = 12; // 最大值

function setup() {
  // create an 8.5x11 canvas for printing at 150dpi
  // createCanvas(8.5 * 150, 11 * 150);
  createCanvas(windowWidth, 600);
  

  //defining riso colors
  fluorpink = new Riso("fluorescentpink");
  cornflower = new Riso("bisque");

  //sliders for parameters
  //PATTERN SIZE

  // 创建“减小”按钮
  decreaseButton = createButton("<");
  decreaseButton.position(width / 2 - 100, height / 2 + 400);
  decreaseButton.style("font-size", "32px");
  decreaseButton.style("background-color", "#FF6521");
  decreaseButton.style("color", "white");
  decreaseButton.style("border", "none");
  decreaseButton.style("padding", "10px 22px");
  decreaseButton.style("border-radius", "40%");
  decreaseButton.mousePressed(() => {
    if (currentValue > minValue) {
      currentValue--;
      redraw();
    }
  });

  // 创建“你扔掉了糖果纸”的文字说明
  let decreaseLabel = createP();
  decreaseLabel.position(width / 2 - 95, height / 2 + 450);
  decreaseLabel.style("text-align", "center");
  decreaseLabel.style("color", "black");

  // 创建“增大”按钮
  increaseButton = createButton(">");
  // increaseButton.position(width / 2 + 50, height / 2 + 400);
  increaseButton.style("font-size", "32px");
  increaseButton.style("background-color", "#FF6521");
  increaseButton.style("color", "white");
  increaseButton.style("border", "none");
  increaseButton.style("padding", "10px 20px");
  increaseButton.style("border-radius", "40%");
  increaseButton.style("cursor", "pointer")
  
  increaseButton.mousePressed(() => {
    if (currentValue < maxValue) {
      currentValue++;
      redraw();
    }
  });

  // 创建“你又吃了一颗糖”的文字说明
  let increaseLabel = createP();
  increaseLabel.position(width / 2 + 55, height / 2 + 450);
  increaseLabel.style("text-align", "center");
  increaseLabel.style("color", "black");

  //setting an initial  color
  colorA = fluorpink;
  colorB = cornflower;

  noLoop();

  positionButtons();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 100);
  positionButtons(); // 调整按钮位置
  redraw();
}

function styleButton(button) {
  button.style("font-size", "32px");
  button.style("background-color", "#FF6521");
  button.style("color", "white");
  button.style("border", "none");
  button.style("border-radius", "50%"); // 圆形按钮
  button.style("padding", "10px 20px");
  button.style("cursor", "pointer");
}

function positionButtons() {
  let buttonOffsetY = height - 50;
  decreaseButton.position(width / 2 - 100, buttonOffsetY);
  increaseButton.position(width / 2 + 50, buttonOffsetY);
}

function draw() {
  //clear canvas and set the background color
  background("#B3C9EA");

  //clear all Riso layers
  clearRiso();

  //grab the number of tiles from a slider - controls how many rows and columns of tiles to draw
  let tiles = currentValue; // 使用当前值

  //calculate the size of each tile based on the number of tiles and the width of the canvas
  let tileSize = min(width / tiles, height / tiles);

  let offsetX = (width - tileSize * tiles) / 2;
  let offsetY = (height - tileSize * tiles) / 2;

  for (let i = 0; i < tiles; i++) {
    for (let j = 0; j < tiles; j++) {
      let x = i * tileSize + offsetX;
      let y = j * tileSize + offsetY;
      drawTiles(x, y, tileSize);
    }
  }
  //Draw all the Riso layers onto canvas
  drawRiso();
}

function drawTiles(x, y, size) {
  //create two random paths for the two layers of shapes
  let pathA = randomPath(size);
  let pathB = randomPath(size);

  //drawing the first shape in colorA layer --> set fill color and begin drawing the shape
  colorA.fill(255);
  colorA.beginShape();

  //loop through each point in pathA to draw it on the canvas and close to form full path
  pathA.forEach(([offsetX, offsetY]) =>
    colorA.vertex(x + offsetX, y + offsetY)
  );
  colorA.endShape(CLOSE);

  //repeat for second shape

  colorB.fill(255);
  colorB.beginShape();

  pathB.forEach(([offsetX, offsetY]) =>
    colorB.vertex(x + offsetX, y + offsetY)
  );
  colorB.endShape(CLOSE);
}

function randomPath(size) {
  // store points of the path
  let path = [];

  //grab slider values for the number of segments, angle randomness, and radius variation
  // 默认值替代 slider 的值
  let segments =6; // 固定分段数
  let angleRandomness = 0.9; // 固定角度随机值
  let radiuseVariation = 1.2; // 固定半径变化

  //get the angle between each segment
  let angleStep = TWO_PI / segments;

  // Loop through each segment to calculate the points of the shape
  for (let i = 0; i < segments; i++) {
    //generate a random angle
    let angle = i * angleStep + random(-angleRandomness, angleRandomness);

    //generate a random radius
    let radius = size * random(0.3, radiuseVariation);

    //get (x,y) for the point based on the angle and radius
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    //add the point to the initial path array
    path.push([x, y]);
  }

  return path;
}
