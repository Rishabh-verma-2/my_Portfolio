import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

    useEffect(() => {
        let trailId = 0;

        const mouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Add trail particle
            const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
            setTrail(prev => [...prev.slice(-15), newTrail]);
        };

        const mouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('cursor-pointer')) {
                setCursorVariant('hover');
            }
        };

        const mouseLeave = () => {
            setCursorVariant('default');
        };

        window.addEventListener('mousemove', mouseMove);
        document.querySelectorAll('button, a, .cursor-pointer').forEach(el => {
            el.addEventListener('mouseenter', mouseEnter as EventListener);
            el.addEventListener('mouseleave', mouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            document.querySelectorAll('button, a, .cursor-pointer').forEach(el => {
                el.removeEventListener('mouseenter', mouseEnter as EventListener);
                el.removeEventListener('mouseleave', mouseLeave);
            });
        };
    }, []);

    // Hide on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return null;
    }

    return (
        <>
            {/* Trail particles */}
            {trail.map((particle, index) => (
                <motion.div
                    key={particle.id}
                    className="fixed pointer-events-none z-[9999] rounded-full"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        width: 8 - index * 0.4,
                        height: 8 - index * 0.4,
                        background: `radial-gradient(circle, rgba(145, 94, 255, ${1 - index / 15}), transparent)`,
                    }}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{
                        opacity: 1 - index / 15,
                        scale: 1 - index / 20,
                        x: -4 + index * 0.2,
                        y: -4 + index * 0.2
                    }}
                    transition={{ duration: 0.2 }}
                />
            ))}

            {/* Main cursor */}
            <motion.div
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: cursorVariant === 'hover' ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            >
                <div className="w-8 h-8 rounded-full border-2 border-white bg-white/10 backdrop-blur-sm">
                    <div className="absolute inset-0 rounded-full animate-ping bg-purple-500/30" />
                </div>
            </motion.div>

            {/* Outer cursor ring */}
            <motion.div
                className="fixed pointer-events-none z-[9998]"
                animate={{
                    x: mousePosition.x - 24,
                    y: mousePosition.y - 24,
                    scale: cursorVariant === 'hover' ? 2 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.3
                }}
            >
                <div className="w-12 h-12 rounded-full border border-purple-400/50" />
            </motion.div>
        </>
    );
};

export default CustomCursor;
