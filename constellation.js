class Constellation {
  constructor(name, coords, lines, color) {
    this.coords = coords;
    this.lines = lines;
    const starSize = this.scale();
    this.translate();
    this.stars = [];
    this.color = color;
    for (let c = 0; c < this.coords.length; c++) {
      this.stars.push(new Star(coords[c][0], coords[c][1], 5, 0, starSize, this.color))
    }
    this.name = name;
    this.lineWeight = 4;
  }

  display() {
    stroke(0);
    textSize(height / 10);
    fill(...this.color);
    textAlign(CENTER);
    text(this.name, width / 2, height / 10);
    this.drawLines();
    for (let s = 0; s < this.stars.length; s++) {
      this.stars[s].update();
      this.stars[s].checkEdge();
      this.stars[s].display();
    }

  }

  drawLines() {
    const half = this.stars[0].size / 2;
    for (let paths = 0; paths < this.lines.length; paths++) {
      let coordOne = 0;
      let coordTwo = 2;
      while (coordTwo < this.lines[paths].length) {
        const coordOneX = this.lines[paths][coordOne];
        const coordOneY = this.lines[paths][coordOne + 1];
        const coordTwoX = this.lines[paths][coordTwo];
        const coordTwoY = this.lines[paths][coordTwo + 1];
        stroke(...this.color, 2 * half / 25 * 125);
        strokeWeight(this.lineWeight);
        line(coordOneX, coordOneY, coordTwoX, coordTwoY);
        coordOne = coordTwo;
        coordTwo += 2;
      }
    }
  }

  reset() {
    for (let s = 0; s < this.stars.length; s++) {
      this.stars[s].reset();
    }
  }

  is_done() {
    return this.stars[0].isDone();
  }

  translate() {
    const [centerX, centerY] = this.getCenter();
    const diffX = width / 2 - centerX;
    const diffY = (height + height / 10) / 2 - centerY;
    for (let c = 0; c < this.coords.length; c++) {
      this.coords[c][0] += diffX;
      this.coords[c][1] += diffY;
    }

    for (let paths = 0; paths < this.lines.length; paths++) {
      let coordIndex = 0;
      while (coordIndex < this.lines[paths].length) {
        this.lines[paths][coordIndex] += diffX;
        this.lines[paths][coordIndex + 1] += diffY;
        coordIndex += 2;
      }
    }

  }

  getCenter() {
    let minX = this.coords[0][0];
    let maxX = this.coords[0][0];
    let minY = this.coords[0][1];
    let maxY = this.coords[0][1];
    for (let c = 1; c < this.coords.length; c++) {
      minX = min(this.coords[c][0], minX);
      maxX = max(this.coords[c][0], maxX);
      minY = min(this.coords[c][1], minY);
      maxY = max(this.coords[c][1], maxY);
    }
    return [(minX + maxX) / 2, (minY + maxY) / 2];
  }

  scale() {
    const scalingFactor = this.scaleFactor();
    for (let c = 0; c < this.coords.length; c++) {
      this.coords[c][0] *= scalingFactor;
      this.coords[c][1] *= scalingFactor;
    }

    let min_dist = 0;
    for (let paths = 0; paths < this.lines.length; paths++) {
      let coordIndex = 0;
      while (coordIndex < this.lines[paths].length) {
        this.lines[paths][coordIndex] *= scalingFactor;
        this.lines[paths][coordIndex + 1] *= scalingFactor;
        if (coordIndex >= 2) {
          const val = this.distance(this.lines[paths][coordIndex - 2],
            this.lines[paths][coordIndex - 1],
            this.lines[paths][coordIndex],
            this.lines[paths][coordIndex + 1]
          )
          if (min_dist === 0){
            min_dist = val;
          } else if (val < min_dist){
            min_dist = val
          }
        }
        coordIndex += 2;
      }
    }
    return min(Math.floor(2 * min_dist / 3), min(height, width) / 10)
  }

  scaleFactor() {
    let minX = this.coords[0][0];
    let maxX = this.coords[0][0];
    let minY = this.coords[0][1];
    let maxY = this.coords[0][1];
    for (let c = 1; c < this.coords.length; c++) {
      minX = min(this.coords[c][0], minX);
      maxX = max(this.coords[c][0], maxX);
      minY = min(this.coords[c][1], minY);
      maxY = max(this.coords[c][1], maxY);
    }
    const windowHeight = (height - (height / 10)) * 0.75;
    const windowWidth = width * 0.75;
    const constellationHeight = maxY - minY;
    const constellationWidth = maxX - minX;
    return min(windowHeight / constellationHeight, windowWidth / constellationWidth);
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  }
}