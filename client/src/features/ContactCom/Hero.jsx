import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  Phone,
  Mail,
  ChevronRight,
  ArrowRight,
  Star,
  Zap,
  Globe,
  Users,
} from "lucide-react";

/* =======================
   Theme Configuration
======================= */
const themeColors = {
  light: {
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    secondary: "#8b5cf6",
    accent: "#06b6d4",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)",
    text: "#1e293b",
    muted: "#64748b",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  dark: {
    primary: "#60a5fa",
    primaryHover: "#93c5fd",
    secondary: "#a78bfa",
    accent: "#22d3ee",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    text: "#f1f5f9",
    muted: "#94a3b8",
    glow: "rgba(96, 165, 250, 0.15)",
  },
};

/* =======================
   Floating Particles
======================= */
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: "rgba(59, 130, 246, 0.3)",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

/* =======================
   Animated Gradient Background
======================= */
const AnimatedGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Main Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
      
      {/* Moving Orbs */}
      <motion.div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                           linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

/* =======================
   Floating Contact Cards
======================= */
const FloatingContactCard = ({ icon: Icon, title, description, delay = 0, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, type: "spring", stiffness: 100 }}
      whileHover={{ 
        y: -10,
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      className="relative group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-zinc-700/50 shadow-xl">
        <div className={`inline-flex p-3 rounded-xl mb-4 ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        
        {/* Animated Arrow */}
        <motion.div 
          className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight size={20} className="text-blue-500" />
        </motion.div>
      </div>
    </motion.div>
  );
};

/* =======================
   Animated Stats
======================= */
const AnimatedStat = ({ value, label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const target = typeof value === 'string' ? 100 : parseInt(value);
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <motion.div 
      className="text-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
        <Icon size={24} className="text-white" />
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {typeof value === 'string' ? value : count}+
      </div>
      <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{label}</div>
    </motion.div>
  );
};

/* =======================
   Main Hero Component
======================= */
const Hero = () => {
  const [theme, setTheme] = useState("dark");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  const rotateX = useTransform(springY, [0, window.innerHeight], [5, -5]);
  const rotateY = useTransform(springX, [0, window.innerWidth], [-5, 5]);
  
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const colors = theme === 'dark' ? themeColors.dark : themeColors.light;

  return (
    <section 
      className="relative min-h-screen overflow-hidden"
      style={{ background: colors.background }}
      onMouseMove={handleMouseMove}
    >
      <AnimatedGradient />
      <FloatingParticles />
      
      {/* Animated Stars */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star size={20} className="text-yellow-400/30" />
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            ConnectPro
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 mb-6"
            >
              <Sparkles size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Premium Communication Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6"
              style={{ color: colors.text }}
            >
              Where{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Conversations
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>{" "}
              Turn Into{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% auto" }}
              >
                Connections
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8"
              style={{ color: colors.muted }}
            >
              Experience seamless communication with our AI-powered platform. 
              Average response time:{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                6–12 hours
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Conversation
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border-2 border-blue-200 bg-white/80 px-8 py-4 font-semibold text-blue-600 backdrop-blur transition-all hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-blue-400 dark:hover:bg-zinc-900"
              >
                <MessageSquare className="inline mr-2" size={20} />
                Live Chat
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8"
            >
              <AnimatedStat value="98" label="Satisfaction Rate" icon={Star} />
              <AnimatedStat value="6" label="Avg Response Hours" icon={Zap} />
              <AnimatedStat value="50+" label="Countries Served" icon={Globe} />
            </motion.div>
          </motion.div>

          {/* Right Column - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            {/* Main Floating Card */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-zinc-700/50 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-br from-blue-500 to-purple-600"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">
                      Ready to assist you
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      24/7 Support Team Available
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: Phone, text: "+1 (555) 123-4567", desc: "Direct Call" },
                    { icon: Mail, text: "hello@connectpro.com", desc: "Email Support" },
                    { icon: Users, text: "Live Chat", desc: "Instant Response" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                        <item.icon size={20} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-zinc-900 dark:text-white">{item.text}</div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Contact Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <FloatingContactCard
                icon={MessageSquare}
                title="Instant Chat"
                description="Get instant responses from our AI assistant"
                delay={0.6}
                color="bg-gradient-to-br from-green-500 to-emerald-600"
              />
              <FloatingContactCard
                icon={Phone}
                title="Voice Call"
                description="Schedule a call with our experts"
                delay={0.7}
                color="bg-gradient-to-br from-purple-500 to-pink-600"
              />
              <FloatingContactCard
                icon={Mail}
                title="Email Support"
                description="Detailed responses within hours"
                delay={0.8}
                color="bg-gradient-to-br from-blue-500 to-cyan-600"
              />
              <FloatingContactCard
                icon={Users}
                title="Team Support"
                description="Dedicated team for enterprises"
                delay={0.9}
                color="bg-gradient-to-br from-orange-500 to-red-600"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              Scroll to explore
            </div>
            <div className="w-6 h-10 border-2 border-zinc-300 dark:border-zinc-700 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        .glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;