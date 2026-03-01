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
  const { viewport } = useThree();

  const chromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c0c0c0",
        metalness: 1.0,
        roughness: 0.05,
      }),
    []
  );

  const darkChromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3a3a3a",
        metalness: 0.95,
        roughness: 0.1,
      }),
    []
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffd700",
        emissive: "#ff8c00",
        emissiveIntensity: 0.3,
        metalness: 0.9,
        roughness: 0.15,
      }),
    []
  );

  const coreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3b82f6",
        emissive: "#3b82f6",
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
        pointer.x * 0.35,
        0.05
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -pointer.y * 0.2,
        0.05
      );
    }

    if (groupRef.current) {
      // Heavy, slow breathing motion
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.03;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.08,
        0.025
      );
    }

    // Eye glow - steady intense
    if (leftEyeRef.current && rightEyeRef.current) {
      const intensity = 1.5 + Math.sin(t * 2) * 0.5;
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }

    // Chest core pulse
    if (chestCoreRef.current) {
      const pulse = 1.5 + Math.sin(t * 1.5) * 0.8;
      (chestCoreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* === HEAD === */}
      <group ref={headRef} position={[0, 2.3, 0]}>
        {/* Main head - angular industrial */}
        <mesh material={chromeMat}>
          <boxGeometry args={[0.6, 0.55, 0.55]} />
        </mesh>
        {/* Face plate */}
        <mesh position={[0, -0.05, 0.28]} material={darkChromeMat}>
          <boxGeometry args={[0.5, 0.35, 0.02]} />
        </mesh>
        {/* Eyes - horizontal slits */}
        <mesh ref={leftEyeRef} position={[0.13, 0, 0.3]}>
          <boxGeometry args={[0.14, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={2}
          />
        </mesh>
        <mesh ref={rightEyeRef} position={[-0.13, 0, 0.3]}>
          <boxGeometry args={[0.14, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={2}
          />
        </mesh>
        {/* Jaw plates */}
        <mesh position={[0.2, -0.22, 0.15]} material={chromeMat}>
          <boxGeometry args={[0.15, 0.1, 0.3]} />
        </mesh>
        <mesh position={[-0.2, -0.22, 0.15]} material={chromeMat}>
          <boxGeometry args={[0.15, 0.1, 0.3]} />
        </mesh>
        {/* Top ridge */}
        <mesh position={[0, 0.3, 0]} material={goldMat}>
          <boxGeometry args={[0.15, 0.06, 0.45]} />
        </mesh>
        {/* Side vents */}
        {[0.31, -0.31].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh material={darkChromeMat}>
              <boxGeometry args={[0.04, 0.05, 0.35]} />
            </mesh>
            <mesh position={[0, -0.08, 0]}>
              <boxGeometry args={[0.04, 0.05, 0.35]} />
              <meshStandardMaterial color="#3a3a3a" metalness={0.95} roughness={0.1} />
            </mesh>
          </group>
        ))}
      </group>

      {/* === NECK === */}
      <mesh position={[0, 2.0, 0]} material={darkChromeMat}>
        <cylinderGeometry args={[0.12, 0.18, 0.15, 8]} />
      </mesh>

      {/* === TORSO - MASSIVE === */}
      <group position={[0, 1.25, 0]}>
        {/* Main chest */}
        <mesh material={chromeMat}>
          <boxGeometry args={[1.1, 1.0, 0.6]} />
        </mesh>
        {/* Chest center plate */}
        <mesh position={[0, 0.05, 0.31]} material={darkChromeMat}>
          <boxGeometry args={[0.5, 0.5, 0.02]} />
        </mesh>
        {/* Core reactor */}
        <mesh ref={chestCoreRef} position={[0, 0.05, 0.33]} material={coreMat}>
          <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
        </mesh>
        {/* Core ring */}
        <mesh position={[0, 0.05, 0.32]}>
          <torusGeometry args={[0.14, 0.02, 8, 24]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Chest vents - left and right */}
        {[0.35, -0.35].map((x, i) => (
          <group key={i} position={[x, 0.15, 0.31]}>
            {[0, -0.06, -0.12].map((y, j) => (
              <mesh key={j} position={[0, y, 0]}>
                <boxGeometry args={[0.2, 0.03, 0.02]} />
                <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.05} />
              </mesh>
            ))}
          </group>
        ))}
        {/* Gold trim lines */}
        <mesh position={[0, 0.5, 0.31]} material={goldMat}>
          <boxGeometry args={[1.0, 0.03, 0.01]} />
        </mesh>
        <mesh position={[0, -0.4, 0.31]} material={goldMat}>
          <boxGeometry args={[0.9, 0.03, 0.01]} />
        </mesh>

        {/* === SHOULDERS - HUGE === */}
        {/* Right shoulder */}
        <group position={[0.75, 0.35, 0]}>
          <mesh material={chromeMat}>
            <boxGeometry args={[0.45, 0.3, 0.45]} />
          </mesh>
          <mesh position={[0, 0.16, 0]} material={goldMat}>
            <boxGeometry args={[0.4, 0.03, 0.4]} />
          </mesh>
          {/* Shoulder rivets */}
          {[-0.12, 0.12].map((z, i) => (
            <mesh key={i} position={[0.23, 0, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
              <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
        </group>
        {/* Left shoulder */}
        <group position={[-0.75, 0.35, 0]}>
          <mesh material={chromeMat}>
            <boxGeometry args={[0.45, 0.3, 0.45]} />
          </mesh>
          <mesh position={[0, 0.16, 0]} material={goldMat}>
            <boxGeometry args={[0.4, 0.03, 0.4]} />
          </mesh>
          {[-0.12, 0.12].map((z, i) => (
            <mesh key={i} position={[-0.23, 0, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
              <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
        </group>
      </group>

      {/* === WAIST === */}
      <mesh position={[0, 0.55, 0]} material={darkChromeMat}>
        <boxGeometry args={[0.7, 0.3, 0.45]} />
      </mesh>
      <mesh position={[0, 0.55, 0.23]} material={goldMat}>
        <boxGeometry args={[0.65, 0.04, 0.01]} />
      </mesh>

      {/* === ARMS === */}
      {/* Right arm */}
      <group position={[0.78, 0.9, 0]}>
        {/* Upper arm */}
        <mesh material={chromeMat}>
          <boxGeometry args={[0.22, 0.55, 0.22]} />
        </mesh>
        {/* Elbow joint */}
        <mesh position={[0, -0.35, 0]} material={darkChromeMat}>
          <sphereGeometry args={[0.12, 12, 12]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.65, 0]} material={chromeMat}>
          <boxGeometry args={[0.25, 0.5, 0.25]} />
        </mesh>
        {/* Forearm blue strip */}
        <mesh position={[0.13, -0.65, 0]} material={coreMat}>
          <boxGeometry args={[0.01, 0.4, 0.04]} />
        </mesh>
        {/* Fist */}
        <mesh position={[0, -1.0, 0]} material={darkChromeMat}>
          <boxGeometry args={[0.2, 0.18, 0.22]} />
        </mesh>
      </group>
      {/* Left arm */}
      <group position={[-0.78, 0.9, 0]}>
        <mesh material={chromeMat}>
          <boxGeometry args={[0.22, 0.55, 0.22]} />
        </mesh>
        <mesh position={[0, -0.35, 0]} material={darkChromeMat}>
          <sphereGeometry args={[0.12, 12, 12]} />
        </mesh>
        <mesh position={[0, -0.65, 0]} material={chromeMat}>
          <boxGeometry args={[0.25, 0.5, 0.25]} />
        </mesh>
        <mesh position={[-0.13, -0.65, 0]} material={coreMat}>
          <boxGeometry args={[0.01, 0.4, 0.04]} />
        </mesh>
        <mesh position={[0, -1.0, 0]} material={darkChromeMat}>
          <boxGeometry args={[0.2, 0.18, 0.22]} />
        </mesh>
      </group>

      {/* === LEGS === */}
      {/* Right leg */}
      <group position={[0.25, 0, 0]}>
        {/* Thigh */}
        <mesh material={chromeMat}>
          <boxGeometry args={[0.28, 0.5, 0.28]} />
        </mesh>
        {/* Knee */}
        <mesh position={[0, -0.32, 0.05]} material={goldMat}>
          <boxGeometry args={[0.22, 0.1, 0.22]} />
        </mesh>
        {/* Shin */}
        <mesh position={[0, -0.65, 0]} material={chromeMat}>
          <boxGeometry args={[0.26, 0.5, 0.26]} />
        </mesh>
        {/* Shin blue strip */}
        <mesh position={[0.14, -0.65, 0]} material={coreMat}>
          <boxGeometry args={[0.01, 0.4, 0.04]} />
        </mesh>
        {/* Foot - heavy */}
        <mesh position={[0, -1.0, 0.08]} material={darkChromeMat}>
          <boxGeometry args={[0.3, 0.15, 0.4]} />
        </mesh>
      </group>
      {/* Left leg */}
      <group position={[-0.25, 0, 0]}>
        <mesh material={chromeMat}>
          <boxGeometry args={[0.28, 0.5, 0.28]} />
        </mesh>
        <mesh position={[0, -0.32, 0.05]} material={goldMat}>
          <boxGeometry args={[0.22, 0.1, 0.22]} />
        </mesh>
        <mesh position={[0, -0.65, 0]} material={chromeMat}>
          <boxGeometry args={[0.26, 0.5, 0.26]} />
        </mesh>
        <mesh position={[-0.14, -0.65, 0]} material={coreMat}>
          <boxGeometry args={[0.01, 0.4, 0.04]} />
        </mesh>
        <mesh position={[0, -1.0, 0.08]} material={darkChromeMat}>
          <boxGeometry args={[0.3, 0.15, 0.4]} />
        </mesh>
      </group>
    </group>
  );
}

export function ChromeTitan({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 1.5, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 8, 5]} intensity={1.0} color="#ffffff" />
        <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#3b82f6" />
        <pointLight position={[0, 2, 3]} intensity={0.5} color="#3b82f6" distance={8} />
        <pointLight position={[2, 0, 2]} intensity={0.3} color="#ffd700" distance={6} />
        <TitanBody />
      </Canvas>
    </div>
  );
}
