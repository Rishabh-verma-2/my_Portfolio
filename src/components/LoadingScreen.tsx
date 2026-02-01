import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LoadingSpinner = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 1.5;
        }
    });

    return (
        <mesh ref={meshRef}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
                color="#915eff"
                wireframe
                emissive="#915eff"
                emissiveIntensity={1}
            />
        </mesh>
    );
};

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsComplete(true), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    if (isComplete) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed inset-0 z-[10000] bg-primary flex items-center justify-center flex-col"
            >
                {/* 3D Spinner */}
                <div className="w-32 h-32 mb-8">
                    <Canvas camera={{ position: [0, 0, 3] }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <LoadingSpinner />
                    </Canvas>
                </div>

                {/* Text */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white text-2xl font-bold mb-4"
                >
                    Welcome to the Future
                </motion.h2>

                {/* Progress bar */}
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#915eff] to-[#00cea8]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <p className="text-white/60 mt-2 text-sm">{progress}%</p>

                {/* Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-500 rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: window.innerHeight + 10,
                                opacity: 0,
                            }}
                            animate={{
                                y: -10,
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                delay: Math.random() * 2,
                                repeat: Infinity,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoadingScreen;
