// src/features/ContactCom/ContactSection.jsx - CYBERPUNK EDITION
import React, { useState } from 'react';
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
  BarChart3, Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactSection = ({ darkMode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('companies');
  const [expandedSections, setExpandedSections] = useState({ companies: true, candidates: false, admins: false });

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
      id: 'companies', title: 'For Companies', icon: Building2,
      color: 'text-cyan-400', bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/20',
      description: 'Hire skilled talent through project-based evaluation.',
      features: ['Post project challenges', 'Evaluate real work', 'Verified portfolios', 'Admin ranking', 'Anti-plagiarism', 'Usage analytics'],
      stats: [{ label: 'Hiring Success', value: '94%', icon: TrendingUp }, { label: 'Time Saved', value: '40%', icon: Clock }]
    },
    {
      id: 'candidates', title: 'For Candidates', icon: Users,
      color: 'text-violet-400', bgColor: 'bg-violet-500/10', borderColor: 'border-violet-500/20',
      description: 'Showcase skills via verified submissions.',
      features: ['Submit GitHub repos', 'Coding challenges', 'Skill portfolio', 'Performance rank', 'Get feedback', 'Direct hiring'],
      stats: [{ label: 'Placement Rate', value: '78%', icon: Target }, { label: 'Skill Verify', value: '100%', icon: ShieldCheck }]
    },
    {
      id: 'admins', title: 'Platform Admins', icon: Shield,
      color: 'text-fuchsia-400', bgColor: 'bg-fuchsia-500/10', borderColor: 'border-fuchsia-500/20',
      description: 'Manage the ecosystem with full control.',
      features: ['Approve companies', 'Validate submissions', 'Run competitions', 'Grade projects', 'Manage interviews', 'Analytics'],
      stats: [{ label: 'Accuracy', value: '99%', icon: CheckCircle }, { label: 'Uptime', value: '99.9%', icon: Server }]
    }
  ];

  const contactChannels = [
    { icon: Mail, label: 'Support Neural-Link', value: 'support@proveit.io', description: 'Technical assistance channel', color: 'text-cyan-400', bg: 'bg-cyan-950/30', border: 'border-cyan-500/20' },
    { icon: Phone, label: 'Enterprise Uplink', value: '+1 (555) 123-4567', description: 'Direct partnership line', color: 'text-violet-400', bg: 'bg-violet-950/30', border: 'border-violet-500/20' },
    { icon: MessageSquare, label: 'Live Signal', value: 'Chat Active', description: 'Real-time operator', color: 'text-fuchsia-400', bg: 'bg-fuchsia-950/30', border: 'border-fuchsia-500/20' }
  ];

  /* --- NEW DATA SECTIONS --- */
  const teamMembers = [
    { name: 'Alex Rivera', role: 'System Architect', specialty: 'Neural Networks', color: 'cyan' },
    { name: 'Maya Sharma', role: 'Ops Commander', specialty: 'Talent Logistics', color: 'violet' },
    { name: 'David Chen', role: 'Code Sentinel', specialty: 'Security Protocols', color: 'fuchsia' },
    { name: 'Sarah Johnson', role: 'Grid Analyst', specialty: 'Data Visualization', color: 'emerald' }
  ];

  const faqData = [
    { q: "How does the evaluation protocol work?", a: "Candidates engage in project-based challenges. Source code is analyzed by our admin nodes for quality, efficiency, and security." },
    { q: "Is the hiring latency guaranteed?", a: "Yes. Our direct-link neural network reduces time-to-hire by ~40% compared to traditional asynchronous recruiting methods." },
    { q: "What security measures are active?", a: "All submissions undergo rigorous plagiarism scans and biometric identity verification (optional) to ensure 100% authenticity." }
  ];

  /* --- Building2 Icon Component Wrapper --- */
  function Building2(props) { return <Briefcase {...props} />; }

  return (
    <div className={`relative min-h-screen font-sans transition-colors duration-500 ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`}>

      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute inset-0 opacity-[0.03] ${darkMode ? 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)]'}`} style={{ backgroundSize: '40px 40px' }} />
        <div className={`absolute inset-0 bg-gradient-to-b ${darkMode ? 'from-transparent via-black/0 to-black' : 'from-transparent via-white/0 to-gray-50'}`} />

        {/* Aurora Gradients */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full blur-[120px] mix-blend-screen opacity-20 pointer-events-none ${darkMode ? 'bg-cyan-900/40' : 'bg-cyan-200/40'}`}
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.2, 1, 1.2], x: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
          className={`absolute top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[100px] mix-blend-screen opacity-20 pointer-events-none ${darkMode ? 'bg-violet-900/40' : 'bg-violet-200/40'}`}
        />
        <motion.div
          animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.3, 1], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
          className={`absolute bottom-[10%] left-[20%] w-[700px] h-[700px] rounded-full blur-[110px] mix-blend-screen opacity-20 pointer-events-none ${darkMode ? 'bg-fuchsia-900/30' : 'bg-fuchsia-200/30'}`}
        />

        {/* Digital Fog Overlay */}
        <div className={`absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none ${darkMode ? 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' : ''}`} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24 max-w-7xl">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 backdrop-blur-md ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
            <Zap className={`w-3.5 h-3.5 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>System_Inquiry_Mode</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>Evaluate. </span>
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-cyan-400 via-violet-400 to-fuchsia-400' : 'from-cyan-600 via-violet-600 to-fuchsia-600'}`}>Verify. Hire.</span>
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
            Initiate protocol based on your role. Access the neural network of verified talent and project-based evaluation.
          </p>
        </motion.div>

        {/* Holographic Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-4 mb-16">
          {platformServices.map((service) => (
            <button
              key={service.id}
              onClick={() => { setActiveTab(service.id); setExpandedSections(p => ({ ...p, [service.id]: true })); }}
              className={`relative group px-8 py-4 rounded-xl border transition-all duration-300 overflow-hidden ${activeTab === service.id ? (darkMode ? `${service.bgColor} ${service.borderColor}` : 'bg-white border-gray-300 shadow-lg') : (darkMode ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-white border-transparent hover:border-gray-200')}`}
            >
              <div className="relative z-10 flex items-center gap-3">
                <service.icon className={`w-5 h-5 ${activeTab === service.id ? service.color : (darkMode ? 'text-white/40' : 'text-gray-400')}`} />
                <span className={`font-bold tracking-wide ${activeTab === service.id ? (darkMode ? 'text-white' : 'text-gray-900') : (darkMode ? 'text-white/40' : 'text-gray-400')}`}>{service.title}</span>
              </div>
              {activeTab === service.id && <motion.div layoutId="activeGlow" className={`absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-${service.color.split('-')[1]}-500/50 to-transparent`} />}
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-32">

          {/* Left: Interactive Details */}
          <motion.div className="lg:col-span-5 space-y-6">
            {platformServices.map((service) => (
              activeTab === service.id && (
                <motion.div key={service.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className={`rounded-3xl p-8 border backdrop-blur-xl ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-xl'}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-2xl ${service.bgColor}`}>
                      <service.icon className={`w-8 h-8 ${service.color}`} />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                      <p className={`text-sm ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Module Details</p>
                    </div>
                  </div>
                  <p className={`mb-8 leading-relaxed ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>{service.description}</p>

                  <div className="space-y-4 mb-8">
                    <h4 className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-white/30' : 'text-gray-400'}`}>Core Capabilities</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className={`w-4 h-4 ${service.color}`} />
                          <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-700'}`}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {service.stats.map((stat, i) => (
                      <div key={i} className={`p-4 rounded-xl border ${darkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <stat.icon className={`w-4 h-4 ${service.color}`} />
                          <span className={`text-[10px] font-bold uppercase ${darkMode ? 'text-white/30' : 'text-gray-400'}`}>{stat.label}</span>
                        </div>
                        <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}

            {/* Contact Channels Grid */}
            <div className="grid gap-4">
              {contactChannels.map((channel, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} whileHover={{ x: 5 }} className={`p-5 rounded-2xl border flex items-center gap-5 cursor-pointer transition-all ${darkMode ? `${channel.bg} ${channel.border}` : 'bg-white border-gray-100 hover:shadow-md'}`}>
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
                    <channel.icon className={`w-5 h-5 ${channel.color}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>{channel.label}</div>
                    <div className={`font-mono text-sm ${darkMode ? 'text-white/90' : 'text-gray-700'}`}>{channel.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Cyber Form */}
          <motion.div className="lg:col-span-7">
            <div className={`relative rounded-3xl p-8 md:p-12 border overflow-hidden ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-100 shadow-2xl'}`}>
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl pointer-events-none rounded-full -mr-20 -mt-20`} />

              <div className="relative z-10">
                <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Initialize Contact</h3>
                <p className={`mb-10 ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Secure transmission channel. Typically responds in &lt;24ms.</p>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  {/* Type Selector */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                      { value: 'company', label: 'Company', icon: Briefcase },
                      { value: 'candidate', label: 'Candidate', icon: UserCheck },
                      { value: 'partner', label: 'Partner', icon: Handshake }
                    ].map((type) => (
                      <button type="button" key={type.value} onClick={() => formik.setFieldValue('userType', type.value)} className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all ${formik.values.userType === type.value ? (darkMode ? 'bg-white/10 border-white/30 text-white' : 'bg-gray-900 text-white border-gray-900') : (darkMode ? 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10' : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100')}`}>
                        <type.icon className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase">{type.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Identity</label>
                      <input {...formik.getFieldProps('name')} placeholder="Full Name" className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all ${darkMode ? 'border-white/10 text-white placeholder-white/20 focus:border-cyan-400' : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-600'}`} />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Comm Link</label>
                      <input {...formik.getFieldProps('email')} placeholder="Email Address" className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all ${darkMode ? 'border-white/10 text-white placeholder-white/20 focus:border-violet-400' : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-600'}`} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Role</label>
                      <input {...formik.getFieldProps('role')} placeholder="Current Position" className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all ${darkMode ? 'border-white/10 text-white placeholder-white/20 focus:border-fuchsia-400' : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-fuchsia-600'}`} />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Organization</label>
                      <input {...formik.getFieldProps('company')} placeholder="Company Name" className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all ${darkMode ? 'border-white/10 text-white placeholder-white/20 focus:border-cyan-400' : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-600'}`} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Transmission</label>
                    <textarea {...formik.getFieldProps('message')} rows={4} placeholder="Describe your requirements..." className={`w-full bg-transparent border-2 rounded-xl py-3 px-4 outline-none transition-all resize-none ${darkMode ? 'border-white/10 text-white placeholder-white/20 focus:border-white/30 focus:bg-white/5' : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:bg-gray-50'}`} />
                  </div>

                  <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest text-white shadow-lg relative overflow-hidden group ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : (submitted ? <CheckCircle2 /> : <Send className="w-4 h-4" />)}
                      {isSubmitting ? 'Transmitting...' : (submitted ? 'Transmission Sent' : 'Execute Transmission')}
                    </span>
                    <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </motion.button>

                </form>
              </div>
            </div>
          </motion.div>

        </div>

        {/* --- GLOBAL NEXUS (MAP) --- */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-32 relative">
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Global Nexus</h3>
            <p className={`${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Operational nodes active in major tech sectors.</p>
          </div>
          <div className={`relative h-[400px] w-full rounded-3xl border overflow-hidden ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-gray-100 border-gray-200'}`}>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-20">
              {/* Simplified World Map Dots Representation (CSS Art) */}
              <div className="w-[800px] gap-2 grid grid-cols-12 opacity-50">
                {[...Array(48)].map((_, i) => (
                  <div key={i} className={`h-2 w-2 rounded-full mx-auto ${Math.random() > 0.7 ? (darkMode ? 'bg-cyan-500' : 'bg-cyan-600') : (darkMode ? 'bg-white/20' : 'bg-gray-300')}`} />
                ))}
              </div>
            </div>
            {/* Pulsing Nodes */}
            {[
              { top: '30%', left: '20%', label: 'SF', color: 'cyan' },
              { top: '35%', left: '28%', label: 'NY', color: 'violet' },
              { top: '25%', left: '48%', label: 'LDN', color: 'fuchsia' },
              { top: '38%', left: '85%', label: 'TKY', color: 'emerald' },
            ].map((node, i) => (
              <div key={i} className="absolute" style={{ top: node.top, left: node.left }}>
                <div className={`relative flex items-center justify-center`}>
                  <div className={`w-3 h-3 rounded-full bg-${node.color}-500 animate-ping absolute`} />
                  <div className={`w-2 h-2 rounded-full bg-${node.color}-400 relative z-10`} />
                  <div className={`absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest ${darkMode ? 'text-white' : 'text-gray-900'}`}>{node.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- SYSTEM ARCHITECTS (TEAM) --- */}
        < div className="mb-32" >
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h3 className={`text-3xl md:text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>System <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Architects</span></h3>
            <p className={`${darkMode ? 'text-white/40' : 'text-gray-500'}`}>The verified operatives behind the platform logic.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`group relative p-1 rounded-2xl overflow-hidden ${darkMode ? 'bg-gradient-to-b from-white/10 to-transparent' : 'bg-white shadow-lg border border-gray-100'}`}>
                <div className={`absolute inset-0 bg-gradient-to-b from-${member.color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`relative p-6 rounded-xl h-full flex flex-col items-center text-center ${darkMode ? 'bg-black' : 'bg-white'}`}>
                  <div className={`w-20 h-20 mb-4 rounded-xl border-2 flex items-center justify-center text-2xl font-black ${darkMode ? `border-${member.color}-500/30 text-${member.color}-400 bg-${member.color}-500/10` : `border-${member.color}-200 text-${member.color}-600 bg-${member.color}-50`}`}>
                    {member.name.charAt(0)}
                  </div>
                  <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</h4>
                  <span className={`text-xs font-bold uppercase tracking-widest mb-2 ${darkMode ? `text-${member.color}-400` : `text-${member.color}-600`}`}>{member.role}</span>
                  <p className={`text-sm ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>{member.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- NEURAL KNOWLEDGE BASE (FAQ) --- */}
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${darkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
              <HelpCircle className={`w-3 h-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`} />
              <span className={`text-[10px] font-bold uppercase ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Knowledge_Base</span>
            </div>
            <h3 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Neural FAQs</h3>
          </motion.div>
          <div className="space-y-4">
            {faqData.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${darkMode ? 'border-white/10 bg-white/[0.02] hover:bg-white/5' : 'border-gray-200 bg-white hover:shadow-md'}`}>
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