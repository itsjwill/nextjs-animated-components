"use client";

import { motion } from "framer-motion";
import { Suspense, lazy, useEffect, useState, useCallback } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

const floatingItems = [
  { emoji: "$", color: "text-emerald-400", delay: 0, x: -180, speed: 3 },
  { emoji: "★", color: "text-amber-400", delay: 0.5, x: -120, speed: 4 },
  { emoji: "♥", color: "text-red-400", delay: 1, x: 120, speed: 3.5 },
  { emoji: "$", color: "text-emerald-400", delay: 1.5, x: 180, speed: 2.8 },
  { emoji: "★★★★★", color: "text-amber-400", delay: 2, x: -60, speed: 5 },
  { emoji: "♥", color: "text-pink-400", delay: 0.3, x: 60, speed: 4.2 },
  { emoji: "$$$", color: "text-emerald-300", delay: 2.5, x: 0, speed: 3.2 },
  { emoji: "📍", color: "text-red-300", delay: 1.8, x: -150, speed: 4.5 },
  { emoji: "+127%", color: "text-emerald-400", delay: 3, x: 140, speed: 3.8 },
  { emoji: "♥ 2.4K", color: "text-pink-400", delay: 0.8, x: -40, speed: 4.8 },
];

function FloatingParticle({
  item,
}: {
  item: (typeof floatingItems)[0];
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${item.color} text-sm font-bold select-none`}
      style={{ left: `calc(50% + ${item.x}px)` }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.8, 0.8, 0],
        y: [0, -200, -350, -500],
      }}
      transition={{
        duration: item.speed,
        delay: item.delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      {item.emoji}
    </motion.div>
  );
}

export function MoneyPlate() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + Math.floor(Math.random() * 3 + 1));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const onSplineLoad = useCallback((app: Application) => {
    try {
      const objects = app.getAllObjects();
      for (const obj of objects) {
        const name = (obj.name || "").toLowerCase();
        try {
          if (name.includes("light") || name.includes("glow") || name.includes("emit")) {
            obj.color = "#ff8c00";
          } else if (name.includes("accent") || name.includes("detail") || name.includes("trim")) {
            obj.color = "#fbbf24";
          } else if (name) {
            obj.color = "#8b4513";
          }
        } catch {
          // Some objects don't support color
        }
      }
    } catch {
      // Silent fail
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-6 py-20">
      {/* Warm ambient glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-orange-500/5 blur-[80px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-8"
      >
        <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 text-white mb-4">
          Concept 4A — Money Plate
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
          Better photos.{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
            More revenue.
          </span>
        </h2>
        <p className="text-zinc-500 max-w-lg mx-auto">
          Every photo we enhance generates real, trackable revenue for your restaurant.
        </p>
      </motion.div>

      {/* 3D Scene + Floating Revenue */}
      <div className="relative z-10 w-full max-w-2xl h-[500px]">
        {/* Floating revenue indicators */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {floatingItems.map((item, i) => (
            <FloatingParticle key={i} item={item} />
          ))}
        </div>

        {/* Spline Scene — warm-recolored */}
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Spline
            scene="https://prod.spline.design/KFonZGtsoUXP-qx7/scene.splinecode"
            className="w-full h-full"
            onLoad={onSplineLoad}
          />
        </Suspense>

        {/* Revenue counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="px-6 py-3 rounded-xl bg-black/70 backdrop-blur-md border border-emerald-500/20">
            <div className="text-center">
              <div className="text-emerald-400 text-2xl font-bold font-mono">
                +${counter.toLocaleString()}
              </div>
              <div className="text-zinc-500 text-[10px] uppercase tracking-wider">
                Revenue generated from enhanced photos
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="relative z-10 flex gap-8 mt-8"
      >
        {[
          { label: "Avg. Revenue Increase", value: "+127%" },
          { label: "More Google Clicks", value: "+340%" },
          { label: "Customer Conversion", value: "+89%" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-amber-400 text-xl font-bold">{stat.value}</div>
            <div className="text-zinc-600 text-xs">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
