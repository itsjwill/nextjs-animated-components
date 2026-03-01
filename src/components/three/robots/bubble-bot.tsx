"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function BubbleBody() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const shellMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f0e6ff",
        metalness: 0.1,
        roughness: 0.3,
      }),
    []
  );

  const innerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e0d0f0",
        metalness: 0.05,
        roughness: 0.5,
      }),
    []
  );

  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c084fc",
        emissive: "#c084fc",
        emissiveIntensity: 0.4,
        metalness: 0.2,
        roughness: 0.3,
      }),
    []
  );

  const cheekMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#fda4af",
        emissive: "#fda4af",
        emissiveIntensity: 0.3,
        metalness: 0,
        roughness: 0.8,
      }),
    []
  );

  useFrame((state) => {
    const pointer = state.pointer;
    const t = state.clock.elapsedTime;

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        pointer.x * 0.5,
        0.06
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -pointer.y * 0.3,
        0.06
      );
      // Curious head tilt
      headRef.current.rotation.z = THREE.MathUtils.lerp(
        headRef.current.rotation.z,
        pointer.x * -0.15,
        0.04
      );
    }

    if (groupRef.current) {
      // Bouncy hover
      groupRef.current.position.y =
        Math.sin(t * 1.8) * 0.08 + Math.sin(t * 3.2) * 0.03;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.12,
        0.03
      );
    }

    // Arms wave gently
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z =
        0.3 + Math.sin(t * 2) * 0.15 + Math.sin(t * 0.8) * 0.1;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z =
        -0.3 - Math.sin(t * 2 + 1) * 0.15 - Math.sin(t * 0.8 + 0.5) * 0.1;
    }

    // Eye blink
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.sin(t * 0.4) > 0.98 ? 0.1 : 1;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(
        leftEyeRef.current.scale.y,
        blink,
        0.3
      );
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(
        rightEyeRef.current.scale.y,
        blink,
        0.3
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* === HEAD === */}
      <group ref={headRef} position={[0, 2.0, 0]}>
        {/* Main head - big round sphere */}
        <mesh material={shellMat}>
          <sphereGeometry args={[0.65, 32, 32]} />
        </mesh>
        {/* Face plate - slightly flat front */}
        <mesh position={[0, -0.05, 0.35]} material={innerMat}>
          <sphereGeometry args={[0.45, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        {/* Eyes - big cute circles */}
        <mesh ref={leftEyeRef} position={[0.2, 0.05, 0.58]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.5}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={rightEyeRef} position={[-0.2, 0.05, 0.58]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.5}
            roughness={0.1}
          />
        </mesh>
        {/* Eye highlights */}
        <mesh position={[0.23, 0.09, 0.68]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        </mesh>
        <mesh position={[-0.17, 0.09, 0.68]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        </mesh>
        {/* Cheek blush */}
        <mesh position={[0.4, -0.1, 0.42]} material={cheekMat}>
          <sphereGeometry args={[0.1, 12, 12]} />
        </mesh>
        <mesh position={[-0.4, -0.1, 0.42]} material={cheekMat}>
          <sphereGeometry args={[0.1, 12, 12]} />
        </mesh>
        {/* Tiny smile */}
        <mesh position={[0, -0.18, 0.6]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.08, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.6, 0]} material={accentMat}>
          <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#c084fc"
            emissiveIntensity={1.5}
          />
        </mesh>
        {/* Ear nubs */}
        <mesh position={[0.6, 0.05, 0]} material={accentMat}>
          <sphereGeometry args={[0.1, 12, 12]} />
        </mesh>
        <mesh position={[-0.6, 0.05, 0]} material={accentMat}>
          <sphereGeometry args={[0.1, 12, 12]} />
        </mesh>
      </group>

      {/* === BODY === */}
      <group position={[0, 1.0, 0]}>
        {/* Main body - pill shape */}
        <mesh material={shellMat}>
          <capsuleGeometry args={[0.4, 0.5, 16, 24]} />
        </mesh>
        {/* Belly circle */}
        <mesh position={[0, -0.05, 0.38]} material={accentMat}>
          <circleGeometry args={[0.2, 24]} />
        </mesh>
        {/* Belly button dot */}
        <mesh position={[0, -0.05, 0.39]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={1}
          />
        </mesh>
      </group>

      {/* === ARMS === */}
      {/* Right arm */}
      <group ref={rightArmRef} position={[0.55, 1.15, 0]}>
        <mesh material={innerMat}>
          <capsuleGeometry args={[0.08, 0.5, 8, 12]} />
        </mesh>
        {/* Hand - sphere */}
        <mesh position={[0, -0.38, 0]} material={shellMat}>
          <sphereGeometry args={[0.12, 12, 12]} />
        </mesh>
      </group>
      {/* Left arm */}
      <group ref={leftArmRef} position={[-0.55, 1.15, 0]}>
        <mesh material={innerMat}>
          <capsuleGeometry args={[0.08, 0.5, 8, 12]} />
        </mesh>
        <mesh position={[0, -0.38, 0]} material={shellMat}>
          <sphereGeometry args={[0.12, 12, 12]} />
        </mesh>
      </group>

      {/* === LEGS === */}
      {/* Right leg */}
      <group position={[0.18, 0.15, 0]}>
        <mesh material={innerMat}>
          <capsuleGeometry args={[0.09, 0.35, 8, 12]} />
        </mesh>
        {/* Foot - round */}
        <mesh position={[0, -0.32, 0.05]} material={shellMat}>
          <sphereGeometry args={[0.14, 12, 8]} />
        </mesh>
      </group>
      {/* Left leg */}
      <group position={[-0.18, 0.15, 0]}>
        <mesh material={innerMat}>
          <capsuleGeometry args={[0.09, 0.35, 8, 12]} />
        </mesh>
        <mesh position={[0, -0.32, 0.05]} material={shellMat}>
          <sphereGeometry args={[0.14, 12, 8]} />
        </mesh>
      </group>
    </group>
  );
}

export function BubbleBot({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 5]} intensity={0.8} color="#fff5f5" />
        <pointLight position={[0, 3, 3]} intensity={0.5} color="#c084fc" distance={8} />
        <pointLight position={[-2, 1, 2]} intensity={0.3} color="#fda4af" distance={6} />
        <BubbleBody />
      </Canvas>
    </div>
  );
}
