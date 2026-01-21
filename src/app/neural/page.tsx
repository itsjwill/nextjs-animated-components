"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic import to avoid SSR issues with Three.js
const NeuralNetwork = dynamic(
  () => import("@/components/three/neural-network").then((mod) => mod.NeuralNetwork),
  { ssr: false }
);

const presets = [
  { id: "mind", label: "Mind", description: "Purple consciousness flow" },
  { id: "synapse", label: "Synapse", description: "Cyan electrical signals" },
  { id: "dream", label: "Dream", description: "Pink ethereal thoughts" },
  { id: "electric", label: "Electric", description: "Pure energy surge" },
  { id: "void", label: "Void", description: "Minimal grayscale" },
] as const;

export default function NeuralPage() {
  const [activePreset, setActivePreset] = useState<typeof presets[number]["id"]>("mind");
  const [activity, setActivity] = useState(0);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Neural Network Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePreset}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <NeuralNetwork preset={activePreset} onActivity={setActivity} />
        </motion.div>
      </AnimatePresence>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-8 left-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white/90 tracking-tight">
            Neural
            <span className="block text-white/50">Network</span>
          </h1>
          <p className="mt-4 text-white/40 max-w-xs">
            Click neurons to trigger thought cascades. Drag to explore the synaptic landscape.
          </p>
        </motion.div>

        {/* Activity Meter */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="absolute top-8 right-8 flex flex-col items-end"
        >
          <span className="text-white/40 text-sm mb-2">Neural Activity</span>
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
              animate={{ width: `${Math.min(100, activity * 500)}%` }}
              transition={{ type: "spring", damping: 20 }}
            />
          </div>
          <span className="text-white/20 text-xs mt-1">
            {(activity * 100).toFixed(1)}%
          </span>
        </motion.div>

        {/* Preset Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto"
        >
          <div className="flex gap-2 bg-white/5 backdrop-blur-xl rounded-full p-2 border border-white/10">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setActivePreset(preset.id)}
                className={`relative px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activePreset === preset.id
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {activePreset === preset.id && (
                  <motion.div
                    layoutId="activePreset"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{preset.label}</span>
              </button>
            ))}
          </div>

          {/* Active preset description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activePreset}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-center text-white/30 text-sm mt-3"
            >
              {presets.find((p) => p.id === activePreset)?.description}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-8 left-8 text-white/30 text-xs space-y-1"
        >
          <div>Neurons: 96</div>
          <div>Synapses: ~400</div>
          <div>Layers: 7</div>
        </motion.div>

        {/* Tech badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-8 right-8 text-white/20 text-xs"
        >
          Three.js + React Three Fiber
        </motion.div>
      </div>

      {/* Scanline overlay for extra effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          )`,
        }}
      />
    </div>
  );
}
