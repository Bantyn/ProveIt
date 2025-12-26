// src/features/ContactCom/ContactHero.jsx - THE NEURAL PARALLAX EDITION
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Mail, Github, Linkedin, Twitter,
  ArrowRight, Sparkles, MessageSquare,
  ExternalLink, ChevronRight, Sun, Moon,
  Zap, Activity, Cpu, Terminal,
  Hash, Send, Globe, Shield, Database, Cloud,
  Binary, Code2, Scan, Radar, Network,
  Fingerprint, FileKey, Smartphone, Wifi, Server, HardDrive, FileCheck
} from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// 🔌 Circuit Board: Silicon Traces and Pulsing Signals - HYPER ACTIVE
const CircuitBoard = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let traces = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      // INCREASED: More traces (15 -> 25) for denser circuitry
      traces = Array(25).fill(0).map(() => {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const width = Math.random() * 200 + 100;
        const vertical = Math.random() > 0.5;
        return {
          startX, startY,
          endX: vertical ? startX : startX + (Math.random() > 0.5 ? width : -width),
          endY: vertical ? startY + (Math.random() > 0.5 ? width : -width) : startY,
          pulse: Math.random(),
          // INCREASED: Faster movement (0.005 -> 0.01 base)
          speed: 0.01 + Math.random() * 0.02
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      traces.forEach(t => {
        ctx.beginPath();
        ctx.moveTo(t.startX, t.startY);
        ctx.lineTo(t.endX, t.endY);
        ctx.strokeStyle = darkMode ? 'rgba(59, 130, 246, 0.12)' : 'rgba(37, 99, 235, 0.08)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Pulsing Signal
        t.pulse += t.speed;
        if (t.pulse > 1) t.pulse = 0;

        const px = t.startX + (t.endX - t.startX) * t.pulse;
        const py = t.startY + (t.endY - t.startY) * t.pulse;

        ctx.beginPath();
        // INCREASED: Larger pulse head
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? `rgba(96, 165, 250, ${0.4 + Math.sin(t.pulse * Math.PI) * 0.8})` : `rgba(37, 99, 235, 0.5)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = darkMode ? "rgba(96, 165, 250, 0.8)" : "rgba(37, 99, 235, 0.5)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize(); draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, [darkMode]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-0" />;
};

// 📐 Vector Geometry (3D Wireframes) - FASTER ROTATION
const VectorGeometry = ({ darkMode }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let shapes = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); };
    const init = () => {
      shapes = Array(5).fill(0).map(() => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50, rotation: Math.random() * Math.PI * 2,
        // INCREASED: Faster rotation and drift
        vRot: (Math.random() - 0.5) * 0.015,
        vX: (Math.random() - 0.5) * 0.8,
        vY: (Math.random() - 0.5) * 0.8,
      }));
    };
    const drawHex = (x, y, size, rotation) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rotation + (i * Math.PI) / 3;
        const px = x + size * Math.cos(angle); const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = darkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(37, 99, 235, 0.1)';
      ctx.lineWidth = 1; ctx.stroke();
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(s => {
        s.x += s.vX; s.y += s.vY; s.rotation += s.vRot;
        if (s.x < -s.size) s.x = canvas.width + s.size; if (s.x > canvas.width + s.size) s.x = -s.size;
        if (s.y < -s.size) s.y = canvas.height + s.size; if (s.y > canvas.height + s.size) s.y = -s.size;
        drawHex(s.x, s.y, s.size, s.rotation);
        ctx.beginPath(); for (let i = 0; i < 3; i++) {
          const angle = s.rotation + (i * 2 * Math.PI) / 3;
          ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.size * Math.cos(angle), s.y + s.size * Math.sin(angle));
        }
        ctx.stroke();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    window.addEventListener('resize', resize); resize(); animate();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, [darkMode]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />;
};

// 🕸️ Quantum Nexus: Mesh with Signal Packets - HIGH DENSITY
const QuantumNexus = React.memo(({ darkMode }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let signalPackets = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); };
    const init = () => {
      particles = [];
      // INCREASED: Density (20000 -> 14000 divisor gives ~40% more particles)
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          // INCREASED: Particle velocity
          vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2 + 1, color: darkMode ? '96, 165, 250' : '37, 99, 235'
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update Ripples
      ripplesRef.current = ripplesRef.current.filter(r => {
        r.radius += r.speed; r.opacity *= 0.95;
        if (r.opacity > 0.01) {
          ctx.beginPath(); ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${darkMode ? '255,255,255' : '59,130,246'}, ${r.opacity * 0.3})`; ctx.lineWidth = 2; ctx.stroke();
          return true;
        }
        return false;
      });

      particles.forEach((p, i) => {
        let dx_dist = 0, dy_dist = 0;
        ripplesRef.current.forEach(r => {
          const dx = p.x - r.x, dy = p.y - r.y, dist = Math.sqrt(dx * dx + dy * dy), diff = dist - r.radius;
          if (Math.abs(diff) < 60) { // INCREASED interaction radius
            const force = (60 - Math.abs(diff)) / 60 * r.opacity * 15;
            const angle = Math.atan2(dy, dx); dx_dist += Math.cos(angle) * force; dy_dist += Math.sin(angle) * force;
          }
        });
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x, dy = mouseRef.current.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) { // INCREASED mouse influence radius
            const force = (180 - dist) / 180 * 4; // STRONGER force
            const angle = Math.atan2(dy, dx); dx_dist -= Math.cos(angle) * force; dy_dist -= Math.sin(angle) * force;
          }
        }
        p.x += p.vx + dx_dist; p.y += p.vy + dy_dist;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(${p.color}, 0.7)`; ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j], dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < 130) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color}, ${(130 - dist) / 130 * 0.2})`; ctx.lineWidth = 0.5; ctx.stroke();

            // INCREASED: More frequent signal packets
            if (Math.random() < 0.003) {
              signalPackets.push({ p1: p, p2: p2, progress: 0, speed: 0.05 + Math.random() * 0.05 });
            }
          }
        }
      });

      // Draw Signal Packets
      signalPackets = signalPackets.filter(s => {
        s.progress += s.speed;
        if (s.progress > 1) return false;
        const x = s.p1.x + (s.p2.x - s.p1.x) * s.progress;
        const y = s.p1.y + (s.p2.y - s.p1.y) * s.progress;
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); // Larger packets
        ctx.fillStyle = darkMode ? '#fff' : '#2563eb';
        ctx.shadowBlur = 4; ctx.shadowColor = "white"; // Glow effect
        ctx.fill(); ctx.shadowBlur = 0;
        return true;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY, active: true }; };
    const handleClick = (e) => { ripplesRef.current.push({ x: e.clientX, y: e.clientY, radius: 0, speed: 8, opacity: 1 }); };
    window.addEventListener('resize', resize); window.addEventListener('mousemove', handleMouseMove); window.addEventListener('click', handleClick);
    resize(); animate();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
});

