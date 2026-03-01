"use client";

import { motion } from "framer-motion";
import { Suspense, lazy, useCallback, useState, useRef } from "react";
import type { Application, SPEObject } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

const NEXBOT_URL = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

// Cold, desaturated "before" theme
const BEFORE_THEME = {
  body: "#3a3a42",
  accent: "#555560",
  glow: "#6b6b80",
};

// Warm, cinematic "after" theme
const AFTER_THEME = {
  body: "#1a0f05",
  accent: "#fbbf24",
  glow: "#ff6b35",
};

function recolorScene(obj: SPEObject, theme: { body: string; accent: string; glow: string }) {
  const name = (obj.name || "").toLowerCase();
  try {
    if (
      name.includes("eye") || name.includes("light") || name.includes("glow") ||
      name.includes("emit") || name.includes("visor") || name.includes("screen") ||
      name.includes("led")
    ) {
      obj.color = theme.glow;
    } else if (
      name.includes("accent") || name.includes("detail") || name.includes("stripe") ||
      name.includes("line") || name.includes("trim") || name.includes("button") ||
      name.includes("joint") || name.includes("antenna")
    ) {
      obj.color = theme.accent;
    } else if (
      name.includes("body") || name.includes("torso") || name.includes("arm") ||
      name.includes("leg") || name.includes("head") || name.includes("chest") ||
      name.includes("robot") || name.includes("main") || name.includes("hull") ||
      name.includes("shell") || name.includes("frame") || name.includes("base") ||
      name.includes("shoulder") || name.includes("hand") || name.includes("foot") ||
      name.includes("neck")
    ) {
      obj.color = theme.body;
    }
  } catch {
    // Some objects don't support color
  }
}

export function BeforeAfterTheater() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const onLoadBefore = useCallback((app: Application) => {
    try {
      for (const obj of app.getAllObjects()) {
        recolorScene(obj, BEFORE_THEME);
      }
    } catch {}
  }, []);

  const onLoadAfter = useCallback((app: Application) => {
    try {
      for (const obj of app.getAllObjects()) {
        recolorScene(obj, AFTER_THEME);
      }
    } catch {}
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging.current) {
        handleMove(e.clientX);
      }
    },
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-6 py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, rgba(60,60,70,0.1) 0%, rgba(60,60,70,0.1) ${sliderPos}%, rgba(255,107,53,0.05) ${sliderPos}%, rgba(255,107,53,0.05) 100%)`,
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-8"
      >
        <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-zinc-500 to-amber-500 text-white mb-4">
          Concept 4C — Before & After Theater
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
          Drag to see the{" "}
          <span className="bg-gradient-to-r from-zinc-400 to-amber-400 bg-clip-text text-transparent">
            difference
          </span>
        </h2>
        <p className="text-zinc-500 max-w-lg mx-auto">
          Two live 3D scenes. One transformation. Drag the slider.
        </p>
      </motion.div>

      {/* Before/After Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-5xl h-[550px] rounded-2xl overflow-hidden border border-zinc-800 cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* AFTER layer — full width (behind) */}
        <div className="absolute inset-0">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Spline
              scene={NEXBOT_URL}
              className="w-full h-full pointer-events-none"
              onLoad={onLoadAfter}
            />
          </Suspense>
          {/* After label */}
          <div className="absolute top-4 right-4 z-30">
            <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 backdrop-blur-sm border border-amber-500/30">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">After — FoodShot</span>
            </div>
          </div>
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/10 to-transparent pointer-events-none" />
        </div>

        {/* BEFORE layer — clipped by slider */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="absolute inset-0 w-full h-full">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                  <div className="w-8 h-8 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <Spline
                scene={NEXBOT_URL}
                className="w-full h-full pointer-events-none"
                onLoad={onLoadBefore}
              />
            </Suspense>
          </div>
          {/* Before label */}
          <div className="absolute top-4 left-4 z-30">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-500/20 backdrop-blur-sm border border-zinc-500/30">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Before — Original</span>
            </div>
          </div>
          {/* Cold overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent pointer-events-none" />
          {/* Desaturation */}
          <div className="absolute inset-0 bg-zinc-900/10 pointer-events-none" style={{ mixBlendMode: "saturation" }} />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          {/* Vertical line */}
          <div className="w-0.5 h-full bg-white/80 mx-auto relative">
            {/* Handle circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg shadow-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L3 10L7 16" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 4L17 10L13 16" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom labels */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 flex justify-between w-full max-w-5xl mt-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-zinc-600" />
          <span className="text-zinc-500 text-sm">Low quality • Bad lighting • Amateur</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-sm">Studio quality • Cinematic • Professional</span>
          <div className="w-3 h-3 rounded-full bg-amber-500" />
        </div>
      </motion.div>
    </section>
  );
}
