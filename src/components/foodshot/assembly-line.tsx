"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

const photo = foodPhotos[2]; // El Jefe

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] bg-amber-400/60 z-10 pointer-events-none"
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      style={{ boxShadow: "0 0 20px rgba(245,158,11,0.4), 0 0 60px rgba(245,158,11,0.2)" }}
    />
  );
}

function BoundingBox({ top, left, w, h }: { top: string; left: string; w: string; h: string }) {
  return (
    <motion.div
      className="absolute border-2 border-amber-400/50 rounded-md z-10 pointer-events-none"
      style={{ top, left, width: w, height: h }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.9] }}
      transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
    >
      <div className="absolute -top-5 left-0 px-1.5 py-0.5 bg-amber-400/20 rounded text-[8px] text-amber-400 font-mono whitespace-nowrap">
        {["food_item", "plate", "garnish", "sauce"][Math.floor(Math.random() * 4)]}
      </div>
    </motion.div>
  );
}

export function AssemblyLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Title overlay */}
        <div className="absolute top-6 left-6 z-30">
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            The{" "}
            <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
              FoodShot Factory
            </span>
          </h2>
          <p className="text-zinc-500 text-sm mt-1">Scroll to process {photo.restaurant} through the pipeline →</p>
        </div>

        {/* Horizontal pipeline */}
        <motion.div style={{ x }} className="flex items-stretch h-full">

          {/* Stage 1: UPLOAD — before photo, dark/desaturated */}
          <div className="flex-shrink-0 w-screen h-full relative">
            <Image
              src={photo.before}
              alt="Original upload"
              fill
              className="object-cover brightness-[0.5] saturate-[0.2]"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />

            {/* Stage label */}
            <div className="absolute top-6 right-6 z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-zinc-500/30">
                <span className="w-6 h-6 rounded-full bg-zinc-500 text-black text-xs font-bold flex items-center justify-center">1</span>
                <span className="text-white text-sm font-medium">UPLOAD</span>
              </div>
            </div>

            {/* Upload UI overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-zinc-600 flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                </div>
                <p className="text-zinc-500 text-sm font-mono">IMG_4832.jpg</p>
                <p className="text-zinc-700 text-xs mt-1">Original • {photo.restaurant}</p>
              </div>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 text-5xl z-20">→</div>
          </div>

          {/* Stage 2: ANALYZE — same photo with scan lines + bounding boxes */}
          <div className="flex-shrink-0 w-screen h-full relative">
            <Image
              src={photo.before}
              alt="Analyzing"
              fill
              className="object-cover brightness-[0.6] saturate-[0.4]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Scan line */}
            <ScanLine />

            {/* Bounding boxes */}
            <BoundingBox top="25%" left="30%" w="40%" h="35%" />
            <BoundingBox top="45%" left="15%" w="25%" h="20%" />
            <BoundingBox top="20%" left="60%" w="20%" h="25%" />

            {/* Stage label */}
            <div className="absolute top-6 right-6 z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-amber-500/30">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">2</span>
                <span className="text-white text-sm font-medium">ANALYZE</span>
              </div>
            </div>

            {/* Analysis overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <div className="px-6 py-3 rounded-xl bg-black/70 backdrop-blur-md border border-amber-500/20">
                <span className="text-amber-400 text-xs font-mono">DETECTING: composition, lighting, color balance, subjects...</span>
              </div>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 text-5xl z-20">→</div>
          </div>

          {/* Stage 3: ENHANCE — photo with filters partially applied */}
          <div className="flex-shrink-0 w-screen h-full relative">
            <Image
              src={photo.after}
              alt="Enhancing"
              fill
              className="object-cover brightness-[0.85] saturate-[0.7]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

            {/* Enhancement UI overlays */}
            <div className="absolute top-20 right-8 z-20 space-y-3">
              {[
                { label: "Lighting", value: 78, color: "bg-amber-500" },
                { label: "Color", value: 65, color: "bg-orange-500" },
                { label: "Sharpness", value: 42, color: "bg-red-500" },
                { label: "Style", value: 90, color: "bg-emerald-500" },
              ].map((bar) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="text-zinc-400 text-[10px] font-mono w-16 text-right">{bar.label}</span>
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${bar.color} rounded-full`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${bar.value}%` }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Stage label */}
            <div className="absolute top-6 right-6 z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-red-500/30">
                <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">3</span>
                <span className="text-white text-sm font-medium">ENHANCE</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <div className="px-6 py-3 rounded-xl bg-black/70 backdrop-blur-md border border-red-500/20">
                <span className="text-red-400 text-xs font-mono">ENHANCING: relighting, color grading, sharpening, style transfer...</span>
              </div>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 text-5xl z-20">→</div>
          </div>

          {/* Stage 4: OUTPUT — full-quality after photo */}
          <div className="flex-shrink-0 w-screen h-full relative">
            <Image
              src={photo.after}
              alt="Final output"
              fill
              className="object-cover"
              sizes="100vw"
            />

            {/* Warm glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute -inset-20 bg-amber-500/5 blur-3xl pointer-events-none" />

            {/* Stage label */}
            <div className="absolute top-6 right-6 z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-amber-500/30">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">4</span>
                <span className="text-white text-sm font-medium">OUTPUT</span>
              </div>
            </div>

            {/* Result overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center">
              <div className="px-8 py-4 rounded-xl bg-black/60 backdrop-blur-md border border-amber-500/20">
                <p className="text-amber-400 font-medium text-lg">{photo.restaurant} — Studio-Quality Output</p>
                <p className="text-zinc-500 text-xs mt-1">Enhanced • Professionally Lit • Magazine-Ready</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 z-30">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full bg-gradient-to-r from-red-500 to-amber-500 origin-left"
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-zinc-600 text-[8px]">UPLOAD</span>
            <span className="text-zinc-600 text-[8px]">ANALYZE</span>
            <span className="text-zinc-600 text-[8px]">ENHANCE</span>
            <span className="text-zinc-600 text-[8px]">OUTPUT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
