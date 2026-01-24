"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// 1. Shader Distortion Button - WebGL water-warp on hover
// =============================================================================
// GPU-computed displacement mapping. No CSS filter tricks.
// The button surface warps/ripples like liquid when cursor moves over it.

interface ShaderDistortionButtonProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  onClick?: () => void;
}

export function ShaderDistortionButton({
  children,
  className,
  intensity = 0.03,
  onClick,
}: ShaderDistortionButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, alpha: true });
    if (!gl) return;
    glRef.current = gl;

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_intensity;
      uniform float u_active;
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse;

        float dist = distance(uv, mouse);
        float wave = sin(dist * 30.0 - u_time * 4.0) * u_intensity * u_active;
        wave *= smoothstep(0.5, 0.0, dist);

        vec2 offset = normalize(uv - mouse + 0.001) * wave;
        vec2 distortedUV = uv + offset;

        // Ripple rings
        float ring = sin(dist * 60.0 - u_time * 6.0) * 0.5 + 0.5;
        ring *= smoothstep(0.4, 0.0, dist) * u_active;

        // Base color with distortion highlights
        float highlight = ring * 0.15;
        float edge = smoothstep(0.02, 0.0, abs(wave)) * 0.3 * u_active;

        gl_FragColor = vec4(
          vec3(1.0) * (highlight + edge),
          highlight + edge
        );
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const animate = () => {
      timeRef.current += 0.016;
      const p = programRef.current;
      if (!p) return;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(gl.getUniformLocation(p, "u_mouse"), mouseRef.current.x, 1.0 - mouseRef.current.y);
      gl.uniform1f(gl.getUniformLocation(p, "u_time"), timeRef.current);
      gl.uniform1f(gl.getUniformLocation(p, "u_intensity"), intensity);
      gl.uniform1f(gl.getUniformLocation(p, "u_active"), mouseRef.current.active ? 1.0 : 0.0);
      gl.uniform2f(gl.getUniformLocation(p, "u_resolution"), canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [intensity]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      active: true,
    };
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 cursor-pointer select-none",
        "bg-gradient-to-br from-zinc-900 to-zinc-800 text-white font-medium rounded-xl overflow-hidden",
        "border border-zinc-700/50",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseRef.current.active = false; }}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
}

// =============================================================================
// 2. Ink Bleed Button - Fluid simulation on click
// =============================================================================
// Organic watercolor-like color bleeding from click point.
// Uses metaball-style blending for authentic fluid look.

interface InkBleedButtonProps {
  children: React.ReactNode;
  className?: string;
  inkColor?: string;
  onClick?: () => void;
}

interface InkDrop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  vx: number;
  vy: number;
  spawned: number;
}

export function InkBleedButton({
  children,
  className,
  inkColor = "rgba(99, 102, 241, 0.8)",
  onClick,
}: InkBleedButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<InkDrop[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
    };
    resize();

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) { animRef.current = requestAnimationFrame(animate); return; }

      ctx.clearRect(0, 0, rect.width, rect.height);

      const drops = dropsRef.current;
      for (let i = drops.length - 1; i >= 0; i--) {
        const drop = drops[i];
        drop.radius += (drop.maxRadius - drop.radius) * 0.08;
        drop.x += drop.vx;
        drop.y += drop.vy;
        drop.vx *= 0.98;
        drop.vy *= 0.98;
        drop.opacity -= 0.008;

        if (drop.opacity <= 0) {
          drops.splice(i, 1);
          continue;
        }

        // Spawn sub-drops for organic bleeding
        if (drop.spawned < 3 && drop.radius > drop.maxRadius * 0.3) {
          drop.spawned++;
          drops.push({
            x: drop.x + (Math.random() - 0.5) * 20,
            y: drop.y + (Math.random() - 0.5) * 20,
            radius: 0,
            maxRadius: drop.maxRadius * (0.3 + Math.random() * 0.3),
            opacity: drop.opacity * 0.7,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            spawned: 3, // Don't let sub-drops spawn more
          });
        }

        ctx.beginPath();
        ctx.arc(drop.x, drop.y, Math.max(0, drop.radius), 0, Math.PI * 2);
        ctx.fillStyle = inkColor.replace(/[\d.]+\)$/, `${drop.opacity})`);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [inkColor]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spawn multiple drops from click point
    for (let i = 0; i < 5; i++) {
      dropsRef.current.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        radius: 0,
        maxRadius: 20 + Math.random() * 40,
        opacity: 0.6 + Math.random() * 0.4,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        spawned: 0,
      });
    }

    onClick?.();
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 cursor-pointer select-none",
        "bg-zinc-900 text-white font-medium rounded-xl overflow-hidden border border-zinc-800",
        className
      )}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
}

