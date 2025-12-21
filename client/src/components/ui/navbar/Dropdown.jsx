"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function Dropdown({
  trigger,
  children,
  align = "right", // right | left
  width = "w-48",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className={clsx(
              "absolute mt-3 rounded-xl overflow-hidden z-50",
              width,
              align === "right" ? "right-0" : "left-0",
              "bg-white/80 dark:bg-black/70 backdrop-blur-xl",
              "border border-white/10 shadow-xl"
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
