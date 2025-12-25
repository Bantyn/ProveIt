// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import toast, { Toaster } from "react-hot-toast";

// import {
//   Mail,
//   Phone,
//   MapPin,
//   Clock,
//   Send,
//   Shield,
//   Zap,
//   Users,
//   Globe,
//   MessageSquare,
//   ChevronRight,
//   Star,
//   Award,
//   Sparkles,
//   Rocket,
//   CheckCircle2,
//   X,
//   Menu,
//   Linkedin,
//   Twitter,
//   Instagram,
//   Facebook,
//   Github,
//   Youtube,
//   Video,
//   Headphones,
//   HelpCircle,
//   BookOpen,
//   Calendar,
//   FileText,
//   ShieldCheck,
//   Search,
//   Download,
//   Share2,
//   Bell,
//   Settings,
//   User,
//   LogOut,
//   Moon,
//   Sun,
//   Heart,
//   Target,
//   TrendingUp,
//   Coffee,
//   ExternalLink,
//   Copy,
//   Eye,
//   EyeOff,
//   Filter,
//   ThumbsUp,
//   MessageCircle,
// } from "lucide-react";

// // ===================== Theme Context =====================
// const ThemeContext = React.createContext();

// const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("dark");

//   useEffect(() => {
//     const stored = localStorage.getItem("contact-theme");
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//     setTheme(stored || (prefersDark ? "dark" : "light"));
//   }, []);

//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }
//     localStorage.setItem("contact-theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prev => prev === "dark" ? "light" : "dark");
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// // ===================== Color Palette Constants =====================
// const COLORS = {
//   // Primary colors (Indigo - Professional & Trustworthy)
//   primary: {
//     light: {
//       50: "#f5f3ff", // Lightest indigo
//       100: "#ede9fe",
//       200: "#ddd6fe",
//       300: "#c4b5fd",
//       400: "#a78bfa",
//       500: "#8b5cf6", // Primary indigo
//       600: "#7c3aed", // Brand indigo
//       700: "#6d28d9",
//       800: "#5b21b6",
//       900: "#4c1d95",
//     },
//     dark: {
//       50: "#1e1b4b",
//       100: "#1d1d42",
//       200: "#252547",
//       300: "#312e81",
//       400: "#3730a3",
//       500: "#4338ca", // Primary indigo dark
//       600: "#4f46e5",
//       700: "#6366f1",
//       800: "#818cf8",
//       900: "#a5b4fc",
//     }
//   },
  
//   // Secondary colors (Emerald - Growth & Success)
//   secondary: {
//     light: {
//       50: "#ecfdf5",
//       100: "#d1fae5",
//       200: "#a7f3d0",
//       300: "#6ee7b7",
//       400: "#34d399",
//       500: "#10b981", // Primary emerald
//       600: "#059669",
//       700: "#047857",
//       800: "#065f46",
//       900: "#064e3b",
//     },
//     dark: {
//       50: "#022c22",
//       100: "#064e3b",
//       200: "#065f46",
//       300: "#047857",
//       400: "#059669",
//       500: "#10b981", // Primary emerald dark
//       600: "#34d399",
//       700: "#6ee7b7",
//       800: "#a7f3d0",
//       900: "#d1fae5",
//     }
//   },
  
//   // Accent colors (Amber - Energy & Attention)
//   accent: {
//     light: {
//       50: "#fffbeb",
//       100: "#fef3c7",
//       200: "#fde68a",
//       300: "#fcd34d",
//       400: "#fbbf24",
//       500: "#f59e0b", // Primary amber
//       600: "#d97706",
//       700: "#b45309",
//       800: "#92400e",
//       900: "#78350f",
//     },
//     dark: {
//       50: "#78350f",
//       100: "#92400e",
//       200: "#b45309",
//       300: "#d97706",
//       400: "#f59e0b", // Primary amber dark
//       500: "#fbbf24",
//       600: "#fcd34d",
//       700: "#fde68a",
//       800: "#fef3c7",
//       900: "#fffbeb",
//     }
//   },
  
//   // Neutral colors
//   neutral: {
//     light: {
//       50: "#fafafa",
//       100: "#f5f5f5",
//       200: "#e5e5e5",
//       300: "#d4d4d4",
//       400: "#a3a3a3",
//       500: "#737373",
//       600: "#525252",
//       700: "#404040",
//       800: "#262626",
//       900: "#171717",
//     },
//     dark: {
//       50: "#0a0a0a",
//       100: "#171717",
//       200: "#262626",
//       300: "#404040",
//       400: "#525252",
//       500: "#737373",
//       600: "#a3a3a3",
//       700: "#d4d4d4",
//       800: "#e5e5e5",
//       900: "#f5f5f5",
//     }
//   }
// };

// // ===================== Theme Toggle with Color Palette =====================
// const ThemeToggle = () => {
//   const { theme, toggleTheme } = React.useContext(ThemeContext);
//   const colors = COLORS.primary[theme];

