"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GradientText } from "@/components/text/gradient-text";
import {
  FadeIn,
  ScrollProgress,
  StaggerOnScroll,
  StaggerItem,
  TextParallax,
  HorizontalScrollSection,
  TextRevealScrub,
  CounterAnimation,
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
import { Spotlight } from "@/components/backgrounds/spotlight";
import { AnimatedNavLink } from "@/components/navigation";
import { MagneticButton } from "@/components/effects/magnetic-button";

// =============================================================================
// Hero — Cinematic entry with spotlight and massive typography
// =============================================================================

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient spotlight */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(120, 119, 198, 0.15)"
      />

      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/[0.03] blur-[150px]" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h1 className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.9] tracking-tighter">
            <span className="block text-white">Scroll</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Animations
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="mt-8 text-lg md:text-xl text-zinc-500 max-w-md mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Pin. Orchestrate. Reveal. Transform.
        </motion.p>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
              Scroll to explore
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-zinc-600 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Orchestrator — Apple-style pinned scroll storytelling
// =============================================================================

function OrchestratorSection() {
  return (
    <section className="relative">
      <ScrollOrchestrator duration={6} scrub={1.5}>
        {/* Stage 1: "Immersive" fades in with glow */}
        <ScrollStage
          start={0}
          end={0.15}
          from={{ opacity: 0, scale: 0.8 }}
          to={{ opacity: 1, scale: 1 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Ambient glow behind text */}
            <div className="absolute w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full" />
            <h2 className="relative text-[clamp(3rem,10vw,9rem)] font-black tracking-tighter text-white text-center leading-[0.95]">
              Immersive
            </h2>
          </div>
        </ScrollStage>

        {/* Stage 2: "Immersive" fades, "Pinned. Sequenced." appears */}
        <ScrollStage
          start={0.15}
          end={0.35}
          from={{ opacity: 0, y: 80 }}
          to={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="text-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-cyan-500/[0.04] blur-[100px] rounded-full" />
              </div>
              <p className="relative text-[clamp(1.5rem,5vw,4rem)] font-bold text-zinc-100 leading-tight">
                Pinned. Sequenced.
                <br />
                <span className="text-zinc-500">Orchestrated.</span>
              </p>
            </div>
          </div>
        </ScrollStage>

        {/* Stage 3: Stats emerge */}
        <ScrollStage
          start={0.4}
          end={0.6}
          from={{ opacity: 0, scale: 0.9 }}
          to={{ opacity: 1, scale: 1 }}
        >
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
              {[
                { number: "5", unit: "viewports", detail: "of scroll runway" },
                { number: "1", unit: "timeline", detail: "scrubbed to scroll" },
                {
                  number: "\u221E",
                  unit: "possibilities",
                  detail: "per orchestration",
                },
              ].map((stat) => (
                <div key={stat.unit} className="text-center">
                  <div className="text-6xl md:text-8xl font-black bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm uppercase tracking-[0.2em] text-zinc-500 mt-2">
                    {stat.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollStage>

        {/* Stage 4: Everything fades, closing statement */}
        <ScrollStage
          start={0.7}
          end={0.9}
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="text-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] bg-pink-500/[0.05] blur-[100px] rounded-full" />
              </div>
              <p className="relative text-2xl md:text-4xl font-light text-zinc-400 max-w-2xl leading-relaxed">
                The viewport stays locked.
                <br />
                <span className="text-white font-medium">
                  The story unfolds.
                </span>
              </p>
            </div>
          </div>
        </ScrollStage>
      </ScrollOrchestrator>
    </section>
  );
}

// =============================================================================
// Clip-Path Reveals — Cinematic content reveals
// =============================================================================

function ClipPathSection() {
  return (
    <section className="py-40 space-y-32">
      {/* Circle Expand */}
      <ClipPathReveal preset="circle" start="top 75%" end="top 20%">
        <div className="relative h-[70vh] bg-gradient-to-br from-[#1a0533] via-[#0f0326] to-black flex items-center justify-center overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full" />
          <div className="relative text-center px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400/60 mb-4">
              Circle Reveal
            </p>
            <h3 className="text-5xl md:text-8xl font-black text-white leading-[0.95]">
              From
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Nothing
              </span>
            </h3>
          </div>
        </div>
      </ClipPathReveal>

      {/* Horizontal Wipe */}
      <ClipPathReveal preset="horizontal" start="top 75%" end="top 20%">
        <div className="relative h-[60vh] bg-gradient-to-r from-cyan-950 via-[#0a1628] to-[#0a0a0a] flex items-center overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-cyan-500/10 to-transparent" />
          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/50 mb-4">
              Horizontal Wipe
            </p>
            <h3 className="text-4xl md:text-7xl font-black text-white leading-[0.95] mb-6">
              Sweep into view.
            </h3>
            <p className="text-xl text-zinc-500 max-w-lg font-light">
              Content revealed with a directional mask — left to right, synced to
              scroll position.
            </p>
          </div>
        </div>
      </ClipPathReveal>

      {/* Diamond Reveal */}
      <ClipPathReveal preset="diamond" start="top 75%" end="top 20%">
        <div className="relative h-[70vh] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
          {/* Neon accent lines */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full" />
          <div className="relative text-center px-6">
            <div className="text-7xl md:text-[10rem] font-black bg-gradient-to-b from-violet-300 to-violet-600/30 bg-clip-text text-transparent leading-none">
              &diams;
            </div>
            <p className="text-zinc-500 text-lg mt-4 font-light">
              Five clip-path presets. Any shape you need.
            </p>
          </div>
        </div>
      </ClipPathReveal>
    </section>
  );
}

// =============================================================================
// Velocity — Scroll speed reactive elements
// =============================================================================

function VelocitySection() {
  return (
    <section className="py-40">
      <div className="max-w-5xl mx-auto px-6 mb-20 text-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.3em] text-pink-400/50 mb-6">
            Velocity Reactive
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Scroll faster.
            <br />
            <span className="text-zinc-600">Feel the difference.</span>
          </h2>
        </FadeIn>
      </div>

      <div className="space-y-6 max-w-5xl mx-auto px-6">
        <ScrollVelocityWrapper skew maxSkew={10}>
          <div className="py-12 md:py-16 border-t border-b border-zinc-900">
            <h3 className="text-5xl md:text-8xl font-black bg-gradient-to-r from-white to-zinc-600 bg-clip-text text-transparent">
              Momentum
            </h3>
          </div>
        </ScrollVelocityWrapper>

        <ScrollVelocityWrapper blur skew={false} maxBlur={15}>
          <div className="py-12 md:py-16">
            <h3 className="text-5xl md:text-8xl font-black text-zinc-800">
              Motion Blur
            </h3>
          </div>
        </ScrollVelocityWrapper>

        <ScrollVelocityWrapper skew blur scale maxSkew={8} maxBlur={8}>
          <div className="py-12 md:py-16 border-t border-b border-zinc-900">
            <h3 className="text-5xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Everything
            </h3>
          </div>
        </ScrollVelocityWrapper>
      </div>
    </section>
  );
}

// =============================================================================
// Depth Parallax — Multi-layer 3D scene
// =============================================================================

function DepthSection() {
  return (
    <section className="py-40">
      <div className="max-w-5xl mx-auto px-6 mb-20 text-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/50 mb-6">
            CSS Perspective
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Real depth.
          </h2>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <DepthParallax
          perspective={1200}
          className="h-[80vh] rounded-3xl overflow-hidden bg-[#050510]"
        >
          {/* Deep background — stars/dots */}
          <DepthLayer depth={-400} speed={0.4}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-8 gap-10 opacity-15">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white"
                    style={{ opacity: 0.2 + Math.random() * 0.8 }}
                  />
                ))}
              </div>
            </div>
          </DepthLayer>

          {/* Mid-ground — floating shapes */}
          <DepthLayer depth={-150} speed={0.2}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute top-[20%] left-[15%] w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-700/10 border border-purple-500/10 backdrop-blur-sm rotate-12" />
                <div className="absolute top-[60%] right-[20%] w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-700/5 border border-cyan-500/10" />
                <div className="absolute bottom-[25%] left-[40%] w-20 h-20 rounded-xl bg-gradient-to-br from-pink-500/15 to-rose-700/5 border border-pink-500/10 -rotate-6" />
              </div>
            </div>
          </DepthLayer>

          {/* Near foreground — ambient glow + text */}
          <DepthLayer depth={100} speed={-0.15}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[500px] h-[500px] bg-indigo-500/[0.06] blur-[100px] rounded-full" />
              <div className="relative text-center">
                <h3 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter">
                  Depth
                </h3>
                <p className="text-zinc-600 text-lg mt-4 font-light">
                  Three Z-layers. One perspective.
                </p>
              </div>
            </div>
          </DepthLayer>
        </DepthParallax>
      </div>
    </section>
  );
}

// =============================================================================
// Text Reveal — Full viewport cinematic text scrub
// =============================================================================

function TextRevealSection() {
  return (
    <section className="relative py-40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/[0.03] blur-[150px] rounded-full" />
      <div className="max-w-5xl mx-auto px-6">
        <TextRevealScrub
          text="Every scroll tells a story. The best interfaces don't just display information \u2014 they orchestrate it. Motion creates meaning. Timing creates tension. And the scroll becomes the narrative."
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight"
        />
      </div>
    </section>
  );
}

// =============================================================================
// Horizontal Scroll — Premium gallery
// =============================================================================

function HorizontalSection() {
  const panels = [
    {
      num: "01",
      title: "Pin & Scrub",
      gradient: "from-purple-950 to-indigo-950",
      accent: "purple",
    },
    {
      num: "02",
      title: "Clip Reveals",
      gradient: "from-cyan-950 to-blue-950",
      accent: "cyan",
    },
    {
      num: "03",
      title: "Velocity",
      gradient: "from-pink-950 to-rose-950",
      accent: "pink",
    },
    {
      num: "04",
      title: "3D Depth",
      gradient: "from-emerald-950 to-green-950",
      accent: "emerald",
    },
    {
      num: "05",
      title: "Zoom & Scale",
      gradient: "from-orange-950 to-amber-950",
      accent: "orange",
    },
    {
      num: "06",
      title: "Text Scrub",
      gradient: "from-violet-950 to-purple-950",
      accent: "violet",
    },
  ];

  return (
    <section>
      <div className="max-w-5xl mx-auto px-6 mb-20 text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Horizontal.
          </h2>
          <p className="text-zinc-600 text-lg mt-4 font-light">
            Vertical scroll. Horizontal motion.
          </p>
        </FadeIn>
      </div>

      <HorizontalScrollSection>
        <div className="flex gap-8 pl-[10vw] pr-[10vw]">
          {panels.map((panel) => (
            <div
              key={panel.num}
              className={cn(
                "flex-shrink-0 w-[80vw] md:w-[45vw] h-[70vh] rounded-3xl bg-gradient-to-br relative overflow-hidden flex flex-col justify-between p-10 md:p-14",
                panel.gradient
              )}
            >
              {/* Large number watermark */}
              <div className="absolute -right-6 -top-8 text-[15rem] font-black text-white/[0.03] leading-none select-none">
                {panel.num}
              </div>

              {/* Number indicator */}
              <div>
                <span className="text-sm font-mono text-zinc-500">
                  {panel.num}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  {panel.title}
                </h3>
                <div
                  className={cn(
                    "w-16 h-1 rounded-full mt-6",
                    panel.accent === "purple" && "bg-purple-500",
                    panel.accent === "cyan" && "bg-cyan-500",
                    panel.accent === "pink" && "bg-pink-500",
                    panel.accent === "emerald" && "bg-emerald-500",
                    panel.accent === "orange" && "bg-orange-500",
                    panel.accent === "violet" && "bg-violet-500"
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </HorizontalScrollSection>
    </section>
  );
}

// =============================================================================
// Zoom Scroll — Dramatic zoom reveal
// =============================================================================

function ZoomSection() {
  return (
    <section className="py-40">
      <ZoomScroll fromScale={0.5} toScale={1.15}>
        <div className="relative bg-[#060612] rounded-3xl overflow-hidden mx-6">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full" />
          <div className="relative py-32 md:py-48 px-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-400/50 mb-8">
              Zoom Scroll
            </p>
            <h3 className="text-5xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter">
              Pull into
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                focus.
              </span>
            </h3>
          </div>
        </div>
      </ZoomScroll>
    </section>
  );
}

// =============================================================================
// Stats — Counter animation with cinematic layout
// =============================================================================

function StatsSection() {
  return (
    <section className="relative py-40 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/[0.03] blur-[150px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-white">
            By the numbers.
          </h2>
        </FadeIn>

        <StaggerOnScroll staggerDelay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-900 rounded-3xl overflow-hidden">
            {[
              {
                to: 150,
                suffix: "+",
                label: "Components",
                color: "from-purple-400 to-pink-400",
              },
              {
                to: 10,
                suffix: "",
                label: "Scroll Effects",
                color: "from-cyan-400 to-blue-400",
              },
              {
                to: 6,
                suffix: "",
                label: "Custom Hooks",
                color: "from-green-400 to-emerald-400",
              },
              {
                to: 4,
                suffix: "",
                label: "Design Systems",
                color: "from-orange-400 to-red-400",
              },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="bg-[#0a0a0a] p-8 md:p-12 text-center">
                  <div className="text-5xl md:text-7xl font-black mb-3">
                    <span
                      className={cn(
                        "bg-gradient-to-b bg-clip-text text-transparent",
                        stat.color
                      )}
                    >
                      <CounterAnimation to={stat.to} duration={2.5} />
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerOnScroll>
      </div>
    </section>
  );
}

// =============================================================================
// Text Parallax — Dramatic scrolling text
// =============================================================================

function TextParallaxSection() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="space-y-2">
        <TextParallax
          text="SCROLL ANIMATIONS \u2022"
          className="text-[clamp(3rem,10vw,8rem)] font-black text-white/[0.04]"
        />
        <TextParallax
          text="GSAP POWERED \u2022"
          className="text-[clamp(3rem,10vw,8rem)] font-black text-purple-500/[0.08]"
          direction="right"
        />
        <TextParallax
          text="MOTION CRAFT \u2022"
          className="text-[clamp(3rem,10vw,8rem)] font-black text-white/[0.03]"
        />
      </div>
    </section>
  );
}

// =============================================================================
// CTA — Clean closing
// =============================================================================

function CTASection() {
  return (
    <section className="relative py-40 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/[0.04] blur-[150px] rounded-full" />
      <div className="relative max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Every component.
            <br />
            <GradientText gradient="from-purple-400 to-pink-400" animate>
              Copy-paste ready.
            </GradientText>
          </h2>
          <p className="text-lg text-zinc-500 mb-12 max-w-xl mx-auto font-light">
            ScrollOrchestrator. ClipPathReveal. DepthParallax.
            ScrollVelocityWrapper. All TypeScript. All yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <MagneticButton className="px-8 py-4">
                Explore Components
              </MagneticButton>
            </Link>
            <a
              href="https://github.com/itsjwill/motion-primitives-website"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MagneticButton className="px-8 py-4 bg-transparent border border-zinc-800">
                GitHub
              </MagneticButton>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// =============================================================================
// Main Page
// =============================================================================

export default function ScrollShowcasePage() {
  return (
    <main className="relative bg-black text-white selection:bg-purple-500/30">
      <ScrollProgress color="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" height={2} />

      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
          >
            Motion Primitives
          </Link>
          <AnimatedNavLink
            href="/demos"
            variant="underline"
            className="text-sm text-zinc-500"
          >
            Demos
          </AnimatedNavLink>
        </div>
      </header>

      <Hero />

      {/* Chapter divider */}
      <div className="h-32 bg-gradient-to-b from-black to-[#050505]" />

      <OrchestratorSection />

      <div className="h-40" />

      <ClipPathSection />

      <VelocitySection />

      {/* Dramatic text parallax break */}
      <TextParallaxSection />

      <DepthSection />

      <TextRevealSection />

      <div className="h-20" />

      <HorizontalSection />

      <div className="h-40" />

      <ZoomSection />

      <StatsSection />

      <CTASection />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-900/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-700 text-xs">
            Built with{" "}
            <GradientText gradient="from-purple-400 to-pink-400">
              Motion Primitives
            </GradientText>
          </p>
        </div>
      </footer>
    </main>
  );
}
