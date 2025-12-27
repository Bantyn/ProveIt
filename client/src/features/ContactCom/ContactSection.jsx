// src/features/ContactCom/ContactSection.jsx - UPDATED WITH FIXES
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Mail, Phone, MapPin, Send, MessageSquare, ArrowRight,
  Calendar, CheckCircle2, ShieldCheck, Users, Clock,
  Sparkles, Award, Star, Briefcase, Headphones,
  Shield, Rocket, ChevronRight, Zap, Target,
  HelpCircle, MessageCircle, Video, ExternalLink,
  ThumbsUp, Layers, Cpu, Server, Database,
  Cloud, Smartphone, Palette, BarChart, Lock,
  Trophy, Code, Terminal, Wifi, Code2, Laptop,
  Battery, HardDrive, GitBranch, CheckCircle,
  ChevronDown, ChevronUp, Sun, Moon, FileCode,
  GitPullRequest, UserCheck, TrendingUp, Handshake,
  BarChart3, Hash, Building2 as BriefcaseIcon,
  Globe, Trophy as TrophyIcon
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Color map to fix Tailwind purge issue
const colorMap = {
  cyan: {
    bg: 'bg-cyan-500',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    softBg: 'bg-cyan-500/10',
    from: 'from-cyan-500/20',
    to: 'to-cyan-500/10',
    bgDark: 'bg-cyan-950/30',
    borderLight: 'border-cyan-500/20'
  },
  violet: {
    bg: 'bg-violet-500',
    text: 'text-violet-400',
    border: 'border-violet-500/30',
    softBg: 'bg-violet-500/10',
    from: 'from-violet-500/20',
    to: 'to-violet-500/10',
    bgDark: 'bg-violet-950/30',
    borderLight: 'border-violet-500/20'
  },
  fuchsia: {
    bg: 'bg-fuchsia-500',
    text: 'text-fuchsia-400',
    border: 'border-fuchsia-500/30',
    softBg: 'bg-fuchsia-500/10',
    from: 'from-fuchsia-500/20',
    to: 'to-fuchsia-500/10',
    bgDark: 'bg-fuchsia-950/30',
    borderLight: 'border-fuchsia-500/20'
  },
  emerald: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    softBg: 'bg-emerald-500/10',
    from: 'from-emerald-500/20',
    to: 'to-emerald-500/10',
    bgDark: 'bg-emerald-950/30',
    borderLight: 'border-emerald-500/20'
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    softBg: 'bg-purple-500/10',
    from: 'from-purple-500/20',
    to: 'to-purple-500/10',
    bgDark: 'bg-purple-950/30',
    borderLight: 'border-purple-500/20'
  },
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    softBg: 'bg-blue-500/10',
    from: 'from-blue-500/20',
    to: 'to-blue-500/10',
    bgDark: 'bg-blue-950/30',
    borderLight: 'border-blue-500/20'
  },
  pink: {
    bg: 'bg-pink-500',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
    softBg: 'bg-pink-500/10',
    from: 'from-pink-500/20',
    to: 'to-pink-500/10',
    bgDark: 'bg-pink-950/30',
    borderLight: 'border-pink-500/20'
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
    softBg: 'bg-orange-500/10',
    from: 'from-orange-500/20',
    to: 'to-orange-500/10',
    bgDark: 'bg-orange-950/30',
    borderLight: 'border-orange-500/20'
  },
  teal: {
    bg: 'bg-teal-500',
    text: 'text-teal-400',
    border: 'border-teal-500/30',
    softBg: 'bg-teal-500/10',
    from: 'from-teal-500/20',
    to: 'to-teal-500/10',
    bgDark: 'bg-teal-950/30',
    borderLight: 'border-teal-500/20'
  },
  amber: {
    bg: 'bg-amber-500',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    softBg: 'bg-amber-500/10',
    from: 'from-amber-500/20',
    to: 'to-amber-500/10',
    bgDark: 'bg-amber-950/30',
    borderLight: 'border-amber-500/20'
  },
  rose: {
    bg: 'bg-rose-500',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    softBg: 'bg-rose-500/10',
    from: 'from-rose-500/20',
    to: 'to-rose-500/10',
    bgDark: 'bg-rose-950/30',
    borderLight: 'border-rose-500/20'
  },
  lime: {
    bg: 'bg-lime-500',
    text: 'text-lime-400',
    border: 'border-lime-500/30',
    softBg: 'bg-lime-500/10',
    from: 'from-lime-500/20',
    to: 'to-lime-500/10',
    bgDark: 'bg-lime-950/30',
    borderLight: 'border-lime-500/20'
  },
  sky: {
    bg: 'bg-sky-500',
    text: 'text-sky-400',
    border: 'border-sky-500/30',
    softBg: 'bg-sky-500/10',
    from: 'from-sky-500/20',
    to: 'to-sky-500/10',
    bgDark: 'bg-sky-950/30',
    borderLight: 'border-sky-500/20'
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-400',
    border: 'border-green-500/30',
    softBg: 'bg-green-500/10',
    from: 'from-green-500/20',
    to: 'to-green-500/10',
    bgDark: 'bg-green-950/30',
    borderLight: 'border-green-500/20'
  },
  indigo: {
    bg: 'bg-indigo-500',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
    softBg: 'bg-indigo-500/10',
    from: 'from-indigo-500/20',
    to: 'to-indigo-500/10',
    bgDark: 'bg-indigo-950/30',
    borderLight: 'border-indigo-500/20'
  }
};

