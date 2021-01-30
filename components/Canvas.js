import React, { useRef, useEffect, useState } from "react";
import getCordinatesOnHeartShape from "../public/utils";

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
  c.fillStyle = "#fe7f6c";
  c.fillRect(0, 0, width, height);
}

function writeText(c) {
  c.font = "25px Arial";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.fillText("CENSORED", 0, 0);
}

const Background = (props) => {
  const canvasRef = useRef(null);
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
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const c = canvas.getContext("2d");

    let animationFrameId;
    let hearts = [];
    for (let i = 0; i < 10; i++) {
      // CREAZIONE CUORI
      const random_color = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
      const random_x = Math.random() * canvas.width + 100 - 100;
      const random_y = Math.random() * canvas.height + 100 - 100;
      const random_opacity = Math.random() - 0.6;
      const random_vy = Math.random() - 0.5;
      const random_size = Math.random() * 20 + 20;
      hearts.push(new Heart(random_x, random_y, random_opacity, random_vy, random_size, random_color));
      //
    }
    const render = () => {
      drawBackground(c, canvas.width, canvas.height);

      hearts.forEach((heart) => {
        heart.draw(c);
        heart.update(canvas.height);
      });

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [windowSize]);

  return (
    <>
      <canvas ref={canvasRef} {...props} />

      <svg width="100%" height="100%">
        <mask id="mask">
          <rect width="100%" height="100%" fill="#fe7f6c" />
          <text x="5%" y="95%" fontSize="70vw">
            Sì
          </text>
        </mask>
        <rect width="100%" height="100%" fillOpacity="1" mask="url(#mask)" />
      </svg>

      <style jsx>{`
        canvas,
        svg {
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
        }
        svg {
          z-index: 1;
        }
        text {
          font-weight: 900;
          font-family: Arial;
        }
      `}</style>
    </>
  );
};
export default Background;
