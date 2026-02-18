import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CompetitionHero from '../../CompitionCom/HeroScetion';

import DisplayCom from '../../CompitionCom/DisplayCom';
import FeaturedCarousel from '../../CompitionCom/FeaturedCarousel';
//import QuickStats from '../../CompitionCom/QuickStats';
import TopPerformers from '../../CompitionCom/TopPerformers';
import PartnerLogos from '../../CompitionCom/PartnerLogos';
import { competitions } from '../../../data/competitions';
import { THEME_TOKENS } from '../../../utils/theme';

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────

const Reveal = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 28 : direction === 'down' ? -28 : 0,
      x: direction === 'left' ? 28 : direction === 'right' ? -28 : 0,
      scale: direction === 'scale' ? 0.97 : 1,
    },
    visible: {
      opacity: 1, y: 0, x: 0, scale: 1,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// ─── Thin gradient divider ────────────────────────────────────────────────────

const Divider = ({ darkMode }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
    <div className={`h-px ${darkMode
      ? 'bg-gradient-to-r from-transparent via-white/6 to-transparent'
      : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'
      }`} />
  </div>
);

// ─── "Skip to content" link (accessibility) ───────────────────────────────────

const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-xl focus:font-black focus:text-xs focus:uppercase focus:tracking-wider focus:shadow-xl"
  >
    Skip to main content
  </a>
);

// ─── Sticky breadcrumb / nav bar ─────────────────────────────────────────────

const TopBar = ({ isDarkMode, isScrolled, onToggleTheme }) => (
  <motion.header
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
      ? `backdrop-blur-xl ${isDarkMode
        ? 'bg-gray-950/88 border-b border-white/5 shadow-xl shadow-black/25'
        : 'bg-white/88 border-b border-slate-100 shadow-md shadow-slate-200/60'
      }`
      : 'bg-transparent'
      }`}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest" role="list">
          {[
            { label: 'Home', href: '/' },
            { label: 'Competitions', href: '/competitions' },
          ].map((crumb, i, arr) => {
            const isActive = i === arr.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden className={isDarkMode ? 'text-slate-700' : 'text-slate-300'}>
                    /
                  </span>
                )}
                <a
                  href={crumb.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`transition-colors duration-200 ${isActive
                    ? isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                    : isDarkMode ? 'text-slate-500 hover:text-slate-200' : 'text-slate-400 hover:text-slate-700'
                    }`}
                >
                  {crumb.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Theme toggle — top-right, always visible */}
      <motion.button
        onClick={onToggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.93 }}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={isDarkMode}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border ${isDarkMode
          ? 'bg-slate-800 text-slate-300 border-white/8 hover:bg-slate-700'
          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white shadow-sm'
          }`}
      >
        <span className="text-sm leading-none">{isDarkMode ? '☀️' : '🌙'}</span>
        <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
      </motion.button>
    </div>
  </motion.header>
);

// ─── Section label (SaaS standard eyebrow) ───────────────────────────────────

