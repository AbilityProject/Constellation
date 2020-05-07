class Star {
  constructor(centerX, centerY, numPoints, startSize, endSize, color){
    this.centerX = centerX;
    this.centerY = centerY;
    this.startSize = startSize
    this.endSize = endSize;
    this.size = startSize;
    this.color = color;
    this.numPoints = numPoints;
    
    this.splus = 0;
    this.soffset = 0.001;
    this.timer = 0;
    this.grow = true;
    this.pulse = false;
  }
  
  drawVertices(){
    let angle = TWO_PI / this.numPoints;
    let halfAngle = angle / 2.0;
    const longRadius = this.size * 0.8 / 2;
    const shortRadius = this.size * 0.8 / 4;
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = this.centerX + cos(a - TWO_PI/4) * longRadius;
      let sy = this.centerY + sin(a - TWO_PI/4) * longRadius;
      vertex(sx, sy);
      sx = this.centerX + cos(a + halfAngle - TWO_PI/4) * shortRadius;
      sy = this.centerY + sin(a + halfAngle - TWO_PI/4) * shortRadius;
      vertex(sx, sy);
    }
  }
  
  display(){
    strokeWeight(0);
    fill(...this.color, 125);
    circle(this.centerX, this.centerY, this.size);
    stroke(255);
    strokeWeight(0.5);
    fill(...this.color);
    beginShape();
    this.drawVertices();
    endShape(CLOSE);
  }
  
  update() {
    if (this.grow) {
      this.size += 0.1
    }
    if (this.size >= this.endSize){
      this.size = this.endSize
      this.grow = false
      this.pulse = true
    }
    if (this.pulse){
      this.splus += this.soffset * 2;
      this.size -= this.splus;
      this.timer += 0.005;
    }
    if (this.timer >= 2.5){
      this.pulse = false;
    }
    if (!this.grow && !this.pulse){
      this.size -= 0.1;
    }
  }

  checkEdge(){
    if (this.pulse){
      if (this.splus >= 0.1 || this.splus <= -0.1) {
        this.soffset *= -1;
      }
    }
  }
  
  isDone(){
    if (!this.grow && this.size <= 0){
      return true;
    }
    return false;
  }
  
  reset(){
    this.timer = 0;
    this.grow = true;
    this.pulse = false;
    this.size = 0;
    this.splus = 0;
    this.soffset = 0.001;
  }
}