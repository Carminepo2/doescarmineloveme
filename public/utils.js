

// Numero Float fra min (incluso) e max (escluso)
export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Numero Integer fra min e max entrambi inclusi
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


export function getResponsiveCanvas(window_width) {
  
  let heartSize = {};
  let fontSize;
  
  if (window_width > 1300) {
    heartSize = {
      min: 5,
      max: 12,
    };
    fontSize = 300;
  
  }
  else if (window_width > 1050) {
    heartSize = {
      min: 4,
      max: 11,
    };
    fontSize = 250;
  } else if (window_width > 900) {
    heartSize = {
      min: 4,
      max: 11,
    };
    fontSize = 200;
  } else if (window_width > 720) {
    heartSize = {
      min: 4,
      max: 10,
    };
    fontSize = 170;
  } else if (window_width > 550) {
    heartSize = {
      min: 2,
      max: 6,
    };
    fontSize = 130;
  } else if (window_width > 450) {
    heartSize = {
      min: 1,
      max: 5,
    };
    fontSize = 100;
  } else {
    heartSize = {
      min: 1,
      max: 5,
    };
    fontSize = 65;
  }
  return [heartSize, fontSize] 
}


export function drawBackground(c, width, height) {
  c.globalAlpha = 1;
  c.fillStyle = "#fff";
  c.fillRect(0, 0, width, height);
}