const ContactSection = ({ darkMode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('companies');
  const [expandedSections, setExpandedSections] = useState({ companies: true, candidates: false, admins: false });
  const shouldReduceMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', email: '', role: '', company: '', message: '', userType: 'company' },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      role: Yup.string().required('Required'),
      company: Yup.string(),
      message: Yup.string().min(20, 'Too short').required('Required'),
      userType: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      formik.resetForm();
    }
  });

  const platformServices = [
    {
      id: 'companies',
      title: 'For Companies',
      icon: BriefcaseIcon,
      color: 'cyan',
      description: 'Hire skilled talent through project-based evaluation.',
      features: ['Post project challenges', 'Evaluate real work', 'Verified portfolios', 'Admin ranking', 'Anti-plagiarism', 'Usage analytics'],
      stats: [{ label: 'Hiring Success', value: '94%', icon: TrendingUp }, { label: 'Time Saved', value: '40%', icon: Clock }]
    },
    {
      id: 'candidates',
      title: 'For Candidates',
      icon: Users,
      color: 'violet',
      description: 'Showcase skills via verified submissions.',
      features: ['Submit GitHub repos', 'Coding challenges', 'Skill portfolio', 'Performance rank', 'Get feedback', 'Direct hiring'],
      stats: [{ label: 'Placement Rate', value: '78%', icon: Target }, { label: 'Skill Verify', value: '100%', icon: ShieldCheck }]
    },
    {
      id: 'admins',
      title: 'Platform Admins',
      icon: Shield,
      color: 'fuchsia',
      description: 'Manage the ecosystem with full control.',
      features: ['Approve companies', 'Validate submissions', 'Run competitions', 'Grade projects', 'Manage interviews', 'Analytics'],
      stats: [{ label: 'Accuracy', value: '99%', icon: CheckCircle }, { label: 'Uptime', value: '99.9%', icon: Server }]
    }
  ];

  const contactChannels = [
    {
      icon: Mail,
      label: 'Support Neural-Link',
      value: 'support@proveit.io',
      description: 'Technical assistance channel',
      color: 'cyan'
    },
    {
      icon: Phone,
      label: 'Enterprise Uplink',
      value: '+1 (555) 123-4567',
      description: 'Direct partnership line',
      color: 'violet'
    },
    {
      icon: MessageSquare,
      label: 'Live Signal',
      value: 'Chat Active',
      description: 'Real-time operator',
      color: 'fuchsia'
    }
  ];

  const teamMembers = [
    { name: 'Alex Rivera', role: 'System Architect', specialty: 'Neural Networks', color: 'cyan' },
    { name: 'Maya Sharma', role: 'Ops Commander', specialty: 'Talent Logistics', color: 'violet' },
    { name: 'David Chen', role: 'Code Sentinel', specialty: 'Security Protocols', color: 'fuchsia' },
    { name: 'Sarah Johnson', role: 'Grid Analyst', specialty: 'Data Visualization', color: 'emerald' }
  ];

  const faqData = [
    {
      q: "How does the evaluation protocol work?",
      a: "Candidates engage in project-based challenges. Source code is analyzed by our admin nodes for quality, efficiency, and security."
    },
    {
      q: "Is the hiring latency guaranteed?",
      a: "Yes. Our direct-link neural network reduces time-to-hire by ~40% compared to traditional asynchronous recruiting methods."
    },
    {
      q: "What security measures are active?",
      a: "All submissions undergo rigorous plagiarism scans and biometric identity verification (optional) to ensure 100% authenticity."
    }
  ];

  const mapNodes = [
    { top: '30%', left: '20%', label: 'SF', color: 'cyan', tooltip: 'San Francisco – Hiring Operations' },
    { top: '35%', left: '28%', label: 'NY', color: 'violet', tooltip: 'New York – Enterprise Hub' },
    { top: '25%', left: '48%', label: 'LDN', color: 'fuchsia', tooltip: 'London – Admin Review Center' },
    { top: '38%', left: '85%', label: 'TKY', color: 'emerald', tooltip: 'Tokyo – R&D Laboratory' },
  ];

  // Get current service based on active tab
  const currentService = platformServices.find(s => s.id === activeTab) || platformServices[0];

  return (
    <div className={`relative min-h-screen font-sans transition-colors duration-500 ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`}>
      {/* Cyberpunk Grid Background - Optimized */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute inset-0 opacity-[0.03] ${darkMode ? 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)]'}`}
          style={{ backgroundSize: '40px 40px' }} />
        <div className={`absolute inset-0 bg-gradient-to-b ${darkMode ? 'from-transparent via-black/0 to-black' : 'from-transparent via-white/0 to-gray-50'}`} />

        {/* Optimized Aurora Gradients */}
        <motion.div
          animate={shouldReduceMotion ? false : { opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1], x: [0, 30, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className={`absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full blur-[80px] mix-blend-screen opacity-10 pointer-events-none ${darkMode ? 'bg-cyan-900/40' : 'bg-cyan-200/40'}`}
        />
        <motion.div
          animate={shouldReduceMotion ? false : { opacity: [0.2, 0.4, 0.2], scale: [1.1, 1, 1.1], x: [0, -20, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear", delay: 5 }}
          className={`absolute top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[70px] mix-blend-screen opacity-10 pointer-events-none ${darkMode ? 'bg-violet-900/40' : 'bg-violet-200/40'}`}
        />
        <motion.div
          animate={shouldReduceMotion ? false : { opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1], y: [0, 30, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear", delay: 10 }}
          className={`absolute bottom-[10%] left-[20%] w-[700px] h-[700px] rounded-full blur-[70px] mix-blend-screen opacity-10 pointer-events-none ${darkMode ? 'bg-fuchsia-900/30' : 'bg-fuchsia-200/30'}`}
        />

        <div className={`absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none ${darkMode ? 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' : ''}`} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 max-w-7xl">

        {/* Header - Updated copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 backdrop-blur-md ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
            <Zap className={`w-3.5 h-3.5 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Ready to Connect</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>Evaluate. </span>
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-cyan-400 via-violet-400 to-fuchsia-400' : 'from-cyan-600 via-violet-600 to-fuchsia-600'}`}>Verify. Hire.</span>
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
            Talk to real humans about our verified talent network and project-based evaluation platform.
            <span className="block mt-2 text-sm text-cyan-400">No bots. No sales pressure.</span>
          </p>
        </motion.div>

        {/* Holographic Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {platformServices.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                setActiveTab(service.id);
                setExpandedSections(p => ({ ...p, [service.id]: true }));
              }}
              className={`relative group px-6 py-3 rounded-xl border transition-all duration-300 overflow-hidden ${activeTab === service.id
                ? darkMode
                  ? `${colorMap[service.color].softBg} ${colorMap[service.color].border}`
                  : 'bg-white border-gray-300 shadow-lg'
                : darkMode
                  ? 'bg-white/5 border-white/5 hover:border-white/20'
                  : 'bg-white border-transparent hover:border-gray-200'
                }`}
            >
              <div className="relative z-10 flex items-center gap-3">
                <service.icon className={`w-5 h-5 ${activeTab === service.id ? colorMap[service.color].text : (darkMode ? 'text-white/40' : 'text-gray-400')}`} />
                <span className={`font-bold tracking-wide ${activeTab === service.id ? (darkMode ? 'text-white' : 'text-gray-900') : (darkMode ? 'text-white/40' : 'text-gray-400')}`}>{service.title}</span>
              </div>
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-24">

          {/* Left: Interactive Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className={`rounded-3xl p-6 md:p-8 border backdrop-blur-xl ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-xl'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl ${colorMap[currentService.color].softBg}`}>
                  <currentService.icon className={`w-8 h-8 ${colorMap[currentService.color].text}`} />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentService.title}</h3>
                  <p className={`text-sm ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Module Details</p>
                </div>
              </div>
              <p className={`mb-8 leading-relaxed ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>{currentService.description}</p>

              <div className="space-y-4 mb-8">
                <h4 className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-white/30' : 'text-gray-400'}`}>Core Capabilities</h4>
                <div className="grid grid-cols-1 gap-3">
                  {currentService.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-4 h-4 ${colorMap[currentService.color].text}`} />
                      <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-700'}`}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {currentService.stats.map((stat, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${darkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 ${colorMap[currentService.color].text}`} />
                      <span className={`text-[10px] font-light uppercase ${darkMode ? 'text-white/30' : 'text-gray-400'}`}>{stat.label}</span>
                    </div>
                    <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Channels Grid - Reduced visual priority */}
            <div className="space-y-4">
              <h4 className={`text-sm font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Contact Channels</h4>
              {contactChannels.map((channel, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ x: 5 }}
                  className={`p-5 rounded-2xl border flex items-center gap-5 cursor-pointer transition-all opacity-60 hover:opacity-100 hover:shadow-lg ${darkMode
                    ? `${colorMap[channel.color].bgDark} ${colorMap[channel.color].borderLight}`
                    : 'bg-white border-gray-100 hover:shadow-md'
                    }`}
                >
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
                    <channel.icon className={`w-5 h-5 ${colorMap[channel.color].text}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>{channel.label}</div>
                    <div className={`font-mono text-sm ${darkMode ? 'text-white/90' : 'text-gray-700'}`}>{channel.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Cyber Form - Updated with validation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className={`relative rounded-3xl p-6 md:p-10 border overflow-hidden ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-100 shadow-2xl'}`}>
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl pointer-events-none rounded-full -mr-20 -mt-20`} />

              <div className="relative z-10">
                <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Initialize Contact</h3>
                <p className={`mb-8 ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                  Secure contact channel. Our team usually replies within 24 hours.
                </p>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  {/* Type Selector */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                      { value: 'company', label: 'Company', icon: BriefcaseIcon },
                      { value: 'candidate', label: 'Candidate', icon: UserCheck },
                      { value: 'partner', label: 'Partner', icon: Handshake }
                    ].map((type) => (
                      <button
                        type="button"
                        key={type.value}
                        onClick={() => formik.setFieldValue('userType', type.value)}
                        className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all ${formik.values.userType === type.value
                          ? darkMode
                            ? 'bg-white/10 border-white/30 text-white'
                            : 'bg-gray-900 text-white border-gray-900'
                          : darkMode
                            ? 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
                            : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100'
                          }`}
                      >
                        <type.icon className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase">{type.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                        Identity <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...formik.getFieldProps('name')}
                        placeholder="Full Name"
                        className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all ${darkMode
                          ? 'border-white/10 text-white placeholder-white/20 focus:border-cyan-400'
                          : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-600'
                          } ${formik.touched.name && formik.errors.name ? 'border-red-400' : ''}`}
                        aria-invalid={formik.touched.name && !!formik.errors.name}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-xs text-red-400 mt-1">{formik.errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                        Comm Link <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...formik.getFieldProps('email')}
                        placeholder="Email Address"
                        className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all ${darkMode
                          ? 'border-white/10 text-white placeholder-white/20 focus:border-violet-400'
                          : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-600'
                          } ${formik.touched.email && formik.errors.email ? 'border-red-400' : ''}`}
                        aria-invalid={formik.touched.email && !!formik.errors.email}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-xs text-red-400 mt-1">{formik.errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                        Role <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...formik.getFieldProps('role')}
                        placeholder="Current Position"
                        className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all ${darkMode
                          ? 'border-white/10 text-white placeholder-white/20 focus:border-fuchsia-400'
                          : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-fuchsia-600'
                          } ${formik.touched.role && formik.errors.role ? 'border-red-400' : ''}`}
                        aria-invalid={formik.touched.role && !!formik.errors.role}
                      />
                      {formik.touched.role && formik.errors.role && (
                        <p className="text-xs text-red-400 mt-1">{formik.errors.role}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                        Organization
                      </label>
                      <input
                        {...formik.getFieldProps('company')}
                        placeholder="Company Name"
                        className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all ${darkMode
                          ? 'border-white/10 text-white placeholder-white/20 focus:border-cyan-400'
                          : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-600'
                          }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                      Transmission <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      {...formik.getFieldProps('message')}
                      rows={4}
                      placeholder="Describe your requirements..."
                      className={`w-full bg-transparent border-2 rounded-xl py-3 px-4 outline-none transition-all resize-none ${darkMode
                        ? 'border-white/10 text-white placeholder-white/20 focus:border-white/30 focus:bg-white/5'
                        : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:bg-gray-50'
                        } ${formik.touched.message && formik.errors.message ? 'border-red-400' : ''}`}
                      aria-invalid={formik.touched.message && !!formik.errors.message}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <p className="text-xs text-red-400 mt-1">{formik.errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest text-white shadow-lg relative overflow-hidden group ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : submitted ? (
                        <CheckCircle2 />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {isSubmitting ? 'Transmitting...' : submitted ? 'Transmission Sent' : 'Execute Transmission'}
                    </span>
                    <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* INDIA NEXUS MAP - UPDATED TO COVER ALL OF INDIA */}
        <motion.div
          initial={{ opacity: 0.3, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-24 relative"
        >
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">India</span> Nexus
            </h3>
            <p className={`${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Strategic operational centers across India's complete tech landscape</p>
          </div>

          <div className={`relative h-[500px] w-full rounded-3xl border-2 overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900/80 to-black border-white/10' : 'bg-gradient-to-br from-blue-50/50 to-white border-gray-200'}`}>

            {/* Simplified India Map Outline */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full opacity-20"
                fill="none"
                stroke={darkMode ? '#ffffff40' : '#00000020'}
                strokeWidth="1"
              >
                {/* India shape */}
                <path d="M200,150 Q250,100 300,120 Q350,140 380,180 Q400,220 420,250 Q450,300 480,320 
                Q500,350 520,380 Q550,400 580,420 Q600,450 620,480 Q640,500 660,480 
                Q650,450 630,420 Q600,400 570,380 Q540,350 520,320 Q500,280 480,250 
                Q450,220 420,200 Q400,180 380,160 Q350,140 320,130 Q280,120 250,130 
                Q220,140 200,150 Z"
                />
              </svg>
            </div>

            {/* Connection Lines Animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              
              {/* Connect all cities to Surat as main hub */}
              {[
                { x1: "28%", y1: "60%", x2: "45%", y2: "75%" }, // Surat to Bangalore
                { x1: "28%", y1: "60%", x2: "40%", y2: "50%" }, // Surat to Mumbai
                { x1: "28%", y1: "60%", x2: "38%", y2: "40%" }, // Surat to Delhi
                { x1: "28%", y1: "60%", x2: "55%", y2: "65%" }, // Surat to Hyderabad
                { x1: "28%", y1: "60%", x2: "60%", y2: "40%" }, // Surat to Kolkata
                { x1: "28%", y1: "60%", x2: "70%", y2: "50%" }, // Surat to Chennai
                { x1: "28%", y1: "60%", x2: "30%", y2: "20%" }, // Surat to Chandigarh
                { x1: "28%", y1: "60%", x2: "65%", y2: "70%" }, // Surat to Bengaluru
                { x1: "28%", y1: "60%", x2: "50%", y2: "80%" }, // Surat to Coimbatore
                { x1: "28%", y1: "60%", x2: "15%", y2: "30%" }, // Surat to Jaipur
                { x1: "28%", y1: "60%", x2: "20%", y2: "50%" }, // Surat to Ahmedabad
                { x1: "28%", y1: "60%", x2: "55%", y2: "30%" }, // Surat to Lucknow
                { x1: "28%", y1: "60%", x2: "45%", y2: "25%" }, // Surat to Gurgaon
                { x1: "28%", y1: "60%", x2: "72%", y2: "20%" }, // Surat to Guwahati
                { x1: "28%", y1: "60%", x2: "75%", y2: "60%" }, // Surat to Kochi
                { x1: "28%", y1: "60%", x2: "60%", y2: "85%" }, // Surat to Visakhapatnam
                { x1: "28%", y1: "60%", x2: "25%", y2: "80%" }, // Surat to Goa
              ].map((line, i) => (
                <motion.line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.5"
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.15 }}
                  transition={{ duration: 2, delay: i * 0.05 }}
                />
              ))}
            </svg>

            {/* Animated Background Grid */}
            <div className={`absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,${darkMode ? '#ffffff08' : '#00000008'}_100%)] bg-[length:40px_40px]`} />
            <div className={`absolute inset-0 bg-[linear-gradient(0deg,transparent_95%,${darkMode ? '#ffffff08' : '#00000008'}_100%)] bg-[length:40px_40px]`} />

            {/* All India Cities */}
            {[
              // Metropolitan Cities (Large Nodes)
              {
                city: "Delhi NCR",
                color: "purple",
                position: { top: "40%", left: "38%" },
                size: "lg",
                description: "National Capital - Government & Enterprise Hub",
                icon: "🏛️",
                stats: { talent: "15.2K", growth: "28%", projects: "5.4K" }
              },
              {
                city: "Mumbai",
                color: "cyan",
                position: { top: "50%", left: "40%" },
                size: "lg",
                description: "Financial Capital - Global Business Hub",
                icon: "🏦",
                stats: { talent: "18.4K", growth: "32%", projects: "6.8K" }
              },
              {
                city: "Bangalore",
                color: "emerald",
                position: { top: "75%", left: "45%" },
                size: "lg",
                description: "Silicon Valley - R&D & Innovation Center",
                icon: "💻",
                stats: { talent: "22.7K", growth: "38%", projects: "8.5K" }
              },
              {
                city: "Hyderabad",
                color: "blue",
                position: { top: "65%", left: "55%" },
                size: "lg",
                description: "Cyberabad - AI & Cybersecurity Operations",
                icon: "🤖",
                stats: { talent: "12.3K", growth: "35%", projects: "4.6K" }
              },
              {
                city: "Chennai",
                color: "indigo",
                position: { top: "80%", left: "70%" },
                size: "lg",
                description: "Automotive & Manufacturing Hub",
                icon: "🚗",
                stats: { talent: "10.8K", growth: "25%", projects: "3.9K" }
              },
              {
                city: "Kolkata",
                color: "pink",
                position: { top: "40%", left: "60%" },
                size: "lg",
                description: "Eastern Hub - Cultural & Industrial Center",
                icon: "🎭",
                stats: { talent: "9.3K", growth: "22%", projects: "3.2K" }
              },

              // Main Hub - Surat (Special)
              {
                city: "Surat",
                color: "emerald",
                position: { top: "60%", left: "28%" },
                size: "xl",
                description: "Primary Operations Hub - Diamond & Tech Center",
                icon: "💎",
                stats: { talent: "8.5K", growth: "42%", projects: "3.2K" }
              },

              // Other Major Cities (Medium Nodes)
              {
                city: "Ahmedabad",
                color: "orange",
                position: { top: "50%", left: "20%" },
                size: "md",
                description: "Industrial & Startup Hub",
                icon: "🏭",
                stats: { talent: "7.2K", growth: "30%", projects: "2.8K" }
              },
              {
                city: "Pune",
                color: "teal",
                position: { top: "55%", left: "35%" },
                size: "md",
                description: "Education & IT Services",
                icon: "🎓",
                stats: { talent: "9.1K", growth: "28%", projects: "3.5K" }
              },
              {
                city: "Jaipur",
                color: "amber",
                position: { top: "30%", left: "15%" },
                size: "md",
                description: "Heritage Tech & Tourism",
                icon: "🏰",
                stats: { talent: "5.4K", growth: "26%", projects: "2.1K" }
              },
              {
                city: "Lucknow",
                color: "rose",
                position: { top: "30%", left: "55%" },
                size: "md",
                description: "Government & Emerging Tech",
                icon: "⚖️",
                stats: { talent: "4.8K", growth: "24%", projects: "1.9K" }
              },
              {
                city: "Chandigarh",
                color: "lime",
                position: { top: "20%", left: "30%" },
                size: "md",
                description: "Architecture & Planning Hub",
                icon: "📐",
                stats: { talent: "3.9K", growth: "27%", projects: "1.6K" }
              },
              {
                city: "Goa",
                color: "sky",
                position: { top: "80%", left: "25%" },
                size: "md",
                description: "Digital Nomad & Creative Hub",
                icon: "🏖️",
                stats: { talent: "2.7K", growth: "35%", projects: "1.3K" }
              },
              {
                city: "Coimbatore",
                color: "violet",
                position: { top: "85%", left: "50%" },
                size: "md",
                description: "Textile & Engineering Hub",
                icon: "👕",
                stats: { talent: "4.2K", growth: "23%", projects: "1.7K" }
              },
              {
                city: "Kochi",
                color: "cyan",
                position: { top: "60%", left: "75%" },
                size: "md",
                description: "Port City - Logistics & Tech",
                icon: "🚢",
                stats: { talent: "3.5K", growth: "29%", projects: "1.4K" }
              },
              {
                city: "Visakhapatnam",
                color: "blue",
                position: { top: "65%", left: "85%" },
                size: "md",
                description: "Port & Industrial Hub",
                icon: "⚓",
                stats: { talent: "3.1K", growth: "21%", projects: "1.2K" }
              },
              {
                city: "Guwahati",
                color: "green",
                position: { top: "20%", left: "72%" },
                size: "md",
                description: "Gateway to Northeast",
                icon: "🌄",
                stats: { talent: "2.4K", growth: "31%", projects: "1.1K" }
              },
              {
                city: "Gurgaon",
                color: "indigo",
                position: { top: "38%", left: "45%" },
                size: "md",
                description: "Corporate & Startup Hub",
                icon: "🏢",
                stats: { talent: "11.2K", growth: "33%", projects: "4.3K" }
              },
              {
                city: "Noida",
                color: "purple",
                position: { top: "42%", left: "42%" },
                size: "md",
                description: "IT & Business Process Hub",
                icon: "💼",
                stats: { talent: "9.8K", growth: "29%", projects: "3.7K" }
              },
            ].map((city, i) => (
              <motion.div
                key={city.city}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.2, zIndex: 50 }}
                className={`absolute group cursor-pointer ${city.size === 'xl' ? 'z-50' : city.size === 'lg' ? 'z-40' : 'z-30'}`}
                style={city.position}
              >
                {/* Pulsing Rings */}
                <motion.div
                  animate={{
                    scale: [1, city.size === 'xl' ? 1.8 : city.size === 'lg' ? 1.5 : 1.3, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{
                    duration: city.size === 'xl' ? 2 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute rounded-full border ${darkMode ? colorMap[city.color].borderLight : colorMap[city.color].border}`}
                  style={{
                    width: city.size === 'xl' ? '80px' : city.size === 'lg' ? '60px' : '48px',
                    height: city.size === 'xl' ? '80px' : city.size === 'lg' ? '60px' : '48px',
                    top: city.size === 'xl' ? '-40px' : city.size === 'lg' ? '-30px' : '-24px',
                    left: city.size === 'xl' ? '-40px' : city.size === 'lg' ? '-30px' : '-24px',
                  }}
                />

                {/* Main Node */}
                <div className="relative flex flex-col items-center">
                  {/* Glowing Center */}
                  <div className={`rounded-full relative z-20 shadow-lg ${
                    city.size === 'xl' ? 'w-6 h-6' : 
                    city.size === 'lg' ? 'w-5 h-5' : 
                    'w-4 h-4'
                  } ${colorMap[city.color].bg}`}>
                    {city.size === 'xl' && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-white/30"
                      />
                    )}
                  </div>

                  {/* City Label */}
                  <div className={`mt-1 px-2 py-0.5 rounded-full backdrop-blur-sm border ${darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-gray-200'}`}>
                    <span className={`text-xs font-semibold tracking-tight flex items-center gap-0.5 ${city.city === "Surat" ? 'text-emerald-400 font-bold' : colorMap[city.color].text}`}>
                      {city.icon} <span className="text-[10px]">{city.city}</span>
                    </span>
                  </div>

                  {/* Hover Card */}
                  <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-56 p-3 rounded-xl backdrop-blur-lg border opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 ${darkMode ? 'bg-black/90 border-white/20' : 'bg-white/95 border-gray-200'}`}>
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`p-1.5 rounded-lg ${colorMap[city.color].softBg}`}>
                        <span className="text-sm">{city.icon}</span>
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {city.city} {city.city === "Surat" && "⭐"}
                        </h4>
                        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>{city.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1 mt-2">
                      <div className={`p-1.5 rounded-lg text-center ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <div className={`text-xs font-bold ${colorMap[city.color].text}`}>{city.stats.talent}</div>
                        <div className={`text-[9px] uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Talent</div>
                      </div>
                      <div className={`p-1.5 rounded-lg text-center ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <div className={`text-xs font-bold ${colorMap[city.color].text}`}>{city.stats.growth}</div>
                        <div className={`text-[9px] uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Growth</div>
                      </div>
                      <div className={`p-1.5 rounded-lg text-center ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <div className={`text-xs font-bold ${colorMap[city.color].text}`}>{city.stats.projects}</div>
                        <div className={`text-[9px] uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Projects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Data Flow Animation */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-[1px] h-16 ${darkMode ? 'bg-gradient-to-b from-emerald-500/20 via-cyan-500/10 to-transparent' : 'bg-gradient-to-b from-emerald-600/20 via-cyan-600/10 to-transparent'}`}
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: "-10%",
                    opacity: 0
                  }}
                  animate={{
                    y: "110%",
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear"
                  }}
                />
              ))}
            </div>

            {/* Network Stats */}
            <div className={`absolute top-4 left-4 p-4 rounded-xl backdrop-blur-sm border ${darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-gray-200'}`}>
              <div className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>Pan-India Network</span>
              </div>
              <div className="text-2xl font-black text-emerald-400">158.2K+</div>
              <div className="text-[10px] uppercase tracking-wider mt-1">Active Talents</div>
              <div className="text-[10px] text-emerald-400/70 mt-1">20+ Cities Connected</div>
            </div>

            {/* Surat Special Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 1 }}
              className={`absolute bottom-4 right-4 p-4 rounded-xl backdrop-blur-lg border ${darkMode ? 'bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 border-emerald-400/40' : 'bg-gradient-to-br from-emerald-100 to-cyan-100 border-emerald-400/60'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${darkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'}`}>
                  <Globe className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-emerald-400">National Hub</div>
                  <div className="text-xs text-white/60">Surat Headquarters</div>
                  <div className="text-xs text-emerald-300/70 mt-1">Connecting All India</div>
                </div>
              </div>
            </motion.div>

            {/* Legend */}
            <div className={`absolute bottom-4 left-4 p-3 rounded-xl backdrop-blur-sm border ${darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-gray-200'}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-500">Legend</div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="text-[10px]">Major Hub</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div>
                  <span className="text-[10px]">Metro City</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-[10px]">Key City</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SYSTEM ARCHITECTS (TEAM) - Reduced priority */}
        <motion.div
          initial={{ opacity: 0.3, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h3 className={`text-3xl md:text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Architects</span>
            </h3>
            <p className={`${darkMode ? 'text-white/40' : 'text-gray-500'}`}>The verified operatives behind the platform logic.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative p-1 rounded-2xl overflow-hidden ${darkMode ? 'bg-gradient-to-b from-white/10 to-transparent' : 'bg-white shadow-lg border border-gray-100'}`}
              >
                <div className={`absolute inset-0 ${colorMap[member.color].from} ${colorMap[member.color].to} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`relative p-6 rounded-xl h-full flex flex-col items-center text-center ${darkMode ? 'bg-black' : 'bg-white'}`}>
                  <div className={`w-20 h-20 mb-4 rounded-xl border-2 flex items-center justify-center text-2xl font-black ${darkMode
                    ? `${colorMap[member.color].border} ${colorMap[member.color].text} ${colorMap[member.color].softBg}`
                    : `border-${member.color}-200 text-${member.color}-600 bg-${member.color}-50`
                    }`}>
                    {member.name.charAt(0)}
                  </div>
                  <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</h4>
                  <span className={`text-xs font-bold uppercase tracking-widest mb-2 ${colorMap[member.color].text}`}>
                    {member.role}
                  </span>
                  <p className={`text-sm ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>{member.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NEURAL KNOWLEDGE BASE (FAQ) */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${darkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
              <HelpCircle className={`w-3 h-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`} />
              <span className={`text-[10px] font-bold uppercase ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Knowledge_Base</span>
            </div>
            <h3 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Neural FAQs</h3>
          </motion.div>
          <div className="space-y-4">
            {faqData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${darkMode ? 'border-white/10 bg-white/[0.02] hover:bg-white/5' : 'border-gray-200 bg-white hover:shadow-md'}`}
              >
                <div className="p-6 cursor-pointer">
                  <h4 className={`text-lg font-bold mb-2 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
                    {item.q}
                  </h4>
                  <p className={`pl-4.5 text-sm leading-relaxed ${darkMode ? 'text-white/50' : 'text-gray-600'}`}>{item.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactSection;