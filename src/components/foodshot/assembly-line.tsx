"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

function SplineLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function StageLabel({ number, label, color }: { number: string; label: string; color: string }) {
  return (
    <div className="absolute top-4 left-4 z-20">
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-${color}-500/30`}>
        <span className={`w-5 h-5 rounded-full bg-${color}-500 text-black text-[10px] font-bold flex items-center justify-center`}>
          {number}
        </span>
        <span className="text-white text-xs font-medium">{label}</span>
      </div>
    </div>
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
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-black to-amber-950/10" />

        {/* Header */}
        <div className="absolute top-6 left-6 z-20">
          <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-red-500 to-amber-500 text-white mb-2">
            Concept 3C — The Assembly Line
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            The{" "}
            <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
              FoodShot Factory
            </span>
          </h2>
          <p className="text-zinc-500 text-sm mt-1">Scroll to move through the pipeline →</p>
        </div>

        {/* Conveyor belt line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent -translate-y-1/2 z-10" />

        {/* Horizontal scroll track */}
        <motion.div
          style={{ x }}
          className="flex items-center h-full"
          // 4 stages side by side
        >
          {/* Stage 1: Input — Bad Photo */}
          <div className="flex-shrink-0 w-screen h-full flex items-center justify-center relative">
            <StageLabel number="1" label="INPUT" color="zinc" />
            <div className="flex flex-col items-center">
              <div className="w-[200px] h-[400px] rounded-[2.5rem] border-2 border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl z-10" />
                <div className="absolute inset-2 top-7 rounded-[2rem] bg-zinc-800 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center flex-col gap-2">
                    <div className="w-24 h-24 rounded bg-gradient-to-br from-yellow-900/30 to-zinc-800 relative">
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,transparent_30%,black)]" />
                    </div>
                    <span className="text-zinc-600 text-[9px] font-mono">potato_quality.jpg</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-zinc-600 text-xs text-center">
                Dark • Blurry • 2MP<br />
                <span className="text-zinc-700">Taken at 11pm under fluorescent lights</span>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-700 text-4xl animate-pulse">→</div>
          </div>

          {/* Stage 2: AI Analysis — Kinetic Sculpture */}
          <div className="flex-shrink-0 w-screen h-full flex items-center justify-center relative">
            <StageLabel number="2" label="AI ANALYSIS" color="amber" />
            <div className="w-full max-w-2xl h-[500px] relative">
              <Suspense fallback={<SplineLoader />}>
                <Spline
                  scene="https://prod.spline.design/aR8RJVAStugdKyXD/scene.splinecode"
                  className="w-full h-full"
                />
              </Suspense>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <div className="px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-amber-500/20">
                  <span className="text-amber-400 text-xs font-mono">ANALYZING: composition, lighting, color balance, subject detection...</span>
                </div>
              </div>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-700 text-4xl animate-pulse">→</div>
          </div>

          {/* Stage 3: Enhancement Engine — Living Machine */}
          <div className="flex-shrink-0 w-screen h-full flex items-center justify-center relative">
            <StageLabel number="3" label="ENHANCEMENT ENGINE" color="red" />
            <div className="w-full max-w-2xl h-[500px] relative">
              <Suspense fallback={<SplineLoader />}>
                <Spline
                  scene="https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode"
                  className="w-full h-full"
                />
              </Suspense>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <div className="px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-red-500/20">
                  <span className="text-red-400 text-xs font-mono">ENHANCING: relighting, color grading, sharpening, style transfer...</span>
                </div>
              </div>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-700 text-4xl animate-pulse">→</div>
          </div>

          {/* Stage 4: Output — Final Result */}
          <div className="flex-shrink-0 w-screen h-full flex items-center justify-center relative">
            <StageLabel number="4" label="OUTPUT" color="amber" />
            <div className="flex flex-col items-center">
              <div className="w-[500px] h-[340px] rounded-2xl border border-amber-500/30 bg-zinc-950 shadow-2xl overflow-hidden relative">
                {/* Monitor frame */}
                <div className="absolute top-0 inset-x-0 h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-3 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="ml-3 text-zinc-600 text-[10px] font-mono">foodshot_studio_output.jpg</span>
                </div>
                <div className="absolute inset-0 top-8 bg-gradient-to-br from-amber-900/20 to-orange-900/15 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-amber-500/40 to-red-500/25 relative overflow-hidden">
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400/50 blur-sm" />
                    <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/20 blur-[1px]" />
                  </div>
                </div>
                <div className="absolute -inset-6 bg-amber-500/5 blur-2xl -z-10" />
              </div>
              {/* Monitor stand */}
              <div className="w-20 h-8 bg-zinc-800 rounded-b-lg" />
              <div className="w-40 h-2 bg-zinc-800 rounded-full" />
              <div className="mt-6 text-center">
                <p className="text-amber-400 font-medium">Studio-Quality Output</p>
                <p className="text-zinc-600 text-xs mt-1">8K • Professionally Lit • Magazine-Ready</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 z-20">
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full bg-gradient-to-r from-red-500 to-amber-500 origin-left"
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-zinc-700 text-[8px]">INPUT</span>
            <span className="text-zinc-700 text-[8px]">OUTPUT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
