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
  Trophy, Code, Terminal, Wifi, Cpu as Chip,
  GitMerge, Building, Globe, MailCheck, Compass,
  Code2, Laptop, Battery, HardDrive, GitBranch,
  CheckCircle, ChevronDown, ChevronUp, Sun, Moon,
  FileCode, GitPullRequest, UserCheck, Award as Medal,
  FileText, Code as CodeIcon, GitCommit, TrendingUp,
  BookOpen, Shield as SecurityShield, Search, Filter,
  Star as StarIcon, Users as UsersIcon, Building2,
  FileCheck, ClipboardCheck, Target as TargetIcon,
  BarChart3, LineChart, PieChart, GitFork, GitCompare,
  Hash, Percent, TrendingDown, TrendingUp as TrendingUpIcon,
  AlertCircle, XCircle, AlertTriangle, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactSection = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('companies');
  const [expandedSections, setExpandedSections] = useState({
    companies: true,
    candidates: false,
    admins: false
  });

  const formik = useFormik({
    initialValues: { 
      name: '', 
      email: '', 
      role: '', 
      company: '', 
      message: '',
      userType: 'company'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      role: Yup.string().required('Role is required'),
      company: Yup.string(),
      message: Yup.string().min(30, 'Please provide more details about your needs').required('Message is required'),
      userType: Yup.string().required('User type is required')
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

  // PROVEIT.IO SPECIFIC CONTENT
  const platformServices = [
    {
      id: 'companies',
      title: 'For Companies',
      icon: Building2,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      description: 'Hire skilled talent through project-based evaluation',
      features: [
        'Post project-based job challenges',
        'Evaluate candidates through real work',
        'Access verified skill portfolios',
        'Admin-controlled candidate ranking',
        'Plagiarism detection',
        'Subscription-based hiring packages'
      ],
      stats: [
        { label: 'Hiring Success Rate', value: '94%', icon: TrendingUpIcon, color: 'text-emerald-400' },
        { label: 'Time to Hire', value: '-40%', icon: Clock, color: 'text-blue-400' },
        { label: 'Quality Retention', value: '85%', icon: UserCheck, color: 'text-amber-400' }
      ]
    },
    {
      id: 'candidates',
      title: 'For Candidates',
      icon: UsersIcon,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      description: 'Showcase skills through verified project submissions',
      features: [
        'Submit GitHub repositories',
        'Upload source files',
        'Participate in coding challenges',
        'Build verified skill portfolio',
        'Get ranked by performance',
        'Receive detailed feedback'
      ],
      stats: [
        { label: 'Placement Rate', value: '78%', icon: TargetIcon, color: 'text-emerald-400' },
        { label: 'Avg. Response Time', value: '48h', icon: Clock, color: 'text-blue-400' },
        { label: 'Skill Verification', value: '100%', icon: ShieldCheck, color: 'text-amber-400' }
      ]
    },
    {
      id: 'admins',
      title: 'For Platform Admins',
      icon: ShieldCheck,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      description: 'Manage the recruitment ecosystem with full control',
      features: [
        'Approve company registrations',
        'Validate candidate submissions',
        'Conduct project competitions',
        'Evaluate technical work',
        'Coordinate interviews',
        'Generate analytics reports'
      ],
      stats: [
        { label: 'Platform Accuracy', value: '99%', icon: CheckCircle, color: 'text-emerald-400' },
        { label: 'Admin Response Time', value: '24h', icon: Clock, color: 'text-blue-400' },
        { label: 'System Uptime', value: '99.9%', icon: Server, color: 'text-amber-400' }
      ]
    }
  ];

  const teamMembers = [
    { 
      name: 'Alex Rivera', 
      role: 'Platform Architect',
      avatar: 'AR', 
      color: 'bg-indigo-500',
      textColor: 'text-indigo-400',
      expertise: ['System Design', 'AI Evaluation', 'Scalability'],
      projects: 42,
      rating: 4.9,
      specialty: 'Recruitment Systems'
    },
    { 
      name: 'Maya Sharma', 
      role: 'Talent Solutions Lead',
      avatar: 'MS', 
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      expertise: ['Skill Assessment', 'Candidate Matching', 'HR Tech'],
      projects: 38,
      rating: 4.8,
      specialty: 'Talent Acquisition'
    },
    { 
      name: 'David Chen', 
      role: 'Technical Evaluator',
      avatar: 'DC', 
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      expertise: ['Code Review', 'Project Grading', 'Plagiarism Detection'],
      projects: 56,
      rating: 5.0,
      specialty: 'Technical Assessment'
    },
    { 
      name: 'Sarah Johnson', 
      role: 'Platform Operations',
      avatar: 'SJ', 
      color: 'bg-purple-500',
      textColor: 'text-purple-400',
      expertise: ['Admin Management', 'Support Coordination', 'Process Optimization'],
      projects: 47,
      rating: 4.9,
      specialty: 'Platform Management'
    },
  ];

  const platformStats = [
    { value: '500+', label: 'Companies Registered', icon: Building2, color: 'text-indigo-400', bgColor: 'bg-indigo-500/10' },
    { value: '10K+', label: 'Verified Candidates', icon: UserCheck, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
    { value: '15K+', label: 'Projects Evaluated', icon: FileCode, color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
    { value: '94%', label: 'Hiring Success Rate', icon: TrendingUpIcon, color: 'text-purple-400', bgColor: 'bg-purple-500/10' }
  ];

  const faqSections = [
    {
      title: 'For Companies',
      icon: Building2,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      questions: [
        {
          q: 'How does project-based hiring work on ProveIt.io?',
          a: 'Companies post job roles with specific project challenges that candidates complete to demonstrate their skills.',
          details: 'Candidates submit their work (GitHub repos, source files) which are evaluated by our admin team. You receive ranked, verified candidates based on actual performance rather than resumes.'
        },
        {
          q: 'What types of projects can we post?',
          a: 'Any real-world project that tests required skills - from coding challenges to design tasks and problem-solving.',
          details: 'Our platform supports various project types including coding challenges, UI/UX designs, system architecture diagrams, bug fixes, feature implementations, and more.'
        }
      ]
    },
    {
      title: 'For Candidates',
      icon: UsersIcon,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      questions: [
        {
          q: 'How do I submit my work for evaluation?',
          a: 'Upload GitHub repositories, source files, or complete our platform-specific challenges.',
          details: 'We accept GitHub/GitLab links, ZIP files with source code, design files (Figma, Sketch), and direct submissions through our code editor. All submissions go through plagiarism checks.'
        },
        {
          q: 'How are projects evaluated and ranked?',
          a: 'Projects are evaluated by our admin team based on code quality, functionality, creativity, and best practices.',
          details: 'Evaluation criteria include code quality, architecture, documentation, testing, performance, security practices, and innovation. Scores determine candidate ranking.'
        }
      ]
    },
    {
      title: 'Platform & Security',
      icon: Shield,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      questions: [
        {
          q: 'How does plagiarism detection work?',
          a: 'We use advanced code similarity algorithms to ensure original work submission.',
          details: 'Our system analyzes code structure, logic patterns, and syntax to detect similarities across submissions. Companies receive originality scores for each candidate.'
        },
        {
          q: 'What analytics do you provide?',
          a: 'Detailed reports on candidate performance, hiring metrics, and platform usage statistics.',
          details: 'Companies get access to dashboards showing candidate success rates, time-to-hire metrics, skill distribution, and ROI analysis on hiring spend.'
        }
      ]
    }
  ];

  const contactChannels = [
    { 
      icon: Mail, 
      label: 'Support Email', 
      value: 'support@proveit.io',
      description: 'For platform support and technical issues',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20'
    },
    { 
      icon: Phone, 
      label: 'Sales & Partnerships', 
      value: '+1 (555) 123-4567',
      description: 'For enterprise inquiries and partnerships',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    { 
      icon: MessageSquare, 
      label: 'Technical Support', 
      value: 'Live Chat Available',
      description: 'Real-time technical assistance',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    },
    { 
      icon: MapPin, 
      label: 'Headquarters', 
      value: 'San Francisco, CA',
      description: 'Platform operations center',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  const platformFeatures = [
    {
      title: 'Project-Based Evaluation',
      icon: FileCode,
      description: 'Candidates prove skills through real project work',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10'
    },
    {
      title: 'Admin-Controlled Ranking',
      icon: TrendingUpIcon,
      description: 'Expert evaluation ensures merit-based candidate ranking',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'Plagiarism Detection',
      icon: ShieldCheck,
      description: 'Advanced algorithms ensure original work submissions',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    },
    {
      title: 'Skill Analytics',
      icon: BarChart3,
      description: 'Detailed performance metrics and insights',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    }
  ];

  // Theme variables based on dark mode
  const theme = {
    bg: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    text: darkMode ? 'text-gray-100' : 'text-gray-900',
    muted: darkMode ? 'text-gray-400' : 'text-gray-600',
    card: darkMode ? 'bg-gray-800/60' : 'bg-white/90',
    border: darkMode ? 'border-gray-700/50' : 'border-gray-200/80',
    hover: darkMode ? 'hover:bg-gray-800/80' : 'hover:bg-gray-100',
    accent: darkMode ? 'from-indigo-600 to-emerald-600' : 'from-indigo-500 to-emerald-500'
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${theme.bg} ${theme.text}`}>
      
      {/* Clean, minimal background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-96 ${
          darkMode 
            ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-transparent' 
            : 'bg-gradient-to-b from-gray-50 via-gray-50 to-transparent'
        }`} />
        
        {/* Very subtle grid pattern */}
        <div className={`absolute inset-0 opacity-5 ${
          darkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`} style={{
          backgroundImage: `linear-gradient(${darkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.05)'} 1px, transparent 1px),
                          linear-gradient(90deg, ${darkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.05)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full transition-all backdrop-blur-sm ${
            darkMode 
              ? 'bg-gray-800/80 hover:bg-gray-700/80 text-yellow-300 border border-gray-700' 
              : 'bg-white/90 hover:bg-gray-100 text-gray-900 shadow-lg border border-gray-200'
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 pt-8"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
            darkMode ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-100 border-indigo-200'
          } border mb-8`}>
            <Sparkles className={`w-4 h-4 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
            <span className={`text-sm font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
              SKILL-VERIFIED RECRUITMENT
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className={`${theme.text}`}>Prove Your Skills.</span>
            <span className={`block ${
              darkMode 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-400 to-amber-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-emerald-600 to-amber-600'
            }`}>
              Hire with Confidence.
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl ${theme.muted} max-w-3xl mx-auto leading-relaxed`}>
            ProveIt.io transforms recruitment through project-based evaluation. Companies hire based on verified skills, 
            candidates showcase real work, and admins ensure merit-based selection.
          </p>
        </motion.header>

        {/* Platform Overview Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {platformServices.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setActiveTab(service.id);
                  setExpandedSections(prev => ({ ...prev, [service.id]: true }));
                }}
                className={`px-6 py-3 rounded-xl transition-all border ${
                  activeTab === service.id
                    ? `${service.borderColor} ${service.bgColor}`
                    : `${theme.border} ${theme.hover}`
                } backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3">
                  <service.icon className={`w-5 h-5 ${service.color}`} />
                  <span className="font-medium">{service.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Expanded Service Details */}
          <div className={`rounded-2xl border ${theme.border} ${theme.card} p-8 backdrop-blur-sm`}>
            {platformServices.map((service) => (
              <AnimatePresence key={service.id}>
                {activeTab === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-8"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl ${service.bgColor} ${service.borderColor} border flex items-center justify-center`}>
                          <service.icon className={`w-7 h-7 ${service.color}`} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{service.title}</h2>
                          <p className={`${theme.muted}`}>{service.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSection(service.id)}
                        className={`p-2 rounded-lg ${theme.hover} transition-colors`}
                      >
                        {expandedSections[service.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>

                    <AnimatePresence>
                      {expandedSections[service.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="space-y-8"
                        >
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="font-bold text-lg mb-4">Key Features</h3>
                              <ul className="space-y-3">
                                {service.features.map((feature, index) => (
                                  <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3"
                                  >
                                    <CheckCircle className={`w-5 h-5 ${service.color}`} />
                                    <span className={theme.muted}>{feature}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h3 className="font-bold text-lg mb-4">Performance Metrics</h3>
                              <div className="space-y-4">
                                {service.stats.map((stat, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`p-4 rounded-xl ${service.bgColor} ${service.borderColor} border`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                        <span className={theme.muted}>{stat.label}</span>
                                      </div>
                                      <span className="text-xl font-bold">{stat.value}</span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className={`p-6 rounded-xl ${service.bgColor} ${service.borderColor} border`}>
                            <div className="flex items-center gap-3 mb-4">
                              <Info className={`w-5 h-5 ${service.color}`} />
                              <h4 className="font-bold">How it works for {service.title.toLowerCase()}</h4>
                            </div>
                            <p className={theme.muted}>
                              {service.id === 'companies' && 'Post project challenges, review verified candidate submissions, interview top-ranked candidates, and hire based on proven skills.'}
                              {service.id === 'candidates' && 'Complete project challenges, submit your work for evaluation, get ranked based on performance, and connect with hiring companies.'}
                              {service.id === 'admins' && 'Manage the entire recruitment ecosystem, validate submissions, conduct evaluations, and ensure platform integrity.'}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
        </motion.section>

        {/* Main Contact Form & Info Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          
          {/* Left Column: Platform Features & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Platform Features */}
            <div className={`rounded-2xl border ${theme.border} ${theme.card} p-6 backdrop-blur-sm`}>
              <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>Platform Features</h2>
              <div className="grid grid-cols-2 gap-4">
                {platformFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className={`p-4 rounded-xl ${feature.bgColor} ${theme.border} border text-center`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${feature.bgColor} mx-auto mb-3 flex items-center justify-center`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                    <p className={`text-xs ${theme.muted}`}>{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Channels */}
            <div className={`rounded-2xl border ${theme.border} ${theme.card} p-6 backdrop-blur-sm`}>
              <h3 className={`text-xl font-bold mb-6 ${theme.text}`}>Contact Channels</h3>
              <div className="space-y-4">
                {contactChannels.map((channel, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className={`p-4 rounded-xl ${channel.bgColor} ${channel.borderColor} border transition-all hover:scale-[1.02] cursor-pointer`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${channel.bgColor} ${channel.borderColor} border`}>
                        <channel.icon className={`w-5 h-5 ${channel.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${theme.muted}`}>{channel.label}</p>
                        <p className="font-bold text-lg mt-1">{channel.value}</p>
                        <p className={`text-xs ${theme.muted} mt-1`}>{channel.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Platform Stats */}
            <div className={`rounded-2xl border ${theme.border} ${theme.card} p-6 backdrop-blur-sm`}>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUpIcon className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <h3 className="font-bold">Platform Statistics</h3>
              </div>
              <div className="space-y-3">
                {platformStats.map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded ${stat.bgColor}`}>
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <span className={theme.muted}>{stat.label}</span>
                    </div>
                    <span className="font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center Column: Main Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            {/* Main Form Card */}
            <div className={`rounded-3xl border ${theme.border} ${theme.card} p-8 lg:p-12 backdrop-blur-sm mb-8`}>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className={`text-3xl font-bold mb-2 ${theme.text}`}>
                    Get Started with ProveIt.io
                  </h2>
                  <p className={theme.muted}>Transform your recruitment process with skill-verified hiring</p>
                </div>
                <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full ${
                  darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-100 border-emerald-200'
                } border backdrop-blur-sm`}>
                  <ShieldCheck className={`w-4 h-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    Secure Platform
                  </span>
                </div>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-8">
                {/* User Type Selection */}
                <div>
                  <label className={`text-sm font-medium ${theme.muted} mb-3 block`}>
                    I am a...
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: 'company', label: 'Company / HR', icon: Building2, color: 'indigo' },
                      { value: 'candidate', label: 'Candidate', icon: UsersIcon, color: 'emerald' },
                      { value: 'partner', label: 'Platform Partner', icon: Handshake, color: 'amber' }
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => formik.setFieldValue('userType', type.value)}
                        className={`p-4 rounded-xl border transition-all text-left ${
                          formik.values.userType === type.value
                            ? `${darkMode ? `bg-${type.color}-500/20 border-${type.color}-500/30` : `bg-${type.color}-100 border-${type.color}-300`}`
                            : `${theme.border} ${theme.hover}`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${darkMode ? `bg-${type.color}-500/20` : `bg-${type.color}-100`}`}>
                            <type.icon className={`w-5 h-5 ${darkMode ? `text-${type.color}-400` : `text-${type.color}-600`}`} />
                          </div>
                          <span className="font-medium">{type.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { 
                      field: 'name', 
                      label: 'Full Name', 
                      placeholder: 'Alex Johnson',
                      color: 'indigo'
                    },
                    { 
                      field: 'email', 
                      label: 'Email Address', 
                      placeholder: 'alex@example.com',
                      color: 'emerald'
                    }
                  ].map((input) => (
                    <div key={input.field} className="space-y-3">
                      <label className={`text-sm font-medium ${theme.muted}`}>
                        {input.label}
                      </label>
                      <input
                        {...formik.getFieldProps(input.field)}
                        className={`w-full px-4 py-3.5 rounded-xl ${
                          darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
                        } border ${theme.text} placeholder-gray-500 focus:ring-4 focus:ring-${input.color}-500/30 focus:border-${input.color}-500 outline-none transition-all`}
                        placeholder={input.placeholder}
                      />
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { 
                      field: 'role', 
                      label: 'Your Role', 
                      placeholder: 'e.g., HR Manager, Developer',
                      color: 'amber'
                    },
                    { 
                      field: 'company', 
                      label: 'Company / Organization', 
                      placeholder: 'Optional',
                      color: 'purple'
                    }
                  ].map((input) => (
                    <div key={input.field} className="space-y-3">
                      <label className={`text-sm font-medium ${theme.muted}`}>
                        {input.label}
                      </label>
                      <input
                        {...formik.getFieldProps(input.field)}
                        className={`w-full px-4 py-3.5 rounded-xl ${
                          darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
                        } border ${theme.text} placeholder-gray-500 focus:ring-4 focus:ring-${input.color}-500/30 focus:border-${input.color}-500 outline-none transition-all`}
                        placeholder={input.placeholder}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <label className={`text-sm font-medium ${theme.muted} flex items-center gap-2`}>
                    <MessageSquare className={`w-4 h-4 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    Tell us about your needs
                  </label>
                  <textarea
                    {...formik.getFieldProps('message')}
                    rows={6}
                    className={`w-full px-4 py-3.5 rounded-xl ${
                      darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
                    } border ${theme.text} placeholder-gray-500 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all resize-none`}
                    placeholder="Describe how you'd like to use ProveIt.io, your specific requirements, or any questions you have..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-white ${
                    darkMode 
                      ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700' 
                      : 'bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700'
                  } transition-all relative overflow-hidden shadow-lg`}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing your request...
                      </motion.div>
                    ) : submitted ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Request Submitted Successfully!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        className="flex items-center justify-center gap-3"
                      >
                        <Send className="w-5 h-5" />
                        {formik.values.userType === 'company' ? 'Request Enterprise Demo' : 
                         formik.values.userType === 'candidate' ? 'Join as Candidate' : 
                         'Connect as Partner'}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.text}`}>
              Meet Our <span className={darkMode ? 'text-indigo-400' : 'text-indigo-600'}>Platform Team</span>
            </h2>
            <p className={`${theme.muted} max-w-2xl mx-auto`}>
              Experts dedicated to ensuring fair, skill-based recruitment through advanced evaluation systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border ${theme.border} ${theme.card} p-6 backdrop-blur-sm hover:border-gray-600 transition-colors`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl ${member.color} flex items-center justify-center text-white font-bold text-xl`}>
                      {member.avatar}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-amber-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <StarIcon size={10} className="text-white" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <StarIcon className="w-4 h-4 text-amber-400" />
                      <span className="font-bold">{member.rating}</span>
                    </div>
                    <div className={`text-xs ${theme.muted} mt-1`}>{member.projects} projects</div>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>{member.name}</h3>
                <p className={`${theme.muted} mb-4`}>{member.role}</p>
                
                <div className="mb-6">
                  <p className={`text-xs ${theme.muted} mb-2`}>Specialty:</p>
                  <p className={`font-medium ${member.textColor}`}>{member.specialty}</p>
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className={`text-xs ${theme.muted}`}>Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.slice(0, 2).map((skill, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} ${theme.muted}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className={`w-full py-2 px-3 rounded-lg ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                } text-sm font-medium transition-colors flex items-center justify-center gap-2`}>
                  <MessageCircle className="w-4 h-4" />
                  Contact Expert
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className={`rounded-3xl border ${theme.border} ${theme.card} p-8 backdrop-blur-sm`}>
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.text}`}>
                Frequently Asked <span className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>Questions</span>
              </h2>
              <p className={`${theme.muted} max-w-2xl mx-auto`}>
                Everything you need to know about ProveIt.io's skill-verified recruitment platform
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {faqSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${section.bgColor} ${
                      darkMode ? 'border-gray-700/50' : 'border-gray-200'
                    } border flex items-center justify-center`}>
                      <section.icon className={`w-6 h-6 ${section.color}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${theme.text}`}>{section.title}</h3>
                      <div className={`h-1 w-12 ${section.color.replace('text-', 'bg-')} rounded-full mt-2`} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {section.questions.map((item, itemIndex) => {
                      const isActive = activeFaq === `${sectionIndex}-${itemIndex}`;
                      return (
                        <div
                          key={itemIndex}
                          className={`rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                            isActive
                              ? `${section.bgColor} ${darkMode ? 'border-gray-600' : 'border-gray-300'}`
                              : `${theme.border} ${theme.hover}`
                          }`}
                        >
                          <button
                            onClick={() => setActiveFaq(isActive ? null : `${sectionIndex}-${itemIndex}`)}
                            className="w-full p-4 text-left"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className={`font-bold text-sm mb-2 ${theme.text}`}>{item.q}</h4>
                                <p className={`text-sm ${theme.muted}`}>{item.a}</p>
                              </div>
                              <ChevronRight className={`w-5 h-5 ${theme.muted} flex-shrink-0 transition-transform ${
                                isActive ? 'rotate-90' : ''
                              }`} />
                            </div>
                            
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className={`mt-4 pt-4 border-t ${theme.border}`}>
                                    <p className={`text-sm ${theme.muted}`}>{item.details}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ CTA */}
            <div className={`mt-12 pt-8 border-t ${theme.border}`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${
                    darkMode ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-100 border-indigo-200'
                  } border flex items-center justify-center`}>
                    <Headphones className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${theme.text}`}>Need specific guidance?</h4>
                    <p className={`text-sm ${theme.muted}`}>Our platform experts are here to help</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className={`px-6 py-3 rounded-xl ${
                    darkMode 
                      ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700' 
                      : 'bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700'
                  } text-white font-medium transition-all flex items-center gap-3`}>
                    <MessageCircle className="w-5 h-5" />
                    Platform Demo
                  </button>
                  <button className={`px-6 py-3 rounded-xl border ${
                    darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50'
                  } ${theme.muted} hover:text-white hover:bg-gray-800 transition-colors font-medium flex items-center gap-3`}>
                    <Calendar className="w-5 h-5" />
                    Schedule Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className={`rounded-3xl border ${theme.border} ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-900/90 to-gray-800/90' 
              : 'bg-gradient-to-br from-gray-50 to-white'
          } p-12 text-center backdrop-blur-sm`}>
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${
              darkMode ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-100 border-indigo-200'
            } border mb-8 backdrop-blur-sm`}>
              <Rocket className={`w-4 h-4 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <span className={`text-sm font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
                TRANSFORM YOUR RECRUITMENT
              </span>
            </div>
            
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme.text}`}>
              Ready to Hire Based on
              <span className={`block ${
                darkMode 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600'
              }`}>
                Proven Skills?
              </span>
            </h2>
            
            <p className={`text-xl ${theme.muted} mb-12 max-w-2xl mx-auto`}>
              Join 500+ companies using ProveIt.io to hire better talent through project-based evaluation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className={`px-10 py-5 ${
                darkMode 
                  ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700' 
                  : 'bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700'
              } text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-lg shadow-lg`}>
                <Calendar className="w-6 h-6" />
                Book Platform Demo
              </button>
              
              <button className={`px-10 py-5 border ${
                darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50'
              } ${theme.muted} hover:text-white hover:bg-gray-800 rounded-2xl font-bold transition-colors flex items-center justify-center gap-3 text-lg`}>
                <FileCode className="w-6 h-6" />
                View Sample Projects
              </button>
            </div>
            
            <div className={`mt-16 pt-8 border-t ${theme.border}`}>
              <p className={theme.muted}>
                Trusted by enterprise companies • SOC 2 Certified • 99.9% Platform Uptime • 24/7 Support
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

// Add missing icon component
const Handshake = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 17h2a2 2 0 1 0 0-4h-2a2 2 0 1 0 0 4Z" />
    <path d="M12 22V11" />
    <path d="M2 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2" />
    <path d="M20 8h2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h-2" />
    <path d="M18 12h.01" />
    <path d="M6 12h.01" />
  </svg>
);

export default ContactSection;