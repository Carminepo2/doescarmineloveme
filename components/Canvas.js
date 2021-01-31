import React, { useRef, useEffect, useState } from "react";
import { getRandomArbitrary, getRandomIntInclusive, getResponsiveCanvas, drawBackground } from "../public/utils";
import Heart from "./../public/Heart"


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
    
    const [ heartSize, fontSize ] = getResponsiveCanvas(window.innerWidth)

    const canvas = canvasRef.current;
    const canvas2 = canvasWrite.current;

    const c = canvas.getContext("2d");
    const c2 = canvas2.getContext("2d");


    // Adapts the canvas to the device pixel ratio
    let dpi = window.devicePixelRatio;

    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

    canvas.setAttribute("height", style_height * dpi);
    canvas.setAttribute("width", style_width * dpi);
    canvas2.setAttribute("height", style_height * dpi);
    canvas2.setAttribute("width", style_width * dpi);


    // Writes the message
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


    // Spawn heart based on heartsNumber passed prop
    let hearts = [];
    for (let i = 0; i < heartsNumber; i++) {
      const random_size = getRandomIntInclusive(heartSize.min * dpi, heartSize.max * dpi);
      const random_color = COLOR_PALETTE[getRandomIntInclusive(0, COLOR_PALETTE.length - 1)];
      const random_x = getRandomIntInclusive(0 + random_size, canvas.width - random_size);
      const random_y = getRandomIntInclusive(0 + random_size, canvas.height - random_size);
      const random_opacity = getRandomArbitrary(0.4, 0.6);
      const random_vy = getRandomArbitrary(-0.6, 0.6) * dpi;

      hearts.push(new Heart(random_x, random_y, random_opacity, random_vy, random_size, random_color));
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
