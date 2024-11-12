/*

Riso Color Options

Meiryo: burgundy & bright olive 
Kozuka: fluorescent pink & cornflower

*/

let tilePaths = [];
let colorA, colorB;
let slider, segmentSlider, angleSlider, radiusSlider;
let burgundy, brightolive, fluorpink, cornflower;

let decreaseButton, increaseButton;
let currentValue = 5; // 初始值
let minValue = 2; // 最小值
let maxValue = 10; // 最大值

function setup() {
  // create an 8.5x11 canvas for printing at 150dpi
  // createCanvas(8.5 * 150, 11 * 150);
  createCanvas(windowWidth, windowHeight);

  //defining riso colors
  burgundy = new Riso('burgundy');
  brightolive = new Riso('brightolivegreen');
  fluorpink = new Riso('fluorescentpink');
  cornflower = new Riso('cornflower');
  
  //sliders for parameters
  //PATTERN SIZE


  //SHAPE SEGMENTS
  segmentSlider = createSlider(3, 20, 6);
  segmentSlider.position(10, height + 80);
  createP("Number of Segments").position(10, height + 80);

  //ANGLE
  angleSlider = createSlider(0, 1, 0.2, 0.01);
  angleSlider.position(160, height + 80);
  createP("Angle Randomness").position(160, height + 80);

  //RADIUS
  radiusSlider = createSlider(0.1, 1.0, 0.5, 0.01);
  radiusSlider.position(310, height + 80);
  createP("Radius Variation").position(310, height + 80);


  // 创建“减小”按钮
  decreaseButton = createButton('-');
  decreaseButton.position(width / 2 - 100, height / 2+400);
  decreaseButton.style('font-size', '32px');
  decreaseButton.style('background-color', 'blue');
  decreaseButton.style('color', 'white');
  decreaseButton.style('border', 'none');
  decreaseButton.style('padding', '10px 22px');
  decreaseButton.mousePressed(() => {
    if (currentValue > minValue) {
      currentValue--;
      redraw();
    }
  });
  
    // 创建“你扔掉了糖果纸”的文字说明
  let decreaseLabel = createP('你扔掉了糖果纸');
  decreaseLabel.position(width / 2 - 95, height / 2 + 450);
  decreaseLabel.style('text-align', 'center');
  decreaseLabel.style('color', 'black');


  // 创建“增大”按钮
  increaseButton = createButton('+');
  increaseButton.position(width / 2 + 50, height / 2+400);
  increaseButton.style('font-size', '32px');
  increaseButton.style('background-color', 'blue');
  increaseButton.style('color', 'white');
  increaseButton.style('border', 'none');
  increaseButton.style('padding', '10px 20px');
  increaseButton.mousePressed(() => {
    if (currentValue < maxValue) {
      currentValue++;
      redraw();
    }
  });
  
  // 创建“你又吃了一颗糖”的文字说明
  let increaseLabel = createP('你又吃了一颗糖');
  increaseLabel.position(width / 2 + 55, height / 2 + 450);
  increaseLabel.style('text-align', 'center');
  increaseLabel.style('color', 'black');

  //setting an initial  color 
  colorA = fluorpink;
  colorB = cornflower; 
  
  noLoop();
}

function draw() {
  //clear canvas and set the background color 
background(255);
  
  //clear all Riso layers
clearRiso();
  
  //grab the number of tiles from a slider - controls how many rows and columns of tiles to draw
  let tiles = currentValue; // 使用当前值

  
  //calculate the size of each tile based on the number of tiles and the width of the canvas
  let tileSize = width / tiles;


  //loop through each position in the grid to draw tiles --> i represents the row, and j represents the column
  for(let i = 0; i < tiles; i++){
    for(let j = 0; j < tiles; j++){
      
      // Calculate the x and y position for the top-left corner of each tile in the grid
      
    let x = i*tileSize;
    let y = j*tileSize;
      
     //draw a tile at the position (x, y) with the size of tileSize
      
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
  pathA.forEach(([offsetX,offsetY]) => colorA.vertex(x + offsetX, y + offsetY ))
  colorA.endShape(CLOSE);

  //repeat for second shape
  
  colorB.fill(255);
  colorB.beginShape();
  
  pathB.forEach(([offsetX,offsetY]) => colorB.vertex(x + offsetX, y + offsetY ))
  colorB.endShape(CLOSE);
  
}

function randomPath(size) {
  // store points of the path
  let path=[];

  
  //grab slider values for the number of segments, angle randomness, and radius variation
  let segments = segmentSlider.value();
  let angleRandomness = angleSlider.value();
  let radiuseVariation = radiusSlider.value();


  //get the angle between each segment
  let angleStep=TWO_PI/segments

  // Loop through each segment to calculate the points of the shape
      for (let i = 0; i < segments; i++){
        //generate a random angle
        let angle = i*angleStep + random(-angleRandomness, angleRandomness)
        
        
    //generate a random radius
        let radius=size*random(0.3, radiuseVariation)
        
          //get (x,y) for the point based on the angle and radius
let x=cos(angle)*radius;
let y=sin(angle)*radius;
        
            //add the point to the initial path array
        path.push([x,y]);
      }

    return path;

}