import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'

const PALETTES = {
  warm: {
    form: '#C2702A',     // hearth ochre
    ring: '#3A4A4F',     // slate clinic
    key:  '#FFE5C4',     // warm key light
    fill: '#7A8B91',     // cool fill
  },
  cool: {
    form: '#3A4A4F',     // slate clinic
    ring: '#E8C66E',     // wheat gold
    key:  '#D6E4E8',     // cool key
    fill: '#C2702A',     // warm fill (Rembrandt accent)
  },
}

function CrumbForm({ color }) {
  const ref = useRef(null)
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.18
    ref.current.rotation.x = Math.sin(performance.now() * 0.0004) * 0.12
  })
  return (
    <mesh ref={ref} scale={1.5}>
      <icosahedronGeometry args={[1, 6]} />
      <MeshDistortMaterial
        color={color}
        distort={0.35}
        speed={1.4}
        roughness={0.45}
        metalness={0.15}
        clearcoat={0.4}
        clearcoatRoughness={0.6}
      />
    </mesh>
  )
}

function GlucoseRing({ color }) {
  const ref = useRef(null)
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y -= dt * 0.08
    ref.current.rotation.z += dt * 0.02
  })
  const radius = 2.6
  const positions = []
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    positions.push([Math.cos(a) * radius, Math.sin(a) * 0.2, Math.sin(a) * radius])
  }
  return (
    <group ref={ref}>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  )
}

export default function SceneCanvas({ scheme = 'warm' }) {
  const p = PALETTES[scheme] || PALETTES.warm
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 5]} intensity={1.6} color={p.key} />
      <directionalLight position={[-3, -2, 2]} intensity={0.45} color={p.fill} />
      <Environment preset={scheme === 'cool' ? 'city' : 'apartment'} />
      <CrumbForm color={p.form} />
      <GlucoseRing color={p.ring} />
    </Canvas>
  )
}
