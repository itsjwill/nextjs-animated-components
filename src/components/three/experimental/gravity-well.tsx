"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 4000;

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const isHovering = useRef(false);
  const { viewport } = useThree();

  const { positions, velocities, colors, scales, dummy } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const radius = 2 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = (Math.random() - 0.5) * 2;

      // Orbital velocity (perpendicular to position)
      const speed = 0.002 + Math.random() * 0.005;
      velocities[i3] = -positions[i3 + 1] * speed;
      velocities[i3 + 1] = positions[i3] * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

      // Color: white → blue → purple gradient based on distance
      const t = radius / 8;
      colors[i3] = 0.4 + t * 0.6; // R
      colors[i3 + 1] = 0.3 + (1 - t) * 0.4; // G
      colors[i3 + 2] = 0.9 + (1 - t) * 0.1; // B

      scales[i] = 0.01 + Math.random() * 0.03;
    }
    return { positions, velocities, colors, scales, dummy: new THREE.Object3D() };
  }, []);

  const handlePointerMove = useCallback(
    (e: THREE.Event) => {
      const event = e as unknown as { point: THREE.Vector3 };
      mouseRef.current.copy(event.point);
      isHovering.current = true;
    },
    []
  );

  useFrame(() => {
    if (!meshRef.current) return;

    const gravity = isHovering.current ? 0.8 : 0;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      if (gravity > 0) {
        const dx = mx - positions[i3];
        const dy = my - positions[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
        const force = gravity / (dist * dist);
        const maxForce = 0.05;
        const clampedForce = Math.min(force, maxForce);

        velocities[i3] += (dx / dist) * clampedForce;
        velocities[i3 + 1] += (dy / dist) * clampedForce;

        // Spaghettification: stretch toward the gravity well
        const tangentX = -dy / dist;
        const tangentY = dx / dist;
        velocities[i3] += tangentX * clampedForce * 0.3;
        velocities[i3 + 1] += tangentY * clampedForce * 0.3;
      }

      // Apply velocity with damping
      velocities[i3] *= 0.995;
      velocities[i3 + 1] *= 0.995;
      velocities[i3 + 2] *= 0.99;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Respawn particles that get too close to the gravity well
      const dx2 = positions[i3] - mx;
      const dy2 = positions[i3 + 1] - my;
      const distToCenter = Math.sqrt(dx2 * dx2 + dy2 * dy2);

      if (distToCenter < 0.15 || distToCenter > 12) {
        const angle = Math.random() * Math.PI * 2;
        const r = 4 + Math.random() * 5;
        positions[i3] = Math.cos(angle) * r;
        positions[i3 + 1] = Math.sin(angle) * r;
        positions[i3 + 2] = (Math.random() - 0.5) * 2;
        const speed = 0.002 + Math.random() * 0.005;
        velocities[i3] = -positions[i3 + 1] * speed;
        velocities[i3 + 1] = positions[i3] * speed;
        velocities[i3 + 2] = 0;
      }

      // Color shift: particles near the well glow hot (orange/white)
      const heatFactor = Math.max(0, 1 - distToCenter / 3);
      colors[i3] = 0.4 + heatFactor * 0.6;
      colors[i3 + 1] = 0.3 * (1 - heatFactor);
      colors[i3 + 2] = 0.9 * (1 - heatFactor * 0.8);

      // Scale: closer = stretched
      const stretch = 1 + heatFactor * 3;
      dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      dummy.scale.set(scales[i] * stretch, scales[i], scales[i]);

      // Rotate toward velocity direction
      if (gravity > 0 && heatFactor > 0.1) {
        dummy.lookAt(
          positions[i3] + velocities[i3],
          positions[i3 + 1] + velocities[i3 + 1],
          positions[i3 + 2] + velocities[i3 + 2]
        );
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Update color
      meshRef.current.setColorAt(
        i,
        new THREE.Color(colors[i3], colors[i3 + 1], colors[i3 + 2])
      );
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      {/* Invisible plane for mouse tracking */}
      <mesh
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          isHovering.current = false;
        }}
        visible={false}
      >
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshBasicMaterial />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export function GravityWell({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
