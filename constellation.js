class Constellation{
  constructor(name, coords, lines){
    this.coords = coords;
    this.lines = lines;
    this.translate();
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
  
  translate(){
    const [centerX, centerY] = this.getCenter();
    const diffX = width/2 - centerX;
    const diffY = height/2- centerY;
    for (let c = 0; c < this.coords.length; c++){
      this.coords[c][0] += diffX;
      this.coords[c][1] += diffY;
    }
    
    for (let paths = 0; paths < this.lines.length; paths++){
      let coordIndex = 0;
      while (coordIndex < this.lines[paths].length){
        this.lines[paths][coordIndex] += diffX;
        this.lines[paths][coordIndex + 1] += diffY;
        coordIndex += 2;
      }
    }
    
  }
  
  getCenter(){
    let minX = this.coords[0][0];
    let maxX = this.coords[0][0];
    let minY = this.coords[0][1];
    let maxY = this.coords[0][1];
    for (let c = 1; c < this.coords.length; c++){
      minX = min(this.coords[c][0], minX);
      maxX = max(this.coords[c][0], maxX);
      minY = min(this.coords[c][1], minY);
      maxY = max(this.coords[c][1], maxY);
    }
    return [(minX + maxX)/2 , (minY + maxY) / 2];
  }
}