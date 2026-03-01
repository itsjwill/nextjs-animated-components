"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Mirror" — Giant mirrored typography with photo fills.
 * The word "FOOD" appears normally on top, reflected/mirrored below.
 * Both filled with different food photos visible through the text.
 * Scroll-driven fade and scale creates a luxury editorial feel.
 */

const heroPhoto = foodPhotos[0]; // Culinary Dropout
const mirrorPhoto = foodPhotos[3]; // CAPO PIZZA

export function MirrorText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const topY = useTransform(scrollYProgress, [0, 0.5], [60, -20]);
  const bottomY = useTransform(scrollYProgress, [0, 0.5], [-60, 20]);
  const gap = useTransform(scrollYProgress, [0.1, 0.4], [40, 4]);
  const mirrorOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0.3, 0.7]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#060606] overflow-hidden px-6 py-32"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-amber-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-amber-400/50 text-[10px] font-mono uppercase tracking-[0.4em] mb-2">
            Reflect on what&apos;s possible
          </p>
          <p className="text-zinc-600 text-sm">
            The same food. Two different realities.
          </p>
        </motion.div>

        {/* Mirror composition */}
        <div className="flex flex-col items-center">
          {/* Top word — photo filled */}
          <motion.div
            style={{ y: topY }}
            className="relative overflow-hidden select-none"
          >
            <div
              className="text-[20vw] md:text-[16vw] lg:text-[14vw] font-black leading-none tracking-tighter"
              style={{
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(${heroPhoto.after})`,
              }}
            >
              FOOD
            </div>
          </motion.div>

          {/* Gap / divider line */}
          <motion.div
            style={{ height: gap }}
            className="w-full max-w-lg flex items-center"
          >
            <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          </motion.div>

          {/* Bottom word — reflected, different photo */}
          <motion.div
            style={{
              y: bottomY,
              opacity: mirrorOpacity,
              scaleY: -1,
            }}
            className="relative overflow-hidden select-none"
          >
            <div
              className="text-[20vw] md:text-[16vw] lg:text-[14vw] font-black leading-none tracking-tighter"
              style={{
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(${mirrorPhoto.after})`,
                maskImage: "linear-gradient(to bottom, black 20%, transparent 90%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 90%)",
              }}
            >
              FOOD
            </div>
          </motion.div>
        </div>

        {/* Shot text below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            by{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              FoodShot
            </span>
          </h2>
          <p className="text-zinc-600 text-sm max-w-md mx-auto">
            Your food photos, reflected in their best light.
            What you see above is what your customers will see.
          </p>
        </motion.div>

        {/* Small photo strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mt-12"
        >
          {foodPhotos.map((photo, i) => (
            <div
              key={i}
              className="relative w-16 h-20 rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500/30 transition-colors"
            >
              <Image
                src={photo.after}
                alt={photo.restaurant}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
