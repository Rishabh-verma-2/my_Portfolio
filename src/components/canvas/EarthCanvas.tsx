import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from '../Loader';

const Earth = () => {
    const earth = useGLTF('./planet/scene.gltf');
    const meshRef = useRef<THREE.Group>(null);

    // Auto-rotate the earth
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1; // Slow rotation
        }
    });

    return (
        <group ref={meshRef}>
            {/* Ambient light for overall illumination */}
            <ambientLight intensity={0.3} />

            {/* Main directional light (sun) */}
            <directionalLight
                position={[5, 3, 5]}
                intensity={2}
                castShadow
            />

            {/* Rim light for atmosphere effect */}
            <pointLight
                position={[-5, 0, -5]}
                intensity={0.5}
                color="#4a9eff"
            />

            {/* Additional fill light */}
            <hemisphereLight
                intensity={0.4}
                groundColor="#1a1a2e"
                color="#ffffff"
            />

            <primitive
                object={earth.scene}
                scale={2.5}
                position-y={0}
                rotation-y={0}
            />
        </group>
    );
};

const EarthCanvas = () => {
    return (
        <Canvas
            shadows
            frameloop='always' // Changed to always for smooth rotation
            gl={{
                preserveDrawingBuffer: true,
                antialias: true,
                alpha: true,
            }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.5}
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Earth />

                {/* Starfield background for space feel */}
                <mesh position={[0, 0, -50]}>
                    <sphereGeometry args={[100, 32, 32]} />
                    <meshBasicMaterial
                        color="#0a0a1a"
                        side={THREE.BackSide}
                    />
                </mesh>
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

export default EarthCanvas;
