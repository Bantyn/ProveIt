// import React from "react";
// import { motion } from "framer-motion";
// import CompanyRegisterForm from "../../auth/signup/company/CompanySignup";
// import PlanSelectionPage from "../../auth/signup/company/CompanyAuth/PlanSelectionModal";
// import {
//   Sparkles,
//   Shield,
//   Users,
//   Target,
//   Zap,
//   Globe,
//   Clock,
//   Star,
//   Briefcase,
//   Mail,
//   Phone,
// } from "lucide-react";

// const CompanyRegister = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
//   };

//   const itemVariants = {
//     hidden: { y: 24, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 90, damping: 18 },
//     },
//   };

//   const features = [
//     {
//       icon: Target,
//       title: "Skill-First Hiring",
//       desc: "Evaluate real project work",
//       color: "from-cyan-400 to-blue-500",
//     },
//     {
//       icon: Shield,
//       title: "Admin Verified",
//       desc: "Trusted companies only",
//       color: "from-blue-500 to-indigo-500",
//     },
//     {
//       icon: Zap,
//       title: "Fast Hiring",
//       desc: "60% quicker process",
//       color: "from-fuchsia-500 to-pink-500",
//     },
//     {
//       icon: Globe,
//       title: "Global Talent",
//       desc: "Worldwide candidates",
//       color: "from-emerald-400 to-teal-500",
//     },
//   ];

//   const stats = [
//     { value: "500+", label: "Companies", icon: Briefcase },
//     { value: "24h", label: "Approval", icon: Clock },
//     { value: "95%", label: "Success", icon: Star },
//     { value: "10k+", label: "Hires", icon: Users },
//   ];

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#05070f]">

//       {/* 🌈 Animated Aurora Background */}
//       <div className="absolute inset-0">
//         <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[120px] animate-pulse" />
//         <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[140px] animate-pulse delay-200" />
//         <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-fuchsia-500/20 rounded-full blur-[160px]" />
//       </div>

//       {/* Grid Overlay */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:32px_32px]" />

//       <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <div className="flex justify-center items-center gap-3 mb-4">
//             <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-cyan-500/30">
//               <Sparkles className="text-white w-6 h-6" />
//             </div>
//             <h1 className="text-3xl font-extrabold text-white tracking-tight">
//               ProveIt.io
//             </h1>
//           </div>
//           <p className="text-slate-300 max-w-xl mx-auto">
//             Skill-verified recruitment platform built for modern hiring teams
//           </p>
//         </motion.div>

//         {/* Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//           {/* LEFT PANEL */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="lg:col-span-4 space-y-6"
//           >
//             {/* Features */}
//             <div className="grid grid-cols-2 gap-4">
//               {features.map((f, i) => (
//                 <motion.div
//                   key={i}
//                   variants={itemVariants}
//                   className="relative bg-slate-900/70 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-cyan-400/40 transition group"
//                 >
//                   <div
//                     className={`w-10 h-10 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center mb-3 shadow-lg`}
//                   >
//                     <f.icon className="text-white w-5 h-5" />
//                   </div>
//                   <h4 className="text-white font-semibold text-sm">
//                     {f.title}
//                   </h4>
//                   <p className="text-slate-400 text-xs mt-1">
//                     {f.desc}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Stats */}
//             <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-white/10 rounded-2xl p-6 backdrop-blur">
//               <h4 className="text-white font-semibold mb-4">
//                 Platform Stats
//               </h4>
//               <div className="grid grid-cols-2 gap-4">
//                 {stats.map((s, i) => (
//                   <div key={i}>
//                     <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
//                       {s.value}
//                     </div>
//                     <div className="text-xs text-slate-400">
//                       {s.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Support */}
//             <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 backdrop-blur">
//               <h4 className="text-white font-semibold mb-4">
//                 Need Help?
//               </h4>
//               <div className="space-y-3 text-sm">
//                 <div className="flex items-center gap-3">
//                   <Mail className="w-4 h-4 text-cyan-400" />
//                   <span className="text-slate-300">
//                     support@proveit.io
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Phone className="w-4 h-4 text-cyan-400" />
//                   <span className="text-slate-300">
//                     +1 (555) 123-4567
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* RIGHT FORM */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="lg:col-span-8"
//           >
//             <div className="relative bg-slate-900/80 border border-white/10 rounded-3xl shadow-2xl shadow-indigo-500/10 overflow-hidden backdrop-blur-xl">

//               {/* Top Gradient Line */}
//               <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500" />

//               <div className="p-6 border-b border-white/10">
//                 <h3 className="text-xl font-bold text-white">
//                   Company Registration
//                 </h3>
//                 <p className="text-slate-400 text-sm">
//                   Complete all steps to get approved
//                 </p>
//               </div>

//               <div className="p-6">
//                 <CompanyRegisterForm />
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyRegister;












// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import CompanyRegisterForm from "../../auth/signup/company/CompanySignup";
// import PlanSelectionPage from "../../auth/signup/company/CompanyAuth/PlanSelectionModal";
// import {
//   Sparkles,
//   Shield,
//   Users,
//   Target,
//   Zap,
//   Globe,
//   Clock,
//   Star,
//   Briefcase,
//   Mail,
//   Phone,
//   Gem,
//   Rocket,
//   TrendingUp,
//   Award,
// } from "lucide-react";

