"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Typewriter" — Stats and testimonials typed out character by character.
 * A large hero photo with overlaid stats that type themselves out when
 * scrolled into view. Blinking cursor, monospace font, terminal aesthetic.
 */

const stats = [
  { label: "RESTAURANTS ENHANCED", value: "2,847", suffix: "+" },
  { label: "PHOTOS PROCESSED", value: "1.2M", suffix: "" },
  { label: "AVG ENGAGEMENT LIFT", value: "340", suffix: "%" },
  { label: "REVENUE GENERATED", value: "$4.2M", suffix: "" },
];

const terminalLines = [
  "$ foodshot analyze --restaurant \"Culinary Dropout\"",
  "> Scanning image quality... POOR (brightness: 32%, saturation: 18%)",
  "> Applying AI enhancement pipeline...",
  "> Color correction: ██████████ 100%",
  "> Light balance:    ██████████ 100%",
  "> Detail sharpen:   ██████████ 100%",
  "> Enhancement complete. Quality: STUDIO GRADE",
  "> Estimated engagement lift: +340%",
];

function TypewriterLine({
  text,
  delay,
  speed = 30,
}: {
  text: string;
  delay: number;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || started) return;
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, delay, started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  const isCommand = text.startsWith("$");
  const isProgress = text.includes("██");
  const isResult = text.includes("complete") || text.includes("STUDIO");

  return (
    <div ref={ref} className="font-mono text-sm leading-relaxed">
      <span
        className={
          isCommand
            ? "text-green-400"
            : isProgress
              ? "text-amber-400"
              : isResult
                ? "text-cyan-400"
                : "text-zinc-400"
        }
      >
        {displayed}
      </span>
      {started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-green-400 ml-0.5 align-middle"
        />
      )}
    </div>
  );
}

function AnimatedStat({
  stat,
  delay,
}: {
  stat: (typeof stats)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [isInView, delay]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="text-3xl md:text-5xl font-bold font-mono text-white">
          {show ? stat.value : "---"}
        </span>
        <span className="text-amber-400 text-2xl md:text-4xl font-bold">
          {show ? stat.suffix : ""}
        </span>
      </motion.div>
      <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-wider mt-2">
        {stat.label}
      </p>
    </div>
  );
}

export function TypewriterStats() {
  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          The{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            terminal
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Watch the enhancement process unfold in real time
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        {/* Terminal window */}
        <div className="rounded-xl border border-zinc-800 bg-[#111111] overflow-hidden shadow-2xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-zinc-600 text-xs font-mono">
              foodshot-cli v2.4.0
            </span>
          </div>
          {/* Terminal content */}
          <div className="p-5 space-y-1.5 min-h-[280px]">
            {terminalLines.map((line, i) => (
              <TypewriterLine
                key={i}
                text={line}
                delay={i * 800}
                speed={line.startsWith("$") ? 50 : 20}
              />
            ))}
          </div>
        </div>

        {/* Photo result */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="relative rounded-xl overflow-hidden border border-amber-500/20"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Image
              src={foodPhotos[0].after}
              alt={foodPhotos[0].restaurant}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-mono uppercase">
                Enhanced
              </span>
              <p className="text-white text-xl font-bold mt-2">
                {foodPhotos[0].restaurant}
              </p>
            </div>
          </motion.div>

          {/* Mini before/after strip */}
          <div className="flex gap-3">
            {foodPhotos.slice(1, 4).map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="flex-1 relative rounded-lg overflow-hidden border border-zinc-800"
                style={{ aspectRatio: "1 / 1" }}
              >
                <Image
                  src={photo.after}
                  alt={photo.restaurant}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <AnimatedStat key={i} stat={stat} delay={i * 300} />
        ))}
      </div>
    </section>
  );
}
