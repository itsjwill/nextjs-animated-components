"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

interface FluidCursorProps {
  size?: number;
  trailCount?: number;
  color?: string;
  blend?: boolean;
}

export function FluidCursor({
  size = 20,
  trailCount = 8,
  color,
  blend = true,
}: FluidCursorProps) {
  const { direction } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const positions = useRef<{ x: number; y: number }[]>(
    Array(trailCount).fill({ x: 0, y: 0 })
  );
  const rafId = useRef<number>();

  const cursorColor = color || (
    direction === "cyberpunk" ? "hsl(174 100% 50%)" :
    direction === "kinetic" ? "hsl(263 70% 50%)" :
    direction === "luxury" ? "hsl(43 74% 49%)" :
    "hsl(16 85% 55%)"
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      positions.current = positions.current.map((pos, i) => {
        const target = i === 0 ? mouse.current : positions.current[i - 1];
        const speed = 0.15 - i * 0.01;
        return {
          x: pos.x + (target.x - pos.x) * speed,
          y: pos.y + (target.y - pos.y) * speed,
        };
      });

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouse.current.x - size / 2}px, ${mouse.current.y - size / 2}px)`;
      }

      trailRefs.current.forEach((el, i) => {
        if (el) {
          const pos = positions.current[i];
          const scale = 1 - i * (0.8 / trailCount);
          el.style.transform = `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px) scale(${scale})`;
          el.style.opacity = `${1 - i * (0.9 / trailCount)}`;
        }
      });

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [size, trailCount]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {Array.from({ length: trailCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="absolute top-0 left-0 rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: cursorColor,
            mixBlendMode: blend ? "difference" : "normal",
            filter: `blur(${i * 1.5}px)`,
          }}
        />
      ))}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: cursorColor,
          mixBlendMode: blend ? "difference" : "normal",
        }}
      />
    </div>
  );
}
