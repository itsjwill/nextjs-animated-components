"use client";

import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

function PhoneMockup({ variant }: { variant: "before" | "after" }) {
  const isBefore = variant === "before";
  return (
    <div className="relative w-[220px] h-[440px] mx-auto">
      {/* Phone frame */}
      <div
        className={`absolute inset-0 rounded-[2.5rem] border-2 ${
          isBefore ? "border-zinc-700 bg-zinc-900" : "border-amber-500/30 bg-zinc-900"
        } shadow-2xl overflow-hidden`}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="absolute inset-2 top-8 rounded-[2rem] overflow-hidden">
          {isBefore ? (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900" />
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 rounded-lg bg-zinc-700 mx-auto mb-3 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-900/40 to-red-900/30 blur-sm" />
                </div>
                <div className="text-zinc-600 text-[10px] font-mono">IMG_4832.jpg</div>
                <div className="text-zinc-700 text-[8px]">2.1 MP • Dark • Blurry</div>
              </div>
              {/* Grain overlay */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]" />
            </div>
          ) : (
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-orange-900/20" />
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 rounded-lg mx-auto mb-3 overflow-hidden relative">
                  <div className="w-full h-full bg-gradient-to-br from-amber-500/60 to-red-500/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-amber-400/80 blur-[2px]" />
                </div>
                <div className="text-amber-400 text-[10px] font-mono">FOODSHOT_PRO.jpg</div>
                <div className="text-amber-500/60 text-[8px]">8K • Studio Lit • Enhanced</div>
              </div>
              {/* Warm glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent" />
            </div>
          )}
        </div>
      </div>
      {/* Glow effect for after */}
      {!isBefore && (
        <div className="absolute -inset-4 rounded-[3rem] bg-amber-500/10 blur-xl -z-10" />
      )}
    </div>
  );
}

export function GlowUpMachine() {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-6 py-20">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-black to-amber-950/20" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-12"
      >
        <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-violet-500 to-amber-500 text-white mb-4">
          Concept 3A — The Glow-Up Machine
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
          Your phone photo →{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Studio quality
          </span>
        </h2>
        <p className="text-zinc-500 max-w-xl mx-auto">
          The energy between bad and beautiful is where FoodShot lives.
        </p>
      </motion.div>

      {/* The Pipeline */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-0 w-full max-w-6xl">
        {/* Before Phone */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="text-center mb-4">
            <span className="text-zinc-600 text-xs uppercase tracking-widest">Before</span>
          </div>
          <PhoneMockup variant="before" />
        </motion.div>

        {/* Spline Energy Bridge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex-1 min-w-[300px] h-[400px] relative mx-[-40px] lg:mx-0"
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Spline
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
              className="w-full h-full"
            />
          </Suspense>
          {/* Gradient overlays to blend into phones */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-600 text-[10px] font-mono tracking-wider">
            AI ENHANCEMENT ENGINE
          </div>
        </motion.div>

        {/* After Phone */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex-shrink-0"
        >
          <div className="text-center mb-4">
            <span className="text-amber-400 text-xs uppercase tracking-widest">After</span>
          </div>
          <PhoneMockup variant="after" />
        </motion.div>
      </div>
    </section>
  );
}
