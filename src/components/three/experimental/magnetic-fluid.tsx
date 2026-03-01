"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const SPIKE_COUNT = 2500;

function Ferrofluid() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const isHovering = useRef(false);
  const { viewport } = useThree();

  const { basePositions, heights, phases, dummy } = useMemo(() => {
    const basePositions = new Float32Array(SPIKE_COUNT * 2); // x, y on disc
    const heights = new Float32Array(SPIKE_COUNT);
    const phases = new Float32Array(SPIKE_COUNT);

    // Distribute on a disc using sunflower pattern
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < SPIKE_COUNT; i++) {
      const r = Math.sqrt(i / SPIKE_COUNT) * 3;
      const theta = i * goldenAngle;
      basePositions[i * 2] = Math.cos(theta) * r;
      basePositions[i * 2 + 1] = Math.sin(theta) * r;
      heights[i] = 0;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { basePositions, heights, phases, dummy: new THREE.Object3D() };
  }, []);

  const handlePointerMove = useCallback((e: THREE.Event) => {
    const event = e as unknown as { point: THREE.Vector3 };
    mouseRef.current.copy(event.point);
    isHovering.current = true;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const magnetStrength = isHovering.current ? 1 : 0;

    for (let i = 0; i < SPIKE_COUNT; i++) {
      const bx = basePositions[i * 2];
      const by = basePositions[i * 2 + 1];

      // Distance from cursor (magnet)
      const dx = bx - mx;
      const dy = by - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Ferrofluid spike height: tall near magnet, ambient ripple elsewhere
      const magnetInfluence = magnetStrength * Math.max(0, 1 - dist / 2.5);
      const spikeHeight =
        magnetInfluence * (1.5 + Math.sin(dist * 8 - time * 4) * 0.5);

      // Ambient organic movement
      const ambient =
        Math.sin(bx * 2 + time * 0.8 + phases[i]) * 0.1 +
        Math.sin(by * 2 + time * 0.6) * 0.1 +
        0.05;

      // Smooth height transition
      const targetHeight = Math.max(ambient, spikeHeight);
      heights[i] += (targetHeight - heights[i]) * 0.15;

      const h = heights[i];

      // Position: base stays on disc, spike extends upward
      dummy.position.set(bx, by, h * 0.5);

      // Scale: thin cylinder that stretches with height
      const baseWidth = 0.03 + magnetInfluence * 0.02;
      const tipTaper = 1 - magnetInfluence * 0.3; // thinner tips near magnet
      dummy.scale.set(baseWidth * tipTaper, baseWidth * tipTaper, Math.max(0.02, h));

      // Lean toward cursor
      if (magnetInfluence > 0.1) {
        const leanAngle = magnetInfluence * 0.3;
        const leanDir = Math.atan2(dy, dx);
        dummy.rotation.set(
          Math.sin(leanDir) * leanAngle,
          -Math.cos(leanDir) * leanAngle,
          0
        );
      } else {
        dummy.rotation.set(0, 0, 0);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Color: dark metallic base, bright tips near magnet
      const brightness = 0.1 + magnetInfluence * 0.6;
      const hue = 0.6 + magnetInfluence * 0.15; // dark blue → bright teal
      const color = new THREE.Color().setHSL(hue, 0.5 + magnetInfluence * 0.3, brightness);
      meshRef.current.setColorAt(i, color);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group rotation={[-0.8, 0, 0]}>
      {/* Mouse tracking plane */}
      <mesh
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          isHovering.current = false;
        }}
        visible={false}
        rotation={[0.8, 0, 0]}
      >
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshBasicMaterial />
      </mesh>

      {/* Ferrofluid spikes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, SPIKE_COUNT]}>
        <cylinderGeometry args={[0.3, 1, 1, 5, 1]} />
        <meshStandardMaterial
          toneMapped={false}
          roughness={0.1}
          metalness={0.95}
        />
      </instancedMesh>

      {/* Base disc */}
      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.05} metalness={1} />
      </mesh>

      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 3, 5]} intensity={1.5} />
      <pointLight position={[-2, -2, 3]} intensity={0.8} color="#06b6d4" />
    </group>
  );
}

export function MagneticFluid({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Ferrofluid />
      </Canvas>
    </div>
  );
}
