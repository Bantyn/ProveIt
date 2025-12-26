import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Crown, Star, Shield, Zap, Users, Sparkles, Target } from 'lucide-react';

const PlanSelectionModal = ({ isOpen, onClose, onSelectPlan, isDark = true }) => {
    const plans = [
        {
            id: 'free',
            name: 'Free Plan',
            price: '₹0',
            period: 'forever',
            badge: 'Get Started',
            icon: Target,
            color: 'blue',
            features: [
                '5 competitions per month',
                'Basic profile visibility',
                'Community support',
                'Standard analytics',
                'Public portfolio'
            ]
        },
        {
            id: 'premium',
            name: 'Premium Plan',
            price: '₹2,999',
            period: '6 months',
            badge: 'Most Popular',
            popular: true,
            icon: Crown,
            color: 'violet',
            features: [
                'Unlimited competition access',
                'Priority profile visibility',
                'Premium support (24/7)',
                'Advanced analytics & insights',
                'Early access to new competitions',
                'Personalized job matching',
                'Resume review by experts',
                'Interview preparation resources',
                'Exclusive networking events'
            ]
        }
    ];

    const handleSelectPlan = (planId) => {
        onSelectPlan(planId);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className={`absolute inset-0 ${isDark ? 'bg-black/90' : 'bg-black/70'
                        } backdrop-blur-md`}
                />

                {/* Modal Content - Full Width */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className={`relative w-full max-w-7xl max-h-[95vh] overflow-y-auto rounded-3xl border shadow-2xl ${isDark
                        ? 'bg-black border-violet-500/30'
                        : 'bg-white border-violet-300'
                        }`}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className={`absolute top-6 right-6 p-3 rounded-xl transition-all z-10 ${isDark
                            ? 'bg-violet-900/30 hover:bg-violet-900/50 text-violet-400'
                            : 'bg-violet-100 hover:bg-violet-200 text-violet-600'
                            }`}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Header */}
                    <div className="p-8 md:p-12 pb-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/10 border border-violet-500/30 mb-6">
                                <Crown className="w-4 h-4 text-violet-400" />
                                <span className={`text-sm font-medium ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>
                                    Choose Your Plan
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                                Unlock Your Potential
                            </h2>
                            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                Select the perfect plan to accelerate your career journey and stand out to top employers
                            </p>
                        </motion.div>
                    </div>

                    {/* Plans Grid - Full Width */}
                    <div className="px-8 md:px-12 pb-12">
                        <div className="grid md:grid-cols-2 gap-8">
                            {plans.map((plan, index) => (
                                <motion.div
                                    key={plan.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.15 }}
                                    onClick={() => handleSelectPlan(plan.id)}
                                    className={`relative rounded-3xl border-2 p-8 md:p-10 transition-all duration-300 cursor-pointer group ${plan.popular
                                        ? isDark
                                            ? 'border-violet-500 bg-gradient-to-br from-violet-600/20 to-blue-600/20 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/40'
                                            : 'border-violet-500 bg-gradient-to-br from-violet-50 to-blue-50 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/40'
                                        : isDark
                                            ? 'border-blue-500/30 bg-blue-600/5 hover:border-blue-500/50 hover:bg-blue-600/10'
                                            : 'border-blue-300 bg-blue-50/50 hover:border-blue-400 hover:bg-blue-100'
                                        }`}
                                >
                                    {/* Popular Badge */}
                                    {plan.popular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                            <span className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-black ${isDark
                                                ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white'
                                                : 'bg-gradient-to-r from-violet-500 to-blue-500 text-white'
                                                } shadow-xl`}>
                                                <Star className="w-4 h-4" />
                                                {plan.badge}
                                            </span>
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className={`inline-flex p-4 rounded-2xl mb-6 ${plan.color === 'violet'
                                        ? isDark
                                            ? 'bg-violet-600/30 text-violet-300'
                                            : 'bg-violet-200 text-violet-700'
                                        : isDark
                                            ? 'bg-blue-600/30 text-blue-300'
                                            : 'bg-blue-200 text-blue-700'
                                        }`}>
                                        <plan.icon className="w-10 h-10" />
                                    </div>

                                    {/* Plan Name */}
                                    <h3 className={`text-3xl font-black mb-3 ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                        }`}>
                                        {plan.name}
                                    </h3>

                                    {/* Price */}
                                    <div className="mb-8">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                                                {plan.price}
                                            </span>
                                            <span className={`text-lg ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                                / {plan.period}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-4 mb-8">
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${plan.color === 'violet'
                                                    ? 'bg-violet-600/20'
                                                    : 'bg-blue-600/20'
                                                    }`}>
                                                    <Check className={`w-4 h-4 ${plan.color === 'violet'
                                                        ? 'text-violet-400'
                                                        : 'text-blue-400'
                                                        }`} />
                                                </div>
                                                <span className={`text-base ${isDark ? 'text-neutral-300' : 'text-neutral-700'
                                                    }`}>
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Select Button */}
                                    <button
                                        onClick={() => handleSelectPlan(plan.id)}
                                        className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 ${plan.popular
                                            ? 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl hover:shadow-violet-500/40 hover:-translate-y-1'
                                            : isDark
                                                ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-2 border-blue-500/30 hover:border-blue-500'
                                                : 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-2 border-blue-300 hover:border-blue-400'
                                            }`}
                                    >
                                        {plan.id === 'free' ? 'Start Free' : 'Get Premium'}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`px-8 md:px-12 pb-8 border-t ${isDark ? 'border-violet-500/20' : 'border-violet-300'
                        }`}>
                        <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${isDark ? 'bg-violet-600/20' : 'bg-violet-100'}`}>
                                    <Shield className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                                </div>
                                <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                                    Secure Payment
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
                                    <Zap className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                </div>
                                <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                                    Instant Activation
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${isDark ? 'bg-violet-600/20' : 'bg-violet-100'}`}>
                                    <Users className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                                </div>
                                <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                                    Join 50,000+ Users
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PlanSelectionModal;