// =============================================================================
// 3. Cloth Button - Verlet physics fabric surface
// =============================================================================
// Button surface acts like fabric. Cursor pushes dents into the cloth.
// Uses verlet integration for realistic cloth physics.

interface ClothButtonProps {
  children: React.ReactNode;
  className?: string;
  meshColor?: string;
  onClick?: () => void;
}

export function ClothButton({
  children,
  className,
  meshColor = "rgba(255, 255, 255, 0.4)",
  onClick,
}: ClothButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -100, y: -100, active: false });
  const pointsRef = useRef<{ x: number; y: number; ox: number; oy: number; px: number; py: number; pinned: boolean }[]>([]);
  const initRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cols = 20;
    const rows = 8;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);

      if (!initRef.current) {
        const spacingX = rect.width / (cols - 1);
        const spacingY = rect.height / (rows - 1);
        pointsRef.current = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * spacingX;
            const y = r * spacingY;
            pointsRef.current.push({
              x, y, ox: x, oy: y, px: x, py: y,
              pinned: r === 0 || r === rows - 1 || c === 0 || c === cols - 1,
            });
          }
        }
        initRef.current = true;
      }
    };
    resize();

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) { animRef.current = requestAnimationFrame(animate); return; }

      ctx.clearRect(0, 0, rect.width, rect.height);
      const points = pointsRef.current;
      const spacingX = rect.width / (cols - 1);
      const spacingY = rect.height / (rows - 1);

      // Physics step
      for (const p of points) {
        if (p.pinned) {
          p.x = p.ox;
          p.y = p.oy;
          continue;
        }

        const vx = (p.x - p.px) * 0.98;
        const vy = (p.y - p.py) * 0.98;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy;

        // Mouse interaction
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 40) {
            const force = (40 - dist) / 40;
            p.x += dx * force * 0.3;
            p.y += dy * force * 0.3;
          }
        }

        // Spring back to original
        p.x += (p.ox - p.x) * 0.05;
        p.y += (p.oy - p.y) * 0.05;
      }

      // Constraint satisfaction
      for (let iter = 0; iter < 3; iter++) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const i = r * cols + c;
            if (c < cols - 1) constrain(points[i], points[i + 1], spacingX);
            if (r < rows - 1) constrain(points[i], points[i + cols], spacingY);
          }
        }
      }

      // Draw mesh
      ctx.strokeStyle = meshColor;
      ctx.lineWidth = 0.5;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          if (c < cols - 1) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + 1].x, points[i + 1].y);
            ctx.stroke();
          }
          if (r < rows - 1) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + cols].x, points[i + cols].y);
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [meshColor]);

  const constrain = (a: typeof pointsRef.current[0], b: typeof pointsRef.current[0], restLength: number) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const diff = (restLength - dist) / dist * 0.5;
    const offsetX = dx * diff;
    const offsetY = dy * diff;
    if (!a.pinned) { a.x -= offsetX; a.y -= offsetY; }
    if (!b.pinned) { b.x += offsetX; b.y += offsetY; }
  };

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
    <motion.div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center px-10 py-5 cursor-pointer select-none",
        "bg-zinc-900 text-white font-medium rounded-xl overflow-hidden border border-zinc-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseRef.current.active = false; }}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
}

// =============================================================================
// 4. Portal Button - Wormhole/tunnel effect on click
// =============================================================================
// Click tears open a vortex that spirals inward. Canvas-based tunnel.

interface PortalButtonProps {
  children: React.ReactNode;
  className?: string;
  portalColor?: string;
  onClick?: () => void;
}

