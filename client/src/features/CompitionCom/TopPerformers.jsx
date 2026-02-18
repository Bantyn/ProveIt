import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiAward, FiChevronRight } from 'react-icons/fi';
import { THEME_TOKENS } from '../../utils/theme';

const TopPerformers = ({ darkMode = false }) => {
    const theme = darkMode ? THEME_TOKENS.dark : THEME_TOKENS.light;

    const performers = [
        {
            rank: 1,
            name: "Alex Riverstone",
            points: "15,240",
            wins: 12,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
            badge: "Supreme Grandmaster",
            color: "from-amber-300 via-yellow-500 to-amber-600"
        },
        {
            rank: 2,
            name: "Sarah Chen",
            points: "14,890",
            wins: 10,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
            badge: "Ethereal Architect",
            color: "from-slate-300 via-gray-400 to-slate-500"
        },
        {
            rank: 3,
            name: "Marcus Volkov",
            points: "14,120",
            wins: 9,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop",
            badge: "Code Vanguard",
            color: "from-orange-400 via-orange-600 to-orange-800"
        }
    ];

    return (
        <section className={`py-32 relative ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4"
                    >
                        The Pantheon
                    </motion.div>
                    <h2 className={`text-5xl md:text-6xl font-black tracking-tight mb-6 ${theme.textPrimary}`}>
                        Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Fame</span>
                    </h2>
                    <p className={`text-lg font-medium max-w-2xl mx-auto opacity-60 ${theme.textSecondary}`}>
                        Celebrating the legends who have mastered the arena and redefined the boundaries of engineering excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {performers.map((performer, index) => (
                        <motion.div
                            key={performer.rank}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -10 }}
                            className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 ${darkMode ? 'bg-gray-900/40 border-white/5' : 'bg-white border-indigo-100/50'
                                } backdrop-blur-3xl overflow-hidden`}
                        >
                            {/* Ranking Badge */}
                            <div className={`absolute top-6 right-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${performer.color} flex items-center justify-center text-white text-xl font-black shadow-lg`}>
                                {performer.rank}
                            </div>

                            <div className="flex flex-col items-center text-center">
                                {/* Avatar with Glow */}
                                <div className="relative mb-8">
                                    <div className={`absolute -inset-4 bg-gradient-to-br ${performer.color} rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                                    <div className={`relative w-28 h-28 rounded-full border-2 p-1 bg-white dark:bg-gray-900 ${performer.rank === 1 ? 'border-amber-400' : performer.rank === 2 ? 'border-slate-300' : 'border-orange-500'
                                        }`}>
                                        <img
                                            src={performer.avatar}
                                            alt={performer.name}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 mb-6">
                                    <h3 className={`text-2xl font-black tracking-tight ${theme.textPrimary}`}>
                                        {performer.name}
                                    </h3>
                                    <div className="inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                                        {performer.badge}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t dark:border-white/5 border-indigo-50">
                                    <div className="space-y-1">
                                        <div className={`text-xl font-black tracking-tight ${theme.textPrimary}`}>{performer.points}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Points</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className={`text-xl font-black tracking-tight ${theme.textPrimary}`}>{performer.wins}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Wins</div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`mt-8 w-full py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${darkMode ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10' : 'bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100'
                                        }`}
                                >
                                    View Profile
                                </motion.button>
                            </div>

                            {/* Decorative Background Element */}
                            <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${performer.color} rounded-full opacity-5 blur-3xl`} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl font-black text-sm shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow"
                    >
                        View Full Leaderboard
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default TopPerformers;
