import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import * as THREE from 'three';

function Drone() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/drone-optimized.glb');
  const { actions } = useAnimations(animations, group);

  // Play the hover animation on load
  useEffect(() => {
    if (actions['hover']) {
      actions['hover'].reset().play();
      actions['hover'].setLoop(THREE.LoopRepeat, Infinity);
    }
  }, [actions]);

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={2.5}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

// Fallback loading component
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 0.3, 1]} />
      <meshStandardMaterial color="#000000" wireframe />
    </mesh>
  );
}

export function Home() {
  return (
    <div className="w-full h-screen bg-gray-100 relative overflow-hidden">
      {/* Three.js Canvas */}
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
        }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          position={[-10, 10, -5]}
          intensity={0.8}
          angle={0.3}
          penumbra={1}
          castShadow
        />

        {/* 3D Drone Model */}
        <Suspense fallback={<LoadingFallback />}>
          <Drone />
        </Suspense>

        {/* Mouse-controlled orbit */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
