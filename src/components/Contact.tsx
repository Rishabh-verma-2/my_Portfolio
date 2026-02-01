import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { textVariant } from '../utils/motion';
import CharacterCanvas from './canvas/CharacterCanvas';
import SectionWrapper from '../hoc/SectionWrapper';
import { slideIn } from '../utils/motion';
import { Mail, MapPin, Phone, Send, CheckCircle, Sparkles } from 'lucide-react';

const Contact = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const [showPopup, setShowPopup] = useState<{ label: string; value: string; position: { x: number; y: number } } | null>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (errors[name as keyof typeof errors]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = { name: '', email: '', message: '' };
        let isValid = true;

        if (!form.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!form.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const createParticleExplosion = () => {
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
        }));
        setParticles(newParticles);
        setTimeout(() => setParticles([]), 1000);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);
        createParticleExplosion();

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setForm({
                name: '',
                email: '',
                message: '',
            });

            setTimeout(() => setSuccess(false), 3000);
        }, 1000);
    };

    const handleCardClick = (item: { label: string; value: string }, event: React.MouseEvent<HTMLDivElement>) => {
        // Only show popup for Email and Phone cards
        if (item.label === 'Email' || item.label === 'Phone') {
            const rect = event.currentTarget.getBoundingClientRect();
            const scrollY = window.scrollY || window.pageYOffset;
            const scrollX = window.scrollX || window.pageXOffset;

            setShowPopup({
                ...item,
                position: {
                    x: rect.left + scrollX + rect.width / 2,
                    y: rect.top + scrollY - 20 // Position 20px above the card
                }
            });
            // Auto-hide after 3.5 seconds
            setTimeout(() => setShowPopup(null), 3500);
        }
    };

    return (
        <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
            <motion.div
                variants={slideIn("left", "tween", 0.2, 1)}
                className='flex-[0.75] glass-dark p-8 rounded-3xl border-2 border-[#915eff]/30 shadow-[0_0_50px_rgba(145,94,255,0.2)] relative overflow-hidden group'
            >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#915eff]/5 via-transparent to-[#00cea8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div variants={textVariant(0.1)} className="relative z-10">
                    <p className="dark:text-[#dfd9ff] text-tertiary font-medium lg:text-[26px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
                        Get in touch
                    </p>
                    <h3 className="dark:text-white text-primary font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
                        Contact<span className="text-[#915eff]">.</span>
                    </h3>
                </motion.div>

                <form
                    onSubmit={handleSubmit}
                    className='mt-8 flex flex-col gap-5 relative z-10'
                >
                    <motion.label
                        className='flex flex-col relative group'
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <span className='dark:text-white text-primary font-medium mb-4 flex items-center gap-2'>
                            Your Name
                            <Sparkles size={16} className="text-[#915eff] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <input
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            placeholder="What's your name?"
                            className={`glass-dark py-3 px-5 dark:placeholder:text-secondary/50 placeholder:text-gray-400 dark:text-white text-primary rounded-xl outline-none border-2 ${errors.name ? 'border-red-500' : 'border-[#915eff]/20'
                                } font-medium focus:border-[#915eff] focus:shadow-[0_0_20px_rgba(145,94,255,0.3)] transition-all`}
                        />
                        {errors.name && <span className='text-red-500 text-sm mt-1 flex items-center gap-1'>⚠️ {errors.name}</span>}
                    </motion.label>

                    <motion.label
                        className='flex flex-col relative group'
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <span className='dark:text-white text-primary font-medium mb-4 flex items-center gap-2'>
                            Your Email
                            <Sparkles size={16} className="text-[#915eff] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <input
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder="What's your email?"
                            className={`glass-dark py-3 px-5 dark:placeholder:text-secondary/50 placeholder:text-gray-400 dark:text-white text-primary rounded-xl outline-none border-2 ${errors.email ? 'border-red-500' : 'border-[#915eff]/20'
                                } font-medium focus:border-[#915eff] focus:shadow-[0_0_20px_rgba(145,94,255,0.3)] transition-all`}
                        />
                        {errors.email && <span className='text-red-500 text-sm mt-1 flex items-center gap-1'>⚠️ {errors.email}</span>}
                    </motion.label>

                    <motion.label
                        className='flex flex-col relative group'
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <span className='dark:text-white text-primary font-medium mb-4 flex items-center gap-2'>
                            Your Message
                            <Sparkles size={16} className="text-[#915eff] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <textarea
                            rows={5}
                            name='message'
                            value={form.message}
                            onChange={handleChange}
                            placeholder='What would you like to say?'
                            className={`glass-dark py-3 px-5 dark:placeholder:text-secondary/50 placeholder:text-gray-400 dark:text-white text-primary rounded-xl outline-none border-2 ${errors.message ? 'border-red-500' : 'border-[#915eff]/20'
                                } font-medium focus:border-[#915eff] focus:shadow-[0_0_20px_rgba(145,94,255,0.3)] resize-none transition-all`}
                        />
                        {errors.message && <span className='text-red-500 text-sm mt-1 flex items-center gap-1'>⚠️ {errors.message}</span>}
                    </motion.label>

                    <div className="relative">
                        <motion.button
                            type='submit'
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.05 }}
                            whileTap={{ scale: loading ? 1 : 0.95 }}
                            className='relative bg-gradient-to-r from-[#915eff] to-[#00cea8] py-4 px-10 rounded-xl outline-none w-fit text-white font-bold shadow-lg hover:shadow-[0_0_40px_rgba(145,94,255,0.6)] transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group'
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            {loading ? (
                                <>
                                    <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white' />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send size={20} />
                                </>
                            )}
                        </motion.button>

                        {/* Particle explosion */}
                        <AnimatePresence>
                            {particles.map((particle) => (
                                <motion.div
                                    key={particle.id}
                                    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                    animate={{
                                        opacity: 0,
                                        scale: 0,
                                        x: particle.x,
                                        y: particle.y,
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute w-2 h-2 bg-gradient-to-r from-[#915eff] to-[#00cea8] rounded-full"
                                    style={{ left: '50%', top: '50%' }}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </form>

                {/* Enhanced success message */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className='mt-6 p-6 glass-dark border-2 border-green-500/50 rounded-2xl flex items-center gap-4 relative overflow-hidden'
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 animate-pulse" />
                            <CheckCircle className='text-green-400' size={32} />
                            <div className="relative z-10">
                                <p className='dark:text-green-400 text-green-600 font-bold text-lg'>Message Sent Successfully!</p>
                                <p className='dark:text-green-300/70 text-green-600/70 text-sm mt-1'>Thank you! I'll get back to you soon.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Enhanced contact info cards */}
                <div className="mt-8 flex flex-col gap-3 relative z-10">
                    {[
                        { icon: Mail, label: 'Email', value: 'rishabh.verma2626@gmail.com', color: '#915eff' },
                        { icon: Phone, label: 'Phone', value: '+91 9313730589', color: '#00cea8' },
                        { icon: MapPin, label: 'Location', value: 'India', color: '#915eff' },
                    ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => handleCardClick(item, e)}
                                className='glass-dark p-4 rounded-xl border-2 border-[#915eff]/20 hover:border-[#915eff]/50 transition-all flex items-center gap-3 group cursor-pointer relative'
                            >
                                <div
                                    className="p-2 rounded-lg transition-all group-hover:scale-110"
                                    style={{ backgroundColor: `${item.color}20` }}
                                >
                                    <Icon style={{ color: item.color }} size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className='dark:text-secondary text-gray-500 text-xs'>{item.label}</p>
                                    <p className='dark:text-white text-primary text-sm font-medium truncate' title={item.value}>{item.value}</p>
                                </div>
                                {(item.label === 'Email' || item.label === 'Phone') && (
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00cea8] rounded-full animate-pulse" />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Popup Tooltip */}
                <AnimatePresence>
                    {showPopup && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            style={{
                                position: 'absolute',
                                left: `${showPopup.position.x}px`,
                                top: `${showPopup.position.y}px`,
                                transform: 'translate(-50%, -100%)',
                                zIndex: 100,
                            }}
                            className="glass-dark p-6 rounded-2xl border-2 border-[#915eff]/50 shadow-[0_0_40px_rgba(145,94,255,0.4)] max-w-md min-w-[280px]"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                {showPopup.label === 'Email' ? (
                                    <Mail className="text-[#915eff]" size={24} />
                                ) : (
                                    <Phone className="text-[#00cea8]" size={24} />
                                )}
                                <p className="dark:text-secondary text-gray-500 text-sm font-medium">{showPopup.label}</p>
                            </div>
                            <p className="dark:text-white text-primary text-lg font-bold break-all">{showPopup.value}</p>
                            <div className="mt-4 h-1 bg-gradient-to-r from-[#915eff] to-[#00cea8] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "100%" }}
                                    animate={{ width: "0%" }}
                                    transition={{ duration: 3.5, ease: "linear" }}
                                    className="h-full bg-white/30"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#915eff]/30 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#00cea8]/30 rounded-br-3xl" />
            </motion.div>

            <motion.div
                variants={slideIn("right", "tween", 0.2, 1)}
                className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] relative'
            >
                {/* Character container with enhanced effects */}
                <div className="relative h-full rounded-3xl overflow-hidden border-2 border-[#915eff]/30">
                    <CharacterCanvas />
                    {/* Character glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#915eff]/20 via-transparent to-transparent pointer-events-none" />
                </div>
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Contact, "contact");
