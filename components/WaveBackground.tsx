import React, { useEffect, useRef, useState } from "react";
import { alpha, Box } from "@mantine/core";

export function WaveBackground() {
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const wave3Ref = useRef<SVGPathElement>(null);
  const wave4Ref = useRef<SVGPathElement>(null);
    const colors = [
      'var(--mantine-color-neoRed-9)',
      'var(--mantine-color-neoRed-6)',
      'var(--mantine-color-neoRed-4)',
      'var(--mantine-color-neoOrange-8)',
      'var(--mantine-color-neoOrange-6)',
      'var(--mantine-color-neoGold-2)',
      'var(--mantine-color-neoGold-6)',
      'var(--mantine-color-neoGreen-9)',
      'var(--mantine-color-neoGreen-2)',
      'var(--mantine-color-neoLightBlue-9)',
      'var(--mantine-color-neoLightBlue-7)',
      'var(--mantine-color-neoBlue-9)',
      'var(--mantine-color-neoBlue-3)',
      'var(--mantine-color-neoPurple-9)',
      'var(--mantine-color-neoPurple-5)',
      'var(--mantine-color-neoPink-9)',
      'var(--mantine-color-neoPink-7)',
      'var(--mantine-color-neoPink-6)',
      'rgb(255,255,255)'
    ];
  const [randomColor, setRandomColor] = useState(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  });

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setRandomColor(newColor);
    }, 5 * 60 * 1000);
    
    return () => clearInterval(colorInterval);
  }, []);
  const strokeColor = alpha(randomColor, 0.2);

  useEffect(() => {
    let t1 = 0;
    let t2 = Math.PI / 3;
    let t3 = (2 * Math.PI) / 3;
    let t4 = Math.PI;
    let animationFrameId: number;

    const animate = () => {
      if (
        wave1Ref.current &&
        wave2Ref.current &&
        wave3Ref.current &&
        wave4Ref.current
      ) {
        // First wave - positioned at 20% height
        t1 += 0.01;
        const y1 = 200;
        const cp1y1 = y1 - 70 + Math.cos(t1 * 0.7) * 50;
        const cp2y1 = y1 + Math.sin(t1 * 0.5) * 50;
        wave1Ref.current.setAttribute(
          "d",
          `M0,${y1 + Math.sin(t1) * 30} Q250,${cp1y1} 500,${cp2y1} T1000,${y1 + Math.sin(t1 * 0.3) * 30} V1000 H0 Z`
        );

        // Second wave - positioned at 40% height
        t2 += 0.009;
        const y2 = 400;
        const cp1y2 = y2 - 70 + Math.sin(t2 * 0.6) * 60;
        const cp2y2 = y2 + Math.cos(t2 * 0.4) * 50;
        wave2Ref.current.setAttribute(
          "d",
          `M0,${y2 + Math.cos(t2) * 20} Q250,${cp1y2} 500,${cp2y2} T1000,${y2 + Math.cos(t2 * 0.5) * 30} V1000 H0 Z`
        );

        // Third wave - positioned at 60% height
        t3 += 0.011;
        const y3 = 600;
        const cp1y3 = y3 - 70 + Math.sin(t3 * 0.8) * 70;
        const cp2y3 = y3 + Math.cos(t3 * 0.6) * 40;
        wave3Ref.current.setAttribute(
          "d",
          `M0,${y3 + Math.sin(t3) * 25} Q250,${cp1y3} 500,${cp2y3} T1000,${y3 + Math.sin(t3 * 0.4) * 35} V1000 H0 Z`
        );

        // Fourth wave - positioned at 80% height
        t4 += 0.008;
        const y4 = 800;
        const cp1y4 = y4 - 70 + Math.cos(t4 * 0.5) * 60;
        const cp2y4 = y4 + Math.sin(t4 * 0.7) * 50;
        wave4Ref.current.setAttribute(
          "d",
          `M0,${y4 + Math.cos(t4) * 20} Q250,${cp1y4} 500,${cp2y4} T1000,${y4 + Math.cos(t4 * 0.6) * 25} V1000 H0 Z`
        );
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
          ref={wave1Ref}
          d="M0,200 Q250,130 500,200 T1000,200 V1000 H0 Z"
          fill={strokeColor}
          stroke="none"
        />
        <path
          ref={wave2Ref}
          d="M0,400 Q250,330 500,400 T1000,400 V1000 H0 Z"
          fill={strokeColor}
          stroke="none"
        />
        <path
          ref={wave3Ref}
          d="M0,600 Q250,530 500,600 T1000,600 V1000 H0 Z"
          fill={strokeColor}
          stroke="none"
        />
        <path
          ref={wave4Ref}
          d="M0,375 Q250,225 500,375 T1000,375 V1000 H0 Z"
          fill={strokeColor}
          stroke="none"
        />
      </svg>
    </Box>
  );
}