import { motion } from 'framer-motion';
import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant, fadeIn } from '../utils/motion';
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss, SiFramer, SiJavascript, SiTypescript, SiPython, SiGit } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// Clean, professional skills data with real icons
const skills = [
    {
        name: "React",
        icon: SiReact,
        level: 90,
        color: "#61DAFB",
        category: "Frontend"
    },
    {
        name: "Node.js",
        icon: SiNodedotjs,
        level: 88,
        color: "#339933",
        category: "Backend"
    },
    {
        name: "JavaScript",
        icon: SiJavascript,
        level: 92,
        color: "#F7DF1E",
        category: "Language"
    },
    {
        name: "TypeScript",
        icon: SiTypescript,
        level: 85,
        color: "#3178C6",
        category: "Language"
    },
    {
        name: "Java",
        icon: FaJava,
        level: 85,
        color: "#007396",
        category: "Language"
    },
    {
        name: "Python",
        icon: SiPython,
        level: 80,
        color: "#3776AB",
        category: "Language"
    },
    {
        name: "MongoDB",
        icon: SiMongodb,
        level: 82,
        color: "#47A248",
        category: "Database"
    },
    {
        name: "Express",
        icon: SiExpress,
        level: 88,
        color: "#000000",
        category: "Backend"
    },
    {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        level: 92,
        color: "#06B6D4",
        category: "Frontend"
    },
    {
        name: "Framer Motion",
        icon: SiFramer,
        level: 85,
        color: "#0055FF",
        category: "Animation"
    },
    {
        name: "Git",
        icon: SiGit,
        level: 88,
        color: "#F05032",
        category: "Tools"
    }
];

const SkillCard = ({ skill, index }: { skill: any, index: number }) => {
    const Icon = skill.icon;

    return (
        <motion.div
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            className="relative group"
        >
            <div className="glass dark:glass-dark p-6 rounded-2xl border-2 border-transparent hover:border-[#915eff] transition-all duration-300 h-full">
                {/* Icon and Name */}
                <div className="flex flex-col items-center gap-4 mb-4">
                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="relative"
                    >
                        <Icon
                            size={64}
                            style={{ color: skill.color }}
                            className="drop-shadow-[0_0_15px_rgba(145,94,255,0.5)]"
                        />
                        {/* Glow effect on hover */}
                        <div
                            className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
                            style={{ backgroundColor: skill.color }}
                        />
                    </motion.div>

                    <h3 className="dark:text-white text-primary font-bold text-lg text-center">
                        {skill.name}
                    </h3>

                    {/* Category badge */}
                    <span className="text-xs dark:text-secondary text-gray-600 px-3 py-1 rounded-full dark:bg-black-200/50 bg-gray-200">
                        {skill.category}
                    </span>
                </div>

                {/* Skill Level */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm dark:text-secondary text-gray-600">Proficiency</span>
                        <span className="text-sm font-bold dark:text-white text-primary">{skill.level}%</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 dark:bg-black-200 bg-gray-300 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: `linear-gradient(90deg, ${skill.color}, #915eff)`,
                                boxShadow: `0 0 10px ${skill.color}`
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* Animated border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#915eff] to-[#00cea8] opacity-20 blur-xl" />
                </div>
            </div>
        </motion.div>
    );
};

const Tech = () => {
    return (
        <>
            <motion.div variants={textVariant(0.1)}>
                <p className="dark:text-[#dfd9ff] text-tertiary font-medium lg:text-[26px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
                    My Arsenal
                </p>
                <h2 className="dark:text-white text-primary font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
                    Skills<span className="text-[#915eff]">.</span>
                </h2>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mt-4 dark:text-secondary text-gray-700 text-[17px] max-w-3xl leading-[30px]"
            >
                Technologies and frameworks I use to build modern, scalable applications.
                Each skill is honed through real-world projects and continuous learning.
            </motion.p>

            {/* Professional Grid Layout */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Tech, "tech");
