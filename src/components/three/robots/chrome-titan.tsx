"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function TitanBody() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const chestCoreRef = useRef<THREE.Mesh>(null);
  const coreRingRef = useRef<THREE.Mesh>(null);

  // Bright silver chrome — much more visible
  const chromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e0e0e0",
        metalness: 0.95,
        roughness: 0.05,
      }),
    []
  );

  // Mid-tone for contrast
  const midChromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#a0a0b0",
        metalness: 0.9,
        roughness: 0.1,
      }),
    []
  );

  const darkChromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#555566",
        metalness: 0.9,
        roughness: 0.12,
      }),
    []
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffd700",
        emissive: "#ffaa00",
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.12,
      }),
    []
  );

  const coreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4488ff",
        emissive: "#4488ff",
        emissiveIntensity: 3,
        metalness: 0.2,
        roughness: 0.3,
      }),
    []
  );

  const stripMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4488ff",
        emissive: "#4488ff",
        emissiveIntensity: 2,
        metalness: 0.3,
        roughness: 0.3,
      }),
    []
  );

  useFrame((state) => {
    const pointer = state.pointer;
    const t = state.clock.elapsedTime;

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        pointer.x * 0.3,
        0.04
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -pointer.y * 0.15,
        0.04
      );
    }

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.025;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.06,
        0.02
      );
    }

    if (leftEyeRef.current && rightEyeRef.current) {
      const i = 2 + Math.sin(t * 2) * 0.8;
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = i;
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = i;
    }

    if (chestCoreRef.current) {
      const p = 2 + Math.sin(t * 1.2) * 1.5;
      (chestCoreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = p;
    }

    if (coreRingRef.current) {
      coreRingRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      {/* ============ HEAD ============ */}
      <group ref={headRef} position={[0, 2.35, 0]}>
        {/* Main head */}
        <mesh material={chromeMat}>
          <boxGeometry args={[0.55, 0.5, 0.5]} />
        </mesh>
        {/* Face plate — darker for contrast */}
        <mesh position={[0, -0.03, 0.26]} material={darkChromeMat}>
          <boxGeometry args={[0.45, 0.3, 0.02]} />
        </mesh>
        {/* Eyes — wide blue slits */}
        <mesh ref={leftEyeRef} position={[0.12, 0.02, 0.28]}>
          <boxGeometry args={[0.13, 0.04, 0.02]} />
          <meshStandardMaterial color="#4488ff" emissive="#4488ff" emissiveIntensity={3} />
        </mesh>
        <mesh ref={rightEyeRef} position={[-0.12, 0.02, 0.28]}>
          <boxGeometry args={[0.13, 0.04, 0.02]} />
          <meshStandardMaterial color="#4488ff" emissive="#4488ff" emissiveIntensity={3} />
        </mesh>
        {/* Brow ridge */}
        <mesh position={[0, 0.12, 0.22]} material={chromeMat}>
          <boxGeometry args={[0.5, 0.06, 0.12]} />
        </mesh>
        {/* Top crest */}
        <mesh position={[0, 0.3, 0]} material={goldMat}>
          <boxGeometry args={[0.12, 0.08, 0.4]} />
        </mesh>
        {/* Jaw armor */}
        <mesh position={[0, -0.2, 0.15]} material={midChromeMat}>
          <boxGeometry args={[0.45, 0.1, 0.25]} />
        </mesh>
        {/* Side vents */}
        {[0.28, -0.28].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            {[0.04, -0.04].map((y, j) => (
              <mesh key={j} position={[0, y, 0.1]} material={darkChromeMat}>
                <boxGeometry args={[0.04, 0.03, 0.2]} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Neck */}
      <mesh position={[0, 2.05, 0]} material={darkChromeMat}>
        <cylinderGeometry args={[0.1, 0.15, 0.12, 8]} />
      </mesh>

      {/* ============ MASSIVE TORSO ============ */}
      <group position={[0, 1.3, 0]}>
        {/* Main chest — big and wide */}
        <mesh material={chromeMat}>
          <boxGeometry args={[1.05, 0.95, 0.55]} />
        </mesh>
        {/* Center chest plate */}
        <mesh position={[0, 0, 0.28]} material={midChromeMat}>
          <boxGeometry args={[0.5, 0.5, 0.02]} />
        </mesh>

        {/* REACTOR CORE — the centerpiece */}
        <mesh ref={chestCoreRef} position={[0, 0, 0.3]} material={coreMat}>
          <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
        </mesh>
        {/* Spinning ring around core */}
        <mesh ref={coreRingRef} position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.015, 8, 24]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffaa00" emissiveIntensity={1} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Chest vent lines */}
        {[0.32, -0.32].map((x, i) => (
          <group key={i} position={[x, 0.1, 0.28]}>
            {[0, -0.06, -0.12, -0.18].map((y, j) => (
              <mesh key={j} position={[0, y, 0]}>
                <boxGeometry args={[0.18, 0.03, 0.02]} />
                <meshStandardMaterial color="#222233" metalness={0.9} roughness={0.05} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Gold trim */}
        <mesh position={[0, 0.47, 0.28]} material={goldMat}>
          <boxGeometry args={[0.95, 0.03, 0.01]} />
        </mesh>
        <mesh position={[0, -0.38, 0.28]} material={goldMat}>
          <boxGeometry args={[0.85, 0.03, 0.01]} />
        </mesh>

        {/* MASSIVE SHOULDERS */}
        {[1, -1].map((side, i) => (
          <group key={i} position={[0.7 * side, 0.35, 0]}>
            {/* Main shoulder block */}
            <mesh material={chromeMat}>
              <boxGeometry args={[0.42, 0.28, 0.42]} />
            </mesh>
            {/* Gold cap */}
            <mesh position={[0, 0.15, 0]} material={goldMat}>
              <boxGeometry args={[0.38, 0.03, 0.38]} />
            </mesh>
            {/* Blue accent strip */}
            <mesh position={[0.21 * side, 0, 0]} material={stripMat}>
              <boxGeometry args={[0.01, 0.2, 0.06]} />
            </mesh>
            {/* Rivets */}
            {[-0.1, 0.1].map((z, j) => (
              <mesh key={j} position={[0.22 * side, 0, z]}>
                <cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
                <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* ============ WAIST ============ */}
      <mesh position={[0, 0.6, 0]} material={midChromeMat}>
        <boxGeometry args={[0.65, 0.25, 0.42]} />
      </mesh>
      <mesh position={[0, 0.6, 0.22]} material={goldMat}>
        <boxGeometry args={[0.6, 0.04, 0.01]} />
      </mesh>

      {/* ============ ARMS ============ */}
      {[1, -1].map((side, i) => (
        <group key={i} position={[0.72 * side, 0.95, 0]}>
          {/* Upper arm */}
          <mesh material={chromeMat}>
            <boxGeometry args={[0.2, 0.5, 0.2]} />
          </mesh>
          {/* Elbow joint */}
          <mesh position={[0, -0.32, 0]} material={darkChromeMat}>
            <sphereGeometry args={[0.11, 12, 12]} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0, -0.6, 0]} material={chromeMat}>
            <boxGeometry args={[0.22, 0.45, 0.22]} />
          </mesh>
          {/* Forearm blue strip */}
          <mesh position={[0.12 * side, -0.6, 0]} material={stripMat}>
            <boxGeometry args={[0.01, 0.35, 0.04]} />
          </mesh>
          {/* Fist */}
          <mesh position={[0, -0.92, 0]} material={midChromeMat}>
            <boxGeometry args={[0.18, 0.16, 0.2]} />
          </mesh>
        </group>
      ))}

      {/* ============ LEGS ============ */}
      {[1, -1].map((side, i) => (
        <group key={i} position={[0.22 * side, 0.05, 0]}>
          {/* Thigh */}
          <mesh material={chromeMat}>
            <boxGeometry args={[0.25, 0.48, 0.25]} />
          </mesh>
          {/* Knee — gold */}
          <mesh position={[0, -0.3, 0.03]} material={goldMat}>
            <boxGeometry args={[0.2, 0.08, 0.2]} />
          </mesh>
          {/* Shin */}
          <mesh position={[0, -0.6, 0]} material={chromeMat}>
            <boxGeometry args={[0.23, 0.45, 0.23]} />
          </mesh>
          {/* Shin blue strip */}
          <mesh position={[0.12 * side, -0.6, 0]} material={stripMat}>
            <boxGeometry args={[0.01, 0.35, 0.04]} />
          </mesh>
          {/* Heavy foot */}
          <mesh position={[0, -0.92, 0.06]} material={midChromeMat}>
            <boxGeometry args={[0.28, 0.14, 0.38]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function ChromeTitan({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Very bright lighting for chrome reflections */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-4, 4, 3]} intensity={0.6} color="#ccdeff" />
        <pointLight position={[0, 2, 3]} intensity={1.0} color="#4488ff" distance={10} />
        <pointLight position={[2, 0, 3]} intensity={0.5} color="#ffd700" distance={8} />
        <pointLight position={[-2, 1, 2]} intensity={0.4} color="#ffffff" distance={6} />
        <TitanBody />
      </Canvas>
    </div>
  );
}
