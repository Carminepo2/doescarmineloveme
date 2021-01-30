function getCordinatesOnHeartShape(x, y, r) {
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

export default getCordinatesOnHeartShape;
