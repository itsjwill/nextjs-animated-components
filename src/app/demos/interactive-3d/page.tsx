"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/backgrounds/spotlight";
import { TextGenerateEffect } from "@/components/text/text-generate";
import { GradientText } from "@/components/text/gradient-text";
import { FadeIn, ScrollProgress } from "@/components/scroll";
import { AnimatedNavLink } from "@/components/navigation";

// =============================================================================
// Scene 1 — The Robot (Interactive Character)
// A friendly 3D robot that follows your cursor. Split layout: copy + 3D.
// =============================================================================
function RobotScene() {
  return (
    <Card className="w-full min-h-[600px] bg-black/[0.96] relative overflow-hidden border-zinc-800">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex flex-col md:flex-row h-full min-h-[600px]">
        {/* Left — Content */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4 block">
              Interactive Character
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
              Meet the
              <br />
              Robot
            </h2>
            <p className="mt-6 text-neutral-400 max-w-md text-lg leading-relaxed">
              A fully interactive 3D character that tracks your cursor in
              real-time. Built with Spline — no WebGL knowledge required. Just
              drop it in and watch users play.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              {["Cursor Tracking", "Real-time 3D", "Zero Config"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — 3D Scene */}
        <div className="flex-1 relative min-h-[400px]">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}

// =============================================================================
// Scene 2 — Earth Globe (Data Visualization)
// A rotating 3D earth with atmospheric glow. Full-bleed immersive layout.
// =============================================================================
function EarthScene() {
  return (
    <Card className="w-full min-h-[700px] bg-gradient-to-b from-[#020617] to-[#0a0f1e] relative overflow-hidden border-zinc-800">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />

      {/* 3D Earth — full background */}
      <div className="absolute inset-0">
        <SplineScene
          scene="https://prod.spline.design/jzV0TxGOvJfBm3RH/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col justify-between h-full min-h-[700px] p-8 md:p-12">
        {/* Top — Stats bar */}
        <motion.div
          className="flex flex-wrap gap-6 md:gap-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Active Users", value: "2.4M+" },
            { label: "Countries", value: "142" },
            { label: "Uptime", value: "99.97%" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-sm text-blue-300/60 font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom — Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-4 block">
            Global Infrastructure
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-3xl leading-tight">
            Your data,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              everywhere
            </span>
          </h2>
          <p className="mt-4 text-blue-200/50 max-w-lg text-lg">
            Deployed across 142 countries with sub-50ms latency. Drag the globe
            to explore our global edge network.
          </p>
        </motion.div>
      </div>
    </Card>
  );
}

// =============================================================================
// Scene 3 — Abstract Crystal (Product/Brand Hero)
// A floating, morphing crystal/gem shape. Centered theatrical layout.
// =============================================================================
function CrystalScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);

  return (
    <motion.div ref={ref} style={{ scale }}>
      <Card className="w-full min-h-[700px] bg-gradient-to-br from-[#0a000f] via-[#120020] to-[#0a000f] relative overflow-hidden border-zinc-800">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[120px]" />

        {/* 3D Scene — centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-[800px] h-[500px]">
            <SplineScene
              scene="https://prod.spline.design/pvM5sSiYV6ivbaJx/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Overlay content — centered above */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[700px] p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 text-xs font-mono text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-full uppercase tracking-widest mb-8">
              Coming Soon
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-purple-200 to-purple-500/50">
                Something
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                Beautiful
              </span>
            </h2>
            <p className="mt-6 text-purple-200/40 max-w-md mx-auto text-lg">
              Interact with the 3D object above. Drag to rotate. Scroll to
              transform. Pure creative freedom.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex gap-4 justify-center">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Early Access
              </motion.button>
              <motion.button
                className="px-8 py-3 border border-purple-500/30 text-purple-300 rounded-full font-medium text-sm hover:bg-purple-500/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}

// =============================================================================
// Main Demo Page
// =============================================================================
export default function Interactive3DPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <ScrollProgress />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/50 backdrop-blur-xl border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <GradientText gradient="from-purple-400 to-pink-400">
              Motion Primitives
            </GradientText>
          </Link>
          <div className="flex items-center gap-6">
            <AnimatedNavLink
              href="/demos"
              variant="underline"
              className="text-zinc-400 text-sm"
            >
              ← All Demos
            </AnimatedNavLink>
            <a
              href="https://github.com/itsjwill/motion-primitives-website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="px-4 py-2 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
              Interactive 3D — Powered by Spline
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            <TextGenerateEffect words="3D That Feels Alive" />
          </h1>

          <motion.p
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Three completely different interactive 3D experiences. Drag, hover,
            scroll — every scene responds to you. No WebGL code required.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-zinc-700 mx-auto flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 bg-zinc-500 rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-xs text-zinc-600 mt-3 block">
              Scroll to explore
            </span>
          </motion.div>
        </div>
      </section>

      {/* Scene 1 — Robot */}
      <section className="px-4 md:px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-8 flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                01
              </span>
              <div className="h-px flex-1 bg-zinc-900" />
              <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                Interactive Character
              </span>
            </div>
            <RobotScene />
          </FadeIn>
        </div>
      </section>

      {/* Scene 2 — Earth Globe */}
      <section className="px-4 md:px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-8 flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                02
              </span>
              <div className="h-px flex-1 bg-zinc-900" />
              <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                Data Visualization
              </span>
            </div>
            <EarthScene />
          </FadeIn>
        </div>
      </section>

      {/* Scene 3 — Crystal */}
      <section className="px-4 md:px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-8 flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                03
              </span>
              <div className="h-px flex-1 bg-zinc-900" />
              <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                Product Hero
              </span>
            </div>
            <CrystalScene />
          </FadeIn>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="px-4 md:px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Drop-in{" "}
                <GradientText gradient="from-cyan-400 to-blue-500">
                  Simple
                </GradientText>
              </h2>
              <p className="text-zinc-400">
                One component. One prop. Infinite possibilities.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-zinc-500 font-mono">
                  page.tsx
                </span>
              </div>
              <pre className="p-6 text-sm font-mono overflow-x-auto">
                <code className="text-zinc-300">
                  <span className="text-purple-400">import</span>
                  {" { "}
                  <span className="text-cyan-300">SplineScene</span>
                  {" } "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-300">
                    &quot;@/components/ui/splite&quot;
                  </span>
                  {"\n\n"}
                  <span className="text-zinc-500">
                    {"// That's it. Just point it at any Spline scene."}
                  </span>
                  {"\n"}
                  <span className="text-purple-400">{"<"}</span>
                  <span className="text-cyan-300">SplineScene</span>
                  {"\n  "}
                  <span className="text-yellow-300">scene</span>
                  <span className="text-white">=</span>
                  <span className="text-green-300">
                    &quot;https://prod.spline.design/your-scene/scene.splinecode&quot;
                  </span>
                  {"\n  "}
                  <span className="text-yellow-300">className</span>
                  <span className="text-white">=</span>
                  <span className="text-green-300">
                    &quot;w-full h-[500px]&quot;
                  </span>
                  {"\n"}
                  <span className="text-purple-400">{"/>"}</span>
                </code>
              </pre>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              150+ components.{" "}
              <GradientText gradient="from-purple-400 to-pink-400" animate>
                Free forever.
              </GradientText>
            </h2>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              3D scenes, scroll animations, text effects, backgrounds, and more.
              Copy-paste into any Next.js project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <motion.button
                  className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore All Components
                </motion.button>
              </Link>
              <a
                href="https://github.com/itsjwill/motion-primitives-website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="px-8 py-4 border border-zinc-800 text-zinc-300 rounded-full font-medium hover:bg-zinc-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View on GitHub
                </motion.button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-600 text-sm">
            Built with{" "}
            <GradientText gradient="from-purple-400 to-pink-400">
              Motion Primitives
            </GradientText>
            {" "}+ Spline 3D
          </p>
        </div>
      </footer>
    </main>
  );
}
