import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from '../Loader.tsx';

const Computers = ({ isMobile }: { isMobile: boolean }) => {
    // Try to load the model. If you don't have this file in public/desktop_pc/scene.gltf, 
    // you need to download it or change this path.
    // Using a common public URL as a fallback or placeholder if possible would be better, 
    // but usually these assets are local. I'll stick to a local path and error handling.

    // Note to User: Please ensure you have the 'desktop_pc' folder with 'scene.gltf' in your 'public' folder.
    // If not, this might show an error or nothing. 

    // For now, I will assume the user has the model or will add it. 
    // I'll add a fallback primitive in case it fails? No, useGLTF will error.

    // Attempting to use a reliable remote URL for the "Gaming Desktop" model often used in these portfolios
    // as a convenience.
    const computer = useGLTF('/desktop_pc/scene.gltf');
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Oscillate left and right
            // initial rotation y is approximately -0.2
            meshRef.current.rotation.y = -0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <mesh>
            <hemisphereLight intensity={2.5} groundColor='black' />
            <pointLight intensity={1} />
            <spotLight
                position={[-20, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={1024}
            />
            <primitive
                ref={meshRef}
                object={computer.scene}
                scale={isMobile ? 0.7 : 0.75}
                position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
                rotation={[-0.01, -0.2, -0.1]}
            />
        </mesh>
    );
};

// Fallback component if model fails to load
const ComputersFallback = () => (
    <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
    </mesh>
)

// ... (previous code)

const ComputersControls = () => {
    const [isInteracting, setIsInteracting] = useState(false);
    const controlsRef = useRef<any>(null);
    const defaultPos = new THREE.Vector3(20, 3, 5);

    useFrame((state) => {
        if (!isInteracting && controlsRef.current) {
            state.camera.position.lerp(defaultPos, 0.05);
            controlsRef.current.update();
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            minDistance={10}
            maxDistance={30}
            maxPolarAngle={Math.PI / 2 + 0.3}
            minPolarAngle={Math.PI / 2 - 0.3}
            onStart={() => setIsInteracting(true)}
            onEnd={() => setIsInteracting(false)}
        />
    );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia('(max-width: 500px)');

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas
            frameloop='always' // Changed to always for smooth rotation
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <ComputersControls />
                <Computers isMobile={isMobile} />
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

export default ComputersCanvas;