export function PortalButton({
  children,
  className,
  portalColor = "#6366f1",
  onClick,
}: PortalButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const portalRef = useRef({ active: false, progress: 0, x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
    };
    resize();

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) { animRef.current = requestAnimationFrame(animate); return; }

      ctx.clearRect(0, 0, rect.width, rect.height);
      const portal = portalRef.current;

      if (portal.active) {
        portal.progress = Math.min(1, portal.progress + 0.03);
      } else {
        portal.progress = Math.max(0, portal.progress - 0.05);
      }

      if (portal.progress > 0) {
        const cx = portal.x;
        const cy = portal.y;
        const maxRadius = Math.max(rect.width, rect.height) * portal.progress;
        const rings = 12;
        const time = Date.now() * 0.003;

        for (let i = rings; i >= 0; i--) {
          const t = i / rings;
          const radius = maxRadius * t;
          const rotation = time + t * Math.PI * 2;
          const alpha = (1 - t) * portal.progress * 0.6;

          ctx.beginPath();
          // Distorted circle for organic vortex
          for (let a = 0; a <= Math.PI * 2; a += 0.1) {
            const wobble = Math.sin(a * 3 + rotation) * radius * 0.1;
            const r = radius + wobble;
            const px = cx + Math.cos(a + rotation * 0.5) * r;
            const py = cy + Math.sin(a + rotation * 0.5) * r;
            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = portalColor + Math.floor(alpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 2 - t;
          ctx.stroke();
        }

        // Center glow
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius * 0.3);
        glow.addColorStop(0, portalColor + Math.floor(portal.progress * 128).toString(16).padStart(2, "0"));
        glow.addColorStop(1, portalColor + "00");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [portalColor]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    portalRef.current = {
      active: true,
      progress: 0,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setTimeout(() => { portalRef.current.active = false; }, 1200);
    onClick?.();
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 cursor-pointer select-none",
        "bg-zinc-950 text-white font-medium rounded-xl overflow-hidden border border-zinc-800",
        className
      )}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
}

// =============================================================================
// 5. Swarm Button - Boid flocking particle text
// =============================================================================
// Text made of particles that scatter on hover and reform using boid algorithm.

interface SwarmButtonProps {
  children: string;
  className?: string;
  particleColor?: string;
  onClick?: () => void;
}

interface Boid {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
}

export function SwarmButton({
  children,
  className,
  particleColor = "#ffffff",
  onClick,
}: SwarmButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const boidsRef = useRef<Boid[]>([]);
  const scatterRef = useRef(false);
  const initRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
    };
    resize();

    // Generate text particle positions
    if (!initRef.current) {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const offscreen = document.createElement("canvas");
      offscreen.width = rect.width * 2;
      offscreen.height = rect.height * 2;
      const offCtx = offscreen.getContext("2d")!;
      offCtx.fillStyle = "#ffffff";
      offCtx.font = `bold ${Math.floor(rect.height * 0.8)}px system-ui, sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(children, offscreen.width / 2, offscreen.height / 2);

      const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const boids: Boid[] = [];
      const gap = 4;

      for (let y = 0; y < offscreen.height; y += gap) {
        for (let x = 0; x < offscreen.width; x += gap) {
          const i = (y * offscreen.width + x) * 4;
          if (imageData.data[i + 3] > 128) {
            boids.push({
              x: x / 2, y: y / 2,
              tx: x / 2, ty: y / 2,
              vx: 0, vy: 0,
            });
          }
        }
      }
      boidsRef.current = boids;
      initRef.current = true;
    }

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) { animRef.current = requestAnimationFrame(animate); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(2, 2);

      const boids = boidsRef.current;
      const scattered = scatterRef.current;

      for (const boid of boids) {
        if (scattered) {
          // Random wandering when scattered
          boid.vx += (Math.random() - 0.5) * 0.8;
          boid.vy += (Math.random() - 0.5) * 0.8;
          boid.vx *= 0.95;
          boid.vy *= 0.95;
        } else {
          // Return to target position
          const dx = boid.tx - boid.x;
          const dy = boid.ty - boid.y;
          boid.vx += dx * 0.08;
          boid.vy += dy * 0.08;
          boid.vx *= 0.85;
          boid.vy *= 0.85;
        }

        boid.x += boid.vx;
        boid.y += boid.vy;

        // Keep within bounds when scattered
        if (scattered) {
          if (boid.x < 0 || boid.x > rect.width) boid.vx *= -1;
          if (boid.y < 0 || boid.y > rect.height) boid.vy *= -1;
          boid.x = Math.max(0, Math.min(rect.width, boid.x));
          boid.y = Math.max(0, Math.min(rect.height, boid.y));
        }

        ctx.fillStyle = particleColor;
        ctx.fillRect(boid.x, boid.y, 1.5, 1.5);
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [children, particleColor]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center px-12 py-6 cursor-pointer select-none",
        "bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800",
        className
      )}
      onMouseEnter={() => { scatterRef.current = true; }}
      onMouseLeave={() => { scatterRef.current = false; }}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      {/* Invisible text for accessibility */}
      <span className="relative z-10 opacity-0 pointer-events-none font-bold">{children}</span>
    </motion.div>
  );
}

// =============================================================================
// 6. Liquid Metal Button - Chrome/mercury metallic surface
// =============================================================================
// Metallic environment-mapped surface with flowing reflections.

interface LiquidMetalButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function LiquidMetalButton({
  children,
  className,
  onClick,
}: LiquidMetalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const springX = useSpring(useMotionValue(0.5), { stiffness: 100, damping: 20 });
  const springY = useSpring(useMotionValue(0.5), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    springX.set(x);
    springY.set(y);
  };

  // Generate dynamic metallic gradient based on mouse
  const gradientAngle = mousePos.x * 360;
  const highlightX = mousePos.x * 100;
  const highlightY = mousePos.y * 100;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 cursor-pointer select-none",
        "rounded-xl overflow-hidden font-semibold text-zinc-900",
        className
      )}
      style={{
        background: isHovered
          ? `radial-gradient(ellipse at ${highlightX}% ${highlightY}%,
              #ffffff 0%, #e0e0e0 20%, #a0a0a0 40%, #808080 60%, #c0c0c0 80%, #ffffff 100%)`
          : `linear-gradient(135deg, #d4d4d4 0%, #a0a0a0 30%, #e0e0e0 50%, #909090 70%, #d4d4d4 100%)`,
        transition: isHovered ? "none" : "background 0.5s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      {/* Reflection streak */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(${gradientAngle}deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)`,
          opacity: isHovered ? 0.8 : 0,
        }}
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Text with subtle shadow for depth */}
      <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
        {children}
      </span>
    </motion.div>
  );
}

