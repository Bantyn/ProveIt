import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  useSpring,
} from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";

// ✅ Tree-shake lucide icons
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Zap from "lucide-react/dist/esm/icons/zap";
import Shield from "lucide-react/dist/esm/icons/shield";
import Users from "lucide-react/dist/esm/icons/users";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import Target from "lucide-react/dist/esm/icons/target";
import Gem from "lucide-react/dist/esm/icons/gem";
import Hexagon from "lucide-react/dist/esm/icons/hexagon";
import Circle from "lucide-react/dist/esm/icons/circle";
import Star from "lucide-react/dist/esm/icons/star";

// Split into smaller components for better maintainability
function HeroBackgroundEffects({ isMobile, reduceMotion, shapeX1, shapeY1, shapeX2, shapeY2 }) {
  // ✅ Memoized particles (Fix #1)
  const particles = useMemo(() => {
    const count = isMobile ? 6 : 12;
    return Array.from({ length: count }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: i % 3 === 0 ? "cyan" : i % 3 === 1 ? "purple" : "blue",
      delay: Math.random() * 3,
      speed: Math.random() * 2 + 1,
    }));
  }, [isMobile]);

  // ✅ Memoized abstract shapes
  const abstractShapes = useMemo(() => [
    {
      type: "square",
      size: isMobile ? 60 : 120,
      x: 15,
      y: 20,
      lightColor: "from-blue-50/30 to-cyan-50/20",
      darkColor: "from-blue-900/15 to-cyan-800/10",
      rotate: 25,
      animation: { y: [0, -30, 0], rotate: [25, 30, 25] }
    },
    {
      type: "diamond",
      size: isMobile ? 40 : 80,
      x: 80,
      y: 15,
      lightColor: "from-purple-50/30 to-pink-50/20",
      darkColor: "from-purple-900/15 to-pink-800/10",
      rotate: 45,
      animation: { x: [0, 15, 0], rotate: [45, 55, 45] }
    },
  ], [isMobile]);

  // ✅ Memoized floating icons with improved motion (Fix #2)
  const floatingIcons = useMemo(() => [
    { Icon: Hexagon, size: isMobile ? 16 : 24, x: 5, y: 15, color: "cyan" },
    { Icon: Circle, size: isMobile ? 20 : 28, x: 90, y: 25, color: "purple" },
    { Icon: Star, size: isMobile ? 14 : 22, x: 10, y: 80, color: "blue" },
  ], [isMobile]);

  if (reduceMotion || isMobile) return null;

  return (
    <>
      {/* Dynamic mesh gradient */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Abstract shapes */}
      {abstractShapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-lg
            bg-gradient-to-br ${shape.lightColor} dark:${shape.darkColor}
            backdrop-blur-sm border border-white/40 dark:border-white/10
            shadow-sm dark:shadow-none pointer-events-none`}
          style={{
            x: i % 2 === 0 ? shapeX1 : shapeX2,
            y: i % 2 === 0 ? shapeY1 : shapeY2,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            rotate: `${shape.rotate}deg`,
            clipPath: shape.type === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'none'
          }}
          animate={shape.animation}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut", // ✅ More organic feel
            delay: i * 0.3
          }}
          aria-hidden="true"
        />
      ))}

      {/* Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: `rgba(${
              particle.color === 'cyan' ? '56, 189, 248' : 
              particle.color === 'purple' ? '168, 85, 247' : 
              '59, 130, 246'
            }, 0.15)`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + particle.speed,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
          aria-hidden="true"
        />
      ))}

      {/* Floating icons with improved motion (Fix #2) */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            color: icon.color === 'cyan' ? '#0ea5e9' : 
                   icon.color === 'purple' ? '#a855f7' : 
                   '#3b82f6',
            opacity: 0.2,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4, // ✅ Desynchronized durations
            repeat: Infinity,
            ease: "easeInOut", // ✅ More organic feel
            delay: i * 0.5
          }}
          aria-hidden="true"
        >
          <icon.Icon size={icon.size} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl
          bg-gradient-to-br from-cyan-900/15 to-blue-900/15 pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl
          bg-gradient-to-br from-purple-900/15 to-pink-900/15 pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        aria-hidden="true"
      />
    </>
  );
}

function HeroHeadline({ title, description, showDescription }) {
  return (
    <>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl 
            leading-[1.05] font-semibold tracking-tight
            text-slate-800 dark:text-white mb-6">
            Ready to Innovate{" "}
            <span className="relative">
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r
                  from-cyan-600 via-purple-600 to-blue-600
                  dark:from-cyan-400 dark:via-purple-400 dark:to-blue-400
                  bg-[length:200%_100%]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Together?
              </motion.span>
              
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r 
                  from-cyan-500/30 via-purple-500/30 to-blue-500/30 
                  dark:from-cyan-400/30 dark:via-purple-400/30 dark:to-blue-400/30
                  rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
        </motion.div>
      </div>

      {/* ✅ Improved description with better hierarchy (Fix #7) */}
      {showDescription && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg
            text-slate-600/90 dark:text-slate-300/85 relative" // ✅ Reduced opacity
        >
          {description}
          <motion.span
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 
              bg-gradient-to-r from-cyan-600 to-purple-600
              dark:from-cyan-500 dark:to-purple-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
        </motion.p>
      )}
    </>
  );
}

function HeroFeatures() {
  // ✅ Memoized features
  const features = useMemo(() => [
    {
      icon: Zap,
      label: "Fast Setup",
      color: "text-cyan-600 dark:text-cyan-400",
    },
    {
      icon: Shield,
      label: "Enterprise Secure",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Users,
      label: "Human Support",
      color: "text-blue-600 dark:text-blue-400",
    },
  ], []);

  return (
    <div className="mt-12 flex flex-wrap justify-center gap-4">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5 + i * 0.1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{
            y: -6,
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
          }}
          className="relative group flex items-center gap-3 px-6 py-3 rounded-xl
            bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
            border border-slate-200 dark:border-slate-700
            shadow-lg dark:shadow-slate-900/30 cursor-pointer"
        >
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-lg bg-slate-100/50 dark:bg-slate-700/50"
          >
            <f.icon className={`w-4 h-4 ${f.color}`} />
          </motion.div>
          <span className="text-sm font-medium
            text-slate-800 dark:text-slate-200">
            {f.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function HeroCTA({ isMobile, ctaRef, magneticX, magneticY }) {
  const handleMagneticMove = (e) => {
    if (!ctaRef.current || isMobile) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.min(Math.sqrt(dx*dx + dy*dy), 150);

    // ✅ Distance-based magnetic effect (Fix #4)
    magneticX.set(dx * 0.15 * (distance / 150));
    magneticY.set(dy * 0.15 * (distance / 150));
  };

  const resetMagnetic = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: "spring" }}
      className="mt-16"
    >
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        {/* Primary CTA with focus styles (Fix #3) */}
        <motion.a
          ref={ctaRef}
          href="#contact-form"
          onMouseMove={!isMobile ? handleMagneticMove : undefined}
          onMouseLeave={!isMobile ? resetMagnetic : undefined}
          style={{ x: !isMobile ? magneticX : 0, y: !isMobile ? magneticY : 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }} // ✅ Micro-feedback (Fix #8)
          className="group relative inline-flex items-center gap-4 px-12 py-4 rounded-xl
            font-semibold text-white overflow-hidden shadow-xl
            focus:outline-none focus-visible:ring-4
            focus-visible:ring-cyan-500/50
            focus-visible:ring-offset-2
            focus-visible:ring-offset-transparent" // ✅ Accessibility (Fix #3)
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r 
            from-cyan-600 via-purple-600 to-blue-600
            dark:from-cyan-500 dark:via-purple-500 dark:to-blue-500" />
          
          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-r 
            from-cyan-700 via-purple-700 to-blue-700
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="relative w-4 h-4 text-white" />
          </motion.div>

          <span className="relative">Talk to Our Team</span>

          <ArrowRight className="relative w-4 h-4 transition-all duration-300
            group-hover:translate-x-2 group-hover:scale-110" />

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 blur-xl 
            bg-gradient-to-r from-cyan-600/30 to-purple-600/30 
            dark:from-cyan-500/20 dark:to-purple-500/20" />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </motion.a>

        {/* Secondary CTA */}
        <motion.a
          href="/docs"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="px-10 py-4 rounded-xl border border-slate-300 dark:border-slate-700
            text-slate-700 dark:text-slate-300 font-medium
            hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
            cursor-pointer"
        >
          View Docs
        </motion.a>
      </div>
    </motion.div>
  );
}

function HeroAnimatedIcons() {
  return (
    <div className="flex justify-center gap-8 mb-8">
      <motion.div
        animate={{ rotate: 360, y: [0, -10, 0] }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="p-3 rounded-full bg-white/40 backdrop-blur-sm border border-slate-200 
          dark:bg-slate-800/40 dark:border-slate-700 shadow-sm cursor-default"
      >
        <Gem className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ 
          scale: { duration: 2, repeat: Infinity },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" }
        }}
        className="p-3 rounded-full bg-white/40 backdrop-blur-sm border border-slate-200
          dark:bg-slate-800/40 dark:border-slate-700 shadow-sm cursor-default"
      >
        <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360, y: [0, 10, 0] }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="p-3 rounded-full bg-white/40 backdrop-blur-sm border border-slate-200
          dark:bg-slate-800/40 dark:border-slate-700 shadow-sm cursor-default"
      >
        <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </motion.div>
    </div>
  );
}

export default function ContactHero({
  title = "Ready to Innovate Together",
  description = "Transform your hiring process with AI-powered talent verification. Our team is here to help you succeed.",
  showDescription = true,
  showCTA = true,
}) {
  const ctaRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const magneticX = useSpring(0, { stiffness: 160, damping: 20 });
  const magneticY = useSpring(0, { stiffness: 160, damping: 20 });

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const shapeX1 = useTransform(smoothX, [0, 1000], [-20, 20]);
  const shapeY1 = useTransform(smoothY, [0, 1000], [-20, 20]);
  const shapeX2 = useTransform(smoothX, [0, 1000], [20, -20]);
  const shapeY2 = useTransform(smoothY, [0, 1000], [20, -20]);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (isMobile || reduceMotion) return;
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile, reduceMotion]);

  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden
      bg-gradient-to-br from-[#F9FAFB] via-white to-[#EEF2F7]
      dark:from-[#020617] dark:via-[#020024] dark:to-[#1E293B]"
    >

      {/* Background Effects */}
      <HeroBackgroundEffects 
        isMobile={isMobile}
        reduceMotion={reduceMotion}
        shapeX1={shapeX1}
        shapeY1={shapeY1}
        shapeX2={shapeX2}
        shapeY2={shapeY2}
      />

      {/* Content Container */}
      <div className="relative z-20 max-w-4xl px-6 text-center">
        {/* Animated Icons */}
        <HeroAnimatedIcons />

        {/* Headline & Description */}
        <HeroHeadline 
          title={title}
          description={description}
          showDescription={showDescription}
        />

        {/* Features */}
        <HeroFeatures />

        {/* CTA */}
        {showCTA && (
          <HeroCTA 
            isMobile={isMobile}
            ctaRef={ctaRef}
            magneticX={magneticX}
            magneticY={magneticY}
          />
        )}

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-2 h-2 rounded-full bg-cyan-500"
            />
            No sales pressure
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="inline-block w-2 h-2 rounded-full bg-purple-500"
            />
            Human reply within 24 hours
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="inline-block w-2 h-2 rounded-full bg-blue-500"
            />
            Free consultation
          </span>
        </motion.p>
      </div>

      {/* Edge gradients */}
      <div className="absolute top-0 left-0 w-full h-32 
        bg-gradient-to-b from-white to-transparent 
        dark:from-gray-950 dark:to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 
        bg-gradient-to-t from-white to-transparent 
        dark:from-gray-950 dark:to-transparent pointer-events-none" />
    </section>
  );
}