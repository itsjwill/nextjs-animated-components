"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { TextGenerateEffect } from "@/components/text/text-generate";
import { GradientText } from "@/components/text/gradient-text";
import { FadeIn, ScrollProgress } from "@/components/scroll";
import { AnimatedNavLink } from "@/components/navigation";
import { Spotlight } from "@/components/backgrounds/spotlight";
import { Card } from "@/components/ui/card";

const SplineScene = dynamic(
  () => import("@/components/ui/splite").then((m) => m.SplineScene),
  {
    ssr: false,
    loading: () => <SceneLoader />,
  }
);

function SceneLoader() {
  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-zinc-500 text-sm">Loading 3D scene...</span>
      </div>
    </div>
  );
}

const ROBOT_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const scenes = [
  {
    id: "nexbot",
    title: "Interactive Robot",
    subtitle: "Cursor-Tracking Character",
    description:
      "A 3D robot character that follows your cursor in real-time. Move your mouse around the scene — it tracks you. Built entirely in Spline with cursor-follow states and hover reactions.",
    splineUrl: ROBOT_URL,
    gradient: "from-violet-500 to-purple-600",
    spotlightColor: "white",
    tech: "Cursor Tracking • Character Animation • State Machines",
  },
  {
    id: "morphing",
    title: "Morphing Object",
    subtitle: "Interactive Shape Playground",
    description:
      "An interactive 3D shape that responds to clicks and mouse events. Trigger animations, morph between states, and manipulate the scene through event-driven interactions.",
    splineUrl: "https://prod.spline.design/KFonZGtsoUXP-qx7/scene.splinecode",
    gradient: "from-cyan-500 to-blue-600",
    spotlightColor: "#06b6d4",
    tech: "Event System • Animation Triggers • Object Manipulation",
  },
  {
    id: "abstract",
    title: "Abstract Universe",
    subtitle: "Cosmic Interaction",
    description:
      "A mesmerizing abstract 3D composition that responds to your presence. Ambient animations blend with interactive elements for an otherworldly experience.",
    splineUrl: "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode",
    gradient: "from-pink-500 to-rose-600",
    spotlightColor: "#f472b6",
    tech: "Ambient Animation • Composition • Lighting Effects",
  },
  {
    id: "dimensional",
    title: "Dimensional Gateway",
    subtitle: "Spatial Interface",
    description:
      "A 3D interface that feels like stepping into another dimension. Interactive depth layers, spatial UI elements, and fluid transitions create an immersive portal experience.",
    splineUrl: "https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode",
    gradient: "from-emerald-500 to-green-600",
    spotlightColor: "#10b981",
    tech: "Spatial UI • Depth Layers • Fluid Transitions",
  },
  {
    id: "kinetic",
    title: "Kinetic Sculpture",
    subtitle: "Motion Art Installation",
    description:
      "A kinetic art piece rendered in 3D space. Watch as geometric forms dance, collide, and reshape themselves in an endless choreography of motion and light.",
    splineUrl: "https://prod.spline.design/aR8RJVAStugdKyXD/scene.splinecode",
    gradient: "from-amber-500 to-orange-600",
    spotlightColor: "#f59e0b",
    tech: "Kinetic Art • Geometric Dance • Light Play",
  },
  {
    id: "machine",
    title: "Living Machine",
    subtitle: "Mechanical Organism",
    description:
      "A hybrid between organic life and mechanical precision. Interactive gears, pulsing nodes, and flowing energy create a machine that feels alive — responding to every mouse movement.",
    splineUrl: "https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode",
    gradient: "from-red-500 to-rose-600",
    spotlightColor: "#ef4444",
    tech: "Organic Motion • Mechanical Design • Energy Flow",
  },
  {
    id: "juno",
    title: "Juno AI",
    subtitle: "Conversational Robot Avatar",
    description:
      "A charismatic AI robot avatar with expressive animations and personality. Juno was designed as the face of conversational AI — smooth idle breathing, reactive eyes, and a presence that makes you feel like you're talking to something alive.",
    splineUrl: "https://prod.spline.design/ShbuDfWkxJRt-BwC/scene.splinecode",
    gradient: "from-sky-500 to-indigo-600",
    spotlightColor: "#38bdf8",
    tech: "Expressive Animation • AI Avatar • Character Design",
  },
  {
    id: "zenthor",
    title: "Zenthor Z-1",
    subtitle: "Industrial Mech Unit",
    description:
      "An embodied intelligence built for dynamic industrial environments. Zenthor Z-1 is a physical AI robot with heavy mechanical detail, orbit interaction, and a commanding presence. Rotate to inspect every joint, servo, and armor plate.",
    splineUrl: "https://prod.spline.design/OZLlsHkQZsKQqIYv/scene.splinecode",
    gradient: "from-fuchsia-500 to-purple-600",
    spotlightColor: "#d946ef",
    tech: "Orbit Interaction • Industrial Mech • Physical AI",
  },
  {
    id: "echo",
    title: "Echo Unit",
    subtitle: "Portfolio Companion Bot",
    description:
      "A stylized robot character with clean geometric lines and a futuristic aesthetic. Echo floats in space with subtle idle animations — a companion bot designed to greet, guide, and charm. Minimal design, maximum personality.",
    splineUrl: "https://prod.spline.design/gtuL1hqX7QHNkqHb/scene.splinecode",
    gradient: "from-teal-500 to-cyan-600",
    spotlightColor: "#14b8a6",
    tech: "Geometric Design • Idle Animation • Companion Bot",
  },
];

