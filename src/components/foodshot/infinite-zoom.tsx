"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Zoom" — Infinite zoom effect on scroll.
 * As you scroll, the view zooms deeper and deeper into a photo,
 * then transitions to the next one. Each photo lives at a different
 * "depth level." Creates an Inception-style drill-down effect.
 */

const zoomPhotos = [
  foodPhotos[0], // Culinary Dropout
  foodPhotos[3], // CAPO PIZZA
  foodPhotos[1], // Tokyo Hana
  foodPhotos[2], // El Jefe
];

export function InfiniteZoom() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#060606]"
      style={{ height: `${zoomPhotos.length * 150}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Header — always visible */}
        <div className="absolute top-20 left-0 right-0 z-40 text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Zoom{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              deeper
            </span>
          </motion.h2>
          <p className="text-zinc-500 text-sm mt-2">
            Scroll to zoom — every level reveals a new dish
          </p>
        </div>

        {/* Stacked zoom layers */}
        {zoomPhotos.map((photo, i) => (
          <ZoomLayer
            key={i}
            photo={photo}
            index={i}
            total={zoomPhotos.length}
            scrollProgress={scrollYProgress}
          />
        ))}

        {/* Center crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="relative w-20 h-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-5 bg-amber-500/30" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-5 bg-amber-500/30" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-px bg-amber-500/30" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-px bg-amber-500/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full border border-amber-500/40" />
            </div>
          </div>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(6,6,6,0.7)_100%)]" />
        </div>
      </div>
    </section>
  );
}

function ZoomLayer({
  photo,
  index,
  total,
  scrollProgress,
}: {
  photo: typeof foodPhotos[0];
  index: number;
  total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const layerStart = index / total;
  const layerEnd = (index + 1) / total;
  const layerMid = (layerStart + layerEnd) / 2;

  // Scale: starts at 0.5 (small), grows to fill screen, then zooms past
  const scale = useTransform(
    scrollProgress,
    [layerStart, layerMid, layerEnd],
    [0.4, 1, 2.5]
  );

  // Opacity: fade in as it approaches, fade out as it zooms past
  const opacity = useTransform(
    scrollProgress,
    [layerStart, layerStart + 0.05, layerEnd - 0.05, layerEnd],
    [0, 1, 1, 0]
  );

  // Border radius shrinks as it fills the screen
  const borderRadius = useTransform(
    scrollProgress,
    [layerStart, layerMid],
    [24, 0]
  );

  return (
    <motion.div
      style={{ scale, opacity, borderRadius }}
      className="absolute inset-8 md:inset-16 overflow-hidden z-10"
    >
      <Image
        src={photo.after}
        alt={photo.restaurant}
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Photo info */}
      <motion.div
        style={{
          opacity: useTransform(
            scrollProgress,
            [layerStart + 0.05, layerStart + 0.1, layerEnd - 0.1, layerEnd - 0.05],
            [0, 1, 1, 0]
          ),
        }}
        className="absolute bottom-6 left-6 z-10"
      >
        <div className="px-4 py-3 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10">
          <p className="text-amber-400/60 text-[9px] font-mono uppercase tracking-wider">
            Depth Level {index + 1}
          </p>
          <p className="text-white text-lg font-bold">{photo.restaurant}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
