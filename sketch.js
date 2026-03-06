/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let offset = 0;
let monsterX, monsterY;
let Color = 0;
function setup() {
  createCanvas(800, 500);
  monsterX = width / 2;
  monsterY = height / 2;
}

function draw() {
  for (let i = 0; i < height; i += 4) {
    let n = noise(i * 0.005, frameCount * 0.01);
    let r = map(n, 0, 1, 50, 255);
    let g = 0;
    let b = map(i, 0, height, 150, 255);
    stroke(r, g, b, 100);
    strokeWeight(4);
    line(0, i, width, i);
  }

  noStroke();
  fill(0, 20);
  for (let x = 0; x < width; x += 15) {
    for (let y = 0; y < height; y += 15) {
      ellipse(x, y, 2, 2);
    }
  }

  noStroke();

  if (frameCount % 20 == 0) {
    Color = random(1);
  }

  for (let i = 0; i < 30; i++) {
    let x = noise(i * 100, frameCount * 0.005) * width;
    let y = noise(i * 200, frameCount * 0.005) * height;

    if (Color > 0.5) {
      fill("grey");
    } else {
      fill("white");
    }

    let blockWidth = 18;

    if (noise(i, frameCount * 0.1) > 0.8) {
      blockWidth = 40;
    }
   rect(x, y, blockWidth, 18);
  }
  


  let X = mouseX + noise(frameCount * 0.01) * 100 - 50;
  let Y = mouseY + noise(frameCount * 0.01 + 500) * 100 - 50;
  let W = sin(frameCount * 0.05) * 30; 
  let H = cos(frameCount * 0.07) * 30;

  push();          
  translate(X, Y); 
  
  rotate(frameCount*0.05)
  drawLimbs(W, H); 
  drawBody(W, H);  
  
  pop();           


function drawLimbs(W, H) {
  push();
  
  rectMode(CENTER);
  for (let i = 0; i < 4; i++) {
    let X1 = sin(frameCount * 0.1 + i) * (40 + W);
    let Y1 = cos(frameCount * 0.1 + i) * (40 + H);
    
    
    stroke(255, 255, 0, 80);
    strokeWeight((15 + sin(frameCount * 0.2 + i) * 10) / 2);
    line(0, 0, X1, Y1); 
    
   
    noStroke();
    fill(0, 255, 255, 180); 
    let s = 15 + sin(frameCount * 0.2 + i) * 10;
    rect(X1, Y1, s, s, 5);
  }
  pop();
}


function drawBody(W, H) {
  push();
  noStroke();
  rectMode(CENTER);

  
  fill(255, 255, 0, 40); 
  rect(0, 0, 100 + W, 100 + H, 20); 
  fill(255, 255, 0, 100);
  rect(0, 0, 70 - W, 70 - H, 15);

  
  fill(0);
  rect(0, 0, 40 + W/2, 40 + H/2, 10);

  let eyeX = noise(frameCount * 0.05) * 20 - 10;
  let eyeY = noise(frameCount * 0.05 + 100) * 20 - 10;
  fill(255);
  rect(eyeX, eyeY, 15, 15, 4); 
  fill(255, 0, 0); 
  rect(eyeX, eyeY, 5, 5);
  
  
  if (random(1) > 0.8) {
    fill(255, 200);
    rect(random(-40, 40), random(-40, 40), 5, 5); 
  }
  pop();
}
}

