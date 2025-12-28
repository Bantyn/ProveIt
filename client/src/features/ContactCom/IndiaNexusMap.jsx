// src/features/ContactCom/IndiaNexusMap.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Globe } from 'lucide-react';

// Color map (you can import this from a shared file or define locally)
const colorMap = {
  purple: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500/30', borderLight: 'border-purple-500/20' },
  cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500/30', borderLight: 'border-cyan-500/20' },
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/30', borderLight: 'border-emerald-500/20' },
  blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/30', borderLight: 'border-blue-500/20' },
  indigo: { bg: 'bg-indigo-500', text: 'text-indigo-400', border: 'border-indigo-500/30', borderLight: 'border-indigo-500/20' },
  pink: { bg: 'bg-pink-500', text: 'text-pink-400', border: 'border-pink-500/30', borderLight: 'border-pink-500/20' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500/30', borderLight: 'border-orange-500/20' },
  teal: { bg: 'bg-teal-500', text: 'text-teal-400', border: 'border-teal-500/30', borderLight: 'border-teal-500/20' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/30', borderLight: 'border-amber-500/20' },
  rose: { bg: 'bg-rose-500', text: 'text-rose-400', border: 'border-rose-500/30', borderLight: 'border-rose-500/20' },
  lime: { bg: 'bg-lime-500', text: 'text-lime-400', border: 'border-lime-500/30', borderLight: 'border-lime-500/20' },
  sky: { bg: 'bg-sky-500', text: 'text-sky-400', border: 'border-sky-500/30', borderLight: 'border-sky-500/20' },
  green: { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500/30', borderLight: 'border-green-500/20' },
  violet: { bg: 'bg-violet-500', text: 'text-violet-400', border: 'border-violet-500/30', borderLight: 'border-violet-500/20' },
};

const IndiaNexusMap = ({ darkMode }) => {
  const allIndiaCities = [
    // Metropolitan Cities (Large Nodes)
    {
      city: "Delhi NCR",
      color: "purple",
      position: { top: "40%", left: "38%" },
      size: "lg",
      description: "National Capital - Government & Enterprise Hub",
      icon: "🏛️",
      stats: { talent: "15.2K", growth: "28%", projects: "5.4K" }
    },
    {
      city: "Mumbai",
      color: "cyan",
      position: { top: "50%", left: "40%" },
      size: "lg",
      description: "Financial Capital - Global Business Hub",
      icon: "🏦",
      stats: { talent: "18.4K", growth: "32%", projects: "6.8K" }
    },
    {
      city: "Bangalore",
      color: "emerald",
      position: { top: "75%", left: "45%" },
      size: "lg",
      description: "Silicon Valley - R&D & Innovation Center",
      icon: "💻",
      stats: { talent: "22.7K", growth: "38%", projects: "8.5K" }
    },
    {
      city: "Hyderabad",
      color: "blue",
      position: { top: "65%", left: "55%" },
      size: "lg",
      description: "Cyberabad - AI & Cybersecurity Operations",
      icon: "🤖",
      stats: { talent: "12.3K", growth: "35%", projects: "4.6K" }
    },
    {
      city: "Chennai",
      color: "indigo",
      position: { top: "80%", left: "70%" },
      size: "lg",
      description: "Automotive & Manufacturing Hub",
      icon: "🚗",
      stats: { talent: "10.8K", growth: "25%", projects: "3.9K" }
    },
    {
      city: "Kolkata",
      color: "pink",
      position: { top: "40%", left: "60%" },
      size: "lg",
      description: "Eastern Hub - Cultural & Industrial Center",
      icon: "🎭",
      stats: { talent: "9.3K", growth: "22%", projects: "3.2K" }
    },

    // Main Hub - Surat (Special)
    {
      city: "Surat",
      color: "emerald",
      position: { top: "60%", left: "28%" },
      size: "xl",
      description: "Primary Operations Hub - Diamond & Tech Center",
      icon: "💎",
      stats: { talent: "8.5K", growth: "42%", projects: "3.2K" }
    },

    // Other Major Cities (Medium Nodes)
    {
      city: "Ahmedabad",
      color: "orange",
      position: { top: "50%", left: "20%" },
      size: "md",
      description: "Industrial & Startup Hub",
      icon: "🏭",
      stats: { talent: "7.2K", growth: "30%", projects: "2.8K" }
    },
    {
      city: "Pune",
      color: "teal",
      position: { top: "55%", left: "35%" },
      size: "md",
      description: "Education & IT Services",
      icon: "🎓",
      stats: { talent: "9.1K", growth: "28%", projects: "3.5K" }
    },
    {
      city: "Jaipur",
      color: "amber",
      position: { top: "30%", left: "15%" },
      size: "md",
      description: "Heritage Tech & Tourism",
      icon: "🏰",
      stats: { talent: "5.4K", growth: "26%", projects: "2.1K" }
    },
    {
      city: "Lucknow",
      color: "rose",
      position: { top: "30%", left: "55%" },
      size: "md",
      description: "Government & Emerging Tech",
      icon: "⚖️",
      stats: { talent: "4.8K", growth: "24%", projects: "1.9K" }
    },
    {
      city: "Chandigarh",
      color: "lime",
      position: { top: "20%", left: "30%" },
      size: "md",
      description: "Architecture & Planning Hub",
      icon: "📐",
      stats: { talent: "3.9K", growth: "27%", projects: "1.6K" }
    },
    {
      city: "Goa",
      color: "sky",
      position: { top: "80%", left: "25%" },
      size: "md",
      description: "Digital Nomad & Creative Hub",
      icon: "🏖️",
      stats: { talent: "2.7K", growth: "35%", projects: "1.3K" }
    },
    {
      city: "Coimbatore",
      color: "violet",
      position: { top: "85%", left: "50%" },
      size: "md",
      description: "Textile & Engineering Hub",
      icon: "👕",
      stats: { talent: "4.2K", growth: "23%", projects: "1.7K" }
    },
    {
      city: "Kochi",
      color: "cyan",
      position: { top: "60%", left: "75%" },
      size: "md",
      description: "Port City - Logistics & Tech",
      icon: "🚢",
      stats: { talent: "3.5K", growth: "29%", projects: "1.4K" }
    },
    {
      city: "Visakhapatnam",
      color: "blue",
      position: { top: "65%", left: "85%" },
      size: "md",
      description: "Port & Industrial Hub",
      icon: "⚓",
      stats: { talent: "3.1K", growth: "21%", projects: "1.2K" }
    },
    {
      city: "Guwahati",
      color: "green",
      position: { top: "20%", left: "72%" },
      size: "md",
      description: "Gateway to Northeast",
      icon: "🌄",
      stats: { talent: "2.4K", growth: "31%", projects: "1.1K" }
    },
    {
      city: "Gurgaon",
      color: "indigo",
      position: { top: "38%", left: "45%" },
      size: "md",
      description: "Corporate & Startup Hub",
      icon: "🏢",
      stats: { talent: "11.2K", growth: "33%", projects: "4.3K" }
    },
    {
      city: "Noida",
      color: "purple",
      position: { top: "42%", left: "42%" },
      size: "md",
      description: "IT & Business Process Hub",
      icon: "💼",
      stats: { talent: "9.8K", growth: "29%", projects: "3.7K" }
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0.3, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="mb-24 relative"
    >
      <div className="text-center mb-12">
        <h3 className={`text-3xl md:text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">India</span> Nexus
        </h3>
        <p className={`${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Strategic operational centers across India's complete tech landscape</p>
      </div>

      <div className={`relative h-[500px] w-full rounded-3xl border-2 overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900/80 to-black border-white/10' : 'bg-gradient-to-br from-blue-50/50 to-white border-gray-200'}`}>

        {/* Simplified India Map Outline */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full opacity-20"
            fill="none"
            stroke={darkMode ? '#ffffff40' : '#00000020'}
            strokeWidth="1"
          >
            {/* India shape */}
            <path d="M200,150 Q250,100 300,120 Q350,140 380,180 Q400,220 420,250 Q450,300 480,320 
            Q500,350 520,380 Q550,400 580,420 Q600,450 620,480 Q640,500 660,480 
            Q650,450 630,420 Q600,400 570,380 Q540,350 520,320 Q500,280 480,250 
            Q450,220 420,200 Q400,180 380,160 Q350,140 320,130 Q280,120 250,130 
            Q220,140 200,150 Z"
            />
          </svg>
        </div>

        {/* Connection Lines Animation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          
          {/* Connect all cities to Surat as main hub */}
          {[
            { x1: "28%", y1: "60%", x2: "45%", y2: "75%" }, // Surat to Bangalore
            { x1: "28%", y1: "60%", x2: "40%", y2: "50%" }, // Surat to Mumbai
            { x1: "28%", y1: "60%", x2: "38%", y2: "40%" }, // Surat to Delhi
            { x1: "28%", y1: "60%", x2: "55%", y2: "65%" }, // Surat to Hyderabad
            { x1: "28%", y1: "60%", x2: "60%", y2: "40%" }, // Surat to Kolkata
            { x1: "28%", y1: "60%", x2: "70%", y2: "50%" }, // Surat to Chennai
            { x1: "28%", y1: "60%", x2: "30%", y2: "20%" }, // Surat to Chandigarh
            { x1: "28%", y1: "60%", x2: "65%", y2: "70%" }, // Surat to Bengaluru
            { x1: "28%", y1: "60%", x2: "50%", y2: "80%" }, // Surat to Coimbatore
            { x1: "28%", y1: "60%", x2: "15%", y2: "30%" }, // Surat to Jaipur
            { x1: "28%", y1: "60%", x2: "20%", y2: "50%" }, // Surat to Ahmedabad
            { x1: "28%", y1: "60%", x2: "55%", y2: "30%" }, // Surat to Lucknow
            { x1: "28%", y1: "60%", x2: "45%", y2: "25%" }, // Surat to Gurgaon
            { x1: "28%", y1: "60%", x2: "72%", y2: "20%" }, // Surat to Guwahati
            { x1: "28%", y1: "60%", x2: "75%", y2: "60%" }, // Surat to Kochi
            { x1: "28%", y1: "60%", x2: "60%", y2: "85%" }, // Surat to Visakhapatnam
            { x1: "28%", y1: "60%", x2: "25%", y2: "80%" }, // Surat to Goa
          ].map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#connectionGradient)"
              strokeWidth="0.5"
              strokeDasharray="4,4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.15 }}
              transition={{ duration: 2, delay: i * 0.05 }}
            />
          ))}
        </svg>

        {/* Animated Background Grid */}
        <div className={`absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,${darkMode ? '#ffffff08' : '#00000008'}_100%)] bg-[length:40px_40px]`} />
        <div className={`absolute inset-0 bg-[linear-gradient(0deg,transparent_95%,${darkMode ? '#ffffff08' : '#00000008'}_100%)] bg-[length:40px_40px]`} />

        {/* All India Cities */}
        {allIndiaCities.map((city, i) => (
          <CityNode key={city.city} city={city} index={i} darkMode={darkMode} />
        ))}

        {/* Data Flow Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-[1px] h-16 ${darkMode ? 'bg-gradient-to-b from-emerald-500/20 via-cyan-500/10 to-transparent' : 'bg-gradient-to-b from-emerald-600/20 via-cyan-600/10 to-transparent'}`}
              initial={{
                x: Math.random() * 100 + "%",
                y: "-10%",
                opacity: 0
              }}
              animate={{
                y: "110%",
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Network Stats */}
        <NetworkStats darkMode={darkMode} />

        {/* Surat Special Badge */}
        <SuratBadge darkMode={darkMode} />

        {/* Legend */}
        <Legend darkMode={darkMode} />
      </div>
    </motion.div>
  );
};

// Sub-components for better organization
const CityNode = ({ city, index, darkMode }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.2, zIndex: 50 }}
    className={`absolute group cursor-pointer ${city.size === 'xl' ? 'z-50' : city.size === 'lg' ? 'z-40' : 'z-30'}`}
    style={city.position}
  >
    {/* Pulsing Rings */}
    <motion.div
      animate={{
        scale: [1, city.size === 'xl' ? 1.8 : city.size === 'lg' ? 1.5 : 1.3, 1],
        opacity: [0.3, 0.1, 0.3]
      }}
      transition={{
        duration: city.size === 'xl' ? 2 : 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute rounded-full border ${darkMode ? colorMap[city.color].borderLight : colorMap[city.color].border}`}
      style={{
        width: city.size === 'xl' ? '80px' : city.size === 'lg' ? '60px' : '48px',
        height: city.size === 'xl' ? '80px' : city.size === 'lg' ? '60px' : '48px',
        top: city.size === 'xl' ? '-40px' : city.size === 'lg' ? '-30px' : '-24px',
        left: city.size === 'xl' ? '-40px' : city.size === 'lg' ? '-30px' : '-24px',
      }}
    />

    {/* Main Node */}
    <div className="relative flex flex-col items-center">
      {/* Glowing Center */}
      <div className={`rounded-full relative z-20 shadow-lg ${
        city.size === 'xl' ? 'w-6 h-6' : 
        city.size === 'lg' ? 'w-5 h-5' : 
        'w-4 h-4'
      } ${colorMap[city.color].bg}`}>
        {city.size === 'xl' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-white/30"
          />
        )}
      </div>

      {/* City Label */}
      <div className={`mt-1 px-2 py-0.5 rounded-full backdrop-blur-sm border ${darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-gray-200'}`}>
        <span className={`text-xs font-semibold tracking-tight flex items-center gap-0.5 ${city.city === "Surat" ? 'text-emerald-400 font-bold' : colorMap[city.color].text}`}>
          {city.icon} <span className="text-[10px]">{city.city}</span>
        </span>
      </div>

      {/* Hover Card */}
      <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-56 p-3 rounded-xl backdrop-blur-lg border opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 ${darkMode ? 'bg-black/90 border-white/20' : 'bg-white/95 border-gray-200'}`}>
        <div className="flex items-start gap-2 mb-2">
          <div className={`p-1.5 rounded-lg ${colorMap[city.color].softBg || colorMap[city.color].bg + '/10'}`}>
            <span className="text-sm">{city.icon}</span>
          </div>
          <div>
            <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {city.city} {city.city === "Surat" && "⭐"}
            </h4>
            <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>{city.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 mt-2">
          <div className={`p-1.5 rounded-lg text-center ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className={`text-xs font-bold ${colorMap[city.color].text}`}>{city.stats.talent}</div>
            <div className={`text-[9px] uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Talent</div>
          </div>
          <div className={`p-1.5 rounded-lg text-center ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className={`text-xs font-bold ${colorMap[city.color].text}`}>{city.stats.growth}</div>
            <div className={`text-[9px] uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Growth</div>
          </div>
          <div className={`p-1.5 rounded-lg text-center ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className={`text-xs font-bold ${colorMap[city.color].text}`}>{city.stats.projects}</div>
            <div className={`text-[9px] uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>Projects</div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const NetworkStats = ({ darkMode }) => (
  <div className={`absolute top-4 left-4 p-4 rounded-xl backdrop-blur-sm border ${darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-gray-200'}`}>
    <div className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
      <Zap className="w-3 h-3 text-emerald-400" />
      <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>Pan-India Network</span>
    </div>
    <div className="text-2xl font-black text-emerald-400">158.2K+</div>
    <div className="text-[10px] uppercase tracking-wider mt-1">Active Talents</div>
    <div className="text-[10px] text-emerald-400/70 mt-1">20+ Cities Connected</div>
  </div>
);

const SuratBadge = ({ darkMode }) => (
  <motion.div
    initial={{ scale: 0, rotate: -10 }}
    whileInView={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", delay: 1 }}
    className={`absolute bottom-4 right-4 p-4 rounded-xl backdrop-blur-lg border ${darkMode ? 'bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 border-emerald-400/40' : 'bg-gradient-to-br from-emerald-100 to-cyan-100 border-emerald-400/60'}`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-full ${darkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'}`}>
        <Globe className="w-5 h-5 text-emerald-400" />
      </div>
      <div>
        <div className="text-sm font-bold text-emerald-400">National Hub</div>
        <div className="text-xs text-white/60">Surat Headquarters</div>
        <div className="text-xs text-emerald-300/70 mt-1">Connecting All India</div>
      </div>
    </div>
  </motion.div>
);

const Legend = ({ darkMode }) => (
  <div className={`absolute bottom-4 left-4 p-3 rounded-xl backdrop-blur-sm border ${darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-gray-200'}`}>
    <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-500">Legend</div>
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
        <span className="text-[10px]">Major Hub</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div>
        <span className="text-[10px]">Metro City</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
        <span className="text-[10px]">Key City</span>
      </div>
    </div>
  </div>
);

export default IndiaNexusMap;