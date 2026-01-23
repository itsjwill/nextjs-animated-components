"use client";

import { useRef, useEffect, useState } from "react";

interface TextDistortionProps {
  text: string;
  className?: string;
  intensity?: number;
  speed?: number;
}

export function TextDistortion({
  text,
  className = "",
  intensity = 20,
  speed = 0.02,
}: TextDistortionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const fontSize = Math.min(rect.width / (text.length * 0.6), rect.height * 0.6);

    const animate = () => {
      timeRef.current += speed;
      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (isHovered) {
        const sliceHeight = 3;
        const totalSlices = Math.ceil(rect.height / sliceHeight);

        for (let i = 0; i < totalSlices; i++) {
          const y = i * sliceHeight;
          const distFromMouse = Math.abs(y - mouseRef.current.y);
          const maxDist = rect.height * 0.5;
          const factor = Math.max(0, 1 - distFromMouse / maxDist);

          const offset =
            Math.sin(timeRef.current * 10 + i * 0.3) * intensity * factor;

          ctx.save();
          ctx.beginPath();
          ctx.rect(0, y, rect.width, sliceHeight);
          ctx.clip();

          ctx.fillStyle = getComputedStyle(canvas).color || "#fff";
          ctx.fillText(text, rect.width / 2 + offset, rect.height / 2);
          ctx.restore();
        }
      } else {
        ctx.fillStyle = getComputedStyle(canvas).color || "#fff";
        ctx.fillText(text, rect.width / 2, rect.height / 2);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [text, isHovered, intensity, speed]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      className={`w-full cursor-pointer text-foreground ${className}`}
      style={{ height: "120px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    />
  );
}
