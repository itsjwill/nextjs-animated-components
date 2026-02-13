"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "@/components/text/text-generate";
import { GradientText } from "@/components/text/gradient-text";
import {
  FadeIn,
  ScrollProgress,
  TextParallax,
  StickyReveal,
  HorizontalScrollSection,
  TextRevealScrub,
  CounterAnimation,
  SplitScreenScroll,
  ZoomScroll,
} from "@/components/scroll";
import {
  ScrollOrchestrator,
  ScrollStage,
  ScrollVelocityWrapper,
  ClipPathReveal,
  DepthParallax,
  DepthLayer,
} from "@/components/scroll/scroll-orchestrator";
import { AnimatedNavLink } from "@/components/navigation";
import { MagneticButton } from "@/components/effects/magnetic-button";

// ─────────────────────────────────────────────────────────────────────────────
// Section Label — floating label for each demo section
// ─────────────────────────────────────────────────────────────────────────────

function SectionLabel({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <FadeIn className={cn("mb-16 px-6", className)}>
      <div className="max-w-5xl mx-auto">
        <span className="text-sm uppercase tracking-[0.2em] text-purple-400 font-mono mb-2 block">
          {title}
        </span>
        <p className="text-xl text-zinc-400 max-w-2xl">{description}</p>
      </div>
    </FadeIn>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1) Scroll Orchestrator Demo — Apple AirPods Pro style
// ─────────────────────────────────────────────────────────────────────────────

function OrchestratorDemo() {
  return (
    <section className="relative">
      <SectionLabel
        title="Scroll Orchestrator"
        description="Apple AirPods Pro-style pinned scroll. Content transforms through stages as you scroll — the viewport stays locked while animations play."
      />

      <ScrollOrchestrator duration={5} scrub={1}>
        {/* Stage 1: Title fades in */}
        <ScrollStage
          start={0}
          end={0.2}
          from={{ opacity: 0, y: 60 }}
          to={{ opacity: 1, y: 0 }}
        >
          <div className="h-full flex flex-col items-center justify-center px-6">
            <h2 className="text-5xl md:text-8xl font-black text-center leading-tight">
              Scroll to
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Orchestrate
              </span>
            </h2>
            <p className="text-zinc-500 text-xl mt-6 max-w-lg text-center">
              This section is pinned. Keep scrolling.
            </p>
          </div>
        </ScrollStage>

        {/* Stage 2: First card slides in from left */}
        <ScrollStage
          start={0.2}
          end={0.4}
          from={{ opacity: 0, x: -200, scale: 0.8 }}
          to={{ opacity: 1, x: 0, scale: 1 }}
        >
          <div className="h-full flex items-center justify-center px-6">
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-3xl p-12 max-w-xl backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3">Pin & Animate</h3>
              <p className="text-zinc-400 text-lg">
                Content stays pinned to the viewport while GSAP timelines scrub
                through animation stages. Each stage has independent from/to
                states.
              </p>
            </div>
          </div>
        </ScrollStage>

        {/* Stage 3: Second card slides in from right */}
        <ScrollStage
          start={0.4}
          end={0.6}
          from={{ opacity: 0, x: 200, scale: 0.8 }}
          to={{ opacity: 1, x: 0, scale: 1 }}
        >
          <div className="h-full flex items-center justify-center px-6">
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-3xl p-12 max-w-xl backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3">Timeline Stages</h3>
              <p className="text-zinc-400 text-lg">
                Define stages from 0 to 1 — each with its own animation.
                Opacity, position, scale, rotation — anything GSAP can animate.
              </p>
            </div>
          </div>
        </ScrollStage>

        {/* Stage 4: Both cards slide out, final message */}
        <ScrollStage
          start={0.7}
          end={0.9}
          from={{ opacity: 0, scale: 0.5 }}
          to={{ opacity: 1, scale: 1 }}
        >
          <div className="h-full flex items-center justify-center px-6">
            <div className="text-center">
              <div className="text-7xl md:text-9xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Done.
              </div>
              <p className="text-zinc-500 text-xl mt-4">
                5 viewport heights of pinned scroll orchestration.
              </p>
            </div>
          </div>
        </ScrollStage>
      </ScrollOrchestrator>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2) ClipPath Reveal Demo — 5 presets
// ─────────────────────────────────────────────────────────────────────────────

function ClipPathDemo() {
  const presets: Array<{
    name: string;
    preset: "circle" | "horizontal" | "vertical" | "diagonal" | "diamond";
    gradient: string;
    description: string;
  }> = [
    {
      name: "Circle Expand",
      preset: "circle",
      gradient: "from-purple-600 to-pink-600",
      description: "Expands from center outward in a circle",
    },
    {
      name: "Horizontal Wipe",
      preset: "horizontal",
      gradient: "from-cyan-500 to-blue-600",
      description: "Wipes in from left to right",
    },
    {
      name: "Vertical Reveal",
      preset: "vertical",
      gradient: "from-green-500 to-emerald-600",
      description: "Slides up from bottom",
    },
    {
      name: "Diagonal",
      preset: "diagonal",
      gradient: "from-orange-500 to-red-600",
      description: "Reveals with a diagonal polygon sweep",
    },
    {
      name: "Diamond",
      preset: "diamond",
      gradient: "from-violet-500 to-purple-700",
      description: "Expands as a diamond shape from center",
    },
  ];

  return (
    <section className="py-32">
      <SectionLabel
        title="Clip-Path Reveal"
        description="Scroll-linked clip-path animations. Each element reveals with a different mask shape as you scroll past it. 5 built-in presets."
      />

      <div className="max-w-6xl mx-auto px-6 space-y-24">
        {presets.map((item) => (
          <ClipPathReveal
            key={item.name}
            preset={item.preset}
            start="top 80%"
            end="top 30%"
          >
            <div
              className={cn(
                "bg-gradient-to-br rounded-2xl p-12 md:p-16",
                item.gradient
              )}
            >
              <div className="max-w-xl">
                <span className="text-white/60 text-sm font-mono uppercase tracking-wider">
                  preset: &quot;{item.preset}&quot;
                </span>
                <h3 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
                  {item.name}
                </h3>
                <p className="text-white/80 text-lg">{item.description}</p>
              </div>
            </div>
          </ClipPathReveal>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3) Scroll Velocity Demo — skew, blur, scale respond to scroll speed
// ─────────────────────────────────────────────────────────────────────────────

function VelocityDemo() {
  return (
    <section className="py-32">
      <SectionLabel
        title="Scroll Velocity"
        description="Elements react to how fast you scroll — not just position. Skew, blur, and scale intensify with speed. Try scrolling fast through this section."
      />

      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Skew demo */}
        <ScrollVelocityWrapper skew maxSkew={8}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12">
            <span className="text-pink-400 text-sm font-mono">
              skew: true | maxSkew: 8
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-3">
              Velocity Skew
            </h3>
            <p className="text-zinc-400 text-lg">
              This card tilts in the direction of scroll. The faster you scroll,
              the more it skews. Feels like the content has momentum.
            </p>
          </div>
        </ScrollVelocityWrapper>

        {/* Blur demo */}
        <ScrollVelocityWrapper blur skew={false} maxBlur={12}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12">
            <span className="text-cyan-400 text-sm font-mono">
              blur: true | maxBlur: 12
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-3">
              Velocity Blur
            </h3>
            <p className="text-zinc-400 text-lg">
              Fast scrolling blurs the content — like motion blur in a camera.
              Slow down and it snaps back into focus.
            </p>
          </div>
        </ScrollVelocityWrapper>

        {/* Combined */}
        <ScrollVelocityWrapper skew blur scale maxSkew={6} maxBlur={6}>
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-2xl p-8 md:p-12">
            <span className="text-purple-300 text-sm font-mono">
              skew + blur + scale combined
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-3">
              Full Velocity Response
            </h3>
            <p className="text-zinc-400 text-lg">
              Skew, blur, and scale all responding to scroll speed
              simultaneously. This is what real scroll physics feels like.
            </p>
          </div>
        </ScrollVelocityWrapper>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4) Depth Parallax Demo — CSS perspective-based 3D layers
// ─────────────────────────────────────────────────────────────────────────────

function DepthParallaxDemo() {
  return (
    <section className="py-32">
      <SectionLabel
        title="Depth Parallax"
        description="Real CSS perspective-based 3D depth. Layers at different Z positions move at different speeds as you scroll — creating actual depth, not fake offsets."
      />

      <div className="max-w-6xl mx-auto px-6">
        <DepthParallax perspective={1200} className="h-[600px] rounded-2xl overflow-hidden bg-black">
          {/* Far background layer */}
          <DepthLayer depth={-300} speed={0.3}>
            <div className="h-full flex items-center justify-center">
              <div className="grid grid-cols-6 gap-8 opacity-20">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-purple-500/40"
                  />
                ))}
              </div>
            </div>
          </DepthLayer>

          {/* Mid-ground layer */}
          <DepthLayer depth={-100} speed={0.15}>
            <div className="h-full flex items-center justify-center">
              <div className="flex gap-12">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-500/20 backdrop-blur-sm" />
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-pink-500/30 to-purple-600/30 border border-pink-500/20 backdrop-blur-sm mt-16" />
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-green-500/30 to-emerald-600/30 border border-green-500/20 backdrop-blur-sm" />
              </div>
            </div>
          </DepthLayer>

          {/* Foreground text */}
          <DepthLayer depth={50} speed={-0.1}>
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-5xl md:text-7xl font-black">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Real Depth
                  </span>
                </h3>
                <p className="text-zinc-500 mt-3 text-lg">
                  Three layers at different Z positions
                </p>
              </div>
            </div>
          </DepthLayer>
        </DepthParallax>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5) Horizontal Scroll Demo — Pinned horizontal scrolling gallery
// ─────────────────────────────────────────────────────────────────────────────

function HorizontalScrollDemo() {
  const items = [
    { title: "Architecture", color: "from-purple-600 to-indigo-600" },
    { title: "Typography", color: "from-pink-600 to-rose-600" },
    { title: "Photography", color: "from-cyan-600 to-blue-600" },
    { title: "Illustration", color: "from-green-600 to-emerald-600" },
    { title: "Motion Design", color: "from-orange-600 to-red-600" },
    { title: "3D Rendering", color: "from-violet-600 to-purple-600" },
  ];

  return (
    <section>
      <SectionLabel
        title="Horizontal Scroll"
        description="GSAP-pinned horizontal scrolling. The section pins to the viewport while content scrolls horizontally. Perfect for galleries and project showcases."
      />

      <HorizontalScrollSection>
        <div className="flex gap-8 pl-[10vw] pr-[10vw]">
          {items.map((item) => (
            <div
              key={item.title}
              className={cn(
                "flex-shrink-0 w-[70vw] md:w-[40vw] h-[60vh] rounded-2xl bg-gradient-to-br flex items-end p-10",
                item.color
              )}
            >
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-white">
                  {item.title}
                </h3>
                <p className="text-white/60 mt-2 text-lg">
                  Scroll horizontally →
                </p>
              </div>
            </div>
          ))}
        </div>
      </HorizontalScrollSection>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6) Text Reveal Scrub Demo — character-by-character on scroll
// ─────────────────────────────────────────────────────────────────────────────

function TextRevealDemo() {
  return (
    <section className="py-32">
      <SectionLabel
        title="Text Reveal Scrub"
        description="Each character fades in as you scroll — like Apple's product pages. The text is tied to scroll position, not time."
      />

      <div className="max-w-5xl mx-auto px-6">
        <TextRevealScrub
          text="Every great interface tells a story through motion. Scroll animations aren't decorations — they're the narrative thread that guides attention, reveals hierarchy, and creates emotional connection."
          className="text-3xl md:text-5xl font-bold leading-relaxed"
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7) Split Screen Scroll Demo
// ─────────────────────────────────────────────────────────────────────────────

function SplitScreenDemo() {
  return (
    <section className="py-32">
      <SectionLabel
        title="Split Screen Scroll"
        description="Two halves scrolling at different speeds — one faster, one slower. Creates a natural depth effect without any 3D transforms."
      />

      <div className="max-w-6xl mx-auto px-6">
        <SplitScreenScroll
          className="h-[80vh] rounded-2xl overflow-hidden"
          leftSpeed={0.3}
          rightSpeed={0.7}
          leftContent={
            <div className="h-[150%] flex flex-col gap-6 p-8">
              <div className="flex-1 rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-500/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-purple-300">
                  Slow Side
                </span>
              </div>
              <div className="flex-1 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-400/60">
                  0.3x speed
                </span>
              </div>
            </div>
          }
          rightContent={
            <div className="h-[150%] flex flex-col gap-6 p-8">
              <div className="flex-1 rounded-xl bg-gradient-to-br from-cyan-600/30 to-blue-600/30 border border-cyan-500/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-cyan-300">
                  Fast Side
                </span>
              </div>
              <div className="flex-1 rounded-xl bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-400/60">
                  0.7x speed
                </span>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8) Zoom Scroll Demo
// ─────────────────────────────────────────────────────────────────────────────

function ZoomScrollDemo() {
  return (
    <section className="py-32">
      <SectionLabel
        title="Zoom Scroll"
        description="Content scales up as you scroll through it — creating a dramatic zoom-in effect. Perfect for hero sections and product reveals."
      />

      <div className="max-w-6xl mx-auto px-6">
        <ZoomScroll fromScale={0.6} toScale={1.2} className="rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-16 md:p-24 text-center">
            <h3 className="text-5xl md:text-7xl font-black text-white mb-4">
              Zoom Into
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                The Details
              </span>
            </h3>
            <p className="text-indigo-300 text-xl max-w-md mx-auto">
              This entire section scales from 0.6x to 1.2x as you scroll
              through it
            </p>
          </div>
        </ZoomScroll>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9) Counter Animation Demo
// ─────────────────────────────────────────────────────────────────────────────

function CounterDemo() {
  return (
    <section className="py-32">
      <SectionLabel
        title="Counter Animation"
        description="Numbers count up when scrolled into view. GSAP-powered with customizable duration, start/end values, and formatting."
      />

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Components", end: 150, suffix: "+" },
          { label: "Animations", end: 40, suffix: "+" },
          { label: "Hooks", end: 6, suffix: "" },
          { label: "Design Directions", end: 4, suffix: "" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center"
          >
            <div className="text-4xl md:text-5xl font-black text-white mb-2">
              <CounterAnimation to={stat.end} duration={2} />
              <span className="text-purple-400">{stat.suffix}</span>
            </div>
            <p className="text-zinc-500 text-sm uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10) TextParallax Demo — Scrolling text
// ─────────────────────────────────────────────────────────────────────────────

function TextParallaxDemo() {
  return (
    <section className="py-16 overflow-hidden">
      <SectionLabel
        title="Text Parallax"
        description="Large text scrolling horizontally at different speeds. Direction and speed linked to scroll position."
      />

      <div className="space-y-4">
        <TextParallax
          text="SCROLL ANIMATIONS •"
          className="text-6xl md:text-8xl font-black text-white/10"
        />
        <TextParallax
          text="GSAP POWERED •"
          className="text-6xl md:text-8xl font-black text-purple-500/20"
          direction="right"
        />
        <TextParallax
          text="MOTION CRAFT •"
          className="text-6xl md:text-8xl font-black text-white/5"
        />
      </div>
    </section>
  );
}

// =============================================================================
// Main Page
// =============================================================================

export default function ScrollShowcasePage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <ScrollProgress />

      {/* Header */}
      <header className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <GradientText gradient="from-purple-400 to-pink-400">
              MotionCraft
            </GradientText>
          </Link>
          <AnimatedNavLink
            href="/demos"
            variant="underline"
            className="text-zinc-400"
          >
            ← Back to Demos
          </AnimatedNavLink>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="px-4 py-2 text-sm font-medium text-green-400 bg-green-500/10 rounded-full border border-green-500/20">
              GSAP ScrollTrigger
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            <TextGenerateEffect words="Scroll Animations" />
          </h1>

          <motion.p
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Pin sections, orchestrate timelines, reveal with clip-paths, react
            to velocity, parallax in 3D — all powered by GSAP ScrollTrigger.
            Keep scrolling.
          </motion.p>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <svg
              className="w-6 h-10 mx-auto text-zinc-600 animate-bounce"
              fill="none"
              viewBox="0 0 24 40"
              stroke="currentColor"
            >
              <rect
                x="1"
                y="1"
                width="22"
                height="38"
                rx="11"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* 1) Scroll Orchestrator */}
      <OrchestratorDemo />

      {/* 2) ClipPath Reveal */}
      <ClipPathDemo />

      {/* 3) Scroll Velocity */}
      <VelocityDemo />

      {/* 4) Depth Parallax */}
      <DepthParallaxDemo />

      {/* 5) Horizontal Scroll */}
      <HorizontalScrollDemo />

      {/* 6) Text Reveal Scrub */}
      <TextRevealDemo />

      {/* 7) Split Screen */}
      <SplitScreenDemo />

      {/* 8) Zoom Scroll */}
      <ZoomScrollDemo />

      {/* 9) Counter Animation */}
      <CounterDemo />

      {/* 10) Text Parallax */}
      <TextParallaxDemo />

      {/* CTA */}
      <section className="relative z-10 py-32 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Every component is{" "}
              <GradientText gradient="from-green-400 to-emerald-400" animate>
                copy-paste ready
              </GradientText>
            </h2>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              ScrollOrchestrator, ClipPathReveal, DepthParallax,
              ScrollVelocityWrapper — all available as self-contained TypeScript
              components.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <MagneticButton className="px-8 py-4">
                  Explore All Components
                </MagneticButton>
              </Link>
              <a
                href="https://github.com/itsjwill/nextjs-animated-components"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton className="px-8 py-4 bg-transparent border border-zinc-800">
                  View on GitHub
                </MagneticButton>
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
              MotionCraft
            </GradientText>
            {" "}&bull; The ultimate animation toolkit
          </p>
        </div>
      </footer>
    </main>
  );
}