/* ─── VARIANT SCENES: Same robot, radically different CSS treatments ─── */

function HologramRobot() {
  return (
    <FadeIn delay={0.1}>
      <Card className="w-full bg-black/[0.96] relative overflow-hidden border-zinc-800">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#06b6d4" />
        <div className="flex flex-col lg:flex-row min-h-[550px]">
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white w-fit mb-4">
              Scene 10 — Hologram
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-cyan-50">
              Hologram Projection
            </h2>
            <p className="text-zinc-500 text-sm uppercase tracking-wider mb-4">
              Transmitted Signal
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6 max-w-md">
              The same robot — but beamed in as a holographic projection. Scan
              lines sweep across the scene, the image flickers with signal
              interference, and a cyan glow bleeds from every edge. Move your
              cursor — the robot still tracks you through the static.
            </p>
            <span className="text-xs text-zinc-600 font-mono">
              CSS Scan Lines • Signal Flicker • Hologram Glow • Live Interaction
            </span>
          </div>

          <div className="flex-1 relative min-h-[400px]">
            {/* Hologram effect layers */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Scan lines */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.08) 2px, rgba(6,182,212,0.08) 4px)",
                }}
              />
              {/* Horizontal sweep line */}
              <div
                className="absolute left-0 right-0 h-[2px] bg-cyan-400/60"
                style={{
                  animation: "hologramSweep 3s linear infinite",
                }}
              />
              {/* Edge glow */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(6,182,212,0.3)]" />
              {/* Top/bottom fade */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cyan-900/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cyan-900/30 to-transparent" />
            </div>

            {/* Color treatment */}
            <div
              className="absolute inset-0 z-10 pointer-events-none mix-blend-color"
              style={{ backgroundColor: "rgba(6,182,212,0.25)" }}
            />

            {/* Flicker overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ animation: "hologramFlicker 4s ease-in-out infinite" }}
            />

            <Suspense fallback={<SceneLoader />}>
              <SplineScene scene={ROBOT_URL} className="w-full h-full absolute inset-0" />
            </Suspense>

            {/* Projection base */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20" />
          </div>
        </div>
      </Card>

      <style jsx>{`
        @keyframes hologramSweep {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes hologramFlicker {
          0%, 100% { opacity: 0; }
          48% { opacity: 0; }
          49% { opacity: 0.08; background: rgba(6,182,212,0.15); }
          51% { opacity: 0; }
          78% { opacity: 0; }
          79% { opacity: 0.05; background: rgba(6,182,212,0.1); }
          81% { opacity: 0; }
        }
      `}</style>
    </FadeIn>
  );
}

function GlitchRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150 + Math.random() * 200);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <FadeIn delay={0.1}>
      <Card className="w-full bg-black/[0.96] relative overflow-hidden border-zinc-800">
        <Spotlight className="-top-40 right-0 md:right-60 md:-top-20" fill="#f43f5e" />
        <div className="flex flex-col lg:flex-row-reverse min-h-[550px]">
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white w-fit mb-4">
              Scene 11 — Glitch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Corrupted Signal
            </h2>
            <p className="text-zinc-500 text-sm uppercase tracking-wider mb-4">
              Cyberpunk Distortion
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6 max-w-md">
              The robot is glitching. RGB channels split and stagger. Random
              bursts of chromatic aberration tear across the frame. Noise
              artifacts corrupt the signal. But through all that chaos — the
              robot still watches you. Still follows your cursor. Unbroken.
            </p>
            <span className="text-xs text-zinc-600 font-mono">
              RGB Split • Chromatic Aberration • Signal Noise • Glitch Bursts
            </span>
          </div>

          <div className="flex-1 relative min-h-[400px]" ref={containerRef}>
            {/* Glitch RGB split layers */}
            <div
              className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-75"
              style={{
                opacity: glitchActive ? 1 : 0,
                background:
                  "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,0,0,0.03) 3px, rgba(255,0,0,0.03) 4px)",
              }}
            />

            {/* Chromatic aberration effect */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                opacity: glitchActive ? 0.7 : 0,
                boxShadow: glitchActive
                  ? "inset 3px 0 0 rgba(255,0,0,0.5), inset -3px 0 0 rgba(0,255,255,0.5)"
                  : "none",
                transition: "opacity 50ms",
              }}
            />

            {/* Horizontal tear lines */}
            {glitchActive && (
              <>
                <div
                  className="absolute left-0 right-0 h-[3px] z-30 pointer-events-none"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    background: "rgba(255,0,100,0.4)",
                    transform: `translateX(${Math.random() * 10 - 5}px)`,
                  }}
                />
                <div
                  className="absolute left-0 right-0 h-[2px] z-30 pointer-events-none"
                  style={{
                    top: `${40 + Math.random() * 40}%`,
                    background: "rgba(0,255,200,0.3)",
                    transform: `translateX(${Math.random() * 8 - 4}px)`,
                  }}
                />
              </>
            )}

            {/* Permanent noise texture */}
            <div
              className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.7)]" />

            <Suspense fallback={<SceneLoader />}>
              <SplineScene scene={ROBOT_URL} className="w-full h-full absolute inset-0" />
            </Suspense>
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}

function PortalRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    },
    []
  );

  return (
    <FadeIn delay={0.1}>
      <Card className="w-full bg-black/[0.96] relative overflow-hidden border-zinc-800">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#a855f7" />
        <div className="flex flex-col lg:flex-row min-h-[550px]">
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500 to-violet-600 text-white w-fit mb-4">
              Scene 12 — Portal
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Portal Window
            </h2>
            <p className="text-zinc-500 text-sm uppercase tracking-wider mb-4">
              Dimensional Reveal
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6 max-w-md">
              The robot exists in another dimension — visible only through a
              circular portal that follows your cursor. Move your mouse to drag
              the window across the void. The portal reveals the robot underneath,
              glowing at the edges, pulsing with energy. Peek through. It sees you back.
            </p>
            <span className="text-xs text-zinc-600 font-mono">
              Cursor Portal • Radial Mask • Edge Glow • Dimensional Reveal
            </span>
          </div>

          <div
            className="flex-1 relative min-h-[400px]"
            ref={containerRef}
            onMouseMove={handleMouseMove}
          >
            {/* Portal mask — reveals robot through a cursor-following circle */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle 140px at ${mousePos.x}% ${mousePos.y}%, transparent 0%, transparent 60%, rgba(0,0,0,0.97) 100%)`,
                transition: "background 0.1s ease-out",
              }}
            />

            {/* Portal ring glow */}
            <div
              className="absolute inset-0 z-30 pointer-events-none"
              style={{
                background: `radial-gradient(circle 142px at ${mousePos.x}% ${mousePos.y}%, transparent 56%, rgba(168,85,247,0.6) 59%, rgba(168,85,247,0.3) 62%, transparent 70%)`,
                transition: "background 0.1s ease-out",
              }}
            />

            {/* Outer particles / energy dots */}
            <div
              className="absolute inset-0 z-30 pointer-events-none"
              style={{
                background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, transparent 65%, rgba(139,92,246,0.08) 70%, transparent 80%)`,
                transition: "background 0.15s ease-out",
              }}
            />

            {/* Ambient pulse rings */}
            <div
              className="absolute inset-0 z-25 pointer-events-none"
              style={{
                background: `radial-gradient(circle 160px at ${mousePos.x}% ${mousePos.y}%, transparent 55%, rgba(168,85,247,0.15) 58%, transparent 63%)`,
                transition: "background 0.1s ease-out",
                animation: "portalPulse 2s ease-in-out infinite",
              }}
            />

            {/* "VOID" text when not hovering portal area */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <span className="text-zinc-800 text-lg font-mono tracking-[0.5em] uppercase select-none">
                Move cursor to reveal
              </span>
            </div>

            <Suspense fallback={<SceneLoader />}>
              <SplineScene scene={ROBOT_URL} className="w-full h-full absolute inset-0" />
            </Suspense>
          </div>
        </div>
      </Card>

      <style jsx>{`
        @keyframes portalPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </FadeIn>
  );
}

function SceneCard({
  scene,
  index,
}: {
  scene: (typeof scenes)[0];
  index: number;
}) {
  const isReversed = index % 2 === 1;

  return (
    <FadeIn delay={0.1}>
      <Card className="w-full bg-black/[0.96] relative overflow-hidden border-zinc-800">
        <Spotlight
          className={
            isReversed
              ? "-top-40 right-0 md:right-60 md:-top-20"
              : "-top-40 left-0 md:left-60 md:-top-20"
          }
          fill={scene.spotlightColor}
        />

        <div
          className={`flex flex-col ${
            isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
          } min-h-[550px]`}
        >
          {/* Content Side */}
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${scene.gradient} text-white w-fit mb-4`}
            >
              Scene {index + 1}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              {scene.title}
            </h2>
            <p className="text-zinc-500 text-sm uppercase tracking-wider mb-4">
              {scene.subtitle}
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6 max-w-md">
              {scene.description}
            </p>
            <span className="text-xs text-zinc-600 font-mono">
              {scene.tech}
            </span>
          </div>

          {/* 3D Scene Side */}
          <div className="flex-1 relative min-h-[400px]">
            <Suspense fallback={<SceneLoader />}>
              <SplineScene
                scene={scene.splineUrl}
                className="w-full h-full absolute inset-0"
              />
            </Suspense>
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}