//   return (
//     <motion.button
//       whileHover={{ scale: 1.1, rotate: 5 }}
//       whileTap={{ scale: 0.9 }}
//       onClick={toggleTheme}
//       className="fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl border shadow-lg transition-all group"
//       style={{
//         backgroundColor: theme === 'dark' ? 'rgba(30, 27, 75, 0.8)' : 'rgba(245, 243, 255, 0.8)',
//         borderColor: theme === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(139, 92, 246, 0.2)',
//         boxShadow: `0 10px 25px -5px ${theme === 'dark' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(139, 92, 246, 0.15)'}`
//       }}
//     >
//       {theme === "dark" ? (
//         <Sun className="w-5 h-5" style={{ color: COLORS.accent.dark[500] }} />
//       ) : (
//         <Moon className="w-5 h-5" style={{ color: COLORS.primary.light[600] }} />
//       )}
//     </motion.button>
//   );
// };

// // ===================== Floating Particles with Theme Colors =====================
// const FloatingParticles = () => {
//   const canvasRef = useRef(null);
//   const { theme } = React.useContext(ThemeContext);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let particles = [];
//     let animationId;

//     const resizeCanvas = () => {
//       canvas.width = canvas.parentElement.clientWidth;
//       canvas.height = canvas.parentElement.clientHeight;
//     };

//     class Particle {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 2 + 0.5;
//         this.speedX = Math.random() * 1 - 0.5;
//         this.speedY = Math.random() * 1 - 0.5;
        
//         // Use theme-based colors
//         const colors = theme === 'dark' 
//           ? [
//               COLORS.primary.dark[700], // Indigo
//               COLORS.secondary.dark[600], // Emerald
//               COLORS.accent.dark[400], // Amber
//             ]
//           : [
//               COLORS.primary.light[500], // Indigo
//               COLORS.secondary.light[500], // Emerald
//               COLORS.accent.light[500], // Amber
//             ];
        
//         this.color = colors[Math.floor(Math.random() * colors.length)];
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.x > canvas.width) this.x = 0;
//         if (this.x < 0) this.x = canvas.width;
//         if (this.y > canvas.height) this.y = 0;
//         if (this.y < 0) this.y = canvas.height;
//       }

//       draw() {
//         ctx.fillStyle = this.color + '40'; // Add transparency
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }

