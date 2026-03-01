"use client";

import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Orbit" — 3D rotating photo carousel.
 * Photos arranged in a cylinder in 3D space, slowly auto-rotating.
 * Drag to spin. Click a photo to feature it front-and-center.
 */

const CARD_COUNT = foodPhotos.length;
const ANGLE_STEP = 360 / CARD_COUNT;
const RADIUS = 380;

function OrbitCard({
  photo,
  index,
}: {
  photo: typeof foodPhotos[0];
  index: number;
}) {
  const [isAfter, setIsAfter] = useState(true);
  const cardRef = useRef<HTMLButtonElement>(null);

  const angle = ANGLE_STEP * index;

  return (
    <motion.div
      className="absolute"
      style={{
        width: 240,
        height: 320,
        transformStyle: "preserve-3d",
        transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
      }}
    >
      <button
        ref={cardRef}
        onClick={() => setIsAfter(!isAfter)}
        className="relative w-full h-full rounded-2xl overflow-hidden border border-amber-500/15 bg-zinc-900 shadow-2xl shadow-black/50 cursor-pointer group focus:outline-none"
      >
        <Image
          src={isAfter ? photo.after : photo.before}
          alt={photo.restaurant}
          fill
          className={`object-cover transition-all duration-700 ${
            !isAfter ? "brightness-[0.6] saturate-[0.3]" : ""
          }`}
          sizes="240px"
        />

        {/* Label */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`px-2.5 py-1 rounded-lg backdrop-blur-sm border text-[9px] font-mono uppercase tracking-wider transition-all duration-500 ${
              isAfter
                ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                : "bg-black/50 border-zinc-700/40 text-zinc-500"
            }`}
          >
            {isAfter ? "Enhanced" : "Original"}
          </span>
        </div>

        {/* Restaurant name */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-10">
          <p className="text-white text-sm font-semibold">{photo.restaurant}</p>
        </div>

        {/* Hover prompt */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg text-white text-[10px]">
            Click to toggle
          </span>
        </div>
      </button>
    </motion.div>
  );
}

export function OrbitCarousel() {
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 40, damping: 30 });
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  // Auto-rotate
  useEffect(() => {
    const startAutoRotate = () => {
      animRef.current = animate(rotation, rotation.get() - 360, {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      });
    };

    startAutoRotate();

    return () => {
      animRef.current?.stop();
    };
  }, [rotation]);

  const handlePointerDown = useCallback(() => {
    isDragging.current = true;
    animRef.current?.stop();
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      rotation.set(rotation.get() + e.movementX * 0.3);
    },
    [rotation]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    // Resume auto-rotate from current position
    animRef.current = animate(rotation, rotation.get() - 360, {
      duration: 30,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [rotation]);

  return (
    <section className="relative w-full bg-[#060606] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          The{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            orbit
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Drag to spin. Click to toggle. Every restaurant, orbiting in 3D space.
        </p>
      </motion.div>

      {/* 3D Carousel */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative mx-auto cursor-grab active:cursor-grabbing select-none"
        style={{
          perspective: 1200,
          height: 420,
          maxWidth: 900,
        }}
      >
        <motion.div
          style={{
            rotateY: smoothRotation,
            transformStyle: "preserve-3d",
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {foodPhotos.map((photo, i) => (
            <OrbitCard key={i} photo={photo} index={i} />
          ))}
        </motion.div>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-amber-500/[0.03] rounded-full blur-[100px]" />
        </div>
      </div>

      {/* Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-zinc-700 text-xs text-center mt-6 font-mono"
      >
        Drag to explore • Click to see the original
      </motion.p>
    </section>
  );
}
