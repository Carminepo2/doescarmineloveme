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

const Background = ({ answerElem }) => {
  const canvasRef = useRef(null);
  const answerRef = useRef(null);

  const [windowSize, setWindowSize] = useState({ width: null, height: null });
  const COLOR_PALETTE = ["#fe7f6c", "#fec1b2", "#fbc8d6", "#f0a1a5", "#f70424"];

  const getWindowSize = () => {
    const answerElemSizes = answerRef.current.getBoundingClientRect();
    setWindowSize({ width: answerElemSizes.width, height: answerElemSizes.height });
  };
  useEffect(() => {
    window.addEventListener("resize", getWindowSize);
    return () => {
      window.removeEventListener("resize", getWindowSize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const answerElemSizes = answerRef.current.getBoundingClientRect();
    canvas.height = answerElemSizes.height;
    canvas.width = answerElemSizes.width;
    const c = canvas.getContext("2d");

    let animationFrameId;
    let hearts = [];
    let heartSize = {};
    for (let i = 0; i < 20; i++) {
      // CREAZIONE CUORI
      if (window.innerWidth > 900) {
        heartSize = {
          min: 6,
          max: 11,
        };
      } else if (window.innerWidth > 650) {
        heartSize = {
          min: 5,
          max: 9,
        };
      } else if (window.innerWidth > 450) {
        heartSize = {
          min: 3,
          max: 7,
        };
      } else {
        heartSize = {
          min: 3,
          max: 5,
        };
      }
      const random_size = getRandomIntInclusive(heartSize.min, heartSize.max);
      const random_color = COLOR_PALETTE[getRandomIntInclusive(0, COLOR_PALETTE.length - 1)];
      const random_x = getRandomIntInclusive(0 + random_size, canvas.width - random_size);
      const random_y = getRandomIntInclusive(0 + random_size, canvas.height - random_size);
      const random_opacity = getRandomArbitrary(0.2, 0.5);
      const random_vy = getRandomArbitrary(-0.5, 0.5);
      hearts.push(new Heart(random_x, random_y, random_opacity, random_vy, random_size, random_color));
      //
    }
    const render = () => {
      drawBackground(c, canvas.width, canvas.height);

      hearts.forEach((heart) => {
        heart.draw(c);
        heart.update(canvas.height);
      });
      answerRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`;

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [windowSize]);

  return (
    <>
      <canvas ref={canvasRef} />
      <main>
        <h1 ref={answerRef}>
          Sì<span>,&nbsp; tanto</span>
        </h1>
      </main>

      <style jsx>{`
        main {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        canvas {
          display: none;
        }
        h1 {
          font-size: 50vw;
          font-weight: 900;
          display: inline-block;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        h1 span {
          font-size: 5vw;
          line-spacing: 20px;
        }
      `}</style>
    </>
  );
};
export default Background;
