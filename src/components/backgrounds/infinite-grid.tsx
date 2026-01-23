"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

interface InfiniteGridProps {
  cellSize?: number;
  lineWidth?: number;
  speed?: number;
  perspective?: boolean;
  className?: string;
  fadeEdges?: boolean;
}

export function InfiniteGrid({
  cellSize = 60,
  lineWidth = 1,
  speed = 0.5,
  perspective = true,
  className = "",
  fadeEdges = true,
}: InfiniteGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { direction } = useTheme();
  const animRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener("resize", resize);

    const getColor = () => {
      switch (direction) {
        case "cyberpunk": return { r: 0, g: 255, b: 255 };
        case "kinetic": return { r: 139, g: 92, b: 246 };
        case "luxury": return { r: 196, g: 168, b: 72 };
        default: return { r: 232, g: 93, b: 47 };
      }
    };

    let offsetY = 0;
    const width = () => canvas.offsetWidth;
    const height = () => canvas.offsetHeight;

    const animate = () => {
      offsetY = (offsetY + speed) % cellSize;

      ctx.clearRect(0, 0, width(), height());
      const color = getColor();

      const cols = Math.ceil(width() / cellSize) + 2;
      const rows = Math.ceil(height() / cellSize) + 2;

      for (let row = -1; row <= rows; row++) {
        for (let col = -1; col <= cols; col++) {
          const x = col * cellSize;
          const y = row * cellSize + offsetY;

          let alpha = 0.15;

          if (perspective) {
            const yProgress = y / height();
            alpha = 0.05 + yProgress * 0.3;
          }

          if (fadeEdges) {
            const edgeDist = Math.min(
              x / width(),
              (width() - x) / width(),
              y / height(),
              (height() - y) / height()
            );
            alpha *= Math.min(1, edgeDist * 4);
          }

          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
          ctx.lineWidth = lineWidth;

          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height());
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width(), y);
          ctx.stroke();
        }
      }

      if (perspective) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height());
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.8)");
        gradient.addColorStop(0.3, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width(), height());
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [cellSize, lineWidth, speed, perspective, fadeEdges, direction]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