// =============================================================================
// 7. Reactive Shadow Button - Cursor as point light source
// =============================================================================
// Shadow direction and size changes based on cursor position relative to button.

interface ReactiveShadowButtonProps {
  children: React.ReactNode;
  className?: string;
  shadowColor?: string;
  onClick?: () => void;
}

export function ReactiveShadowButton({
  children,
  className,
  shadowColor = "rgba(99, 102, 241, 0.4)",
  onClick,
}: ReactiveShadowButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shadow, setShadow] = useState({ x: 0, y: 8, blur: 20, spread: 0 });

  useEffect(() => {
    const handleGlobalMouse = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Light source is at cursor, shadow goes opposite direction
      const dx = centerX - e.clientX;
      const dy = centerY - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 400;

      const intensity = Math.min(1, dist / maxDist);
      const shadowX = (dx / maxDist) * 25;
      const shadowY = (dy / maxDist) * 25;
      const blur = 15 + intensity * 20;
      const spread = -2 + intensity * 4;

      setShadow({ x: shadowX, y: shadowY, blur, spread });
    };

    window.addEventListener("mousemove", handleGlobalMouse);
    return () => window.removeEventListener("mousemove", handleGlobalMouse);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 cursor-pointer select-none",
        "bg-zinc-900 text-white font-medium rounded-xl border border-zinc-800",
        className
      )}
      style={{
        boxShadow: `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadowColor}`,
        transition: "box-shadow 0.1s ease-out",
      }}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
}

// =============================================================================
// 8. Sticker Peel Button - Lifts off page like a sticker
// =============================================================================
// 3D peel effect with shadow underneath. Curls at corner on hover.

