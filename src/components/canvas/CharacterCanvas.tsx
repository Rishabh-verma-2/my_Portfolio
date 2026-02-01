import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Preload, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from '../Loader';

// Simple 3D Character Component with Cursor Tracking
const Character = () => {
    const characterRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Mesh>(null);
    const leftEyeRef = useRef<THREE.Mesh>(null);
    const rightEyeRef = useRef<THREE.Mesh>(null);

    const { mouse, viewport } = useThree();
    const [mousePos] = useState(() => new THREE.Vector3());

    useFrame((state) => {
        if (characterRef.current && headRef.current && leftEyeRef.current && rightEyeRef.current) {
            // Convert mouse position to 3D space
            mousePos.set(
                (mouse.x * viewport.width) / 2,
                (mouse.y * viewport.height) / 2,
                0
            );

            // Make head look at mouse with smooth interpolation
            const targetRotationY = mouse.x * 0.5;
            const targetRotationX = -mouse.y * 0.3;

            // Smooth rotation using lerp
            headRef.current.rotation.y = THREE.MathUtils.lerp(
                headRef.current.rotation.y,
                targetRotationY,
                0.1
            );
            headRef.current.rotation.x = THREE.MathUtils.lerp(
                headRef.current.rotation.x,
                targetRotationX,
                0.1
            );

            // Make eyes follow cursor even more
            const eyeTargetX = mouse.x * 0.15;
            const eyeTargetY = mouse.y * 0.15;

            leftEyeRef.current.position.x = THREE.MathUtils.lerp(
                leftEyeRef.current.position.x,
                -0.25 + eyeTargetX,
                0.15
            );
            leftEyeRef.current.position.y = THREE.MathUtils.lerp(
                leftEyeRef.current.position.y,
                0.15 + eyeTargetY,
                0.15
            );

            rightEyeRef.current.position.x = THREE.MathUtils.lerp(
                rightEyeRef.current.position.x,
                0.25 + eyeTargetX,
                0.15
            );
            rightEyeRef.current.position.y = THREE.MathUtils.lerp(
                rightEyeRef.current.position.y,
                0.15 + eyeTargetY,
                0.15
            );

            // Gentle breathing animation
            const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.02;
            characterRef.current.scale.y = 1 + breathe;
        }
    });

    return (
        <group ref={characterRef} position={[0, -0.5, 0]}>
            {/* Main body */}
            <mesh position={[0, -0.5, 0]}>
                <capsuleGeometry args={[0.6, 1.2, 32, 64]} />
                <meshStandardMaterial
                    color="#915eff"
                    roughness={0.3}
                    metalness={0.6}
                />
            </mesh>

            {/* Head with cursor tracking */}
            <mesh ref={headRef} position={[0, 0.8, 0]}>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial
                    color="#915eff"
                    roughness={0.2}
                    metalness={0.7}
                />
            </mesh>

            {/* Left eye */}
            <mesh ref={leftEyeRef} position={[-0.25, 0.15, 0.5]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Left pupil */}
            <mesh position={[-0.25, 0.15, 0.58]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial
                    color="#000000"
                    emissive="#00cea8"
                    emissiveIntensity={0.3}
                />
            </mesh>

            {/* Right eye */}
            <mesh ref={rightEyeRef} position={[0.25, 0.15, 0.5]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Right pupil */}
            <mesh position={[0.25, 0.15, 0.58]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial
                    color="#000000"
                    emissive="#00cea8"
                    emissiveIntensity={0.3}
                />
            </mesh>

            {/* Smile */}
            <mesh position={[0, 0.0, 0.55]} rotation={[0, 0, Math.PI]}>
                <torusGeometry args={[0.25, 0.04, 16, 32, Math.PI]} />
                <meshStandardMaterial
                    color="#00cea8"
                    emissive="#00cea8"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Arms */}
            <mesh position={[-0.8, -0.3, 0]} rotation={[0, 0, 0.3]}>
                <capsuleGeometry args={[0.15, 0.8, 16, 32]} />
                <meshStandardMaterial color="#915eff" roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh position={[0.8, -0.3, 0]} rotation={[0, 0, -0.3]}>
                <capsuleGeometry args={[0.15, 0.8, 16, 32]} />
                <meshStandardMaterial color="#915eff" roughness={0.3} metalness={0.5} />
            </mesh>

            {/* Hands */}
            <Sphere args={[0.2, 16, 16]} position={[-1.1, -0.8, 0]}>
                <meshStandardMaterial color="#915eff" roughness={0.2} metalness={0.6} />
            </Sphere>
            <Sphere args={[0.2, 16, 16]} position={[1.1, -0.8, 0]}>
                <meshStandardMaterial color="#915eff" roughness={0.2} metalness={0.6} />
            </Sphere>

            {/* Antenna with glowing orb */}
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.5, 16]} />
                <meshStandardMaterial color="#915eff" />
            </mesh>
            <Sphere args={[0.15, 16, 16]} position={[0, 1.8, 0]}>
                <meshStandardMaterial
                    color="#00cea8"
                    emissive="#00cea8"
                    emissiveIntensity={1}
                />
            </Sphere>
        </group>
    );
};

const CharacterCanvas = () => {
    return (
        <Canvas
            shadows
            frameloop='always'
            gl={{
                preserveDrawingBuffer: true,
                antialias: true,
                alpha: true,
            }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 0, 5],
            }}
        >
            <Suspense fallback={<CanvasLoader />}>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
                <pointLight position={[-5, 3, -5]} intensity={0.8} color="#915eff" />
                <pointLight position={[5, -3, 5]} intensity={0.8} color="#00cea8" />

                <Character />

                {/* Gentle rotation controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />

                {/* Background */}
                <mesh position={[0, 0, -10]}>
                    <sphereGeometry args={[50, 32, 32]} />
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

export default CharacterCanvas;
