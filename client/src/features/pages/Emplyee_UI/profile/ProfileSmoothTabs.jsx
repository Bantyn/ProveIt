"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Github, Youtube, Video } from "lucide-react";
export default function ProfileSmoothTabs({ user }) {
      const [hoveredIndex, setHoveredIndex] = useState(null);
    
    const skills = [
    { name: "Design", level: 95 },
    { name: "Development", level: 90 },
    { name: "Branding", level: 85 },
    { name: "Motion", level: 78 },
    { name: "Strategy", level: 82 },
  ];
  const TABS = [
    {
  id: "basic",
  title: "Basic Info",
  cardContent: (
    <div className="p-8 space-y-8 w-full">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center gap-4">
        <div className="relative mb-2">
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-orange-400 opacity-30 blur-lg animate-glow" />
          <img
            src={`https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=${user.fullName}`}
            alt={user.fullName}
            className="relative w-32 h-32 rounded-full border-4 border-zinc-800 shadow-xl z-10"
          />
        </div>
        <h2 className="text-6xl font-bold text-white">Hi, I'm <br></br> <span className="text-8xl">{user.fullName}</span></h2>
        <p className="text-2xl text-neutral-300 mt-10 w-100">{user.bio}</p>
      </section>

      {/* Basic Info Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-300">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || "-"}</p>
        <p><strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}</p>
        <p><strong>Blocked:</strong> {user.isBlocked ? "Yes" : "No"}</p>
        <p><strong>Subscription:</strong> {user.subscriptionPlan}</p>
        <p><strong>Priority Access:</strong> {user.hasPriorityAccess ? "Yes" : "No"}</p>
      </div>

      {/* About Block */}
      <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-lg text-center text-sm text-neutral-300">
        Passionate about building elegant, accessible, and high-performance web apps. Always learning, always sharing.
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        <a
          href="#"
          className="flex items-center gap-2 rounded-full border border-zinc-800 px-4 py-2 text-sm text-white bg-zinc-800 hover:scale-105 transition"
        >
          <Github size={16} /> GitHub
        </a>
        <a
          href="#"
          className="flex items-center gap-2 rounded-full border border-red-500 px-4 py-2 text-sm text-white bg-red-500 hover:scale-105 transition"
        >
          <Youtube size={16} /> YouTube
        </a>
        <a
          href="#"
          className="flex items-center gap-2 rounded-full border border-zinc-50 px-4 py-2 text-sm text-zinc-900 bg-zinc-50 hover:scale-105 transition"
        >
          <Video size={16} /> Self Intro
        </a>
      </div>

      {/* Connect / Message Section */}
      <form className="flex flex-col md:flex-row justify-center gap-2 mt-4 w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 rounded-full px-4 py-2 text-sm text-black placeholder-zinc-500 bg-zinc-900 border border-zinc-700 focus:border-pink-400 shadow font-inter transition"
        />
        <button
          type="submit"
          className="rounded-full px-6 py-2 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white text-sm font-semibold shadow-lg hover:scale-105 transition"
        >
          Send
        </button>
      </form>
    </div>
  ),
}
,
    {
      id: "education",
      title: "Education",
      cardContent: (
        <div className="p-8 space-y-3">
          <h3 className="text-3xl font-semibold">Education</h3>
          <p><strong>College:</strong> {user.education?.college || "-"}</p>
          <p><strong>Degree:</strong> {user.education?.degree || "-"}</p>
          <p><strong>Graduation Year:</strong> {user.education?.graduationYear || "-"}</p>
        </div>
      ),
    },
    {
      id: "skills",
      title: "Skills",
      cardContent: (
        <div className="p-8 space-y-3">
          <h3 className="text-3xl font-semibold">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skills?.length > 0 ? (
              user.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-700 dark:text-violet-200 text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-neutral-400">No skills added</span>
            )}
          </div>
        </div>
      ),
    },
    {
      id: "resume",
      title: "Resume & Plan",
      cardContent: (
        <div className="p-8 space-y-3">
          <h3 className="text-3xl font-semibold">Resume & Plan</h3>
          <p>
            <strong>Resume:</strong>{" "}
            {user.resumeUrl ? (
              <a
                href={user.resumeUrl}
                target="_blank"
                className="text-blue-500 underline"
              >
                View Resume
              </a>
            ) : (
              "Not uploaded"
            )}
          </p>
          <p><strong>Subscription:</strong> {user.subscriptionPlan}</p>
          <p><strong>Priority Access:</strong> {user.hasPriorityAccess ? "Yes" : "No"}</p>
        </div>
      ),
    },
    {
      id: "Expertice",
      title: "Expertise",
      cardContent: (
          <section className="space-y-12 px-40">
                  <div className="flex items-center gap-4 w-full ">
                    <div className="h-px w-10 bg-border" />
                    <h2 className="font-bold w-full text-center mb-10 text-4xl bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                      Expertise
                    </h2>
                  </div>
                  <div className="flex flex-col">
                    {skills.map((skill, index) => (
                      <div
                        key={skill.name}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="
                            py-10
                            border-b
                            border-zinc-200 dark:border-white/10
                            last:border-none
                            transition-colors duration-300
                        "
                      >
                        {/* Skill Row */}
                        <div className="flex items-center justify-between">
                          <span
                            className={clsx(
                              "font-medium transition-all duration-300 text-2xl",
                              hoveredIndex === index
                                ? "text-zinc-900 dark:text-white"
                                : "text-zinc-500 dark:text-zinc-400"
                            )}
                          >
                            {skill.name}
                          </span>
        
                          <span className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
                            {skill.level}%
                          </span>
                        </div>
        
                        {/* Progress Track */}
                        <div
                          className="
                            mt-3 h-1.5 w-full overflow-hidden rounded-full
                            bg-zinc-200 dark:bg-white/10
                            "
                        >
                          {/* Progress Fill */}
                          <div
                            className="
                                h-full rounded-full
                                bg-gradient-to-r
                                from-violet-500 via-indigo-500 to-sky-500
                                transition-all duration-700 ease-out
                            "
                            style={{
                              width: hoveredIndex === index ? `${skill.level}%` : "0%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
      ),
    },
  ];
  
  const [selected, setSelected] = useState(TABS[0].id);
  const [direction, setDirection] = useState(0);
  const [indicator, setIndicator] = useState({ width: 0, left: 0 });

  const containerRef = useRef(null);
  const buttonRefs = useRef(new Map());

  useLayoutEffect(() => {
    const btn = buttonRefs.current.get(selected);
    const container = containerRef.current;
    if (!btn || !container) return;

    const btnRect = btn.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();

    setIndicator({
      width: btnRect.width,
      left: btnRect.left - contRect.left,
    });
  }, [selected]);

  const handleChange = (id) => {
    const oldIndex = TABS.findIndex(t => t.id === selected);
    const newIndex = TABS.findIndex(t => t.id === id);
    setDirection(newIndex > oldIndex ? 1 : -1);
    setSelected(id);
  };

  const activeTab = TABS.find(t => t.id === selected);

  return (
    <div className="flex flex-col gap-10">

      {/* TAB BAR */}
      <div
        ref={containerRef}
        className="
          relative mx-auto p-1.5
          rounded-2xl
          bg-white/40 dark:bg-neutral-900/60
          backdrop-blur-xl
          border border-white/20 w-[70%] 
          shadow-[0_20px_60px_-20px_rgba(139,92,246,0.6)]
        "
      >

        <motion.div
          animate={{
            width: indicator.width - 10,
            x: indicator.left + 5,
          }}
          className="
            absolute top-1.5 h-[calc(100%-12px)]
            rounded-xl
            bg-gradient-to-r from-violet-500 to-blue-500
            shadow-[0_10px_30px_rgba(139,92,246,0.8)] 
          "
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        />
        <div className="relative z-10 grid grid-cols-5 gap-1 ">
          {TABS.map(tab => {
            const active = selected === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) =>
                  el
                    ? buttonRefs.current.set(tab.id, el)
                    : buttonRefs.current.delete(tab.id)
                }
                onClick={() => handleChange(tab.id)}
                className={clsx(
                  "rounded-xl py-2.5 text-sm font-semibold transition-all",
                  active
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                )}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

      </div>

      {/* TAB CONTENT */}
      <div
        className="
          relative min-h-screen mx-auto w-[95%]
          rounded-3xl
          bg-white/50 dark:bg-neutral-900/70
          backdrop-blur-xl
          border border-white/20
          shadow-[0_30px_80px_-30px_rgba(139,92,246,0.5)]
          overflow-hidden
        "
      >
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={selected}
            custom={direction}
            initial={{ y: direction > 0 ? 40 : -40, opacity: 0, scale: 0.98, position: "absolute" }}
            animate={{ y: 0, opacity: 1, scale: 1, position: "absolute" }}
            exit={{ y: direction < 0 ? 40 : -40, opacity: 0, scale: 0.98, position: "absolute" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {activeTab.cardContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
