import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import Dropdown from "./Dropdown.jsx";

// Icons
import {
  Home,
  Info,
  Phone,
  Upload,
  LogIn,
  UserPlus,
  LogOut,
  Bot,
} from "lucide-react";

import ProfileDropdown from "./ProfileDropdown.jsx";
import ActionSearchBar from "./ActionSearchBar";

export default function Navbar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token")) || true;
  // console.log(isLoggedIn)
  let lastScroll = 0;

  // MENU CONFIG
    const loggedInItems = [
  { name: "Dashboard", url: "/dashboard", icon: Home },        // Main dashboard
  { name: "Packages", url: "/packages", icon: Upload },        // Upload/View Packages
  { name: "Competitions", url: "/competitions", icon: Bot },  // Support/Competitions
  { name: "Analytics", url: "/analytics", icon: Info },       // About → Analytics
  { name: "Messages", url: "/messages", icon: Phone },        // Contact → Messages
  { name: "Profile", url: "/profile", icon: UserPlus },       // Profile section
  { name: "Logout", url: "/logout", icon: LogOut },           // Logout
];

  const guestItems = [
    { name: "About", url: "/about", icon: Info },
    { name: "Contact", url: "/contact", icon: Phone },
    { name: "Login", url: "/login", icon: LogIn },
  ];

  const items = isLoggedIn ? loggedInItems : guestItems;

  // Detect active route
  useEffect(() => {
    const current = items.find((item) => location.pathname === item.url);
    setActiveTab(current ? current.name : "");
  }, [location.pathname, items]);

  // Scroll behavior
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 20);

      if (current > lastScroll && current > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: hidden ? 1.2 : 0,
      }}
      className="fixed z-50 left-1/2 -translate-x-1/2 top-4 md:top-0"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={clsx(
          "flex items-center gap-2 px-2 py-2 border backdrop-blur-xl shadow-xl",
          "bg-white/10 dark:bg-black/30 border-white/10",
          "rounded-full",
          !scrolled &&
            "md:w-screen md:rounded-none md:rounded-b-2xl md:px-10 md:py-4",
          scrolled && "mt-5 md:w-auto md:rounded-full"
        )}
      >
        {/* Logo */}
        <Link
          to="/"
          className="hidden md:block px-4 text-lg font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"
        >
          ProveIt.Io
        </Link>

        {/* Navigation Items */}
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={clsx(
                "relative px-5 py-2 rounded-full text-sm font-semibold transition",
                "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-violet-400",
                isActive && "text-black dark:text-violet-400"
              )}
            >
              {/* Desktop Text */}
              <span className="hidden md:inline">{item.name}</span>
              {/* Mobile Icon */}
              <span className="md:hidden">
                <Icon size={20} strokeWidth={2.2} />
              </span>

              {/* Active Lamp */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-black/10 dark:bg-violet-400/10 -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    {/* Glow */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black dark:bg-violet-300 rounded-t-full">
                      <div className="absolute w-12 h-6 bg-black/30 dark:bg-violet-400/40 blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-black/30 dark:bg-violet-400/40 blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-black/30 dark:bg-violet-400/40 blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          );
        })}

        {/* Signup Dropdown (Guest only) */}
        {!isLoggedIn && (
          <Dropdown
            align="right"
            trigger={
              <button
                className={clsx(
                  "relative px-5 py-2 rounded-full text-sm font-semibold transition",
                  "text-white bg-gradient-to-r from-violet-400 to-blue-400 hover:opacity-90 active:scale-95 shadow-sm shadow-violet-400/50"
                )}
              >
                <span className="hidden md:inline">Signup</span>
                <span className="md:hidden">
                  <UserPlus size={20} strokeWidth={2.2} />
                </span>
              </button>
            }
          >
            <div className="py-1">
              <Link
                to="/signup/client"
                className="flex items-center gap-2 px-4 py-2 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
              >
                As a Client
              </Link>
              <Link
                to="/signup/company"
                className="flex items-center gap-2 px-4 py-2 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
              >
                As a Company
              </Link>
            </div>
          </Dropdown>
        )}

        <ActionSearchBar />
        {isLoggedIn && <ProfileDropdown />}
      </motion.div>
    </motion.div>
  );
}
