/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let offset = 0;
let monsterX, monsterY;
let Color = 0;

let monsterColor;
let monsterSize = 1
let isEating = false;


let block1X,
  block1Y,
  block1Alive = true;
let block2X,
  block2Y,
  block2Alive = true;
let block3X,
  block3Y,
  block3Alive = true;
let block4X,
  block4Y,
  block4Alive = true;
let block5X,
  block5Y,
  block5Alive = true;
let block6X,
  block6Y,
  block6Alive = true;


  function setup() {

let canvas = createCanvas(800, 500);

canvas.parent("p5-canvas-container");;
  monsterX = width / 2;
  monsterY = height / 2;

  monsterColor = color(255, 255, 0);

  block1X = random(width);
  block1Y = random(height);
  block2X = random(width);
  block2Y = random(height);
  block3X = random(width);
  block3Y = random(height);
  block4X = random(width);
  block4Y = random(height);
  block5X = random(width);
  block5Y = random(height);
  block6X = random(width);
  block6Y = random(height);
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
block1X += random(-10,10);
block1Y += random(-10,10);
  
  
  
  noStroke();
  for (let i = 0; i < 40; i++) {
    let sx = noise(i, frameCount * 0.002) * width;
    let sy = noise(i + 200, frameCount * 0.002) * height;
    fill(255, 255, 255, 120);
    ellipse(sx, sy, 3);
  }

  if (frameCount % 20 == 0) {
    Color = random(1);
  }

  
  if (Color > 0.5) {
    fill("grey");
  } else {
    fill("white");
  }

  if (block1Alive) rect(block1X, block1Y, 20, 18);
  if (block2Alive) rect(block2X, block2Y, 20, 18);
  if (block3Alive) rect(block3X, block3Y, 20, 18);
  if (block4Alive) rect(block4X, block4Y, 20, 18);
  if (block5Alive) rect(block5X, block5Y, 20, 18);
  if (block6Alive) rect(block6X, block6Y, 20, 18);

  
  let X = mouseX + noise(frameCount * 0.01) * 100 - 50;
  let Y = mouseY + noise(frameCount * 0.01 + 500) * 100 - 50;
  let W = sin(frameCount * 0.05) * 30;
  let H = cos(frameCount * 0.07) * 30;

  push();
  translate(X, Y);

  if (isEating) {
    rotate(frameCount * 0.05);
    drawAura(W, H);
    drawLimbs(W, H);
    drawBody(W, H);
    drawAntenna();
    drawTail();
  } else {
    drawNormalMonster(W, H);
  }

  pop();

  eatBlocks(X, Y);
}

function eatBlocks(mx, my) {
  if (mouseIsPressed) {
    if (block1Alive && dist(mx, my, block1X, block1Y) < 60) {
      block1Alive = false;
    }
    if (block2Alive && dist(mx, my, block2X, block2Y) < 60) {
      block2Alive = false;
    }
    if (block3Alive && dist(mx, my, block3X, block3Y) < 60) {
      block3Alive = false;
    }
    if (block4Alive && dist(mx, my, block4X, block4Y) < 60) {
      block4Alive = false;
    }
    if (block5Alive && dist(mx, my, block5X, block5Y) < 60) {
      block5Alive = false;
    }
    if (block6Alive && dist(mx, my, block6X, block6Y) < 60) {
      block6Alive = false;
    }
  }
}

function drawNormalMonster(W, H) {
  rectMode(CENTER);
  noStroke();

  fill(255, 220, 0);
  rect(0, 0, 60 + W, 60 + H, 15);

  fill(0);
  ellipse(0, 0, 25);

  fill(255);
  ellipse(0, 0, 10);

  fill(0);
  arc(0, 15, 25, 15, 0, PI);
}

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

  fill(monsterColor);
  rect(0, 0, 70 - W, 70 - H, 15);

  fill(0);
  rect(0, 0, 40 + W / 2, 40 + H / 2, 10);

  let eyeX = map(mouseX, 0, width, -10, 10);
  let eyeY = map(mouseY, 0, height, -10, 10);

  fill(255);
  rect(eyeX, eyeY, 15, 15, 4);
  fill(255, 0, 0);
  rect(eyeX, eyeY, 5, 5);

  fill(0);
  arc(0, 25 + sin(frameCount * 0.2) * 5, 35, 25, 0, PI);

  fill(255);
  triangle(-10, 25, -5, 35, 0, 25);
  triangle(10, 25, 5, 35, 0, 25);

  pop();
}

function drawAura(W, H) {
  noFill();
  stroke(0, 255, 255, 80);
  strokeWeight(2);
  ellipse(0, 0, 120 + sin(frameCount * 0.1) * 20);
}

function drawAntenna() {
  stroke(0, 255, 255);
  strokeWeight(3);

  line(-20, -50, -30, -70);
  line(20, -50, 30, -70);

  noStroke();
  fill(255, 0, 0);

  ellipse(-30, -70, 8);
  ellipse(30, -70, 8);
}

function drawTail() {
  noFill();
  stroke(255, 0, 255);
  strokeWeight(4);

  beginShape();

  for (let i = 0; i < 10; i++) {
    let tx = sin(frameCount * 0.1 + i) * 10;
    let ty = i * 10 + 40;

    vertex(tx, ty);
  }

  endShape();
}

function mousePressed() {
  monsterColor = color(random(255), random(255), random(255));
  isEating = true;
}

function mouseReleased() {
  isEating = false;
}