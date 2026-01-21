"use client";

import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, Line, PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// Types
interface Neuron {
  id: number;
  position: THREE.Vector3;
  connections: number[];
  layer: number;
  activation: number;
}

interface Impulse {
  id: string;
  from: number;
  to: number;
  progress: number;
  speed: number;
  color: THREE.Color;
}

interface ThoughtWave {
  id: string;
  position: THREE.Vector3;
  progress: number;
  color: THREE.Color;
}

interface MemoryEcho {
  id: string;
  neuronId: number;
  intensity: number;
  timestamp: number;
}

// Generate neural network structure
function generateNeuralNetwork(
  layers: number[] = [8, 16, 24, 16, 8],
  spread: number = 4,
  depth: number = 8
): Neuron[] {
  const neurons: Neuron[] = [];
  let id = 0;

  layers.forEach((count, layerIndex) => {
    const z = (layerIndex - (layers.length - 1) / 2) * (depth / layers.length);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = spread * (0.5 + Math.random() * 0.5);
      const jitter = 0.3;

      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * jitter * spread;
      const y = Math.sin(angle) * radius + (Math.random() - 0.5) * jitter * spread;

      neurons.push({
        id,
        position: new THREE.Vector3(x, y, z + (Math.random() - 0.5) * 1.5),
        connections: [],
        layer: layerIndex,
        activation: 0,
      });
      id++;
    }
  });

  // Create connections between adjacent layers
  neurons.forEach((neuron) => {
    const nextLayerNeurons = neurons.filter((n) => n.layer === neuron.layer + 1);
    const connectionCount = Math.min(3 + Math.floor(Math.random() * 3), nextLayerNeurons.length);

    // Sort by distance and connect to closest
    const sorted = nextLayerNeurons
      .map((n) => ({ neuron: n, distance: neuron.position.distanceTo(n.position) }))
      .sort((a, b) => a.distance - b.distance);

    for (let i = 0; i < connectionCount; i++) {
      if (sorted[i]) {
        neuron.connections.push(sorted[i].neuron.id);
      }
    }
  });

  return neurons;
}

