import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LightRays from '../../components/LightRays';
import { ChevronRight, Code, Cpu, Globe, Zap } from 'lucide-react';

const Home = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative min-h-screen pt-20 pb-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-5%]  bg-secondary/20 rounded-full blur-[100px]" />
            </div>

            {/* LightRays Effect */}
            <div className="absolute inset-0 pointer-events-none z-[1]">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#3b82g9"
                    raysSpeed={1.2}
                    lightSpread={0.6}
                    rayLength={1.5}
                    followMouse={true}
                    mouseInfluence={0.15}
                    noiseAmount={0.05}
                    distortion={0.03}
                    fadeDistance={0.8}
                    saturation={0.9}
                />
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-6 pt-12 pb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="bg-white/90 inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30 text-primary-hover text-sm font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        {/* <h2 className='text-white'> */}
                        AI-Powered Skill Assessment
                        {/* </h2> */}
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent"
                >
                    Connecting Developers<br />
                    <span className="gradient-text">with Opportunities.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    PROVELT evaluates candidates through real project submissions, ensuring skill-based hiring.
                    Connect with top companies and showcase your expertise through practical work.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <button className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group">
                        Get Started
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </button>
                    <button className="glass text-white font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-all">
                        Explore Projects
                    </button>
                </motion.div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-6 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <FeatureCard
                        icon={<Code className="text-secondary" size={32} />}
                        title="Project-Based Evaluation"
                        desc="Showcase your skills through real projects, not just resumes and interviews."
                        variants={itemVariants}
                    />
                    <FeatureCard
                        icon={<Zap className="text-accent" size={32} />}
                        title="AI-Powered Matching"
                        desc="Get matched with companies based on your actual skills and project quality."
                        variants={itemVariants}
                    />
                    <FeatureCard
                        icon={<Cpu className="text-primary" size={32} />}
                        title="Centralized Platform"
                        desc="Admin-controlled system connecting developers with companies seamlessly."
                        variants={itemVariants}
                    />
                </motion.div>
            </div>

            {/* Chatbot Widget */}
            {/* <Chatbot /> */}
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, variants }) => (
    <motion.div
        variants={variants}
        whileHover={{ y: -5 }}
        className="glass-card p-8 rounded-2xl hover:border-primary/30 transition-colors"
    >
        <div className="mb-6 bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center border border-white/10">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">
            {desc}
        </p>
    </motion.div>
);

export default Home;
