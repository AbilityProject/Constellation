
class Star {
  
  constructor(x, y, s){
  this.x = x;
  this.y = y;

  this.s = s;
  this.splus = 0;
  this.soffset = 0.005;
  }
  
  update() {
    // this.splus += this.soffset;
    // this.s += this.splus;
  }
  
  checkEdge() {
    if (this.splus >= 0.2 || this.splus <= -0.2) {
      this.soffset *= -1;
    }
  }

  display() {
    image(star2, this.x, this.y, this.s, this.s);
    image(star1, this.y, this.x, this.s, this.s);
  }
}