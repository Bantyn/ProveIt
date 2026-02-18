import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward, FiClock, FiCheckCircle,
  FiChevronRight, FiZap, FiMapPin,
  FiHeart, FiActivity, FiCode, FiUsers,
  FiStar, FiExternalLink
} from "react-icons/fi";
import { THEME_TOKENS } from '../../utils/theme';
import Image from './Innovation.png'


// ─── Helpers ────────────────────────────────────────────────────────────────

const CATEGORY_COLORS = {
  Frontend:  { bg: 'bg-sky-500/10',     text: 'text-sky-500'     },
  Backend:   { bg: 'bg-violet-500/10',  text: 'text-violet-500'  },
  Mobile:    { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  'AI/ML':   { bg: 'bg-rose-500/10',    text: 'text-rose-500'    },
  Design:    { bg: 'bg-pink-500/10',    text: 'text-pink-500'    },
  DevOps:    { bg: 'bg-amber-500/10',   text: 'text-amber-500'   },
  General:   { bg: 'bg-indigo-500/10',  text: 'text-indigo-500'  },
};

const getCategoryStyle = (cat) =>
  CATEGORY_COLORS[cat] ?? { bg: 'bg-indigo-500/10', text: 'text-indigo-500' };

const TECH_COLORS = [
  'from-indigo-500 to-violet-600',
  'from-sky-500 to-indigo-500',
  'from-violet-500 to-fuchsia-600',
  'from-emerald-500 to-teal-600',
];

// ─── Deadline badge ──────────────────────────────────────────────────────────

const DeadlineBadge = ({ deadline }) => {
  const { label, urgency } = useMemo(() => {
    if (!deadline) return { label: 'Open', urgency: 'normal' };
    const diffDays = Math.ceil((new Date(deadline) - new Date()) / 86_400_000);
    if (diffDays <= 0)  return { label: 'Ended',      urgency: 'ended'  };
    if (diffDays === 1) return { label: 'Ends Today',  urgency: 'urgent' };
    if (diffDays <= 3)  return { label: `${diffDays}d left`, urgency: 'urgent' };
    if (diffDays <= 7)  return { label: `${diffDays}d left`, urgency: 'soon'   };
    return {
      label: new Date(deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      urgency: 'normal',
    };
  }, [deadline]);

  const colorMap = {
    urgent: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    soon:   'text-amber-500 bg-amber-500/10 border-amber-500/20',
    ended:  'text-slate-400 bg-slate-500/10 border-slate-500/20',
    normal: 'text-slate-500 bg-slate-500/8 border-slate-500/10',
  };

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[10px] font-black ${colorMap[urgency]}`}>
      <FiClock size={11} />
      <span>{label}</span>
      {urgency === 'urgent' && (
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping absolute" />
      )}
    </div>
  );
};

// ─── Avatar stack ────────────────────────────────────────────────────────────

const AvatarStack = ({ count, darkMode }) => (
  <div className="flex items-center gap-2">
    <div className="flex -space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{ zIndex: 3 - i }}
          className={`relative w-6 h-6 rounded-full border-2 ${
            darkMode ? 'border-gray-900' : 'border-white'
          } bg-gradient-to-br ${TECH_COLORS[i % TECH_COLORS.length]}`}
        />
      ))}
    </div>
    <span className="text-[10px] font-bold text-slate-400">
      {count.toLocaleString()}+
    </span>
  </div>
);

// ─── Tech pill ───────────────────────────────────────────────────────────────

const TechPill = ({ tech, index, darkMode }) => (
  <div
    title={tech}
    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${
      darkMode
        ? 'bg-white/5 border-white/5 text-slate-400'
        : 'bg-slate-50 border-slate-100 text-slate-500'
    }`}
  >
    <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${TECH_COLORS[index % TECH_COLORS.length]}`} />
    {tech}
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────

const CompetitionCard = ({ competition, darkMode = false, index = 0 }) => {
  const [saved, setSaved] = useState(false);
  const [applying, setApplying] = useState(false);

  const theme = darkMode ? THEME_TOKENS.dark : THEME_TOKENS.light;

  const {
    jobTitle       = "Software Engineer",
    roleType       = "Full-time",
    experience     = "0-2 Years",
    category       = "General",
    competitionTitle = "Technical Assessment",
    company,
    problemStatement,
    techStack      = [],
    totalParticipants: participants = 0,
    deadline,
    isPremium      = false,
    prizePool: prize,
    stipend,
    salary,
    location       = "Remote",
  } = competition || {};

  const companyName  = typeof company === 'object' ? company.name     : (company || 'Elite Company');
  const companyLogo  = typeof company === 'object' ? company.logo     : null;
  const hiringCount  = typeof company === 'object' ? company.hiringCount : null;
  const isVerified   = typeof company === 'object' ? company.isVerified  : false;

  const categoryStyle = getCategoryStyle(category);

  const handleApply = useCallback(async (e) => {
    e.stopPropagation();
    if (applying) return;
    setApplying(true);
    await new Promise(r => setTimeout(r, 900));
    setApplying(false);
  }, [applying]);

  const handleSave = useCallback((e) => {
    e.stopPropagation();
    setSaved(v => !v);
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      aria-label={`${jobTitle} at ${companyName}`}
      className={`relative group rounded-[2rem] border transition-all duration-500 overflow-hidden ${
        darkMode
          ? 'bg-gray-900/70 border-white/5 shadow-2xl shadow-black/20'
          : 'bg-white border-indigo-100/60 shadow-xl shadow-indigo-500/5'
      } backdrop-blur-xl`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl -mr-20 -mt-20 rounded-full" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-2xl -ml-16 -mb-16 rounded-full" />
      </div>

      {/* Premium ribbon */}
      {isPremium && (
        <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30">
          <FiStar size={10} className="text-white" fill="white" />
          <span className="text-[9px] font-black uppercase tracking-widest text-white">Premium</span>
        </div>
      )}

      <div className="relative z-10 p-6 sm:p-7 flex flex-col lg:flex-row gap-6 items-stretch">

        {/* ── Zone 1: Company & Identity ── */}
        <div className="flex-[0.85] min-w-0 flex flex-col justify-between gap-5">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className={`relative w-14 h-14 flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-105 shadow-lg ${
              darkMode ? 'ring-1 ring-white/10' : 'ring-1 ring-indigo-100'
            }`}>
              {companyLogo ? (
                <img src={Image} alt={companyName} className="w-full h-full object-contain p-1" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-xl">
                  {companyName?.[0]?.toUpperCase()}
                </div>
              )}
              {/* Hiring count badge */}
              {hiringCount && (
                <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-emerald-500 rounded-lg text-[8px] font-black text-white shadow-md">
                  {hiringCount}
                </div>
              )}
            </div>

            {/* Name block */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span className={`text-xs font-bold truncate max-w-[160px] ${theme.textSecondary}`}>
                  {companyName}
                </span>
                {isVerified && (
                  <FiCheckCircle
                    className="text-blue-500 w-3.5 h-3.5 flex-shrink-0"
                    aria-label="Verified company"
                  />
                )}
                {/* Category chip */}
                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${categoryStyle.bg} ${categoryStyle.text}`}>
                  {category}
                </span>
              </div>
              <h2 className={`text-lg sm:text-xl font-black tracking-tight leading-snug transition-colors duration-300 group-hover:text-indigo-500 ${theme.textPrimary}`}>
                {jobTitle}
              </h2>
            </div>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap gap-2">
            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold ${
              darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
            }`}>
              <FiZap size={11} className="text-amber-400" /> {roleType}
            </span>
            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold ${
              darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <FiActivity size={11} /> {experience}
            </span>
            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold ${
              darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-500'
            }`}>
              <FiMapPin size={11} /> {location}
            </span>
          </div>
        </div>

        {/* ── Zone 2: Assessment & Stats ── */}
        <div className={`flex-1 flex flex-col justify-between gap-4 border-t lg:border-t-0 lg:border-l border-dashed ${
          darkMode ? 'border-white/8' : 'border-slate-200/80'
        } pt-5 lg:pt-0 lg:pl-7`}>
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-indigo-500/60 block mb-2">
              Technical Path
            </span>
            <h3 className={`text-sm font-black leading-snug mb-2 ${theme.textPrimary}`}>
              {competitionTitle}
            </h3>
            <p className={`text-[11px] font-medium leading-relaxed line-clamp-2 ${theme.textSecondary} opacity-60`}>
              {problemStatement || "Solve a real-world challenge and skip traditional screening rounds entirely."}
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                <FiUsers size={9} className="inline mr-1" />Participants
              </span>
              <AvatarStack count={participants} darkMode={darkMode} />
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                <FiCode size={9} className="inline mr-1" />Stack
              </span>
              {techStack.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {techStack.slice(0, 3).map((tech, i) => (
                    <TechPill key={i} tech={tech} index={i} darkMode={darkMode} />
                  ))}
                  {techStack.length > 3 && (
                    <span className="text-[9px] font-black text-slate-400 self-center">
                      +{techStack.length - 3}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-[10px] text-slate-400 font-bold">Open Stack</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Zone 3: Reward & CTA ── */}
        <div className={`flex-[0.75] flex flex-col justify-between gap-4 border-t lg:border-t-0 lg:border-l border-dashed ${
          darkMode ? 'border-white/8' : 'border-slate-200/80'
        } pt-5 lg:pt-0 lg:pl-7`}>

          {/* Package */}
          <div className={`p-4 rounded-2xl border ${
            darkMode ? 'bg-indigo-500/5 border-indigo-500/10' : 'bg-gradient-to-br from-indigo-50/80 to-violet-50/40 border-indigo-100/80'
          }`}>
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-indigo-500/60 block mb-1">
              Expected Package
            </span>
            <p className={`text-2xl font-black tracking-tight ${theme.textPrimary}`}>
              {salary || stipend || 'Competitive'}
            </p>
            {hiringCount && (
              <span className="text-[9px] font-bold text-emerald-500 mt-1 block">
                {hiringCount} open position{hiringCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Prize + Deadline */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <FiAward size={14} className="text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">
                {prize || 'Hiring'}
              </span>
            </div>
            <DeadlineBadge deadline={deadline} />
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2.5">
            <motion.button
              onClick={handleApply}
              whileHover={{ scale: applying ? 1 : 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={applying}
              aria-label={`Apply for ${jobTitle}`}
              className="flex-1 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-70 text-white rounded-xl font-black text-[11px] shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
            >
              <AnimatePresence mode="wait" initial={false}>
                {applying ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Applying…
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Apply Now <FiChevronRight size={14} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              aria-label={saved ? "Remove from saved" : "Save competition"}
              aria-pressed={saved}
              className={`p-3.5 rounded-xl border transition-all duration-300 ${
                saved
                  ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : `${theme.border} ${theme.surface} text-slate-400 hover:text-rose-500 hover:border-rose-200`
              }`}
            >
              <FiHeart size={18} fill={saved ? "white" : "none"} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default CompetitionCard;