import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Moon, Sun, ArrowUp } from 'lucide-react';
import { FaLinkedin, FaGithub, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';


import Hero from './components/Hero';
import About from './components/About';
import Tech from './components/Tech';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
    const [isDark, setIsDark] = useState(true);
    const [showCursor, setShowCursor] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Smooth scrolling
    useSmoothScroll();

    // Scroll progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Initialize theme based on preference or default
    useEffect(() => {
        // Check if user has a preference or default to dark
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }

        // Show custom cursor on desktop only
        setShowCursor(window.innerWidth >= 768);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }, [isDark]);

    // Show scroll to top button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSocialClick = (type: string, value: string) => {
        switch (type) {
            case 'link':
                window.open(value, '_blank');
                break;
            case 'mail':
                window.location.href = `mailto:${value}`;
                break;
            case 'phone':
                window.location.href = `tel:${value}`;
                break;
        }
    };

    return (
        <BrowserRouter>
            <div className={`relative z-0 dark:bg-primary bg-white w-full overflow-hidden transition-colors duration-500 ${showCursor ? 'custom-cursor-active' : ''}`}>
                {/* Loading Screen */}
                <LoadingScreen />

                {/* Custom Cursor */}
                {showCursor && <CustomCursor />}

                {/* Interactive Robot */}
                

                {/* Navbar */}
                <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center glass backdrop-blur-md">
                    <motion.div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="dark:text-white text-primary text-[18px] font-bold flex">
                            Rishabh &nbsp; <span className="sm:block hidden">| Portfolio</span>
                        </span>
                    </motion.div>

                    <div className="flex gap-4 items-center">
                        <div className="flex gap-4">
                            <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                                <FaLinkedin
                                    className="dark:text-white text-primary hover:text-[#915eff] cursor-pointer transition-colors"
                                    size={20}
                                    onClick={() => handleSocialClick('link', 'https://linkedin.com/in/rishabh-verma-024sp-2jv')}
                                    title="LinkedIn"
                                />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                                <FaGithub
                                    className="dark:text-white text-primary hover:text-[#915eff] cursor-pointer transition-colors"
                                    size={20}
                                    onClick={() => handleSocialClick('link', 'https://github.com/Rishabh-verma-2')}
                                    title="GitHub"
                                />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                                <FaEnvelope
                                    className="dark:text-white text-primary hover:text-[#915eff] cursor-pointer transition-colors"
                                    size={20}
                                    onClick={() => handleSocialClick('mail', 'rishabh.verma2626@gmail.com')}
                                    title="Email"
                                />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                                <SiLeetcode
                                    className="dark:text-white text-primary hover:text-[#915eff] cursor-pointer transition-colors"
                                    size={20}
                                    onClick={() => handleSocialClick('link', 'https://leetcode.com/u/HFia6ENOU4/')}
                                    title="LeetCode"
                                />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                                <FaPhoneAlt
                                    className="dark:text-white text-primary hover:text-[#915eff] cursor-pointer transition-colors"
                                    size={18}
                                    onClick={() => handleSocialClick('phone', '+919313730589')}
                                    title="Phone"
                                />
                            </motion.div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.button
                                key={isDark ? 'dark' : 'light'}
                                initial={{ rotate: -180, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                exit={{ rotate: 180, scale: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={toggleTheme}
                                className="p-2 rounded-full dark:bg-white/10 bg-black/5 hover:bg-black/10 dark:hover:bg-white/20 transition-all backdrop-blur-md border border-black/10 dark:border-white/10 relative overflow-hidden group"
                                aria-label="Toggle Theme"
                            >
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#915eff] to-[#00cea8] opacity-0 group-hover:opacity-20 transition-opacity blur" />

                                {isDark ? (
                                    <Sun size={20} className="text-yellow-400 relative z-10" />
                                ) : (
                                    <Moon size={20} className="text-primary relative z-10" />
                                )}
                            </motion.button>
                        </AnimatePresence>
                    </div>
                </nav>

                <div className="dark:bg-hero-pattern bg-none bg-cover bg-no-repeat bg-center">
                    <Hero />
                </div>

                <About />
                <Tech />
                <Projects />

                <div className="relative z-0">
                    <Contact />
                </div>

                {/* Footer */}
                <footer className="dark:bg-black-100/50 bg-gray-100 border-t dark:border-[#915eff]/20 border-gray-200 py-8">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="dark:text-secondary text-gray-600 text-sm">
                            © 2026 Rishabh. Built with ❤️ using React + Three.js
                        </p>
                        <div className="flex gap-6">
                            {[
                                { icon: FaLinkedin, link: 'https://linkedin.com/in/rishabh-verma-024sp-2jv' },
                                { icon: FaGithub, link: 'https://github.com/Rishabh-verma-2' },
                                { icon: SiLeetcode, link: 'https://leetcode.com/u/HFia6ENOU4/' },
                            ].map((social, i) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={i}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="dark:text-secondary text-gray-600 hover:text-[#915eff] transition-colors"
                                    >
                                        <Icon size={20} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </footer>

                {/* Enhanced scroll progress indicator */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#915eff] via-[#7c3aed] to-[#00cea8] z-[100] origin-left"
                    style={{ scaleX }}
                />

                {/* Scroll to top button */}
                <AnimatePresence>
                    {showScrollTop && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-[#915eff] to-[#00cea8] text-white shadow-lg hover:shadow-[0_0_30px_rgba(145,94,255,0.6)] transition-shadow"
                        >
                            <ArrowUp size={24} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </BrowserRouter>
    );
}

export default App;

