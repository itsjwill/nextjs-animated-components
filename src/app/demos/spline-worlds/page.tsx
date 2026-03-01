"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
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

const NeonSamurai = dynamic(
  () =>
    import("@/components/three/robots/neon-samurai").then(
      (m) => m.NeonSamurai
    ),
  { ssr: false, loading: () => <SceneLoader /> }
);

const BubbleBot = dynamic(
  () =>
    import("@/components/three/robots/bubble-bot").then((m) => m.BubbleBot),
  { ssr: false, loading: () => <SceneLoader /> }
);

const ChromeTitan = dynamic(
  () =>
    import("@/components/three/robots/chrome-titan").then(
      (m) => m.ChromeTitan
    ),
  { ssr: false, loading: () => <SceneLoader /> }
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

const scenes = [
  {
    id: "nexbot",
    title: "Interactive Robot",
    subtitle: "Cursor-Tracking Character",
    description:
      "A 3D robot character that follows your cursor in real-time. Move your mouse around the scene — it tracks you. Built entirely in Spline with cursor-follow states and hover reactions.",
    splineUrl: "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
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

const robotVariants = [
  {
    id: "neon-samurai",
    title: "Neon Samurai",
    subtitle: "Cyberpunk Warrior",
    description:
      "Angular samurai armor forged from pure darkness. Neon green visor slits pulse with scanning energy. Red blade wings extend from the helmet. Wrist-mounted beam katanas glow at the forearms. This robot was built to hunt — and it's locked onto your cursor.",
    gradient: "from-emerald-400 to-cyan-500",
    spotlightColor: "#00ffaa",
    tech: "Samurai Armor • Neon Accents • Wrist Blades • Visor Tracking",
    Component: NeonSamurai,
  },
  {
    id: "bubble-bot",
    title: "Bubble Bot",
    subtitle: "Friendly Companion",
    description:
      "All soft curves and pastel warmth. Big round eyes that blink. Rosy cheeks that glow. A glowing antenna bobbing on top. Arms that wave at you. This robot doesn't fight — it makes you smile. Bounces gently in place, tilts its head when curious, and never stops watching you with those giant doe eyes.",
    gradient: "from-purple-400 to-pink-400",
    spotlightColor: "#c084fc",
    tech: "Sphere Geometry • Blinking Eyes • Arm Animation • Head Tilt",
    Component: BubbleBot,
  },
  {
    id: "chrome-titan",
    title: "Chrome Titan",
    subtitle: "Heavy Artillery Unit",
    description:
      "Pure chrome. Massive shoulders. Gold trim on every edge. A blue reactor core pulses in the chest. This is the final boss — 8 feet of reflective metal that barely moves because it doesn't need to. Slow, deliberate head tracking. Blue slit eyes that see everything. Built like a tank, polished like a trophy.",
    gradient: "from-blue-400 to-indigo-500",
    spotlightColor: "#3b82f6",
    tech: "Chrome PBR • Gold Accents • Reactor Core • Heavy Chassis",
    Component: ChromeTitan,
  },
];

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

function RobotCard({
  robot,
  index,
}: {
  robot: (typeof robotVariants)[0];
  index: number;
}) {
  const isReversed = index % 2 === 1;
  const sceneNumber = scenes.length + index + 1;

  return (
    <FadeIn delay={0.1}>
      <Card className="w-full bg-black/[0.96] relative overflow-hidden border-zinc-800">
        <Spotlight
          className={
            isReversed
              ? "-top-40 right-0 md:right-60 md:-top-20"
              : "-top-40 left-0 md:left-60 md:-top-20"
          }
          fill={robot.spotlightColor}
        />

        <div
          className={`flex flex-col ${
            isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
          } min-h-[600px]`}
        >
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${robot.gradient} text-white w-fit`}
              >
                Scene {sceneNumber}
              </span>
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-zinc-400 border border-zinc-700 w-fit">
                Custom R3F
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              {robot.title}
            </h2>
            <p className="text-zinc-500 text-sm uppercase tracking-wider mb-4">
              {robot.subtitle}
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6 max-w-md">
              {robot.description}
            </p>
            <span className="text-xs text-zinc-600 font-mono">
              {robot.tech}
            </span>
          </div>

          <div className="flex-1 relative min-h-[500px]">
            <robot.Component className="w-full h-full absolute inset-0" />
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
              Spline 3D + Custom R3F Robots
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
            Twelve interactive 3D scenes. Nine Spline worlds plus three
            hand-coded robot characters — each built from scratch in React Three
            Fiber with their own design, personality, and cursor tracking.
          </motion.p>
        </div>
      </section>

      {/* Standard Spline Scenes */}
      <section className="relative z-10 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {scenes.map((scene, i) => (
            <SceneCard key={scene.id} scene={scene} index={i} />
          ))}
        </div>
      </section>

      {/* Custom Robot Characters Section */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="px-4 py-2 text-sm font-medium text-rose-400 bg-rose-500/10 rounded-full border border-rose-500/20">
                Hand-Coded • Zero Dependencies • Pure Three.js
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
                Custom Robot Characters
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Three standing robot characters built entirely from code — no
                Spline, no imported models, no shortcuts. Every joint, every
                glow, every animation is hand-crafted geometry. Each one tracks
                your cursor with its own personality.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-12">
            {robotVariants.map((robot, i) => (
              <RobotCard key={robot.id} robot={robot} index={i} />
            ))}
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
