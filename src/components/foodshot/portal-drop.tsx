"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

function SplineLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function PortalDrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 200, 500]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const portalGlow = useTransform(scrollYProgress, [0.2, 0.5], [0.3, 1]);
  const resultOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const resultY = useTransform(scrollYProgress, [0.6, 0.85], [60, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/10 via-black to-emerald-950/10" />

        {/* Header */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white mb-3">
            Concept 3B — The Portal Drop
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Drop your photo.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Watch the magic.
            </span>
          </h2>
        </div>

        {/* Falling Phone */}
        <motion.div
          style={{ y: phoneY, scale: phoneScale, opacity: phoneOpacity }}
          className="absolute top-[15%] z-20"
        >
          <div className="w-[180px] h-[360px] rounded-[2rem] border-2 border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl z-10" />
            <div className="absolute inset-2 top-7 rounded-[1.5rem] overflow-hidden bg-zinc-800">
              <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-yellow-900/40 to-red-900/30" />
              </div>
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,transparent_40%,black)]" />
            </div>
          </div>
        </motion.div>

        {/* Portal — Spline Scene */}
        <motion.div
          style={{ opacity: portalGlow }}
          className="absolute top-[30%] w-full max-w-3xl h-[400px] z-10"
        >
          <Suspense fallback={<SplineLoader />}>
            <Spline
              scene="https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode"
              className="w-full h-full"
            />
          </Suspense>
          {/* Portal glow ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        </motion.div>

        {/* Enhanced Result */}
        <motion.div
          style={{ opacity: resultOpacity, y: resultY }}
          className="absolute bottom-[10%] z-20 text-center"
        >
          <div className="w-[280px] h-[200px] rounded-2xl border border-amber-500/30 bg-zinc-900 shadow-2xl mx-auto overflow-hidden relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-lg mx-auto mb-2 bg-gradient-to-br from-amber-500/50 to-red-500/30 relative overflow-hidden">
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-400/60 blur-sm" />
                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="text-amber-400 text-xs font-mono">ENHANCED</div>
              </div>
            </div>
            <div className="absolute -inset-4 rounded-3xl bg-amber-500/10 blur-xl -z-10" />
          </div>
          <p className="text-amber-400 text-sm font-medium">Studio-quality in seconds</p>
          <p className="text-zinc-600 text-xs mt-1">Scroll back up to try again</p>
        </motion.div>
      </div>
    </section>
  );
}
