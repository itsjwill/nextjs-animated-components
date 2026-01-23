"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NoiseTransitionProps {
  isActive: boolean;
  duration?: number;
  color?: string;
  onComplete?: () => void;
  children?: React.ReactNode;
}

export function NoiseTransition({
  isActive,
  duration = 1.2,
  color = "hsl(var(--primary))",
  onComplete,
  children,
}: NoiseTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const animRef = useRef<number>();

  useEffect(() => {
    if (isActive && phase === "idle") {
      setPhase("covering");
    }
  }, [isActive, phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || phase === "idle") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let progress = 0;
    const startTime = performance.now();
    const halfDuration = (duration * 1000) / 2;

    const generateNoise = (threshold: number) => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random();
        const visible = phase === "covering" ? noise < threshold : noise > 1 - threshold;

        if (visible) {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
          data[i + 3] = 255;
        } else {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = (time: number) => {
      const elapsed = time - startTime;
      progress = Math.min(elapsed / halfDuration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      generateNoise(eased);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else if (phase === "covering") {
        setPhase("revealing");
      } else {
        setPhase("idle");
        onComplete?.();
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [phase, duration, onComplete]);

  return (
    <>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            className="fixed inset-0 z-[9998] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ background: phase === "covering" ? "transparent" : color }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
