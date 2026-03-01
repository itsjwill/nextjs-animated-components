"use client";

import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

const Spline = lazy(() => import("@splinetool/react-spline"));

const photo = foodPhotos[0]; // Culinary Dropout

function PhoneMockup({ variant }: { variant: "before" | "after" }) {
  const isBefore = variant === "before";
  const src = isBefore ? photo.before : photo.after;
  return (
    <div className="relative w-[220px] h-[440px] mx-auto">
      <div
        className={`absolute inset-0 rounded-[2.5rem] border-2 ${
          isBefore ? "border-zinc-700 bg-zinc-900" : "border-amber-500/30 bg-zinc-900"
        } shadow-2xl overflow-hidden`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
        <div className="absolute inset-2 top-8 rounded-[2rem] overflow-hidden">
          <Image
            src={src}
            alt={isBefore ? "Original restaurant photo" : "FoodShot enhanced photo"}
            fill
            className={`object-cover ${isBefore ? "brightness-75 saturate-50" : ""}`}
            sizes="220px"
          />
          {isBefore && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          )}
          <div className="absolute bottom-3 left-0 right-0 text-center z-10">
            {isBefore ? (
              <>
                <div className="text-zinc-400 text-[10px] font-mono">IMG_4832.jpg</div>
                <div className="text-zinc-500 text-[8px]">Phone Camera • Bad Lighting</div>
              </>
            ) : (
              <>
                <div className="text-amber-400 text-[10px] font-mono">FOODSHOT_PRO.jpg</div>
                <div className="text-amber-500/80 text-[8px]">Studio Quality • Enhanced</div>
              </>
            )}
          </div>
        </div>
      </div>
      {!isBefore && (
        <div className="absolute -inset-4 rounded-[3rem] bg-amber-500/10 blur-xl -z-10" />
      )}
    </div>
  );
}

export function GlowUpMachine() {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-6 py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-black to-amber-950/20" />

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
          Real photo from {photo.restaurant}. Same dish. Completely different energy.
        </p>
      </motion.div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-0 w-full max-w-6xl">
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
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-600 text-[10px] font-mono tracking-wider">
            AI ENHANCEMENT ENGINE
          </div>
        </motion.div>

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
