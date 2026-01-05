import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Code2,
  Trophy,
  Users,
  Calendar,
  Award,
  ChevronRight,
  Moon,
  Sun,
  Zap,
  Target,
  Rocket,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Enhanced colors with glow effects
  const gradients = {
    light: {
      background: "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50",
      primary: "from-blue-500 via-purple-500 to-pink-500",
      secondary: "from-amber-400 via-orange-400 to-red-400",
      accent: "from-emerald-400 via-teal-400 to-cyan-400",
      glowPrimary: "shadow-blue-500/30",
      glowSecondary: "shadow-purple-500/30",
      glowAccent: "shadow-pink-500/30",
      card: "bg-white/95 backdrop-blur-sm",
      text: "text-slate-900",
      subtext: "text-slate-600",
      border: "border-slate-200",
      badge: "bg-gradient-to-r from-blue-500/10 to-purple-500/10",
      glass: "bg-white/90 backdrop-blur-md",
      stats: "bg-gradient-to-br from-white to-slate-50"
    },
    dark: {
      background: "bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20",
      primary: "from-cyan-400 via-blue-400 to-purple-400",
      secondary: "from-amber-300 via-orange-300 to-pink-300",
      accent: "from-emerald-300 via-teal-300 to-cyan-300",
      glowPrimary: "shadow-cyan-500/40",
      glowSecondary: "shadow-blue-500/40",
      glowAccent: "shadow-purple-500/40",
      card: "bg-slate-900/95 backdrop-blur-sm",
      text: "text-white",
      subtext: "text-slate-300",
      border: "border-slate-700",
      badge: "bg-gradient-to-r from-cyan-500/10 to-blue-500/10",
      glass: "bg-slate-900/90 backdrop-blur-md",
      stats: "bg-gradient-to-br from-slate-900 to-slate-800"
    }
  };

  const current = gradients[theme];
  const particles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={`relative min-h-screen overflow-hidden transition-all duration-500 ${current.background}`}>
      
      {/* GLOWING GRADIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary glowing orbs with strong glow */}
        <div className={`absolute top-1/4 -left-48 w-[700px] h-[700px] rounded-full bg-gradient-to-r ${current.primary} opacity-20 blur-3xl animate-pulse ${theme === 'light' ? 'shadow-2xl shadow-blue-500/20' : 'shadow-2xl shadow-cyan-500/20'}`} />
        <div className={`absolute bottom-1/4 -right-48 w-[700px] h-[700px] rounded-full bg-gradient-to-r ${current.secondary} opacity-20 blur-3xl animate-pulse delay-1000 ${theme === 'light' ? 'shadow-2xl shadow-pink-500/20' : 'shadow-2xl shadow-purple-500/20'}`} />
        
        {/* Floating glowing particles */}
        {particles.map((i) => (
          <div
            key={i}
            className={`absolute rounded-full ${i % 4 === 0 ? 'bg-blue-400/40' : i % 4 === 1 ? 'bg-purple-400/40' : i % 4 === 2 ? 'bg-pink-400/40' : 'bg-cyan-400/40'} animate-bounce ${theme === 'light' ? 'shadow-lg shadow-blue-500/20' : 'shadow-lg shadow-cyan-500/20'}`}
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${5 + (i * 8)}%`,
              top: `${15 + (i * 6)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          />
        ))}
        
        {/* Grid with subtle glow */}
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-grid-light-glow' : 'bg-grid-dark-glow'}`} />
      </div>

      {/* GLOWING THEME TOGGLE */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full ${theme === 'light' ? 'bg-white/20' : 'bg-slate-800/30'} backdrop-blur-lg border ${theme === 'light' ? 'border-white/30' : 'border-slate-600/50'} shadow-lg ${theme === 'light' ? 'shadow-blue-500/20' : 'shadow-cyan-500/30'} hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300`}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? 
          <Moon className="size-5 text-slate-700" /> : 
          <Sun className="size-5 text-amber-300" />
        }
      </motion.button>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-16 lg:pb-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          
          {/* LEFT CONTENT */}
          <motion.div
            className="lg:col-span-6 flex flex-col gap-10 text-center lg:text-left"
            variants={fadeInUp}
          >
            
            {/* GLOWING BADGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${current.badge} border ${current.border} backdrop-blur-lg w-fit mx-auto lg:mx-0 group hover:scale-105 transition-all duration-300 ${theme === 'light' ? 'shadow-lg shadow-blue-500/10' : 'shadow-lg shadow-cyan-500/10'} hover:shadow-xl hover:shadow-blue-500/20`}
            >
              <div className="relative">
                <Sparkles className={`size-5 ${theme === 'light' ? 'text-blue-500' : 'text-cyan-400'} animate-pulse`} />
                <div className={`absolute -inset-1 ${theme === 'light' ? 'bg-blue-500/30' : 'bg-cyan-400/30'} blur rounded-full`} />
              </div>
              <span className={`text-sm font-semibold bg-gradient-to-r ${current.primary} bg-clip-text text-transparent tracking-wide`}>
                Join 10,000+ Student Builders
              </span>
              <ChevronRight className={`size-4 ${theme === 'light' ? 'text-blue-500' : 'text-cyan-400'} group-hover:translate-x-1 transition-transform`} />
            </motion.div>

            {/* HEADLINE WITH GLOW */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className={current.text}>
                  Where{" "}
                  <span className="relative inline-block">
                    <span className={`relative z-10 bg-gradient-to-r ${current.primary} bg-clip-text text-transparent drop-shadow-lg`}>
                      Students
                    </span>
                    <div className={`absolute -bottom-2 left-0 right-0 h-3 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/40'} -rotate-1 blur-sm opacity-70`} />
                  </span>{" "}
                  Build
                </span>
                <br />
                <span className={current.text}>
                  Their{" "}
                  <span className="relative inline-block">
                    <span className={`relative z-10 bg-gradient-to-r ${current.secondary} bg-clip-text text-transparent drop-shadow-lg`}>
                      Future
                    </span>
                    <div className={`absolute -bottom-2 left-0 right-0 h-3 ${theme === 'light' ? 'bg-pink-100' : 'bg-pink-900/40'} rotate-1 blur-sm opacity-70`} />
                  </span>
                </span>
              </h1>
              
              <p className={`text-xl leading-relaxed max-w-2xl ${current.subtext} drop-shadow-sm`}>
                Compete in real-world hackathons, showcase your skills on live leaderboards, 
                and connect with companies looking for the next generation of innovators.
              </p>
            </div>

            {/* GLOWING STATS */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center lg:justify-start"
              variants={fadeInUp}
            >
              {[
                { icon: Users, value: "500+", label: "Active Teams", gradient: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/20" },
                { icon: Trophy, value: "$100K+", label: "In Prizes", gradient: "from-purple-500 to-pink-500", glow: "shadow-purple-500/20" },
                { icon: Calendar, value: "50+", label: "Challenges", gradient: "from-pink-500 to-rose-500", glow: "shadow-pink-500/20" },
                { icon: Award, value: "200+", label: "Success Stories", gradient: "from-amber-500 to-orange-500", glow: "shadow-amber-500/20" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-2xl ${current.stats} border ${current.border} backdrop-blur-sm shadow-lg ${stat.glow} hover:shadow-xl hover:scale-105 transition-all duration-300 group`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                      <stat.icon className="size-5 text-white drop-shadow" />
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${current.text} group-hover:scale-105 transition-transform`}>
                        {stat.value}
                      </div>
                      <div className={`text-sm ${current.subtext} mt-1`}>{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* GLOWING CTA BUTTONS */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={fadeInUp}
            >
              <motion.button
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  group relative
                  h-14 px-8 rounded-xl
                  bg-gradient-to-r ${current.primary}
                  shadow-2xl ${theme === 'light' ? 'shadow-blue-500/30' : 'shadow-cyan-500/40'}
                  text-white font-semibold text-lg
                  flex items-center justify-center gap-3
                  overflow-hidden
                  hover:shadow-3xl hover:shadow-blue-500/40
                  transition-all duration-300
                `}
              >
                {/* Enhanced shine effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <Rocket className="size-5 group-hover:rotate-12 transition-transform drop-shadow" />
                <span className="drop-shadow">Start Building Now</span>
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform drop-shadow" />
              </motion.button>

              <motion.button
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  h-14 px-8 rounded-xl
                  border-2 ${current.border}
                  ${current.glass}
                  ${current.text} font-semibold text-lg
                  shadow-lg ${theme === 'light' ? 'shadow-slate-500/10' : 'shadow-slate-700/30'}
                  hover:shadow-xl hover:shadow-blue-500/20
                  transition-all duration-300
                  flex items-center justify-center gap-2
                  hover:border-blue-400/50
                `}
              >
                <Target className="size-5" />
                How It Works
              </motion.button>
            </motion.div>

            {/* TRUST SIGNALS WITH GLOW */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start items-center pt-6"
              variants={fadeInUp}
            >
              <div className={`text-sm font-medium ${current.subtext} drop-shadow-sm`}>Trusted by students from</div>
              <div className="flex flex-wrap gap-3">
                {["MIT", "Stanford", "CMU", "Berkeley", "Harvard", "Princeton"].map((uni, i) => (
                  <div
                    key={i}
                    className={`px-3 py-1.5 rounded-lg border ${current.border} ${theme === 'light' ? 'bg-white/80' : 'bg-slate-800/60'} backdrop-blur-sm text-sm font-medium ${current.text} shadow-lg ${theme === 'light' ? 'shadow-slate-500/10' : 'shadow-slate-700/30'} hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300`}
                  >
                    {uni}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT VISUAL WITH ENHANCED GLOW */}
          <motion.div
            className="lg:col-span-6"
            variants={fadeInUp}
          >
            <div className="relative">
              {/* Main card with glowing border */}
              <div className="relative rounded-3xl overflow-hidden group">
                {/* Glowing border effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${current.primary} rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 ${theme === 'light' ? 'shadow-2xl shadow-blue-500/30' : 'shadow-2xl shadow-cyan-500/40'}`} />
                
                <div className={`relative rounded-3xl ${current.card} border ${current.border} shadow-2xl overflow-hidden backdrop-blur-sm ${theme === 'light' ? 'shadow-xl shadow-slate-500/10' : 'shadow-xl shadow-slate-900/30'}`}>
                  
                  {/* Background with overlay */}
                  <div className="relative h-[500px] overflow-hidden">
                    <img
                      src={theme === 'light' ? 
                        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" :
                        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070&auto=format&fit=crop"
                      }
                      alt="Students collaborating at hackathon"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'light' ? 'from-slate-900/50' : 'from-slate-900/70'} via-transparent to-transparent`} />
                  </div>

                  {/* Floating ranking card with glow */}
                  <div className={`absolute top-6 right-6 ${current.glass} rounded-xl p-4 shadow-2xl border ${current.border} backdrop-blur-md animate-bounce ${theme === 'light' ? 'shadow-lg shadow-blue-500/20' : 'shadow-lg shadow-cyan-500/30'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-full bg-gradient-to-r ${current.primary} flex items-center justify-center shadow-lg ${theme === 'light' ? 'shadow-blue-500/30' : 'shadow-cyan-500/40'}`}>
                        <Trophy className="size-5 text-white drop-shadow" />
                      </div>
                      <div>
                        <div className={`text-xs font-medium ${current.subtext} drop-shadow-sm`}>Live Ranking</div>
                        <div className={`text-lg font-bold ${current.text} drop-shadow`}>#1 - Team Alpha</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom challenge card with glow */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className={`${current.glass} rounded-2xl p-6 shadow-2xl border ${current.border} backdrop-blur-md ${theme === 'light' ? 'shadow-xl shadow-slate-500/20' : 'shadow-xl shadow-slate-700/30'}`}>
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className={`size-2 rounded-full ${theme === 'light' ? 'bg-emerald-500' : 'bg-emerald-400'} animate-pulse shadow-lg ${theme === 'light' ? 'shadow-emerald-500/40' : 'shadow-emerald-400/40'}`} />
                            <span className={`text-xs font-semibold uppercase tracking-widest bg-gradient-to-r ${current.primary} bg-clip-text text-transparent drop-shadow`}>
                              Live Challenge
                            </span>
                          </div>
                          <h3 className={`text-2xl font-bold ${current.text} drop-shadow`}>
                            Sustainable Tech Hackathon
                          </h3>
                          <p className={`${current.subtext} drop-shadow-sm`}>
                            48 hours to build solutions for climate change
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${current.text} drop-shadow`}>24:18:32</div>
                            <div className={`text-xs ${current.subtext} drop-shadow-sm`}>Time Remaining</div>
                          </div>
                          <div className={`size-12 rounded-full bg-gradient-to-r ${current.primary} flex items-center justify-center shadow-lg ${theme === 'light' ? 'shadow-blue-500/30' : 'shadow-cyan-500/40'} hover:scale-105 transition-transform duration-300`}>
                            <ArrowRight className="size-5 text-white drop-shadow" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Challenge stats */}
                      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200/50">
                        {[
                          { icon: Users, label: "320 Participants" },
                          { icon: Trophy, label: "$25K Prizes" },
                          { icon: Code2, label: "Web3 Track" },
                          { icon: Zap, label: "48 Hours" }
                        ].map((item, i) => (
                          <div key={i} className={`flex items-center gap-2 text-sm ${current.subtext} drop-shadow-sm`}>
                            <item.icon className="size-4" />
                            <span>{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative glowing dots */}
                <div className={`absolute -top-3 -left-3 size-6 rounded-full bg-gradient-to-r ${current.primary} shadow-2xl ${theme === 'light' ? 'shadow-blue-500/40' : 'shadow-cyan-500/50'} animate-pulse`} />
                <div className={`absolute -bottom-3 -right-3 size-6 rounded-full bg-gradient-to-r ${current.secondary} shadow-2xl ${theme === 'light' ? 'shadow-pink-500/40' : 'shadow-purple-500/50'} animate-pulse delay-700`} />
                <div className={`absolute top-1/2 -left-2 size-4 rounded-full bg-gradient-to-r ${current.accent} shadow-xl ${theme === 'light' ? 'shadow-emerald-500/40' : 'shadow-emerald-400/40'} animate-pulse delay-300`} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Add custom styles for enhanced glow effects */}
      <style jsx>{`
        .bg-grid-light-glow {
          background-image: 
            linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .bg-grid-dark-glow {
          background-image: 
            linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        /* Enhanced text shadow for better glow */
        .drop-shadow {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        
        .drop-shadow-sm {
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05));
        }
        
        .drop-shadow-lg {
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }
        
        @keyframes float-glow {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-20px) scale(1.1);
            opacity: 1;
          }
        }
        
        .animate-float-glow {
          animation: float-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;