"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

export function GlowUpMachine() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-cycle through restaurants
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % foodPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const photo = foodPhotos[activeIdx];

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Left half — BEFORE (desaturated, dark) */}
      <div className="absolute inset-y-0 left-0 w-1/2">
        {foodPhotos.map((p, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: activeIdx === i ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={p.before}
              alt={`${p.restaurant} — Original`}
              fill
              className="object-cover brightness-[0.6] saturate-[0.3]"
              sizes="50vw"
              priority={i === 0}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />

        {/* Before label */}
        <div className="absolute top-8 left-8 z-10">
          <div className="px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-zinc-500/30">
            <span className="text-zinc-300 text-sm font-bold uppercase tracking-wider">Before</span>
          </div>
        </div>

        {/* Before metadata */}
        <div className="absolute bottom-24 left-8 z-10">
          <div className="text-zinc-500 text-xs font-mono">IMG_4832.jpg</div>
          <div className="text-zinc-600 text-[10px] mt-1">Phone Camera • Bad Lighting • No Edit</div>
        </div>
      </div>

      {/* Right half — AFTER (warm, vibrant) */}
      <div className="absolute inset-y-0 right-0 w-1/2">
        {foodPhotos.map((p, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: activeIdx === i ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={p.after}
              alt={`${p.restaurant} — Enhanced`}
              fill
              className="object-cover"
              sizes="50vw"
              priority={i === 0}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />

        {/* After label */}
        <div className="absolute top-8 right-8 z-10">
          <div className="px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-amber-500/30">
            <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">After — FoodShot</span>
          </div>
        </div>

        {/* After metadata */}
        <div className="absolute bottom-24 right-8 z-10 text-right">
          <div className="text-amber-400 text-xs font-mono">FOODSHOT_PRO.jpg</div>
          <div className="text-amber-500/60 text-[10px] mt-1">Studio Quality • AI Enhanced • Magazine-Ready</div>
        </div>
      </div>

      {/* Center divider line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="w-[2px] h-full bg-white/30 relative">
          {/* Animated node */}
          <motion.div
            animate={{ y: ["-10%", "110%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
          </motion.div>

          {/* Center badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 whitespace-nowrap"
            >
              <span className="text-amber-400 text-xs font-mono tracking-wider">AI ENHANCEMENT</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom glass overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="bg-black/60 backdrop-blur-xl border-t border-white/10 px-6 py-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                Your phone photo →{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Studio quality
                </span>
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                Real photo from <span className="text-zinc-300">{photo.restaurant}</span>. Same dish. Completely different energy.
              </p>
            </div>

            {/* Restaurant dots */}
            <div className="flex gap-2">
              {foodPhotos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIdx === i
                      ? "bg-amber-500 scale-125 shadow-lg shadow-amber-500/40"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  title={p.restaurant}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
