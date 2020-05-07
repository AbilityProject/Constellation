var stars = [];
var starsNum = 20;

var starryNum = 0;

var constellations;

function setup() {  
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < starsNum; i++) {
    const x = random(width);
    const y = random(height);
    const size = random(1, 15);
    stars.push(new Star(x, y, 5, size, size, [255, 255, 255]));
    stars.push(new Star(y, x, 4, size, size, [255, 255, 255]));
  }
  
  constellations = [];
  
  for (const key in coordinates){
    constellations.push(new Constellation(key, coordinates[key].coords, coordinates[key].lines, coordinates[key].color));
  }
}

function draw() {
   background(0, 90);

  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
  }
  
  constellations[starryNum].display();
  
  if (constellations[starryNum].is_done()){
    constellations[starryNum].reset()
    starryNum = (starryNum + 1) % Object.keys(constellations).length;
  }
}