interface StickerPeelButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function StickerPeelButton({
  children,
  className,
  onClick,
}: StickerPeelButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn("relative inline-block cursor-pointer select-none", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ perspective: 600 }}
    >
      {/* Shadow underneath */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-black/30"
        animate={{
          scale: isHovered ? 0.92 : 1,
          y: isHovered ? 8 : 0,
          filter: isHovered ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* The sticker itself */}
      <motion.div
        className={cn(
          "relative px-8 py-4 bg-white text-zinc-900 font-semibold rounded-xl",
          "border border-zinc-200"
        )}
        animate={{
          rotateX: isHovered ? -8 : 0,
          rotateY: isHovered ? 5 : 0,
          y: isHovered ? -6 : 0,
          z: isHovered ? 20 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Peel corner */}
        <motion.div
          className="absolute bottom-0 right-0 w-8 h-8"
          style={{
            background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)",
            borderBottomRightRadius: "12px",
          }}
          animate={{
            scaleX: isHovered ? 2 : 1,
            scaleY: isHovered ? 2 : 1,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        <span className="relative z-10">{children}</span>
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// 9. Thermal Button - Heats up on hover (blue to red shift)
// =============================================================================
// Visual temperature metaphor with heat distortion effect.

interface ThermalButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ThermalButton({
  children,
  className,
  onClick,
}: ThermalButtonProps) {
  const [heat, setHeat] = useState(0);
  const heatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHeating = () => {
    heatIntervalRef.current = setInterval(() => {
      setHeat((prev) => Math.min(1, prev + 0.02));
    }, 50);
  };

  const stopHeating = () => {
    if (heatIntervalRef.current) clearInterval(heatIntervalRef.current);
    // Cool down
    const cool = () => {
      setHeat((prev) => {
        const next = prev - 0.03;
        if (next <= 0) return 0;
        requestAnimationFrame(cool);
        return next;
      });
    };
    requestAnimationFrame(cool);
  };

  useEffect(() => {
    return () => {
      if (heatIntervalRef.current) clearInterval(heatIntervalRef.current);
    };
  }, []);

  // Interpolate color from blue (cold) through white to red (hot)
  const r = Math.round(100 + heat * 155);
  const g = Math.round(150 - heat * 120);
  const b = Math.round(255 - heat * 200);
  const glow = heat * 20;

  return (
    <motion.div
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 cursor-pointer select-none",
        "font-medium rounded-xl overflow-hidden border",
        className
      )}
      style={{
        backgroundColor: `rgb(${r * 0.15}, ${g * 0.1}, ${b * 0.15})`,
        borderColor: `rgba(${r}, ${g}, ${b}, 0.4)`,
        boxShadow: `0 0 ${glow}px rgba(${r}, ${g}, ${b}, ${heat * 0.5}),
                     inset 0 0 ${glow * 0.5}px rgba(${r}, ${g}, ${b}, ${heat * 0.2})`,
        color: `rgb(${r}, ${g}, ${b})`,
      }}
      onMouseEnter={startHeating}
      onMouseLeave={stopHeating}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      {/* Heat shimmer effect */}
      {heat > 0.3 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, rgba(${r}, ${g * 0.5}, 0, ${heat * 0.15}) 0%, transparent 70%)`,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
      <span className="relative z-10 font-semibold">{children}</span>
    </motion.div>
  );
}

// =============================================================================
// 10. Momentum Button - Physics inertia after mouse leaves
// =============================================================================
// Button maintains velocity after cursor flicks across it. Realistic momentum.

interface MomentumButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MomentumButton({
  children,
  className,
  onClick,
}: MomentumButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 });
  const animRef = useRef<number>(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const animate = () => {
      if (!isHoveredRef.current) {
        // Apply velocity with friction
        posRef.current.x += velocityRef.current.x;
        posRef.current.y += velocityRef.current.y;

        // Spring back to center
        posRef.current.x *= 0.92;
        posRef.current.y *= 0.92;

        // Friction on velocity
        velocityRef.current.x *= 0.95;
        velocityRef.current.y *= 0.95;

        // Stop when close enough
        if (Math.abs(posRef.current.x) < 0.1 && Math.abs(posRef.current.y) < 0.1) {
          posRef.current.x = 0;
          posRef.current.y = 0;
        }

        setPos({ ...posRef.current });
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    const dt = now - lastMouseRef.current.time;
    if (dt > 0) {
      velocityRef.current = {
        x: (e.clientX - lastMouseRef.current.x) / dt * 5,
        y: (e.clientY - lastMouseRef.current.y) / dt * 5,
      };
    }
    lastMouseRef.current = { x: e.clientX, y: e.clientY, time: now };

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    posRef.current = {
      x: (e.clientX - centerX) * 0.15,
      y: (e.clientY - centerY) * 0.15,
    };
    setPos({ ...posRef.current });
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    // Velocity is already captured, physics loop will handle momentum
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    velocityRef.current = { x: 0, y: 0 };
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 cursor-pointer select-none",
        "bg-zinc-900 text-white font-medium rounded-xl border border-zinc-800",
        className
      )}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
}
