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

  const getWindowSize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
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
    if (window.innerWidth > 900) {
      heartSize = {
        min: 6,
        max: 11,
      };
      fontSize = "200pt";
    } else if (window.innerWidth > 650) {
      heartSize = {
        min: 5,
        max: 9,
      };
      fontSize = "160pt";
    } else if (window.innerWidth > 450) {
      heartSize = {
        min: 3,
        max: 7,
      };
      fontSize = "130pt";
    } else {
      heartSize = {
        min: 3,
        max: 5,
      };
      fontSize = "80pt";
    }

    const canvas = canvasRef.current;
    const canvas2 = canvasWrite.current;

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    const c = canvas.getContext("2d");
    const c2 = canvas2.getContext("2d");

    c2.beginPath();
    c2.fillStyle = "white";
    c2.rect(0, 0, canvas.width, canvas.height);
    c2.fill();
    c2.textAlign = "center";
    c2.textBaseline = "middle";
    c2.font = "900 " + fontSize + " Roboto";
    c2.globalCompositeOperation = "xor";
    c2.beginPath();
    c2.fillText(msg, canvas.width / 2, canvas.height / 2);
    c2.fill();

    let animationFrameId;
    let hearts = [];
    for (let i = 0; i < heartsNumber; i++) {
      // CREAZIONE CUORI
      const random_size = getRandomIntInclusive(heartSize.min, heartSize.max);
      const random_color = COLOR_PALETTE[getRandomIntInclusive(0, COLOR_PALETTE.length - 1)];
      const random_x = getRandomIntInclusive(0 + random_size, canvas.width - random_size);
      const random_y = getRandomIntInclusive(0 + random_size, canvas.height - random_size);
      const random_opacity = getRandomArbitrary(0.2, 0.5);
      const random_vy = getRandomArbitrary(-0.6, 0.6);

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
      <canvas id="backgroud" ref={canvasRef} />
      <canvas id="write" ref={canvasWrite} />

      <style jsx>{`
        #write,
        #background {
          position: absolute;
          left: 0;
          top: 0;
        }
        #write {
          z-index: 99;
        }
      `}</style>
    </>
  );
};
export default Background;
