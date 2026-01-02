import { motion, useMotionValue, useReducedMotion, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, Users, Mail, Phone, MessageSquare, Send, Globe, AtSign, Link, Headphones, CheckCircle, Briefcase, Handshake } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function ContactHero({
  badge = "Let's Connect",
  title = "Ready to Innovate Together",
  description = "Transform your hiring process with AI-powered talent verification. Our team is here to help you succeed.",
  showBadge = true,
  showDescription = true,
  showCTA = true,
}) {
  const containerRef = useRef(null);
  const ctaRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  // Magnetic Button Physics
  const magneticX = useSpring(0, { stiffness: 150, damping: 15 });
  const magneticY = useSpring(0, { stiffness: 150, damping: 15 });

  // Smooth Parallax Values
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax transforms using smoothed values
  const x1 = useTransform(smoothX, [0, 1000], [-20, 20]);
  const y1 = useTransform(smoothY, [0, 1000], [-20, 20]);
  const x2 = useTransform(smoothX, [0, 1000], [-30, 30]);
  const y2 = useTransform(smoothY, [0, 1000], [-30, 30]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleMagneticMove = (e) => {
    if (!ctaRef.current || isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    if (Math.abs(distanceX) < 150 && Math.abs(distanceY) < 150) {
      magneticX.set(distanceX * 0.35);
      magneticY.set(distanceY * 0.35);
    } else {
      magneticX.set(0);
      magneticY.set(0);
    }
  };

  const resetMagnetic = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  // Feature highlights
  const features = [
    { icon: Zap, text: "Lightning Fast", color: "from-violet-500 to-purple-500" },
    { icon: Shield, text: "Enterprise Security", color: "from-purple-500 to-fuchsia-500" },
    { icon: Users, text: "24/7 Support", color: "from-fuchsia-500 to-pink-500" }
  ];

  // Contact icons for background
  const contactIcons = [
    { Icon: Mail, x: 15, y: 25, size: 32, depth: 40, delay: 0 },
    { Icon: Phone, x: 80, y: 70, size: 36, depth: 45, delay: 2 },
    { Icon: Send, x: 85, y: 20, size: 28, depth: 35, delay: 1 },
    { Icon: Headphones, x: 8, y: 45, size: 32, depth: 42, delay: 2.5 },
    { Icon: MessageSquare, x: 10, y: 60, size: 24, depth: 25, delay: 1.5 },
    { Icon: CheckCircle, x: 75, y: 15, size: 22, depth: 20, delay: 0.5 },
    { Icon: Handshake, x: 45, y: 85, size: 20, depth: 22, delay: 3 },
    { Icon: Briefcase, x: 25, y: 10, size: 18, depth: 18, delay: 2.5 },
    { Icon: AtSign, x: 90, y: 55, size: 24, depth: 28, delay: 1.2 },
    { Icon: Link, x: 40, y: 15, size: 16, depth: 10, delay: 4 },
    { Icon: Globe, x: 60, y: 80, size: 14, depth: 8, delay: 0.8 },
    { Icon: Users, x: 20, y: 85, size: 16, depth: 12, delay: 2.2 },
    { Icon: Sparkles, x: 70, y: 40, size: 14, depth: 6, delay: 3.5 },
    { Icon: Zap, x: 30, y: 50, size: 12, depth: 5, delay: 1.8 },
    { Icon: Shield, x: 55, y: 30, size: 12, depth: 4, delay: 4.5 },
  ];

  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 dark:from-neutral-950 dark:via-violet-950/10 dark:to-purple-950/10">

      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* 🖱️ Interactive Mouse Glow Overlay (Performance Guarded) */}
        {!shouldReduceMotion && !isMobile && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: useTransform(
                [smoothX, smoothY],
                ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.05), transparent 80%)`
              ),
            }}
            aria-hidden="true"
          />
        )}

        {/* Floating Orbs with Parallax */}
        <motion.div
          style={{ x: x1, y: y1 }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/20 dark:from-violet-500/10 dark:to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          style={{ x: x2, y: y2 }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-fuchsia-500/20 to-pink-500/20 dark:from-fuchsia-500/10 dark:to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* 🌐 Digital Network Layer (Connecting Threads) */}
        {!isMobile && !shouldReduceMotion && (
          <svg className="absolute inset-0 w-full h-full opacity-[0.05] dark:opacity-[0.08]" aria-hidden="true">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(139, 92, 246)" />
                <stop offset="100%" stopColor="rgb(236, 72, 153)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 100 Q 250 150 500 100 T 1000 100"
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="1"
              animate={{
                d: [
                  "M 0 100 Q 250 150 500 100 T 1000 100",
                  "M 0 120 Q 250 80 500 120 T 1000 120",
                  "M 0 100 Q 250 150 500 100 T 1000 100"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M 0 400 Q 300 350 600 400 T 1200 400"
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="1"
              animate={{
                d: [
                  "M 0 400 Q 300 350 600 400 T 1200 400",
                  "M 0 380 Q 300 420 600 380 T 1200 380",
                  "M 0 400 Q 300 350 600 400 T 1200 400"
                ]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </svg>
        )}

        {/* ✉️ Floating Contact Icons Background */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {contactIcons.map((item, i) => (
              <motion.div
                key={`contact-icon-${i}`}
                className="absolute text-indigo-500/20 dark:text-violet-400/10"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  x: useTransform(smoothX, [0, 2000], [item.depth * -1.5, item.depth * 1.5]),
                  y: useTransform(smoothY, [0, 2000], [item.depth * -1, item.depth * 1]),
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 8, -8, 0],
                    opacity: item.depth > 30 ? [0.15, 0.4, 0.15] : [0.05, 0.2, 0.05],
                  }}
                  transition={{
                    duration: 5 + (i % 3) * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay
                  }}
                >
                  <item.Icon size={item.size} strokeWidth={1.2} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Subtler Grid Pattern */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.015] dark:opacity-[0.01]"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >

            {/* Title - Premium Typography */}
            <motion.div variants={fadeUpVariants}>
              <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-[-0.03em] mb-8 mt-10">
                <motion.span
                  className="block font-semibold text-neutral-900 dark:text-white mb-1"
                  animate={shouldReduceMotion ? {} : {
                    opacity: [0.95, 1, 0.95]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Ready to Innovate
                </motion.span>
                <span className="relative inline-block font-extrabold pb-2">
                  <motion.span
                    className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-sky-400 inline-flex flex-wrap justify-center overflow-hidden"
                  >
                    {"Together?".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{
                          delay: 0.8 + i * 0.05,
                          duration: 0.8,
                          ease: [0.33, 1, 0.68, 1],
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>

                  {/* Animated Underline */}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500/40 via-purple-500/40 to-fuchsia-500/40 rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                  />

                  {/* Reduced Inner Glow */}
                  {!shouldReduceMotion && (
                    <motion.span
                      className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-violet-500/40 via-purple-500/40 to-fuchsia-500/40 blur-lg -z-10"
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      Together?
                    </motion.span>
                  )}
                </span>
              </h1>
            </motion.div>

            {/* Description - Refined Hierarchy */}
            {showDescription && (
              <motion.div variants={fadeUpVariants}>
                <p className="text-base md:text-lg leading-relaxed font-light tracking-wide max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400 opacity-90">
                  {description}
                </p>
              </motion.div>
            )}

            {/* Trust Chips - Calmer UI */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    <div className={`p-1 rounded-lg bg-gradient-to-r ${feature.color} opacity-80`}>
                      <feature.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-semibold tracking-wide text-neutral-500 dark:text-neutral-400 uppercase">
                      {feature.text}
                    </span>
                  </motion.div>
                  {index < features.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-800 hidden sm:block" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Heavy CTA Button with Magnetic Pull */}
            {showCTA && (
              <motion.div variants={fadeUpVariants} className="pt-6">
                <div className="flex flex-col items-center">
                  <motion.a
                    ref={ctaRef}
                    href="#contact-form"
                    tabIndex={0}
                    aria-label="Start your journey with our team"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={resetMagnetic}
                    style={{
                      x: magneticX,
                      y: magneticY,
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center gap-3 px-12 py-5 rounded-2xl font-bold text-base bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 text-white shadow-[0_20px_50px_rgba(79,70,229,0.3)] relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950"
                  >
                    {/* Controlled Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 2, repeat: 1, ease: "linear", delay: 1 }}
                    />

                    <span className="relative z-10 tracking-wide">Start Your Journey</span>
                    <motion.div
                      animate={{ x: [0, 2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5 relative z-10" />
                    </motion.div>
                  </motion.a>

                  {/* Conversion Anchor */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-4 text-xs font-medium text-neutral-500 dark:text-neutral-500 tracking-wide"
                  >
                    No sales pressure <span className="mx-2 opacity-30">•</span> Human reply within 24 hours
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Trust Indicators */}
            <motion.div
              variants={fadeUpVariants}
              className="pt-8 flex items-center justify-center gap-8 text-sm text-neutral-600 dark:text-neutral-400"
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Shield className="w-4 h-4 text-violet-600 dark:text-violet-500" />
                </motion.div>
                <span>Trusted by 500+ Companies</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Sparkles className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-500" />
                </motion.div>
                <span>Fast & Reliable</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent pointer-events-none" />

    </div>
  );
}