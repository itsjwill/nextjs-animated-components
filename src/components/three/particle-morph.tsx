"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

interface ParticleMorphProps {
  shapes?: ("sphere" | "cube" | "torus" | "spiral")[];
  particleCount?: number;
  className?: string;
  speed?: number;
  size?: number;
}

function generateShape(shape: string, count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const t = i / count;

    switch (shape) {
      case "sphere": {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 2;
        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi);
        break;
      }
      case "cube": {
        const face = Math.floor(Math.random() * 6);
        const u = (Math.random() - 0.5) * 3;
        const v = (Math.random() - 0.5) * 3;
        if (face === 0) { positions[i3] = 1.5; positions[i3+1] = u; positions[i3+2] = v; }
        else if (face === 1) { positions[i3] = -1.5; positions[i3+1] = u; positions[i3+2] = v; }
        else if (face === 2) { positions[i3] = u; positions[i3+1] = 1.5; positions[i3+2] = v; }
        else if (face === 3) { positions[i3] = u; positions[i3+1] = -1.5; positions[i3+2] = v; }
        else if (face === 4) { positions[i3] = u; positions[i3+1] = v; positions[i3+2] = 1.5; }
        else { positions[i3] = u; positions[i3+1] = v; positions[i3+2] = -1.5; }
        break;
      }
      case "torus": {
        const theta2 = t * Math.PI * 2;
        const phi2 = Math.random() * Math.PI * 2;
        const R = 2;
        const r2 = 0.7;
        positions[i3] = (R + r2 * Math.cos(phi2)) * Math.cos(theta2);
        positions[i3 + 1] = (R + r2 * Math.cos(phi2)) * Math.sin(theta2);
        positions[i3 + 2] = r2 * Math.sin(phi2);
        break;
      }
      case "spiral": {
        const angle = t * Math.PI * 8;
        const radius = t * 2.5;
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = (t - 0.5) * 4;
        positions[i3 + 2] = Math.sin(angle) * radius;
        break;
      }
    }
  }
  return positions;
}

function Particles({ shapes, particleCount, speed, size }: Required<Omit<ParticleMorphProps, "className">>) {
  const { direction } = useTheme();
  const pointsRef = useRef<THREE.Points>(null);
  const progressRef = useRef(0);
  const currentShapeRef = useRef(0);

  const shapePositions = useMemo(
    () => shapes.map((s) => generateShape(s, particleCount)),
    [shapes, particleCount]
  );

  const color = useMemo(() => {
    switch (direction) {
      case "cyberpunk": return new THREE.Color("hsl(174, 100%, 50%)");
      case "kinetic": return new THREE.Color("hsl(263, 70%, 50%)");
      case "luxury": return new THREE.Color("hsl(43, 74%, 49%)");
      default: return new THREE.Color("hsl(16, 85%, 55%)");
    }
  }, [direction]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    progressRef.current += delta * speed * 0.2;
    if (progressRef.current >= 1) {
      progressRef.current = 0;
      currentShapeRef.current = (currentShapeRef.current + 1) % shapes.length;
    }

    const current = shapePositions[currentShapeRef.current];
    const next = shapePositions[(currentShapeRef.current + 1) % shapes.length];
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    const t = progressRef.current;
    const ease = t * t * (3 - 2 * t);

    for (let i = 0; i < positions.length; i++) {
      positions[i] = current[i] + (next[i] - current[i]) * ease;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={shapePositions[0]}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleMorph({
  shapes = ["sphere", "cube", "torus", "spiral"],
  particleCount = 5000,
  className = "",
  speed = 1,
  size = 0.03,
}: ParticleMorphProps) {
  return (
    <div className={`w-full aspect-square ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Particles
          shapes={shapes}
          particleCount={particleCount}
          speed={speed}
          size={size}
        />
      </Canvas>
    </div>
  );
}
