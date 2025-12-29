import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
    Target,
    Shield,
    TrendingUp,
    Globe,
    Code2,
    Award,
    Briefcase,
    Trophy,
    Users,
    Heart,
    Zap,
    Rocket,
    CheckCircle,
    ArrowRight,
    Sparkles
} from 'lucide-react';

// Animated Section with Blur Effect
const BlurFadeSection = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
};

// Stat Card Component
const StatCard = ({ value, label, icon: Icon, delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay }}
            className="relative group"
        >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-600/10 to-blue-600/10 border border-violet-500/20 backdrop-blur-xl hover:border-violet-500/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-violet-400" strokeWidth={2} />
                    <div className="w-12 h-12 rounded-full bg-violet-600/20 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-violet-400" />
                    </div>
                </div>
                <div className="text-5xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {value}
                </div>
                <div className="text-sm text-gray-400 font-medium">{label}</div>
            </div>
        </motion.div>
    );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, desc, features, delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay }}
            className="group relative"
        >
            <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-black/40 to-violet-900/20 border border-violet-500/20 backdrop-blur-xl hover:border-violet-500/40 transition-all duration-500 hover:scale-[1.02]">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">{desc}</p>

                {/* Features */}
                <ul className="space-y-3">
                    {features.map((feature, idx) => (
                        <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: delay + 0.1 * idx }}
                            className="flex items-center gap-3 text-sm text-gray-300"
                        >
                            <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0" strokeWidth={2.5} />
                            {feature}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

// Journey Step Component
const JourneyStep = ({ step, title, desc, icon: Icon, delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay }}
            className="relative group"
        >
            <div className="flex gap-6 items-start">
                {/* Step Number */}
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-2xl font-black text-white group-hover:scale-110 transition-transform duration-300">
                        {step}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-6 h-6 text-violet-400" strokeWidth={2.5} />
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{desc}</p>
                </div>
            </div>

            {/* Connecting Line */}
            {step !== "04" && (
                <div className="absolute left-8 top-20 w-0.5 h-20 bg-gradient-to-b from-violet-600/50 to-transparent" />
            )}
        </motion.div>
    );
};

export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    const statistics = [
        { value: "250+", label: "Active Competitions", icon: Trophy },
        { value: "50K+", label: "Developers", icon: Users },
        { value: "2.4K", label: "Successfully Hired", icon: Award },
        { value: "95%", label: "Satisfaction Rate", icon: Heart }
    ];

    const valuePropositions = [
        {
            icon: Target,
            title: "Real-World Challenges",
            desc: "Companies post actual projects. You solve real problems, not just answer questions.",
            features: ["Project-based evaluation", "Industry-relevant tasks", "Practical skill assessment"]
        },
        {
            icon: Shield,
            title: "Bias-Free Selection",
            desc: "Anonymous submissions ensure selection based purely on skill, not background.",
            features: ["Blind evaluation", "Merit-only ranking", "Diverse talent pool"]
        },
        {
            icon: TrendingUp,
            title: "Career Acceleration",
            desc: "Top performers get direct access to hiring managers and exclusive opportunities.",
            features: ["Direct job offers", "Priority interviews", "Competition rewards"]
        }
    ];

    const journeySteps = [
        {
            step: "01",
            title: "Discover Challenges",
            desc: "Browse competitions by tech stack, difficulty, or company",
            icon: Globe
        },
        {
            step: "02",
            title: "Build & Submit",
            desc: "Develop solutions using your preferred tools and frameworks",
            icon: Code2
        },
        {
            step: "03",
            title: "Get Evaluated",
            desc: "AI + expert review with detailed feedback on your solution",
            icon: Award
        },
        {
            step: "04",
            title: "Land Opportunities",
            desc: "Top performers receive interview invites and job offers",
            icon: Briefcase
        }
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-blue-900/10 pointer-events-none" />

            {/* Animated Grid Background */}
            <div className="fixed inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
                <motion.div
                    style={{ opacity, scale }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <BlurFadeSection delay={0}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-900/20 text-violet-300 mb-8">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">About ProveIt</span>
                        </div>
                    </BlurFadeSection>

                    <BlurFadeSection delay={0.1}>
                        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                                Revolutionizing
                            </span>
                            <br />
                            <span className="text-white">Tech Hiring</span>
                        </h1>
                    </BlurFadeSection>

                    <BlurFadeSection delay={0.2}>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                            ProveIt connects talented developers with top companies through skill-based competitions, eliminating bias and focusing on what truly matters: your ability to solve real problems.
                        </p>
                    </BlurFadeSection>

                    <BlurFadeSection delay={0.3}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold text-lg shadow-2xl shadow-violet-900/50 hover:shadow-violet-800/60 transition-all"
                        >
                            <Rocket className="w-5 h-5" strokeWidth={2.5} />
                            Start Your Journey
                            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                        </motion.button>
                    </BlurFadeSection>
                </motion.div>
            </section>

            {/* Statistics Section */}
            <section className="relative py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <BlurFadeSection>
                        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
                            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                                By The Numbers
                            </span>
                        </h2>
                        <p className="text-center text-gray-400 mb-16 text-lg">
                            Join thousands of developers and companies already using ProveIt
                        </p>
                    </BlurFadeSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statistics.map((stat, idx) => (
                            <StatCard key={idx} {...stat} delay={idx * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className="relative py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <BlurFadeSection>
                        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
                            Why Choose <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">ProveIt?</span>
                        </h2>
                        <p className="text-center text-gray-400 mb-16 text-lg max-w-2xl mx-auto">
                            We're changing the game with a platform built for modern talent acquisition
                        </p>
                    </BlurFadeSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {valuePropositions.map((prop, idx) => (
                            <FeatureCard key={idx} {...prop} delay={idx * 0.15} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Section */}
            <section className="relative py-32 px-4">
                <div className="max-w-4xl mx-auto">
                    <BlurFadeSection>
                        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
                            Your <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Journey</span> to Success
                        </h2>
                        <p className="text-center text-gray-400 mb-20 text-lg">
                            Four simple steps to land your dream job
                        </p>
                    </BlurFadeSection>

                    <div className="space-y-12">
                        {journeySteps.map((step, idx) => (
                            <JourneyStep key={idx} {...step} delay={idx * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-4">
                <BlurFadeSection>
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="p-12 rounded-3xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 border border-violet-500/30 backdrop-blur-xl">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">
                                Ready to <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Prove</span> Yourself?
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                Join thousands of developers who are landing their dream jobs through skill-based competitions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold text-lg shadow-2xl shadow-violet-900/50"
                                >
                                    Get Started Free
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-lg backdrop-blur-xl hover:bg-white/20 transition-all"
                                >
                                    View Pricing
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </BlurFadeSection>
            </section>
        </div>
    );
}
