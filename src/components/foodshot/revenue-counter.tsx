"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Counter" — Live revenue counter ticking up with rotating hero photos.
 * Sells urgency: "This is the money restaurants are making with FoodShot."
 * The counter animates from 0 when it enters the viewport.
 */

function AnimatedCounter({ target, duration = 3 }: { target: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString());
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <motion.span
      onViewportEnter={() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        animate(count, target, { duration, ease: "easeOut" });
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {display}
    </motion.span>
  );
}

const stats = [
  { value: 2400, suffix: "+", label: "Restaurants", duration: 2.5 },
  { value: 1200000, suffix: "", label: "Photos Enhanced", duration: 3.5 },
  { value: 4200000, suffix: "", label: "Revenue Generated", prefix: "$", duration: 4 },
];

export function RevenueCounter() {
  const [photoIndex, setPhotoIndex] = useState(0);

  // Rotate photos
  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % foodPhotos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-[#060606] overflow-hidden px-6 md:px-12 py-32">
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top section: Giant counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-amber-400/50 text-[10px] font-mono uppercase tracking-[0.4em] mb-6">
            Total revenue generated for FoodShot restaurants
          </p>
          <div className="text-6xl md:text-9xl lg:text-[12rem] font-black text-white tracking-tighter leading-none">
            $<AnimatedCounter target={4200000} duration={4} />
          </div>
          <p className="text-zinc-600 text-sm mt-4">
            ...and counting.
          </p>
        </motion.div>

        {/* Middle: Two-column — stats left, photo right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Stats column */}
          <div className="flex-1 space-y-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="border-l-2 border-amber-500/20 pl-6"
              >
                <div className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  {stat.prefix || ""}
                  <AnimatedCounter target={stat.value} duration={stat.duration} />
                  {stat.suffix}
                </div>
                <p className="text-zinc-600 text-xs font-mono uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Rotating photo */}
          <div className="w-full max-w-sm">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/10 bg-zinc-900 shadow-2xl shadow-amber-900/10" style={{ aspectRatio: "3 / 4" }}>
              {foodPhotos.map((photo, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{ opacity: i === photoIndex ? 1 : 0 }}
                >
                  <Image
                    src={photo.after}
                    alt={photo.restaurant}
                    fill
                    className="object-cover"
                    sizes="384px"
                    priority={i < 2}
                  />
                </div>
              ))}

              {/* Bottom label */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-5 z-10">
                <p className="text-white font-medium text-sm">
                  {foodPhotos[photoIndex].restaurant}
                </p>
                <p className="text-amber-400/60 text-[10px] font-mono">
                  Enhanced by FoodShot
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-zinc-500 text-sm mb-6">
            Your restaurant is leaving money on the table. Literally.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20 text-base">
            Start Making More →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
