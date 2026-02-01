import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

interface EnhancedStarsProps {
    mouseX?: number;
    mouseY?: number;
}

const EnhancedStars = ({ mouseX = 0, mouseY = 0 }: EnhancedStarsProps) => {
    const ref = useRef<THREE.Points>(null);
    const particleCount = 8000;

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const col = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Create particles in a sphere
            const radius = 2.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);

            // Color variation (purple to cyan)
            const colorChoice = Math.random();
            if (colorChoice < 0.6) {
                // Purple
                col[i * 3] = 0.57; // R
                col[i * 3 + 1] = 0.37; // G
                col[i * 3 + 2] = 1; // B
            } else if (colorChoice < 0.8) {
                // Pink
                col[i * 3] = 1;
                col[i * 3 + 1] = 0.45;
                col[i * 3 + 2] = 0.78;
            } else {
                // Cyan
                col[i * 3] = 0;
                col[i * 3 + 1] = 0.81;
                col[i * 3 + 2] = 0.66;
            }
        }

        return [pos, col];
    }, []);

    useFrame((state) => {
        if (ref.current) {
            // Slow rotation
            ref.current.rotation.x = state.clock.elapsedTime * 0.03;
            ref.current.rotation.y = state.clock.elapsedTime * 0.05;

            // Mouse parallax
            ref.current.rotation.x += (mouseY * 0.0001);
            ref.current.rotation.y += (mouseX * 0.0001);
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
};

const FloatingGeometry = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;

            // Floating motion
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={[2, 0, -2]}>
            <icosahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial
                color="#915eff"
                wireframe
                emissive="#915eff"
                emissiveIntensity={0.5}
                transparent
                opacity={0.4}
            />
        </mesh>
    );
};

interface EnhancedHeroCanvasProps {
    mouseX?: number;
    mouseY?: number;
}

const EnhancedHeroCanvas = ({ mouseX = 0, mouseY = 0 }: EnhancedHeroCanvasProps) => {
    return (
        <div className="w-full h-full absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.8} color="#915eff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00cea8" />
                <EnhancedStars mouseX={mouseX} mouseY={mouseY} />
                <FloatingGeometry />
            </Canvas>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/90 dark:to-primary pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10 pointer-events-none" />
        </div>
    );
};

export default EnhancedHeroCanvas;