// const CompanyRegister = () => {
//   const [showPlans, setShowPlans] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   /* ================= HANDLERS ================= */
//   const handleShowPlans = () => {
//     setShowPlans(true);
//   };

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     setShowPlans(false);
//   };

//   /* ================= LOCK SCROLL WHEN POPUP OPEN ================= */
//   useEffect(() => {
//     document.body.style.overflow = showPlans ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [showPlans]);

//   /* ================= ANIMATION VARIANTS ================= */
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
//   };

//   const itemVariants = {
//     hidden: { y: 24, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 90, damping: 18 },
//     },
//   };

//   /* ================= UNIQUE FEATURES ================= */
//   const features = [
//     {
//       icon: Target,
//       title: "Skill-First Hiring",
//       desc: "Evaluate real project work",
//       color: "from-rose-500 to-pink-600",
//       gradient: "bg-gradient-to-br from-rose-500/20 to-pink-600/20",
//     },
//     {
//       icon: Shield,
//       title: "Admin Verified",
//       desc: "Trusted companies only",
//       color: "from-violet-500 to-purple-600",
//       gradient: "bg-gradient-to-br from-violet-500/20 to-purple-600/20",
//     },
//     {
//       icon: Zap,
//       title: "Fast Hiring",
//       desc: "60% quicker process",
//       color: "from-amber-500 to-orange-600",
//       gradient: "bg-gradient-to-br from-amber-500/20 to-orange-600/20",
//     },
//     {
//       icon: Globe,
//       title: "Global Talent",
//       desc: "Worldwide candidates",
//       color: "from-emerald-500 to-teal-600",
//       gradient: "bg-gradient-to-br from-emerald-500/20 to-teal-600/20",
//     },
//     {
//       icon: Gem,
//       title: "Premium Talent",
//       desc: "Top 1% candidates",
//       color: "from-cyan-500 to-blue-600",
//       gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20",
//     },
//     {
//       icon: Rocket,
//       title: "Rapid Onboarding",
//       desc: "Setup in minutes",
//       color: "from-fuchsia-500 to-rose-600",
//       gradient: "bg-gradient-to-br from-fuchsia-500/20 to-rose-600/20",
//     },
//   ];

//   const stats = [
//     { value: "500+", label: "Companies", icon: Briefcase, trend: "+23%" },
//     { value: "24h", label: "Avg. Approval", icon: Clock, trend: "Fast" },
//     { value: "95%", label: "Success Rate", icon: Star, trend: "+5%" },
//     { value: "10k+", label: "Successful Hires", icon: Users, trend: "+45%" },
//   ];

//   /* ================= FLOATING PARTICLES EFFECT ================= */
//   const FloatingParticles = () => {
//     return (
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full"
//             style={{
//               width: Math.random() * 6 + 2,
//               height: Math.random() * 6 + 2,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               backgroundColor: i % 3 === 0 ? '#f472b6' : i % 3 === 1 ? '#8b5cf6' : '#0ea5e9',
//               opacity: 0.4,
//             }}
//             animate={{
//               y: [0, Math.random() * 100 - 50],
//               x: [0, Math.random() * 100 - 50],
//               scale: [1, 1.5, 1],
//             }}
//             transition={{
//               duration: Math.random() * 10 + 10,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/30 to-cyan-950/30">

//       {/* ================= UNIQUE BACKGROUND EFFECTS ================= */}
      
//       {/* Geometric Mesh Gradient */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.3)_0%,transparent_70%)]" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.2)_0%,transparent_50%)]" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.2)_0%,transparent_50%)]" />
//       </div>

//       {/* Animated Gradient Orbs */}
//       <div className="absolute inset-0">
//         <motion.div
//           className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-violet-600/30 to-fuchsia-600/20 blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-600/30 to-blue-600/20 blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.4, 0.2, 0.4],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       </div>

//       {/* Hexagonal Pattern Overlay */}
//       <div className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
//           backgroundSize: '60px 60px'
//         }}
//       />

//       <FloatingParticles />

//       {/* ================= FULL SCREEN PLAN POPUP ================= */}
//       {showPlans && (
//         <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-950 via-purple-950 to-cyan-950 overflow-hidden">

//           {/* Enhanced Popup Background */}
//           <div className="absolute inset-0">
//             <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-rose-500/20 to-pink-600/20 rounded-full blur-[140px]" />
//             <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-full blur-[140px]" />
//           </div>

//           {/* Animated Grid */}
//           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

//           {/* Plan Selection */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ type: "spring", damping: 20 }}
//             className="relative z-10 w-full h-full flex items-center justify-center p-4"
//           >
//             <PlanSelectionPage onSelect={handlePlanSelect} />
//           </motion.div>
//         </div>
//       )}

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">

//         {/* Premium Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <div className="flex flex-col items-center gap-4 mb-6">
//             <motion.div
//               whileHover={{ scale: 1.05, rotate: 5 }}
//               className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-purple-500/40"
//             >
//               <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
//               <Sparkles className="text-white w-8 h-8" />
//               <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
//                 <TrendingUp className="w-3 h-3 text-white" />
//               </div>
//             </motion.div>
            