// Single neuron node
function NeuronNode({
  neuron,
  activation,
  onClick,
  baseColor,
  activeColor,
}: {
  neuron: Neuron;
  activation: number;
  onClick: () => void;
  baseColor: THREE.Color;
  activeColor: THREE.Color;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const color = useMemo(() => {
    return baseColor.clone().lerp(activeColor, activation);
  }, [baseColor, activeColor, activation]);

  const scale = 1 + activation * 0.5 + (hovered ? 0.2 : 0);
  const glowScale = scale * 2;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
    if (glowRef.current) {
      glowRef.current.scale.lerp(new THREE.Vector3(glowScale, glowScale, glowScale), 0.1);
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.1 + activation * 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
    }
  });

  return (
    <group position={neuron.position}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>

      {/* Core neuron */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <sphereGeometry args={[0.08, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5 + activation * 2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Synaptic connection line
function SynapticConnection({
  from,
  to,
  activation,
  baseColor,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  activation: number;
  baseColor: THREE.Color;
}) {
  const points = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    const direction = to.clone().sub(from);
    const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0).normalize();
    const curve = new THREE.QuadraticBezierCurve3(
      from,
      mid.add(perpendicular.multiplyScalar((Math.random() - 0.5) * 0.5)),
      to
    );
    return curve.getPoints(20);
  }, [from, to]);

  const opacity = 0.1 + activation * 0.4;

  return (
    <Line
      points={points}
      color={baseColor}
      lineWidth={1 + activation * 2}
      transparent
      opacity={opacity}
    />
  );
}

// Traveling impulse along connection
function TravelingImpulse({
  impulse,
  neurons,
}: {
  impulse: Impulse;
  neurons: Neuron[];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  const fromNeuron = neurons.find((n) => n.id === impulse.from);
  const toNeuron = neurons.find((n) => n.id === impulse.to);

  if (!fromNeuron || !toNeuron) return null;

  const position = useMemo(() => {
    return fromNeuron.position.clone().lerp(toNeuron.position, impulse.progress);
  }, [fromNeuron, toNeuron, impulse.progress]);

  const trailPosition = useMemo(() => {
    const trailProgress = Math.max(0, impulse.progress - 0.1);
    return fromNeuron.position.clone().lerp(toNeuron.position, trailProgress);
  }, [fromNeuron, toNeuron, impulse.progress]);

  return (
    <group>
      {/* Trail */}
      <mesh ref={trailRef} position={trailPosition}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={impulse.color} transparent opacity={0.3} />
      </mesh>

      {/* Main impulse */}
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={impulse.color} transparent opacity={0.9} />
      </mesh>

      {/* Glow */}
      <mesh position={position}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={impulse.color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Ambient consciousness particles
function ConsciousnessField({ count = 1000, color }: { count?: number; color: THREE.Color }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 4;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = Math.random() * 0.02 + 0.005;
    }

    return [pos, sizes];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Expanding thought wave ring when neuron fires
function ThoughtWaveRing({
  wave,
}: {
  wave: ThoughtWave;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const scale = 0.5 + wave.progress * 2;
  const opacity = Math.max(0, 0.6 - wave.progress * 0.8);

  return (
    <mesh ref={ringRef} position={wave.position} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[scale * 0.9, scale, 32]} />
      <meshBasicMaterial
        color={wave.color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Memory echo - ghost trail of past activations
function MemoryEchoCloud({
  echoes,
  neurons,
  color,
}: {
  echoes: MemoryEcho[];
  neurons: Neuron[];
  color: THREE.Color;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, opacities] = useMemo(() => {
    const pos = new Float32Array(echoes.length * 3);
    const ops = new Float32Array(echoes.length);

    echoes.forEach((echo, i) => {
      const neuron = neurons.find((n) => n.id === echo.neuronId);
      if (neuron) {
        pos[i * 3] = neuron.position.x + (Math.random() - 0.5) * 0.3;
        pos[i * 3 + 1] = neuron.position.y + (Math.random() - 0.5) * 0.3;
        pos[i * 3 + 2] = neuron.position.z + (Math.random() - 0.5) * 0.3;
        ops[i] = echo.intensity;
      }
    });

    return [pos, ops];
  }, [echoes, neurons]);

  if (echoes.length === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={echoes.length} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Energy field around the network
function EnergyField({ radius = 6, color }: { radius?: number; color: THREE.Color }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.02 + Math.sin(state.clock.elapsedTime) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[radius, 2]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.03} />
    </mesh>
  );
}

// Preset color configurations (defined outside component to avoid recreation)
const PRESETS = {
  mind: {
    baseColor: "#8B5CF6",
    activeColor: "#F472B6",
    impulseColor: "#22D3EE",
    particleColor: "#A78BFA",
    bgColor: "#0F0F1A",
  },
  synapse: {
    baseColor: "#06B6D4",
    activeColor: "#FBBF24",
    impulseColor: "#F472B6",
    particleColor: "#22D3EE",
    bgColor: "#0A1628",
  },
  dream: {
    baseColor: "#EC4899",
    activeColor: "#8B5CF6",
    impulseColor: "#34D399",
    particleColor: "#F9A8D4",
    bgColor: "#1A0A14",
  },
  electric: {
    baseColor: "#22D3EE",
    activeColor: "#FFFFFF",
    impulseColor: "#3B82F6",
    particleColor: "#67E8F9",
    bgColor: "#030712",
  },
  void: {
    baseColor: "#374151",
    activeColor: "#F3F4F6",
    impulseColor: "#6B7280",
    particleColor: "#4B5563",
    bgColor: "#030303",
  },
};

// Main neural network scene
function NeuralNetworkScene({
  preset,
  onActivity,
}: {
  preset: "mind" | "synapse" | "dream" | "electric" | "void";
  onActivity?: (level: number) => void;
}) {
  // Create color objects that update when preset changes
  const colors = useMemo(() => {
    const p = PRESETS[preset];
    return {
      baseColor: new THREE.Color(p.baseColor),
      activeColor: new THREE.Color(p.activeColor),
      impulseColor: new THREE.Color(p.impulseColor),
      particleColor: new THREE.Color(p.particleColor),
      bgColor: new THREE.Color(p.bgColor),
    };
  }, [preset]);

  const neurons = useMemo(() => generateNeuralNetwork([6, 12, 18, 24, 18, 12, 6], 3.5, 10), []);
  const [activations, setActivations] = useState<Map<number, number>>(new Map());
  const [impulses, setImpulses] = useState<Impulse[]>([]);
  const [thoughtWaves, setThoughtWaves] = useState<ThoughtWave[]>([]);
  const [memoryEchoes, setMemoryEchoes] = useState<MemoryEcho[]>([]);

  // Decay activations over time
  useFrame((_, delta) => {
    setActivations((prev) => {
      const next = new Map(prev);
      let hasChanges = false;

      next.forEach((value, key) => {
        const newValue = Math.max(0, value - delta * 0.5);
        if (newValue !== value) {
          hasChanges = true;
          if (newValue < 0.01) {
            next.delete(key);
          } else {
            next.set(key, newValue);
          }
        }
      });

      return hasChanges ? next : prev;
    });

    // Update impulses
    setImpulses((prev) => {
      const updated = prev
        .map((imp) => ({
          ...imp,
          progress: imp.progress + delta * imp.speed,
        }))
        .filter((imp) => imp.progress < 1);

      // Trigger activation when impulse arrives
      prev.forEach((imp) => {
        if (imp.progress < 1 && imp.progress + delta * imp.speed >= 1) {
          const toNeuron = neurons.find((n) => n.id === imp.to);
          if (toNeuron) {
            activateNeuron(toNeuron.id, 0.7);
          }
        }
      });

      return updated;
    });

    // Update thought waves
    setThoughtWaves((prev) =>
      prev
        .map((wave) => ({ ...wave, progress: wave.progress + delta * 1.5 }))
        .filter((wave) => wave.progress < 1)
    );

    // Decay memory echoes
    setMemoryEchoes((prev) =>
      prev
        .map((echo) => ({ ...echo, intensity: echo.intensity - delta * 0.3 }))
        .filter((echo) => echo.intensity > 0.05)
    );

    // Report activity level
    if (onActivity) {
      const totalActivation = Array.from(activations.values()).reduce((a, b) => a + b, 0);
      onActivity(totalActivation / neurons.length);
    }
  });

  const activateNeuron = useCallback((neuronId: number, strength: number = 1) => {
    setActivations((prev) => {
      const next = new Map(prev);
      next.set(neuronId, Math.min(1, (prev.get(neuronId) || 0) + strength));
      return next;
    });

    const neuron = neurons.find((n) => n.id === neuronId);
    if (!neuron) return;

    // Create thought wave on strong activations
    if (strength > 0.7) {
      setThoughtWaves((prev) => [
        ...prev,
        {
          id: `wave-${neuronId}-${Date.now()}`,
          position: neuron.position.clone(),
          progress: 0,
          color: colors.activeColor.clone(),
        },
      ]);
    }

    // Add memory echo
    setMemoryEchoes((prev) => [
      ...prev.slice(-50), // Keep max 50 echoes
      {
        id: `echo-${neuronId}-${Date.now()}`,
        neuronId,
        intensity: strength,
        timestamp: Date.now(),
      },
    ]);

    // Create impulses to connected neurons
    if (strength > 0.3) {
      const newImpulses: Impulse[] = neuron.connections.map((targetId) => ({
        id: `${neuronId}-${targetId}-${Date.now()}`,
        from: neuronId,
        to: targetId,
        progress: 0,
        speed: 0.8 + Math.random() * 0.4,
        color: colors.impulseColor.clone(),
      }));

      setImpulses((prev) => [...prev, ...newImpulses]);
    }
  }, [neurons, colors.impulseColor, colors.activeColor]);

  // Random background activity
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNeuron = neurons[Math.floor(Math.random() * neurons.length)];
      activateNeuron(randomNeuron.id, 0.5 + Math.random() * 0.3);
    }, 800);

    return () => clearInterval(interval);
  }, [neurons, activateNeuron]);

  return (
    <>
      <color attach="background" args={[colors.bgColor.getHex()]} />
      <fog attach="fog" args={[colors.bgColor.getHex(), 8, 25]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color={colors.activeColor.getHex()} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color={colors.baseColor.getHex()} />

      {/* Neurons */}
      {neurons.map((neuron) => (
        <NeuronNode
          key={neuron.id}
          neuron={neuron}
          activation={activations.get(neuron.id) || 0}
          onClick={() => activateNeuron(neuron.id, 1)}
          baseColor={colors.baseColor}
          activeColor={colors.activeColor}
        />
      ))}

      {/* Connections */}
      {neurons.map((neuron) =>
        neuron.connections.map((targetId) => {
          const target = neurons.find((n) => n.id === targetId);
          if (!target) return null;
          const activation = Math.max(
            activations.get(neuron.id) || 0,
            activations.get(targetId) || 0
          );
          return (
            <SynapticConnection
              key={`${neuron.id}-${targetId}`}
              from={neuron.position}
              to={target.position}
              activation={activation}
              baseColor={colors.baseColor}
            />
          );
        })
      )}

      {/* Traveling impulses */}
      {impulses.map((impulse) => (
        <TravelingImpulse key={impulse.id} impulse={impulse} neurons={neurons} />
      ))}

      {/* Thought waves - expanding rings when neurons fire */}
      {thoughtWaves.map((wave) => (
        <ThoughtWaveRing key={wave.id} wave={wave} />
      ))}

      {/* Memory echoes - ghost trails of past activity */}
      <MemoryEchoCloud echoes={memoryEchoes} neurons={neurons} color={colors.particleColor} />

      {/* Ambient effects */}
      <ConsciousnessField count={800} color={colors.particleColor} />
      <EnergyField radius={7} color={colors.baseColor} />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

// Exported component
interface NeuralNetworkProps {
  className?: string;
  preset?: "mind" | "synapse" | "dream" | "electric" | "void";
  onActivity?: (level: number) => void;
}

export function NeuralNetwork({
  className,
  preset = "mind",
  onActivity,
}: NeuralNetworkProps) {
  return (
    <div className={cn("w-full h-full min-h-[600px]", className)}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <NeuralNetworkScene preset={preset} onActivity={onActivity} />
      </Canvas>
    </div>
  );
}

export default NeuralNetwork;
