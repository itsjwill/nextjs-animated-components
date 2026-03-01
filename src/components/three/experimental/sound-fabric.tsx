"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const GRID_SIZE = 80;
const TOTAL_POINTS = GRID_SIZE * GRID_SIZE;

function Fabric() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const ripples = useRef<Array<{ x: number; y: number; time: number; strength: number }>>([]);
  const lastRipple = useRef(0);
  const { viewport } = useThree();

  const { positions, basePositions, indices } = useMemo(() => {
    const positions = new Float32Array(TOTAL_POINTS * 3);
    const basePositions = new Float32Array(TOTAL_POINTS * 3);
    const indices: number[] = [];

    const spacing = 10 / GRID_SIZE;

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const i = (y * GRID_SIZE + x) * 3;
        const px = (x - GRID_SIZE / 2) * spacing;
        const py = (y - GRID_SIZE / 2) * spacing;
        positions[i] = px;
        positions[i + 1] = py;
        positions[i + 2] = 0;
        basePositions[i] = px;
        basePositions[i + 1] = py;
        basePositions[i + 2] = 0;
      }
    }

    // Create triangle indices for mesh
    for (let y = 0; y < GRID_SIZE - 1; y++) {
      for (let x = 0; x < GRID_SIZE - 1; x++) {
        const a = y * GRID_SIZE + x;
        const b = a + 1;
        const c = a + GRID_SIZE;
        const d = c + 1;
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    return { positions, basePositions, indices };
  }, []);

  const handlePointerMove = useCallback((e: THREE.Event) => {
    const event = e as unknown as { point: THREE.Vector3 };
    mouseRef.current.copy(event.point);

    const now = performance.now();
    if (now - lastRipple.current > 50) {
      ripples.current.push({
        x: event.point.x,
        y: event.point.y,
        time: now,
        strength: 0.4 + Math.random() * 0.3,
      });
      lastRipple.current = now;

      // Keep max 30 ripples
      if (ripples.current.length > 30) {
        ripples.current.shift();
      }
    }
  }, []);

  const handleClick = useCallback((e: THREE.Event) => {
    const event = e as unknown as { point: THREE.Vector3 };
    ripples.current.push({
      x: event.point.x,
      y: event.point.y,
      time: performance.now(),
      strength: 1.5,
    });
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const time = clock.getElapsedTime();
    const now = performance.now();

    // Remove old ripples (> 4 seconds)
    ripples.current = ripples.current.filter((r) => now - r.time < 4000);

    for (let i = 0; i < TOTAL_POINTS; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];

      // Ambient wave
      let z = Math.sin(bx * 0.8 + time * 0.5) * 0.05 + Math.sin(by * 0.6 + time * 0.7) * 0.05;

      // Ripples from cursor
      for (const ripple of ripples.current) {
        const dx = bx - ripple.x;
        const dy = by - ripple.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const age = (now - ripple.time) / 1000;
        const speed = 3.0;
        const wavePos = age * speed;
        const waveDist = Math.abs(dist - wavePos);

        if (waveDist < 1.5) {
          const envelope = Math.exp(-waveDist * 2) * Math.exp(-age * 1.2) * ripple.strength;
          z += Math.sin(dist * 4 - age * 12) * envelope;
        }
      }

      posAttr.setZ(i, z);
    }

    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [positions, indices]);

  return (
    <group rotation={[-0.6, 0, 0]}>
      {/* Invisible plane for mouse tracking */}
      <mesh
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        visible={false}
        rotation={[0.6, 0, 0]}
      >
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshBasicMaterial />
      </mesh>

      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#4f46e5"
          wireframe
          emissive="#7c3aed"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#a78bfa" />
      <pointLight position={[-5, -5, 3]} intensity={0.5} color="#06b6d4" />
    </group>
  );
}

export function SoundFabric({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Fabric />
      </Canvas>
    </div>
  );
}
