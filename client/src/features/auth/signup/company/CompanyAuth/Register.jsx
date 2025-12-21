import React from "react";
import { motion } from "framer-motion";
import CompanyRegisterForm from "../CompanySignup";
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
} from "lucide-react";

const CompanyRegister = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  };

  const features = [
    {
      icon: Target,
      title: "Skill-First Hiring",
      desc: "Evaluate real project work",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: Shield,
      title: "Admin Verified",
      desc: "Trusted companies only",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Zap,
      title: "Fast Hiring",
      desc: "60% quicker process",
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      icon: Globe,
      title: "Global Talent",
      desc: "Worldwide candidates",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  const stats = [
    { value: "500+", label: "Companies", icon: Briefcase },
    { value: "24h", label: "Approval", icon: Clock },
    { value: "95%", label: "Success", icon: Star },
    { value: "10k+", label: "Hires", icon: Users },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070f]">

      {/* 🌈 Animated Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[140px] animate-pulse delay-200" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-fuchsia-500/20 rounded-full blur-[160px]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:32px_32px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-cyan-500/30">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              ProveIt.io
            </h1>
          </div>
          <p className="text-slate-300 max-w-xl mx-auto">
            Skill-verified recruitment platform built for modern hiring teams
          </p>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 space-y-6"
          >
            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative bg-slate-900/70 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-cyan-400/40 transition group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center mb-3 shadow-lg`}
                  >
                    <f.icon className="text-white w-5 h-5" />
                  </div>
                  <h4 className="text-white font-semibold text-sm">
                    {f.title}
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h4 className="text-white font-semibold mb-4">
                Platform Stats
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                      {s.value}
                    </div>
                    <div className="text-xs text-slate-400">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 backdrop-blur">
              <h4 className="text-white font-semibold mb-4">
                Need Help?
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300">
                    support@proveit.io
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300">
                    +1 (555) 123-4567
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <div className="relative bg-slate-900/80 border border-white/10 rounded-3xl shadow-2xl shadow-indigo-500/10 overflow-hidden backdrop-blur-xl">

              {/* Top Gradient Line */}
              <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500" />

              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  Company Registration
                </h3>
                <p className="text-slate-400 text-sm">
                  Complete all steps to get approved
                </p>
              </div>

              <div className="p-6">
                <CompanyRegisterForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;
