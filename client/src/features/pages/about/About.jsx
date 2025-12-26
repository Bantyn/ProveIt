import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LightRays from '../../components/LightRays';
import {
  Zap,
  Target,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  Shield,
  TrendingUp,
  Heart,
  Award,
  Lightbulb,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react';

const TimelineNode = ({ year, title, desc, side, index, isDark }) => {
  return (
    <div className={`flex w-full mb-32 relative ${side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Center Line Connection */}
      <div className={`absolute left-1/2 top-8 -translate-x-1/2 w-6 h-6 rounded-full ${isDark ? 'bg-black border-violet-500' : 'bg-white border-violet-500'
        } border-4 z-20 shadow-[0_0_30px_rgba(139,92,246,0.8)]`}>
        <div className="absolute inset-0 bg-violet-500 rounded-full animate-ping opacity-30" />
      </div>

      <div className={`w-1/2 ${side === 'left' ? 'pr-20 text-right' : 'pl-20 text-left'}`}>
        <motion.div
          initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="relative group"
        >
          <span className={`text-8xl font-black ${isDark ? 'text-neutral-900' : 'text-neutral-200'
            } absolute -top-16 left-0 right-0 select-none pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
            {year}
          </span>
          <h3 className="text-4xl font-black mb-4 relative z-10 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-violet-400 transition-all duration-500">
            {title}
          </h3>
          <p className={`text-xl ${isDark ? 'text-neutral-400 group-hover:text-neutral-200' : 'text-neutral-600 group-hover:text-neutral-800'
            } font-medium leading-relaxed transition-colors duration-300`}>
            {desc}
          </p>
        </motion.div>
      </div>
      <div className="w-1/2" />
    </div>
  );
};

export default function About() {
  const timelineRef = useRef(null);
  const [isDark, setIsDark] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    users: 0,
    companies: 0,
    success: 0
  });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-out-cubic',
      offset: 100
    });

    // Counter animation for stats
    const animateValue = (key, end, duration = 2000) => {
      const start = 0;
      const increment = end / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 16);
    };

    // Start counter animations after a delay
    setTimeout(() => {
      animateValue('projects', 500);
      animateValue('users', 2500);
      animateValue('companies', 150);
      animateValue('success', 94);
    }, 500);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`relative min-h-screen ${isDark ? 'bg-black text-neutral-100' : 'bg-white text-neutral-900'
      } overflow-hidden transition-colors duration-500`}>

      {/* Theme Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-xl shadow-lg transition-all ${isDark
            ? 'bg-violet-900/30 border border-violet-500/20 text-violet-400 hover:bg-violet-900/50'
            : 'bg-white border border-violet-300 text-violet-600 hover:bg-violet-50'
          }`}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      {/* Hero Section with LightRays */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* LightRays Background - Only in dark mode */}
        {isDark && (
          <div className="absolute inset-0 z-0">
            <LightRays
              raysOrigin="top-center"
              raysColor="#8b5cf6"
              raysSpeed={0.8}
              lightSpread={1.2}
              rayLength={2.5}
              pulsating={true}
              fadeDistance={1.2}
              saturation={1.2}
              followMouse={true}
              mouseInfluence={0.15}
              noiseAmount={0.05}
              distortion={0.1}
            />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 z-[1] ${isDark
            ? 'bg-gradient-to-b from-black/40 via-violet-950/20 to-black'
            : 'bg-gradient-to-b from-violet-50/50 via-white to-violet-50/30'
          }`} />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 z-[1] opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent leading-tight drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
              Revolutionizing Hiring
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className={`text-xl md:text-2xl ${isDark ? 'text-neutral-300' : 'text-neutral-600'
              } mb-8 max-w-3xl mx-auto`}
          >
            Where talent meets opportunity through skill-based competitions.
            We don't just match resumes—we prove capabilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex gap-4 justify-center items-center flex-wrap"
          >
            <button className={`px-8 py-4 bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${isDark
                ? 'border border-violet-500/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] text-white'
                : 'border border-violet-400 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] text-white'
              }`}>
              Join the Revolution
            </button>
            <button className={`px-8 py-4 border-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${isDark
                ? 'border-violet-500 hover:bg-violet-500/20 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] text-neutral-100'
                : 'border-violet-500 hover:bg-violet-50 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] text-neutral-900'
              }`}>
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`flex flex-col items-center gap-2 ${isDark ? 'text-neutral-400 hover:text-violet-400' : 'text-neutral-600 hover:text-violet-600'
              } transition-colors duration-300 cursor-pointer`}
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Company Story Section */}
      <section className={`relative py-32 px-6 ${isDark ? 'bg-gradient-to-b from-black via-violet-950/10 to-black' : 'bg-gradient-to-b from-white via-violet-50/30 to-white'
        }`} data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className={`text-lg ${isDark ? 'text-neutral-300' : 'text-neutral-700'} mb-6 leading-relaxed`}>
                Provelt was born from a simple observation: traditional hiring is broken.
                Resumes lie, interviews are subjective, and the best talent often goes unnoticed.
              </p>
              <p className={`text-lg ${isDark ? 'text-neutral-300' : 'text-neutral-700'} mb-6 leading-relaxed`}>
                We created a platform where skills speak louder than words. Companies post real projects,
                we organize competitive challenges, and candidates prove their worth through actual work—not polished CVs.
              </p>
              <p className={`text-lg ${isDark ? 'text-neutral-300' : 'text-neutral-700'} leading-relaxed`}>
                Today, we're building the future of work—one competition at a time.
              </p>
            </div>

            <div className="relative group">
              <div className={`aspect-square bg-gradient-to-br ${isDark
                  ? 'from-violet-600/20 via-blue-600/10 to-violet-800/20 border-violet-500/30 hover:border-blue-500 hover:shadow-[0_0_60px_rgba(139,92,246,0.4)]'
                  : 'from-violet-200/40 via-blue-200/20 to-violet-300/40 border-violet-300/50 hover:border-blue-400 hover:shadow-[0_0_60px_rgba(139,92,246,0.3)]'
                } rounded-3xl backdrop-blur-sm border flex items-center justify-center overflow-hidden transition-all duration-500 hover:scale-105`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-violet-500/10 to-blue-500/10' : 'from-violet-300/20 to-blue-300/20'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className={`w-32 h-32 ${isDark ? 'text-violet-400 group-hover:text-blue-400' : 'text-violet-500 group-hover:text-blue-500'
                    } group-hover:scale-110 transition-all duration-500`} style={{ filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.8))' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`relative py-32 px-6 ${isDark ? 'bg-black' : 'bg-neutral-100'}`} data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className={`text-xl ${isDark ? 'text-neutral-400' : 'text-neutral-600'} text-center mb-16 max-w-3xl mx-auto`}>
            A seamless three-step process that connects talent with opportunity
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Companies Submit Projects", desc: "Organizations post real-world challenges they need solved, defining clear objectives and success criteria.", color: "violet" },
              { icon: Shield, title: "We Organize Competitions", desc: "Our admin team reviews, validates, and structures each project into fair, transparent competitions.", color: "blue" },
              { icon: Trophy, title: "Talent Competes & Gets Hired", desc: "Users showcase their skills through actual work. Top performers get hired based on proven capabilities.", color: "violet" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`group relative bg-gradient-to-br ${isDark
                    ? `from-${step.color}-600/10 via-${step.color}-500/5 to-transparent border-${step.color}-500/30 hover:border-${step.color}-400 hover:bg-${step.color}-600/15 hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]`
                    : `from-${step.color}-100/50 via-${step.color}-50/30 to-transparent border-${step.color}-300/40 hover:border-${step.color}-400 hover:bg-${step.color}-100/60 hover:shadow-[0_0_50px_rgba(139,92,246,0.2)]`
                  } border rounded-3xl p-10 transition-all duration-500 hover:scale-105 overflow-hidden`}
              >
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${isDark ? `bg-${step.color}-500/20` : `bg-${step.color}-300/30`
                  } rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100`} />

                <div className={`absolute -top-6 left-8 w-14 h-14 bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_30px_rgba(139,92,246,0.6)] group-hover:scale-110 transition-transform duration-300 text-white`}>
                  {index + 1}
                </div>
                <div className={`relative z-10 mt-4 mb-6 w-20 h-20 ${isDark ? `bg-${step.color}-600/20` : `bg-${step.color}-200/50`
                  } rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner`}>
                  <step.icon className={`w-10 h-10 ${isDark ? `text-${step.color}-400 group-hover:text-${step.color}-300` : `text-${step.color}-600 group-hover:text-${step.color}-700`
                    }`} />
                </div>
                <h3 className={`relative z-10 text-2xl font-bold mb-4 ${isDark ? 'text-neutral-100 group-hover:text-white' : 'text-neutral-900'
                  } transition-colors duration-300`}>{step.title}</h3>
                <p className={`relative z-10 ${isDark ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-neutral-600 group-hover:text-neutral-700'
                  } leading-relaxed transition-colors duration-300`}>
                  {step.desc}
                </p>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-blue-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`relative py-32 px-6 ${isDark ? 'bg-gradient-to-b from-black via-violet-950/10 to-black' : 'bg-gradient-to-b from-white via-violet-50/30 to-white'
        }`} data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Impact in Numbers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: `${stats.projects}+`, label: "Projects Completed", color: "violet" },
              { value: `${stats.users}+`, label: "Talented Users", color: "blue" },
              { value: `${stats.companies}+`, label: "Partner Companies", color: "violet" },
              { value: `${stats.success}%`, label: "Success Rate", color: "blue" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className={`group text-center p-10 bg-gradient-to-br ${isDark
                    ? `from-${stat.color}-600/10 to-transparent border-${stat.color}-500/30 hover:border-${stat.color}-400 hover:bg-${stat.color}-600/15 hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]`
                    : `from-${stat.color}-100/50 to-transparent border-${stat.color}-300/40 hover:border-${stat.color}-400 hover:bg-${stat.color}-100/60 hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]`
                  } border rounded-3xl transition-all duration-500 hover:scale-110 cursor-pointer overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? `from-${stat.color}-500/10` : `from-${stat.color}-200/20`
                  } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 text-6xl md:text-7xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className={`relative z-10 ${isDark ? 'text-neutral-400 group-hover:text-neutral-200' : 'text-neutral-600 group-hover:text-neutral-800'
                  } font-semibold text-lg transition-colors duration-300`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Bento Grid */}
      <section className={`relative py-32 px-6 ${isDark ? 'bg-black' : 'bg-neutral-100'}`} data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <p className={`text-xl ${isDark ? 'text-neutral-400' : 'text-neutral-600'} text-center mb-16 max-w-3xl mx-auto`}>
            The principles that drive everything we do
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "Merit-Based Selection", desc: "We believe in meritocracy. Your skills, creativity, and results matter—not your background, connections, or how well you interview. Everyone competes on a level playing field.", span: 2, color: "violet" },
              { icon: Lightbulb, title: "Innovation", desc: "We continuously push boundaries, experiment with new ideas, and challenge the status quo.", span: 1, color: "blue" },
              { icon: Shield, title: "Transparency", desc: "Clear criteria, fair judging, and open communication. No hidden agendas, no favoritism.", span: 1, color: "violet" },
              { icon: TrendingUp, title: "Pursuit of Excellence", desc: "We set high standards for ourselves and our community. Quality over quantity, mastery over mediocrity. We celebrate exceptional work and continuous improvement.", span: 2, color: "blue" }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`${value.span === 2 ? 'md:col-span-2' : ''} group relative bg-gradient-to-br ${isDark
                    ? `from-${value.color}-600/10 via-${value.color}-500/5 to-transparent border-${value.color}-500/30 hover:border-${value.color}-400 hover:bg-${value.color}-600/15 hover:shadow-[0_0_60px_rgba(139,92,246,0.4)]`
                    : `from-${value.color}-100/50 via-${value.color}-50/30 to-transparent border-${value.color}-300/40 hover:border-${value.color}-400 hover:bg-${value.color}-100/60 hover:shadow-[0_0_60px_rgba(139,92,246,0.3)]`
                  } border rounded-3xl p-12 transition-all duration-500 hover:scale-105 overflow-hidden cursor-pointer`}
              >
                <div className={`absolute top-0 right-0 ${value.span === 2 ? 'w-80 h-80' : 'w-64 h-64'} ${isDark ? `bg-${value.color}-500/20` : `bg-${value.color}-300/30`
                  } rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 opacity-0 group-hover:opacity-100`} />
                <div className="relative z-10">
                  <div className={`inline-block p-4 ${isDark ? `bg-${value.color}-600/20` : `bg-${value.color}-200/50`
                    } rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-inner`}>
                    <value.icon className={`w-12 h-12 ${isDark ? `text-${value.color}-400 group-hover:text-${value.color}-300` : `text-${value.color}-600 group-hover:text-${value.color}-700`
                      }`} />
                  </div>
                  <h3 className={`text-3xl font-bold mb-5 ${isDark ? 'text-neutral-100 group-hover:text-white' : 'text-neutral-900'
                    } transition-colors duration-300`}>{value.title}</h3>
                  <p className={`${value.span === 2 ? 'text-lg' : ''} ${isDark ? 'text-neutral-300 group-hover:text-neutral-100' : 'text-neutral-700 group-hover:text-neutral-900'
                    } leading-relaxed transition-colors duration-300`}>
                    {value.desc}
                  </p>
                </div>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl`}>
                  <div className={`absolute inset-0 border-2 ${isDark ? `border-${value.color}-400/30` : `border-${value.color}-400/40`
                    } rounded-3xl`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className={`relative py-48 px-6 overflow-hidden ${isDark ? 'bg-gradient-to-b from-black via-violet-950/10 to-black' : 'bg-gradient-to-b from-white via-violet-50/30 to-white'
        }`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-48" data-aos="fade-up">
            <span className={`inline-block px-6 py-3 rounded-full ${isDark
                ? 'bg-violet-600/20 border-violet-500/30 text-violet-400 hover:bg-violet-600/30 hover:border-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]'
                : 'bg-violet-100/70 border-violet-300/50 text-violet-700 hover:bg-violet-200/70 hover:border-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]'
              } border font-bold text-sm uppercase tracking-[0.3em] mb-12 transition-all duration-300`}>
              Our Journey
            </span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              TIMELINE
            </h2>
          </div>

          <div className="relative">
            {/* Background Line */}
            <div className={`absolute left-1/2 top-0 bottom-0 w-[6px] ${isDark ? 'bg-neutral-900' : 'bg-neutral-300'
              } -translate-x-1/2 rounded-full`} />

            {/* Animated Progress Line */}
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-1/2 top-0 bottom-0 w-[6px] bg-gradient-to-b from-violet-600 via-blue-500 to-violet-600 -translate-x-1/2 z-10 rounded-full shadow-[0_0_40px_rgba(139,92,246,0.8)]"
            />

            {/* Timeline Items */}
            {[
              { year: "2023", title: "The Foundation", desc: "Provelt was born from a vision to revolutionize hiring. We launched our alpha platform and onboarded our first 100 companies.", side: "left" },
              { year: "2024", title: "Rapid Growth", desc: "Expanded to 150+ partner companies and 2,500+ talented users. Introduced AI-powered matching and real-time competition analytics.", side: "right" },
              { year: "2025", title: "Global Scale", desc: "Became the leading skill-based hiring platform. Processing 500+ projects with a 94% success rate across multiple industries.", side: "left" }
            ].map((item, index) => (
              <TimelineNode
                key={index}
                year={item.year}
                title={item.title}
                desc={item.desc}
                side={item.side}
                index={index}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`relative py-32 px-6 overflow-hidden ${isDark ? 'bg-black' : 'bg-neutral-100'}`}>
        {/* LightRays Background - Only in dark mode */}
        {isDark && (
          <div className="absolute inset-0 opacity-30">
            <LightRays
              raysOrigin="bottom-center"
              raysColor="#8b5cf6"
              raysSpeed={0.6}
              lightSpread={1.5}
              rayLength={2}
              pulsating={true}
              fadeDistance={1}
              saturation={1.3}
              followMouse={false}
              mouseInfluence={0}
              noiseAmount={0.1}
              distortion={0.05}
            />
          </div>
        )}

        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-black via-violet-950/20 to-black' : 'bg-gradient-to-b from-neutral-100 via-violet-50/30 to-neutral-100'
          }`} />

        <div className="relative z-10 max-w-5xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Ready to Prove Your Worth?
          </h2>
          <p className={`text-xl ${isDark ? 'text-neutral-300' : 'text-neutral-700'} mb-12 max-w-2xl mx-auto`}>
            Join thousands of talented individuals competing for real opportunities.
            No more gatekeeping—just pure skill and determination.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 py-5 bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 group text-white ${isDark
                  ? 'hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] border border-violet-500/50'
                  : 'hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] border border-violet-400'
                }`}
            >
              For Talent: Join Competitions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 py-5 border-2 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 group ${isDark
                  ? 'border-violet-500 hover:bg-violet-500/20 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] text-neutral-100'
                  : 'border-violet-500 hover:bg-violet-50 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] text-neutral-900'
                }`}
            >
              For Companies: Post Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>

          <div className={`mt-16 flex flex-wrap justify-center gap-8 md:gap-12 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
            {[
              { icon: Zap, label: "Fast Turnaround", hoverColor: isDark ? 'hover:text-violet-400' : 'hover:text-violet-600' },
              { icon: Heart, label: "Verified Talent", hoverColor: isDark ? 'hover:text-blue-400' : 'hover:text-blue-600' },
              { icon: Trophy, label: "Real Results", hoverColor: isDark ? 'hover:text-violet-400' : 'hover:text-violet-600' }
            ].map((item, index) => (
              <div key={index} className={`flex items-center gap-2 ${item.hoverColor} transition-colors duration-300 cursor-pointer`}>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}