"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Parallax" — Multi-layer depth parallax.
 * Photos are placed at different depth layers, each scrolling at a
 * different speed. Creates a diorama-like depth effect as you scroll.
 * Foreground photos move fast, background photos move slow.
 */

// Assign photos to 3 depth layers
const layers = [
  {
    // Back layer — slowest
    photos: [foodPhotos[0], foodPhotos[3]],
    speed: 0.15,
    scale: 0.7,
    opacity: 0.5,
    blur: 2,
  },
  {
    // Mid layer
    photos: [foodPhotos[1], foodPhotos[4]],
    speed: 0.4,
    scale: 0.85,
    opacity: 0.75,
    blur: 0,
  },
  {
    // Front layer — fastest
    photos: [foodPhotos[2], foodPhotos[5]],
    speed: 0.7,
    scale: 1,
    opacity: 1,
    blur: 0,
  },
];

// Positions for photos within each layer (percentage-based)
const positions = [
  // Back layer
  [
    { left: "5%", top: "15%" },
    { left: "60%", top: "55%" },
  ],
  // Mid layer
  [
    { left: "55%", top: "10%" },
    { left: "10%", top: "60%" },
  ],
  // Front layer
  [
    { left: "30%", top: "5%" },
    { left: "35%", top: "50%" },
  ],
];

export function ParallaxDepth() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#080808] overflow-hidden"
      style={{ height: "150vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div className="absolute top-20 left-0 right-0 z-40 text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Layers of{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              depth
            </span>
          </motion.h2>
          <p className="text-zinc-500 text-sm mt-2">
            Scroll to see the parallax — every layer moves at its own pace
          </p>
        </div>

        {/* Depth layers */}
        {layers.map((layer, layerIndex) => (
          <ParallaxLayer
            key={layerIndex}
            layer={layer}
            layerIndex={layerIndex}
            positions={positions[layerIndex]}
            scrollProgress={scrollYProgress}
          />
        ))}

        {/* Atmospheric fog */}
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#080808] to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-[#080808] to-transparent" />
        </div>

        {/* Depth indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 items-center">
          {["Far", "Mid", "Near"].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-zinc-700 text-[9px] font-mono uppercase tracking-wider">
                {label}
              </span>
              <div
                className={`rounded-full ${
                  i === 0
                    ? "w-1.5 h-1.5 bg-zinc-700"
                    : i === 1
                      ? "w-2 h-2 bg-zinc-600"
                      : "w-2.5 h-2.5 bg-amber-500/50"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxLayer({
  layer,
  layerIndex,
  positions,
  scrollProgress,
}: {
  layer: (typeof layers)[0];
  layerIndex: number;
  positions: { left: string; top: string }[];
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const y = useTransform(
    scrollProgress,
    [0, 1],
    [100 * layer.speed, -200 * layer.speed]
  );

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0"
      // eslint-disable-next-line react/no-unknown-property
    >
      {layer.photos.map((photo, photoIndex) => (
        <div
          key={photoIndex}
          className="absolute"
          style={{
            left: positions[photoIndex].left,
            top: positions[photoIndex].top,
            width: `${180 + layerIndex * 40}px`,
            zIndex: (layerIndex + 1) * 10,
            filter: layer.blur > 0 ? `blur(${layer.blur}px)` : undefined,
            opacity: layer.opacity,
          }}
        >
          <div
            className="relative w-full rounded-xl overflow-hidden border border-white/5 shadow-2xl shadow-black/60"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Image
              src={photo.after}
              alt={photo.restaurant}
              fill
              className="object-cover"
              sizes={`${180 + layerIndex * 40}px`}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          {layerIndex === 2 && (
            <p className="text-white/60 text-[10px] font-mono mt-2 text-center">
              {photo.restaurant}
            </p>
          )}
        </div>
      ))}
    </motion.div>
  );
}
