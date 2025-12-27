// // src/features/ContactCom/ContactHero.jsx - THE NEURAL PARALLAX EDITION
// import React, { useRef, useEffect, useState, useMemo } from 'react';
// import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
// import {
//   Mail, Github, Linkedin, Twitter,
//   ArrowRight, Sparkles, MessageSquare,
//   ExternalLink, ChevronRight, Sun, Moon,
//   Zap, Activity, Cpu, Terminal,
//   Hash, Send, Globe, Shield, Database, Cloud,
//   Binary, Code2, Scan, Radar, Network,
//   Fingerprint, FileKey, Smartphone, Wifi, Server, HardDrive, FileCheck
// } from 'lucide-react';

// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // 🔌 Circuit Board: Silicon Traces and Pulsing Signals - HYPER ACTIVE
// const CircuitBoard = ({ darkMode }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     let animationFrameId;

//     let traces = [];
//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       init();
//     };

//     const init = () => {
//       // LOW DENSITY + HIGH SPEED: Minimal traces, high activity
//       traces = Array(8).fill(0).map(() => {
//         const startX = Math.random() * canvas.width;
//         const startY = Math.random() * canvas.height;
//         const width = Math.random() * 300 + 200;
//         const vertical = Math.random() > 0.5;
//         return {
//           startX, startY,
//           endX: vertical ? startX : startX + (Math.random() > 0.5 ? width : -width),
//           endY: vertical ? startY + (Math.random() > 0.5 ? width : -width) : startY,
//           pulse: Math.random(),
//           speed: 0.015 + Math.random() * 0.02
//         };
//       });
//     };

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       traces.forEach(t => {
//         ctx.beginPath();
//         ctx.moveTo(t.startX, t.startY);
//         ctx.lineTo(t.endX, t.endY);
//         ctx.strokeStyle = darkMode ? 'rgba(59, 130, 246, 0.12)' : 'rgba(37, 99, 235, 0.08)';
//         ctx.lineWidth = 1.5;
//         ctx.stroke();
//       });
//       animationFrameId = requestAnimationFrame(draw);
//     };

//     window.addEventListener('resize', resize);
//     resize(); draw();
//     return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
//   }, [darkMode]);

//   return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-0" />;
// };

// // 📐 Vector Geometry (3D Wireframes) - FASTER ROTATION
// const VectorGeometry = ({ darkMode }) => {
//   const canvasRef = useRef(null);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     let animationFrameId;
//     let shapes = [];
//     const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); };
//     const init = () => {
//       // MINIMAL GEOMETRY: Only 3 shapes for a cleaner HUD look
//       shapes = Array(3).fill(0).map(() => ({
//         x: Math.random() * canvas.width, y: Math.random() * canvas.height,
//         size: Math.random() * 150 + 80, rotation: Math.random() * Math.PI * 2,
//         vRot: (Math.random() - 0.5) * 0.025,
//         vX: (Math.random() - 0.5) * 1.0,
//         vY: (Math.random() - 0.5) * 1.0,
//       }));
//     };
//     const drawHex = (x, y, size, rotation) => {
//       ctx.beginPath();
//       for (let i = 0; i < 6; i++) {
//         const angle = rotation + (i * Math.PI) / 3;
//         const px = x + size * Math.cos(angle); const py = y + size * Math.sin(angle);
//         if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
//       }
//       ctx.closePath();
//       ctx.strokeStyle = darkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(37, 99, 235, 0.1)';
//       ctx.lineWidth = 1; ctx.stroke();
//     };
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       shapes.forEach(s => {
//         s.x += s.vX; s.y += s.vY; s.rotation += s.vRot;
//         if (s.x < -s.size) s.x = canvas.width + s.size; if (s.x > canvas.width + s.size) s.x = -s.size;
//         if (s.y < -s.size) s.y = canvas.height + s.size; if (s.y > canvas.height + s.size) s.y = -s.size;
//         drawHex(s.x, s.y, s.size, s.rotation);
//         ctx.beginPath(); for (let i = 0; i < 3; i++) {
//           const angle = s.rotation + (i * 2 * Math.PI) / 3;
//           ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.size * Math.cos(angle), s.y + s.size * Math.sin(angle));
//         }
//         ctx.stroke();
//       });
//       animationFrameId = requestAnimationFrame(animate);
//     };
//     window.addEventListener('resize', resize); resize(); animate();
//     return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
//   }, [darkMode]);
//   return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />;
// };

// // 🌫️ Atmospheric Haze - ACCELERATED DRIFT
// const AtmosphericHaze = ({ darkMode }) => (
//   <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
//     {[...Array(3)].map((_, i) => (
//       <motion.div key={i} className={cn("absolute rounded-full blur-[120px] opacity-25", i === 0 ? (darkMode ? "bg-blue-600" : "bg-blue-400") : i === 1 ? (darkMode ? "bg-purple-600" : "bg-purple-400") : (darkMode ? "bg-indigo-600" : "bg-indigo-400"))}
//         // SLOWER ANIMATION
//         animate={{ x: [Math.random() * 100 + "%", Math.random() * 100 + "%"], y: [Math.random() * 100 + "%", Math.random() * 100 + "%"], scale: [1, 1.2, 0.9, 1] }}
//         transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "easeInOut" }}
//         style={{ width: 500 + i * 100 + "px", height: 500 + i * 100 + "px", left: "-20%", top: "-20%" }} />
//     ))}
//   </div>
// );

// // ✨ Starfield: Gentle, Slow Drifting Particles
// const Starfield = ({ darkMode }) => {
//   const canvasRef = useRef(null);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     let animationFrameId;
//     let stars = [];

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       init();
//     };

//     const init = () => {
//       // GENTLE DENSITY: Only a few drifting stars
//       const count = Math.floor((canvas.width * canvas.height) / 40000);
//       stars = Array(count).fill(0).map(() => ({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.15, // ULTRA SLOW
//         vy: (Math.random() - 0.5) * 0.15,
//         size: Math.random() * 1.5 + 0.5,
//         opacity: Math.random() * 0.5 + 0.2
//       }));
//     };

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       stars.forEach(s => {
//         s.x += s.vx; s.y += s.vy;
//         if (s.x < 0) s.x = canvas.width; if (s.x > canvas.width) s.x = 0;
//         if (s.y < 0) s.y = canvas.height; if (s.y > canvas.height) s.y = 0;

//         ctx.beginPath();
//         ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
//         ctx.fillStyle = darkMode ? `rgba(255, 255, 255, ${s.opacity})` : `rgba(37, 99, 235, ${s.opacity * 0.5})`;
//         ctx.fill();
//       });
//       animationFrameId = requestAnimationFrame(draw);
//     };

//     window.addEventListener('resize', resize);
//     resize(); draw();
//     return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
//   }, [darkMode]);

//   return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />;
// };

// // ⌨️ Kinetic Typography
// const KineticTitle = ({ text, darkMode }) => {
//   const letters = text.split("");
//   return (
//     <h1 className={cn("text-7xl md:text-[9rem] lg:text-[11rem]  tracking-tighter mb-10 leading-none flex justify-center", darkMode ? "text-white" : "text-gray-900")}>
//       {letters.map((char, i) => (
//         <motion.span key={i} initial={{ y: 80, opacity: 0, scale: 0.8, filter: "blur(15px)" }} animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }} className={cn("bg-clip-text text-transparent bg-gradient-to-r inline-block from-violet-400 to-blue-400")}>
//           {char}
//         </motion.span>
//       ))}
//     </h1>
//   );
// };

// // 💎 Connection Card
// const ConnectionCard = ({ node, isHovered, onHover, onLeave, darkMode }) => {
//   const Icon = node.icon;
//   return (
//     <motion.div className="absolute z-30" style={{ left: `${node.x}%`, top: `${node.y}%` }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: node.delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
//       <div className="relative group" onMouseEnter={() => onHover(node.id)} onMouseLeave={onLeave}>
//         <motion.div
//           animate={{
//             y: [0, -6, 0],
//             x: [0, 4, 0],
//             rotate: [0, 2, -2, 0]
//           }}
//           transition={{
//             duration: 8 + Math.random() * 4,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className={cn(
//             "relative w-11 h-11 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-500",
//             darkMode ? "bg-white/5 backdrop-blur-md border border-white/10" : "bg-black/5 backdrop-blur-md border border-black/10",
//             isHovered && (darkMode ? "ring-2 ring-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.4)]" : "ring-2 ring-blue-600 shadow-[0_0_25px_rgba(37,99,235,0.15)]")
//           )}
//         >
//           <Icon className={cn("w-4.5 h-4.5 transition-all duration-500", isHovered ? (darkMode ? "text-blue-400 scale-110" : "text-blue-600 scale-110") : (darkMode ? "text-white/60" : "text-black/50"))} />
//         </motion.div>
//         <AnimatePresence>
//           {isHovered && (
//             <motion.div initial={{ opacity: 0, x: 20, scale: 0.95 }} animate={{ opacity: 1, x: 55, scale: 1 }} exit={{ opacity: 0, x: 20, scale: 0.95 }} className={cn("absolute top-0 left-0 w-64 p-5 rounded-2xl backdrop-blur-2xl border shadow-2xl z-50 pointer-events-none transition-colors", darkMode ? "bg-gray-900/95 border-white/10" : "bg-white/98 border-black/10")}>
//               <div className="flex items-center gap-2 mb-3">
//                 <Activity className={cn("w-3 h-3", darkMode ? "text-blue-400" : "text-blue-600")} />
//                 <span className={cn("text-[9px] font-bold tracking-widest uppercase", darkMode ? "text-blue-400/80" : "text-blue-600/80")}>Protocol Linked</span>
//               </div>
//               <h3 className={cn("font-bold text-lg mb-1", darkMode ? "text-white" : "text-gray-900")}>{node.title}</h3>
//               <p className={cn("text-xs mb-4 leading-relaxed", darkMode ? "text-white/50" : "text-gray-600")}>{node.description}</p>
//               <div className={cn("flex items-center justify-between text-[10px] font-mono", darkMode ? "text-white/30" : "text-gray-400")}><span>{node.handle}</span><ExternalLink className="w-3 h-3" /></div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// };

// const ConnectHero = ({ darkMode, setDarkMode }) => {
//   const [hoveredNode, setHoveredNode] = useState(null);
//   const { scrollY } = useScroll();
//   const opacity = useTransform(scrollY, [0, 400], [1, 0]);

//   // Mouse Parallax Engine
//   const mouseX = useSpring(0, { damping: 50, stiffness: 450 });
//   const mouseY = useSpring(0, { damping: 50, stiffness: 450 });
//   const handleMouseMove = (e) => {
//     const x = (e.clientX / window.innerWidth - 0.5) * 2;
//     const y = (e.clientY / window.innerHeight - 0.5) * 2;
//     mouseX.set(x); mouseY.set(y);
//   };

//   const p1X = useTransform(mouseX, x => x * -20); const p1Y = useTransform(mouseY, y => y * -20);
//   const p2X = useTransform(mouseX, x => x * -40); const p2Y = useTransform(mouseY, y => y * -40);
//   const p3X = useTransform(mouseX, x => x * -60); const p3Y = useTransform(mouseY, y => y * -60);
//   const pDeepX = useTransform(mouseX, x => x * -10); const pDeepY = useTransform(mouseY, y => y * -10);

//   const nodes = [
//     { id: 'mail', icon: Mail, x: 15, y: 18, title: 'Direct Transmission', description: 'Immediate response protocol for serious inquiries.', handle: 'hello@proveit.io', delay: 0.2 },
//     { id: 'github', icon: Github, x: 82, y: 15, title: 'Source Protocol', description: 'Review our infrastructure and architecture.', handle: 'github.com/proveit', delay: 0.4 },
//     { id: 'linkedin', icon: Linkedin, x: 12, y: 75, title: 'Professional Core', description: 'Synchronize career and talent opportunities.', handle: 'linkedin.com/proveit', delay: 0.6 },
//     { id: 'twitter', icon: Twitter, x: 88, y: 78, title: 'Neural Feed', description: 'Real-time platform updates and insights.', handle: '@ProveItIO', delay: 0.8 },
//     { id: 'discord', icon: MessageSquare, x: 50, y: 82, title: 'Signal Ground', description: 'Collaborative hub for high-performance teams.', handle: 'discord.gg/proveit', delay: 1.0 },
//     { id: 'slack', icon: Hash, x: 10, y: 45, title: 'Internal Comms', description: 'Real-time synchronization for core partners.', handle: 'proveit.slack.com', delay: 1.2 },
//     { id: 'telegram', icon: Send, x: 85, y: 42, title: 'Encrypted Link', description: 'Secure, high-speed burst communication.', handle: 't.me/proveit', delay: 1.4 },
//     { id: 'status', icon: Activity, x: 10, y: 85, title: 'Core Status', description: 'Live telemetry and infrastructure uptime.', handle: 'status.proveit.io', delay: 1.6 },
//   ];

//   return (
//     <div className={cn("relative w-full h-[100vh] overflow-hidden flex items-center justify-center font-sans transition-colors duration-1000", darkMode ? "bg-black" : "bg-gray-50")} onMouseMove={handleMouseMove}>
//       {/* Deep Background Layers */}
//       <motion.div style={{ x: p1X, y: p1Y }} className="absolute inset-0 z-0">
//         <AtmosphericHaze darkMode={darkMode} />
//         <CircuitBoard darkMode={darkMode} />
//         <Starfield darkMode={darkMode} />
//       </motion.div>

//       {/* Mid Background Layers */}
//       <motion.div style={{ x: p2X, y: p2Y }} className="absolute inset-0 z-10">
//         <VectorGeometry darkMode={darkMode} />
//       </motion.div>

//       {/* Foreground Background Layer */}
//       <motion.div style={{ x: p3X, y: p3Y }} className="absolute inset-0 z-20">
//       </motion.div>

//       {/* Main Content */}
//       <div className="container relative z-30 px-6 pointer-events-none">
//         <motion.div style={{ opacity }} className="text-center max-w-5xl mx-auto">
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-10 transition-colors", darkMode ? "bg-white/5 border-white/10" : "bg-white/90 border-gray-200 shadow-sm")}>
//             <Zap className={cn("w-3.5 h-3.5 animate-pulse", darkMode ? "text-blue-400" : "text-blue-600")} />
//             <span className={cn("text-[10px] font-bold tracking-[0.4em] uppercase", darkMode ? "text-white/80" : "text-gray-900/80")}>Neural_Vortex_Active</span>
//           </motion.div>

//           <KineticTitle text="Connect" darkMode={darkMode} />

//           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className={cn("text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-14 transition-colors px-4", darkMode ? "text-white/50" : "text-gray-500")}>
//             Synchronize with the next-generation proof layers. Bridge vision and verification through the atmospheric nexus.
//           </motion.p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pointer-events-auto">
//             <motion.button whileHover={{ scale: 1.05, y: -2, boxShadow: darkMode ? "0 0 30px rgba(59,130,246,0.3)" : "0 0 30px rgba(37,99,235,0.15)" }} whileTap={{ scale: 0.95 }} className={cn("group relative px-12 py-5 font-bold rounded-2xl overflow-hidden shadow-2xl transition-all duration-500", darkMode ? "bg-white text-black" : "bg-gray-900 text-white")}>
//               <div className="relative z-10 flex items-center gap-3">
//                 Initialize Linking <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
//               </div>
//               <motion.div className="absolute inset-0 bg-blue-500/10" initial={{ x: "-100%" }} whileHover={{ x: "0%" }} transition={{ duration: 0.4 }} />
//             </motion.button>
//             <button className={cn("flex items-center gap-2 text-sm font-bold tracking-widest group transition-colors", darkMode ? "text-white/40 hover:text-white" : "text-gray-400 hover:text-gray-900")}>
//               Protocol Spec <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       <div className="absolute inset-0 z-40">
//         {nodes.map(node => (
//           <ConnectionCard key={node.id} node={node} isHovered={hoveredNode === node.id} onHover={setHoveredNode} onLeave={() => setHoveredNode(null)} darkMode={darkMode} />
//         ))}
//       </div>

//       <div className="absolute bottom-10 left-10 right-10 z-50 flex flex-col md:flex-row items-center justify-between gap-10">
//         <div className="flex items-center gap-12 text-center md:text-left">
//           <div className="flex flex-col gap-1.5">
//             <span className={cn("text-[8px] font-bold tracking-[0.3em] text-opacity-40 uppercase", darkMode ? "text-white" : "text-black")}>Atmospheric Engine</span>
//             <div className="flex items-center gap-2.5">
//               <Cpu className={cn("w-3.5 h-3.5", darkMode ? "text-blue-400" : "text-blue-600")} />
//               <span className={cn("text-[11px] font-mono font-bold", darkMode ? "text-white/80" : "text-gray-900")}>VOLTS_v2.5_EXT</span>
//             </div>
//           </div>
//           <div className="flex flex-col gap-1.5">
//             <span className={cn("text-[8px] font-bold tracking-[0.3em] text-opacity-40 uppercase", darkMode ? "text-white" : "text-black")}>Neural Traces</span>
//             <div className="flex items-center gap-2">
//               <Activity className={cn("w-3.5 h-3.5", darkMode ? "text-blue-400" : "text-blue-600")} />
//               <span className={cn("text-[11px] font-mono font-bold", darkMode ? "text-white/80" : "text-gray-900")}>ACTIVE_SYNC_STABLE</span>
//             </div>
//           </div>
//         </div>
//         <button className={cn("p-4 rounded-full border transition-all pointer-events-auto hover:scale-110 active:scale-95", darkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-gray-200 text-gray-900 shadow-md")} onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-indigo-600" />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ConnectHero;









"use client";

import { motion, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import { Circle, Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn(
                "absolute transform-gpu will-change-transform",
                className
            )}
        >
            <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 15, 0] }}
                transition={shouldReduceMotion ? {} : {
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[1px] border-2",
                        "border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function ContactInfoCard({ icon: Icon, title, value, href, theme = "light" }) {
    const iconRotate = useMotionValue(0);
    
    const styles = theme === "light" 
        ? {
            card: "bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1]",
            icon: "bg-indigo-500/20 text-indigo-300",
            title: "text-white/60",
            value: "text-white"
        }
        : {
            card: "bg-gray-100 hover:bg-gray-200 border border-gray-300 shadow-sm",
            icon: "bg-indigo-100 text-indigo-600",
            title: "text-gray-600",
            value: "text-gray-900"
        };
    
    return (
        <motion.a
            href={href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "inline-flex items-center gap-4 px-6 py-4 mx-1.5 rounded-2xl transition-all duration-300 relative group",
                styles.card,
                "backdrop-blur-sm overflow-hidden"
            )}
            aria-label={`Contact via ${title}`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <motion.div
                className={cn("p-3 rounded-full relative z-10", styles.icon)}
                whileHover={{ rotate: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Icon className="w-6 h-6" aria-hidden="true" />
            </motion.div>
            
            <div className="text-left relative z-10">
                <p className={cn("text-sm font-medium mb-1", styles.title)}>
                    {title}
                </p>
                <p className={cn("text-lg font-semibold", styles.value)}>
                    {value}
                </p>
            </div>
        </motion.a>
    );
}

function MagneticButton({ children, href, theme = "light", className = "" }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-50, 50], [8, -8]);
    const rotateY = useTransform(x, [-50, 50], [-8, 8]);

    const buttonStyle = theme === "dark"
        ? "bg-gradient-to-r from-indigo-600 to-cyan-600"
        : "bg-gradient-to-r from-indigo-500 to-cyan-500";

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={href}
            style={{ x, y, rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300",
                buttonStyle,
                "text-white hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]",
                "relative overflow-hidden",
                className
            )}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-600/20 to-cyan-600/0"
                animate={{
                    x: ["-100%", "100%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ backgroundSize: "200% 100%" }}
            />
            
            <span className="relative z-10">{children}</span>
            <svg 
                className="w-5 h-5 ml-2 relative z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
            </svg>
        </motion.a>
    );
}

function ContactHero({
    // Theme customization (REMOVED - now uses Tailwind dark mode)
    // Content customization
    badge = "Get In Touch",
    title = "Let's Start a Conversation",
    description = "Have a project in mind? Want to collaborate? We'd love to hear from you. Send us a message and let's create something amazing together.",
    
    // Contact Information
    contactInfo = {
        email: "Info@ProveltIo.com",
        phone: "+91 (555) 123-4567",
        location: "Gujarat, India",
    },
    
    // Color customization
    primaryColor = "indigo",
    secondaryColor = "cyan",
    accentColor = "amber",
    
    // Layout customization
    showBadge = true,
    showDescription = true,
    showContactInfo = true,
    showCTA = true,
}) {
    const shouldReduceMotion = useReducedMotion();
    
    // Color classes based on theme
    const primaryColorClass = useMemo(
        () => `from-${primaryColor}-500/[0.15]`,
        [primaryColor]
    );
    
    const secondaryColorClass = useMemo(
        () => `from-${secondaryColor}-500/[0.15]`,
        [secondaryColor]
    );
    
    const accentColorClass = useMemo(
        () => `from-${accentColor}-500/[0.15]`,
        [accentColor]
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div 
            className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#030303] dark:bg-gray-50"
            onMouseMove={(e) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }}
        >
            {/* Interactive background glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.1), transparent 80%)`,
                }}
            />

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br blur-2xl from-indigo-500/[0.08] via-transparent to-cyan-500/[0.08] dark:from-indigo-500/[0.03] dark:via-transparent dark:to-cyan-500/[0.03]" />

            {/* Animated shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient={primaryColorClass}
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient={secondaryColorClass}
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient={accentColorClass}
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Main Content */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-left"
                        >
                            {/* Badge */}
                            {showBadge && (
                                <motion.div
                                    variants={fadeUpVariants}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 bg-white/[0.03] border border-white/[0.08] dark:bg-black/[0.03] dark:border dark:border-black/[0.08]"
                                >
                                    <Circle className="h-2 w-2 fill-cyan-500/80 dark:fill-cyan-600/80" aria-hidden="true" />
                                    <span className="text-sm tracking-wide text-white/60 dark:text-gray-600">
                                        {badge}
                                    </span>
                                </motion.div>
                            )}

                            {/* Title */}
                            <motion.div variants={fadeUpVariants}>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white dark:text-gray-900">
                                    <motion.span
                                        className="bg-clip-text text-transparent inline-block bg-gradient-to-r from-indigo-300 via-cyan-300 to-amber-300 dark:from-indigo-600 dark:via-cyan-600 dark:to-amber-600"
                                        animate={shouldReduceMotion ? {} : {
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                        }}
                                        transition={shouldReduceMotion ? {} : {
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        style={{ backgroundSize: "200% 200%" }}
                                    >
                                        {title}
                                    </motion.span>
                                </h1>
                            </motion.div>

                            {/* Description */}
                            {showDescription && (
                                <motion.div variants={fadeUpVariants}>
                                    <p className="text-lg md:text-xl mb-8 leading-relaxed font-light tracking-wide max-w-2xl text-white/40 dark:text-gray-500">
                                        {description}
                                    </p>
                                </motion.div>
                            )}

                            {/* CTA Button */}
                            {showCTA && (
                                <motion.div variants={fadeUpVariants}>
                                    <div className="mt-4">
                                        <motion.a
                                            href="#contact-form"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="inline-flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-500 dark:to-cyan-500 text-white hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]"
                                        >
                                            Send a Message
                                            <svg 
                                                className="w-5 h-5 ml-2" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                                                />
                                            </svg>
                                        </motion.a>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Right Column - Contact Info */}
                        {showContactInfo && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="space-y-6"
                            >
                                <ContactInfoCard
                                    icon={Mail}
                                    title="Email"
                                    value={contactInfo.email}
                                    href={`mailto:${contactInfo.email}`}
                                />
                                <ContactInfoCard
                                    icon={Phone}
                                    title="Phone"
                                    value={contactInfo.phone}
                                    href={`tel:${contactInfo.phone}`}
                                />
                                <ContactInfoCard
                                    icon={MapPin}
                                    title="Location"
                                    value={contactInfo.location}
                                />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent dark:from-white/80 dark:via-transparent dark:to-transparent" />
            
            {/* Scroll indicator */}
            {!shouldReduceMotion && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="flex flex-col items-center text-white/40 dark:text-gray-500"
                    >
                        <span className="text-sm mb-2">Scroll to form</span>
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                            />
                        </svg>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

export default ContactHero;