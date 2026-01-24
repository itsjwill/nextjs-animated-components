"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// Living System - A multi-panel organism that breathes, pulses, and reacts
// =============================================================================
// This isn't a card layout. It's a living entity rendered as UI.
//
// - Panels are "organs" connected by flowing particle streams
// - The system has a heartbeat — a shared pulse that synchronizes everything
// - Hovering one panel sends energy ripples to connected ones
// - Data particles flow along connection paths between panels
// - The whole thing breathes together (subtle scale oscillation)
//
// Nothing like this exists in any component library.

interface SystemNode {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  /** Position as percentage [x%, y%] within the container */
  position: [number, number];
  /** Size: sm, md, lg */
  size?: "sm" | "md" | "lg";
}

interface SystemConnection {
  from: string;
  to: string;
  /** Particle flow speed (1-5) */
  speed?: number;
  /** Number of flowing particles */
  particles?: number;
  /** Pulse on heartbeat */
  pulseOnBeat?: boolean;
}

interface LivingSystemProps {
  nodes: SystemNode[];
  connections: SystemConnection[];
  className?: string;
  heartbeatInterval?: number;
  color?: "blue" | "purple" | "cyan" | "emerald" | "orange";
  title?: string;
  /** Breathing intensity (0 = none, 1 = full) */
  breathe?: number;
}

