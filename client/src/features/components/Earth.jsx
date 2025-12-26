import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

function EarthMesh() {
  const earthRef = useRef()

  const [
    dayMap,
    nightMap,
    cloudsMap
  ] = useLoader(TextureLoader, [
    '/textures/earth_day.jpg',
    '/textures/earth_night.jpg',
    '/textures/earth_clouds.png'
  ])

  useFrame(() => {
    earthRef.current.rotation.y += 0.0006
  })

  return (
    <>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshPhongMaterial
          map={dayMap}
          emissiveMap={nightMap}
          emissiveIntensity={1.2}
          emissive={new THREE.Color(0xffffff)}
        />
      </mesh>

      {/* Clouds */}
      <mesh>
        <sphereGeometry args={[2.03, 128, 128]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[2.08, 128, 128]} />
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  )
}

export default function Earth() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 2, 5]}
        intensity={2}
      />
      <Stars radius={100} depth={50} count={5000} />
      <EarthMesh />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