//     const init = () => {
//       particles = [];
//       for (let i = 0; i < 80; i++) {
//         particles.push(new Particle());
//       }
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       particles.forEach(particle => {
//         particle.update();
//         particle.draw();
//       });

//       // Connect particles with theme-based lines
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 100) {
//             ctx.beginPath();
//             ctx.strokeStyle = theme === 'dark' 
//               ? COLORS.primary.dark[700] + '20'
//               : COLORS.primary.light[500] + '20';
//             ctx.lineWidth = 0.3;
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.stroke();
//           }
//         }
//       }

//       animationId = requestAnimationFrame(animate);
//     };

//     resizeCanvas();
//     init();
//     animate();

//     window.addEventListener('resize', () => {
//       resizeCanvas();
//       init();
//     });

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener('resize', resizeCanvas);
//     };
//   }, [theme]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 pointer-events-none opacity-30"
//     />
//   );
// };

// // ===================== Animated Gradient Background with Theme =====================
// const AnimatedGradientBackground = () => {
//   const { theme } = React.useContext(ThemeContext);

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       {/* Animated gradient blobs with theme colors */}
//       <motion.div
//         className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl"
//         animate={{
//           x: [0, 30, 0],
//           y: [0, -50, 0],
//           scale: [1, 1.1, 1],
//         }}
//         transition={{
//           duration: 7,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         style={{
//           backgroundColor: theme === 'dark' 
//             ? COLORS.primary.dark[300] + '40'
//             : COLORS.primary.light[300] + '40'
//         }}
//       />
//       <motion.div
//         className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl"
//         animate={{
//           x: [0, -20, 0],
//           y: [0, 20, 0],
//           scale: [1, 0.9, 1],
//         }}
//         transition={{
//           duration: 7,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 2,
//         }}
//         style={{
//           backgroundColor: theme === 'dark' 
//             ? COLORS.secondary.dark[400] + '40'
//             : COLORS.secondary.light[400] + '40'
//         }}
//       />
//       <motion.div
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl"
//         animate={{
//           x: [0, 20, -10, 0],
//           y: [0, 10, -20, 0],
//           scale: [1, 1.05, 0.95, 1],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 4,
//         }}
//         style={{
//           backgroundColor: theme === 'dark' 
//             ? COLORS.accent.dark[300] + '30'
//             : COLORS.accent.light[300] + '30'
//         }}
//       />
      
//       {/* Subtle grid pattern */}
//       <div 
//         className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
//         style={{
//           backgroundImage: `linear-gradient(to right, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px),
//                             linear-gradient(to bottom, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
//           backgroundSize: '50px 50px',
//         }}
//       />
//     </div>
//   );
// };

// // ===================== Navigation =====================
// const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const { theme } = React.useContext(ThemeContext);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { label: "Home", href: "#" },
//     { label: "Features", href: "#features" },
//     { label: "Contact", href: "#contact" },
//     { label: "Support", href: "#support" },
//     { label: "Team", href: "#team" },
//   ];

//   const navBg = scrolled 
//     ? theme === 'dark' 
//       ? 'rgba(10, 10, 10, 0.9)' 
//       : 'rgba(255, 255, 255, 0.9)'
//     : 'transparent';

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-xl"
//         style={{
//           backgroundColor: navBg,
//           borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
//         }}
//       >
//         <div className="container mx-auto px-6">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center gap-3"
//             >
//               <div 
//                 className="w-10 h-10 rounded-xl flex items-center justify-center"
//                 style={{
//                   background: `linear-gradient(135deg, ${COLORS.primary[theme][500]}, ${COLORS.secondary[theme][500]})`
//                 }}
//               >
//                 <MessageSquare className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 
//                   className="text-xl font-bold"
//                   style={{
//                     background: `linear-gradient(135deg, ${COLORS.primary[theme][600]}, ${COLORS.secondary[theme][500]})`,
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                   }}
//                 >
//                   ConnectSphere
//                 </h1>
//                 <p className="text-[10px] uppercase tracking-widest" style={{ color: COLORS.neutral[theme][500] }}>
//                   Communication Platform
//                 </p>
//               </div>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-8">
//               {navItems.map((item) => (
//                 <motion.a
//                   key={item.label}
//                   href={item.href}
//                   whileHover={{ y: -2 }}
//                   className="font-medium transition-colors relative group"
//                   style={{ color: COLORS.neutral[theme][700] }}
//                 >
//                   {item.label}
//                   <span 
//                     className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
//                     style={{
//                       background: `linear-gradient(to right, ${COLORS.primary[theme][500]}, ${COLORS.secondary[theme][500]})`
//                     }}
//                   />
//                 </motion.a>
//               ))}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-6 py-2.5 rounded-full font-semibold shadow-lg"
//                 style={{
//                   background: `linear-gradient(135deg, ${COLORS.primary[theme][500]}, ${COLORS.secondary[theme][500]})`,
//                   color: 'white',
//                   boxShadow: `0 10px 25px -5px ${COLORS.primary[theme][500]}40`
//                 }}
//               >
//                 Get Started
//               </motion.button>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="md:hidden p-2 rounded-lg"
//               style={{
//                 backgroundColor: theme === 'dark' ? COLORS.neutral.dark[200] : COLORS.neutral.light[200],
//                 color: COLORS.neutral[theme][700]
//               }}
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed inset-x-0 top-20 z-40 md:hidden backdrop-blur-xl"
//             style={{
//               backgroundColor: theme === 'dark' ? 'rgba(10, 10, 10, 0.95)' : 'rgba(255, 255, 255, 0.95)',
//               borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
//             }}
//           >
//             <div className="container mx-auto px-6 py-4">
//               <div className="flex flex-col gap-4">
//                 {navItems.map((item) => (
//                   <a
//                     key={item.label}
//                     href={item.href}
//                     className="py-3 font-medium transition-colors"
//                     style={{ color: COLORS.neutral[theme][700] }}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {item.label}
//                   </a>
//                 ))}
//                 <button 
//                   className="py-3 px-6 rounded-full font-semibold"
//                   style={{
//                     background: `linear-gradient(135deg, ${COLORS.primary[theme][500]}, ${COLORS.secondary[theme][500]})`,
//                     color: 'white',
//                   }}
//                 >
//                   Get Started
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // ===================== Hero Section =====================
// const HeroSection = () => {
//   const [textIndex, setTextIndex] = useState(0);
//   const texts = ["Connect", "Collaborate", "Create", "Communicate"];
//   const { theme } = React.useContext(ThemeContext);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTextIndex((prev) => (prev + 1) % texts.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
//       <FloatingParticles />
//       <AnimatedGradientBackground />
      
//       {/* Floating decorative elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(12)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full"
//             style={{
//               width: `${Math.random() * 200 + 50}px`,
//               height: `${Math.random() * 200 + 50}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               backgroundColor: i % 3 === 0 
//                 ? COLORS.primary[theme][300] + '10'
//                 : i % 3 === 1
//                 ? COLORS.secondary[theme][300] + '10'
//                 : COLORS.accent[theme][300] + '10',
//             }}
//             animate={{
//               x: [0, Math.random() * 100 - 50, 0],
//               y: [0, Math.random() * 100 - 50, 0],
//               rotate: [0, 180, 360],
//             }}
//             transition={{
//               duration: Math.random() * 20 + 10,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           />
//         ))}
//       </div>

//       <div className="container relative z-10 mx-auto px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center">
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-sm"
//               style={{
//                 backgroundColor: COLORS.primary[theme][50] + '40',
//                 borderColor: COLORS.primary[theme][300] + '30',
//               }}
//             >
//               <Sparkles className="w-4 h-4" style={{ color: COLORS.primary[theme][500] }} />
//               <span className="text-sm font-medium" style={{ color: COLORS.primary[theme][600] }}>
//                 Trusted by 50,000+ Companies Worldwide
//               </span>
//             </motion.div>

