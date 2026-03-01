"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Cube" — A 3D rotating cube with photos on each face.
 * Drag to rotate in any direction. Each face shows a different
 * restaurant photo. Click a face to expand it into a full detail view.
 */

const FACE_SIZE = 320;
const HALF = FACE_SIZE / 2;

// Map 6 photos to 6 cube faces
const faces = [
  { photo: foodPhotos[0], transform: `translateZ(${HALF}px)` }, // front
  { photo: foodPhotos[1], transform: `rotateY(180deg) translateZ(${HALF}px)` }, // back
  { photo: foodPhotos[2], transform: `rotateY(90deg) translateZ(${HALF}px)` }, // right
  { photo: foodPhotos[3], transform: `rotateY(-90deg) translateZ(${HALF}px)` }, // left
  { photo: foodPhotos[4], transform: `rotateX(90deg) translateZ(${HALF}px)` }, // top
  { photo: foodPhotos[5], transform: `rotateX(-90deg) translateZ(${HALF}px)` }, // bottom
];

export function RotatingCube() {
  const rotateX = useMotionValue(-20);
  const rotateY = useMotionValue(30);
  const smoothX = useSpring(rotateX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 50, damping: 20 });

  const isDragging = useRef(false);
  const [activeFace, setActiveFace] = useState<number | null>(null);

  const handlePointerDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      rotateY.set(rotateY.get() + e.movementX * 0.4);
      rotateX.set(rotateX.get() - e.movementY * 0.4);
    },
    [rotateX, rotateY]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <section className="relative w-full bg-[#060606] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Every{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            angle
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Drag to rotate the cube. Six restaurants, six faces.
        </p>
      </motion.div>

      {/* Cube container */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative mx-auto cursor-grab active:cursor-grabbing select-none"
        style={{
          perspective: 1000,
          width: FACE_SIZE,
          height: FACE_SIZE,
        }}
      >
        <motion.div
          style={{
            rotateX: smoothX,
            rotateY: smoothY,
            transformStyle: "preserve-3d",
            width: FACE_SIZE,
            height: FACE_SIZE,
          }}
          className="relative"
        >
          {faces.map((face, i) => (
            <div
              key={i}
              onClick={() => setActiveFace(activeFace === i ? null : i)}
              className="absolute inset-0 overflow-hidden border border-amber-500/10 cursor-pointer"
              style={{
                transform: face.transform,
                backfaceVisibility: "hidden",
                width: FACE_SIZE,
                height: FACE_SIZE,
              }}
            >
              <Image
                src={face.photo.after}
                alt={face.photo.restaurant}
                fill
                className="object-cover"
                sizes={`${FACE_SIZE}px`}
              />
              {/* Face overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8px] font-mono uppercase">
                  Face {i + 1}
                </span>
                <p className="text-white text-sm font-semibold mt-1 truncate">
                  {face.photo.restaurant}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Ambient glow under cube */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[40px] bg-amber-500/[0.05] rounded-full blur-[30px]" />
      </div>

      {/* Quick-rotate buttons */}
      <div className="flex justify-center gap-3 mt-10">
        {[
          { label: "Front", rx: -20, ry: 0 },
          { label: "Right", rx: -20, ry: 90 },
          { label: "Back", rx: -20, ry: 180 },
          { label: "Left", rx: -20, ry: -90 },
          { label: "Top", rx: 70, ry: 0 },
          { label: "Bottom", rx: -70, ry: 0 },
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => {
              rotateX.set(preset.rx);
              rotateY.set(preset.ry);
            }}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono uppercase tracking-wider hover:bg-zinc-800 hover:text-white transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Instruction */}
      <p className="text-zinc-700 text-xs text-center mt-6 font-mono">
        Drag to explore freely
      </p>
    </section>
  );
}
