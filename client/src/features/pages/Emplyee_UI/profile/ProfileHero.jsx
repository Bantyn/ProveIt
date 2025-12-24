"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Clock, Zap } from "lucide-react";
import { Card, CardContent } from "./Card.jsx";

export default function ProfileHero({
  name = "Banty Patel",
  role = "Creative Web Developer",
  email = "banty@example.com",
  avatarSrc = "/images/profile.jpg",
  statusText = "Available for Projects",
  statusColor = "bg-emerald-500",
  glowText = "Building Experiences, Not Just Websites",
  className,
}) {
  const [copied, setCopied] = useState(false);

  const timeText = useMemo(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const hour12 = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12}:${m} ${ampm}`;
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="relative w-full py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={clsx("relative mx-auto max-w-3xl", className)}
      >
        {/* Glow */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-12 top-[70%] rounded-[30px]
                        bg-violet-500/90 blur-xl
                        shadow-[0_40px_100px_-20px_rgba(139,92,246,0.9)] z-0" />

        {/* Glow text */}
        <div className="absolute inset-x-0 -bottom-14 z-0">
          <div className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-white/90">
            <Zap className="h-4 w-4 text-yellow-300" />
            {glowText}
          </div>
        </div>

        {/* Card */}
        <Card
          className="
            relative z-10  border overflow-visible
            dark:bg-neutral-900 backdrop-blur-sm bg-violet-200/50
            dark:text-white hover:scale-101 hover:-translate-y-1 border-violet-500/5 hover:border-violet-500/10 transition-all duration-400
          "
        >
          <CardContent className="p-8 sm:p-10">
            {/* Status */}
            <div className="mb-8 flex items-center justify-between text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    "h-2.5 w-2.5 rounded-full animate-pulse",
                    statusColor
                  )}
                />
                {statusText}
              </div>

              <div className="flex items-center gap-2 opacity-80">
                <Clock className="h-4 w-4" />
                {timeText}
              </div>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/10">
                <img
                  src={avatarSrc}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold">
                  {name}
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  {role}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                variant="secondary"
                className="h-12 rounded-2xl gap-3 bg-white/10  hover:bg-white/15"
              >
                Hire Me
              </button>

              <button
                variant="secondary"
                onClick={handleCopy}
                className="h-12 rounded-2xl gap-3 bg-white/10 dark:text-white hover:bg-white/15"
              >
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