//             {/* Main Heading */}
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
//               style={{ color: COLORS.neutral[theme][900] }}
//             >
//               <span className="block">Where Teams</span>
//               <span className="relative inline-block">
//                 <span style={{
//                   background: `linear-gradient(135deg, ${COLORS.primary[theme][600]}, ${COLORS.secondary[theme][500]}, ${COLORS.accent[theme][500]})`,
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                 }}>
//                   {texts[textIndex]}
//                 </span>
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: "100%" }}
//                   transition={{ delay: 0.5, duration: 0.8 }}
//                   className="absolute -bottom-2 left-0 h-1 rounded-full"
//                   style={{
//                     background: `linear-gradient(to right, ${COLORS.primary[theme][500]}, ${COLORS.secondary[theme][500]})`
//                   }}
//                 />
//               </span>
//             </motion.h1>

//             {/* Subtitle */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
//               style={{ color: COLORS.neutral[theme][600] }}
//             >
//               Revolutionize your communication with our all-in-one platform.
//               Secure, fast, and built for modern teams.
//             </motion.p>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 rounded-full font-semibold text-lg shadow-2xl flex items-center gap-3 group"
//                 style={{
//                   background: `linear-gradient(135deg, ${COLORS.primary[theme][500]}, ${COLORS.secondary[theme][500]})`,
//                   color: 'white',
//                   boxShadow: `0 20px 40px -15px ${COLORS.primary[theme][500]}40`
//                 }}
//               >
//                 Start Free Trial
//                 <ChevronRight className="group-hover:translate-x-1 transition-transform" />
//               </motion.button>
              
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 rounded-full backdrop-blur-sm border font-semibold text-lg shadow-lg flex items-center gap-3 group"
//                 style={{
//                   backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
//                   borderColor: COLORS.neutral[theme][200],
//                   color: COLORS.neutral[theme][700],
//                 }}
//               >
//                 <Video className="w-5 h-5" style={{ color: COLORS.primary[theme][500] }} />
//                 Watch Demo
//               </motion.button>
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
//             >
//               {[
//                 { value: "99.9%", label: "Uptime", icon: Shield, color: COLORS.primary[theme][500] },
//                 { value: "2.5M+", label: "Users", icon: Users, color: COLORS.secondary[theme][500] },
//                 { value: "50+", label: "Countries", icon: Globe, color: COLORS.accent[theme][500] },
//                 { value: "24/7", label: "Support", icon: Clock, color: COLORS.primary[theme][400] },
//               ].map((stat, index) => (
//                 <motion.div
//                   key={stat.label}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 + index * 0.1 }}
//                   whileHover={{ y: -5 }}
//                   className="p-6 rounded-2xl backdrop-blur-sm border"
//                   style={{
//                     backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)',
//                     borderColor: COLORS.neutral[theme][200],
//                   }}
//                 >
//                   <div className="flex items-center justify-center gap-3 mb-2">
//                     <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
//                     <div className="text-3xl font-bold" style={{ color: stat.color }}>
//                       {stat.value}
//                     </div>
//                   </div>
//                   <div className="text-sm text-center" style={{ color: COLORS.neutral[theme][500] }}>
//                     {stat.label}
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* Scroll Indicator */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1 }}
//               className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//             >
//               <motion.div
//                 animate={{ y: [0, 10, 0] }}
//                 transition={{ repeat: Infinity, duration: 2 }}
//                 className="flex flex-col items-center gap-2"
//               >
//                 <div className="text-sm" style={{ color: COLORS.neutral[theme][500] }}>
//                   Scroll to explore
//                 </div>
//                 <div className="w-6 h-10 rounded-full border-2 flex justify-center"
//                   style={{ borderColor: COLORS.neutral[theme][300] }}
//                 >
//                   <div className="w-1 h-3 rounded-full mt-2"
//                     style={{ backgroundColor: COLORS.neutral[theme][400] }}
//                   />
//                 </div>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // ===================== Contact Form Section =====================
// const ContactFormSection = () => {
//   const { theme } = React.useContext(ThemeContext);
  
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       company: "",
//       phone: "",
//       subject: "",
//       message: "",
//       priority: "normal",
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Name is required"),
//       email: Yup.string().email("Invalid email").required("Email is required"),
//       company: Yup.string().required("Company name is required"),
//       phone: Yup.string().matches(/^[0-9+\-\s()]*$/, "Invalid phone number"),
//       subject: Yup.string().required("Subject is required"),
//       message: Yup.string().required("Message is required").min(20, "Message must be at least 20 characters"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 1500));
//         toast.success("Message sent successfully! We'll contact you soon.", {
//           duration: 5000,
//           icon: "🚀",
//         });
//         resetForm();
//       } catch (error) {
//         toast.error("Failed to send message. Please try again.");
//       }
//     },
//   });

