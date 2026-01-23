"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

interface MeshPoint {
  x: number;
  y: number;
  color: string;
  radius: number;
}

interface GradientMeshProps {
  points?: MeshPoint[];
  speed?: number;
  blur?: number;
  className?: string;
  interactive?: boolean;
}

const DEFAULT_POINTS: Record<string, MeshPoint[]> = {
  luxury: [
    { x: 20, y: 30, color: "hsla(43, 74%, 49%, 0.4)", radius: 300 },
    { x: 80, y: 70, color: "hsla(43, 74%, 49%, 0.2)", radius: 400 },
    { x: 50, y: 50, color: "hsla(0, 0%, 50%, 0.1)", radius: 350 },
  ],
  cyberpunk: [
    { x: 25, y: 25, color: "hsla(174, 100%, 50%, 0.4)", radius: 300 },
    { x: 75, y: 75, color: "hsla(320, 80%, 55%, 0.4)", radius: 300 },
    { x: 50, y: 50, color: "hsla(260, 80%, 50%, 0.2)", radius: 400 },
  ],
  kinetic: [
    { x: 30, y: 30, color: "hsla(263, 70%, 50%, 0.4)", radius: 350 },
    { x: 70, y: 70, color: "hsla(172, 66%, 50%, 0.3)", radius: 300 },
    { x: 50, y: 20, color: "hsla(263, 70%, 50%, 0.2)", radius: 250 },
  ],
  freestyle: [
    { x: 20, y: 40, color: "hsla(16, 85%, 55%, 0.4)", radius: 350 },
    { x: 80, y: 60, color: "hsla(160, 50%, 40%, 0.3)", radius: 300 },
    { x: 50, y: 80, color: "hsla(16, 85%, 55%, 0.2)", radius: 400 },
  ],
};

export function GradientMesh({
  points,
  speed = 0.5,
  blur = 80,
  className = "",
  interactive = false,
}: GradientMeshProps) {
  const { direction } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const mouseRef = useRef({ x: 50, y: 50 });
  const meshPoints = points || DEFAULT_POINTS[direction] || DEFAULT_POINTS.freestyle;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    const animate = () => {
      time += 0.005 * speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      meshPoints.forEach((point, i) => {
        const offsetX = Math.sin(time + i * 1.5) * 50;
        const offsetY = Math.cos(time + i * 2) * 50;

        let px = (point.x / 100) * canvas.width + offsetX;
        let py = (point.y / 100) * canvas.height + offsetY;

        if (interactive) {
          const mx = (mouseRef.current.x / 100) * canvas.width;
          const my = (mouseRef.current.y / 100) * canvas.height;
          const dx = mx - px;
          const dy = my - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            px += dx * 0.1;
            py += dy * 0.1;
          }
        }

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, point.radius);
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [meshPoints, speed, interactive]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  return (
    <div className={`relative overflow-hidden ${className}`} onMouseMove={handleMouseMove}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: `blur(${blur}px)` }}
      />
    </div>
  );
}
