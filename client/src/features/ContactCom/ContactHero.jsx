// src/components/ConnectHero.jsx - ELITE EDITION
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionValueEvent, animate } from 'framer-motion';
import {
  Mail, Phone, MessageSquare, Github, Linkedin, Twitter,
  ArrowRight, MapPin, Instagram, Youtube, Globe, Calendar,
  Figma, Code, Camera, Headphones, Sparkles, Cloud,
  Wifi, Cpu, Shield, Database
} from 'lucide-react';

// Simple class name utility
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// 🌟 IMPROVEMENT 1: Global Animation Clock
const useGlobalClock = () => {
  const time = useMotionValue(0);
  
  useEffect(() => {
    let animationFrameId;
    
    const updateTime = () => {
      time.set(performance.now() / 1000);
      animationFrameId = requestAnimationFrame(updateTime);
    };
    
    animationFrameId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animationFrameId);
  }, [time]);
  
  return time;
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: 0.3,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

// 🌟 IMPROVEMENT 2: Light Trails Background Layer
const LightTrails = React.memo(() => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none z-0">
      <defs>
        <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="30%" stopColor="rgba(168,85,247,0.3)" />
          <stop offset="70%" stopColor="rgba(59,130,246,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      
      {/* Multiple curved paths at different depths */}
      {[...Array(8)].map((_, i) => (
        <motion.path
          key={i}
          d={`
            M ${-200 + i * 50} ${200 + i * 80}
            C ${400} ${100 + i * 60}, 
              ${800} ${500 - i * 70}, 
              ${1400} ${300 + i * 40}
          `}
          fill="none"
          stroke="url(#trailGradient)"
          strokeWidth="0.8"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: [0.1, 0.3, 0.1],
            pathOffset: [0, 1]
          }}
          transition={{
            duration: 20 + i * 4,
            repeat: Infinity,
            ease: "linear",
            opacity: {
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}
    </svg>
  );
});

LightTrails.displayName = 'LightTrails';

// Floating Node Component - OPTIMIZED with global clock
const FloatingNode = React.memo(({ node, clock, mouseX, mouseY, index }) => {
  const Icon = node.icon;
  const [isHovered, setIsHovered] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  
  const x = useMotionValue(node.x);
  const y = useMotionValue(node.y);
  
  const springX = useSpring(x, { stiffness: 150, damping: 25, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 25, mass: 0.5 });
  
  // 🌟 IMPROVEMENT 3: Magnetic effect using global clock
  useMotionValueEvent(clock, "change", (time) => {
    // Base floating animation
    const baseX = Math.sin(time * node.floatSpeedX * 0.8 + index) * node.floatAmplitudeX;
    const baseY = Math.cos(time * node.floatSpeedY * 1.2 + index * 1.5) * node.floatAmplitudeY;
    
    // Add subtle noise
    const noiseX = Math.sin(time * 0.3 + index * 2) * node.floatAmplitudeX * 0.3;
    const noiseY = Math.cos(time * 0.4 + index * 3) * node.floatAmplitudeY * 0.3;
    
    x.set(node.x + baseX + noiseX);
    y.set(node.y + baseY + noiseY);
  });
  
  // Magnetic effect
  const magneticRadius = 150;
  const magneticStrength = 0.25;
  
  const magneticInfluenceX = useTransform(
    [springX, mouseX],
    ([latestX, latestMouseX]) => {
      const distanceX = latestMouseX - latestX;
      const distanceY = mouseY.get() - springY.get();
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (distance < magneticRadius) {
        const force = (1 - distance / magneticRadius) * magneticStrength;
        return latestX + distanceX * force;
      }
      return latestX;
    }
  );
  
  const magneticInfluenceY = useTransform(
    [springY, mouseY],
    ([latestY, latestMouseY]) => {
      const distanceX = mouseX.get() - springX.get();
      const distanceY = latestMouseY - latestY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (distance < magneticRadius) {
        const force = (1 - distance / magneticRadius) * magneticStrength;
        return latestY + distanceY * force;
      }
      return latestY;
    }
  );
  
  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
  }, []);
  
  return (
    <motion.div
      className="absolute z-20 cursor-pointer group pointer-events-auto"
      style={{
        x: magneticInfluenceX,
        y: magneticInfluenceY,
      }}
      whileHover="hover"
      whileTap="tap"
      onHoverStart={handleHoverStart}
      onHoverEnd={() => setIsHovered(false)}
      variants={{
        hover: { scale: 1.15 },
        tap: { scale: 0.95 }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 25 
      }}
    >
      <motion.div className="relative">
        {/* Ripple effect */}
        {showRipple && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2"
            style={{ borderColor: node.color }}
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
        
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-xl blur-lg"
          style={{ backgroundColor: node.color }}
          animate={{ 
            opacity: isHovered ? 0.4 : 0.15,
            scale: isHovered ? 1.3 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Node */}
        <div className={cn(
          "relative p-3 backdrop-blur-xl rounded-xl border",
          "transition-all duration-300",
          "group-hover:shadow-xl",
          "bg-gradient-to-br from-white/5 to-white/10",
          "border-white/20 group-hover:border-white/40"
        )}>
          <Icon className="w-5 h-5 text-white relative z-10" />
        </div>
        
        {/* Tooltip */}
        <motion.div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-3 py-2 
                     bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl 
                     border border-white/10 rounded-lg whitespace-nowrap pointer-events-none 
                     shadow-xl z-30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-white/90">
              {node.label}
            </span>
          </div>
          <div className="text-sm font-bold text-white">
            {node.value}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

FloatingNode.displayName = 'FloatingNode';

// 🌟 IMPROVEMENT 4: Enhanced Particle Network with Node Awareness
const EnhancedParticleNetwork = React.memo(({ nodes, networkOpacity, mousePosition }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const signals = useRef([]);
  const animationRef = useRef();
  const rafId = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !nodes.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = 'lighter';
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    // Initialize particles
    const initParticles = () => {
      const particleCount = 50;
      particles.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width / window.devicePixelRatio,
          y: Math.random() * canvas.height / window.devicePixelRatio,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1 + 0.5,
          opacity: Math.random() * 0.1 + 0.05,
          hue: 220 + Math.random() * 40,
          size: Math.random() * 1.5 + 0.5,
          trail: []
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      const currentOpacity = networkOpacity.get();
      const { width, height } = canvas;
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = width / dpr;
      const displayHeight = height / dpr;

      // Clear with fade effect
      ctx.fillStyle = `rgba(0, 0, 0, ${0.05})`;
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Update and draw signals
      signals.current = signals.current.filter(signal => {
        signal.radius += 2;
        signal.opacity *= 0.96;
        
        if (signal.opacity > 0.01) {
          ctx.beginPath();
          ctx.arc(signal.x, signal.y, signal.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(168, 85, 247, ${signal.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          return true;
        }
        return false;
      });

      // Update and draw particles
      particles.current.forEach((particle, i) => {
        // 🌟 NODE AWARENESS: Attract to nearest node
        let nearestNode = null;
        let minDistance = Infinity;
        
        nodes.forEach(node => {
          const dx = node.x - particle.x;
          const dy = node.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200 && distance < minDistance) {
            minDistance = distance;
            nearestNode = { dx, dy, distance };
          }
        });

        if (nearestNode) {
          const force = (1 - nearestNode.distance / 200) * 0.02;
          particle.vx += nearestNode.dx * force * 0.01;
          particle.vy += nearestNode.dy * force * 0.01;
        }

        // Mouse interaction
        const mouseDx = mousePosition.current.x - particle.x;
        const mouseDy = mousePosition.current.y - particle.y;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        
        if (mouseDist < 120) {
          const force = (1 - mouseDist / 120) * 0.03;
          particle.vx -= (mouseDx / mouseDist) * force;
          particle.vy -= (mouseDy / mouseDist) * force;
        }

        // Apply velocity with damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary handling
        const padding = 50;
        if (particle.x < -padding || particle.x > displayWidth + padding) particle.vx *= -0.8;
        if (particle.y < -padding || particle.y > displayHeight + padding) particle.vy *= -0.8;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${particle.opacity * currentOpacity * 2})`;
        ctx.fill();

        // Draw connections
        particles.current.slice(i + 1).forEach(otherParticle => {
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 0.05 * (1 - distance / 150) * currentOpacity;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
      });

      rafId.current = requestAnimationFrame(animate);
    };

    animationRef.current = animate();
    rafId.current = requestAnimationFrame(animate);

    // Add signal on node hover simulation (for demo)
    const interval = setInterval(() => {
      if (nodes.length > 0 && Math.random() > 0.7) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        signals.current.push({
          x: randomNode.x,
          y: randomNode.y,
          radius: 5,
          opacity: 0.3
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', setupCanvas);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [nodes, networkOpacity, mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
});

EnhancedParticleNetwork.displayName = 'EnhancedParticleNetwork';

// Main Component - Elite Edition
const ConnectHero = () => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const networkOpacity = useMotionValue(0.08);
  const [ctaHovered, setCtaHovered] = useState(false);
  
  // 🌟 Global animation clock
  const globalClock = useGlobalClock();

  // Screen size
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Network opacity based on CTA hover
  useEffect(() => {
    animate(networkOpacity, ctaHovered ? 0.2 : 0.08, {
      duration: 0.5,
      ease: "easeOut"
    });
  }, [ctaHovered, networkOpacity]);

  // Memoized nodes
  const floatingNodes = useMemo(() => {
    if (screenSize.width === 0) return [];
    
    const nodes = [
      { id: 'email', icon: Mail, label: 'Email', value: 'hello@studio.com', color: '#60A5FA' },
      { id: 'phone', icon: Phone, label: 'Phone', value: '+91 98243xxxxx', color: '#34D399' },
      { id: 'github', icon: Github, label: 'GitHub', value: '@studio', color: '#9CA3AF' },
      { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', value: 'in/studio', color: '#0A66C2' },
      { id: 'twitter', icon: Twitter, label: 'Twitter', value: '@studio', color: '#1DA1F2' },
      { id: 'chat', icon: MessageSquare, label: 'Chat', value: 'Start chat', color: '#A78BFA' },
      { id: 'instagram', icon: Instagram, label: 'Instagram', value: '@studio.design', color: '#E4405F' },
      { id: 'figma', icon: Figma, label: 'Figma', value: 'Community', color: '#F24E1E' },
      { id: 'code', icon: Code, label: 'API', value: 'docs.studio.io', color: '#3B82F6' },
      { id: 'globe', icon: Globe, label: 'Website', value: 'studio.io', color: '#10B981' },
    ];

    // Distribute nodes around screen with good spacing
    const grid = [
      [0.15, 0.2], [0.25, 0.1], [0.85, 0.15], [0.75, 0.25],
      [0.2, 0.8], [0.1, 0.7], [0.8, 0.85], [0.9, 0.75],
      [0.5, 0.5], [0.5, 0.9]
    ];

    return nodes.map((node, i) => {
      const [xPercent, yPercent] = grid[i] || [0.5, 0.5];
      return {
        ...node,
        x: screenSize.width * xPercent,
        y: screenSize.height * yPercent,
        floatAmplitudeX: 20 + Math.random() * 25,
        floatAmplitudeY: 20 + Math.random() * 25,
        floatSpeedX: 0.1 + Math.random() * 0.1,
        floatSpeedY: 0.1 + Math.random() * 0.1
      };
    });
  }, [screenSize]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-950">
      {/* 🌟 Background Layers (Depth Stack) */}
      
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {/* Aurora Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
             style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
             style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)' }} />
      </div>
      
      {/* 🌟 Light Trails Layer */}
      <LightTrails />
      
      {/* 🌟 Enhanced Particle Network */}
      {screenSize.width > 0 && (
        <EnhancedParticleNetwork 
          nodes={floatingNodes}
          networkOpacity={networkOpacity}
          mousePosition={mousePosition}
        />
      )}
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
           }} />
      
      {/* Floating Nodes */}
      <div className="absolute inset-0 z-10">
        {floatingNodes.map((node, index) => (
          <FloatingNode
            key={node.id}
            node={node}
            clock={globalClock}
            mouseX={mouseX}
            mouseY={mouseY}
            index={index}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <motion.div
        className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.div 
          className="relative pointer-events-auto mb-4"
          variants={textVariants}
        >
          <h1 className="text-[clamp(5rem,15vw,10rem)] font-black tracking-tighter text-center 
                        bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
                        animate-gradient bg-[length:200%_auto] leading-[0.85]">
            Connect
          </h1>
        </motion.div>
        
        {/* Subtitle */}
        <motion.div
          className="max-w-2xl mx-auto mt-8 pointer-events-auto"
          variants={textVariants}
        >
          <p className="text-xl text-center font-light leading-relaxed px-4 text-white/60">
            Where digital ether meets human intention.
            <br />
            A constellation of possibilities awaiting your signal.
          </p>
        </motion.div>
        
        {/* 🌟 CTA Button with Network Interaction */}
        <motion.button
          className="group relative mt-12 px-10 py-4 rounded-2xl border backdrop-blur-xl pointer-events-auto
                     bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/20 
                     hover:border-white/40 text-white transition-all duration-500"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          onHoverStart={() => setCtaHovered(true)}
          onHoverEnd={() => setCtaHovered(false)}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.8, duration: 0.6 }
            }
          }}
        >
          <div className="relative z-10 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-lg font-semibold tracking-wide">
              Initiate Connection
            </span>
            <ArrowRight className="w-5 h-5 text-pink-400" />
          </div>
          
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl blur-xl -z-10 opacity-30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)'
            }}
          />
        </motion.button>
        
        {/* Status */}
        <motion.div
          className="mt-8 flex items-center gap-2 text-sm text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Network Active • {floatingNodes.length} Connection Points</span>
        </motion.div>
      </motion.div>
      
      {/* Global CSS */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ConnectHero;