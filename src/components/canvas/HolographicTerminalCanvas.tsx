import { Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Preload, Float } from '@react-three/drei';

import CanvasLoader from '../Loader';

// Types for props
interface TerminalTextProps {
    lines: string[];
    position: [number, number, number];
}

// 1. Holographic Text with Typing Effect
const TerminalText = ({ lines, position }: TerminalTextProps) => {
    return (
        <group position={position}>
            {lines.map((line, index) => {
                // Determine color based on content
                let color = "#e0e0e0"; // Default white-ish for output
                if (line.startsWith(">")) color = "#00ff00"; // Bright Green for commands
                else if (line.includes("success")) color = "#4caf50"; // Muted green for success
                else if (line.includes("error")) color = "#ff5f56"; // Red for error
                else if (line.includes("warning")) color = "#ffbd2e"; // Yellow for warning
                else if (line.includes("http")) color = "#64b5f6"; // Blue for links/info
                else if (line.includes("✔")) color = "#4caf50"; // Green for checkmarks

                return (
                    <Text
                        key={`${index}-${line.substring(0, 10)}`}
                        position={[0, -index * 0.3, index * 0.001]}
                        fontSize={0.18}
                        maxWidth={4.5}
                        lineHeight={1.4}
                        letterSpacing={0.02}
                        textAlign="left"
                        anchorX="left"
                        anchorY="top"
                    >
                        {line}
                        <meshBasicMaterial
                            color={color}
                            transparent
                            opacity={0.95}
                            depthWrite={true}
                            depthTest={true}
                        />
                    </Text>
                );
            })}
        </group>
    );
};

// 3. The Glass Panel (MacBook Terminal Style)
const TerminalPanel = () => {
    return (
        <group>
            {/* Main Window Body (Dark Glass) */}
            <mesh position={[0, -0.2, 0]}>
                <boxGeometry args={[5, 3, 0.1]} />
                <meshPhysicalMaterial
                    color="#1a1a1a"
                    roughness={0.2}
                    metalness={0.5}
                    transmission={0.2}
                    transparent
                    opacity={0.95}
                />
            </mesh>

            {/* Top Bar (Lighter Gray) */}
            <mesh position={[0, 1.4, 0.01]}>
                <boxGeometry args={[5, 0.4, 0.1]} />
                <meshPhysicalMaterial
                    color="#2d2d2d"
                    roughness={0.5}
                    metalness={0.1}
                />
            </mesh>

            {/* Window Controls (Red, Yellow, Green) */}
            <group position={[-2.2, 1.4, 0.08]}>
                <mesh position={[0, 0, 0]}>
                    <circleGeometry args={[0.08, 32]} />
                    <meshBasicMaterial color="#ff5f56" />
                </mesh>
                <mesh position={[0.25, 0, 0]}>
                    <circleGeometry args={[0.08, 32]} />
                    <meshBasicMaterial color="#ffbd2e" />
                </mesh>
                <mesh position={[0.5, 0, 0]}>
                    <circleGeometry args={[0.08, 32]} />
                    <meshBasicMaterial color="#27c93f" />
                </mesh>
            </group>

            {/* Terminal Title */}
            <Text
                position={[0, 1.4, 0.08]}
                fontSize={0.15}
                color="#a0a0a0"
                anchorX="center"
                anchorY="middle"
            >
                rishabh ~/portfolio -- -zsh
            </Text>

            {/* Glowing border (Subtle) */}
            <mesh position={[0, -0.1, -0.01]}>
                <boxGeometry args={[5.05, 3.45, 0.05]} />
                <meshBasicMaterial color="#915eff" transparent opacity={0.1} />
            </mesh>
        </group>
    );
};

