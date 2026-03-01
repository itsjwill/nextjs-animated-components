"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

function SamuraiBody() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const visorRef = useRef<THREE.Mesh>(null);
  const [mousePos] = useState({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Neon glow material
  const neonMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00ffaa",
        emissive: "#00ffaa",
        emissiveIntensity: 2,
        metalness: 0.3,
        roughness: 0.4,
      }),
    []
  );

  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0a0a0a",
        metalness: 0.9,
        roughness: 0.15,
      }),
    []
  );

  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1a2e",
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  );

  const redMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff003c",
        emissive: "#ff003c",
        emissiveIntensity: 1.5,
        metalness: 0.4,
        roughness: 0.3,
      }),
    []
  );

  useFrame((state) => {
    const pointer = state.pointer;
    mousePos.x = pointer.x * viewport.width * 0.5;
    mousePos.y = pointer.y * viewport.height * 0.5;

    if (headRef.current) {
      const targetRotY = pointer.x * 0.4;
      const targetRotX = -pointer.y * 0.25;
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotY,
        0.08
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotX,
        0.08
      );
    }

    if (groupRef.current) {
      // Subtle idle bob
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
      // Slight body lean toward cursor
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.1,
        0.04
      );
    }

    // Eye glow pulse
    if (leftEyeRef.current && rightEyeRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 1.5;
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }

    // Visor flicker
    if (visorRef.current) {
      const flicker =
        Math.sin(state.clock.elapsedTime * 8) > 0.95
          ? 3
          : 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      (visorRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = flicker;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* === HEAD === */}
      <group ref={headRef} position={[0, 2.1, 0]}>
        {/* Main head - angular samurai helmet shape */}
        <mesh material={bodyMat}>
          <boxGeometry args={[0.7, 0.6, 0.65]} />
        </mesh>
        {/* Helmet crest (top blade) */}
        <mesh position={[0, 0.4, -0.05]} material={accentMat}>
          <boxGeometry args={[0.08, 0.35, 0.5]} />
        </mesh>
        {/* Helmet wings (side blades) */}
        <mesh
          position={[0.5, 0.15, -0.1]}
          rotation={[0, 0, -0.4]}
          material={redMat}
        >
          <boxGeometry args={[0.4, 0.06, 0.25]} />
        </mesh>
        <mesh
          position={[-0.5, 0.15, -0.1]}
          rotation={[0, 0, 0.4]}
          material={redMat}
        >
          <boxGeometry args={[0.4, 0.06, 0.25]} />
        </mesh>
        {/* Visor slit */}
        <mesh ref={visorRef} position={[0, 0.02, 0.33]} material={neonMat}>
          <boxGeometry args={[0.55, 0.06, 0.02]} />
        </mesh>
        {/* Eyes behind visor */}
        <mesh ref={leftEyeRef} position={[0.15, 0.02, 0.34]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#00ffaa"
            emissive="#00ffaa"
            emissiveIntensity={2}
          />
        </mesh>
        <mesh ref={rightEyeRef} position={[-0.15, 0.02, 0.34]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#00ffaa"
            emissive="#00ffaa"
            emissiveIntensity={2}
          />
        </mesh>
        {/* Chin guard */}
        <mesh position={[0, -0.25, 0.15]} material={accentMat}>
          <boxGeometry args={[0.5, 0.15, 0.35]} />
        </mesh>
      </group>

      {/* === TORSO === */}
      <group position={[0, 1.15, 0]}>
        {/* Main chest - angular */}
        <mesh material={bodyMat}>
          <boxGeometry args={[0.9, 0.9, 0.5]} />
        </mesh>
        {/* Chest plate accent lines */}
        <mesh position={[0, 0.1, 0.26]} material={neonMat}>
          <boxGeometry args={[0.6, 0.02, 0.01]} />
        </mesh>
        <mesh position={[0, -0.05, 0.26]} material={neonMat}>
          <boxGeometry args={[0.4, 0.02, 0.01]} />
        </mesh>
        {/* Core reactor */}
        <mesh position={[0, 0, 0.26]}>
          <boxGeometry args={[0.12, 0.12, 0.02]} />
          <meshStandardMaterial
            color="#ff003c"
            emissive="#ff003c"
            emissiveIntensity={2}
          />
        </mesh>
        {/* Shoulder armor - angular plates */}
        <mesh position={[0.6, 0.3, 0]} material={accentMat}>
          <boxGeometry args={[0.35, 0.2, 0.45]} />
        </mesh>
        <mesh position={[-0.6, 0.3, 0]} material={accentMat}>
          <boxGeometry args={[0.35, 0.2, 0.45]} />
        </mesh>
        {/* Shoulder neon strips */}
        <mesh position={[0.6, 0.41, 0]} material={neonMat}>
          <boxGeometry args={[0.3, 0.02, 0.02]} />
        </mesh>
        <mesh position={[-0.6, 0.41, 0]} material={neonMat}>
          <boxGeometry args={[0.3, 0.02, 0.02]} />
        </mesh>
      </group>

      {/* === WAIST === */}
      <mesh position={[0, 0.55, 0]} material={accentMat}>
        <boxGeometry args={[0.6, 0.25, 0.4]} />
      </mesh>
      {/* Belt neon */}
      <mesh position={[0, 0.55, 0.21]} material={redMat}>
        <boxGeometry args={[0.55, 0.04, 0.01]} />
      </mesh>

      {/* === ARMS === */}
      {/* Right arm */}
      <group position={[0.65, 0.85, 0]}>
        <mesh material={bodyMat}>
          <boxGeometry args={[0.18, 0.55, 0.18]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.5, 0]} material={accentMat}>
          <boxGeometry args={[0.16, 0.45, 0.16]} />
        </mesh>
        {/* Wrist blade */}
        <mesh position={[0.08, -0.7, 0]} material={neonMat}>
          <boxGeometry args={[0.02, 0.2, 0.08]} />
        </mesh>
        {/* Forearm neon strip */}
        <mesh position={[0.09, -0.4, 0]} material={neonMat}>
          <boxGeometry args={[0.01, 0.35, 0.02]} />
        </mesh>
      </group>
      {/* Left arm */}
      <group position={[-0.65, 0.85, 0]}>
        <mesh material={bodyMat}>
          <boxGeometry args={[0.18, 0.55, 0.18]} />
        </mesh>
        <mesh position={[0, -0.5, 0]} material={accentMat}>
          <boxGeometry args={[0.16, 0.45, 0.16]} />
        </mesh>
        <mesh position={[-0.08, -0.7, 0]} material={neonMat}>
          <boxGeometry args={[0.02, 0.2, 0.08]} />
        </mesh>
        <mesh position={[-0.09, -0.4, 0]} material={neonMat}>
          <boxGeometry args={[0.01, 0.35, 0.02]} />
        </mesh>
      </group>

      {/* === LEGS === */}
      {/* Right leg */}
      <group position={[0.22, 0, 0]}>
        <mesh position={[0, 0, 0]} material={bodyMat}>
          <boxGeometry args={[0.22, 0.55, 0.22]} />
        </mesh>
        <mesh position={[0, -0.5, 0]} material={accentMat}>
          <boxGeometry args={[0.2, 0.5, 0.2]} />
        </mesh>
        {/* Knee neon */}
        <mesh position={[0.11, -0.25, 0]} material={neonMat}>
          <boxGeometry args={[0.01, 0.15, 0.02]} />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -0.85, 0.05]} material={bodyMat}>
          <boxGeometry args={[0.24, 0.12, 0.32]} />
        </mesh>
      </group>
      {/* Left leg */}
      <group position={[-0.22, 0, 0]}>
        <mesh position={[0, 0, 0]} material={bodyMat}>
          <boxGeometry args={[0.22, 0.55, 0.22]} />
        </mesh>
        <mesh position={[0, -0.5, 0]} material={accentMat}>
          <boxGeometry args={[0.2, 0.5, 0.2]} />
        </mesh>
        <mesh position={[-0.11, -0.25, 0]} material={neonMat}>
          <boxGeometry args={[0.01, 0.15, 0.02]} />
        </mesh>
        <mesh position={[0, -0.85, 0.05]} material={bodyMat}>
          <boxGeometry args={[0.24, 0.12, 0.32]} />
        </mesh>
      </group>
    </group>
  );
}

export function NeonSamurai({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[3, 5, 5]} intensity={0.4} color="#ffffff" />
        <pointLight position={[0, 2, 3]} intensity={0.8} color="#00ffaa" distance={8} />
        <pointLight position={[-2, 1, 2]} intensity={0.3} color="#ff003c" distance={6} />
        <SamuraiBody />
      </Canvas>
    </div>
  );
}