//   const priorities = [
//     { value: "low", label: "Low", color: COLORS.secondary[theme][500] },
//     { value: "normal", label: "Normal", color: COLORS.primary[theme][500] },
//     { value: "high", label: "High", color: COLORS.accent[theme][500] },
//     { value: "urgent", label: "Urgent", color: "#ef4444" },
//   ];

//   return (
//     <section id="contact" className="py-20 relative">
//       <div className="container mx-auto px-6">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 backdrop-blur-sm"
//               style={{
//                 backgroundColor: COLORS.primary[theme][50] + '40',
//                 borderColor: COLORS.primary[theme][300] + '30',
//               }}
//             >
//               <MessageSquare className="w-4 h-4" style={{ color: COLORS.primary[theme][500] }} />
//               <span className="text-sm font-medium" style={{ color: COLORS.primary[theme][600] }}>
//                 Get in Touch
//               </span>
//             </div>
            
//             <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: COLORS.neutral[theme][900] }}>
//               Let's{" "}
//               <span style={{
//                 background: `linear-gradient(135deg, ${COLORS.primary[theme][600]}, ${COLORS.secondary[theme][500]})`,
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}>
//                 Connect
//               </span>
//             </h2>
            
//             <p className="text-xl max-w-2xl mx-auto" style={{ color: COLORS.neutral[theme][600] }}>
//               Have questions? We're here to help. Send us a message and we'll respond within 24 hours.
//             </p>
//           </motion.div>

