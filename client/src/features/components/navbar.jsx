import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FileText, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
// Utility function to merge class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Theme Toggle Component
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative p-2.5 rounded-xl bg-white dark:bg-black hover:bg-blue-50 dark:hover:bg-slate-900 transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg border border-gray-200 dark:border-slate-700"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative"
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-blue-500" strokeWidth={2.5} />
        ) : (
          <Sun className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
        )}
      </motion.div>
    </button>
  );
}

// NavBar Component
export function NavBar({ items, className }) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  return (
    <div
      className={cn(
        'fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-[200] mb-6 sm:pt-6 h-max w-max',
        className
      )}
    >
      <div className="flex items-center gap-1 bg-white dark:bg-black border border-gray-300 dark:border-slate-700 backdrop-blur-xl p-2 rounded-2xl shadow-xl transition-all duration-300">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                'group relative cursor-pointer text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 overflow-hidden',
                isActive 
                  ? 'text-dark bg-blue-600 dark:bg-white shadow-lg shadow-blue-500/30 scale-105' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95'
              )}
            >
              <span className="relative z-10 hidden md:inline">{item.name}</span>
              <span className="relative z-10 md:hidden">
                <Icon size={20} strokeWidth={2.5} />
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full rounded-xl -z-0"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 35,
                  }}
                >
                  {/* Tube light effect - Blue glow on top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                    <div className="absolute w-16 h-8 bg-blue-400/40 rounded-full blur-xl -top-3 -left-3 animate-pulse" />
                    <div className="absolute w-12 h-8 bg-blue-500/40 rounded-full blur-lg -top-2 left-0 animate-pulse" style={{ animationDelay: '0.3s' }} />
                    <div className="absolute w-6 h-6 bg-blue-400/50 rounded-full blur-md -top-1 left-2 animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </div>
                </motion.div>
              )}
              
              {/* Hover effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 dark:group-hover:bg-blue-500/10 rounded-xl transition-all duration-300 -z-0" />
              )}
            </Link>
          );
        })}
        
        {/* Theme Toggle with separator */}
        <div className="ml-1 pl-3 border-l border-gray-300 dark:border-slate-700">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

// Main Demo Component
export default function Navbar() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: User },
    { name: 'Projects', url: '/projects', icon: Briefcase },
    { name: 'Resume', url: '/resume', icon: FileText },
    { name: 'Login', url: '/login', icon: FileText },

  ];

  return (
    <>
      <NavBar items={navItems} />
    </>
  );
}
