import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Moon, Sun, ArrowRight, Target, Trophy, Users } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import RightSectionWithLottie from "./RightSectionWithLottie";

// ENLARGED ANIMATION CONSTANTS WITH REDUCED MOTION SUPPORT
const createAnimations = (reduceMotion) => ({
  fadeInUp: {
    initial: { opacity: 0, y: reduceMotion ? 0 : 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15,
        delayChildren: reduceMotion ? 0 : 0.3
      }
    }
  }
});

// ========================================
// NEW GRADIENT SYSTEM WITH FRESH LIGHT THEME
// ========================================
const GRADIENTS = {
  brand: {
    light: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)", // Purple → Pink → Amber
    dark: "linear-gradient(135deg, #0891B2 0%, #7C3AED 50%, #059669 100%)", // Increased contrast
  },
  premium: {
    light: "linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B)", // Purple → Pink → Amber
    dark: "linear-gradient(135deg, #0891B2, #7C3AED, #059669)", // Increased contrast
  },
};

// USING GLOBAL THEME_TOKENS FROM utils/theme.js
import { THEME_TOKENS as GLOBAL_TOKENS } from "../../utils/theme";

// ========================================
// UPDATED LIGHT BACKGROUND WITH NEW COLORS
// ========================================
const LightBackground = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* New color scheme: Violet, Pink, Amber */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-25" />
        <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-pink-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-25" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-amber-100 rounded-full mix-blend-multiply filter blur-[90px] opacity-20" />
      </div>

      {/* Updated grid pattern color */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #8B5CF6 1.5px, transparent 0)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Updated particles with new colors */}
      {!shouldReduceMotion && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 3 + 'px',
            height: Math.random() * 6 + 3 + 'px',
            background: i % 3 === 0
              ? 'rgba(139, 92, 246, 0.4)' // Violet
              : i % 3 === 1
                ? 'rgba(236, 72, 153, 0.4)' // Pink
                : 'rgba(245, 158, 11, 0.4)', // Amber
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

const DarkBackground = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Reduced animated elements */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-900 rounded-full mix-blend-multiply filter blur-[150px] opacity-40" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-900 rounded-full mix-blend-multiply filter blur-[150px] opacity-40" />
      </div>

      {/* Reduced number of stars */}
      {!shouldReduceMotion && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            background: `rgba(96, 165, 250, ${0.4 + Math.random() * 0.6})`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

// ========================================
// UPDATED THEME TOGGLE WITH NEW COLORS
// ========================================
const ThemeToggle = ({ theme, toggleTheme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);

  return (
    <motion.button
      ref={buttonRef}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-8 right-8 z-50 p-3.5 rounded-full backdrop-blur-xl border shadow-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/50 transition-all"
      style={{
        background: theme === "light"
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.97), rgba(255, 255, 255, 0.9))"
          : "linear-gradient(135deg, rgba(17, 24, 39, 0.97), rgba(31, 41, 55, 0.9))",
        borderColor: theme === "light" ? "rgba(168, 85, 247, 0.25)" : "rgba(59, 130, 246, 0.3)",
        boxShadow: theme === "light" ? "0 25px 70px rgba(168, 85, 247, 0.15)" : "0 25px 70px rgba(37, 99, 235, 0.3)",
      }}
      animate={{
        scale: isHovered ? 1.15 : 1,
        rotate: isHovered ? 180 : 0,
      }}
      transition={{ duration: 0.4 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      role="switch"
      aria-checked={theme === 'dark'}
    >
      {theme === "light" ? (
        <Moon className="size-6 text-violet-600" aria-hidden="true" />
      ) : (
        <Sun className="size-6 text-yellow-400" aria-hidden="true" />
      )}
    </motion.button>
  );
};

// ========================================
// UPDATED GRADIENT BADGE WITH NEW COLORS
// ========================================
const GradientBadge = ({ theme, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl"
      style={{
        background: theme === "light"
          ? "rgba(139, 92, 246, 0.12)"
          : "rgba(96, 165, 250, 0.18)",
        border: `2px solid ${theme === "light" ? "rgba(139, 92, 246, 0.35)" : "rgba(96, 165, 250, 0.45)"}`,
        boxShadow: `0 8px 32px ${theme === "light" ? "rgba(139, 92, 246, 0.25)" : "rgba(96, 165, 250, 0.3)"}`,
      }}
      role="status"
      aria-label={text}
    >
      <motion.div
        animate={!shouldReduceMotion ? { rotate: isHovered ? 360 : 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Sparkles className={`size-5 ${theme === "light" ? "text-violet-600" : "text-blue-400"}`} aria-hidden="true" />
      </motion.div>
      <span
        className="text-base font-bold tracking-wider"
        style={{
          backgroundImage: GRADIENTS.brand[theme],
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {text}
      </span>
    </motion.div>
  );
};

// ========================================
// UPDATED CTA BUTTON WITH NEW GRADIENT
// ========================================
const PrimaryCTA = ({ theme, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const buttonRef = useRef(null);

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative px-8 py-4 rounded-2xl font-bold text-lg tracking-wide transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-violet-500/50 shadow-2xl"
      style={{
        background: GRADIENTS.brand[theme],
        color: "#FFFFFF",
      }}
      animate={!shouldReduceMotion ? {
        scale: isHovered ? 1.05 : 1,
        boxShadow: isHovered
          ? `0 20px 60px ${theme === 'light' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(37, 99, 235, 0.6)'}`
          : `0 10px 40px ${theme === 'light' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(37, 99, 235, 0.4)'}`,
      } : {}}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      aria-label="Start coding challenge - Join 15K+ developers"
      role="button"
    >
      <span className="flex items-center gap-3">
        Start Free Challenge
        <motion.span
          animate={!shouldReduceMotion ? { x: isHovered ? 8 : 0 } : {}}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </motion.span>
      </span>

      {/* Ripple effect */}
      {!shouldReduceMotion && (
        <motion.span
          className="absolute inset-0 rounded-2xl bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={isHovered ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
};

// ========================================
// UPDATED FEATURE PILLS WITH NEW COLORS
// ========================================
const FeaturePills = ({ theme }) => {
  const colorMap = {
    purple: { light: '#8B5CF6', dark: '#60A5FA' },
    pink: { light: '#EC4899', dark: '#3B82F6' },
    orange: { light: '#F59E0B', dark: '#06B6D4' }
  };

  const features = [
    { icon: Target, text: "Real Challenges", colorKey: 'purple' },
    { icon: Trophy, text: "Win Prizes", colorKey: 'pink' },
    { icon: Users, text: "15K+ Community", colorKey: 'orange' },
  ];

  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm border"
          style={{
            background: theme === 'light'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(31, 41, 55, 0.9)',
            borderColor: theme === 'light'
              ? 'rgba(139, 92, 246, 0.2)'
              : 'rgba(96, 165, 250, 0.3)',
          }}
          role="listitem"
        >
          <feature.icon
            className="size-3.5"
            style={{ color: colorMap[feature.colorKey][theme] }}
            aria-hidden="true"
          />
          <span
            className="text-xs font-medium whitespace-nowrap"
            style={{ color: theme === 'light' ? '#2E1065' : '#F8FAFC' }}
          >
            {feature.text}
          </span>
        </div>
      ))}
    </div>
  );
};

// ========================================
// MAIN COMPONENT - UPDATED LIGHT THEME
// ========================================
const HeroSection = ({ themeMode, onThemeToggle }) => {
  const shouldReduceMotion = useReducedMotion();
  const [internalTheme, setInternalTheme] = useState("light");

  const theme = themeMode || internalTheme;
  const toggleTheme = onThemeToggle || (() => setInternalTheme(prev => prev === "light" ? "dark" : "light"));

  const animations = useMemo(() => createAnimations(shouldReduceMotion), [shouldReduceMotion]);

  const handleCTAClick = () => {
    // Implement your CTA action here
    console.log('CTA clicked - redirect to signup/challenge');
    // Example: router.push('/signup')
  };

  useEffect(() => {
    if (!themeMode) { // Only manipulate DOM if self-managed or forced? Actually, standard theme behavior usually touches DOM. 
      // Let's keep it but maybe we should rely on parent? 
      // If parent manages it, parent might handle DOM. 
      // But for safety, let's keep consistency.
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
    // If themeMode is provided, we assume parent might handle global theme class, 
    // OR we should still handle it here to ensure this component looks right?
    // Given the component styling relies on CSS module/Tailwind classes that might depend on valid parent class... 
    // Actually, this component uses `tokens` object mostly.
    // But `dark:` variants in Tailwind need the class on html/body.
    if (themeMode) {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
  }, [theme, themeMode]);

  const tokens = useMemo(() => GLOBAL_TOKENS[theme], [theme]);

  return (
    <div
      className={`relative py-12 md:py-20 lg:py-24 overflow-hidden transition-all duration-500`}
      role="banner"
      aria-label="Hero section"
    >
      {/* Enhanced Background with reduced animations */}
      {theme === "light" ? <LightBackground /> : <DarkBackground />}

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-8 lg:pb-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
          variants={animations.staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* LEFT CONTENT - ENHANCED FOR MOBILE */}
          <motion.div
            className="lg:col-span-6 flex flex-col gap-8 text-center lg:text-left"
            variants={animations.fadeInUp}
          >
            <div className="flex flex-col items-center lg:items-start gap-6">
              <GradientBadge
                theme={theme}
                text="Join 15K+ Elite Developers"
              />

              {/* HEADLINE WITH UPDATED GRADIENTS */}
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                  <span className={`block ${tokens.textPrimary}`}>
                    Code Like a{" "}
                    <span className="relative inline-block">
                      <span className="absolute -inset-6 bg-gradient-to-r from-violet-500/25 to-pink-500/25 rounded-3xl blur-2xl" aria-hidden="true" />
                      <motion.span
                        className="relative z-10 bg-clip-text text-transparent"
                        style={{
                          backgroundImage: GRADIENTS.premium[theme],
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                        }}
                        animate={!shouldReduceMotion ? {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        } : {}}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        Pro
                      </motion.span>
                    </span>
                  </span>

                  <span className={`block ${tokens.textPrimary}`}>
                    <span className="relative">
                      Compete for{" "}
                      <motion.span
                        animate={!shouldReduceMotion ? {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        } : {}}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="inline-block bg-gradient-to-r from-violet-600 via-pink-600 to-amber-600 bg-[length:250%_auto] bg-clip-text text-transparent font-black"
                      >
                        Glory
                      </motion.span>
                    </span>
                  </span>

                  <span className={`block ${tokens.textPrimary}`}>
                    Build Your{" "}
                    <span className="relative">
                      <motion.span
                        className="inline-block"
                        animate={!shouldReduceMotion ? {
                          textShadow: [
                            "0 0 30px rgba(139, 92, 246, 0.6)",
                            "0 0 60px rgba(139, 92, 246, 1)",
                            "0 0 30px rgba(139, 92, 246, 0.6)"
                          ]
                        } : {}}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{
                          backgroundImage: theme === "light"
                            ? "linear-gradient(90deg, #8B5CF6, #EC4899)"
                            : "linear-gradient(90deg, #0891B2, #7C3AED)",
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        Legacy
                      </motion.span>
                    </span>
                  </span>
                </h1>

                {/* SUBTITLE WITH REDUCED ANIMATION */}
                <motion.p
                  className={`text-xl sm:text-1xl max-w-1xl mx-auto lg:mx-0 leading-relaxed ${tokens.textSecondary}`}
                  animate={!shouldReduceMotion ? {
                    opacity: [0.8, 1, 0.8],
                  } : {}}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Master real-world challenges. Showcase your skills. Get hired by top tech companies.
                </motion.p>
              </div>

              {/* FEATURE PILLS */}
              <div className="w-full">
                <FeaturePills theme={theme} />
              </div>

              {/* PRIMARY CTA BUTTON */}
              <div className="mt-1">
                <PrimaryCTA theme={theme} onClick={handleCTAClick} />
              </div>

              {/* ADDITIONAL ACCESSIBILITY: VISUALLY HIDDEN DESCRIPTION */}
              <div className="sr-only">
                <p>Interactive coding platform for developers to practice, compete, and get hired.</p>
                <p>Current theme: {theme} mode</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - LOTTIE ANIMATION WITH MOBILE OPTIMIZATION */}
          <motion.div
            className="lg:col-span-6 relative mt-8 lg:mt-0"
            variants={animations.fadeInUp}
          >
            <div className="relative" style={{ minHeight: '300px' }}>
              <RightSectionWithLottie
                theme={theme}
                fadeInUp={animations.fadeInUp}
              />
            </div>

            {/* REDUCED FLOATING ELEMENT */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute -top-6 -right-6 w-32 h-32 rounded-full z-0"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: `radial-gradient(circle, ${theme === "light" ? "rgba(139, 92, 246, 0.2)" : "rgba(96, 165, 250, 0.25)"} 0%, transparent 70%)`,
                  filter: 'blur(30px)',
                }}
                aria-hidden="true"
              />
            )}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;