const SectionEyebrow = ({ label, darkMode }) => (
  <div className="flex items-center justify-center gap-2 mb-3">
    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
    <span className={`text-[10px] font-black uppercase tracking-[0.22em] ${darkMode ? 'text-indigo-400/70' : 'text-indigo-500/70'
      }`}>
      {label}
    </span>
    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const CompitionList = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const theme = isDarkMode ? THEME_TOKENS.dark : THEME_TOKENS.light;

  // Safe theme application — never clobbers body classes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.body.style.backgroundColor = isDarkMode ? '#030712' : '#ffffff';
    document.title = 'Competitions | ProveIt — Get Hired by Building';
    return () => { document.body.style.backgroundColor = ''; };
  }, [isDarkMode]);

  // Throttled scroll via rAF
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = useCallback(() => setIsDarkMode(v => !v), []);

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 relative overflow-x-hidden ${isDarkMode ? 'dark bg-gray-950' : 'bg-white'
      }`}>

      {/* ── Skip link (a11y) ── */}
      <SkipLink />

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
        <div className={`absolute top-[-8%] right-[-4%] w-[480px] h-[480px] rounded-full blur-[120px] animate-pulse ${isDarkMode ? 'bg-indigo-600/18' : 'bg-indigo-400/10'
          }`} />
        <div className={`absolute bottom-[8%] left-[-6%] w-[560px] h-[560px] rounded-full blur-[150px] ${isDarkMode ? 'bg-violet-600/12' : 'bg-violet-400/8'
          }`} />
        <div className={`absolute top-[50%] left-[30%] w-[260px] h-[260px] rounded-full blur-[90px] ${isDarkMode ? 'bg-cyan-600/8' : 'bg-cyan-400/5'
          }`} />
      </div>

      {/* ── Sticky top bar (breadcrumb + theme toggle) ── */}
      <TopBar isDarkMode={isDarkMode} isScrolled={isScrolled} onToggleTheme={toggleTheme} />

      {/* ── Main content ── */}
      <main className="relative z-10" id="main-content">

        {/* ════════════════════════════════════════════════
            1. HERO
            — First impression. Full width. Clear value prop.
            — "Join competitions. Get hired. No resume screens."
        ════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <CompetitionHero
            themeMode={isDarkMode ? 'dark' : 'light'}
            onThemeToggle={toggleTheme}
          />
        </motion.div>



        {/* ════════════════════════════════════════════════
            3. QUICK STATS
            — Social proof numbers right after logos.
            — "24k+ candidates · ₹5.5L+ prizes · 300+ companies"
            — Reinforces trust before user digs into listings.
        ════════════════════════════════════════════════ 
        <Divider darkMode={isDarkMode} />
        <Reveal delay={0.05} direction="scale">
          <QuickStats darkMode={isDarkMode} />
        </Reveal> */}

        {/* ════════════════════════════════════════════════
            4. MAIN LIST + FILTERS  ← CORE VALUE
            — This is the primary job of the page.
            — Moved up so users reach it fast.
            — Full filter sidebar + paginated cards.
        ════════════════════════════════════════════════ */}
        <Divider darkMode={isDarkMode} />
        <Reveal delay={0} direction="up">
          <section id="all-competitions" aria-label="Browse all competitions">
            <DisplayCom darkMode={isDarkMode} />
          </section>
        </Reveal>


        {/* ════════════════════════════════════════════════
            2. PARTNER LOGOS
            — Immediately after hero = credibility signal.
            — "These companies are hiring through ProveIt."
            — Classic SaaS: logos right below the fold.
        ════════════════════════════════════════════════ */}
        <Divider darkMode={isDarkMode} />
        <Reveal delay={0.05} direction="up">
          <div className={` ${isDarkMode ? 'bg-white/[0.02]' : 'bg-slate-50/60'}`}>
            <SectionEyebrow label="" darkMode={isDarkMode} />
            <PartnerLogos darkMode={isDarkMode} />
          </div>
        </Reveal>

        {/* ════════════════════════════════════════════════
            5. FEATURED CAROUSEL
            — After main list = "editor's picks" shelf.
            — User has already scrolled, now highlight premium.
            — Smaller section, not competing with the list.
        ════════════════════════════════════════════════ */}
        <Divider darkMode={isDarkMode} />
        <Reveal delay={0.05} direction="up">
          <FeaturedCarousel darkMode={isDarkMode} competitions={competitions} />
        </Reveal>

        {/* ════════════════════════════════════════════════
            6. TOP PERFORMERS
            — Aspirational section near the bottom.
            — "These people got hired. You can too."
            — Motivates users who made it this far.
        ════════════════════════════════════════════════ */}
        <Divider darkMode={isDarkMode} />
        <Reveal delay={0.05} direction="up" className="pb-24">
          <TopPerformers darkMode={isDarkMode} />
        </Reveal>

      </main>

      {/* ── Global styles ── */}
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#334155' : '#e2e8f0'};
          border-radius: 99px;
        }
        ::-webkit-scrollbar-thumb:hover { background: #6366f1; }
        .sr-only {
          position: absolute; width: 1px; height: 1px;
          padding: 0; margin: -1px; overflow: hidden;
          clip: rect(0,0,0,0); white-space: nowrap; border-width: 0;
        }
        .focus\\:not-sr-only:focus {
          position: fixed; width: auto; height: auto;
          padding: revert; margin: revert; overflow: visible;
          clip: auto; white-space: normal;
        }
      `}</style>
    </div>
  );
};

export default CompitionList;