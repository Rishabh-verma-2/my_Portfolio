import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import EnhancedHeroCanvas from './canvas/EnhancedHeroCanvas';
import HolographicTerminalCanvas from './canvas/HolographicTerminalCanvas';
import { useMousePosition } from '../hooks/useMouseTracking';

const Typewriter = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 50);

        return () => clearInterval(timer);
    }, [text]);

    return (
        <p className="dark:text-[#dfd9ff] text-tertiary font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 text-white-100">
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-1"
            >
                |
            </motion.span>
        </p>
    );
};

const Hero = () => {
    const mousePosition = useMousePosition();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative w-full h-screen mx-auto">
            {/* Enhanced 3D Background with Particles */}
            <EnhancedHeroCanvas
                mouseX={mousePosition.x - window.innerWidth / 2}
                mouseY={mousePosition.y - window.innerHeight / 2}
            />

            {/* Holographic Command Terminal Layer */}
            <div className="absolute inset-0 z-0">
                <HolographicTerminalCanvas />
            </div>

            <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-6 flex flex-row items-start gap-5 z-10">
                <div className="flex flex-col justify-center items-center mt-5">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="w-5 h-5 rounded-full bg-[#915eff] relative"
                    >
                        <div className="absolute inset-0 rounded-full bg-[#915eff] animate-ping opacity-75" />
                    </motion.div>
                    <div className="w-1 sm:h-80 h-40 violet-gradient relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-[#915eff] to-transparent"
                            animate={{ y: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </div>

                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-black dark:text-white text-primary lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2 relative"
                    >
                        Hi, I'm{' '}
                        <span className="relative inline-block">
                            <span className="text-[#915eff] relative z-10">Rishabh</span>
                            {/* Holographic glow effect */}
                            <motion.span
                                className="absolute inset-0 text-[#915eff] blur-xl opacity-50"
                                animate={{
                                    opacity: [0.5, 0.8, 0.5],
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                Rishabh
                            </motion.span>
                            {/* Glitch effect on hover */}
                            <motion.span
                                className="absolute inset-0 text-cyan-400 opacity-0 mix-blend-screen"
                                whileHover={{
                                    opacity: [0, 0.7, 0],
                                    x: [0, -2, 2, 0],
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                Rishabh
                            </motion.span>
                        </span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <Typewriter text="A passionate Computer Science student and Creative Web Developer." />
                    </motion.div>

                    {/* Floating particles around text */}
                    {mounted && Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-500 rounded-full"
                            initial={{
                                x: Math.random() * 200,
                                y: Math.random() * 200,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.4,
                                repeat: Infinity,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}

        </section>
    );
};

export default Hero;
