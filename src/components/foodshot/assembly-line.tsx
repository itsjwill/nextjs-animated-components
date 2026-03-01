"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

const photo = foodPhotos[2]; // El Jefe — best matched pair

const stages = [
  { num: 1, label: "Upload", color: "zinc" },
  { num: 2, label: "Analyze", color: "amber" },
  { num: 3, label: "Enhance", color: "orange" },
  { num: 4, label: "Deliver", color: "amber" },
];

function TimelineDot({ stage, index, stageProgress }: { stage: typeof stages[0]; index: number; stageProgress: MotionValue<number> }) {
  const opacity = useTransform(stageProgress, [index - 0.5, index, index + 0.5], [0.3, 1, 0.3]);
  const scale = useTransform(stageProgress, [index - 0.5, index, index + 0.5], [0.8, 1.1, 0.8]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        style={{ opacity, scale }}
        className="flex items-center gap-3"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
          stage.color === "amber" || stage.color === "orange"
            ? "border-amber-500/50 text-amber-400 bg-amber-500/10"
            : "border-zinc-600 text-zinc-400 bg-zinc-800"
        }`}>
          {stage.num}
        </div>
        <span className="text-zinc-500 text-xs font-mono uppercase tracking-wider w-20">{stage.label}</span>
      </motion.div>
      {index < 3 && <div className="w-px h-12 bg-zinc-800 my-1" />}
    </div>
  );
}

export function AssemblyLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Stage progress: which stage are we in (0-3)?
  const stageProgress = useTransform(scrollYProgress, [0, 1], [0, 4]);

  // Photo transition: crossfade from before to after at 50-75%
  const afterOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  // Card effects
  const borderOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  // Badge animations
  const analyzeBadges = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const enhanceBadges = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);

  // Stage label
  const stage1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const stage2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const stage3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const stage4 = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0a0a0a]"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="flex items-center gap-12 md:gap-20 px-6 max-w-5xl mx-auto">

          {/* Left: Timeline */}
          <div className="hidden md:flex flex-col items-center gap-0">
            {stages.map((s, i) => (
              <TimelineDot key={i} stage={s} index={i} stageProgress={stageProgress} />
            ))}
          </div>

          {/* Center: Photo card */}
          <div className="flex-1 flex flex-col items-center max-w-lg">
            {/* Stage labels (mobile) */}
            <div className="md:hidden relative h-8 mb-4">
              {[
                { opacity: stage1, label: "1. Upload" },
                { opacity: stage2, label: "2. Analyze" },
                { opacity: stage3, label: "3. Enhance" },
                { opacity: stage4, label: "4. Deliver" },
              ].map((s, i) => (
                <motion.span
                  key={i}
                  style={{ opacity: s.opacity }}
                  className="absolute inset-0 flex items-center justify-center text-amber-400 text-sm font-mono uppercase tracking-wider"
                >
                  {s.label}
                </motion.span>
              ))}
            </div>

            {/* The card */}
            <div className="relative w-full max-w-lg">
              <motion.div
                style={{
                  boxShadow: useTransform(
                    glowOpacity,
                    [0, 1],
                    ["0 25px 50px rgba(0,0,0,0.5)", "0 25px 80px rgba(245,158,11,0.15)"]
                  ),
                }}
                className="relative w-full rounded-2xl overflow-hidden bg-zinc-900"
              >
                <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
                  {/* Before photo (base) */}
                  <Image
                    src={photo.before}
                    alt="Original"
                    fill
                    className="object-cover"
                    sizes="512px"
                    priority
                  />

                  {/* After photo (fades in at 50-75%) */}
                  <motion.div
                    style={{ opacity: afterOpacity }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={photo.after}
                      alt="Enhanced"
                      fill
                      className="object-cover"
                      sizes="512px"
                    />
                  </motion.div>

                  {/* Animated amber border (analyze stage) */}
                  <motion.div
                    style={{ opacity: borderOpacity }}
                    className="absolute inset-0 rounded-2xl border-2 border-amber-500/40 pointer-events-none z-10"
                  />

                  {/* Warm glow (deliver stage) */}
                  <motion.div
                    style={{ opacity: glowOpacity }}
                    className="absolute -inset-8 bg-amber-500/8 blur-3xl rounded-3xl -z-10 pointer-events-none"
                  />

                  {/* Analysis badges (stage 2) */}
                  <motion.div
                    style={{ opacity: analyzeBadges }}
                    className="absolute top-4 right-4 z-20 space-y-2"
                  >
                    {[
                      { label: "Lighting", value: "Low", color: "text-red-400" },
                      { label: "Color", value: "Cold", color: "text-blue-400" },
                      { label: "Composition", value: "Off-center", color: "text-yellow-400" },
                    ].map((badge) => (
                      <div key={badge.label} className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm border border-zinc-700/50">
                        <span className="text-zinc-500 text-[9px] font-mono uppercase">{badge.label}: </span>
                        <span className={`text-[9px] font-mono font-bold ${badge.color}`}>{badge.value}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Enhancement badges (stage 3) */}
                  <motion.div
                    style={{ opacity: enhanceBadges }}
                    className="absolute top-4 right-4 z-20 space-y-2"
                  >
                    {[
                      { label: "Lighting", value: "Optimized", color: "text-emerald-400" },
                      { label: "Color", value: "Warm", color: "text-amber-400" },
                      { label: "Composition", value: "Reframed", color: "text-emerald-400" },
                    ].map((badge) => (
                      <div key={badge.label} className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm border border-amber-500/20">
                        <span className="text-zinc-500 text-[9px] font-mono uppercase">{badge.label}: </span>
                        <span className={`text-[9px] font-mono font-bold ${badge.color}`}>{badge.value}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Stage captions at bottom */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-5 z-20">
                    <div className="relative h-10">
                      <motion.div style={{ opacity: stage1 }} className="absolute inset-0">
                        <p className="text-zinc-400 text-sm font-mono">IMG_4832.jpg</p>
                        <p className="text-zinc-600 text-[10px]">Your phone photo • {photo.restaurant}</p>
                      </motion.div>
                      <motion.div style={{ opacity: stage2 }} className="absolute inset-0">
                        <p className="text-amber-400 text-sm font-mono">Analyzing...</p>
                        <p className="text-zinc-600 text-[10px]">Detecting composition, lighting, color balance</p>
                      </motion.div>
                      <motion.div style={{ opacity: stage3 }} className="absolute inset-0">
                        <p className="text-orange-400 text-sm font-mono">Enhancing...</p>
                        <p className="text-zinc-600 text-[10px]">Relighting, color grading, style transfer</p>
                      </motion.div>
                      <motion.div style={{ opacity: stage4 }} className="absolute inset-0">
                        <p className="text-amber-400 text-sm font-semibold">Studio Quality</p>
                        <p className="text-amber-400/60 text-[10px]">{photo.restaurant} • Enhanced by FoodShot</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="w-48 mt-8">
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: scrollYProgress }}
                  className="h-full bg-gradient-to-r from-zinc-500 via-amber-500 to-amber-400 origin-left"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-zinc-700 text-[8px] font-mono">UPLOAD</span>
                <span className="text-zinc-700 text-[8px] font-mono">DELIVER</span>
              </div>
            </div>
          </div>

          {/* Right side: headline (desktop) */}
          <div className="hidden lg:block max-w-xs">
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
              From phone photo to{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                studio quality
              </span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Scroll to watch FoodShot transform a real photo from {photo.restaurant} through our 4-stage AI pipeline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
