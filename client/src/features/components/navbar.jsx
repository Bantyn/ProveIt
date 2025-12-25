import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  Briefcase, 
  FileText, 
  Sun, 
  Moon, 
  LogIn, 
  UserPlus, 
  LogOut, 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Utility function to merge class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// --- Theme Toggle Component ---
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
      className="group relative p-2.5 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm border border-gray-200 dark:border-slate-700"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative"
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-blue-400" strokeWidth={2} />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" strokeWidth={2} />
        )}
      </motion.div>
    </button>
  );
}

// --- Profile Dropdown Component ---
function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative ml-1 sm:ml-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* The Profile Circle */}
      <Link 
        to="/dashboard"
        className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 z-20 relative ring-2 ring-white dark:ring-slate-800"
      >
        <User size={20} />
      </Link>

      {/* The Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            // CRITICAL RESPONSIVE POSITIONING:
            // bottom-full (opens UP on mobile)
            // sm:top-full (opens DOWN on desktop)
            className="absolute right-0 bottom-full mb-3 sm:mb-0 sm:bottom-auto sm:top-full sm:mt-3 w-48 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-2xl z-50 overflow-hidden backdrop-blur-md origin-bottom-right sm:origin-top-right"
          >
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
              Account
            </div>
            
            <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors">
              <LogIn size={16} />
              <span>Login</span>
            </Link>
            
            <Link to="/signup/clientSignup" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors">
              <UserPlus size={16} />
              <span>Register</span>
            </Link>
            
            <div className="h-px bg-gray-100 dark:bg-slate-800 my-1" />
            
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- NavBar Component ---
export function NavBar({ items, className }) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  return (
    <div
      className={cn(
        // FIXED CONTAINER: 
        // 1. Removed px-[300px]
        // 2. Added w-fit to wrap content
        // 3. Added max-w-[95vw] to prevent screen overflow
        'fixed bottom-6 sm:top-6 left-1/2 -translate-x-1/2 z-[200] h-max w-fit max-w-[95vw]',
        className
      )}
    >
      <div className="flex items-center gap-1 sm:gap-2 bg-white/90 dark:bg-black/80 border border-gray-200 dark:border-slate-800 backdrop-blur-xl p-2 rounded-full shadow-2xl transition-all duration-300">
        
        {/* Navigation Items List */}
        <div className="flex items-center">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  'relative cursor-pointer text-sm font-semibold px-4 py-3 sm:px-6 sm:py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2',
                  isActive 
                    ? 'text-blue-600 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800/50'
                )}
              >
                <span className="relative z-20 flex items-center gap-2">
                  <Icon size={20} strokeWidth={2.5} className={cn("transition-transform duration-300", isActive && "scale-110")} />
                  {/* Text hidden on mobile, visible on tablet/desktop */}
                  <span className="hidden md:inline">{item.name}</span>
                </span>
                
                {/* THE TORCH / LAMP EFFECT */}
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full z-10"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    {/* The light source line at the top */}
                    <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-blue-500 dark:bg-white rounded-t-full shadow-[0_-2px_10px_rgba(59,130,246,1)] dark:shadow-[0_-2px_10px_rgba(255,255,255,1)] z-20"></div>
                    
                    {/* The Glow Beam dripping down */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-100/20 dark:from-white/20 via-blue-50/5 dark:via-white/5 to-transparent blur-sm rounded-full"></div>
                  </motion.div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Vertical Separator (Visible only on larger screens) */}
        <div className="h-6 w-px bg-gray-300 dark:bg-slate-700 mx-1 hidden sm:block"></div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1 sm:gap-2 pr-1">
          <ThemeToggle />
          <ProfileMenu />
        </div>

      </div>
    </div>
  );
}

// --- Main Export ---
export default function Navbar() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: User },
    { name: 'Projects', url: '/projects', icon: Briefcase },
    { name: 'Resume', url: '/resume', icon: FileText },
  ];

  return (
    <>
      <NavBar items={navItems} />
    </>
  );
}