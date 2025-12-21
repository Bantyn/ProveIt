"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import Dropdown from "./Dropdown.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx";
import ActionSearchBar from "./ActionSearchBar";

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
  BarChart2,
  LayoutDashboard,
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const lastScroll = useRef(0);

  const [activeTab, setActiveTab] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  /* ------------------------------------------------------------------ */
  /* AUTH STATE */
  /* ------------------------------------------------------------------ */
  const isLoggedIn = Boolean(localStorage.getItem("token")) || true;
  const role = localStorage.getItem("role") || "client"; // "company" | "client"


  /* ------------------------------------------------------------------ */
  /* MENU CONFIG */
  /* ------------------------------------------------------------------ */

  // COMPANY MENU
  const companyItems = [
    { name: "Dashboard", url: "/company/dashboard", icon: LayoutDashboard },
    { name: "Post Competition", url: "/company/post", icon: Upload },
    { name: "Competitions", url: "/company/competitions", icon: Bot },
    { name: "Analytics", url: "/company/analytics", icon: BarChart2 },
    { name: "Messages", url: "/company/messages", icon: Phone },
  ];

  // CLIENT MENU
  const clientItems = [
    { name: "Dashboard", url: "/client/dashboard", icon: LayoutDashboard },
    { name: "Competitions", url: "/competitions", icon: Bot },
    { name: "Submissions", url: "/submissions", icon: Upload },
    { name: "Messages", url: "/messages", icon: Phone },
  ];

  // GUEST MENU
  const guestItems = [
    { name: "About", url: "/about", icon: Info },
    { name: "Contact", url: "/contact", icon: Phone },
    { name: "Login", url: "/login", icon: LogIn },
  ];

  /* ------------------------------------------------------------------ */
  /* SELECT MENU BASED ON ROLE */
  /* ------------------------------------------------------------------ */
  const items = !isLoggedIn
    ? guestItems
    : role === "company"
    ? companyItems
    : clientItems;

  /* ------------------------------------------------------------------ */
  /* ACTIVE ROUTE */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const current = items.find((item) => location.pathname === item.url);
    setActiveTab(current ? current.name : "");
  }, [location.pathname, items]);

  /* ------------------------------------------------------------------ */
  /* SCROLL BEHAVIOR */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 20);

      if (current > lastScroll.current && current > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ------------------------------------------------------------------ */
  /* RENDER */
  /* ------------------------------------------------------------------ */
  return (
    <motion.div
      initial={false}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
        delay: hidden ? 0.8 : 0,
      }}
      className="fixed z-50 left-1/2 -translate-x-1/2 top-4 md:top-0"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={clsx(
          "flex items-center gap-2 px-2 py-2 border backdrop-blur-[6px] shadow-xl",
          "bg-white/10 dark:bg-black/30 border-white/10",
          "rounded-full",
          !scrolled &&
            "md:w-screen md:rounded-none md:rounded-b-2xl md:px-10 md:py-4",
          scrolled && "mt-5 md:w-auto md:rounded-full"
        )}
      >
        {/* LOGO */}
        <Link
          to="/"
          className="hidden md:block px-4 text-lg font-extrabold 
          bg-gradient-to-r from-violet-400 to-blue-400 
          bg-clip-text text-transparent"
        >
          ProveIt.io
        </Link>

        {/* NAV ITEMS */}
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              title={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={clsx(
                "relative px-5 py-2 rounded-full text-sm font-semibold transition",
                "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-violet-400",
                isActive && "text-black dark:text-violet-400"
              )}
            >
              
              {/* Desktop */}
              <span 
              className={clsx("hidden",!scrolled && "md:inline")}
              >{item.name}</span>

              {/* Mobile */}
              <span className={clsx("md:hidden",scrolled && "md:inline")}>
                <Icon size={20} strokeWidth={2.2} />
              </span>

              {/* ACTIVE PILL */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full 
                    bg-black/10 dark:bg-violet-400/10 -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {/* GLOW */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 
                    w-8 h-1 bg-black dark:bg-violet-300 rounded-t-full">
                      <div className="absolute w-12 h-6 
                      bg-black/30 dark:bg-violet-400/40 blur-md -top-2 -left-2" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          );
        })}

        {/* GUEST SIGNUP */}
        {!isLoggedIn && (
          <Dropdown
            align="right"
            trigger={
              <button
                className="relative px-5 py-2 rounded-full text-sm font-semibold 
                text-white bg-gradient-to-r from-violet-400 to-blue-400 
                hover:opacity-90 active:scale-95 shadow-md"
              >
                <span className="hidden md:inline">Signup</span>
                <span className="md:hidden">
                  <UserPlus size={20} />
                </span>
              </button>
            }
          >
            <div className="py-1">
              <Link
                to="/signup/client"
                className="block px-4 py-2 text-sm 
                hover:bg-black/5 dark:hover:bg-white/5"
              >
                Join as Client
              </Link>
              <Link
                to="/signup/company"
                className="block px-4 py-2 text-sm 
                hover:bg-black/5 dark:hover:bg-white/5"
              >
                Join as Company
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
