// src/features/ContactCom/ContactSection.jsx - Enterprise SaaS Design
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Mail, Phone, MessageSquare, Send, CheckCircle2,
  User, Briefcase, Clock, ShieldCheck,
  Sparkles, Zap, Building, MapPin,
  ArrowRight, Globe, Target, Users,
  TrendingUp, Award, Headphones, Calendar
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect } from 'react';

const ContactSection = ({ darkMode = true }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);
  const submitBtnRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse tracking for parallax and magnetic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Magnetic Button Physics
  const magneticX = useSpring(0, { stiffness: 150, damping: 15 });
  const magneticY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleGlobalMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleGlobalMouse);
    return () => window.removeEventListener('mousemove', handleGlobalMouse);
  }, [mouseX, mouseY]);

  const handleMagneticMove = (e) => {
    if (!submitBtnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = submitBtnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dist = Math.hypot(clientX - centerX, clientY - centerY);

    if (dist < 120) {
      magneticX.set((clientX - centerX) * 0.3);
      magneticY.set((clientY - centerY) * 0.3);
    } else {
      magneticX.set(0);
      magneticY.set(0);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      jobTitle: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/, 'Invalid phone number'),
      jobTitle: Yup.string().required('Job title is required'),
      message: Yup.string().min(20, 'Message must be at least 20 characters').required('Message is required'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      formik.resetForm();
    }
  });

  // Team Size Options

  // SaaS Benefits
  const benefits = [
    {
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-green-500',
    },
    {
      title: '24/7 Support',
      description: 'Dedicated success team',
      icon: Headphones,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Scalable Solutions',
      description: 'Grow with your business needs',
      icon: TrendingUp,
      color: 'from-violet-500 to-purple-500',
    },
    {
      title: 'Fast Onboarding',
      description: 'Setup in less than 48 hours',
      icon: Zap,
      color: 'from-amber-500 to-orange-500',
    }
  ];

  // Contact icons for background animation
  const contactIcons = [
    { Icon: Mail, x: 10, y: 20, size: 28, depth: 30, delay: 0 },
    { Icon: Phone, x: 85, y: 75, size: 32, depth: 40, delay: 2 },
    { Icon: Send, x: 80, y: 15, size: 24, depth: 25, delay: 1 },
    { Icon: Headphones, x: 12, y: 50, size: 30, depth: 35, delay: 2.5 },
    { Icon: MessageSquare, x: 5, y: 80, size: 22, depth: 20, delay: 1.5 },
    { Icon: Globe, x: 92, y: 40, size: 26, depth: 28, delay: 0.8 },
    { Icon: Sparkles, x: 70, y: 90, size: 20, depth: 15, delay: 3.2 },
    { Icon: ShieldCheck, x: 45, y: 5, size: 24, depth: 18, delay: 4 },
  ];

  // Trust Indicators
  const trustMetrics = [
    { value: '500+', label: 'Enterprise Clients', icon: Building },
    { value: '99.9%', label: 'Uptime SLA', icon: Target },
    { value: '24/7', label: 'Global Support', icon: Globe },
    { value: 'SOC 2', label: 'Certified', icon: Award }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 text-neutral-900 dark:text-white overflow-hidden">

      {/* 🌌 Enhanced Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Film Grain/Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

        {/* Dynamic Glow Orbs with Mouse Tracking */}
        <motion.div
          style={{ x: useTransform(smoothX, [0, 2000], [-60, 60]), y: useTransform(smoothY, [0, 2000], [-60, 60]) }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-violet-300/20 to-indigo-300/20 dark:from-violet-900/15 dark:to-indigo-900/15 blur-[120px]"
        />
        <motion.div
          style={{ x: useTransform(smoothX, [0, 2000], [60, -60]), y: useTransform(smoothY, [0, 2000], [60, -60]) }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-fuchsia-300/15 to-rose-300/15 dark:from-fuchsia-900/15 dark:to-rose-900/15 blur-[120px]"
        />

        {/* ✉️ Kinetic Contact Icons Background */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.15]">
            {contactIcons.map((item, i) => (
              <motion.div
                key={`bg-icon-${i}`}
                className="absolute text-violet-500/40 dark:text-violet-400/30"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  x: useTransform(smoothX, [0, 2000], [item.depth * -1.2, item.depth * 1.2]),
                  y: useTransform(smoothY, [0, 2000], [item.depth * -0.8, item.depth * 0.8]),
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 5, -5, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 6 + (i % 4) * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay
                  }}
                >
                  <item.Icon size={item.size} strokeWidth={1} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Enhanced Multi-Layer Network Threads */}
        {!shouldReduceMotion && (
          <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.08]" aria-hidden="true">
            <motion.path
              d="M 0 300 Q 500 350 1000 300 T 2000 300"
              fill="none"
              stroke="url(#gradient-path-1)"
              strokeWidth="1.5"
              animate={{ d: ["M 0 300 Q 500 350 1000 300 T 2000 300", "M 0 320 Q 500 280 1000 320 T 2000 320", "M 0 300 Q 500 350 1000 300 T 2000 300"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M 0 500 Q 700 450 1400 500"
              fill="none"
              stroke="url(#gradient-path-2)"
              strokeWidth="1"
              animate={{ d: ["M 0 500 Q 700 450 1400 500", "M 0 480 Q 700 520 1400 480", "M 0 500 Q 700 450 1400 500"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <defs>
              <linearGradient id="gradient-path-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradient-path-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
                <stop offset="50%" stopColor="#6366F1" stopOpacity="1" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Clean Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.1] dark:opacity-[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-transparent dark:to-neutral-950" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 max-w-7xl">


        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-200 dark:border-violet-800/30 backdrop-blur-xl shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Trusted by 500+ Enterprise Teams
            </span>
          </motion.div>

          {/* Title - Premium Typography */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-[1.1] tracking-[-0.03em]">
            <span className="block text-neutral-900 dark:text-white mb-2">
              Ready to Transform
            </span>
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-sky-400 bg-clip-text text-transparent">
              Your Workflow?
            </span>
          </h1>

          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
            Join leading companies who trust ProveIt for their talent verification. Get started with a personalized demo.
          </p>
        </motion.div>
        {/* Trust Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
        >
          {trustMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-2xl bg-white/70 dark:bg-neutral-800/40 backdrop-blur-md border border-neutral-200/60 dark:border-white/5 text-center shadow-sm"
            >
              <metric.icon className="w-4 h-4 mx-auto mb-3 text-violet-600 dark:text-violet-400" />
              <div className="text-2xl font-black text-neutral-900 dark:text-white mb-0.5 tracking-tight">
                {metric.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column - Benefits */}
          <div className="lg:col-span-4 space-y-6">

            {/* Benefits Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                Why Choose ProveIt?
              </h3>

              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="p-5 rounded-2xl bg-white/80 dark:bg-neutral-800/50 backdrop-blur-md border border-neutral-200/60 dark:border-white/5 shadow-sm group hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/[0.03] group-hover:to-rose-500/[0.03] transition-all" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${benefit.color} shadow-lg flex-shrink-0`}>
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1 leading-tight">
                        {benefit.title}
                      </h4>
                      <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-normal">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-neutral-900 dark:bg-white/[0.03] text-white border border-white/10 shadow-2xl overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h3 className="text-lg font-bold mb-4 flex items-center gap-3 relative z-10">
                <Calendar className="w-5 h-5 text-violet-400" />
                Prefer to Talk?
              </h3>
              <div className="space-y-4 relative z-10">
                <a href="mailto:enterprise@proveit.com" className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group/link">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/link:bg-violet-500/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">enterprise@proveit.com</span>
                </a>
                <a href="tel:+918976543210" className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group/link">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/link:bg-violet-500/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+91 89765 43210</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {/* Form Container */}
              <div className="relative rounded-[2.5rem] overflow-hidden border border-neutral-200 dark:border-white/5 bg-white/80 dark:bg-neutral-800/40 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.1)] dark:shadow-none">

                <div className="relative p-8 md:p-10">

                  {/* Form Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="p-4 rounded-2xl bg-neutral-900 dark:bg-violet-600 shadow-xl rotate-3">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                          Request Enterprise Demo
                        </h2>
                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mt-1">
                          Personalized human response within 24h
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <form onSubmit={formik.handleSubmit} className="space-y-6">

                    {/* Row 1: Name & Email */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 ml-1">
                          Full Name *
                        </label>
                        <input
                          {...formik.getFieldProps('name')}
                          className={`w-full px-5 py-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border ${formik.touched.name && formik.errors.name
                            ? 'border-red-400'
                            : 'border-neutral-200 dark:border-white/5 focus:border-violet-500/50'
                            } text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300`}
                          placeholder="John Doe"
                        />
                        {formik.touched.name && formik.errors.name && (
                          <p className="text-sm text-red-600 dark:text-red-400">{formik.errors.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 ml-1">
                          Work Email *
                        </label>
                        <input
                          {...formik.getFieldProps('email')}
                          type="email"
                          className={`w-full px-5 py-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border ${formik.touched.email && formik.errors.email
                            ? 'border-red-400'
                            : 'border-neutral-200 dark:border-white/5 focus:border-indigo-500/50'
                            } text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300`}
                          placeholder="john@company.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                          <p className="text-sm text-red-600 dark:text-red-400">{formik.errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone & Job Title */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 ml-1">
                          Phone Number
                        </label>
                        <input
                          {...formik.getFieldProps('phone')}
                          type="tel"
                          className="w-full px-5 py-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/5 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300"
                          placeholder="+1 (234) 567-890"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 ml-1">
                          Job Title *
                        </label>
                        <input
                          {...formik.getFieldProps('jobTitle')}
                          className={`w-full px-5 py-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border ${formik.touched.jobTitle && formik.errors.jobTitle
                            ? 'border-red-400'
                            : 'border-neutral-200 dark:border-white/5 focus:border-violet-500/50'
                            } text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300`}
                          placeholder="VP of Talent"
                        />
                        {formik.touched.jobTitle && formik.errors.jobTitle && (
                          <p className="text-sm text-red-600 dark:text-red-400">{formik.errors.jobTitle}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 ml-1">
                          How can we help? *
                        </label>
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">
                          {formik.values.message.length}/500
                        </span>
                      </div>
                      <textarea
                        {...formik.getFieldProps('message')}
                        rows={4}
                        className={`w-full px-5 py-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border ${formik.touched.message && formik.errors.message
                          ? 'border-red-400'
                          : 'border-neutral-200 dark:border-white/5 focus:border-rose-500/50'
                          } text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-rose-500/10 transition-all duration-300 resize-none`}
                        placeholder="Tell us about your requirements..."
                      />
                      {formik.touched.message && formik.errors.message && (
                        <p className="text-sm text-red-600 dark:text-red-400">{formik.errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      ref={submitBtnRef}
                      disabled={isSubmitting}
                      onMouseMove={handleMagneticMove}
                      style={{ x: magneticX, y: magneticY }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-5 px-8 rounded-2xl font-black text-lg transition-all duration-300 relative overflow-hidden group shadow-xl ${submitted
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                        : isSubmitting
                          ? 'bg-neutral-400 dark:bg-neutral-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-rose-600 hover:shadow-2xl hover:shadow-violet-500/20'
                        } focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/30`}
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-3 text-white uppercase tracking-wider">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : submitted ? (
                          <>
                            <CheckCircle2 className="w-6 h-6" />
                            <span>Request Sent! We'll be in touch soon</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Request Demo</span>
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </form>

                  {/* Form Footer - Enterprise Trust */}
                  <div className="mt-8 pt-8 border-t border-neutral-200/60 dark:border-white/5">
                    <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>GDPR Compliant</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        <span>24h Response</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Globe className="w-3.5 h-3.5 text-rose-500" />
                        <span>Global Support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
