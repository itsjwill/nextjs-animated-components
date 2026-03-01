"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The X-Ray" — Medical scanner aesthetic.
 * The "before" photo is shown in a cold blue X-ray style.
 * A scanner line sweeps across on hover/drag, and everything
 * the scanner passes over transforms into the vibrant "after" photo.
 * Like a hospital scan revealing the true beauty of the dish.
 */

export function XrayScanner() {
  return (
    <section className="relative w-full bg-[#040408] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Scan &{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            enhance
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Drag the scanner across. Watch the AI enhancement reveal itself.
        </p>
      </motion.div>

      {/* Scanner cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {foodPhotos.slice(0, 4).map((photo, i) => (
          <ScannerCard key={i} photo={photo} index={i} />
        ))}
      </div>
    </section>
  );
}

function ScannerCard({
  photo,
  index,
}: {
  photo: (typeof foodPhotos)[0];
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanPosition = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const clipPercent = useTransform(scanPosition, (v) => v);

  const handlePointerDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      scanPosition.set(Math.max(0, Math.min(100, x)));
    },
    [isDragging, scanPosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
    >
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative rounded-xl overflow-hidden cursor-col-resize select-none touch-none"
        style={{ aspectRatio: "3 / 4" }}
      >
        {/* "After" photo (enhanced — full color) */}
        <Image
          src={photo.after}
          alt={`${photo.restaurant} enhanced`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 480px"
        />

        {/* "Before" photo with X-ray filter (clips based on scan position) */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: useTransform(
              clipPercent,
              (v) => `inset(0 0 0 ${v}%)`
            ),
          }}
        >
          <Image
            src={photo.before}
            alt={`${photo.restaurant} original`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
            style={{
              filter:
                "brightness(0.4) saturate(0) contrast(1.3) sepia(1) hue-rotate(180deg)",
            }}
          />
          {/* Blue X-ray tint */}
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-color" />
        </motion.div>

        {/* Scanner line */}
        <motion.div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{
            left: useTransform(clipPercent, (v) => `${v}%`),
            transform: "translateX(-50%)",
          }}
        >
          {/* Scan beam */}
          <div className="w-px h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5),0_0_20px_rgba(34,211,238,0.3)]" />

          {/* Scan crosshair */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 border border-cyan-400/50 rounded-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Grid overlay (medical scan look) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Labels */}
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-cyan-500/20 text-cyan-400 text-[8px] font-mono uppercase tracking-wider">
            Scan Active
          </span>
        </div>
        <div className="absolute top-3 right-3 z-20">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="px-2 py-1 rounded bg-black/50 text-cyan-400 text-[8px] font-mono"
          >
            AI ENHANCE
          </motion.span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end">
          <div className="px-3 py-2 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
            <p className="text-white text-sm font-semibold">{photo.restaurant}</p>
          </div>
          <span className="text-cyan-400/50 text-[9px] font-mono">
            {Math.round(scanPosition.get())}% scanned
          </span>
        </div>
      </div>
    </motion.div>
  );
}
