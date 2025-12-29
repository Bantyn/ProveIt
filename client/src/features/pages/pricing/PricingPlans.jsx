import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, TrendingUp, Sparkles, ArrowRight, Crown, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingPlans = () => {
    const navigate = useNavigate();
    const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or yearly

    const plans = [
        {
            id: 'free',
            name: 'Free',
            price: { monthly: 0, yearly: 0 },
            description: 'Perfect for getting started',
            features: [
                'Basic profile',
                '5 competition entries per month',
                'Community access',
                'Basic analytics',
                'Email support',
            ],
            popular: false,
            cta: 'Get Started Free',
            icon: Users,
        },
        {
            id: 'pro',
            name: 'Pro',
            price: { monthly: 499, yearly: 4990 }, // ₹499/month or ₹4990/year (save ~17%)
            description: 'For serious job seekers',
            features: [
                'Everything in Free',
                'Unlimited competition entries',
                'Priority support',
                'Advanced analytics & insights',
                'Featured profile badge',
                'Resume review service',
                'Interview preparation resources',
                'Direct employer connections',
            ],
            popular: true,
            cta: 'Start Pro Trial',
            icon: Crown,
        },
    ];

    const handleGetStarted = (planId) => {
        // Navigate to signup with plan pre-selected
        navigate('/signup/clientSignup', { state: { selectedPlan: planId } });
    };

    return (
        <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-blue-900/10 pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 pt-20 pb-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-900/20 text-violet-300 mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">Simple, Transparent Pricing</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl font-black mb-6">
                        Choose Your{' '}
                        <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                            Success Plan
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        Start competing for your dream job today. Upgrade anytime as you grow.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 p-2 rounded-xl bg-violet-900/20 border border-violet-500/30">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-all ${billingCycle === 'monthly'
                                    ? 'bg-violet-600 text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-all relative ${billingCycle === 'yearly'
                                    ? 'bg-violet-600 text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Yearly
                            <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs bg-green-500 text-white rounded-full">
                                Save 17%
                            </span>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Pricing Cards */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative rounded-2xl border-2 p-8 backdrop-blur-xl transition-all duration-300 ${plan.popular
                                    ? 'border-violet-500 bg-gradient-to-br from-violet-900/30 to-blue-900/30 shadow-2xl shadow-violet-500/20 scale-105'
                                    : 'border-violet-900/30 bg-black/40 hover:border-violet-700/50'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full text-sm font-bold text-white shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${plan.popular
                                    ? 'bg-gradient-to-br from-violet-600 to-blue-600'
                                    : 'bg-violet-600/20 border border-violet-500/30'
                                }`}>
                                <plan.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                            </div>

                            {/* Plan Name */}
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-gray-400 mb-6">{plan.description}</p>

                            {/* Price */}
                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black">
                                        ₹{billingCycle === 'monthly' ? plan.price.monthly : Math.floor(plan.price.yearly / 12)}
                                    </span>
                                    <span className="text-gray-400">/month</span>
                                </div>
                                {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        Billed ₹{plan.price.yearly} annually
                                    </p>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-violet-400' : 'text-violet-500'
                                            }`} strokeWidth={2.5} />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleGetStarted(plan.id)}
                                className={`w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${plan.popular
                                        ? 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-xl shadow-violet-500/30'
                                        : 'bg-violet-600/20 border-2 border-violet-600/50 hover:bg-violet-600/30 hover:border-violet-500 text-white'
                                    }`}
                            >
                                {plan.cta}
                                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Trust Section */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {[
                        { icon: Shield, title: 'Secure Payments', desc: 'Bank-level encryption' },
                        { icon: Zap, title: 'Instant Access', desc: 'Start competing immediately' },
                        { icon: TrendingUp, title: 'Cancel Anytime', desc: 'No long-term commitments' },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-xl bg-violet-900/10 border border-violet-500/20 text-center"
                        >
                            <item.icon className="w-8 h-8 text-violet-400 mx-auto mb-3" strokeWidth={2} />
                            <h4 className="font-bold mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* FAQ Section */}
            <div className="relative z-10 max-w-3xl mx-auto px-4 pb-20">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[
                        {
                            q: 'Can I switch plans later?',
                            a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
                        },
                        {
                            q: 'What payment methods do you accept?',
                            a: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets.',
                        },
                        {
                            q: 'Is there a refund policy?',
                            a: 'Yes, we offer a 7-day money-back guarantee if you\'re not satisfied with our Pro plan.',
                        },
                    ].map((faq, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-xl bg-violet-900/10 border border-violet-500/20"
                        >
                            <h4 className="font-bold mb-2">{faq.q}</h4>
                            <p className="text-gray-400">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPlans;
