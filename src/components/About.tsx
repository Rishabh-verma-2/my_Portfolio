import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';
import { Code, Smartphone, Server, Palette, Star, Zap } from 'lucide-react';

const ServiceCard = ({ index, title, icon: Icon, description }: { index: number, title: string, icon: any, description: string }) => (
    <motion.div
        variants={fadeIn("up", "spring", index * 0.15, 0.75)}
        className='group relative'
    >
        <div className='glass-dark p-8 rounded-3xl border-2 border-[#915eff]/20 hover:border-[#915eff] transition-all duration-300 h-full min-h-[280px] flex flex-col items-center justify-center relative overflow-hidden'>
            {/* Animated background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#915eff]/10 via-transparent to-[#00cea8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className='relative z-10 mb-6'
            >
                <div className="relative">
                    <Icon
                        size={64}
                        className="dark:text-white text-primary group-hover:text-[#915eff] transition-colors"
                        strokeWidth={1.5}
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-xl bg-[#915eff] opacity-0 group-hover:opacity-50 transition-opacity" />
                </div>
            </motion.div>

            <h3 className='dark:text-white text-primary text-xl font-bold text-center mb-3 relative z-10'>
                {title}
            </h3>

            <p className="dark:text-secondary text-gray-600 text-sm text-center relative z-10 leading-relaxed">
                {description}
            </p>

            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#915eff] rounded-tl-xl opacity-0 group-hover:opacity-50 transition-opacity" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#00cea8] rounded-br-xl opacity-0 group-hover:opacity-50 transition-opacity" />
        </div>
    </motion.div>
);

const About = () => {
    const services = [
        {
            title: "Frontend Development",
            icon: Code,
            description: "Building responsive and interactive user interfaces with React, TypeScript, and modern CSS frameworks"
        },
        {
            title: "Mobile Development",
            icon: Smartphone,
            description: "Creating cross-platform mobile apps with React Native for seamless user experiences"
        },
        {
            title: "Backend Development",
            icon: Server,
            description: "Developing scalable server-side applications with Node.js, Express, and database management"
        },
        {
            title: "UI/UX Design",
            icon: Palette,
            description: "Crafting beautiful, user-centered designs with attention to detail and modern aesthetics"
        },
    ];

    return (
        <>
            <motion.div variants={textVariant(0.1)}>
                <p className="dark:text-[#dfd9ff] text-tertiary font-medium lg:text-[26px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
                    Introduction
                </p>
                <h2 className="dark:text-white text-primary font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
                    Overview<span className="text-[#915eff]">.</span>
                </h2>
            </motion.div>

            <motion.p
                variants={fadeIn("", "", 0.1, 1)}
                className='mt-4 dark:text-secondary text-gray-700 text-[17px] max-w-3xl leading-[30px]'
            >
                I'm a passionate <span className="dark:text-white text-primary font-semibold">Computer Science student</span> and
                <span className="dark:text-white text-primary font-semibold"> Full-Stack Developer</span> with a strong focus on
                creating modern, scalable web applications. I specialize in the <span className="dark:text-white text-primary font-semibold">MERN stack</span> and
                love bringing ideas to life through clean code and elegant design. I'm a quick learner who thrives on challenges
                and continuously explores new technologies to build solutions that make a difference.
            </motion.p>

            {/* Highlight stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-6"
            >
                <div className="flex items-center gap-2 glass-dark px-4 py-2 rounded-full">
                    <Star className="text-[#915eff]" size={20} />
                    <span className="dark:text-white text-primary font-semibold">10+ Projects</span>
                </div>
                <div className="flex items-center gap-2 glass-dark px-4 py-2 rounded-full">
                    <Zap className="text-[#00cea8]" size={20} />
                    <span className="dark:text-white text-primary font-semibold">Full Stack Developer</span>
                </div>
                <div className="flex items-center gap-2 glass-dark px-4 py-2 rounded-full">
                    <Code className="text-[#915eff]" size={20} />
                    <span className="dark:text-white text-primary font-semibold">MERN Specialist</span>
                </div>
            </motion.div>

            {/* Services Grid */}
            <div className='mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {services.map((service, index) => (
                    <ServiceCard key={service.title} index={index} {...service} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(About, "about");
