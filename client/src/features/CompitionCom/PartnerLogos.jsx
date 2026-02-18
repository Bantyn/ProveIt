import React from 'react';
import { motion } from 'framer-motion';
import { THEME_TOKENS } from '../../utils/theme';
import {
  SiGoogle, SiMeta, SiAmazon, SiAdobe,
  SiNetflix, SiUber, SiAirbnb, SiSpotify,
  SiSlack, SiStripe,  SiApple,
  SiSamsung, SiOracle, SiSalesforce, SiShopify,
} from 'react-icons/si';
import { FaMicrosoft } from "react-icons/fa";

// ─── Partner data ─────────────────────────────────────────────────────────────

const ROW_ONE = [
  { name: 'Google',    Icon: SiGoogle,    color: '#4285F4' },
  { name: 'Meta',      Icon: SiMeta,      color: '#0668E1' },
  { name: 'Amazon',    Icon: SiAmazon,    color: '#FF9900' },
  { name: 'Microsoft', Icon: FaMicrosoft, color: '#00A4EF' },
  { name: 'Adobe',     Icon: SiAdobe,     color: '#FF0000' },
  { name: 'Stripe',    Icon: SiStripe,    color: '#635BFF' },
  { name: 'Shopify',   Icon: SiShopify,   color: '#96BF48' },
  { name: 'Slack',     Icon: SiSlack,     color: '#4A154B' },
];

const ROW_TWO = [
  { name: 'Netflix',   Icon: SiNetflix,    color: '#E50914' },
  { name: 'Spotify',   Icon: SiSpotify,    color: '#1DB954' },
  { name: 'Airbnb',    Icon: SiAirbnb,     color: '#FF5A5F' },
  { name: 'Uber',      Icon: SiUber,       color: '#000000' },
  { name: 'Apple',     Icon: SiApple,      color: '#555555' },
  { name: 'Samsung',   Icon: SiSamsung,    color: '#1428A0' },
  { name: 'Oracle',    Icon: SiOracle,     color: '#F80000' },
  { name: 'Salesforce',Icon: SiSalesforce, color: '#00A1E0' },
];

// ─── Single logo item ─────────────────────────────────────────────────────────

const LogoItem = ({ name, Icon, color, darkMode }) => (
  <motion.div
    whileHover={{ y: -3, scale: 1.06 }}
    transition={{ duration: 0.2 }}
    className={`group flex items-center gap-3 px-5 py-3 rounded-2xl cursor-pointer transition-all duration-300 flex-shrink-0 ${
      darkMode
        ? 'hover:bg-white/5 border border-transparent hover:border-white/8'
        : 'hover:bg-white hover:shadow-lg hover:shadow-slate-200/80 border border-transparent hover:border-slate-100'
    }`}
  >
    <div className="relative">
      <div
        className="absolute -inset-3 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-400"
        style={{ backgroundColor: color }}
      />
      <Icon
        size={22}
        className="relative z-10 transition-all duration-400 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100"
        style={{ '--hover-color': color }}
        onMouseEnter={e => (e.currentTarget.style.color = color)}
        onMouseLeave={e => (e.currentTarget.style.color = '')}
      />
    </div>
    <span className={`text-sm font-black tracking-tight transition-all duration-400 opacity-30 group-hover:opacity-90 ${
      darkMode ? 'text-white' : 'text-slate-800'
    }`}>
      {name}
    </span>
  </motion.div>
);

// ─── Marquee row ──────────────────────────────────────────────────────────────

const MarqueeRow = ({ items, darkMode, reverse = false, speed = 35 }) => {
  // Triple the items for seamless loop
  const looped = [...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex items-center gap-4 py-2"
        animate={{ x: reverse ? [-1400, 0] : [0, -1400] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
      >
        {looped.map((p, i) => (
          <LogoItem key={`${p.name}-${i}`} {...p} darkMode={darkMode} />
        ))}
      </motion.div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const PartnerLogos = ({ darkMode = false }) => {
  const theme = darkMode ? THEME_TOKENS.dark : THEME_TOKENS.light;

  return (
    <section
      className={`relative overflow-hidden py-16 ${darkMode ? 'bg-gray-950' : 'bg-slate-50/40'}`}
      aria-label="Partner companies"
    >
      {/* Subtle background mesh */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] rounded-full blur-[100px] ${
          darkMode ? 'bg-indigo-500/8' : 'bg-indigo-400/6'
        }`} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-[11px] font-black uppercase tracking-[0.25em] mb-3 ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Companies actively hiring through ProveIt
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className={`text-2xl sm:text-3xl font-black tracking-tight ${theme.textPrimary}`}
          >
            Skip the resume.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-600">
              Build your way in.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className={`text-sm font-medium mt-2 max-w-md mx-auto ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Top companies post real job challenges. You solve them. They hire the best.
          </motion.p>
        </div>

        {/* Edge fades — shared for both rows */}
        <div className="relative">
          <div className={`absolute inset-y-0 left-0 w-32 sm:w-48 z-20 pointer-events-none bg-gradient-to-r ${
            darkMode ? 'from-gray-950' : 'from-slate-50'
          } to-transparent`} />
          <div className={`absolute inset-y-0 right-0 w-32 sm:w-48 z-20 pointer-events-none bg-gradient-to-l ${
            darkMode ? 'from-gray-950' : 'from-slate-50'
          } to-transparent`} />

          {/* Row 1 — left to right */}
          <MarqueeRow items={ROW_ONE} darkMode={darkMode} reverse={false} speed={38} />

          {/* Row 2 — right to left, creates depth */}
          <MarqueeRow items={ROW_TWO} darkMode={darkMode} reverse={true} speed={32} />
        </div>

        {/* Bottom trust line */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-6 mt-10 flex-wrap px-4"
        >
          {[
            { value: '300+', label: 'Companies hiring' },
            { value: '₹5.5L+', label: 'In total prizes'  },
            { value: '94%',   label: 'Shortlist rate'    },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className={`text-lg font-black tabular-nums ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {value}
              </span>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {label}
              </span>
              <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-slate-300'} last:hidden`} />
            </div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
};

export default PartnerLogos;