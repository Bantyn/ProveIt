import React from "react";
import { motion } from "framer-motion";
import CompanyRegisterForm from "../../signup/company/CompanySignup";
import {
  Sparkles,
  Shield,
  CheckCircle,
  Users,
  Target,
  Zap,
  Globe,
  Clock,
  Star,
  Briefcase,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";

const CompanyRegister = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 90 },
    },
  };

  const features = [
    {
      icon: Target,
      title: "Skill-First Hiring",
      desc: "Evaluate real project work",
      color: "from-indigo-500 to-violet-500",
    },
    {
      icon: Shield,
      title: "Admin Verified",
      desc: "Trusted companies only",
      color: "from-cyan-500 to-sky-500",
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
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const stats = [
    { value: "500+", label: "Companies", icon: Briefcase },
    { value: "24h", label: "Approval", icon: Clock },
    { value: "95%", label: "Success", icon: Star },
    { value: "10k+", label: "Hires", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 relative overflow-hidden">

      {/* Soft Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[length:36px_36px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex justify-center items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-white">ProveIt.io</h1>
          </div>
          <p className="text-slate-400">
            Skill-verified recruitment platform
          </p>
        </motion.div>

        {/* 🔁 NEW GRID: 4 / 8 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT – INFO (4/12) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 space-y-5"
          >
            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-slate-900/70 backdrop-blur rounded-xl p-4 border border-slate-800 hover:border-indigo-500 transition"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${f.color} flex items-center justify-center mb-2`}
                  >
                    <f.icon className="text-white w-5 h-5" />
                  </div>
                  <h4 className="text-white font-semibold text-sm">
                    {f.title}
                  </h4>
                  <p className="text-slate-400 text-xs">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
              <h4 className="text-white font-semibold mb-4">
                Platform Stats
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-xl font-bold text-indigo-400">
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
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
              <h4 className="text-white font-semibold mb-3">
                Need Help?
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-300">
                    support@proveit.io
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-300">
                    +1 (555) 123-4567
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT – FORM (8/12) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">

              <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

              <div className="p-6 border-b border-slate-800">
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