//             <div className="space-y-2">
//               <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                 ProveIt<span className="text-white">.io</span>
//               </h1>
//               <p className="text-slate-300/80 max-w-xl mx-auto text-lg">
//                 Where <span className="text-amber-400 font-semibold">Elite Talent</span> Meets{" "}
//                 <span className="text-cyan-400 font-semibold">Innovative Companies</span>
//               </p>
//             </div>
//           </div>

//           {/* Trust Badges */}
//           <div className="flex flex-wrap justify-center gap-6 mt-8">
//             <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
//               <Shield className="w-4 h-4 text-emerald-400" />
//               <span className="text-sm text-slate-300">Enterprise Security</span>
//             </div>
//             <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
//               <Award className="w-4 h-4 text-amber-400" />
//               <span className="text-sm text-slate-300">Award-Winning Platform</span>
//             </div>
//             <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
//               <Gem className="w-4 h-4 text-rose-400" />
//               <span className="text-sm text-slate-300">Premium Network</span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//           {/* LEFT PANEL - Enhanced */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="lg:col-span-5 space-y-6"
//           >
//             {/* Features Grid */}
//             <div className="grid grid-cols-2 gap-4">
//               {features.map((f, i) => (
//                 <motion.div
//                   key={i}
//                   variants={itemVariants}
//                   whileHover={{ y: -5, scale: 1.02 }}
//                   className={`relative group ${f.gradient} border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:border-white/20 transition-all duration-300`}
//                 >
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                   <div
//                     className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}
//                   >
//                     <f.icon className="text-white w-6 h-6" />
//                   </div>
//                   <h4 className="text-white font-semibold text-sm mb-2">{f.title}</h4>
//                   <p className="text-slate-400/80 text-xs">{f.desc}</p>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Stats Card */}
//             <motion.div
//               variants={itemVariants}
//               className="relative bg-gradient-to-br from-slate-900/60 to-purple-900/20 border border-white/10 rounded-2xl p-6 backdrop-blur-xl overflow-hidden"
//             >
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16" />
//               <h4 className="text-white font-semibold mb-6 text-lg">Platform Growth</h4>
//               <div className="grid grid-cols-2 gap-6">
//                 {stats.map((s, i) => (
//                   <div key={i} className="space-y-1">
//                     <div className="flex items-end gap-2">
//                       <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
//                         {s.value}
//                       </div>
//                       <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
//                         {s.trend}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-slate-400">
//                       <s.icon className="w-3 h-3" />
//                       {s.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Support Card */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-gradient-to-br from-slate-900/60 to-cyan-900/20 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
//             >
//               <h4 className="text-white font-semibold mb-6 text-lg">Dedicated Support</h4>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
//                   <Mail className="w-5 h-5 text-cyan-400" />
//                   <div>
//                     <p className="text-sm text-slate-300">Email Support</p>
//                     <p className="text-slate-400 text-sm">support@proveit.io</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
//                   <Phone className="w-5 h-5 text-emerald-400" />
//                   <div>
//                     <p className="text-sm text-slate-300">Phone Support</p>
//                     <p className="text-slate-400 text-sm">+1 (555) 123-4567</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* RIGHT FORM - Enhanced */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="lg:col-span-7"
//           >
//             <div className="relative bg-gradient-to-br from-slate-900/40 to-purple-900/20 border border-white/20 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl shadow-purple-500/10">
//               {/* Animated Border */}
//               <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl" />
//               <div className="h-1.5 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500" />
              
//               <div className="relative z-10 p-8">
//                 <div className="mb-8">
//                   <h3 className="text-2xl font-bold text-white mb-2">
//                     Join the Future of Hiring
//                   </h3>
//                   <p className="text-slate-400">
//                     Register your company and access top-tier talent in minutes
//                   </p>
//                 </div>

//                 <CompanyRegisterForm
//                   onShowPlans={handleShowPlans}
//                   selectedPlan={selectedPlan}
//                 />
//               </div>
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyRegister;



//2 option
// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import CompanyRegisterForm from "../../auth/signup/company/CompanySignup";
// import PlanSelectionPage from "../../auth/signup/company/CompanyAuth/PlanSelectionModal";
// import {
//   Sparkles,
//   Shield,
//   Users,
//   Target,
//   Zap,
//   Globe,
//   Clock,
//   Star,
//   Briefcase,
//   Mail,
//   Phone,
//   Gem,
//   Rocket,
//   TrendingUp,
//   Award,
//   CheckCircle,
//   ArrowRight,
//   Building2,
// } from "lucide-react";

// const CompanyRegister = () => {
//   const [showPlans, setShowPlans] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const containerRef = useRef(null);

//   /* ================= HANDLERS ================= */
//   const handleShowPlans = () => {
//     setShowPlans(true);
//   };

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     setShowPlans(false);
    
//     // Smooth scroll to form after plan selection
//     setTimeout(() => {
//       containerRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, 300);
//   };

//   /* ================= INTERSECTION OBSERVER ================= */
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   /* ================= LOCK SCROLL WHEN POPUP OPEN ================= */
//   useEffect(() => {
//     if (showPlans) {
//       document.body.style.overflow = "hidden";
//       document.body.style.paddingRight = "15px"; // Prevent layout shift
//     } else {
//       document.body.style.overflow = "auto";
//       document.body.style.paddingRight = "0";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//       document.body.style.paddingRight = "0";
//     };
//   }, [showPlans]);

