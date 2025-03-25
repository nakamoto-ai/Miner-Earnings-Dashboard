import React, { useEffect, useRef } from "react";
import { Box, Image } from "@mantine/core";

export function SquiggleBackground() {
  const squiggle1Ref = useRef<SVGPathElement>(null);
  const squiggle2Ref = useRef<SVGPathElement>(null);
  const squiggle3Ref = useRef<SVGPathElement>(null);
  const squiggle4Ref = useRef<SVGPathElement>(null);
  const strokeColor = "rgba(255, 255, 255, .5";

  useEffect(() => {
    let t1 = 0;
    let t2 = Math.PI / 3;
    let t3 = (2 * Math.PI) / 3;
    let t4 = Math.PI;
    let animationFrameId: number;

    const animate = () => {
      if (
        squiggle1Ref.current &&
        squiggle2Ref.current &&
        squiggle3Ref.current &&
        squiggle4Ref.current
      ) {
        // First squiggle - positioned at 20% height
        t1 += 0.01;
        const y1 = 200;
        const cp1y1 = y1 - 70 + Math.cos(t1 * 0.7) * 50;
        const cp2y1 = y1 + Math.sin(t1 * 0.5) * 50;
        squiggle1Ref.current.setAttribute(
          "d",
          `M0,${y1 + Math.sin(t1) * 30} Q250,${cp1y1} 500,${cp2y1} T1000,${y1 + Math.sin(t1 * 0.3) * 30}`,
        );
        // Dynamic stroke width for squiggle 1
        const width1 = 90 + Math.sin(t1 * 0.8) * 20;
        squiggle1Ref.current.setAttribute("stroke-width", width1.toString());

        // Second squiggle - positioned at 40% height
        t2 += 0.009;
        const y2 = 400;
        const cp1y2 = y2 - 70 + Math.sin(t2 * 0.6) * 60;
        const cp2y2 = y2 + Math.cos(t2 * 0.4) * 50;
        squiggle2Ref.current.setAttribute(
          "d",
          `M0,${y2 + Math.cos(t2) * 20} Q250,${cp1y2} 500,${cp2y2} T1000,${y2 + Math.cos(t2 * 0.5) * 30}`,
        );
        // Dynamic stroke width for squiggle 2
        const width2 = 100 + Math.cos(t2 * 0.7) * 25;
        squiggle2Ref.current.setAttribute("stroke-width", width2.toString());

        // Third squiggle - positioned at 60% height
        t3 += 0.011;
        const y3 = 600;
        const cp1y3 = y3 - 70 + Math.sin(t3 * 0.8) * 70;
        const cp2y3 = y3 + Math.cos(t3 * 0.6) * 40;
        squiggle3Ref.current.setAttribute(
          "d",
          `M0,${y3 + Math.sin(t3) * 25} Q250,${cp1y3} 500,${cp2y3} T1000,${y3 + Math.sin(t3 * 0.4) * 35}`,
        );
        // Dynamic stroke width for squiggle 3
        const width3 = 110 + Math.sin(t3 * 0.6) * 15;
        squiggle3Ref.current.setAttribute("stroke-width", width3.toString());

        // Fourth squiggle - positioned at 80% height
        t4 += 0.008;
        const y4 = 800;
        const cp1y4 = y4 - 70 + Math.cos(t4 * 0.5) * 60;
        const cp2y4 = y4 + Math.sin(t4 * 0.7) * 50;
        squiggle4Ref.current.setAttribute(
          "d",
          `M0,${y4 + Math.cos(t4) * 20} Q250,${cp1y4} 500,${cp2y4} T1000,${y4 + Math.cos(t4 * 0.6) * 25}`,
        );
        // Dynamic stroke width for squiggle 4
        const width4 = 95 + Math.cos(t4 * 0.9) * 20;
        squiggle4Ref.current.setAttribute("stroke-width", width4.toString());
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        <path
          ref={squiggle1Ref}
          d="M0,250 Q250,100 500,250 T1000,250"
          fill="none"
          stroke={strokeColor}
          strokeWidth="100"
          strokeLinecap="round"
        />
        <path
          ref={squiggle2Ref}
          d="M0,500 Q250,350 500,500 T1000,500"
          fill="none"
          stroke={strokeColor}
          strokeWidth="100"
          strokeLinecap="round"
        />
        <path
          ref={squiggle3Ref}
          d="M0,750 Q250,600 500,750 T1000,750"
          fill="none"
          stroke={strokeColor}
          strokeWidth="100"
          strokeLinecap="round"
        />
        <path
          ref={squiggle4Ref}
          d="M0,375 Q250,225 500,375 T1000,375"
          fill="none"
          stroke={strokeColor}
          strokeWidth="100"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
}
