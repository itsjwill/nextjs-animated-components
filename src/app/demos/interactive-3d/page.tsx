"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { TextGenerateEffect } from "@/components/text/text-generate";
import { GradientText } from "@/components/text/gradient-text";
import { FadeIn, ScrollProgress } from "@/components/scroll";
import { AnimatedNavLink } from "@/components/navigation";

// Dynamic imports for heavy Three.js scenes
const GravityWell = dynamic(
  () =>
    import("@/components/three/experimental/gravity-well").then(
      (m) => m.GravityWell
    ),
  { ssr: false, loading: () => <SceneLoader /> }
);

const SwarmIntelligence = dynamic(
  () =>
    import("@/components/three/experimental/swarm-intelligence").then(
      (m) => m.SwarmIntelligence
    ),
  { ssr: false, loading: () => <SceneLoader /> }
);

const SoundFabric = dynamic(
  () =>
    import("@/components/three/experimental/sound-fabric").then(
      (m) => m.SoundFabric
    ),
  { ssr: false, loading: () => <SceneLoader /> }
);

const LivingTrail = dynamic(
  () =>
    import("@/components/three/experimental/living-trail").then(
      (m) => m.LivingTrail
    ),
  { ssr: false, loading: () => <SceneLoader /> }
);

const DimensionalRift = dynamic(
  () =>
    import("@/components/three/experimental/dimensional-rift").then(
      (m) => m.DimensionalRift
    ),
  { ssr: false, loading: () => <SceneLoader /> }
);

const MagneticFluid = dynamic(
  () =>
    import("@/components/three/experimental/magnetic-fluid").then(
      (m) => m.MagneticFluid
    ),
  { ssr: false, loading: () => <SceneLoader /> }
);

function SceneLoader() {
  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-black/50 rounded-xl">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-zinc-500 text-sm">Loading scene...</span>
      </div>
    </div>
  );
}

const scenes = [
  {
    title: "Gravity Well",
    subtitle: "Black Hole Cursor",
    description:
      "4,000 particles orbit in space. Move your cursor to create a gravitational singularity — particles spaghettify, glow hot orange, and get consumed. They respawn at the edge of the accretion disc.",
    tech: "InstancedMesh • Gravity Physics • Color Heat Map",
    gradient: "from-orange-500 to-red-600",
    component: GravityWell,
  },
  {
    title: "Swarm Intelligence",
    subtitle: "Morphing Collective",
    description:
      "3,000 boids auto-morph between a sphere, DNA double helix, torus knot, and infinity sign every 4 seconds. Cursor repels nearby particles. Each transition uses cubic ease-out interpolation.",
    tech: "Boid Flocking • Shape Morphing • Golden Angle Distribution",
    gradient: "from-violet-500 to-purple-600",
    component: SwarmIntelligence,
  },
  {
    title: "Sound Fabric",
    subtitle: "Rippling Mesh Surface",
    description:
      "A 6,400-vertex wireframe mesh that responds to your cursor like a liquid surface. Move to create ripples. Click for shockwaves. Multiple ripples interfere and decay naturally.",
    tech: "BufferGeometry • Wave Propagation • Vertex Normals",
    gradient: "from-indigo-500 to-blue-600",
    component: SoundFabric,
  },
  {
    title: "Living Trail",
    subtitle: "Cursor Sculpture",
    description:
      "Your mouse movements leave behind permanent crystalline geometry that breathes and drifts. Each point inherits cursor velocity and slowly settles into a floating sculpture. Up to 2,000 dodecahedrons.",
    tech: "Dodecahedron Instancing • Velocity Inheritance • HSL Color",
    gradient: "from-pink-500 to-rose-600",
    component: LivingTrail,
  },
  {
    title: "Dimensional Rift",
    subtitle: "Portal Wormhole",
    description:
      "40 concentric rings of particles form a tunnel through spacetime. Hover to warp the entrance — inner rings accelerate, wobble, and pull toward your cursor. 2,400 particles total.",
    tech: "Ring Topology • Warp Drive Physics • Depth Gradient",
    gradient: "from-cyan-500 to-teal-600",
    component: DimensionalRift,
  },
  {
    title: "Magnetic Fluid",
    subtitle: "Ferrofluid Simulation",
    description:
      "2,500 metallic spikes arranged in a sunflower pattern on a reflective disc. Hover to simulate a magnetic field — spikes rise, lean toward cursor, and pulse. Real ferrofluid dynamics.",
    tech: "Sunflower Phyllotaxis • Magnetic Field • PBR Metallic",
    gradient: "from-emerald-500 to-green-600",
    component: MagneticFluid,
  },
];

export default function Interactive3DPage() {
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
            <span className="px-4 py-2 text-sm font-medium text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20">
              Experimental • Three.js / R3F
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <TextGenerateEffect words="Interactive 3D" />
          </h1>

          <motion.p
            className="text-xl text-zinc-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Six experimental scenes built entirely in code with React Three
            Fiber. No external 3D models, no Spline — just math, physics, and
            thousands of particles. Move your cursor to interact.
          </motion.p>
        </div>
      </section>

      {/* Scenes */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {scenes.map((scene, i) => (
            <FadeIn key={scene.title} delay={0.1}>
              <div
                className={`flex flex-col ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-8 items-center`}
              >
                {/* Scene Canvas */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-black aspect-[4/3]">
                    <scene.component className="w-full h-full absolute inset-0" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 w-full lg:max-w-md">
                  <div className="space-y-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${scene.gradient} text-white`}
                    >
                      Scene {i + 1}
                    </span>
                    <h2 className="text-4xl font-bold">{scene.title}</h2>
                    <p className="text-zinc-500 text-sm uppercase tracking-wider">
                      {scene.subtitle}
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                      {scene.description}
                    </p>
                    <div className="pt-2">
                      <span className="text-xs text-zinc-600 font-mono">
                        {scene.tech}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Code Example */}
      <section className="relative z-10 py-20 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Use Any Scene
            </h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 font-mono text-sm">
              <pre className="text-zinc-300 overflow-x-auto">
                <code>{`import { GravityWell } from "@/components/three/experimental/gravity-well"
import { SwarmIntelligence } from "@/components/three/experimental/swarm-intelligence"
import { SoundFabric } from "@/components/three/experimental/sound-fabric"
import { LivingTrail } from "@/components/three/experimental/living-trail"
import { DimensionalRift } from "@/components/three/experimental/dimensional-rift"
import { MagneticFluid } from "@/components/three/experimental/magnetic-fluid"

// Drop into any page — each scene is self-contained
<GravityWell className="w-full h-[600px]" />
<SwarmIntelligence className="w-full h-[600px]" />
<MagneticFluid className="w-full h-[600px]" />`}</code>
              </pre>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-zinc-600 text-sm">
            Built with{" "}
            <GradientText gradient="from-purple-400 to-pink-400">
              React Three Fiber
            </GradientText>
          </p>
          <Link href="/demos" className="text-zinc-500 text-sm hover:text-white transition-colors">
            ← Back to Demos
          </Link>
        </div>
      </footer>
    </main>
  );
}
