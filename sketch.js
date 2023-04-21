let shapes = [];
let weight = 10;
let velocity = 3;
let count = 20;
let circle;
let square;
let tri;
let button;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //side panel
  let sidePanel = createDiv();
  sidePanel.style("position", "absolute");
  sidePanel.style("top", "0");
  sidePanel.style("left", "0");
  sidePanel.style("width", "200px");
  sidePanel.style("height", windowHeight + "px");
  sidePanel.style("background-color", "#ccc");
  sidePanel.style("z-index", "1");

  // stroke width slider
  strokeWidthSlider = createSlider(0, 20, weight, 1);
  strokeWidthSlider.parent(sidePanel);
  strokeWidthSlider.position(10, 50);
  strokeWidthSlider.style("width", "125px");
  strokeWidthSlider.style("z-index", "2");

  //stroke width label
  let velocityLabel = createP("Velocity:");
  velocityLabel.style("position", "absolute");
  velocityLabel.style("top", "70px");
  velocityLabel.style("left", "10px");
  velocityLabel.style("font-size", "18px");
  velocityLabel.style("color", "#000");
  velocityLabel.style("z-index", "3");

  // move slider
  velocitySlider = createSlider(0, 20, velocity, 1);
  velocitySlider.parent(sidePanel);
  velocitySlider.position(10, 110);
  velocitySlider.style("width", "125px");
  velocitySlider.style("z-index", "2");

  //stroke width label
  let strokeWidthLabel = createP("Stroke Width:");
  strokeWidthLabel.style("position", "absolute");
  strokeWidthLabel.style("top", "10px");
  strokeWidthLabel.style("left", "10px");
  strokeWidthLabel.style("font-size", "18px");
  strokeWidthLabel.style("color", "#000");
  strokeWidthLabel.style("z-index", "3");

  // shape label
  let shape = createP("Choose Shape:");
  shape.style("position", "absolute");
  shape.style("top", "120px");
  shape.style("left", "10px");
  shape.style("font-size", "18px");
  shape.style("color", "#000");
  shape.style("z-index", "3");

  //checkboxes
  circle = createCheckbox("Circle", true);
  circle.changed(clearInactiveCheckbox.bind(circle));
  circle.position(10, 170);
  circle.style("z-index", "3");

  square = createCheckbox("Square", false);
  square.changed(clearInactiveCheckbox.bind(square));
  square.position(10, 200);
  square.style("z-index", "3");

  tri = createCheckbox("Triangle", false);
  tri.changed(clearInactiveCheckbox.bind(tri));
  tri.position(10, 230);
  tri.style("z-index", "3");

  //reset canvas button
  button = createButton("Reset Canvas");
  button.position(40, 275);
  button.style("z-index", "3");
  button.mousePressed(refillShapesArray);

  // shape label
  let directions = createP("*Mouseover changes fill!");
  directions.style("position", "absolute");
  directions.style("top", "320px");
  directions.style("left", "10px");
  directions.style("font-size", "18px");
  directions.style("color", "#000");
  directions.style("z-index", "3");

  //create and add new shape to shapes array
  for (let i = 0; i < count; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 60);
    let b = new Shape(x, y, r);
    shapes.push(b);
  }
}

function draw() {
  background(0);
  weight = strokeWidthSlider.value();
  velocity = velocitySlider.value();
  //check if you have moused over a shape
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].contains(mouseX, mouseY)) {
      shapes[i].changeColor();
    }
    shapes[i].move();
    shapes[i].show();
  }
  noStroke();
}

//add back missing number of shapes
function refillShapesArray() {
  for (let i = 0; i < count - shapes.length; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 60);
    let b = new Shape(x, y, r);
    shapes.push(b);
  }
}

//change fill color of shape
function mouseMoved() {
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].contains(mouseX, mouseY)) {
      shapes[i].changeColor();
    }
  }
}

//remove shape on mouse Pressed
function mousePressed() {
  for (let i = shapes.length - 1; i >= 0; i--) {
    if (shapes[i].contains(mouseX, mouseY)) {
      shapes.splice(i, 1);
    }
  }
}

//only one checkbox checked at a time
function clearInactiveCheckbox() {
  if (circle.checked() && !square.checked() && !tri.checked()) {
    return;
  }
  if (square.checked() && !circle.checked() && !tri.checked()) {
    return;
  }
  if (tri.checked() && !circle.checked() && !square.checked()) {
    return;
  }
  circle.checked(false);
  square.checked(false);
  tri.checked(false);
  if (this == circle) {
    circle.checked(true);
  } else if (this == square) {
    square.checked(true);
  } else if (this == tri) {
    tri.checked(true);
  }
}

class Shape {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color(255);
  }

  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.x = this.x + random(-Math.abs(velocity), velocity);
    this.y = this.y + random(-Math.abs(velocity), velocity);
  }

  show() {
    stroke(255);
    strokeWeight(weight);
    fill(this.color);
    if (circle.checked()) {
      ellipse(this.x, this.y, this.r * 3);
    }
    if (square.checked()) {
      rectMode(CENTER);
      rect(this.x, this.y, this.r * 2, this.r * 2);
    }
    if (tri.checked()) {
      triangle(
        this.x - this.r,
        this.y + this.r,
        this.x + this.r,
        this.y + this.r,
        this.x,
        this.y - this.r
      );
    }
  }
}
