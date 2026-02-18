import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiSliders, FiX, FiChevronLeft,
  FiChevronRight, FiTrendingUp, FiAward, FiUsers, FiClock,
  FiChevronDown, FiEye
} from "react-icons/fi";
import CompetitionCard from "./Card";
import Filters from "./Filters";
import { GridSkeleton } from "./Skeleton";
import { useCompetitionFilters } from "../../hooks/useCompetitionFilters";
import { THEME_TOKENS } from "../../utils/theme";
import { competitions } from "../../data/competitions";

// ─── Constants ───────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 8;
const MAX_VISIBLE_PAGES = 7;

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular', icon: <FiTrendingUp size={14} className="text-rose-500"   /> },
  { value: 'newest',  label: 'Ending Soon',  icon: <FiClock      size={14} className="text-amber-500"  /> },
  { value: 'prize',   label: 'Highest Prize', icon: <FiAward     size={14} className="text-cyan-500"   /> },
  { value: 'rating',  label: 'Most Viewed',  icon: <FiEye        size={14} className="text-indigo-500" /> },
];

const FILTER_DEFAULTS = {
  category:    "All",
  searchValue: "",
  difficulty:  "any",
  status:      "any",
  prizeRange:  "any",
  tags:        [],
  sortBy:      "popular",
};

// ─── Live stats (derived from real data) ────────────────────────────────────

const useLiveStats = () =>
  useMemo(() => ({
    liveCount:    competitions.filter(c => c.status === 'Live').length,
    totalRewards: '₹5.5 Lakh+',   // replace with real aggregation if available
    totalTalents: '24,000+',
    newCount:     competitions.filter(c => {
      const created = new Date(c.createdAt || Date.now());
      return (Date.now() - created) < 7 * 86_400_000;
    }).length || 4,
  }), []);

// ─── Pagination helper ───────────────────────────────────────────────────────

const buildPageRange = (current, total) => {
  if (total <= MAX_VISIBLE_PAGES) return Array.from({ length: total }, (_, i) => i + 1);
  const delta = 2;
  const left  = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);
  const pages = [1];
  if (left > 2)       pages.push('…');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('…');
  pages.push(total);
  return pages;
};

// ─── SortDropdown ────────────────────────────────────────────────────────────