//   /* ================= ANIMATION VARIANTS ================= */
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1, 
//       transition: { 
//         staggerChildren: 0.12,
//         duration: 0.6 
//       } 
//     },
//   };

//   const itemVariants = {
//     hidden: { 
//       y: 30, 
//       opacity: 0,
//       scale: 0.95 
//     },
//     visible: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { 
//         type: "spring", 
//         stiffness: 100, 
//         damping: 15,
//         duration: 0.5 
//       },
//     },
//   };

//   /* ================= UNIQUE FEATURES ================= */
//   const features = [
//     {
//       icon: Target,
//       title: "Skill-First Hiring",
//       desc: "Evaluate real project work",
//       color: "from-rose-500 to-pink-600",
//       gradient: "bg-gradient-to-br from-rose-500/20 to-pink-600/20",
//       delay: 0.1,
//     },
//     {
//       icon: Shield,
//       title: "Admin Verified",
//       desc: "Trusted companies only",
//       color: "from-violet-500 to-purple-600",
//       gradient: "bg-gradient-to-br from-violet-500/20 to-purple-600/20",
//       delay: 0.2,
//     },
//     {
//       icon: Zap,
//       title: "Fast Hiring",
//       desc: "60% quicker process",
//       color: "from-amber-500 to-orange-600",
//       gradient: "bg-gradient-to-br from-amber-500/20 to-orange-600/20",
//       delay: 0.3,
//     },
//     {
//       icon: Globe,
//       title: "Global Talent",
//       desc: "Worldwide candidates",
//       color: "from-emerald-500 to-teal-600",
//       gradient: "bg-gradient-to-br from-emerald-500/20 to-teal-600/20",
//       delay: 0.4,
//     },
//     {
//       icon: Gem,
//       title: "Premium Talent",
//       desc: "Top 1% candidates",
//       color: "from-cyan-500 to-blue-600",
//       gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20",
//       delay: 0.5,
//     },
//     {
//       icon: Rocket,
//       title: "Rapid Onboarding",
//       desc: "Setup in minutes",
//       color: "from-fuchsia-500 to-rose-600",
//       gradient: "bg-gradient-to-br from-fuchsia-500/20 to-rose-600/20",
//       delay: 0.6,
//     },
//   ];

//   const stats = [
//     { 
//       value: "500+", 
//       label: "Companies", 
//       icon: Briefcase, 
//       trend: "+23%",
//       color: "text-rose-400"
//     },
//     { 
//       value: "24h", 
//       label: "Avg. Approval", 
//       icon: Clock, 
//       trend: "Fast",
//       color: "text-cyan-400"
//     },
//     { 
//       value: "95%", 
//       label: "Success Rate", 
//       icon: Star, 
//       trend: "+5%",
//       color: "text-amber-400"
//     },
//     { 
//       value: "10k+", 
//       label: "Successful Hires", 
//       icon: Users, 
//       trend: "+45%",
//       color: "text-emerald-400"
//     },
//   ];

//   const successStories = [
//     { company: "TechNova", hires: "47", industry: "AI/ML" },
//     { company: "FinEdge", hires: "32", industry: "Fintech" },
//     { company: "HealthSync", hires: "28", industry: "HealthTech" },
//   ];

//   /* ================= ENHANCED BACKGROUND EFFECTS ================= */
//   const FloatingParticles = () => {
//     return (
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(30)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full"
//             style={{
//               width: Math.random() * 8 + 3,
//               height: Math.random() * 8 + 3,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               background: `radial-gradient(circle at 30% 30%, ${
//                 i % 4 === 0 ? '#f472b6' : 
//                 i % 4 === 1 ? '#8b5cf6' : 
//                 i % 4 === 2 ? '#0ea5e9' : '#10b981'
//               }, transparent 70%)`,
//               opacity: 0.3,
//               filter: 'blur(1px)',
//             }}
//             animate={{
//               y: [0, Math.random() * 100 - 50, 0],
//               x: [0, Math.random() * 100 - 50, 0],
//               scale: [1, 1.8, 1],
//               rotate: [0, 180, 360],
//             }}
//             transition={{
//               duration: Math.random() * 15 + 15,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: Math.random() * 5,
//             }}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/30 to-cyan-950/30">

//       {/* ================= UNIQUE BACKGROUND EFFECTS ================= */}
      
//       {/* Dynamic Mesh Gradient */}
//       <div className="absolute inset-0 opacity-40">
//         <motion.div
//           className="absolute inset-0"
//           animate={{
//             background: [
//               'radial-gradient(ellipse at 30% 20%, rgba(120,119,198,0.4) 0%, transparent 70%)',
//               'radial-gradient(ellipse at 70% 20%, rgba(120,119,198,0.4) 0%, transparent 70%)',
//               'radial-gradient(ellipse at 30% 20%, rgba(120,119,198,0.4) 0%, transparent 70%)',
//             ],
//           }}
//           transition={{ duration: 20, repeat: Infinity }}
//         />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.25)_0%,transparent_50%)]" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.25)_0%,transparent_50%)]" />
//       </div>

