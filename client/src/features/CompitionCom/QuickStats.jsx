import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiAward, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { THEME_TOKENS } from '../../utils/theme';

const QuickStats = ({ darkMode = false }) => {
    const theme = darkMode ? THEME_TOKENS.dark : THEME_TOKENS.light;

    const stats = [
        {
            icon: FiZap,
            value: "1,200+",
            label: "Active Arenas",
            color: "text-violet-500",
            bg: "bg-violet-500/10",
            border: "border-violet-500/20"
        },
        {
            icon: FiAward,
            value: "₹5.5L+",
            label: "Prizes Awarded",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
        {
            icon: FiUsers,
            value: "100k+",
            label: "Elite Devs",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            icon: FiTrendingUp,
            value: "50+",
            label: "Fortune 500s",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        }
    ];

    return (
        <section className={`py-24 relative overflow-hidden ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
            {/* Background Decorative Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`p-8 md:p-12 rounded-[3rem] border transition-all duration-500 ${darkMode ? 'bg-gray-900/40 border-white/5 shadow-2xl' : 'bg-white border-indigo-100/50 shadow-2xl'
                        } backdrop-blur-3xl`}
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-x-0 lg:divide-x dark:divide-white/5 divide-indigo-100">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center text-center px-4 group"
                            >
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                                    className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center ${stat.color} mb-6 shadow-xl transition-transform group-hover:scale-110`}
                                >
                                    <stat.icon size={28} />
                                </motion.div>
                                <h3 className={`text-4xl font-black tracking-tight mb-2 ${theme.textPrimary}`}>
                                    {stat.value}
                                </h3>
                                <p className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ${theme.textPrimary}`}>
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default QuickStats;