const SortDropdown = ({ value, onChange, theme, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const active = SORT_OPTIONS.find(o => o.value === value) || SORT_OPTIONS[0];

  useEffect(() => {
    if (!isOpen) return;
    const close = () => setIsOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [isOpen]);

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all duration-200 ${theme.border} ${theme.surface} ${theme.textPrimary} hover:border-indigo-400/60 shadow-sm`}
      >
        {active.icon}
        <span className="hidden sm:inline">{active.label}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown size={15} className="text-slate-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className={`absolute right-0 mt-2 w-52 p-1.5 rounded-2xl border z-50 ${
              theme.border
            } ${
              darkMode ? 'bg-gray-950 shadow-2xl shadow-black/60' : 'bg-white shadow-xl shadow-indigo-500/10'
            } backdrop-blur-xl`}
          >
            {SORT_OPTIONS.map(opt => (
              <li key={opt.value} role="option" aria-selected={value === opt.value}>
                <button
                  onClick={() => { onChange(opt.value); setIsOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    value === opt.value
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                      : `${theme.textSecondary} ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${value === opt.value ? 'bg-white/20' : darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    {opt.icon}
                  </div>
                  {opt.label}
                  {value === opt.value && (
                    <motion.div layoutId="sortCheck" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── FilterChip ──────────────────────────────────────────────────────────────

const FilterChip = ({ chip, onRemove, darkMode }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
      darkMode ? 'bg-gray-950 border-white/8 text-slate-300' : 'bg-white border-indigo-100 text-indigo-600 shadow-sm'
    }`}
  >
    <span className="opacity-50">{chip.label.split(':')[0]}</span>
    <span>{(chip.label.split(':')[1] || '').trim()}</span>
    <button
      onClick={onRemove}
      aria-label={`Remove ${chip.label} filter`}
      className="ml-0.5 hover:text-rose-500 transition-colors"
    >
      <FiX size={12} />
    </button>
  </motion.div>
);

// ─── EmptyState ──────────────────────────────────────────────────────────────

const EmptyState = ({ onClear, theme }) => (
  <div className="flex flex-col items-center justify-center py-28 text-center">
    <div className="relative w-28 h-28 rounded-[2rem] flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-indigo-500/5 border border-indigo-500/10" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent animate-pulse" />
      <FiSearch className="text-indigo-500 w-10 h-10 relative z-10" />
    </div>
    <h3 className={`text-3xl font-black tracking-tighter ${theme.textPrimary} mb-3`}>
      Zero Matches
    </h3>
    <p className={`${theme.textSecondary} max-w-xs mb-10 font-medium leading-relaxed text-[12px] opacity-60`}>
      No challenges match your current filters. Try broadening your search.
    </p>
    <button
      onClick={onClear}
      className="px-10 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs shadow-xl shadow-indigo-600/25 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
    >
      Reset All Filters
    </button>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const DisplayCom = ({ darkMode = false }) => {
  const [showFilters, setShowFilters]     = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading]         = useState(true);
  const [currentPage, setCurrentPage]     = useState(1);

  const { filters, updateFilter, clearFilters, filteredCompetitions, activeFilterCount }
    = useCompetitionFilters();

  const theme      = darkMode ? THEME_TOKENS.dark : THEME_TOKENS.light;
  const liveStats  = useLiveStats();
  const categories = useMemo(() => [...new Set(competitions.map(c => c.category))], []);

  const totalPages   = Math.ceil(filteredCompetitions.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() =>
    filteredCompetitions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filteredCompetitions, currentPage]
  );

  const pageRange = useMemo(() => buildPageRange(currentPage, totalPages), [currentPage, totalPages]);

  // Simulate network loading on filter change
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(t);
  }, [filters]);

  // Reset to page 1 when filters change
  useEffect(() => { setCurrentPage(1); }, [filters]);

  // Build active filter chips
  const activeChips = useMemo(() => {
    const chips = [];
    if (filters.category   !== 'All')  chips.push({ key: 'category',   label: `Category: ${filters.category}`    });
    if (filters.difficulty !== 'any')  chips.push({ key: 'difficulty', label: `Level: ${filters.difficulty}`     });
    if (filters.status     !== 'any')  chips.push({ key: 'status',     label: `Status: ${filters.status}`        });
    if (filters.prizeRange !== 'any')  chips.push({ key: 'prizeRange', label: `Prize: ${filters.prizeRange}`     });
    if (filters.searchValue)           chips.push({ key: 'searchValue',label: `Search: ${filters.searchValue}`  });
    (filters.tags || []).forEach(tag =>
      chips.push({ key: `tag-${tag}`, label: `Tag: ${tag}`,
        onRemove: () => updateFilter('tags', filters.tags.filter(t => t !== tag)) })
    );
    return chips;
  }, [filters, updateFilter]);

  const removeFilter = useCallback((key) => {
    updateFilter(key, FILTER_DEFAULTS[key] ?? '');
  }, [updateFilter]);

  const headingText = useMemo(() => {
    if (filters.searchValue)          return `Results for "${filters.searchValue}"`;
    if (filters.category !== 'All')   return `${filters.category} Roles`;
    return 'Curated for Your Profile';
  }, [filters.searchValue, filters.category]);

  return (
    <div className="pb-20">

      {/* ── Sticky header ── */}
      <div className={`sticky top-0 z-30 transition-all duration-300 ${
        darkMode
          ? 'bg-gray-950/85 border-b border-white/5 shadow-2xl shadow-black/20'
          : 'bg-white/85 border-b border-indigo-100/50 shadow-xl shadow-indigo-500/8'
      } backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4">

            {/* Left: toggle + title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(v => !v)}
                aria-pressed={isSidebarOpen}
                aria-label={isSidebarOpen ? 'Hide filters' : 'Show filters'}
                className={`hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl border font-black text-xs transition-all duration-300 ${
                  isSidebarOpen
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : `${theme.border} ${theme.surface} ${theme.textPrimary} hover:border-indigo-400/50`
                }`}
              >
                <FiSliders size={15} />
                <span>{isSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className={`text-xl font-black tracking-tighter ${theme.textPrimary}`}>Careers</h1>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.textSecondary}`}>
                  {filteredCompetitions.length} Opportunities
                </span>
              </div>
            </div>

            {/* Right: quick filters + sort */}
            <div className="flex items-center gap-3">
              {/* <div className="hidden sm:flex items-center gap-2">
                {[
                  { label: 'Live Now',     filterKey: 'status',     value: 'Live',  activeColor: 'bg-rose-500',    hoverBorder: 'hover:border-rose-400'    },
                  { label: 'High Rewards', filterKey: 'prizeRange', value: 'large', activeColor: 'bg-emerald-500', hoverBorder: 'hover:border-emerald-400' },
                ].map(({ label, filterKey, value, activeColor, hoverBorder }) => {
                  const isActive = filters[filterKey] === value;
                  return (
                    <button
                      key={filterKey}
                      onClick={() => updateFilter(filterKey, isActive ? FILTER_DEFAULTS[filterKey] : value)}
                      aria-pressed={isActive}
                      className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                        isActive
                          ? `${activeColor} text-white shadow-md`
                          : `${theme.surface} ${theme.textSecondary} border ${theme.border} ${hoverBorder}`
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div> */}
              <SortDropdown
                value={filters.sortBy}
                onChange={val => updateFilter('sortBy', val)}
                theme={theme}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Live status ticker ── */}
      {/* <div className={`py-3.5 border-b ${theme.border} ${darkMode ? 'bg-indigo-500/4' : 'bg-indigo-50/25'}`}>
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-10 items-center text-[10px] md:text-[11px] font-black uppercase tracking-widest whitespace-nowrap"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex items-center gap-2 text-emerald-500">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            Active Hiring: {liveStats.liveCount}
          </div>
          <div className="flex items-center gap-2 text-indigo-500/70">
            <FiAward size={13} /> Total Rewards: {liveStats.totalRewards}
          </div>
          <div className="flex items-center gap-2 text-indigo-500/70">
            <FiUsers size={13} /> {liveStats.totalTalents} Aspiring Talents
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/8 rounded-full border border-indigo-500/15 text-indigo-500/70">
            <FiClock size={13} /> New: {liveStats.newCount} this week
          </div>
        </div>
      </div> */}

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <AnimatePresence initial={false}>
            {isSidebarOpen && (
              <motion.aside
                key="sidebar"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 320 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="hidden lg:block flex-shrink-0 overflow-hidden"
              >
                <div className="sticky top-24 space-y-6 pr-2 w-80">
                  <Filters
                    categories={categories}
                    filterState={filters}
                    updateFilter={updateFilter}
                    clearFilters={clearFilters}
                    activeFilterCount={activeFilterCount}
                    darkMode={darkMode}
                  />

                  {/* Premium CTA */}
                  <div className={`p-7 rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white overflow-hidden relative shadow-2xl shadow-indigo-700/20 group`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />
                    <h4 className="font-black text-lg mb-2 relative z-10">Scale Your Career</h4>
                    <p className="text-[11px] opacity-60 mb-5 relative z-10 leading-relaxed font-bold uppercase tracking-wider">
                      Get direct interview invites from top companies.
                    </p>
                    <button className="w-full py-3.5 bg-white text-indigo-700 rounded-xl font-black text-xs shadow-lg relative z-10 hover:bg-indigo-50 transition-all hover:scale-[1.02] active:scale-95">
                      Upgrade to Pro
                    </button>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* Section heading + reset */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className={`text-xl font-black tracking-tight ${theme.textPrimary}`}>
                {headingText}
              </h2>
              <AnimatePresence>
                {activeFilterCount > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={clearFilters}
                    className="text-xs font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 px-3 py-2 rounded-xl transition-all uppercase tracking-widest flex items-center gap-1.5"
                  >
                    <FiX size={13} /> Reset All
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Filter chips */}
            <AnimatePresence>
              {activeChips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-6 overflow-hidden"
                >
                  {activeChips.map(chip => (
                    <FilterChip
                      key={chip.key}
                      chip={chip}
                      onRemove={() => chip.onRemove ? chip.onRemove() : removeFilter(chip.key)}
                      darkMode={darkMode}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Card list */}
            <div className="min-h-[400px]">
              {isLoading ? (
                <GridSkeleton count={4} darkMode={darkMode} />
              ) : currentItems.length > 0 ? (
                <motion.div
                  key={`${filters.sortBy}-${currentPage}`}
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                  className="flex flex-col gap-5"
                >
                  {currentItems.map((comp, i) => (
                    <motion.div
                      key={comp.id}
                      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <CompetitionCard competition={comp} darkMode={darkMode} index={i} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <EmptyState onClear={clearFilters} theme={theme} />
              )}
            </div>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className={`p-3.5 rounded-2xl border transition-all ${
                    currentPage === 1
                      ? 'opacity-25 cursor-not-allowed'
                      : `${theme.surface} ${theme.textPrimary} ${theme.border} hover:border-indigo-400 active:scale-90`
                  }`}
                >
                  <FiChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-1.5">
                  {pageRange.map((page, i) =>
                    page === '…' ? (
                      <span key={`ellipsis-${i}`} className="px-2 text-slate-400 font-black text-sm">…</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                        className={`relative w-11 h-11 rounded-2xl font-black text-sm transition-all overflow-hidden flex items-center justify-center ${
                          currentPage === page
                            ? 'text-white shadow-xl shadow-indigo-600/25 scale-105'
                            : `${theme.textSecondary} ${theme.surface} border ${theme.border} hover:border-indigo-400`
                        }`}
                      >
                        {currentPage === page && (
                          <motion.div
                            layoutId="activePage"
                            className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-700"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                        <span className="relative z-10">{page}</span>
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className={`p-3.5 rounded-2xl border transition-all ${
                    currentPage === totalPages
                      ? 'opacity-25 cursor-not-allowed'
                      : `${theme.surface} ${theme.textPrimary} ${theme.border} hover:border-indigo-400 active:scale-90`
                  }`}
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile FAB ── */}
      <motion.button
        onClick={() => setShowFilters(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open filters"
        className="lg:hidden fixed bottom-8 right-6 w-15 h-15 p-4 rounded-[1.75rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 flex items-center justify-center z-40"
      >
        <FiSliders size={22} />
        {activeFilterCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-rose-500 border-2 border-white dark:border-gray-950 rounded-full text-[10px] font-black flex items-center justify-center shadow-md">
            {activeFilterCount}
          </span>
        )}
      </motion.button>

      {/* ── Mobile bottom sheet ── */}
      <AnimatePresence>
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/65 backdrop-blur-md"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`absolute bottom-0 inset-x-0 h-[88vh] rounded-t-[2.5rem] shadow-2xl flex flex-col ${
                darkMode ? 'bg-slate-950' : 'bg-white'
              }`}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className={`w-10 h-1 rounded-full ${darkMode ? 'bg-white/15' : 'bg-slate-200'}`} />
              </div>

              <div className="px-6 py-4 flex justify-between items-center">
                <div>
                  <h3 className={`text-xl font-black tracking-tighter ${theme.textPrimary}`}>Filters</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mt-0.5">
                    Configure Your Search
                  </p>
                </div>
                <button
                  onClick={() => setShowFilters(false)}
                  aria-label="Close filters"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 ${
                    darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4" style={{ scrollbarWidth: 'none' }}>
                <Filters
                  categories={categories}
                  filterState={filters}
                  updateFilter={updateFilter}
                  clearFilters={clearFilters}
                  activeFilterCount={activeFilterCount}
                  darkMode={darkMode}
                  className="w-full !shadow-none !border-0 !rounded-none"
                />
              </div>

              <div className={`px-6 py-5 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'} pb-8`}>
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/25 active:scale-[0.98] transition-all uppercase tracking-widest"
                >
                  {activeFilterCount > 0
                    ? `Apply ${activeFilterCount} Filter${activeFilterCount > 1 ? 's' : ''} · ${filteredCompetitions.length} Roles`
                    : `Show ${filteredCompetitions.length} Roles`}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default DisplayCom;