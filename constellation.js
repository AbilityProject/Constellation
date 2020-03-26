class Constellation{
  constructor(name, coords, lines){
    this.coords = coords;
    this.lines = lines;
    this.stars = [];
    for (let c = 0; c < this.coords.length; c++){
      this.stars[c] = new colorStar(coords[c][0], coords[c][1], 0);
    }
    this.name = name;
    this.lineWeight = 4;
  }
  
  display(){
    textSize(height/10);
    fill(255)
    text(this.name, width/4, height/10);
    this.drawLines();
    for (let s = 0; s < this.stars.length; s++){
      this.stars[s].update();
      this.stars[s].checkEdge();
      this.stars[s].display();
    }
    
  }
  
  drawLines(){
    
    const half = this.stars[0].s / 2;
    for (let paths = 0; paths < this.lines.length; paths++){
      let coordOne = 0;
      let coordTwo = 2;
      while (coordTwo < this.lines[paths].length){
        const coordOneX = this.lines[paths][coordOne];
        const coordOneY = this.lines[paths][coordOne + 1];
        const coordTwoX = this.lines[paths][coordTwo];
        const coordTwoY = this.lines[paths][coordTwo + 1];
        stroke(2 * half / 25 * 255);
        strokeWeight(this.lineWeight);
        line(coordOneX + half, coordOneY + half, coordTwoX + half, coordTwoY + half); 
        coordOne = coordTwo;
        coordTwo += 2;
      }
    }
  }
  
  reset(){
    for (let s = 0; s < this.stars.length; s++){
      this.stars[s].reset();
    }
  }
  
  is_done(){
    return this.stars[0].isDone();
  }
}