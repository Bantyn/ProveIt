import React, { useRef, useState, useMemo, useEffect } from 'react';
/* eslint-disable no-unused-vars */
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { BackgroundPaths } from '../../../components/ui/background-paths';
import {
  Moon,
  Sun,
  Rocket,
  Users,
  Globe,
  Zap,
  Code2,
  Target,
  Trophy,
  Briefcase,
  Award,
  Shield,
  TrendingUp,
  CheckCircle,
  Star,
  GitBranch,
  Cpu,
  Heart,
  Clock,
  Check,
  X,
  Crown,
  Package,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import SpectrumBackground from '../../components/SpectrumBackground';
import { TestimonialMarquee } from './TestimonialMarquee';
import { Tiles } from '../../../components/ui/tiles';

const TimelineNode = ({ year, title, desc, side, index, isDark, icon: IconComponent }) => { // eslint-disable-line no-unused-vars
  return (
    <div className={`flex w-full mb-32 relative ${side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Center Line Connection */}
      <div className="absolute left-1/2 top-10 -translate-x-1/2 z-20">
        <div className={`w-10 h-10 rounded-xl rotate-45 flex items-center justify-center border transition-all duration-500 ${isDark
          ? 'bg-black/80 border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:border-violet-500/50'
          : 'bg-white/80 border-black/10 shadow-[0_0_20px_rgba(0,0,0,0.05)] group-hover:border-violet-500/50'
          }`}>
          <div className="-rotate-45">
            <IconComponent className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
          </div>
        </div>
      </div>

      <div className={`w-1/2 ${side === 'left' ? 'pr-20 text-right' : 'pl-20 text-left'}`}>
        <motion.div
          initial={{ opacity: 0, x: side === 'left' ? -30 : 30, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
          className="relative group"
        >
          {/* Glass Card - Updated to match snippet style */}
          <div className={`p-8 rounded-2xl border transition-all duration-500 hover:scale-[1.01] ${isDark
            ? 'bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-black/40 border-white/5 backdrop-blur-xl hover:border-violet-500/30'
            : 'bg-gradient-to-br from-white/60 via-purple-50/10 to-white/60 border-black/5 backdrop-blur-xl hover:border-violet-400/30 shadow-xl shadow-black/5'
            }`}>

            {/* Year Badge */}
            <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-4 ${isDark
              ? 'bg-violet-900/20 text-violet-400 border border-violet-500/20'
              : 'bg-violet-50 text-violet-600 border border-violet-200/50'
              }`}>
              {year}
            </div>

            <h3 className="text-2xl font-bold mb-3 tracking-tight text-black dark:text-white">
              {title}
            </h3>

            <p className={`text-sm leading-relaxed font-light ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {desc}
            </p>
          </div>
        </motion.div>
      </div>
      <div className="w-1/2" />
    </div>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // Memoized data from snippet
  const valuePropositions = useMemo(() => [
    {
      icon: <Target className="w-8 h-8 text-black dark:text-white" />,
      title: "Real-World Challenges",
      desc: "Companies post actual projects. You solve real problems, not just answer questions.",
      features: ["Project-based evaluation", "Industry-relevant tasks", "Practical skill assessment"]
    },
    {
      icon: <Shield className="w-8 h-8 text-black dark:text-white" />,
      title: "Bias-Free Selection",
      desc: "Anonymous submissions ensure selection based purely on skill, not background.",
      features: ["Blind evaluation", "Merit-only ranking", "Diverse talent pool"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-black dark:text-white" />,
      title: "Career Acceleration",
      desc: "Top performers get direct access to hiring managers and exclusive opportunities.",
      features: ["Direct job offers", "Priority interviews", "Competition rewards"]
    }
  ], []);

  const journeySteps = useMemo(() => [
    {
      step: "01",
      title: "Discover Challenges",
      desc: "Browse competitions by tech stack, difficulty, or company",
      icon: <Globe className="w-8 h-8" />
    },
    {
      step: "02",
      title: "Build & Submit",
      desc: "Develop solutions using your preferred tools and frameworks",
      icon: <Code2 className="w-8 h-8" />
    },
    {
      step: "03",
      title: "Get Evaluated",
      desc: "AI + expert review with detailed feedback on your solution",
      icon: <Award className="w-8 h-8" />
    },
    {
      step: "04",
      title: "Land Opportunities",
      desc: "Top performers receive interview invites and job offers",
      icon: <Briefcase className="w-8 h-8" />
    }
  ], []);

  const featuresList = useMemo(() => [
    "Automatic code quality scoring",
    "Real-time leaderboards",
    "Detailed performance analytics",
    "Portfolio generation from submissions",
    "Direct company connections"
  ], []);

  const featureCards = useMemo(() => [
    { icon: <GitBranch />, label: "Code Collaboration", color: "text-black dark:text-white" },
    { icon: <Cpu />, label: "AI Evaluation", color: "text-black dark:text-white" },
    { icon: <Clock />, label: "Time Tracking", color: "text-black dark:text-white" },
    { icon: <Users />, label: "Community", color: "text-black dark:text-white" }
  ], []);

  const statistics = useMemo(() => [
    { value: "250+", label: "Active Competitions", icon: <Trophy className="w-5 h-5" /> },
    { value: "50K+", label: "Developers", icon: <Users className="w-5 h-5" /> },
    { value: "2.4K", label: "Successfully Hired", icon: <Award className="w-5 h-5" /> },
    { value: "95%", label: "Satisfaction Rate", icon: <Heart className="w-5 h-5" /> }
  ], []);

  const pricingPlans = useMemo(() => [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started",
      icon: <Package className="w-8 h-8" />,
      features: [
        { text: "Access to 5 competitions/month", included: true },
        { text: "Basic code evaluation", included: true },
        { text: "Community support", included: true },
        { text: "Public leaderboard", included: true },
        { text: "Priority evaluation", included: false },
        { text: "Direct company messages", included: false },
        { text: "Advanced analytics", included: false },
        { text: "Portfolio builder", included: false }
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "₹3,000",
      period: "per month",
      description: "For serious developers",
      icon: <Zap className="w-8 h-8" />,
      features: [
        { text: "Unlimited competitions", included: true },
        { text: "Priority code evaluation", included: true },
        { text: "Priority support 24/7", included: true },
        { text: "Featured profile", included: true },
        { text: "Direct company messages", included: true },
        { text: "Advanced analytics dashboard", included: true },
        { text: "Professional portfolio builder", included: true },
        { text: "Interview preparation resources", included: true }
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For companies hiring talent",
      icon: <Crown className="w-8 h-8" />,
      features: [
        { text: "Post unlimited challenges", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom evaluation criteria", included: true },
        { text: "Direct talent pipeline", included: true },
        { text: "API access", included: true },
        { text: "White-label options", included: true },
        { text: "Advanced hiring analytics", included: true },
        { text: "Priority candidate screening", included: true }
      ],
      popular: false
    }
  ], []);


  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const colorProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#8b5cf6", "#ec4899", "#3b82f6"]
  );

  // AOS-like animation logic using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || '0';
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, parseInt(delay));
        }
      });
    }, observerOptions);

    const elements = containerRef.current?.querySelectorAll('[data-aos]');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div ref={containerRef} className={`relative min-h-screen ${isDark ? 'bg-black text-neutral-100' : 'bg-white text-neutral-900'} overflow-hidden transition-colors duration-500`}>

      <style>{`
        :root { --tile: rgba(139, 92, 246, 0.08); }
        .dark { --tile: rgba(139, 92, 246, 0.15); }
        /* Premium Minimalism CSS */
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 15s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        [data-aos] {
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), 
                      transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        [data-aos="fade-up"] { transform: translateY(30px); }
        [data-aos="fade-right"] { transform: translateX(-30px); }
        [data-aos="fade-left"] { transform: translateX(30px); }
        [data-aos].aos-animate {
          opacity: 1;
          transform: translate(0) scale(1);
        }
        [data-aos-delay="100"] { transition-delay: 0.1s; }
        [data-aos-delay="150"] { transition-delay: 0.15s; }
        [data-aos-delay="200"] { transition-delay: 0.2s; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 1.5rem)); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(calc(-100% - 1.5rem)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
        .pause-on-hover:hover .animate-marquee,
        .pause-on-hover:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background blobs from snippet */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>


      {/* Theme Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-xl shadow-lg transition-all ${isDark
          ? 'bg-black/40 border border-white/10 text-violet-400 hover:bg-black/60'
          : 'bg-white/80 border border-black/10 text-violet-600 hover:bg-white'
          } backdrop-blur-xl`}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      {/* HERO SECTION - REPLACED WITH BACKGROUND PATHS */}
      <BackgroundPaths
        title="Where Skills Meet Opportunity"
        subtitle="Provelt.io bridges the gap between exceptional talent and companies through real-world competitions. Prove your skills, not just your resume."
        buttonText="Start Competing"
        onButtonClick={() => {
          const whySection = document.querySelector('[data-aos="fade-up"]');
          whySection?.scrollIntoView({ behavior: 'smooth' });
        }}
      />


      <div className="relative w-full">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-25 transition-opacity duration-[2000ms]">
          <Tiles rows={50} cols={250} tileSize="lg" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 space-y-64 pb-64">

          {/* VALUE PROPOSITION CARDS */}
          <section data-aos="fade-up">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                Why Provelt Works
              </h2>
              <p className={`${isDark ? 'text-white/40' : 'text-black/40'} text-lg max-w-xl mx-auto font-light`}>
                Traditional hiring vs. Our skill-first approach
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valuePropositions.map((card, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-delay={idx * 150}
                  className={`group p-10 rounded-3xl border transition-all duration-500 hover:scale-[1.02] ${isDark
                    ? 'bg-gradient-to-br from-gray-950/40 via-gray-950/20 to-black/40 border-white/5 backdrop-blur-xl hover:border-violet-500/30'
                    : 'bg-gradient-to-br from-white/80 via-purple-50/10 to-white/80 border-black/5 backdrop-blur-xl hover:border-violet-300 shadow-2xl shadow-black/5'
                    }`}
                >
                  <div className={`mb-10 p-5 rounded-2xl w-fit transition-all ${isDark ? 'bg-white/5 group-hover:bg-violet-500/20' : 'bg-black/5 group-hover:bg-violet-100'}`}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{card.title}</h3>
                  <p className={`${isDark ? 'text-white/50' : 'text-black/60'} mb-8 font-light leading-relaxed text-sm`}>{card.desc}</p>
                  <ul className="space-y-4">
                    {card.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm opacity-70">
                        <CheckCircle className="w-4 h-4 text-violet-500" />
                        <span className="font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* JOURNEY STEPS */}
          <section data-aos="fade-up">
            <div className="text-center mb-32">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                The Provelt Journey
              </h2>
              <p className={`${isDark ? 'text-white/40' : 'text-black/40'} text-lg max-w-xl mx-auto font-light`}>
                From competition to career in four simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {journeySteps.map((step, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-delay={idx * 100}
                  className={`group p-8 rounded-3xl border transition-all duration-500 ${isDark
                    ? 'bg-white/5 border-white/5 hover:bg-white/10'
                    : 'bg-black/5 border-black/5 hover:bg-black/10'
                    } backdrop-blur-xl`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black text-violet-500 tracking-widest uppercase">STEP {step.step}</span>
                    <div className="p-3 rounded-xl bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] text-white">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 tracking-tight">{step.title}</h3>
                  <p className={`${isDark ? 'text-white/40' : 'text-black/40'} text-sm leading-relaxed font-light`}>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* EXISTING HISTORY TIMELINE */}
          <section ref={timelineRef} data-aos="fade-up">
            <div className="text-center mb-32">
              <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border backdrop-blur-xl mb-12`}>
                <Zap className="w-4 h-4 text-violet-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Our Evolution</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                Company Milestone
              </h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Background Line */}
              <div className={`absolute left-1/2 top-0 bottom-0 w-[1px] ${isDark ? 'bg-white/10' : 'bg-black/10'} -translate-x-1/2 rounded-full`} />

              {/* Animated Progress Line */}
              <motion.div
                style={{
                  scaleY,
                  originY: 0,
                  backgroundColor: colorProgress,
                  boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)"
                }}
                className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 z-10 rounded-full"
              />

              {/* Timeline Items */}
              {[
                { year: "2023", title: "The Foundation", desc: "Provelt was born from a vision to revolutionize hiring. We launched our alpha platform and onboarded our first 100 companies.", side: "left", icon: Rocket },
                { year: "2024", title: "Rapid Growth", desc: "Expanded to 150+ partner companies and 2,500+ talented users. Introduced AI-powered matching and real-time competition analytics.", side: "right", icon: Users },
                { year: "2025", title: "Global Scale", desc: "Became the leading skill-based hiring platform. Processing 500+ projects with a 94% success rate across multiple industries.", side: "left", icon: Globe }
              ].map((item, index) => (
                <TimelineNode
                  key={index}
                  year={item.year}
                  title={item.title}
                  desc={item.desc}
                  side={item.side}
                  index={index}
                  isDark={isDark}
                  icon={item.icon}
                />
              ))}
            </div>
          </section>

          {/* PRICING PLANS */}
          <section data-aos="fade-up">
            <div className="text-center mb-32">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                Choose Your Plan
              </h2>
              <p className={`${isDark ? 'text-white/40' : 'text-black/40'} text-lg max-w-xl mx-auto font-light`}>
                Start free or unlock premium features to accelerate your career
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-delay={idx * 150}
                  className={`relative p-10 rounded-3xl border transition-all duration-500 ${plan.popular
                    ? `border-violet-500 shadow-2xl ${isDark ? 'bg-violet-900/10' : 'bg-violet-50'}`
                    : `${isDark ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`
                    } backdrop-blur-xl group hover:scale-[1.02]`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-violet-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-10 text-violet-500 bg-violet-500/10 p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    {plan.icon}
                  </div>

                  <h3 className="text-3xl font-bold mb-2 tracking-tight">{plan.name}</h3>
                  <p className={`${isDark ? 'text-white/40' : 'text-black/40'} text-xs mb-8 font-light uppercase tracking-widest`}>{plan.description}</p>

                  <div className="mb-10 flex items-baseline gap-2">
                    <span className="text-5xl font-black">{plan.price}</span>
                    <span className="text-xs opacity-40 font-light translate-y-[-2px]">{plan.period}</span>
                  </div>

                  <button className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all mb-12 ${plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 text-white shadow-xl shadow-purple-500/30'
                    : 'border border-violet-500/20 hover:border-violet-500 hover:bg-violet-500 text-violet-500 hover:text-white'
                    }`}>
                    {plan.name === "Enterprise" ? "Contact Support" : "Start Now"}
                  </button>

                  <div className="space-y-5">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 text-sm font-light">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-violet-500" />
                        ) : (
                          <X className="w-5 h-5 opacity-20" />
                        )}
                        <span className={feature.included ? 'opacity-80' : 'opacity-30 line-through'}>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURES SHOWCASE */}
          <section data-aos="fade-up">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div data-aos="fade-right">
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
                  Built for <span className="block opacity-30 italic">Precision Hiring</span>
                </h2>
                <p className={`${isDark ? 'text-white/50' : 'text-black/60'} text-lg mb-12 leading-relaxed font-light`}>
                  Provelt creates a win-win ecosystem where talent showcases quality through
                  actual labor—not optimized interview performance.
                </p>

                <div className="grid gap-6">
                  {featuresList.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-6 group">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-all">
                        <Star className="w-4 h-4" />
                      </div>
                      <span className="text-lg font-light opacity-80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div data-aos="fade-left" className="grid grid-cols-2 gap-8 lg:scale-110">
                {featureCards.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-10 rounded-[2rem] border transition-all duration-500 ${isDark ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'} group flex flex-col items-center gap-6 text-center`}
                  >
                    <div className={`p-6 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-black/5'} group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                      {item.icon}
                    </div>
                    <h4 className="font-black text-[10px] uppercase tracking-[0.2em]">{item.label}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* STATISTICS */}
          <section data-aos="fade-up">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statistics.map((stat, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-delay={idx * 100}
                  className={`p-12 rounded-[2.5rem] ${isDark ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'} border text-center group transition-all duration-500 hover:border-violet-500/50`}
                >
                  <div className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-violet-500 mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                  </div>
                  <p className={`${isDark ? 'text-white/40' : 'text-black/40'} text-[10px] font-black uppercase tracking-widest`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section data-aos="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                Success Stories
              </h2>
              <p className={`${isDark ? 'text-white/40' : 'text-black/40'} text-lg max-w-xl mx-auto font-light`}>
                Hear from developers who transformed their careers through Provelt
              </p>
            </div>

            <TestimonialMarquee />
          </section>

          {/* CTA SECTION */}
          <section data-aos="fade-up" className="relative px-6">

            <div className="relative p-12 lg:p-24 overflow-hidden group">


              <div className="max-w-4xl mx-auto relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8" data-aos="fade-up">
                  <Rocket className="w-3 h-3" />
                  Ready to scale?
                </div>

                <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-[1.1]" data-aos="fade-up" data-aos-delay="100">
                  The future of hire is <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 italic">
                    skill-first.
                  </span>
                </h2>

                <p className={`${isDark ? 'text-white/40' : 'text-black/40'} text-lg md:text-xl mb-12 font-light max-w-2xl mx-auto leading-relaxed`} data-aos="fade-up" data-aos-delay="200">
                  Join thousands of developers coding their way into world-class companies
                  through authentic, project-based proofs.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center" data-aos="fade-up" data-aos-delay="300">
                  <button className="relative group/btn overflow-hidden px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20 dark:shadow-white/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/20 to-violet-500/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                    <span className="flex items-center gap-3 relative z-10">
                      Join the community
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>

                  <button className={`px-10 py-5 border rounded-2xl font-bold text-sm transition-all hover:bg-current/5 ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'
                    } hover:scale-105 active:scale-95`}>
                    Hire top talent
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <SpectrumBackground />
    </div>
  );
}
