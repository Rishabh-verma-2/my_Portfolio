import { motion } from 'framer-motion';
import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant } from '../utils/motion';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
    const handleGitHubClick = () => {
        window.open('https://github.com/Rishabh-verma-2', '_blank');
    };

    return (
        <>
            <motion.div variants={textVariant(0.1)}>
                <p className="dark:text-[#dfd9ff] text-tertiary font-medium lg:text-[26px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
                    My Work
                </p>
                <h2 className="dark:text-white text-primary font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
                    Projects<span className="text-[#915eff]">.</span>
                </h2>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mt-4 dark:text-secondary text-gray-700 text-[17px] max-w-3xl leading-[30px]"
            >
                I believe in building real-world applications that solve actual problems.
                Each project showcases my ability to tackle complex challenges, learn new technologies,
                and deliver polished solutions. From full-stack web applications to innovative tools,
                my work demonstrates both technical proficiency and creative problem-solving.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-20 flex flex-col items-center justify-center p-6"
            >
                <div className="glass dark:glass-dark p-8 rounded-2xl border-2 border-[#915eff]/30 max-w-3xl w-full text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#915eff]/10 via-transparent to-[#00cea8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="relative z-10"
                    >
                        <FaGithub className="mx-auto mb-4 dark:text-white text-primary" size={60} />
                        <h3 className="dark:text-white text-primary font-bold text-2xl mb-3">
                            Explore My GitHub
                        </h3>
                        <p className="dark:text-secondary text-gray-600 text-sm mb-6 leading-relaxed">
                            All my projects are open source and available on GitHub.
                            Check out my repositories to see detailed code, documentation,
                            and live demos of my work.
                        </p>
                        <motion.button
                            onClick={handleGitHubClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-[#915eff] to-[#00cea8] rounded-xl font-bold text-white text-base shadow-lg hover:shadow-[0_0_30px_rgba(145,94,255,0.5)] transition-shadow duration-300 flex items-center gap-2 mx-auto"
                        >
                            <FaGithub size={20} />
                            Visit My GitHub
                        </motion.button>
                    </motion.div>

                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#915eff] rounded-tl-3xl opacity-50" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#00cea8] rounded-br-3xl opacity-50" />
                </div>
            </motion.div>
        </>
    );
};

export default SectionWrapper(Projects, "projects");
