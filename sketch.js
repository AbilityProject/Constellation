var stars = [];
var Star;
var starsNum = 20;

var star1;
var star2;
var colorstar1, colorstar2, colorstar3, colorstar4;

var colorstars = [];
var colorStar;
var colornum;

var shootingstars = [];
var ShootingStar;

var starryNum = 0;

var constellations;

function preload() {
  star1 = loadImage("images/star1.png");
  star2 = loadImage("images/star2.png");
  colorstar1 = loadImage("images/colorstar1.png");
  colorstar2 = loadImage("images/colorstar2.png");
  colorstar3 = loadImage("images/colorstar3.png");
  colorstar4 = loadImage("images/colorstar4.png");
}

function setup() {
  // fullscreen(true);
  
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < starsNum; i++) {
    stars[i] = new Star(random(width), random(height), random(1, 25));
  }
  

  constellations = [];
  
  for (const key in coordinates){
    constellations.push(new Constellation(key, coordinates[key].coords, coordinates[key].lines));
  }
}

function draw() {
   background(0, 90);

  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].checkEdge();
    stars[i].display();
  }
  
  constellations[starryNum].display();
  
  if (constellations[starryNum].is_done()){
    constellations[starryNum].reset()
    starryNum = (starryNum + 1) % Object.keys(constellations).length;
  }
  
}

function colorStar(x, y, s) {
  this.x = x;
  this.y = y;

  this.s = s;
  this.splus = 0;
  this.soffset = 0.001;
  this.timer = 0;
  this.grow = true;
  this.pulse = false;

  this.update = function() {
    if (this.grow) {
      this.s += 0.1
    }
    if (this.s >= 25){
      this.s = 25
      this.grow = false
      this.pulse = true
    }
    if (this.pulse){
      this.splus += this.soffset * 2;
      this.s -= this.splus;
      this.timer += 0.005;
    }
    if (this.timer >= 2.5){
      this.pulse = false;
    }
    if (!this.grow && !this.pulse){
      this.s -= 0.1;
    }
  }

  this.checkEdge = function() {
    if (this.pulse){
      if (this.splus >= 0.1 || this.splus <= -0.1) {
        this.soffset *= -1;
      }
    }
  }
  
  this.isDone = function(){
    if (!this.grow && this.s <= 0){
      return true;
    }
    return false;
  }
  
  this.reset = function(){
    this.timer = 0;
    this.grow = true;
    this.pulse = false;
    this.s = 0;
    this.splus = 0;
    this.soffset = 0.001;
  }

  this.display = function() {
    image(colorstar4, this.x, this.y, this.s, this.s);
  }
  
  this.display2 = function() {
    image(colorstar4, this.x, this.y, this.s, this.s);
  }
}

function Star(x, y, s) {
  this.x = x;
  this.y = y;

  this.s = s;
  this.splus = 0;
  this.soffset = 0.005;
  this.a = this.a;
  this.update = function() {
    // this.splus += this.soffset;
    // this.s += this.splus;
  }
  this.checkEdge = function() {


    if (this.splus >= 0.2 || this.splus <= -0.2) {
      this.soffset *= -1;
    }
  }

  this.display = function() {

    image(star2, this.x, this.y, this.s, this.s);
    image(star1, this.y, this.x, this.s, this.s);


  }
  
}