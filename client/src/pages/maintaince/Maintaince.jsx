import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

// Intro overlay animation variants
const overlayVariants = {
  hidden: {
    height: 0,
  },
  visible: {
    height: "100%",
    overflow: "hidden",
    transition: {
      duration: 1.2,
      delay: 0,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    height: 0,
    top: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// Logo animation variants
const logoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
}

// Content animation variants
const contentVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// Glassmorphism card variants
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.5,
      ease: "easeOut",
    },
  },
}

// Generate random particles for background
const generateParticles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }))
}

export default function Maintance() {
  const [showIntro, setShowIntro] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const particles = generateParticles(30)

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 60
        setMousePosition({ x, y })
      }
    }

    if (!showIntro) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [showIntro])

  // Intro animation timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Base background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

      {/* Half Sun - Center */}
      <div
        className=" absolute rotate-180 bottom-50 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[900px] md:h-[900px] lg:w-[1100px] lg:h-[1100px] translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(59, 130, 246, 0.4) 35%, rgba(147, 51, 234, 0.5) 65%, transparent 100%)",
          clipPath: "ellipse(100% 50% at 50% 0%)",
          filter: "blur(100px)",
        }}
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 2px, transparent 2px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 2px, transparent 2px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: `radial-gradient(circle, ${
                particle.id % 3 === 0
                  ? "rgba(147, 51, 234, 0.6)"
                  : particle.id % 3 === 1
                  ? "rgba(236, 72, 153, 0.6)"
                  : "rgba(59, 130, 246, 0.6)"
              }, transparent)`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(particle.id) * 20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Mouse-responsive slow-moving particles */}
      <AnimatePresence>
        {!showIntro && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => {
              const speed = 0.08 + (i % 4) * 0.03 // Different speeds for variety (0.08 to 0.17)
              const baseX = (i % 5) * 25 - 50 // Spread particles horizontally (-50% to 50%)
              const baseY = (Math.floor(i / 5)) * 25 - 50 // Spread particles vertically (-50% to 50%)
              
              return (
                <motion.div
                  key={`mouse-particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${4 + (i % 4) * 1.5}px`,
                    height: `${4 + (i % 4) * 1.5}px`,
                    left: "50%",
                    top: "50%",
                    background: `radial-gradient(circle, ${
                      i % 3 === 0
                        ? "rgba(147, 51, 234, 0.7)"
                        : i % 3 === 1
                        ? "rgba(236, 72, 153, 0.7)"
                        : "rgba(59, 130, 246, 0.7)"
                    }, transparent)`,
                  }}
                  animate={{
                    x: `calc(${baseX}vw + ${mousePosition.x * speed}px)`,
                    y: `calc(${baseY}vh + ${mousePosition.y * speed}px)`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 30,
                    damping: 25,
                    mass: 0.8,
                  }}
                />
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Animated floating shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute opacity-5 dark:opacity-5"
          style={{
            width: `${60 + i * 20}px`,
            height: `${60 + i * 20}px`,
            left: `${(i * 12.5) % 100}%`,
            top: `${(i * 15) % 100}%`,
            background: `linear-gradient(${i * 45}deg, ${
              i % 3 === 0
                ? "rgba(147, 51, 234, 0.3)"
                : i % 3 === 1
                ? "rgba(236, 72, 153, 0.3)"
                : "rgba(59, 130, 246, 0.3)"
            }, transparent)`,
            clipPath: i % 2 === 0
              ? "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
              : "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -50, 0],
            x: [0, Math.sin(i) * 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Animated wavy lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-5" preserveAspectRatio="none">
        <motion.path
          d="M0,200 Q250,100 500,200 T1000,200"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          animate={{
            d: [
              "M0,200 Q250,100 500,200 T1000,200",
              "M0,250 Q250,150 500,250 T1000,250",
              "M0,200 Q250,100 500,200 T1000,200",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,400 Q250,300 500,400 T1000,400"
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          animate={{
            d: [
              "M0,400 Q250,300 500,400 T1000,400",
              "M0,350 Q250,250 500,350 T1000,350",
              "M0,400 Q250,300 500,400 T1000,400",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.5)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.5)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="50%" stopColor="rgba(147, 51, 234, 0.5)" />
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.5)" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3D Floating Orb with Parallax */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {/* Primary Floating Orb */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-30 blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, rgba(236, 72, 153, 0.5) 50%, rgba(59, 130, 246, 0.8) 100%)",
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
                y: [0, -60, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Secondary Orb */}
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 rounded-full opacity-25 blur-2xl"
              style={{
                background: "radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, rgba(59, 130, 246, 0.5) 100%)",
                transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
              }}
              animate={{
                scale: [1, 1.4, 1],
                x: [0, -30, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Third Orb */}
            <motion.div
              className="absolute top-1/2 right-1/3 w-40 h-40 md:w-56 md:h-56 rounded-full opacity-20 blur-2xl"
              style={{
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, rgba(147, 51, 234, 0.5) 100%)",
                transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                x: [0, 25, 0],
                y: [0, -25, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* 3D Geometric Shape - Floating Cube */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 opacity-10 dark:opacity-10"
              style={{
                transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                rotateZ: [0, 180],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                className="absolute inset-0 border border-black/10 dark:border-white/10"
                style={{
                  background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))",
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  backdropFilter: "blur(10px)",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Overlay Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-0 w-full bg-gradient-to-r from-violet-300 via-pink-300 to-blue-300 dark:from-violet-300 dark:via-pink-300 dark:to-blue-300 overflow-hidden z-50"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              exit={{ height: 0, top: 0 }}
              transition={{ ease: "easeInOut", duration: 1.2 }}
              className="absolute bottom-0 w-full bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-white/95 dark:via-white/90 dark:to-white/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
            >
              <motion.h1
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="font-bold text-7xl md:text-8xl bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight"
              >
                ProveIt.io
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 min-h-screen flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8"
          >
            {/* Status Badge */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/20 dark:bg-white/20 backdrop-blur-md border border-slate-700/30 dark:border-white/30 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-yellow-500 dark:bg-yellow-400 animate-pulse" />
                <span className="text-sm font-medium text-slate-900/90 dark:text-white/90">
                  Maintenance Mode
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-6 text-slate-900 dark:text-white drop-shadow-lg"
            >
              We're Building
              <br />
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-pink-100 dark:to-white bg-clip-text text-transparent">
                Something Powerful
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-white/80 text-center mb-12 max-w-2xl drop-shadow-md"
            >
              ProveIt.io is currently under maintenance.
              <br />
              We'll be back soon with exciting updates!
            </motion.p>

            {/* Footer Brand */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="mt-16"
            >
              <p className="text-slate-600 dark:text-white/60 text-sm font-medium">
                Powered by <span className="text-slate-800 dark:text-white/80 font-bold">ProveIt.io</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