//       {/* Pulsing Gradient Orbs */}
//       <div className="absolute inset-0">
//         <motion.div
//           className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
//           animate={{
//             background: [
//               'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
//               'radial-gradient(circle, rgba(217,70,239,0.3) 0%, transparent 70%)',
//               'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
//             ],
//             scale: [1, 1.3, 1],
//           }}
//           transition={{
//             duration: 12,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           style={{ filter: 'blur(100px)' }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
//           animate={{
//             background: [
//               'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
//               'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
//               'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
//             ],
//             scale: [1.3, 1, 1.3],
//           }}
//           transition={{
//             duration: 15,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           style={{ filter: 'blur(100px)' }}
//         />
//       </div>

//       {/* Animated Grid Pattern */}
//       <div className="absolute inset-0 opacity-[0.05]"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
//             linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
//           `,
//           backgroundSize: '50px 50px',
//           maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
//         }}
//       />

//       <FloatingParticles />

//       {/* ================= FULL SCREEN PLAN POPUP ================= */}
//       {showPlans && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[9999] overflow-hidden"
//         >
//           {/* Dark Overlay */}
//           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
//           {/* Enhanced Popup Background */}
//           <div className="absolute inset-0">
//             <motion.div
//               className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full"
//               animate={{
//                 background: [
//                   'radial-gradient(circle, rgba(244,114,182,0.25) 0%, transparent 70%)',
//                   'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)',
//                   'radial-gradient(circle, rgba(244,114,182,0.25) 0%, transparent 70%)',
//                 ],
//               }}
//               transition={{ duration: 8, repeat: Infinity }}
//               style={{ filter: 'blur(120px)' }}
//             />
//             <motion.div
//               className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full"
//               animate={{
//                 background: [
//                   'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
//                   'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
//                   'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
//                 ],
//               }}
//               transition={{ duration: 10, repeat: Infinity }}
//               style={{ filter: 'blur(120px)' }}
//             />
//           </div>

//           {/* Animated Grid */}
//           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

//           {/* Plan Selection */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="relative z-10 w-full h-full flex items-center justify-center p-4"
//           >
//             <div className="relative w-full max-w-6xl">
//               <button
//                 onClick={() => setShowPlans(false)}
//                 className="absolute -top-16 right-0 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
//               >
//                 <ArrowRight className="w-4 h-4 rotate-180" />
//                 Back to registration
//               </button>
//               <PlanSelectionPage onSelect={handlePlanSelect} />
//             </div>
//           </motion.div>
//         </motion.div>
//       )}

//       {/* ================= MAIN CONTENT ================= */}
//       <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">

//         {/* Premium Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="text-center mb-16"
//         >
//           <div className="flex flex-col items-center gap-6 mb-8">
//             <motion.div
//               whileHover={{ scale: 1.08, rotate: 8 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-rose-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-purple-500/50"
//             >
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 to-transparent" />
//               <Sparkles className="text-white w-10 h-10" />
//               <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
//                 <TrendingUp className="w-4 h-4 text-white" />
//               </div>
//             </motion.div>
            
//             <div className="space-y-4">
//               <motion.h1
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-5xl md:text-6xl font-bold"
//               >
//                 <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                   ProveIt
//                 </span>
//                 <span className="text-white">.io</span>
//               </motion.h1>
              
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-slate-300/90 max-w-2xl mx-auto text-xl font-light"
//               >
//                 Where <span className="text-amber-400 font-semibold">Elite Talent</span> Meets{" "}
//                 <span className="text-cyan-400 font-semibold">Innovative Companies</span>
//               </motion.p>
//             </div>
//           </div>

//           {/* Trust Badges */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="flex flex-wrap justify-center gap-4 mt-10"
//           >
//             {[
//               { icon: Shield, text: "Enterprise Security", color: "emerald" },
//               { icon: Award, text: "Award-Winning Platform", color: "amber" },
//               { icon: Gem, text: "Premium Network", color: "rose" },
//               { icon: CheckCircle, text: "Verified Companies", color: "cyan" },
//             ].map((badge, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 className={`flex items-center gap-2 bg-white/5 px-5 py-3 rounded-full border border-white/10 backdrop-blur-sm hover:border-${badge.color}-500/50 transition-all duration-300`}
//               >
//                 <badge.icon className={`w-4 h-4 text-${badge.color}-400`} />
//                 <span className="text-sm text-slate-300 font-medium">{badge.text}</span>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