//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Contact Information */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="space-y-8"
//             >
//               <div className="p-8 rounded-3xl border backdrop-blur-sm"
//                 style={{
//                   background: `linear-gradient(135deg, ${COLORS.primary[theme][50]}20, ${COLORS.secondary[theme][50]}20)`,
//                   borderColor: COLORS.primary[theme][200] + '30',
//                 }}
//               >
//                 <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.neutral[theme][900] }}>
//                   Contact Information
//                 </h3>
//                 <div className="space-y-6">
//                   {[
//                     {
//                       icon: Mail,
//                       title: "Email",
//                       value: "hello@connectsphere.com",
//                       desc: "We'll respond within 24 hours",
//                       color: COLORS.primary[theme][500],
//                     },
//                     {
//                       icon: Phone,
//                       title: "Phone",
//                       value: "+1 (555) 123-4567",
//                       desc: "Mon-Fri from 8am to 6pm",
//                       color: COLORS.secondary[theme][500],
//                     },
//                     {
//                       icon: MapPin,
//                       title: "Office",
//                       value: "123 Innovation Street",
//                       desc: "San Francisco, CA 94107",
//                       color: COLORS.accent[theme][500],
//                     },
//                     {
//                       icon: Clock,
//                       title: "Business Hours",
//                       value: "Monday - Friday",
//                       desc: "9:00 AM - 6:00 PM PST",
//                       color: COLORS.primary[theme][400],
//                     },
//                   ].map((item, index) => (
//                     <motion.div
//                       key={item.title}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: index * 0.1 }}
//                       whileHover={{ x: 5 }}
//                       className="p-4 rounded-xl backdrop-blur-sm border flex items-start gap-4"
//                       style={{
//                         backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)',
//                         borderColor: COLORS.neutral[theme][200],
//                       }}
//                     >
//                       <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
//                         style={{
//                           background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`
//                         }}
//                       >
//                         <item.icon className="w-6 h-6 text-white" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold mb-1" style={{ color: COLORS.neutral[theme][900] }}>
//                           {item.title}
//                         </h4>
//                         <p className="text-lg font-bold mb-1" style={{ color: item.color }}>
//                           {item.value}
//                         </p>
//                         <p className="text-sm" style={{ color: COLORS.neutral[theme][500] }}>
//                           {item.desc}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* Social Links */}
//               <div className="p-8 rounded-3xl border backdrop-blur-sm"
//                 style={{
//                   background: `linear-gradient(135deg, ${COLORS.primary[theme][50]}10, ${COLORS.accent[theme][50]}10)`,
//                   borderColor: COLORS.primary[theme][200] + '20',
//                 }}
//               >
//                 <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.neutral[theme][900] }}>
//                   Follow Us
//                 </h3>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                   {[
//                     { icon: Twitter, label: "Twitter", color: "#1DA1F2" },
//                     { icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
//                     { icon: Instagram, label: "Instagram", color: "#E4405F" },
//                     { icon: Youtube, label: "YouTube", color: "#FF0000" },
//                   ].map((social) => (
//                     <motion.a
//                       key={social.label}
//                       whileHover={{ y: -5 }}
//                       whileTap={{ scale: 0.95 }}
//                       href="#"
//                       className="p-4 rounded-xl backdrop-blur-sm border flex flex-col items-center justify-center gap-2 group"
//                       style={{
//                         backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)',
//                         borderColor: COLORS.neutral[theme][200],
//                       }}
//                     >
//                       <div className="w-10 h-10 rounded-full flex items-center justify-center"
//                         style={{ backgroundColor: social.color }}
//                       >
//                         <social.icon className="w-5 h-5 text-white" />
//                       </div>
//                       <span className="text-sm font-medium" style={{ color: COLORS.neutral[theme][700] }}>
//                         {social.label}
//                       </span>
//                     </motion.a>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Contact Form */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="p-8 rounded-3xl backdrop-blur-xl border shadow-2xl"
//               style={{
//                 backgroundColor: theme === 'dark' ? 'rgba(23, 23, 23, 0.7)' : 'rgba(255, 255, 255, 0.8)',
//                 borderColor: COLORS.neutral[theme][200],
//                 boxShadow: `0 25px 50px -12px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'}`
//               }}
//             >
//               <form onSubmit={formik.handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: COLORS.neutral[theme][700] }}>
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       {...formik.getFieldProps("name")}
//                       className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2"
//                       placeholder="John Doe"
//                       style={{
//                         backgroundColor: theme === 'dark' ? COLORS.neutral.dark[200] : COLORS.neutral.light[100],
//                         borderColor: formik.touched.name && formik.errors.name 
//                           ? '#ef4444' 
//                           : COLORS.neutral[theme][300],
//                         color: COLORS.neutral[theme][900],
//                         boxShadow: formik.touched.name && formik.errors.name
//                           ? '0 0 0 2px rgba(239, 68, 68, 0.1)'
//                           : 'none',
//                       }}
//                     />
//                     {formik.touched.name && formik.errors.name && (
//                       <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{formik.errors.name}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: COLORS.neutral[theme][700] }}>
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       {...formik.getFieldProps("email")}
//                       className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2"
//                       placeholder="john@company.com"
//                       style={{
//                         backgroundColor: theme === 'dark' ? COLORS.neutral.dark[200] : COLORS.neutral.light[100],
//                         borderColor: formik.touched.email && formik.errors.email 
//                           ? '#ef4444' 
//                           : COLORS.neutral[theme][300],
//                         color: COLORS.neutral[theme][900],
//                         boxShadow: formik.touched.email && formik.errors.email
//                           ? '0 0 0 2px rgba(239, 68, 68, 0.1)'
//                           : 'none',
//                       }}
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                       <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{formik.errors.email}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: COLORS.neutral[theme][700] }}>
//                       Company *
//                     </label>
//                     <input
//                       type="text"
//                       {...formik.getFieldProps("company")}
//                       className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2"
//                       placeholder="Your Company Inc."
//                       style={{
//                         backgroundColor: theme === 'dark' ? COLORS.neutral.dark[200] : COLORS.neutral.light[100],
//                         borderColor: formik.touched.company && formik.errors.company 
//                           ? '#ef4444' 
//                           : COLORS.neutral[theme][300],
//                         color: COLORS.neutral[theme][900],
//                         boxShadow: formik.touched.company && formik.errors.company
//                           ? '0 0 0 2px rgba(239, 68, 68, 0.1)'
//                           : 'none',
//                       }}
//                     />
//                     {formik.touched.company && formik.errors.company && (
//                       <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{formik.errors.company}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2" style={{ color: COLORS.neutral[theme][700] }}>
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       {...formik.getFieldProps("phone")}
//                       className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2"
//                       placeholder="+1 (555) 123-4567"
//                       style={{
//                         backgroundColor: theme === 'dark' ? COLORS.neutral.dark[200] : COLORS.neutral.light[100],
//                         borderColor: formik.touched.phone && formik.errors.phone 
//                           ? '#ef4444' 
//                           : COLORS.neutral[theme][300],
//                         color: COLORS.neutral[theme][900],
//                         boxShadow: formik.touched.phone && formik.errors.phone
//                           ? '0 0 0 2px rgba(239, 68, 68, 0.1)'
//                           : 'none',
//                       }}
//                     />
//                     {formik.touched.phone && formik.errors.phone && (
//                       <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{formik.errors.phone}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: COLORS.neutral[theme][700] }}>
//                     Subject *
//                   </label>
//                   <input
//                     type="text"
//                     {...formik.getFieldProps("subject")}
//                     className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2"
//                     placeholder="How can we help you?"
//                     style={{
//                       backgroundColor: theme === 'dark' ? COLORS.neutral.dark[200] : COLORS.neutral.light[100],
//                       borderColor: formik.touched.subject && formik.errors.subject 
//                         ? '#ef4444' 
//                         : COLORS.neutral[theme][300],
//                       color: COLORS.neutral[theme][900],
//                       boxShadow: formik.touched.subject && formik.errors.subject
//                         ? '0 0 0 2px rgba(239, 68, 68, 0.1)'
//                         : 'none',
//                     }}
//                   />
//                   {formik.touched.subject && formik.errors.subject && (
//                     <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{formik.errors.subject}</p>
//                   )}
//                 </div>

