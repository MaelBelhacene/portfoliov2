'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GlobeFallback } from './GlobeFallback';

// R3F v9 instancie encore THREE.Clock, déprécié en three r183 au profit de
// THREE.Timer (migration prévue côté R3F v10). On filtre ce seul warning connu
// via le hook officiel de three ; à retirer au passage à R3F v10.
const CLOCK_DEPRECATION =
  'THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.';
if (!THREE.getConsoleFunction()) {
  THREE.setConsoleFunction((type, message, ...params) => {
    if (type === 'warn' && message === CLOCK_DEPRECATION) return;
    console[type](message, ...params);
  });
}

const GREEN = '#00ff41';
const RADIUS = 1;
const POINT_COUNT = 140;
const ARC_COUNT = 10;
const ARC_SEGMENTS = 48;
const PULSE_LENGTH = 10; // longueur du segment lumineux qui parcourt un arc (en sommets)

// PRNG déterministe : même scène à chaque montage, pas de Math.random au rendu
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomOnSphere(rand: () => number, radius: number) {
  const y = rand() * 2 - 1;
  const theta = rand() * Math.PI * 2;
  const s = Math.sqrt(1 - y * y);
  return new THREE.Vector3(s * Math.cos(theta), y, s * Math.sin(theta)).multiplyScalar(radius);
}

type Arc = {
  base: THREE.Line;
  pulse: THREE.Line;
  speed: number;
  phase: number;
};

function buildScene() {
  const rand = mulberry32(0x00ff41);

  // Points à la surface du globe
  const anchors: THREE.Vector3[] = [];
  const positions = new Float32Array(POINT_COUNT * 3);
  for (let i = 0; i < POINT_COUNT; i++) {
    const p = randomOnSphere(rand, RADIUS * 1.002);
    positions.set([p.x, p.y, p.z], i * 3);
    anchors.push(p);
  }
  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Arcs entre paires de points ni trop proches ni quasi antipodales
  const arcs: Arc[] = [];
  let guard = 0;
  while (arcs.length < ARC_COUNT && guard++ < 500) {
    const a = anchors[Math.floor(rand() * POINT_COUNT)];
    const b = anchors[Math.floor(rand() * POINT_COUNT)];
    const dist = a.distanceTo(b);
    if (dist < RADIUS * 0.5 || dist > RADIUS * 1.5) continue;

    const control = a
      .clone()
      .add(b)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(RADIUS * (1.15 + dist * 0.35));
    const curvePoints = new THREE.QuadraticBezierCurve3(a, control, b).getPoints(ARC_SEGMENTS);

    const base = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curvePoints),
      new THREE.LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0.12 }),
    );
    const pulse = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curvePoints),
      new THREE.LineBasicMaterial({ color: GREEN, transparent: true, opacity: 0.9 }),
    );
    pulse.geometry.setDrawRange(0, PULSE_LENGTH);

    arcs.push({ base, pulse, speed: 0.12 + rand() * 0.18, phase: rand() });
  }

  return { pointsGeometry, arcs };
}

function Globe() {
  const { pointsGeometry, arcs } = useMemo(() => buildScene(), []);

  // Les objets créés hors JSX ne sont pas libérés par R3F : on s'en charge
  useEffect(() => {
    return () => {
      pointsGeometry.dispose();
      for (const { base, pulse } of arcs) {
        base.geometry.dispose();
        (base.material as THREE.Material).dispose();
        pulse.geometry.dispose();
        (pulse.material as THREE.Material).dispose();
      }
    };
  }, [pointsGeometry, arcs]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    for (const { pulse, speed, phase } of arcs) {
      const head = (phase + t * speed) % 1;
      pulse.geometry.setDrawRange(Math.floor(head * ARC_SEGMENTS), PULSE_LENGTH);
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[RADIUS, 28, 28]} />
        <meshBasicMaterial color={GREEN} wireframe transparent opacity={0.14} />
      </mesh>
      <points geometry={pointsGeometry}>
        <pointsMaterial
          color={GREEN}
          size={0.022}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
      {arcs.map(({ base, pulse }, i) => (
        <group key={i}>
          <primitive object={base} />
          <primitive object={pulse} />
        </group>
      ))}
    </group>
  );
}

/** Rotation lente continue + parallaxe souris amortie. */
function GlobeRig({ children }: { children: React.ReactNode }) {
  const parallax = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    // Écoute au niveau fenêtre : le canvas est en pointer-events-none
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.08;
    if (parallax.current) {
      // Amortissement exponentiel indépendant du framerate
      const k = 1 - Math.exp(-delta * 3);
      parallax.current.rotation.x += (pointer.current.y * 0.18 - parallax.current.rotation.x) * k;
      parallax.current.rotation.y += (pointer.current.x * 0.28 - parallax.current.rotation.y) * k;
    }
  });

  return (
    <group rotation={[0.35, 0, -0.12]}>
      <group ref={parallax}>
        <group ref={spin}>{children}</group>
      </group>
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      fallback={<GlobeFallback />}
    >
      <GlobeRig>
        <Globe />
      </GlobeRig>
    </Canvas>
  );
}