//           {/* LEFT PANEL - Enhanced */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={isVisible ? "visible" : "hidden"}
//             className="lg:col-span-5 space-y-8"
//           >
//             {/* Features Grid */}
//             <div className="grid grid-cols-2 gap-5">
//               {features.map((f, i) => (
//                 <motion.div
//                   key={i}
//                   custom={i}
//                   variants={itemVariants}
//                   whileHover={{ 
//                     y: -8, 
//                     scale: 1.03,
//                     boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                   className={`relative group cursor-pointer ${f.gradient} border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-white/30 transition-all duration-500`}
//                 >
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   <div className="relative">
//                     <div
//                       className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-xl`}
//                     >
//                       <f.icon className="text-white w-7 h-7" />
//                     </div>
//                     <h4 className="text-white font-bold text-base mb-2">{f.title}</h4>
//                     <p className="text-slate-400/90 text-sm leading-relaxed">{f.desc}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Stats Card */}
//             <motion.div
//               variants={itemVariants}
//               whileHover={{ y: -5 }}
//               className="relative bg-gradient-to-br from-slate-900/50 to-purple-900/30 border border-white/10 rounded-3xl p-8 backdrop-blur-xl overflow-hidden"
//             >
//               <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-500/10 to-purple-500/10 rounded-full -translate-y-20 translate-x-20" />
//               <div className="relative">
//                 <h4 className="text-white font-bold text-xl mb-8 flex items-center gap-3">
//                   <Building2 className="w-5 h-5 text-cyan-400" />
//                   Platform Growth
//                 </h4>
//                 <div className="grid grid-cols-2 gap-6">
//                   {stats.map((s, i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.1 * i }}
//                       className="space-y-2"
//                     >
//                       <div className="flex items-end justify-between">
//                         <div className={`text-3xl font-bold ${s.color}`}>
//                           {s.value}
//                         </div>
//                         <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
//                           {s.trend}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2.5 text-slate-400/90 text-sm">
//                         <s.icon className="w-4 h-4" />
//                         {s.label}
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Success Stories */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-gradient-to-br from-slate-900/50 to-emerald-900/20 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
//             >
//               <h4 className="text-white font-bold text-xl mb-6">Recent Success Stories</h4>
//               <div className="space-y-4">
//                 {successStories.map((story, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.2 * idx }}
//                     className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
//                   >
//                     <div>
//                       <div className="text-white font-semibold">{story.company}</div>
//                       <div className="text-slate-400 text-sm">{story.industry}</div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-emerald-400 font-bold">{story.hires} hires</div>
//                       <div className="text-slate-500 text-xs">via ProveIt</div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* RIGHT FORM - Enhanced */}
//           <motion.div
//             initial={{ opacity: 0, x: 60, scale: 0.95 }}
//             animate={{ opacity: 1, x: 0, scale: 1 }}
//             transition={{ 
//               delay: 0.3, 
//               type: "spring", 
//               stiffness: 100, 
//               damping: 20 
//             }}
//             className="lg:col-span-7"
//           >
//             <div className="relative bg-gradient-to-br from-slate-900/40 via-purple-900/20 to-cyan-900/10 border border-white/20 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl shadow-purple-500/20">
              
//               {/* Animated Border Glow */}
//               <div className="absolute inset-0 rounded-3xl">
//                 <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl animate-pulse" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl" />
//               </div>
              
//               {/* Animated Top Bar */}
//               <motion.div
//                 className="h-2 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500"
//                 animate={{
//                   backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//                 style={{
//                   backgroundSize: "200% 200%",
//                 }}
//               />
              
//               <div className="relative z-10 p-10">
//                 <div className="mb-10">
//                   <motion.h3
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="text-3xl font-bold text-white mb-3"
//                   >
//                     Join the Future of Hiring
//                   </motion.h3>
//                   <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="text-slate-400 text-lg"
//                   >
//                     Register your company and access top-tier talent in minutes
//                   </motion.p>
//                 </div>

//                 <CompanyRegisterForm
//                   onShowPlans={handleShowPlans}
//                   selectedPlan={selectedPlan}
//                 />
//               </div>
//             </div>

//             {/* Quick Stats Footer */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 }}
//               className="mt-8 grid grid-cols-3 gap-4"
//             >
//               <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
//                 <div className="text-2xl font-bold text-cyan-400">2 Min</div>
//                 <div className="text-slate-400 text-sm">Avg. Setup</div>
//               </div>
//               <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
//                 <div className="text-2xl font-bold text-emerald-400">98%</div>
//                 <div className="text-slate-400 text-sm">Satisfaction</div>
//               </div>
//               <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
//                 <div className="text-2xl font-bold text-amber-400">24/7</div>
//                 <div className="text-slate-400 text-sm">Support</div>
//               </div>
//             </motion.div>
//           </motion.div>

//         </div>
//       </div>

//       {/* Floating CTA */}
//       <motion.div
//         initial={{ opacity: 0, y: 100 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1, type: "spring" }}
//         className="fixed bottom-8 right-8 z-50"
//       >
//         <button
//           onClick={() => containerRef.current?.scrollIntoView({ behavior: 'smooth' })}
//           className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 hover:scale-105"
//         >
//           <Sparkles className="w-5 h-5" />
//           Start Hiring Now
//           <ArrowRight className="w-5 h-5" />
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default CompanyRegister;




//  3 ooption
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CompanyRegisterForm from "../../auth/signup/company/CompanySignup";
import PlanSelectionPage from "../../auth/signup/company/CompanyAuth/PlanSelectionModal";
import {
  Sparkles,
  Shield,
  Users,
  Target,
  Zap,
  Globe,
  Clock,
  Star,
  Briefcase,
  Mail,
  Phone,
  Gem,
  Rocket,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Building2,
  Hexagon,
  Circle,
  Square,
  Triangle,
} from "lucide-react";

