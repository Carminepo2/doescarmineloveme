

export default class Heart {
  constructor(x, y, opacity, vy, size, color) {
    this.x = x;
    this.y = y;
    this.opacity = opacity;
    this.vy = vy;
    this.size = size;
    this.color = color;
  }

  draw(c) {
    c.beginPath();
    c.globalAlpha = this.opacity;
    var hc = this.heartEquation(this.x, this.y, this.size);
    for (var i = 0; i < hc.length; i++) {
      c.lineTo(hc[i].x, hc[i].y);
    }
    c.fillStyle = this.color;
    c.fill();
  }

  heartEquation(x, y, r) {
    
    var cordinates = [];
    var pi = Math.PI;
    for (var t = 0; t <= 360; t++) {
      var tr = (t * pi) / 180;
      cordinates[t] = {
        x: x - 16 * r * Math.sin(tr) * Math.sin(tr) * Math.sin(tr),
        y: y - (13 * r * Math.cos(tr) - 5 * r * Math.cos(2 * tr) - 2 * r * Math.cos(3 * tr) - r * Math.cos(4 * tr)),
      };
    }
    return cordinates;   
  }

  update(c) {
    if (this.y >= c - 40 || this.y < 0) {
      this.vy = -this.vy;
    }
    this.y += this.vy;
  }
}