"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShaderDistortionButton,
  InkBleedButton,
  ClothButton,
  PortalButton,
  SwarmButton,
  LiquidMetalButton,
  ReactiveShadowButton,
  StickerPeelButton,
  ThermalButton,
  MomentumButton,
} from "@/components/buttons/premium-buttons";
import { FeatureShowcase } from "@/components/cards/feature-showcase";
import { LivingSystem, NeuralWeb, SynapseCard } from "@/components/cards/living-system";

// =============================================================================
// Showcase Page — Full power demonstration
// =============================================================================

export default function ShowcasePage() {
  return (
    <main className="relative bg-zinc-950 min-h-screen">
      {/* Hero with Neural Web background */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <NeuralWeb
          nodeCount={60}
          color="cyan"
          sensitivity={0.9}
          connectionRadius={140}
          className="absolute inset-0 min-h-[80vh]"
        />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Components That Don&apos;t Exist Anywhere Else
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            The Unthinkable
          </motion.h1>
          <motion.p
            className="text-zinc-400 text-lg max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            WebGL shaders. Verlet physics. Boid flocking. Fluid simulation.
            Living organisms rendered as UI. Move your cursor — the network recoils.
          </motion.p>

          {/* Hero CTA buttons using our own components */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <ShaderDistortionButton intensity={0.04} className="text-lg px-10 py-5">
              Explore Components
            </ShaderDistortionButton>
            <PortalButton portalColor="#06b6d4" className="text-lg px-10 py-5">
              Enter the Portal
            </PortalButton>
          </motion.div>
        </div>
      </section>

      {/* Section: Premium Buttons Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="PREMIUM BUTTONS"
            title="10 Interactions Nobody Has"
            subtitle="WebGL, Canvas, physics simulations, fluid dynamics — as buttons."
          />

          {/* Row 1: The heavy hitters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <DemoCard
              title="Shader Distortion"
              description="GPU-computed water ripples on hover"
              tech="WebGL"
            >
              <ShaderDistortionButton intensity={0.04}>
                Hover Me
              </ShaderDistortionButton>
            </DemoCard>

            <DemoCard
              title="Cloth Physics"
              description="Verlet integration fabric mesh"
              tech="Canvas"
            >
              <ClothButton meshColor="rgba(6, 182, 212, 0.5)">
                Push the Fabric
              </ClothButton>
            </DemoCard>

            <DemoCard
              title="Swarm Text"
              description="Boid flocking particle system"
              tech="Canvas"
            >
              <SwarmButton particleColor="#06b6d4">
                SWARM
              </SwarmButton>
            </DemoCard>
          </div>

          {/* Row 2: Click effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <DemoCard
              title="Ink Bleed"
              description="Fluid simulation on click"
              tech="Canvas"
            >
              <InkBleedButton inkColor="rgba(139, 92, 246, 0.8)">
                Click to Bleed
              </InkBleedButton>
            </DemoCard>

            <DemoCard
              title="Portal Vortex"
              description="Spiraling wormhole on click"
              tech="Canvas"
            >
              <PortalButton portalColor="#8b5cf6">
                Open Portal
              </PortalButton>
            </DemoCard>

            <DemoCard
              title="Thermal"
              description="Heats up the longer you hover"
              tech="DOM"
            >
              <ThermalButton>
                Hold to Heat
              </ThermalButton>
            </DemoCard>
          </div>

          {/* Row 3: Physics & surfaces */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DemoCard
              title="Liquid Metal"
              description="Chrome reflections"
              tech="CSS"
            >
              <LiquidMetalButton>
                Chrome
              </LiquidMetalButton>
            </DemoCard>

            <DemoCard
              title="Reactive Shadow"
              description="Cursor = light source"
              tech="DOM"
            >
              <ReactiveShadowButton shadowColor="rgba(6, 182, 212, 0.5)">
                Illuminate
              </ReactiveShadowButton>
            </DemoCard>

            <DemoCard
              title="Sticker Peel"
              description="3D peel-off effect"
              tech="Framer"
            >
              <StickerPeelButton>
                Peel Me
              </StickerPeelButton>
            </DemoCard>

            <DemoCard
              title="Momentum"
              description="Physics inertia on leave"
              tech="RAF"
            >
              <MomentumButton>
                Flick Me
              </MomentumButton>
            </DemoCard>
          </div>
        </div>
      </section>

      {/* Section: Feature Showcase */}
      <section className="py-24 px-6 border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <FeatureShowcase
            label="AI SYSTEMS"
            title="Smart Call Handling"
            subtitle="Title companies need reliable answering services to handle client calls 24/7."
            color="cyan"
            items={[
              {
                id: "routing",
                title: "Smart Call Routing",
                category: "Call Handling",
                description: "AI routes calls to the right department based on intent analysis.",
                tags: ["AI", "NLP"],
                demo: <PulsingOrb color="cyan" label="Smart Routing" />,
                code: `const router = new CallRouter();
router.configure({
  mode: "ai_intent",
  fallback: "human_agent",
  confidence_threshold: 0.85,
});

router.on("incoming", async (call) => {
  const intent = await ai.classify(call.transcript);
  const dept = router.match(intent);
  await call.transfer(dept);
});`,
              },
              {
                id: "info",
                title: "Client Information Access",
                category: "Call Handling",
                description: "Instant access to client records during live calls.",
                tags: ["Database", "Real-time"],
                demo: <PulsingOrb color="purple" label="Client Lookup" />,
                code: `const lookup = new ClientLookup({
  sources: [ClientDB, TitleSoftware],
  cache: true,
});

lookup.on("query", async (phone) => {
  const client = await lookup.find(phone);
  return {
    name: client.name,
    active_orders: client.orders,
    last_interaction: client.lastCall,
  };
});`,
              },
              {
                id: "scheduling",
                title: "Appointment Scheduling",
                category: "Automation",
                description: "AI schedules appointments by checking real-time availability.",
                tags: ["Calendar", "Automation"],
                demo: <PulsingOrb color="emerald" label="Auto-Schedule" />,
                code: `const scheduler = new Scheduler({
  calendar: GoogleCalendar,
  timezone: "America/New_York",
  buffer_minutes: 15,
});

scheduler.on("request", async (req) => {
  const slots = await scheduler.available(req.date);
  const best = scheduler.optimize(slots, req.preferences);
  await scheduler.book(best);
});`,
              },
              {
                id: "emergency",
                title: "Emergency Response",
                category: "Automation",
                description: "Critical calls are escalated immediately with full context.",
                tags: ["Priority", "Escalation"],
                demo: <PulsingOrb color="orange" label="Alert System" />,
                code: `const emergency = new EmergencyHandler({
  keywords: ["urgent", "closing today", "wire fraud"],
  escalation_chain: [OnCall, Manager, Director],
  max_response_time: 30, // seconds
});

emergency.on("detected", async (call) => {
  await notify.all(emergency.escalation_chain);
  await call.flag("PRIORITY_1");
});`,
              },
            ]}
          />
        </div>
      </section>

      {/* Section: Living System */}
      <section className="py-24 px-6 border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="LIVING SYSTEM"
            title="Architecture as an Organism"
            subtitle="Nodes breathe together. Particles carry data between organs. Hover to see energy flow."
          />

          <LivingSystem
            title="System Nervous Network"
            color="cyan"
            heartbeatInterval={2500}
            breathe={0.6}
            className="min-h-[500px]"
            nodes={[
              { id: "brain", title: "AI Brain", subtitle: "Decision Engine", position: [50, 20], size: "lg" },
              { id: "data", title: "Data Lake", subtitle: "Raw signals", position: [20, 50], size: "md" },
              { id: "api", title: "API Gateway", subtitle: "External I/O", position: [80, 50], size: "md" },
              { id: "cache", title: "Cache Layer", subtitle: "Hot data", position: [35, 80], size: "sm" },
              { id: "queue", title: "Event Queue", subtitle: "Async pipeline", position: [65, 80], size: "sm" },
              { id: "monitor", title: "Health Monitor", subtitle: "Watchdog", position: [50, 55], size: "sm" },
            ]}
            connections={[
              { from: "brain", to: "data", particles: 5, speed: 2 },
              { from: "brain", to: "api", particles: 4, speed: 3 },
              { from: "brain", to: "monitor", particles: 2, speed: 1 },
              { from: "data", to: "cache", particles: 3, speed: 2 },
              { from: "api", to: "queue", particles: 3, speed: 2 },
              { from: "cache", to: "monitor", particles: 2, speed: 1 },
              { from: "queue", to: "monitor", particles: 2, speed: 1 },
              { from: "data", to: "api", particles: 2, speed: 1.5 },
            ]}
          />
        </div>
      </section>

      {/* Section: Synapse Cards */}
      <section className="py-24 px-6 border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="SYNAPSE NETWORK"
            title="Cards That Share a Nervous System"
            subtitle="These cards don't know about each other in the DOM — but they breathe in sync."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SynapseCard
              id="input-layer"
              title="Input Layer"
              description="Ingests raw data streams from 6 alpha sources. Normalizes and timestamps everything."
              color="blue"
              pulseIntensity={0.6}
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              }
            >
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">6 sources</span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">real-time</span>
              </div>
            </SynapseCard>

            <SynapseCard
              id="processing"
              title="Processing Core"
              description="Pattern detection, signal scoring, and confidence weighting. Makes decisions in <50ms."
              color="purple"
              pulseIntensity={0.8}
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            >
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">ML</span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">&lt;50ms</span>
              </div>
            </SynapseCard>

            <SynapseCard
              id="output-layer"
              title="Output Layer"
              description="Executes decisions, manages positions, and reports back to the monitoring system."
              color="emerald"
              pulseIntensity={0.5}
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            >
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">execute</span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">report</span>
              </div>
            </SynapseCard>
          </div>
        </div>
      </section>

      {/* Section: Full Composition — Neural Web with Buttons inside */}
      <section className="py-24 px-6 border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="COMPOSITION"
            title="Everything Together"
            subtitle="NeuralWeb as background, premium buttons as CTAs, living system as architecture diagram. All in one section."
          />

          <NeuralWeb
            nodeCount={35}
            color="purple"
            sensitivity={0.6}
            connectionRadius={100}
            className="min-h-[400px]"
          >
            <div className="text-center space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Build Something<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Nobody Has Seen?
                </span>
              </h3>
              <p className="text-zinc-400 max-w-lg mx-auto">
                These components aren&apos;t in Aceternity. Not in Magic UI. Not in shadcn/motion.
                They exist here and nowhere else.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <InkBleedButton inkColor="rgba(139, 92, 246, 0.8)" className="text-base px-8 py-4">
                  Get Started
                </InkBleedButton>
                <ClothButton meshColor="rgba(139, 92, 246, 0.3)" className="text-base">
                  View Source
                </ClothButton>
              </div>
            </div>
          </NeuralWeb>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-zinc-500 font-mono">SYSTEM ALIVE</span>
          </div>
          <span className="text-sm text-zinc-600">
            motion-primitives / showcase
          </span>
        </div>
      </footer>
    </main>
  );
}

// =============================================================================
// Helper Components
// =============================================================================

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  return (
    <div className="mb-12">
      <motion.div
        className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-cyan-400 mb-3"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400" />
        {label}
      </motion.div>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-zinc-400 text-lg max-w-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

function DemoCard({
  title,
  description,
  tech,
  children,
}: {
  title: string;
  description: string;
  tech: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col items-center hover:border-zinc-700 transition-colors">
      {/* Tech badge */}
      <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono rounded-full bg-zinc-800 text-zinc-500">
        {tech}
      </span>

      {/* Demo area */}
      <div className="flex items-center justify-center min-h-[120px] mb-4">
        {children}
      </div>

      {/* Info */}
      <h4 className="text-sm font-medium text-white mb-1">{title}</h4>
      <p className="text-xs text-zinc-500 text-center">{description}</p>
    </div>
  );
}

function PulsingOrb({ color, label }: { color: string; label: string }) {
  const colorMap: Record<string, { ring: string; core: string; text: string }> = {
    cyan: { ring: "border-cyan-500/30", core: "bg-cyan-500/20", text: "text-cyan-400" },
    purple: { ring: "border-purple-500/30", core: "bg-purple-500/20", text: "text-purple-400" },
    emerald: { ring: "border-emerald-500/30", core: "bg-emerald-500/20", text: "text-emerald-400" },
    orange: { ring: "border-orange-500/30", core: "bg-orange-500/20", text: "text-orange-400" },
    blue: { ring: "border-blue-500/30", core: "bg-blue-500/20", text: "text-blue-400" },
  };
  const c = colorMap[color] || colorMap.cyan;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <motion.div
          className={`absolute inset-0 w-16 h-16 rounded-full border-2 ${c.ring}`}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className={`absolute inset-0 w-16 h-16 rounded-full border ${c.ring}`}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
        <div className={`relative w-16 h-16 rounded-full ${c.core} border-2 ${c.ring} flex items-center justify-center`}>
          <div className={`w-4 h-4 rounded-full ${c.core} border ${c.ring}`} />
        </div>
      </div>
      <span className={`text-sm font-medium ${c.text}`}>{label}</span>
    </div>
  );
}