//                 <div>
//                   <div className="flex items-center justify-between mb-2">
//                     <label className="block text-sm font-medium" style={{ color: COLORS.neutral[theme][700] }}>
//                       Message *
//                     </label>
//                     <span className="text-sm" style={{ color: COLORS.neutral[theme][500] }}>
//                       {formik.values.message.length}/500
//                     </span>
//                   </div>
//                   <textarea
//                     {...formik.getFieldProps("message")}
//                     rows={6}
//                     maxLength={500}
//                     className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 resize-none"
//                     placeholder="Tell us about your project or inquiry..."
//                     style={{
//                       backgroundColor: theme === 'dark' ? COLORS.neutral.dark[200] : COLORS.neutral.light[100],
//                       borderColor: formik.touched.message && formik.errors.message 
//                         ? '#ef4444' 
//                         : COLORS.neutral[theme][300],
//                       color: COLORS.neutral[theme][900],
//                       boxShadow: formik.touched.message && formik.errors.message
//                         ? '0 0 0 2px rgba(239, 68, 68, 0.1)'
//                         : 'none',
//                     }}
//                   />
//                   {formik.touched.message && formik.errors.message && (
//                     <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{formik.errors.message}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-3" style={{ color: COLORS.neutral[theme][700] }}>
//                     Priority Level
//                   </label>
//                   <div className="flex flex-wrap gap-3">
//                     {priorities.map((priority) => (
//                       <label
//                         key={priority.value}
//                         className="flex items-center gap-2 cursor-pointer"
//                       >
//                         <input
//                           type="radio"
//                           name="priority"
//                           value={priority.value}
//                           checked={formik.values.priority === priority.value}
//                           onChange={formik.handleChange}
//                           className="sr-only"
//                         />
//                         <div
//                           className="w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center"
//                           style={{
//                             borderColor: formik.values.priority === priority.value
//                               ? priority.color
//                               : COLORS.neutral[theme][400],
//                           }}
//                         >
//                           {formik.values.priority === priority.value && (
//                             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: priority.color }} />
//                           )}
//                         </div>
//                         <span className="text-sm" style={{ color: COLORS.neutral[theme][700] }}>
//                           {priority.label}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <input
//                     type="checkbox"
//                     id="consent"
//                     required
//                     className="w-4 h-4 rounded border transition-colors"
//                     style={{
//                       borderColor: COLORS.neutral[theme][400],
//                       accentColor: COLORS.primary[theme][500],
//                     }}
//                   />
//                   <label htmlFor="consent" className="text-sm" style={{ color: COLORS.neutral[theme][600] }}>
//                     I agree to the privacy policy and terms of service
//                   </label>
//                 </div>

//                 <motion.button
//                   type="submit"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   disabled={formik.isSubmitting}
//                   className="w-full py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
//                   style={{
//                     background: `linear-gradient(135deg, ${COLORS.primary[theme][500]}, ${COLORS.secondary[theme][500]})`,
//                     color: 'white',
//                     boxShadow: `0 10px 25px -5px ${COLORS.primary[theme][500]}40`
//                   }}
//                 >
//                   {formik.isSubmitting ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       Send Message
//                       <Send className="w-5 h-5" />
//                     </>
//                   )}
//                 </motion.button>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // ===================== Additional Sections (Simplified) =====================
// const SupportSection = () => {
//   const { theme } = React.useContext(ThemeContext);
  
//   return (
//     <section id="support" className="py-20"
//       style={{
//         background: `linear-gradient(to bottom, transparent, ${COLORS.neutral[theme][50]}20)`,
//       }}
//     >
//       <div className="container mx-auto px-6">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 backdrop-blur-sm"
//               style={{
//                 backgroundColor: COLORS.secondary[theme][50] + '40',
//                 borderColor: COLORS.secondary[theme][300] + '30',
//               }}
//             >
//               <HelpCircle className="w-4 h-4" style={{ color: COLORS.secondary[theme][500] }} />
//               <span className="text-sm font-medium" style={{ color: COLORS.secondary[theme][600] }}>
//                 Support Center
//               </span>
//             </div>
            
//             <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: COLORS.neutral[theme][900] }}>
//               We're Here to{" "}
//               <span style={{
//                 background: `linear-gradient(135deg, ${COLORS.secondary[theme][600]}, ${COLORS.primary[theme][500]})`,
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}>
//                 Help
//               </span>
//             </h2>
//           </motion.div>
          
//           {/* Support content would go here */}
//         </div>
//       </div>
//     </section>
//   );
// };

// const TeamSection = () => {
//   const { theme } = React.useContext(ThemeContext);
  
//   return (
//     <section id="team" className="py-20">
//       <div className="container mx-auto px-6">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 backdrop-blur-sm"
//               style={{
//                 backgroundColor: COLORS.accent[theme][50] + '40',
//                 borderColor: COLORS.accent[theme][300] + '30',
//               }}
//             >
//               <Users className="w-4 h-4" style={{ color: COLORS.accent[theme][500] }} />
//               <span className="text-sm font-medium" style={{ color: COLORS.accent[theme][600] }}>
//                 Meet Our Team
//               </span>
//             </div>
            
