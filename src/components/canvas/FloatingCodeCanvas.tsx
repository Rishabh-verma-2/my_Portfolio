import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from '../Loader';

// Individual floating code block component
const CodeBlock = ({
    text,
    position,
    rotation,
    speed,
    mouseInfluence
}: {
    text: string;
    position: [number, number, number];
    rotation: [number, number, number];
    speed: number;
    mouseInfluence: number;
}) => {
    const meshRef = useRef<THREE.Group>(null);
    const { mouse } = useThree();
    const initialRotation = useMemo(() => rotation, []);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime;

            // Floating animation
            meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.3;

            // Rotation animation
            meshRef.current.rotation.x = initialRotation[0] + time * speed * 0.2;
            meshRef.current.rotation.y = initialRotation[1] + time * speed * 0.3;

            // Mouse interaction - smooth follow
            const targetRotationY = mouse.x * mouseInfluence;
            const targetRotationX = -mouse.y * mouseInfluence * 0.5;

            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                initialRotation[1] + time * speed * 0.3 + targetRotationY,
                0.05
            );
            meshRef.current.rotation.x = THREE.MathUtils.lerp(
                meshRef.current.rotation.x,
                initialRotation[0] + time * speed * 0.2 + targetRotationX,
                0.05
            );
        }
    });

    return (
        <group ref={meshRef} position={position}>
            <Text
                fontSize={0.4}
                maxWidth={5}
                lineHeight={1.2}
                letterSpacing={0.02}
                textAlign="left"
                anchorX="center"
                anchorY="middle"
            >
                {text}
                <meshStandardMaterial
                    color="#915eff"
                    emissive="#915eff"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.9}
                    side={THREE.DoubleSide}
                />
            </Text>

            {/* Holographic backing plane */}
            <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[3, 1.5]} />
                <meshPhysicalMaterial
                    color="#915eff"
                    emissive="#915eff"
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.15}
                    metalness={0.9}
                    roughness={0.1}
                    transmission={0.9}
                    thickness={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Edge glow */}
            <mesh position={[0, 0, -0.06]}>
                <planeGeometry args={[3.1, 1.6]} />
                <meshBasicMaterial
                    color="#00cea8"
                    transparent
                    opacity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

// Geometric shape components
const GeometricShape = ({
    position,
    type
}: {
    position: [number, number, number];
    type: 'cube' | 'pyramid' | 'octahedron';
}) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime;
            meshRef.current.rotation.x = time * 0.5;
            meshRef.current.rotation.y = time * 0.3;
            meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
        }
    });

    const geometry = useMemo(() => {
        switch (type) {
            case 'cube':
                return <boxGeometry args={[0.5, 0.5, 0.5]} />;
            case 'pyramid':
                return <coneGeometry args={[0.3, 0.6, 4]} />;
            case 'octahedron':
                return <octahedronGeometry args={[0.35]} />;
            default:
                return <boxGeometry args={[0.5, 0.5, 0.5]} />;
        }
    }, [type]);

    return (
        <mesh ref={meshRef} position={position}>
            {geometry}
            <meshPhysicalMaterial
                color="#915eff"
                emissive="#915eff"
                emissiveIntensity={0.5}
                wireframe
                transparent
                opacity={0.6}
            />
        </mesh>
    );
};

// Main scene
const FloatingCodeScene = () => {
    const codeSnippets = useMemo(() => [
        { text: "const dev = 'Rishabh';", pos: [-4, 2, -3], rot: [0.3, -0.2, 0.1], speed: 0.5, influence: 0.3 },
        { text: "import React from 'react';", pos: [3, 1, -2], rot: [-0.2, 0.4, -0.1], speed: 0.6, influence: 0.4 },
        { text: "function createMagic() {", pos: [-2, -1, -1], rot: [0.1, 0.3, 0.2], speed: 0.4, influence: 0.35 },
        { text: "<Component />", pos: [4, -2, -4], rot: [-0.3, -0.1, 0.2], speed: 0.55, influence: 0.25 },
        { text: "npm run build", pos: [-5, 0, -5], rot: [0.2, -0.4, -0.1], speed: 0.45, influence: 0.3 },
        { text: "git push origin main", pos: [2, 3, -3], rot: [-0.1, 0.2, 0.3], speed: 0.5, influence: 0.4 },
        { text: "const [state, setState]", pos: [0, 1.5, -2], rot: [0.4, -0.3, 0.1], speed: 0.6, influence: 0.35 },
        { text: "export default App;", pos: [-3, -2, -2], rot: [-0.2, 0.1, -0.2], speed: 0.4, influence: 0.3 },
        { text: "useState(initialValue)", pos: [5, 0, -6], rot: [0.1, 0.5, 0.1], speed: 0.55, influence: 0.25 },
        { text: "useEffect(() => {", pos: [-1, 2.5, -4], rot: [0.3, 0.2, -0.1], speed: 0.45, influence: 0.4 },
    ], []);

    const geometricShapes = useMemo(() => [
        { pos: [-6, 1, -7], type: 'cube' as const },
        { pos: [6, -1, -8], type: 'pyramid' as const },
        { pos: [-4, 3, -6], type: 'octahedron' as const },
        { pos: [5, 2, -5], type: 'cube' as const },
        { pos: [0, -3, -7], type: 'pyramid' as const },
    ], []);

    return (
        <group>
            {/* Ambient lighting */}
            <ambientLight intensity={0.3} />

            {/* Key lights */}
            <pointLight position={[10, 10, 10]} intensity={1} color="#915eff" />
            <pointLight position={[-10, -10, 5]} intensity={0.8} color="#00cea8" />
            <spotLight
                position={[0, 5, 5]}
                angle={0.3}
                penumbra={1}
                intensity={1.5}
                color="#915eff"
                castShadow
            />

            {/* Code blocks */}
            {codeSnippets.map((snippet, index) => (
                <CodeBlock
                    key={index}
                    text={snippet.text}
                    position={snippet.pos as [number, number, number]}
                    rotation={snippet.rot as [number, number, number]}
                    speed={snippet.speed}
                    mouseInfluence={snippet.influence}
                />
            ))}

            {/* Geometric shapes */}
            {geometricShapes.map((shape, index) => (
                <GeometricShape
                    key={`shape-${index}`}
                    position={shape.pos as [number, number, number]}
                    type={shape.type}
                />
            ))}

            {/* Particle field */}
            <ParticleField />
        </group>
    );
};

// Particle field for extra atmosphere
const ParticleField = () => {
    const particlesRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(200 * 3);
        for (let i = 0; i < 200; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#915eff"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// Main canvas component
const FloatingCodeCanvas = () => {
    return (
        <Canvas
            shadows
            frameloop="always"
            gl={{
                preserveDrawingBuffer: true,
                antialias: true,
                alpha: true,
            }}
            camera={{
                fov: 60,
                near: 0.1,
                far: 100,
                position: [0, 0, 8],
            }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <FloatingCodeScene />

                {/* Subtle camera controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    autoRotate={false}
                    enabled={false}
                />
            </Suspense>
            <Preload all />
        </Canvas>
    );
};

export default FloatingCodeCanvas;