export default function SplineWorldsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <ScrollProgress />

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <GradientText gradient="from-purple-400 to-pink-400">
              Motion Primitives
            </GradientText>
          </Link>
          <AnimatedNavLink
            href="/demos"
            variant="underline"
            className="text-zinc-400"
          >
            ← All Demos
          </AnimatedNavLink>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 pt-16 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="px-4 py-2 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20">
              Spline 3D • Interactive Worlds
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <TextGenerateEffect words="Spline Worlds" />
          </h1>

          <motion.p
            className="text-xl text-zinc-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Twelve interactive 3D scenes powered by Spline — including three
            robot variations with hologram, glitch, and portal effects that
            nobody has built before. Move your cursor to interact.
          </motion.p>
        </div>
      </section>

      {/* Standard Scenes */}
      <section className="relative z-10 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {scenes.map((scene, i) => (
            <SceneCard key={scene.id} scene={scene} index={i} />
          ))}
        </div>
      </section>

      {/* Robot Variants Section */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="px-4 py-2 text-sm font-medium text-rose-400 bg-rose-500/10 rounded-full border border-rose-500/20">
                Same Robot • Three Dimensions
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
                One Robot. Three Realities.
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                The same cursor-tracking robot from Scene 1 — but each one lives
                in a completely different visual reality. CSS effects layered on
                top of a live, interactive 3D scene. The robot still follows your
                cursor through every effect.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-12">
            <HologramRobot />
            <GlitchRobot />
            <PortalRobot />
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="relative z-10 py-20 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Drop-In Integration
            </h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 font-mono text-sm">
              <pre className="text-zinc-300 overflow-x-auto">
                <code>{`import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/backgrounds/spotlight"

// Any Spline scene URL works — just paste and go
<Card className="bg-black/[0.96] relative overflow-hidden">
  <Spotlight className="-top-40 left-0" fill="white" />

  <div className="flex flex-row h-[500px]">
    <div className="flex-1 p-12 flex flex-col justify-center">
      <h2 className="text-4xl font-bold">Your Content</h2>
      <p className="text-zinc-400">Side-by-side with 3D</p>
    </div>

    <div className="flex-1 relative">
      <SplineScene
        scene="https://prod.spline.design/your-scene/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  </div>
</Card>`}</code>
              </pre>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-zinc-400 mb-6">
              Also check out the experimental scenes built entirely in code
            </p>
            <Link
              href="/demos/interactive-3d"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            >
              View R3F Experiments →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-zinc-600 text-sm">
            Built with{" "}
            <GradientText gradient="from-purple-400 to-pink-400">
              Spline + Motion Primitives
            </GradientText>
          </p>
          <Link
            href="/demos"
            className="text-zinc-500 text-sm hover:text-white transition-colors"
          >
            ← Back to Demos
          </Link>
        </div>
      </footer>
    </main>
  );
}