//             <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: COLORS.neutral[theme][900] }}>
//               The Minds{" "}
//               <span style={{
//                 background: `linear-gradient(135deg, ${COLORS.accent[theme][600]}, ${COLORS.secondary[theme][500]})`,
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}>
//                 Behind ConnectSphere
//               </span>
//             </h2>
//           </motion.div>
          
//           {/* Team content would go here */}
//         </div>
//       </div>
//     </section>
//   );
// };

// // ===================== Footer =====================
// const Footer = () => {
//   const { theme } = React.useContext(ThemeContext);
  
//   return (
//     <footer className="pt-20 pb-8"
//       style={{
//         background: `linear-gradient(to bottom, transparent, ${COLORS.neutral[theme][100]}20)`,
//       }}
//     >
//       <div className="container mx-auto px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
//             {/* Company Info */}
//             <div className="lg:col-span-2">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center"
//                   style={{
//                     background: `linear-gradient(135deg, ${COLORS.primary[theme][500]}, ${COLORS.secondary[theme][500]})`
//                   }}
//                 >
//                   <MessageSquare className="w-7 h-7 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold"
//                     style={{
//                       background: `linear-gradient(135deg, ${COLORS.primary[theme][600]}, ${COLORS.secondary[theme][500]})`,
//                       WebkitBackgroundClip: 'text',
//                       WebkitTextFillColor: 'transparent',
//                     }}
//                   >
//                     ConnectSphere
//                   </h2>
//                   <p className="text-sm" style={{ color: COLORS.neutral[theme][500] }}>
//                     Communication reimagined
//                   </p>
//                 </div>
//               </div>
//               <p className="mb-6" style={{ color: COLORS.neutral[theme][600] }}>
//                 Revolutionizing team communication with cutting-edge technology
//                 and unparalleled support.
//               </p>
//               <div className="flex gap-4">
//                 {[Twitter, Facebook, Instagram, Linkedin, Github].map((Icon, index) => (
//                   <motion.a
//                     key={index}
//                     href="#"
//                     whileHover={{ y: -3 }}
//                     className="p-2 rounded-lg"
//                     style={{
//                       backgroundColor: theme === 'dark' ? COLORS.neutral.dark[200] : COLORS.neutral.light[200],
//                       color: COLORS.neutral[theme][600],
//                     }}
//                   >
//                     <Icon className="w-5 h-5" />
//                   </motion.a>
//                 ))}
//               </div>
//             </div>

//             {/* Footer links would go here */}
//           </div>

//           <div className="pt-8 border-t"
//             style={{ borderColor: COLORS.neutral[theme][200] }}
//           >
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               <p style={{ color: COLORS.neutral[theme][600] }}>
//                 © {new Date().getFullYear()} ConnectSphere. All rights reserved.
//               </p>
//               <div className="flex items-center gap-6">
//                 <a
//                   href="#"
//                   className="text-sm hover:underline"
//                   style={{ color: COLORS.neutral[theme][600] }}
//                 >
//                   Privacy Policy
//                 </a>
//                 <a
//                   href="#"
//                   className="text-sm hover:underline"
//                   style={{ color: COLORS.neutral[theme][600] }}
//                 >
//                   Terms of Service
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// // ===================== Main Component =====================
// const ContactPage = () => {
//   return (
//     <ThemeProvider>
//       <div className="min-h-screen transition-colors duration-300">
//         <Navigation />
//         <ThemeToggle />
        
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 4000,
//             style: {
//               background: 'rgba(255, 255, 255, 0.9)',
//               backdropFilter: 'blur(10px)',
//               color: '#1e293b',
//               borderRadius: '12px',
//               padding: '16px 20px',
//               fontSize: '14px',
//               fontWeight: '500',
//               border: '1px solid rgba(255, 255, 255, 0.3)',
//             },
//             success: {
//               iconTheme: {
//                 primary: '#10b981',
//                 secondary: '#fff',
//               },
//             },
//             error: {
//               iconTheme: {
//                 primary: '#ef4444',
//                 secondary: '#fff',
//               },
//             },
//           }}
//         />

//         <HeroSection />
//         <ContactFormSection />
//         <SupportSection />
//         <TeamSection />
//         <Footer />

//         {/* Back to Top Button */}
//         <motion.button
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//           className="fixed bottom-6 right-6 z-40 p-3 rounded-full backdrop-blur-xl border shadow-lg"
//           style={{
//             backgroundColor: 'rgba(255, 255, 255, 0.8)',
//             borderColor: 'rgba(139, 92, 246, 0.2)',
//             boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.15)'
//           }}
//         >
//           <ChevronRight className="w-5 h-5 text-zinc-600 rotate-270" />
//         </motion.button>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default ContactPage;







import React from 'react';
import ContactHero from '../../ContactCom/ContactHero';
import ContactSection from '../../ContactCom/ContactSection';

const Contact = () => {
  return (
    <>
      <ContactHero />
      <ContactSection  />

    </>
  );
};

export default Contact;