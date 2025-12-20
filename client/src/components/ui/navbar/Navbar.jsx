import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  /**
   * activeTab → which menu item is active (route based)
   * scrolled  → true when page is scrolled > 20px
   * hidden    → true when scrolling DOWN (navbar hides)
   */
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // Tracks last scroll position (used for direction detection)
  let lastScroll = 0;

  /**
   * DESKTOP & MOBILE MENU CONFIG
   * Desktop shows text
   * Mobile shows icons only
   */
  const loggedInItems = [
    { name: "Home", url: "/home", icon: Home },
    { name: "About", url: "/about", icon: Info },
    { name: "Support", url: "/support", icon: Bot },
    { name: "Contact", url: "/contact", icon: Phone },
    { name: "Upload", url: "/upload", icon: Upload },
    { name: "Logout", url: "/logout", icon: LogOut },
  ];

  const guestItems = [
    { name: "About", url: "/about", icon: Info },
    { name: "Contact", url: "/contact", icon: Phone },
    { name: "Login", url: "/login", icon: LogIn },
    // { name: "Signup", url: "/signup", icon: UserPlus },
  ];

  const items = isLoggedIn ? loggedInItems : guestItems;

  /**
   * ACTIVE ROUTE DETECTION
   * Runs on route change
   */
  useEffect(() => {
    const current = items.find((i) => i.url === location.pathname);
    if (current) setActiveTab(current.name);
  }, [location.pathname]);

  /**
   * SCROLL BEHAVIOR
   *
   * ─ Scroll DOWN  → navbar hides
   * ─ Scroll UP    → navbar shows (with 0.8s delay)
   * ─ At TOP       → navbar becomes FULL WIDTH (desktop only)
   */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      // When not at top
      setScrolled(current > 20);

      // Detect scroll direction
      if (current > lastScroll && current > 120) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /**
     * OUTER WRAPPER
     * - Fixed position
     * - Desktop: top aligned
     * - Mobile: floating pill
     */
    <motion.div
      initial={false}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: hidden ? 1.2 : 0, // ⏱ scroll-up hold
      }}
      className="fixed z-50 left-1/2 -translate-x-1/2 top-4 md:top-0"
    >
      {/**
       * INNER NAVBAR CONTAINER
       *
       * DESKTOP:
       * - At top → full width bar
       * - Scrolled → floating pill
       *
       * MOBILE:
       * - Always pill
       */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={clsx(
          "flex items-center gap-2 px-2 py-2 border backdrop-blur-xl shadow-xl",
          "bg-white/10 dark:bg-black/30 border-white/10",
          "rounded-full",

          // Desktop full-width at top
          !scrolled &&
            "md:w-screen md:rounded-none md:rounded-b-2xl md:px-10 md:py-4",

          // Desktop + mobile pill when scrolled
          scrolled && "mt-5 md:w-auto md:rounded-full"
        )}
      >
        {/* Desktop Logo only */}
        <Link
          to="/home"
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
              {/* Desktop text */}
              <span className="hidden md:inline">{item.name}</span>

              {/* Mobile icon */}
              <span className="md:hidden">
                <Icon size={20} strokeWidth={2.2} />
              </span>

              {/* Active pill animation */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-black/10 dark:bg-violet-400/10 -z-10"
                />
              )}
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
                  "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-violet-400"
                )}
              >
                {/* Desktop text */}
                <span className="hidden md:inline">Signup</span>

                {/* Mobile icon */}
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
                👤 As a Client
              </Link>

              <Link
                to="/signup/company"
                className="flex items-center gap-2 px-4 py-2 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
              >
                🏢 As a Company
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