// Main Scene Component
const HolographicTerminalScene = () => {
    const [terminalLines, setTerminalLines] = useState<string[]>([
        "> Initializing environment...",
        "> Loading portfolio configuration..."
    ]);


    useEffect(() => {
        // Extensive realistic command library
        const commands = [
            { text: "> npm install", delay: 1000 },
            { text: "[...........] \\ idealTree:lib: sill idealTree buildDeps", delay: 1200 },
            { text: "added 1450 packages in 2.3s", delay: 1500 },
            { text: "", delay: 200 },
            { text: "> git status", delay: 800 },
            { text: "On branch feature/holographic", delay: 600 },
            { text: "Your branch is up to date with 'origin/main'", delay: 600 },
            { text: "", delay: 200 },
            { text: "> git checkout -b feature/terminal-ui", delay: 1000 },
            { text: "Switched to a new branch 'feature/terminal-ui'", delay: 600 },
            { text: "", delay: 200 },
            { text: "> compiling modules...", delay: 1200 },
            { text: "✔ success: verified 452 modules", delay: 800 },
            { text: "✔ optimized bundle size: 2.4MB → 854KB", delay: 700 },
            { text: "", delay: 200 },
            { text: "> npm run dev", delay: 1000 },
            { text: "  VITE v4.4.9  ready in 350 ms", delay: 1200 },
            { text: "", delay: 300 },
            { text: "  ➜  Local:   http://localhost:5173/", delay: 400 },
            { text: "  ➜  Network: use --host to expose", delay: 400 },
            { text: "", delay: 200 },
            { text: "> watching for file changes...", delay: 1000 },
            { text: "✔ HMR connected", delay: 500 },
            { text: "", delay: 300 },
            { text: "> running tests...", delay: 1200 },
            { text: "PASS  src/components/Terminal.test.tsx", delay: 800 },
            { text: "PASS  src/utils/animations.test.ts", delay: 700 },
            { text: "PASS  src/hooks/useTyping.test.ts", delay: 700 },
            { text: "", delay: 200 },
            { text: "Test Suites: 3 passed, 3 total", delay: 600 },
            { text: "Tests:       24 passed, 24 total", delay: 500 },
            { text: "Snapshots:   0 total", delay: 400 },
            { text: "Time:        4.231 s", delay: 400 },
            { text: "✔ All tests passed!", delay: 600 },
            { text: "", delay: 300 },
            { text: "> git add .", delay: 800 },
            { text: "> git commit -m 'feat: add holographic terminal'", delay: 1000 },
            { text: "[feature/terminal-ui 3f7a9c2] feat: add holographic terminal", delay: 700 },
            { text: " 4 files changed, 287 insertions(+), 12 deletions(-)", delay: 600 },
            { text: "", delay: 200 },
            { text: "> git push origin feature/terminal-ui", delay: 1200 },
            { text: "Enumerating objects: 15, done.", delay: 600 },
            { text: "Counting objects: 100% (15/15), done.", delay: 500 },
            { text: "Delta compression using up to 8 threads", delay: 600 },
            { text: "Compressing objects: 100% (9/9), done.", delay: 700 },
            { text: "Writing objects: 100% (9/9), 3.42 KiB | 3.42 MiB/s", delay: 500 },
            { text: "Total 9 (delta 6), reused 0 (delta 0)", delay: 400 },
            { text: "✔ Push successful", delay: 600 },
            { text: "", delay: 300 },
            { text: "> npm run build", delay: 1200 },
            { text: "vite v4.4.9 building for production...", delay: 800 },
            { text: "transforming...", delay: 1000 },
            { text: "✔ 547 modules transformed", delay: 1200 },
            { text: "rendering chunks...", delay: 900 },
            { text: "computing gzip size...", delay: 800 },
            { text: "dist/index.html                   0.45 kB", delay: 400 },
            { text: "dist/assets/index-df8a7c86.css    12.34 kB │ gzip: 3.21 kB", delay: 500 },
            { text: "dist/assets/index-9f4e2a71.js    145.67 kB │ gzip: 47.89 kB", delay: 500 },
            { text: "✔ built in 8.43s", delay: 700 },
            { text: "", delay: 400 },
            { text: "> docker build -t portfolio:latest .", delay: 1200 },
            { text: "Sending build context to Docker daemon  2.048MB", delay: 800 },
            { text: "Step 1/8 : FROM node:18-alpine", delay: 600 },
            { text: " ---> a1b2c3d4e5f6", delay: 400 },
            { text: "Step 2/8 : WORKDIR /app", delay: 500 },
            { text: " ---> Using cache", delay: 300 },
            { text: "Step 3/8 : COPY package*.json ./", delay: 600 },
            { text: " ---> Using cache", delay: 300 },
            { text: "✔ Successfully built portfolio:latest", delay: 800 },
            { text: "", delay: 300 },
            { text: "> analyzing bundle...", delay: 1000 },
            { text: "Bundle size: 854 KB", delay: 600 },
            { text: "Largest chunks:", delay: 400 },
            { text: "  react-dom: 142.3 KB", delay: 400 },
            { text: "  three.js: 586.7 KB", delay: 400 },
            { text: "  framer-motion: 78.4 KB", delay: 400 },
            { text: "✔ Bundle analysis complete", delay: 600 },
            { text: "", delay: 400 },
            { text: "> lighthouse performance audit...", delay: 1200 },
            { text: "✔ Performance: 98/100", delay: 800 },
            { text: "✔ Accessibility: 100/100", delay: 700 },
            { text: "✔ Best Practices: 100/100", delay: 700 },
            { text: "✔ SEO: 100/100", delay: 700 },
            { text: "", delay: 500 },
            { text: "> deploying to production...", delay: 1200 },
            { text: "Deploying portfolio to Vercel...", delay: 800 },
            { text: "Building...", delay: 1000 },
            { text: "✔ Build completed", delay: 800 },
            { text: "✔ Deployment ready", delay: 600 },
            { text: "✔ Live at: https://rishabh-portfolio.vercel.app", delay: 700 },
            { text: "", delay: 600 },
            { text: "> system ready. awaiting input...", delay: 1000 }
        ];

        let currentIdx = 0;
        const timeouts: NodeJS.Timeout[] = [];

        const runSequence = () => {
            if (currentIdx >= commands.length) {
                // Loop back to start after brief pause
                const resetTimeout = setTimeout(() => {
                    setTerminalLines([
                        "> Restarting development cycle...",
                        ""
                    ]);
                    currentIdx = 0;
                    runSequence();
                }, 3000);
                timeouts.push(resetTimeout);
                return;
            }

            const cmd = commands[currentIdx];
            const timeout = setTimeout(() => {
                setTerminalLines(prev => {
                    const newLines = [...prev, cmd.text];
                    // Keep last 8 lines for better readability
                    if (newLines.length > 8) {
                        return newLines.slice(-8);
                    }
                    return newLines;
                });
                currentIdx++;
                runSequence();
            }, cmd.delay);
            timeouts.push(timeout);
        };

        runSequence();

        return () => timeouts.forEach(clearTimeout);
    }, []);

    useFrame(() => {
        // Subtle float handled by wrapper
    })

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={0.5}
            floatingRange={[-0.1, 0.1]}
        >
            {/* Shifted up from -1.8 to -1.3 for better visibility */}
            <group rotation={[0, -0.1, 0]} position={[0, -1.3, 0]} scale={0.75}>
                <TerminalPanel />

                {/* Content Container - increased z to prevent glitches */}
                <group position={[-2.3, 1, 0.15]}>
                    <TerminalText
                        lines={terminalLines}
                        position={[0, 0, 0]}
                    />
                    {/* Blinking Cursor */}
                    <mesh position={[0, -Math.min(terminalLines.length, 8) * 0.3 - 0.1, 0]}>
                        <planeGeometry args={[0.12, 0.22]} />
                        <meshBasicMaterial color="#00ff00" transparent opacity={0.7} />
                    </mesh>
                </group>
            </group>
        </Float>
    );
};

const HolographicTerminalCanvas = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 7], fov: 45 }}
            gl={{ antialias: true }}
            dpr={[1, 2]}
        >
            <Suspense fallback={<CanvasLoader />}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#915eff" />
                <pointLight position={[-10, -5, 5]} intensity={1} color="#00cea8" />

                <HolographicTerminalScene />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Suspense>
            <Preload all />
        </Canvas>
    );
};

export default HolographicTerminalCanvas;
