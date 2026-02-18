import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiAward, FiClock, FiZap, FiChevronRight, FiChevronLeft,
  FiUsers, FiCheckCircle, FiCalendar, FiBriefcase, FiArrowRight
} from 'react-icons/fi';
import { THEME_TOKENS } from '../../utils/theme';
import { Import } from 'lucide-react';
import Image from './Innovation.png';

// ─── Hiring pipeline steps ───────────────────────────────────────────────────

const PIPELINE_STEPS = [
  { icon: '📋', label: 'Join',      desc: 'Enroll free'       },
  { icon: '💻', label: 'Build',     desc: 'Submit project'    },
  { icon: '🏆', label: 'Shortlist', desc: 'Top picks selected'},
  { icon: '📅', label: 'Interview', desc: 'Schedule & hire'   },
];

// ─── Deadline helper ─────────────────────────────────────────────────────────

const getDeadlineLabel = (deadline) => {
  if (!deadline) return { label: 'Open', urgent: false };
  const days = Math.ceil((new Date(deadline) - Date.now()) / 86_400_000);
  if (days <= 0)  return { label: 'Ended',        urgent: false };
  if (days === 1) return { label: 'Ends Today',   urgent: true  };
  if (days <= 3)  return { label: `${days}d left`, urgent: true  };
  if (days <= 7)  return { label: `${days}d left`, urgent: false };
  return {
    label: new Date(deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    urgent: false,
  };
};

// ─── Pipeline bar sub-component ──────────────────────────────────────────────

const HiringPipeline = () => (
  <div className="flex items-center gap-1 sm:gap-2">
    {PIPELINE_STEPS.map((step, i) => (
      <React.Fragment key={step.label}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 + i * 0.08 }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-base shadow-lg">
            {step.icon}
          </div>
          <span className="text-[8px] font-black uppercase tracking-wider text-white/60 hidden sm:block">
            {step.label}
          </span>
        </motion.div>
        {i < PIPELINE_STEPS.length - 1 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
            className="flex-1 h-px bg-white/20 origin-left min-w-[12px] max-w-[32px]"
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

// ─── Progress bar ─────────────────────────────────────────────────────────────

const AutoplayProgress = ({ duration, isPlaying, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) { setProgress(0); return; }
    startRef.current = null;

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);
      if (pct < 1) frameRef.current = requestAnimationFrame(tick);
      else onComplete?.();
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isPlaying, duration]);  // eslint-disable-line

  return (
    <div className="h-0.5 w-full bg-white/15 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-white rounded-full"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const FeaturedCarousel = ({ darkMode = false, competitions = [] }) => {
  const theme    = darkMode ? THEME_TOKENS.dark : THEME_TOKENS.light;
  const featured = competitions.filter(c => c.featured).slice(0, 5);

  const [index,     setIndex]     = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const AUTOPLAY_MS = 6000;

  const go = useCallback((nextIndex) => {
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
  }, [index]);

  const next = useCallback(() => go((index + 1) % featured.length), [go, index, featured.length]);
  const prev = useCallback(() => go((index - 1 + featured.length) % featured.length), [go, index, featured.length]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (featured.length === 0) return null;

  const current   = featured[index];
  const deadline  = getDeadlineLabel(current.deadline);
  const company   = typeof current.company === 'object' ? current.company : { name: current.company || 'Company' };
  const salary    = current.salary || current.stipend || null;

  const slideVariants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 0.98 }),
  };

  return (
    <section
      className={`py-16 sm:py-20 relative ${darkMode ? 'bg-gray-950' : 'bg-slate-50/50'}`}
      aria-label="Featured competitions"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500/70">
                Handpicked
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none ${theme.textPrimary}`}>
              Featured{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-600">
                Arenas
              </span>
            </h2>
            <p className={`text-sm font-medium mt-2 opacity-50 ${theme.textSecondary}`}>
              Top companies hiring through real-work challenges — no resume screens.
            </p>
          </div>

          {/* Nav controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {[
              { label: 'Previous', action: prev, Icon: FiChevronLeft },
              { label: 'Next',     action: next, Icon: FiChevronRight },
            ].map(({ label, action, Icon }) => (
              <button
                key={label}
                onClick={action}
                aria-label={label}
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all active:scale-90 ${
                  darkMode
                    ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>

        {/* ── Slide stage ── */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
          style={{ height: 'clamp(560px, 62vw, 640px)' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured competitions carousel"
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {/* Background image + overlays */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[8s] hover:scale-105"
                style={{
                  backgroundImage: `url(${
                    current.bannerImage ||
                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070'
                  })`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/70 to-gray-950/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-14 text-white">

                {/* Top: badges row */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap items-center gap-2"
                >
                  {/* Live badge */}
                  {current.status === 'Live' && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      Live Now
                    </span>
                  )}

                  {/* Trending */}
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/90 text-white text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md">
                    <FiZap size={10} className="animate-pulse" /> Trending
                  </span>

                  {/* Prize */}
                  {current.prizePool && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[10px] font-black uppercase tracking-widest">
                      <FiAward size={10} className="text-amber-400" /> {current.prizePool}
                    </span>
                  )}

                  {/* Deadline */}
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-widest border ${
                    deadline.urgent
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : 'bg-white/10 border-white/15'
                  }`}>
                    <FiClock size={10} /> {deadline.label}
                  </span>
                </motion.div>

                {/* Middle: main content */}
                <div className="flex-1 flex flex-col justify-center max-w-xl py-4 gap-4 min-h-0">

                  {/* Company */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center font-black text-lg backdrop-blur-md shadow-lg overflow-hidden">
                      {company.logo
                        ? <img src={Image} alt={company.name} className="w-full h-full object-contain p-1" />
                        : company.name?.[0]?.toUpperCase()
                      }
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-white/90">{company.name}</span>
                        {company.isVerified && <FiCheckCircle size={12} className="text-blue-400" />}
                      </div>
                      {company.hiringCount && (
                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                          {company.hiringCount} open position{company.hiringCount > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Job title + competition title */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 }}
                  >
                    {current.jobTitle && (
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-indigo-300/80 mb-2 flex items-center gap-2">
                        <FiBriefcase size={11} /> {current.jobTitle} · {current.roleType || 'Full-time'}
                      </p>
                    )}
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight line-clamp-2">
                      {current.competitionTitle}
                    </h3>
                  </motion.div>

                  {/* Problem statement */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34 }}
                    className="text-sm sm:text-base opacity-65 font-medium leading-relaxed line-clamp-2"
                  >
                    {current.problemStatement || 'Solve a real business challenge and skip traditional screening. Top submissions get direct interview invites.'}
                  </motion.p>

                  {/* Stats row */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center gap-5"
                  >
                    <div className="flex items-center gap-2">
                      <FiUsers size={14} className="text-white/50" />
                      <div>
                        <p className="text-base font-black leading-none">
                          {(current.totalParticipants || 0).toLocaleString()}+
                        </p>
                        <p className="text-[9px] uppercase font-black tracking-widest opacity-40 mt-0.5">
                          Competing
                        </p>
                      </div>
                    </div>

                    {salary && (
                      <>
                        <div className="h-8 w-px bg-white/10" />
                        <div>
                          <p className="text-base font-black leading-none text-emerald-400">{salary}</p>
                          <p className="text-[9px] uppercase font-black tracking-widest opacity-40 mt-0.5">
                            Expected CTC
                          </p>
                        </div>
                      </>
                    )}

                    {current.experience && (
                      <>
                        <div className="h-8 w-px bg-white/10" />
                        <div>
                          <p className="text-base font-black leading-none">{current.experience}</p>
                          <p className="text-[9px] uppercase font-black tracking-widest opacity-40 mt-0.5">
                            Experience
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>

                {/* Bottom: pipeline + CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44 }}
                  className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
                >
                  {/* Hiring pipeline visualization */}
                  <div className="space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
                      How it works
                    </p>
                    <HiringPipeline />
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-6 sm:px-8 py-3.5 bg-white text-gray-900 rounded-2xl font-black text-xs shadow-2xl flex items-center gap-2 group/btn hover:bg-indigo-50 transition-colors whitespace-nowrap"
                    >
                      Join Challenge
                      <FiArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1 flex-shrink-0" />
                    </motion.button>
                    <button className="px-4 sm:px-6 py-3.5 bg-white/10 border border-white/15 backdrop-blur-md text-white rounded-2xl font-black text-xs hover:bg-white/20 transition-colors whitespace-nowrap">
                      Learn More
                    </button>
                  </div>
                </motion.div>

                {/* Slide counter + dots — inside flex layout so they never overlap content */}
                <div className="flex items-center justify-between pt-4 mt-1 border-t border-white/10">
                  <span className="text-white/35 text-[11px] font-black uppercase tracking-widest">
                    {String(index + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    {featured.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => go(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={index === i ? 'true' : undefined}
                        className={`rounded-full transition-all duration-300 ${
                          index === i ? 'w-7 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Autoplay progress bar at top */}
          <div className="absolute top-0 left-0 right-0 z-20 px-7 pt-4">
            <AutoplayProgress
              key={`${index}-${paused}`}
              duration={AUTOPLAY_MS}
              isPlaying={!paused}
              onComplete={next}
            />
          </div>
        </div>

        {/* ── Thumbnail strip ── */}
        {featured.length > 1 && (
          <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {featured.map((item, i) => {
              const comp = typeof item.company === 'object'
                ? item.company
                : { name: String(item.company || '?') };
              const initial = comp.name?.[0]?.toUpperCase() ?? '?';
              return (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`View ${item.competitionTitle}`}
                  aria-pressed={index === i}
                  className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 text-left min-w-0 ${
                    index === i
                      ? darkMode
                        ? 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-lg shadow-indigo-500/10'
                        : 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-md shadow-indigo-100'
                      : darkMode
                      ? 'bg-white/[0.03] border-white/[0.08] text-white/50 hover:bg-white/[0.07]'
                      : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 shadow-sm'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 overflow-hidden ${
                    index === i
                      ? 'bg-indigo-600 text-white'
                      : darkMode ? 'bg-white/10 text-white/60' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {comp.logo
                      ? <img src={Image} alt={comp.name} className="w-full h-full object-contain p-0.5" />
                      : initial
                    }
                  </div>
                  <div className="min-w-0 max-w-[130px]">
                    <p className="text-[11px] font-black truncate leading-tight">
                      {item.competitionTitle}
                    </p>
                    <p className="text-[9px] font-bold opacity-50 truncate mt-0.5">{comp.name}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCarousel;