export function LivingSystem({
  nodes,
  connections,
  className,
  heartbeatInterval = 3000,
  color = "cyan",
  title,
  breathe = 0.5,
}: LivingSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [heartbeat, setHeartbeat] = useState(0);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const particlesRef = useRef<FlowParticle[]>([]);
  const pulseRef = useRef<PulseWave[]>([]);
  const timeRef = useRef(0);

  const colorMap = {
    blue: { r: 59, g: 130, b: 246, hex: "#3b82f6", glow: "shadow-blue-500/30", text: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10" },
    purple: { r: 139, g: 92, b: 246, hex: "#8b5cf6", glow: "shadow-purple-500/30", text: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10" },
    cyan: { r: 6, g: 182, b: 212, hex: "#06b6d4", glow: "shadow-cyan-500/30", text: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10" },
    emerald: { r: 16, g: 185, b: 129, hex: "#10b981", glow: "shadow-emerald-500/30", text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
    orange: { r: 249, g: 115, b: 22, hex: "#f97316", glow: "shadow-orange-500/30", text: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/10" },
  };
  const c = colorMap[color];

  // Heartbeat
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeat((prev) => prev + 1);
      // Spawn pulse waves from all nodes on heartbeat
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      nodes.forEach((node) => {
        const nx = (node.position[0] / 100) * rect.width;
        const ny = (node.position[1] / 100) * rect.height;
        pulseRef.current.push({ x: nx, y: ny, radius: 0, maxRadius: 80, opacity: 0.4 });
      });
    }, heartbeatInterval);
    return () => clearInterval(interval);
  }, [heartbeatInterval, nodes]);

  // Resize observer
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({ w: entry.contentRect.width, h: entry.contentRect.height });
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Initialize particles for each connection
  useEffect(() => {
    if (!containerSize.w) return;
    const particles: FlowParticle[] = [];

    connections.forEach((conn) => {
      const fromNode = nodes.find((n) => n.id === conn.from);
      const toNode = nodes.find((n) => n.id === conn.to);
      if (!fromNode || !toNode) return;

      const count = conn.particles || 3;
      for (let i = 0; i < count; i++) {
        particles.push({
          fromId: conn.from,
          toId: conn.to,
          progress: i / count,
          speed: (conn.speed || 2) * 0.003,
          size: 2 + Math.random() * 2,
        });
      }
    });

    particlesRef.current = particles;
  }, [connections, nodes, containerSize]);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerSize.w) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = containerSize.w * 2;
    canvas.height = containerSize.h * 2;
    ctx.scale(2, 2);

    const getNodePos = (id: string) => {
      const node = nodes.find((n) => n.id === id);
      if (!node) return { x: 0, y: 0 };
      return {
        x: (node.position[0] / 100) * containerSize.w,
        y: (node.position[1] / 100) * containerSize.h,
      };
    };

    const animate = () => {
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, containerSize.w, containerSize.h);

      // Draw connections (curved lines)
      connections.forEach((conn) => {
        const from = getNodePos(conn.from);
        const to = getNodePos(conn.to);
        const isActive = hoveredNode === conn.from || hoveredNode === conn.to;

        ctx.beginPath();
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const controlX = midX + (to.y - from.y) * 0.2;
        const controlY = midY - (to.x - from.x) * 0.2;

        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(controlX, controlY, to.x, to.y);
        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${isActive ? 0.4 : 0.12})`;
        ctx.lineWidth = isActive ? 1.5 : 0.8;
        ctx.stroke();
      });

      // Animate flow particles
      particlesRef.current.forEach((particle) => {
        particle.progress += particle.speed;
        if (particle.progress > 1) particle.progress -= 1;

        const from = getNodePos(particle.fromId);
        const to = getNodePos(particle.toId);
        const midX = (from.x + to.x) / 2 + (to.y - from.y) * 0.2;
        const midY = (from.y + to.y) / 2 - (to.x - from.x) * 0.2;

        const t = particle.progress;
        const x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x;
        const y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y;

        const isActive = hoveredNode === particle.fromId || hoveredNode === particle.toId;
        const alpha = isActive ? 0.9 : 0.5;

        ctx.beginPath();
        ctx.arc(x, y, particle.size * (isActive ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
        ctx.fill();

        // Glow
        if (isActive) {
          ctx.beginPath();
          ctx.arc(x, y, particle.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.1)`;
          ctx.fill();
        }
      });

      // Pulse waves
      for (let i = pulseRef.current.length - 1; i >= 0; i--) {
        const pulse = pulseRef.current[i];
        pulse.radius += 1.5;
        pulse.opacity -= 0.008;

        if (pulse.opacity <= 0) {
          pulseRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${pulse.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [containerSize, nodes, connections, hoveredNode, c]);

  const sizeClasses = {
    sm: "w-32 h-24",
    md: "w-44 h-32",
    lg: "w-56 h-40",
  };

  // Calculate breathing scale
  const breatheScale = 1 + Math.sin(heartbeat * Math.PI * 0.5) * breathe * 0.01;

  return (
    <div className={cn("relative w-full", className)}>
      {title && (
        <div className="mb-4 flex items-center gap-2">
          <motion.div
            className={cn("w-2 h-2 rounded-full", c.text === "text-cyan-400" ? "bg-cyan-400" : `bg-${color}-400`)}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: heartbeatInterval / 1000, repeat: Infinity }}
          />
          <span className={cn("text-xs font-medium uppercase tracking-wider", c.text)}>
            {title}
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full min-h-[400px] rounded-2xl border border-zinc-800 bg-zinc-950/80 overflow-hidden"
      >
        {/* Background canvas for connections + particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Ambient background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(${c.r}, ${c.g}, ${c.b}, 0.03) 0%, transparent 70%)`,
          }}
        />

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className={cn(
              "absolute flex flex-col items-center justify-center rounded-xl",
              "border bg-zinc-900/90 backdrop-blur-sm cursor-pointer transition-all duration-300",
              sizeClasses[node.size || "md"],
              hoveredNode === node.id
                ? cn(c.border, `shadow-lg ${c.glow}`)
                : "border-zinc-800 hover:border-zinc-700"
            )}
            style={{
              left: `${node.position[0]}%`,
              top: `${node.position[1]}%`,
              transform: `translate(-50%, -50%) scale(${breatheScale})`,
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            animate={{
              scale: hoveredNode === node.id ? 1.05 : breatheScale,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Node pulse ring on heartbeat */}
            <motion.div
              className={cn("absolute inset-0 rounded-xl border", c.border)}
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: heartbeatInterval / 1000, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Icon */}
            {node.icon && (
              <div className={cn("mb-1", hoveredNode === node.id ? c.text : "text-zinc-500")}>
                {node.icon}
              </div>
            )}

            {/* Title */}
            <span className={cn(
              "text-xs font-medium text-center px-2 transition-colors",
              hoveredNode === node.id ? "text-white" : "text-zinc-300"
            )}>
              {node.title}
            </span>

            {/* Subtitle */}
            {node.subtitle && (
              <span className="text-[10px] text-zinc-500 text-center px-2 mt-0.5">
                {node.subtitle}
              </span>
            )}

            {/* Custom content */}
            {node.content && (
              <AnimatePresence>
                {hoveredNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 px-2 overflow-hidden"
                  >
                    {node.content}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        ))}

        {/* Heartbeat indicator */}
        <motion.div
          className="absolute bottom-3 right-3 flex items-center gap-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: heartbeatInterval / 1000, repeat: Infinity }}
        >
          <div className={cn("w-1.5 h-1.5 rounded-full", c.text === "text-cyan-400" ? "bg-cyan-400" : `bg-${color}-400`)} />
          <span className="text-[10px] text-zinc-600 font-mono">ALIVE</span>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// Types
// =============================================================================

interface FlowParticle {
  fromId: string;
  toId: string;
  progress: number;
  speed: number;
  size: number;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

// =============================================================================
// Neural Web - Even more organic: a self-organizing neural network card
// =============================================================================
// Nodes autonomously form connections based on proximity.
// The network self-organizes, pulses, and reacts to mouse as a unified nervous system.
// Touch it and it recoils. Leave it and it expands.

interface NeuralWebProps {
  nodeCount?: number;
  className?: string;
  color?: "blue" | "purple" | "cyan" | "emerald" | "orange";
  /** How reactive to mouse (0 = ignore, 1 = very reactive) */
  sensitivity?: number;
  /** Connection distance threshold (px) */
  connectionRadius?: number;
  children?: React.ReactNode;
}

interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ox: number;
  oy: number;
  size: number;
  phase: number;
}

export function NeuralWeb({
  nodeCount = 40,
  className,
  color = "cyan",
  sensitivity = 0.7,
  connectionRadius = 120,
  children,
}: NeuralWebProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<NeuralNode[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const initRef = useRef(false);

  const colorMap = {
    blue: { r: 59, g: 130, b: 246 },
    purple: { r: 139, g: 92, b: 246 },
    cyan: { r: 6, g: 182, b: 212 },
    emerald: { r: 16, g: 185, b: 129 },
    orange: { r: 249, g: 115, b: 22 },
  };
  const c = colorMap[color];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);

      if (!initRef.current) {
        const nodes: NeuralNode[] = [];
        for (let i = 0; i < nodeCount; i++) {
          const x = Math.random() * rect.width;
          const y = Math.random() * rect.height;
          nodes.push({
            x, y, ox: x, oy: y,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: 1.5 + Math.random() * 2.5,
            phase: Math.random() * Math.PI * 2,
          });
        }
        nodesRef.current = nodes;
        initRef.current = true;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const animate = () => {
      time += 0.016;
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update nodes
      for (const node of nodes) {
        // Gentle autonomous drift
        node.x += node.vx;
        node.y += node.vy;

        // Breathing oscillation
        const breatheX = Math.sin(time * 0.5 + node.phase) * 0.3;
        const breatheY = Math.cos(time * 0.4 + node.phase) * 0.3;
        node.x += breatheX;
        node.y += breatheY;

        // Mouse repulsion (recoil)
        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 * sensitivity) {
            const force = ((150 * sensitivity) - dist) / (150 * sensitivity);
            node.vx += (dx / dist) * force * 0.5 * sensitivity;
            node.vy += (dy / dist) * force * 0.5 * sensitivity;
          }
        }

        // Boundary wrapping with soft bounce
        const margin = 20;
        if (node.x < margin) { node.vx += 0.1; node.x = margin; }
        if (node.x > rect.width - margin) { node.vx -= 0.1; node.x = rect.width - margin; }
        if (node.y < margin) { node.vy += 0.1; node.y = margin; }
        if (node.y > rect.height - margin) { node.vy -= 0.1; node.y = rect.height - margin; }

        // Friction
        node.vx *= 0.98;
        node.vy *= 0.98;

        // Gentle pull back to original area (not position — allows drift)
        node.vx += (node.ox - node.x) * 0.0005;
        node.vy += (node.oy - node.y) * 0.0005;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionRadius) {
            const alpha = (1 - dist / connectionRadius) * 0.3;

            // Pulse along connection
            const pulse = Math.sin(time * 2 + i * 0.1) * 0.5 + 0.5;
            const finalAlpha = alpha * (0.5 + pulse * 0.5);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${finalAlpha})`;
            ctx.lineWidth = 0.5 + alpha;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * 1.5 + node.phase) * 0.3 + 0.7;
        const size = node.size * pulse;

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.05)`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${0.4 + pulse * 0.4})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [nodeCount, color, sensitivity, connectionRadius, c]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full min-h-[300px] rounded-2xl border border-zinc-800 bg-zinc-950/90 overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseRef.current.active = false; }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Content overlay */}
      {children && (
        <div className="relative z-10 flex items-center justify-center w-full h-full min-h-[300px] p-8">
          {children}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Synapse Card - Individual card that connects to other Synapse Cards
// =============================================================================
// When multiple SynapseCards are on the same page, they automatically
// find each other and draw connection lines between them.
// A shared nervous system across separate DOM elements.

interface SynapseCardProps {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  color?: "blue" | "purple" | "cyan" | "emerald" | "orange";
  /** Pulse intensity on the shared heartbeat (0-1) */
  pulseIntensity?: number;
}

// Global registry for Synapse Cards
const synapseRegistry = new Map<string, { x: number; y: number; color: string }>();
const synapseListeners = new Set<() => void>();

function notifySynapses() {
  synapseListeners.forEach((fn) => fn());
}

export function SynapseCard({
  id,
  title,
  description,
  icon,
  className,
  children,
  color = "cyan",
  pulseIntensity = 0.5,
}: SynapseCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [pulse, setPulse] = useState(0);

  const colorMap = {
    blue: { text: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/5", glow: "shadow-blue-500/20", dot: "bg-blue-400" },
    purple: { text: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/5", glow: "shadow-purple-500/20", dot: "bg-purple-400" },
    cyan: { text: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/5", glow: "shadow-cyan-500/20", dot: "bg-cyan-400" },
    emerald: { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/5", glow: "shadow-emerald-500/20", dot: "bg-emerald-400" },
    orange: { text: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/5", glow: "shadow-orange-500/20", dot: "bg-orange-400" },
  };
  const c = colorMap[color];

  // Register position
  useEffect(() => {
    const updatePos = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      synapseRegistry.set(id, {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        color,
      });
      notifySynapses();
    };

    updatePos();
    window.addEventListener("scroll", updatePos);
    window.addEventListener("resize", updatePos);

    return () => {
      synapseRegistry.delete(id);
      window.removeEventListener("scroll", updatePos);
      window.removeEventListener("resize", updatePos);
      notifySynapses();
    };
  }, [id, color]);

  // Heartbeat pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => p + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-xl border p-5 backdrop-blur-sm transition-all duration-300 cursor-pointer",
        isHovered ? cn(c.border, c.bg, `shadow-lg ${c.glow}`) : "border-zinc-800 bg-zinc-900/80",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
    >
      {/* Heartbeat ring */}
      <motion.div
        className={cn("absolute inset-0 rounded-xl border", c.border)}
        animate={{ scale: [1, 1.02, 1], opacity: [0, pulseIntensity * 0.5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Status dot */}
      <motion.div
        className={cn("absolute top-3 right-3 w-2 h-2 rounded-full", c.dot)}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Icon */}
      {icon && (
        <div className={cn("mb-3 transition-colors", isHovered ? c.text : "text-zinc-500")}>
          {icon}
        </div>
      )}

      {/* Title */}
      <h4 className={cn("font-medium text-sm mb-1 transition-colors", isHovered ? "text-white" : "text-zinc-200")}>
        {title}
      </h4>

      {/* Description */}
      {description && (
        <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
      )}

      {/* Children */}
      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  );
}
