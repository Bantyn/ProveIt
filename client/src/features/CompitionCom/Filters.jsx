import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiTag, FiDollarSign, FiAward,
  FiX, FiCheck, FiTrendingUp, FiClock,
  FiChevronDown, FiSliders,
  FiGrid, FiLayers, FiCpu,
  FiGlobe, FiZap, FiShield, FiCloud,
  FiSmartphone, FiRefreshCw, FiEye
} from 'react-icons/fi';
import { THEME_TOKENS } from '../../utils/theme';

// ─── Helpers ────────────────────────────────────────────────────────────────

const CATEGORY_ICONS = {
  All: '🌐', Frontend: '🎨', Backend: '⚙️', Mobile: '📱',
  'AI/ML': '🤖', DevOps: '🔧', Design: '✏️', Security: '🔒',
};

const getCategoryIcon = (cat) => CATEGORY_ICONS[cat] ?? '📁';

// ─── Sub‑components ──────────────────────────────────────────────────────────

/** Animated collapsible filter section */
const FilterSection = ({ title, children, sectionKey, icon, isActive, onToggle, darkMode, badge }) => (
  <div
    className={`rounded-[1.6rem] transition-all duration-400 border-2 mb-3 overflow-hidden ${
      isActive
        ? darkMode
          ? 'bg-white/[0.03] border-white/10'
          : 'bg-slate-50 border-indigo-100'
        : darkMode
        ? 'border-white/5'
        : 'border-slate-100'
    }`}
  >
    <button
      onClick={() => onToggle(sectionKey)}
      aria-expanded={isActive}
      className="flex items-center justify-between w-full p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-[1.6rem]"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg shadow-indigo-500/30'
              : darkMode
              ? 'bg-slate-800 text-slate-500 border border-slate-700'
              : 'bg-white text-slate-400 border border-slate-200'
          }`}
        >
          {icon && React.cloneElement(icon, { className: 'w-3.5 h-3.5' })}
        </div>
        <span
          className={`text-[11px] font-black uppercase tracking-[0.12em] transition-colors ${
            isActive ? (darkMode ? 'text-white' : 'text-slate-900') : 'text-slate-500'
          }`}
        >
          {title}
        </span>
        {badge > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-black">
            {badge}
          </span>
        )}
      </div>
      <motion.span
        animate={{ rotate: isActive ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className={isActive ? 'text-indigo-500' : 'text-slate-400'}
      >
        <FiChevronDown className="w-4 h-4" />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const Filters = ({
  className = '',
  categories = [],
  filterState,
  updateFilter,
  clearFilters,
  activeFilterCount,
  darkMode = false,
  isLoading = false,
  onClose,
  isMobile = false,
}) => {
  const {
    searchValue, category, difficulty, prizeRange,
    status, tags, sortBy,
  } = filterState || {};

  // ── State ──────────────────────────────────────────────────────────────────
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    difficulty: true,
    prize: false,
    status: false,
    tags: false,
    sortBy: false,
  });

  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  const searchInputRef = useRef(null);
  const theme = darkMode ? THEME_TOKENS.dark : THEME_TOKENS.light;

  // ── Constants (memoized to avoid re‑creation each render) ──────────────────
  const difficulties = useMemo(() => [
    { value: 'any',          label: 'All Levels',    icon: '🎯' },
    { value: 'Beginner',     label: 'Beginner',      icon: '🌱' },
    { value: 'Intermediate', label: 'Intermediate',  icon: '⚡' },
    { value: 'Advanced',     label: 'Advanced',      icon: '🔥' },
    { value: 'Expert',       label: 'Expert',        icon: '👑' },
  ], []);

  const statuses = useMemo(() => [
    { value: 'any',      label: 'All Status', dotColor: 'bg-slate-400' },
    { value: 'Live',     label: 'Live Now',   dotColor: 'bg-rose-500 animate-pulse' },
    { value: 'Upcoming', label: 'Upcoming',   dotColor: 'bg-amber-400' },
    { value: 'Ended',    label: 'Ended',      dotColor: 'bg-slate-400' },
  ], []);

  const techTags = useMemo(() => [
    { id: 'ai',         label: 'AI',       icon: <FiCpu />,        colorClass: 'violet' },
    { id: 'web',        label: 'Web',      icon: <FiGlobe />,      colorClass: 'blue'   },
    { id: 'ml',         label: 'ML',       icon: <FiLayers />,     colorClass: 'fuchsia'},
    { id: 'mobile',     label: 'Mobile',   icon: <FiSmartphone />, colorClass: 'indigo' },
    { id: 'blockchain', label: 'Web3',     icon: <FiGrid />,       colorClass: 'amber'  },
    { id: 'security',   label: 'Security', icon: <FiShield />,     colorClass: 'rose'   },
    { id: 'cloud',      label: 'Cloud',    icon: <FiCloud />,      colorClass: 'cyan'   },
    { id: 'game-dev',   label: 'Gaming',   icon: '🎮',             colorClass: 'orange' },
  ], []);

  const prizeRanges = useMemo(() => [
    { value: 'any',    label: 'Any Prize',     icon: '🎁' },
    { value: 'micro',  label: 'Under ₹10K',   icon: '💫' },
    { value: 'small',  label: '₹10K – ₹50K',  icon: '⭐' },
    { value: 'medium', label: '₹50K – ₹2L',   icon: '🌟' },
    { value: 'large',  label: 'Over ₹2L',     icon: '💎' },
  ], []);

  const sortOptions = useMemo(() => [
    { value: 'popular', label: 'Popular',      icon: <FiTrendingUp className="text-rose-500"   /> },
    { value: 'newest',  label: 'Ending Soon',  icon: <FiClock      className="text-amber-500"  /> },
    { value: 'prize',   label: 'Top Prize',    icon: <FiAward      className="text-cyan-500"   /> },
    { value: 'rating',  label: 'Most Viewed',  icon: <FiEye        className="text-indigo-500" /> },
  ], []);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const handleTagClick = useCallback((tagId) => {
    const currentTags = tags || [];
    const newTags = currentTags.includes(tagId)
      ? currentTags.filter(t => t !== tagId)
      : [...currentTags, tagId];
    updateFilter('tags', newTags);
  }, [tags, updateFilter]);

  const handleQuickFilter = useCallback((type) => {
    if (type === 'live') {
      updateFilter('status', status === 'Live' ? 'any' : 'Live');
    } else if (type === 'highPrize') {
      updateFilter('prizeRange', prizeRange === 'large' ? 'any' : 'large');
      updateFilter('sortBy', 'prize');
    }
  }, [status, prizeRange, updateFilter]);

  const handleSearchChange = useCallback((val) => {
    updateFilter('searchValue', val);
    if (val.length > 0) setShowSearchHistory(true);
    else setShowSearchHistory(false);
  }, [updateFilter]);

  const applyHistoryItem = useCallback((item) => {
    updateFilter('searchValue', item);
    setShowSearchHistory(false);
  }, [updateFilter]);

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setShowSearchHistory(false);
        if (isMobile && onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, onClose]);

  // ── Search history persistence ─────────────────────────────────────────────
  useEffect(() => {
    if (!searchValue || searchValue.length <= 2) return;
    const timer = setTimeout(() => {
      setSearchHistory(prev =>
        [searchValue, ...prev.filter(s => s !== searchValue)].slice(0, 5)
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchValue]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const tagCount = (tags || []).length;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <motion.aside
      initial={{ opacity: 0, x: isMobile ? 300 : -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isMobile ? 300 : -10 }}
      transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      role="complementary"
      aria-label="Competition filters"
      className={`w-full lg:w-80 h-fit relative ${className} ${
        isMobile ? 'fixed inset-y-0 right-0 z-50 w-full sm:w-96 rounded-none' : 'p-1'
      }`}
    >
      <div
        className={`relative h-full flex flex-col transition-all duration-500 shadow-2xl ${
          darkMode
            ? 'bg-slate-950/95 backdrop-blur-3xl border-white/10 shadow-black/40'
            : 'bg-white/98 backdrop-blur-3xl border-indigo-200/70 shadow-indigo-500/10'
        } ${isMobile ? 'rounded-none border-none' : 'rounded-[2.5rem] border-2'}`}
      >
        {/* Ambient blobs */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/5 rounded-full blur-[50px] pointer-events-none -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-600/5 rounded-full blur-[50px] pointer-events-none -ml-10 -mb-10" />

        {/* ── Header ── */}
        <div className="p-6 pb-4 relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center shadow-xl shadow-indigo-600/30">
                <FiSliders className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className={`text-base font-black tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Filters
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">
                    {activeFilterCount > 0 ? `${activeFilterCount} active` : 'all open'}
                  </span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.button
                  key="reset"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  whileHover={{ scale: 1.08, rotate: 15 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={clearFilters}
                  aria-label="Clear all filters"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                >
                  <FiRefreshCw className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch
                className={`w-4 h-4 transition-all duration-300 ${
                  searchValue ? 'text-indigo-600 scale-110' : 'text-slate-400'
                }`}
              />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => searchHistory.length > 0 && setShowSearchHistory(true)}
              onBlur={() => setTimeout(() => setShowSearchHistory(false), 150)}
              placeholder="Search challenges… ⌘K"
              aria-label="Search competitions"
              className={`w-full pl-11 pr-10 py-3.5 rounded-2xl text-[13px] font-semibold transition-all duration-300 border-2 outline-none ${
                darkMode
                  ? 'bg-slate-900/50 border-slate-800 focus:border-indigo-500 focus:bg-slate-900 text-white placeholder-slate-600'
                  : 'bg-slate-50 border-slate-100 focus:border-indigo-300 focus:bg-white text-slate-900 placeholder-slate-400'
              }`}
            />
            {searchValue && (
              <button
                onClick={() => handleSearchChange('')}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Search history dropdown */}
            <AnimatePresence>
              {showSearchHistory && searchHistory.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className={`absolute top-full left-0 right-0 mt-1.5 z-50 rounded-2xl border shadow-xl overflow-hidden ${
                    darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'
                  }`}
                >
                  <li className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Recent searches
                  </li>
                  {searchHistory.map((item) => (
                    <li key={item}>
                      <button
                        onMouseDown={() => applyHistoryItem(item)}
                        className={`w-full text-left px-4 py-2.5 text-[12px] font-semibold flex items-center gap-2 transition-colors ${
                          darkMode
                            ? 'text-slate-300 hover:bg-slate-800'
                            : 'text-slate-700 hover:bg-indigo-50'
                        }`}
                      >
                        <FiSearch className="w-3 h-3 opacity-40" />
                        {item}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 custom-scrollbar">

          {/* Quick filter pills */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {[
              {
                key: 'live',
                icon: <FiClock className="w-4 h-4" />,
                label: 'Live Now',
                sub: 'Active',
                active: status === 'Live',
                activeClass: 'bg-rose-500 border-rose-600 shadow-rose-500/20',
                iconColor: 'text-rose-500',
              },
              {
                key: 'highPrize',
                icon: <FiAward className="w-4 h-4" />,
                label: 'Premium',
                sub: 'High Pay',
                active: prizeRange === 'large',
                activeClass: 'bg-emerald-500 border-emerald-600 shadow-emerald-500/20',
                iconColor: 'text-emerald-500',
              },
            ].map((qf) => (
              <button
                key={qf.key}
                onClick={() => handleQuickFilter(qf.key)}
                aria-pressed={qf.active}
                className={`flex flex-col gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${
                  qf.active
                    ? `${qf.activeClass} text-white shadow-xl`
                    : `${
                        darkMode
                          ? 'bg-slate-900/40 border-slate-800 text-slate-400'
                          : 'bg-white border-slate-100 text-slate-500 shadow-sm'
                      } hover:border-indigo-300`
                }`}
              >
                <span className={qf.active ? 'text-white' : qf.iconColor}>{qf.icon}</span>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-wider leading-none">{qf.label}</p>
                  <p className="text-[8px] font-bold mt-1 opacity-60">{qf.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* ── Filter sections ── */}

          {/* Categories */}
          <FilterSection
            title="Categories" sectionKey="category"
            icon={<FiGrid />}
            isActive={expandedSections.category}
            onToggle={toggleSection}
            darkMode={darkMode}
          >
            <div className="grid grid-cols-2 gap-2">
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateFilter('category', cat)}
                  aria-pressed={category === cat}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-black tracking-tight transition-all duration-200 border-2 ${
                    category === cat
                      ? 'bg-indigo-600 border-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                      : `${
                          darkMode
                            ? 'bg-slate-900/50 border-slate-800 text-slate-400'
                            : 'bg-white border-slate-100 text-slate-600 shadow-sm'
                        } hover:border-indigo-300`
                  }`}
                >
                  <span className="text-sm leading-none">{getCategoryIcon(cat)}</span>
                  <span className="truncate">{cat}</span>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Skill Level */}
          <FilterSection
            title="Skill Level" sectionKey="difficulty"
            icon={<FiZap />}
            isActive={expandedSections.difficulty}
            onToggle={toggleSection}
            darkMode={darkMode}
          >
            <div className="space-y-1.5">
              {difficulties.map((diff) => (
                <button
                  key={diff.value}
                  onClick={() => updateFilter('difficulty', diff.value)}
                  aria-pressed={difficulty === diff.value}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 border-2 ${
                    difficulty === diff.value
                      ? 'bg-indigo-600 border-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                      : `${
                          darkMode
                            ? 'bg-slate-900/40 border-slate-800 text-slate-400'
                            : 'bg-white border-slate-100 text-slate-500 shadow-sm'
                        } hover:border-indigo-300`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{diff.icon}</span>
                    <span className="text-[11px] font-black uppercase tracking-wide">{diff.label}</span>
                  </div>
                  {difficulty === diff.value && (
                    <FiCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection
            title="Availability" sectionKey="status"
            icon={<FiClock />}
            isActive={expandedSections.status}
            onToggle={toggleSection}
            darkMode={darkMode}
          >
            <div className="space-y-1.5">
              {statuses.map((stat) => (
                <button
                  key={stat.value}
                  onClick={() => updateFilter('status', stat.value)}
                  aria-pressed={status === stat.value}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 border-2 ${
                    status === stat.value
                      ? darkMode
                        ? 'bg-slate-900 border-indigo-500 text-indigo-400 shadow-xl'
                        : 'bg-white border-indigo-500 text-indigo-600 shadow-xl'
                      : `${
                          darkMode
                            ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                            : 'bg-white border-slate-100 text-slate-600'
                        } hover:border-indigo-300`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${stat.dotColor}`} />
                    <span className="text-[11px] font-black uppercase tracking-tight">{stat.label}</span>
                  </div>
                  {status === stat.value && (
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  )}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Rewards */}
          <FilterSection
            title="Rewards" sectionKey="prize"
            icon={<FiDollarSign />}
            isActive={expandedSections.prize}
            onToggle={toggleSection}
            darkMode={darkMode}
          >
            <div className="space-y-1.5">
              {prizeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => updateFilter('prizeRange', range.value)}
                  aria-pressed={prizeRange === range.value}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border-2 ${
                    prizeRange === range.value
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-lg shadow-indigo-600/20'
                      : `${
                          darkMode
                            ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                            : 'bg-white border-slate-100 text-slate-600 shadow-sm'
                        } hover:border-indigo-300`
                  }`}
                >
                  <span className="text-base">{range.icon}</span>
                  <span className="text-[11px] font-black uppercase tracking-tight">{range.label}</span>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Sort By */}
          <FilterSection
            title="Sort By" sectionKey="sortBy"
            icon={<FiTrendingUp />}
            isActive={expandedSections.sortBy}
            onToggle={toggleSection}
            darkMode={darkMode}
          >
            <div className="grid grid-cols-2 gap-2">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateFilter('sortBy', opt.value)}
                  aria-pressed={sortBy === opt.value}
                  className={`flex flex-col items-center gap-2.5 p-3.5 rounded-2xl transition-all duration-200 border-2 ${
                    sortBy === opt.value
                      ? darkMode
                        ? 'bg-slate-900 border-indigo-500 text-indigo-400 shadow-xl'
                        : 'bg-white border-indigo-500 text-indigo-600 shadow-xl'
                      : `${
                          darkMode
                            ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                            : 'bg-white border-slate-100 text-slate-600 shadow-sm'
                        } hover:border-indigo-300`
                  }`}
                >
                  <div className={`p-2 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    {opt.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tight text-center leading-tight">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Technologies */}
          <FilterSection
            title="Technologies" sectionKey="tags"
            icon={<FiTag />}
            isActive={expandedSections.tags}
            onToggle={toggleSection}
            darkMode={darkMode}
            badge={tagCount}
          >
            <div className="flex flex-wrap gap-2">
              {techTags.map((tag) => {
                const isSelected = (tags || []).includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagClick(tag.id)}
                    aria-pressed={isSelected}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200 border-2 ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-600/20 scale-105'
                        : `${
                            darkMode
                              ? 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-indigo-500/50'
                              : 'bg-white border-slate-200 text-slate-600 shadow-sm hover:border-indigo-300'
                          }`
                    }`}
                  >
                    <span className="flex items-center justify-center w-3.5 h-3.5 opacity-80">
                      {tag.icon}
                    </span>
                    {tag.label}
                  </button>
                );
              })}
            </div>

            {/* Clear tags shortcut */}
            {tagCount > 0 && (
              <button
                onClick={() => updateFilter('tags', [])}
                className="mt-3 w-full text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-600 transition-colors flex items-center justify-center gap-1"
              >
                <FiX className="w-3 h-3" /> Clear {tagCount} tag{tagCount > 1 ? 's' : ''}
              </button>
            )}
          </FilterSection>
        </div>

        {/* ── Mobile footer ── */}
        {isMobile && (
          <div
            className={`p-5 border-t ${
              darkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-white/80'
            } backdrop-blur-md`}
          >
            <button
              onClick={onClose}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-600/25 active:scale-[0.98] transition-all"
            >
              {isLoading
                ? 'Processing…'
                : activeFilterCount > 0
                ? `Apply ${activeFilterCount} Filter${activeFilterCount > 1 ? 's' : ''}`
                : 'Show Results'}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#334155' : '#cbd5e1'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6366f1; }
      `}</style>
    </motion.aside>
  );
};

export default Filters;