// 🌫️ Atmospheric Haze - FASTER DRIFT
const AtmosphericHaze = ({ darkMode }) => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
    {[...Array(3)].map((_, i) => (
      <motion.div key={i} className={cn("absolute rounded-full blur-[120px] opacity-25", i === 0 ? (darkMode ? "bg-blue-600" : "bg-blue-400") : i === 1 ? (darkMode ? "bg-purple-600" : "bg-purple-400") : (darkMode ? "bg-indigo-600" : "bg-indigo-400"))}
        // FASTER ANIMATION
        animate={{ x: [Math.random() * 100 + "%", Math.random() * 100 + "%"], y: [Math.random() * 100 + "%", Math.random() * 100 + "%"], scale: [1, 1.3, 0.9, 1] }}
        transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: 500 + i * 100 + "px", height: 500 + i * 100 + "px", left: "-20%", top: "-20%" }} />
    ))}
  </div>
);

// 🌧️ Code Streams - MORE DENSE & FAST
const CodeRain = ({ darkMode }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d');
    let animationFrameId; const chars = "0101<>[]{}/\\#%&*+=-_~".split(""); let columns = []; const fontSize = 14;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; const count = Math.floor(canvas.width / fontSize); columns = Array(count).fill(0).map(() => ({ y: Math.random() * canvas.height, speed: Math.random() * 3 + 1, opacity: Math.random() * 0.4 })); };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.font = fontSize + "px monospace";
      columns.forEach((col, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = darkMode ? `rgba(96, 165, 250, ${col.opacity})` : `rgba(37, 99, 235, ${col.opacity * 0.6})`;
        ctx.fillText(char, i * fontSize, col.y); col.y += col.speed; if (col.y > canvas.height) col.y = -fontSize;
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    window.addEventListener('resize', resize); resize(); draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, [darkMode]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-30" />;
};

// 📺 UI Overlay
const DigitalOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%]" />
    <motion.div animate={{ y: ["-100%", "100%"] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="w-full h-[40%] bg-gradient-to-b from-transparent via-blue-500/5 to-transparent absolute" />
  </div>
);

// ⌨️ Kinetic Typography
const KineticTitle = ({ text, darkMode }) => {
  const letters = text.split("");
  return (
    <h1 className={cn("text-7xl md:text-[9rem] lg:text-[11rem] font-black tracking-tighter mb-10 leading-none flex justify-center", darkMode ? "text-white" : "text-gray-900")}>
      {letters.map((char, i) => (
        <motion.span key={i} initial={{ y: 80, opacity: 0, scale: 0.8, filter: "blur(15px)" }} animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }} className={cn("bg-clip-text text-transparent bg-gradient-to-r inline-block", darkMode ? "from-cyan-400 via-violet-400 to-fuchsia-400" : "from-cyan-600 via-violet-600 to-fuchsia-600")}>
          {char}
        </motion.span>
      ))}
    </h1>
  );
};

