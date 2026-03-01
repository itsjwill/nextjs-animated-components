"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MAX_POINTS = 2000;
const TRAIL_RADIUS = 0.15;
const SEGMENTS = 8;

function Trail() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const prevMouse = useRef(new THREE.Vector3(0, 0, 0));
  const pointCount = useRef(0);
  const { viewport } = useThree();

  const { trail, velocities, dummy } = useMemo(() => {
    const trail = new Float32Array(MAX_POINTS * 4); // x, y, z, age
    const velocities = new Float32Array(MAX_POINTS * 3);
    return { trail, velocities, dummy: new THREE.Object3D() };
  }, []);

  const handlePointerMove = useCallback((e: THREE.Event) => {
    const event = e as unknown as { point: THREE.Vector3 };
    prevMouse.current.copy(mouseRef.current);
    mouseRef.current.copy(event.point);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();

    // Add new points from cursor movement
    const dx = mouseRef.current.x - prevMouse.current.x;
    const dy = mouseRef.current.y - prevMouse.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 0.01 && pointCount.current < MAX_POINTS) {
      const idx = pointCount.current;
      const i4 = idx * 4;
      const i3 = idx * 3;

      trail[i4] = mouseRef.current.x;
      trail[i4 + 1] = mouseRef.current.y;
      trail[i4 + 2] = (Math.random() - 0.5) * 0.5; // slight z variation
      trail[i4 + 3] = time; // birth time

      // Velocity influenced by cursor direction
      velocities[i3] = dx * 0.3 + (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = dy * 0.3 + (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;

      pointCount.current++;
    }

    // Update all points
    for (let i = 0; i < pointCount.current; i++) {
      const i4 = i * 4;
      const i3 = i * 3;
      const age = time - trail[i4 + 3];

      // Organic drift - points slowly float and breathe
      const breathe = Math.sin(time * 0.5 + i * 0.1) * 0.002;
      velocities[i3] += breathe;
      velocities[i3 + 1] += Math.cos(time * 0.3 + i * 0.15) * 0.002;
      velocities[i3 + 2] += Math.sin(time * 0.7 + i * 0.2) * 0.001;

      // Damping
      velocities[i3] *= 0.98;
      velocities[i3 + 1] *= 0.98;
      velocities[i3 + 2] *= 0.98;

      // Apply velocity (slows with age)
      const ageFactor = Math.max(0, 1 - age * 0.1);
      trail[i4] += velocities[i3] * ageFactor;
      trail[i4 + 1] += velocities[i3 + 1] * ageFactor;
      trail[i4 + 2] += velocities[i3 + 2] * ageFactor;

      // Scale: grows then slowly shrinks
      const growIn = Math.min(1, age * 3);
      const fadeOut = Math.max(0.2, 1 - age * 0.03);
      const scale = TRAIL_RADIUS * growIn * fadeOut * (0.5 + speed * 2);

      dummy.position.set(trail[i4], trail[i4 + 1], trail[i4 + 2]);
      dummy.scale.setScalar(Math.max(0.01, scale));

      // Rotation for organic feel
      dummy.rotation.set(
        time * 0.1 + i * 0.5,
        time * 0.15 + i * 0.3,
        time * 0.05 + i * 0.7
      );

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Color: rainbow based on position + time, with golden glow for fresh points
      const freshness = Math.max(0, 1 - age * 0.5);
      const hue = (trail[i4] * 0.1 + trail[i4 + 1] * 0.1 + time * 0.02) % 1;
      const saturation = 0.6 + freshness * 0.4;
      const lightness = 0.4 + freshness * 0.3;
      const color = new THREE.Color().setHSL(
        (hue + 1) % 1,
        saturation,
        lightness
      );
      meshRef.current.setColorAt(i, color);
    }

    // Hide unused instances
    for (let i = pointCount.current; i < MAX_POINTS; i++) {
      dummy.position.set(0, 0, -100);
      dummy.scale.setScalar(0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <mesh
        onPointerMove={handlePointerMove}
        visible={false}
      >
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshBasicMaterial />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, MAX_POINTS]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          toneMapped={false}
          roughness={0.3}
          metalness={0.7}
        />
      </instancedMesh>

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#f472b6" />
      <pointLight position={[-3, -3, 3]} intensity={0.8} color="#60a5fa" />
    </group>
  );
}

export function LivingTrail({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Trail />
      </Canvas>
    </div>
  );
}