const CompanyRegister = () => {
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  /* ================= HANDLERS ================= */
  const handleShowPlans = () => {
    setShowPlans(true);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPlans(false);
    
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  /* ================= INTERSECTION OBSERVER ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* ================= LOCK SCROLL WHEN POPUP OPEN ================= */
  useEffect(() => {
    if (showPlans) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [showPlans]);

  /* ================= ANIMATION VARIANTS ================= */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.12,
        duration: 0.6 
      } 
    },
  };

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.95 
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.5 
      },
    },
  };

  /* ================= UNIQUE FEATURES ================= */
  const features = [
    {
      icon: Target,
      title: "Skill-First Hiring",
      desc: "Evaluate real project work",
      color: "from-rose-500 to-pink-600",
      gradient: "bg-gradient-to-br from-rose-500/20 to-pink-600/20",
      delay: 0.1,
    },
    {
      icon: Shield,
      title: "Admin Verified",
      desc: "Trusted companies only",
      color: "from-violet-500 to-purple-600",
      gradient: "bg-gradient-to-br from-violet-500/20 to-purple-600/20",
      delay: 0.2,
    },
    {
      icon: Zap,
      title: "Fast Hiring",
      desc: "60% quicker process",
      color: "from-amber-500 to-orange-600",
      gradient: "bg-gradient-to-br from-amber-500/20 to-orange-600/20",
      delay: 0.3,
    },
    {
      icon: Globe,
      title: "Global Talent",
      desc: "Worldwide candidates",
      color: "from-emerald-500 to-teal-600",
      gradient: "bg-gradient-to-br from-emerald-500/20 to-teal-600/20",
      delay: 0.4,
    },
    {
      icon: Gem,
      title: "Premium Talent",
      desc: "Top 1% candidates",
      color: "from-cyan-500 to-blue-600",
      gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20",
      delay: 0.5,
    },
    {
      icon: Rocket,
      title: "Rapid Onboarding",
      desc: "Setup in minutes",
      color: "from-fuchsia-500 to-rose-600",
      gradient: "bg-gradient-to-br from-fuchsia-500/20 to-rose-600/20",
      delay: 0.6,
    },
  ];

  /* ================= ENHANCED ANIMATED GRADIENT BACKGROUND ================= */
  const AnimatedGradientBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* SUBTLE ANIMATED GRADIENT (Flowing Colors) */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(244, 114, 182, 0.2) 0%, transparent 50%), radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 100%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, rgba(244, 114, 182, 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 100%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.2) 0%, transparent 50%), radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 100% 0%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* MESH GRADIENT OVERLAY */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(244, 114, 182, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 60% 60%, rgba(34, 197, 94, 0.15) 0%, transparent 40%)
              `,
              filter: 'blur(60px)',
            }}
          />
        </div>

        {/* FLOATING GEOMETRIC SHAPES */}
        {[...Array(15)].map((_, i) => {
          const shapes = [Hexagon, Circle, Square, Triangle];
          const Shape = shapes[i % 4];
          const size = Math.random() * 40 + 20;
          const duration = Math.random() * 20 + 20;
          
          return (
            <motion.div
              key={`shape-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: size,
                height: size,
              }}
              animate={{
                y: [0, Math.random() * 200 - 100],
                x: [0, Math.random() * 200 - 100],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            >
              <Shape 
                className="text-white/5" 
                size={size} 
                fill="currentColor"
                strokeWidth={0.5}
              />
            </motion.div>
          );
        })}

        {/* ANIMATED PARTICLES */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                i % 4 === 0 ? '#f472b6' : 
                i % 4 === 1 ? '#8b5cf6' : 
                i % 4 === 2 ? '#0ea5e9' : '#10b981'
              }, transparent)`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, Math.random() * 300 - 150],
              x: [0, Math.random() * 300 - 150],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    );
  };

  /* ================= RADIAL GLOW EFFECTS COMPONENT ================= */
  const RadialGlowEffects = () => {
    return (
      <>
        {/* Radial Glow around Header */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[800px] h-[800px] rounded-full"
          animate={{
            background: [
              'radial-gradient(circle, rgba(244, 114, 182, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(244, 114, 182, 0.1) 0%, transparent 70%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ filter: 'blur(100px)' }}
        />

        {/* Radial Glow around Form */}
        <motion.div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          animate={{
            background: [
              'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ filter: 'blur(120px)' }}
        />

        {/* Radial Glow around Features */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          animate={{
            background: [
              'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(244, 114, 182, 0.06) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
            ],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ filter: 'blur(100px)' }}
        />
      </>
    );
  };

  return (
    <div ref={scrollRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-cyan-950/20">

      {/* ================= ENHANCED BACKGROUND EFFECTS ================= */}
      <AnimatedGradientBackground />
      <RadialGlowEffects />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black, transparent 70%)',
        }}
      />

      {/* Parallax Background Layers */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 right-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
      </motion.div>

      {/* ================= FULL SCREEN PLAN POPUP ================= */}
      {showPlans && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
          
          {/* Enhanced Popup Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 70%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ filter: 'blur(120px)' }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              style={{ filter: 'blur(120px)' }}
            />
          </div>

          {/* Plan Selection */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 w-full h-full flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-6xl">
              <button
                onClick={() => setShowPlans(false)}
                className="absolute -top-16 right-0 text-slate-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to registration
              </button>
              <PlanSelectionPage onSelect={handlePlanSelect} />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <motion.div 
        style={{ opacity }}
        ref={containerRef} 
        className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12"
      >

        {/* Premium Header with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="relative">
            {/* Glassmorphism Header Background */}
            <div className="absolute inset-0 -inset-x-8 -inset-y-4 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl" />
            
            <div className="relative flex flex-col items-center gap-6 mb-8 p-8">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 8 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-rose-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-purple-500/50"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 to-transparent" />
                <Sparkles className="text-white w-10 h-10" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
              </motion.div>
              
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-6xl font-bold"
                >
                  <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    ProveIt
                  </span>
                  <span className="text-white">.io</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-300/90 max-w-2xl mx-auto text-xl font-light"
                >
                  Where <span className="text-amber-400 font-semibold">Elite Talent</span> Meets{" "}
                  <span className="text-cyan-400 font-semibold">Innovative Companies</span>
                </motion.p>
              </div>
            </div>
          </div>

          {/* Trust Badges with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {[
              { icon: Shield, text: "Enterprise Security", color: "emerald" },
              { icon: Award, text: "Award-Winning Platform", color: "amber" },
              { icon: Gem, text: "Premium Network", color: "rose" },
              { icon: CheckCircle, text: "Verified Companies", color: "cyan" },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <badge.icon className={`w-4 h-4 text-${badge.color}-400`} />
                <span className="text-sm text-slate-300 font-medium">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT PANEL - Enhanced with Glassmorphism */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="lg:col-span-5 space-y-8"
          >
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group cursor-pointer"
                >
                  {/* Glassmorphism Card */}
                  <div className={`relative ${f.gradient} border border-white/20 rounded-2xl p-6 backdrop-blur-xl hover:border-white/40 transition-all duration-500 overflow-hidden`}>
                    {/* Mesh Gradient Overlay */}
                    <div className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%),
                          radial-gradient(circle at 100% 100%, rgba(255,255,255,0.05) 0%, transparent 50%)
                        `,
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-xl`}
                      >
                        <f.icon className="text-white w-7 h-7" />
                      </div>
                      <h4 className="text-white font-bold text-base mb-2">{f.title}</h4>
                      <p className="text-slate-400/90 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Card with Glassmorphism */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 backdrop-blur-xl overflow-hidden">
                {/* Mesh Gradient Background */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)
                    `,
                    filter: 'blur(40px)',
                  }}
                />
                
                <div className="relative">
                  <h4 className="text-white font-bold text-xl mb-8 flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                    Platform Growth
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "500+", label: "Companies", trend: "+23%", color: "rose" },
                      { value: "24h", label: "Avg. Approval", trend: "Fast", color: "cyan" },
                      { value: "95%", label: "Success Rate", trend: "+5%", color: "amber" },
                      { value: "10k+", label: "Successful Hires", trend: "+45%", color: "emerald" },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="space-y-2"
                      >
                        <div className="flex items-end justify-between">
                          <div className={`text-3xl font-bold text-${s.color}-400`}>
                            {s.value}
                          </div>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                            {s.trend}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-slate-400/90 text-sm">
                          <div className={`w-4 h-4 rounded-full bg-${s.color}-500/20`} />
                          {s.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT FORM - Enhanced with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              delay: 0.3, 
              type: "spring", 
              stiffness: 100, 
              damping: 20 
            }}
            className="lg:col-span-7"
          >
            <div className="relative">
              {/* Glassmorphism Form Container */}
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 border border-white/25 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl shadow-purple-500/20">
                
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 rounded-3xl">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'linear-gradient(45deg, rgba(244, 114, 182, 0.3) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(6, 182, 212, 0.3) 100%)',
                        'linear-gradient(45deg, rgba(6, 182, 212, 0.3) 0%, rgba(244, 114, 182, 0.3) 50%, rgba(139, 92, 246, 0.3) 100%)',
                        'linear-gradient(45deg, rgba(139, 92, 246, 0.3) 0%, rgba(6, 182, 212, 0.3) 50%, rgba(244, 114, 182, 0.3) 100%)',
                      ],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      maskImage: 'linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)',
                      maskComposite: 'exclude',
                      WebkitMaskComposite: 'xor',
                      maskClip: 'padding-box, border-box',
                      maskOrigin: 'padding-box, border-box',
                      padding: '2px',
                      borderRadius: 'inherit',
                    }}
                  />
                </div>
                
                {/* Animated Top Bar */}
                <motion.div
                  className="h-2 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                />
                
                <div className="relative z-10 p-10">
                  <div className="mb-10">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl font-bold text-white mb-3"
                    >
                      Join the Future of Hiring
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-slate-400 text-lg"
                    >
                      Register your company and access top-tier talent in minutes
                    </motion.p>
                  </div>

                  <CompanyRegisterForm
                    onShowPlans={handleShowPlans}
                    selectedPlan={selectedPlan}
                  />
                </div>
              </div>

              {/* Quick Stats Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 grid grid-cols-3 gap-4"
              >
                {[
                  { value: "2 Min", label: "Avg. Setup", color: "cyan" },
                  { value: "98%", label: "Satisfaction", color: "emerald" },
                  { value: "24/7", label: "Support", color: "amber" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="text-center p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20"
                  >
                    <div className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-8 right-8 z-50"
      >
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => containerRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 backdrop-blur-sm border border-white/20 transition-all duration-300"
        >
          <Sparkles className="w-5 h-5" />
          Start Hiring Now
          <ArrowRight className="w-5 h-5" />
        </motion.button> */}
      </motion.div>
    </div>
  );
};

export default CompanyRegister;