// 💎 Connection Card
const ConnectionCard = ({ node, isHovered, onHover, onLeave, darkMode }) => {
  const Icon = node.icon;
  return (
    <motion.div className="absolute z-30" style={{ left: `${node.x}%`, top: `${node.y}%` }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: node.delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
      <div className="relative group" onMouseEnter={() => onHover(node.id)} onMouseLeave={onLeave}>
        <motion.div
          animate={{
            y: [0, -12, 0],
            x: [0, 8, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={cn(
            "relative w-11 h-11 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-500",
            darkMode ? "bg-white/5 backdrop-blur-md border border-white/10" : "bg-black/5 backdrop-blur-md border border-black/10",
            isHovered && (darkMode ? "ring-2 ring-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.4)]" : "ring-2 ring-blue-600 shadow-[0_0_25px_rgba(37,99,235,0.15)]")
          )}
        >
          <Icon className={cn("w-4.5 h-4.5 transition-all duration-500", isHovered ? (darkMode ? "text-blue-400 scale-110" : "text-blue-600 scale-110") : (darkMode ? "text-white/60" : "text-black/50"))} />
        </motion.div>
        <AnimatePresence>
          {isHovered && (
            <motion.div initial={{ opacity: 0, x: 20, scale: 0.95 }} animate={{ opacity: 1, x: 55, scale: 1 }} exit={{ opacity: 0, x: 20, scale: 0.95 }} className={cn("absolute top-0 left-0 w-64 p-5 rounded-2xl backdrop-blur-2xl border shadow-2xl z-50 pointer-events-none transition-colors", darkMode ? "bg-gray-900/95 border-white/10" : "bg-white/98 border-black/10")}>
              <div className="flex items-center gap-2 mb-3">
                <Activity className={cn("w-3 h-3", darkMode ? "text-blue-400" : "text-blue-600")} />
                <span className={cn("text-[9px] font-bold tracking-widest uppercase", darkMode ? "text-blue-400/80" : "text-blue-600/80")}>Protocol Linked</span>
              </div>
              <h3 className={cn("font-bold text-lg mb-1", darkMode ? "text-white" : "text-gray-900")}>{node.title}</h3>
              <p className={cn("text-xs mb-4 leading-relaxed", darkMode ? "text-white/50" : "text-gray-600")}>{node.description}</p>
              <div className={cn("flex items-center justify-between text-[10px] font-mono", darkMode ? "text-white/30" : "text-gray-400")}><span>{node.handle}</span><ExternalLink className="w-3 h-3" /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// 💠 Floating Icon Cloud: Decorative Background Layer
const FloatingIcons = ({ darkMode }) => {
  // UPDATED: Expanded set with "Verification & Proof" themed icons
  const icons = [
    Binary, Code2, Cpu, Terminal, Globe, Shield, Database, Network,
    Scan, Radar, Zap, Activity, Fingerprint, FileKey, Smartphone,
    Wifi, Server, HardDrive, FileCheck
  ];
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => { // INCREASED count for more density
        const Icon = icons[i % icons.length];
        const size = 15 + Math.random() * 20;
        return (
          <motion.div
            key={i}
            className={cn("absolute opacity-[0.05]", darkMode ? "text-white" : "text-black")}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 45, 0],
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}
    </div>
  );
};

const ConnectHero = ({ darkMode, setDarkMode }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse Parallax Engine
  const mouseX = useSpring(0, { damping: 50, stiffness: 450 });
  const mouseY = useSpring(0, { damping: 50, stiffness: 450 });
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseX.set(x); mouseY.set(y);
  };

  const p1X = useTransform(mouseX, x => x * -20); const p1Y = useTransform(mouseY, y => y * -20);
  const p2X = useTransform(mouseX, x => x * -40); const p2Y = useTransform(mouseY, y => y * -40);
  const p3X = useTransform(mouseX, x => x * -60); const p3Y = useTransform(mouseY, y => y * -60);
  const pDeepX = useTransform(mouseX, x => x * -10); const pDeepY = useTransform(mouseY, y => y * -10);

  const nodes = [
    { id: 'mail', icon: Mail, x: 15, y: 18, title: 'Direct Transmission', description: 'Immediate response protocol for serious inquiries.', handle: 'hello@proveit.io', delay: 0.2 },
    { id: 'github', icon: Github, x: 82, y: 15, title: 'Source Protocol', description: 'Review our infrastructure and architecture.', handle: 'github.com/proveit', delay: 0.4 },
    { id: 'linkedin', icon: Linkedin, x: 12, y: 75, title: 'Professional Core', description: 'Synchronize career and talent opportunities.', handle: 'linkedin.com/proveit', delay: 0.6 },
    { id: 'twitter', icon: Twitter, x: 88, y: 78, title: 'Neural Feed', description: 'Real-time platform updates and insights.', handle: '@ProveItIO', delay: 0.8 },
    { id: 'discord', icon: MessageSquare, x: 50, y: 82, title: 'Signal Ground', description: 'Collaborative hub for high-performance teams.', handle: 'discord.gg/proveit', delay: 1.0 },
    { id: 'slack', icon: Hash, x: 10, y: 45, title: 'Internal Comms', description: 'Real-time synchronization for core partners.', handle: 'proveit.slack.com', delay: 1.2 },
    { id: 'telegram', icon: Send, x: 85, y: 42, title: 'Encrypted Link', description: 'Secure, high-speed burst communication.', handle: 't.me/proveit', delay: 1.4 },
    { id: 'status', icon: Activity, x: 10, y: 85, title: 'Core Status', description: 'Live telemetry and infrastructure uptime.', handle: 'status.proveit.io', delay: 1.6 },
  ];

  return (
    <div className={cn("relative w-full h-[100vh] overflow-hidden flex items-center justify-center font-sans transition-colors duration-1000", darkMode ? "bg-black" : "bg-gray-50")} onMouseMove={handleMouseMove}>
      {/* Deepest Background Layer */}
      <motion.div style={{ x: pDeepX, y: pDeepY }} className="absolute inset-0 z-0">
        <FloatingIcons darkMode={darkMode} />
      </motion.div>

      {/* Deep Background Layers */}
      <motion.div style={{ x: p1X, y: p1Y }} className="absolute inset-0 z-0">
        <AtmosphericHaze darkMode={darkMode} />
        <CircuitBoard darkMode={darkMode} />
      </motion.div>

      {/* Mid Background Layers */}
      <motion.div style={{ x: p2X, y: p2Y }} className="absolute inset-0 z-10">
        <VectorGeometry darkMode={darkMode} />
        <CodeRain darkMode={darkMode} />
      </motion.div>

      {/* Foreground Background Layer */}
      <motion.div style={{ x: p3X, y: p3Y }} className="absolute inset-0 z-20">
        <QuantumNexus darkMode={darkMode} />
        <DigitalOverlay />
      </motion.div>

      {/* Main Content */}
      <div className="container relative z-30 px-6 pointer-events-none">
        <motion.div style={{ opacity }} className="text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-10 transition-colors", darkMode ? "bg-white/5 border-white/10" : "bg-white/90 border-gray-200 shadow-sm")}>
            <Zap className={cn("w-3.5 h-3.5 animate-pulse", darkMode ? "text-blue-400" : "text-blue-600")} />
            <span className={cn("text-[10px] font-bold tracking-[0.4em] uppercase", darkMode ? "text-white/80" : "text-gray-900/80")}>Neural_Vortex_Active</span>
          </motion.div>

          <KineticTitle text="Connect" darkMode={darkMode} />

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className={cn("text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-14 transition-colors px-4", darkMode ? "text-white/50" : "text-gray-500")}>
            Synchronize with the next-generation proof layers. Bridge vision and verification through the atmospheric nexus.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pointer-events-auto">
            <motion.button whileHover={{ scale: 1.05, y: -2, boxShadow: darkMode ? "0 0 30px rgba(59,130,246,0.3)" : "0 0 30px rgba(37,99,235,0.15)" }} whileTap={{ scale: 0.95 }} className={cn("group relative px-12 py-5 font-bold rounded-2xl overflow-hidden shadow-2xl transition-all duration-500", darkMode ? "bg-white text-black" : "bg-gray-900 text-white")}>
              <div className="relative z-10 flex items-center gap-3">
                Initialize Linking <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
              <motion.div className="absolute inset-0 bg-blue-500/10" initial={{ x: "-100%" }} whileHover={{ x: "0%" }} transition={{ duration: 0.4 }} />
            </motion.button>
            <button className={cn("flex items-center gap-2 text-sm font-bold tracking-widest group transition-colors", darkMode ? "text-white/40 hover:text-white" : "text-gray-400 hover:text-gray-900")}>
              Protocol Spec <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-40">
        {nodes.map(node => (
          <ConnectionCard key={node.id} node={node} isHovered={hoveredNode === node.id} onHover={setHoveredNode} onLeave={() => setHoveredNode(null)} darkMode={darkMode} />
        ))}
      </div>

      <div className="absolute bottom-10 left-10 right-10 z-50 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex items-center gap-12 text-center md:text-left">
          <div className="flex flex-col gap-1.5">
            <span className={cn("text-[8px] font-bold tracking-[0.3em] text-opacity-40 uppercase", darkMode ? "text-white" : "text-black")}>Atmospheric Engine</span>
            <div className="flex items-center gap-2.5">
              <Cpu className={cn("w-3.5 h-3.5", darkMode ? "text-blue-400" : "text-blue-600")} />
              <span className={cn("text-[11px] font-mono font-bold", darkMode ? "text-white/80" : "text-gray-900")}>VOLTS_v2.5_EXT</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className={cn("text-[8px] font-bold tracking-[0.3em] text-opacity-40 uppercase", darkMode ? "text-white" : "text-black")}>Neural Traces</span>
            <div className="flex items-center gap-2">
              <Activity className={cn("w-3.5 h-3.5", darkMode ? "text-blue-400" : "text-blue-600")} />
              <span className={cn("text-[11px] font-mono font-bold", darkMode ? "text-white/80" : "text-gray-900")}>ACTIVE_SYNC_STABLE</span>
            </div>
          </div>
        </div>
        <button className={cn("p-4 rounded-full border transition-all pointer-events-auto hover:scale-110 active:scale-95", darkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-gray-200 text-gray-900 shadow-md")} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-indigo-600" />}
        </button>
      </div>
    </div>
  );
};

export default ConnectHero;
