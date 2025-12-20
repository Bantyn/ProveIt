"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Send,
  BarChart2,
  Video,
  PlaneTakeoff,
  AudioLines,
  LayoutGrid,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Utils                                                                       */
/* -------------------------------------------------------------------------- */

const cn = (...c) => c.filter(Boolean).join(" ");

function useDebounce(value, delay = 200) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

const ACTIONS = [
  {
    id: "1",
    label: "Book tickets",
    icon: <PlaneTakeoff className="h-4 w-4 text-blue-400" />,
    description: "Operator",
    short: "⌘K",
    end: "Agent",
  },
  {
    id: "2",
    label: "Summarize",
    icon: <BarChart2 className="h-4 w-4 text-orange-400" />,
    description: "GPT-5",
    short: "⌘P",
    end: "Command",
  },
  {
    id: "3",
    label: "Screen Studio",
    icon: <Video className="h-4 w-4 text-purple-400" />,
    description: "Claude 4.1",
    end: "App",
  },
  {
    id: "4",
    label: "Talk to Jarvis",
    icon: <AudioLines className="h-4 w-4 text-green-400" />,
    description: "Voice AI",
    end: "Active",
  },
  {
    id: "5",
    label: "UI Components",
    icon: <LayoutGrid className="h-4 w-4 text-sky-400" />,
    description: "Design system",
    end: "Link",
  },
];

/* -------------------------------------------------------------------------- */
/* Animations                                                                  */
/* -------------------------------------------------------------------------- */

const listAnim = {
  hidden: { opacity: 0, y: -6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06 },
  },
  exit: { opacity: 0, y: -6 },
};

const itemAnim = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function ActionSearchBar({ actions = ACTIONS }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const debounced = useDebounce(query);

  const filtered = useMemo(() => {
    if (!debounced) return actions;
    return actions.filter((a) =>
      `${a.label} ${a.description || ""}`
        .toLowerCase()
        .includes(debounced.toLowerCase())
    );
  }, [debounced, actions]);

  const onKeyDown = useCallback(
    (e) => {
      if (!filtered.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % filtered.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + filtered.length) % filtered.length);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setActive(-1);
      }
    },
    [filtered]
  );

  return (
    <div className="relative hidden md:block w-[220px]">
      {/* Input */}
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKeyDown}
          placeholder="Search…"
          className={cn(
            "h-9 w-full rounded-full px-4 pr-9 text-sm",
            "bg-white/10 dark:bg-black/30",
            "border border-white/10",
            "text-black dark:text-white",
            "placeholder:text-black/50 dark:placeholder:text-white/40",
            "backdrop-blur-md focus:outline-none"
          )}
        />

        {/* Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <AnimatePresence mode="popLayout">
            {query ? (
              <motion.div
                key="send"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
                <Send className="h-4 w-4 text-black/60 dark:text-white/60" />
              </motion.div>
            ) : (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
                <Search className="h-4 w-4 text-black/60 dark:text-white/60" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.ul
            variants={listAnim}
            initial="hidden"
            animate="show"
            exit="exit"
            className={cn(
              "absolute mt-2 w-full rounded-xl overflow-hidden",
              "bg-white/80 dark:bg-black/70 backdrop-blur-xl",
              "border border-white/10 shadow-xl"
            )}
          >
            {filtered.map((a, i) => (
              <motion.li
                key={a.id}
                variants={itemAnim}
                className={cn(
                  "px-4 py-2 flex items-center justify-between cursor-pointer",
                  "hover:bg-black/5 dark:hover:bg-white/5 dark:text-white ",
                  i === active && "bg-black/10 dark:bg-white/10"
                )}
              >
                <div className="flex items-center gap-2">
                  {a.icon}
                  <div>
                    <p className="text-sm font-medium">{a.label}</p>
                    {a.description && (
                      <p className="text-xs opacity-60">{a.description}</p>
                    )}
                  </div>
                </div>

                <div className="text-xs opacity-50 flex gap-2">
                  {a.short && <span>{a.short}</span>}
                  {a.end && <span>{a.end}</span>}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
