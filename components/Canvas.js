import React, { useRef, useEffect, useState } from "react";
import { getCordinatesOnHeartShape, getRandomArbitrary, getRandomIntInclusive } from "../public/utils";

class Heart {
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
    var hc = getCordinatesOnHeartShape(this.x, this.y, this.size);
    for (var i = 0; i < hc.length; i++) {
      c.lineTo(hc[i].x, hc[i].y);
    }
    c.fillStyle = this.color;
    c.fill();
  }

  update(c) {
    if (this.y >= c - 40 || this.y < 0) {
      this.vy = -this.vy;
    }
    this.y += this.vy;
  }
}

function drawBackground(c, width, height) {
  c.globalAlpha = 1;
  c.fillStyle = "#fff";
  c.fillRect(0, 0, width, height);
}

const Background = ({ fps, msg, heartsNumber }) => {
  const canvasRef = useRef(null);
  const canvasWrite = useRef(null);

  const [windowSize, setWindowSize] = useState({ width: null, height: null });
  const COLOR_PALETTE = ["#fe7f6c", "#fec1b2", "#fbc8d6", "#f0a1a5", "#f70424"];
  let resizeTimer;
  let animationFrameId;

  const getWindowSize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, 250);
  };
  useEffect(() => {
    window.addEventListener("resize", getWindowSize);
    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, []);

  useEffect(() => {
    let heartSize = {};
    let fontSize;
    if (window.innerWidth > 1300) {
      heartSize = {
        min: 5,
        max: 12,
      };
      fontSize = 300;

    }
    else if (window.innerWidth > 1050) {
      heartSize = {
        min: 4,
        max: 11,
      };
      fontSize = 250;
    } else if (window.innerWidth > 900) {
      heartSize = {
        min: 4,
        max: 11,
      };
      fontSize = 200;
    } else if (window.innerWidth > 720) {
      heartSize = {
        min: 4,
        max: 10,
      };
      fontSize = 170;
    } else if (window.innerWidth > 550) {
      heartSize = {
        min: 2,
        max: 6,
      };
      fontSize = 130;
    } else if (window.innerWidth > 450) {
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

    const canvas = canvasRef.current;
    const canvas2 = canvasWrite.current;

    const c = canvas.getContext("2d");
    const c2 = canvas2.getContext("2d");

    let dpi = window.devicePixelRatio;

    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

    canvas.setAttribute("height", style_height * dpi);
    canvas.setAttribute("width", style_width * dpi);
    canvas2.setAttribute("height", style_height * dpi);
    canvas2.setAttribute("width", style_width * dpi);

    c2.beginPath();
    c2.fillStyle = "white";
    c2.rect(0, 0, canvas.width, canvas.height);
    c2.fill();
    c2.textAlign = "center";
    c2.textBaseline = "middle";
    c2.font = `900 ${fontSize * dpi}pt Arial`;
    c2.globalCompositeOperation = "xor";
    c2.shadowColor="red";
    c2.shadowBlur=100;
    c2.beginPath();
    c2.fillText(msg, canvas.width / 2, canvas.height / 2);
    c2.fill();

    let hearts = [];
    for (let i = 0; i < heartsNumber; i++) {
      // CREAZIONE CUORI
      const random_size = getRandomIntInclusive(heartSize.min * dpi, heartSize.max * dpi);
      const random_color = COLOR_PALETTE[getRandomIntInclusive(0, COLOR_PALETTE.length - 1)];
      const random_x = getRandomIntInclusive(0 + random_size, canvas.width - random_size);
      const random_y = getRandomIntInclusive(0 + random_size, canvas.height - random_size);
      const random_opacity = getRandomArbitrary(0.4, 0.6);
      const random_vy = getRandomArbitrary(-0.6, 0.6) * dpi;

      hearts.push(new Heart(random_x, random_y, random_opacity, random_vy, random_size, random_color));
      //
    }
    const render = () => {
      drawBackground(c, canvas.width, canvas.height);

      hearts.forEach((heart) => {
        heart.draw(c);
        heart.update(canvas.height);
      });

      animationFrameId = setTimeout(() => {
        window.requestAnimationFrame(render);
      }, 1000 / fps);
    };
    render();

    return () => {
      clearTimeout(animationFrameId);
    };
  }, [windowSize]);

  return (
    <>
    <main>
      <div id="container">
          <canvas  id="background" ref={canvasRef} />
          <canvas id="write" ref={canvasWrite} />
      </div>
    </main>
      
      

      <style jsx>{`
        #container {
          position: relative;
          height: 80vh;
          width: 80vw;
        }
        main {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        #background {
          width: 100%;
          height: 100%;            
          position: absolute !important;
          top: 0;
          left: 0;
          z-index: -1;
        }
        
        #write {
          z-index: 99;
        }
        canvas {
          height: 100%;
          width: 100%;
        }
        @media screen and (min-width: 2501px) {
          #container {
            width: 60vw;
          }
        }
        @media screen and (min-width: 2051px) {
          #container {
            width: 70vw;
          }
        }
        @media screen and (max-width: 1741px) {
          #container {
            width: 100vw;
          }
        }

        @media screen and (max-height: 500px) {
          #container {
            height: 100vh;
          }
        }

      `}</style>
    </>
  );
};
export default Background;
