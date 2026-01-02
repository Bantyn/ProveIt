"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  Github,
  Youtube,
  Video,
  CheckCircle,
  PenTool,
  Code2,
  Palette,
  Sparkles,
  Target,
  User,
  GraduationCap,
  FileText,
  Star, School,
  Calendar,
  BookOpen,
  Award,
  UploadCloud, 
  Download
} from "lucide-react";

const Meta = ({ label, value }) => (
  <div className="flex justify-between gap-4 border-b border-neutral-200 dark:border-white/10 pb-2">
    <span className="text-neutral-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);



/* -------------------------------------------
   ICON MAP FOR TABS
------------------------------------------- */
const TAB_ICONS = {
  basic: User,
  education: GraduationCap,
  skills: Star,
  resume: FileText,
  Expertice: Target,
};

export default function ProfileSmoothTabs({ user }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  /* -------------------------------------------
     Education DATA
  ------------------------------------------- */
  const EDUCATION_DATA = [
  {
    id: "college",
    label: "Institution",
    value: user.education?.college || "Recognized Higher Education Institute",
    description:
      "Completed formal education with focus on applied learning and analytical problem solving.",
    icon: School,
    color: "text-violet-500",
  },
  {
    id: "degree",
    label: "Degree",
    value:
      user.education?.degree || "Bachelor’s Degree / Professional Program",
    description:
      "Specialized in core computer science concepts, modern development, and industry-aligned coursework.",
    icon: GraduationCap,
    color: "text-blue-500",
  },
  {
    id: "focus",
    label: "Focus Area",
    value: "Computer Science, Web & UI Engineering",
    description:
      "Strong foundation in frontend systems, UI architecture, and modern frameworks.",
    icon: BookOpen,
    color: "text-emerald-500",
  },
  {
    id: "year",
    label: "Graduation Year",
    value: user.education?.graduationYear || "2024",
    description:
      "Academic journey completed with continued learning and professional growth.",
    icon: Calendar,
    color: "text-orange-500",
  },
  {
    id: "highlights",
    label: "Highlights",
    value: [
      "Built academic & personal projects",
      "Strong focus on UI, UX & performance",
      "Continuous self-learning mindset",
    ],
    icon: Award,
    color: "text-pink-500",
  },
  ];

  /* -------------------------------------------
     SKILLS DATA
  ------------------------------------------- */
  const skills = [
    { name: "Design", level: 95, icon: PenTool },
    { name: "Development", level: 90, icon: Code2 },
    { name: "Branding", level: 85, icon: Palette },
    { name: "Motion", level: 78, icon: Sparkles },
    { name: "Strategy", level: 82, icon: Target },
  ];

   /* -------------------------------------------
     Resume DATA
  ------------------------------------------- */
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(user.resumeUrl || "");

  // Demo upload handler (mock API)
  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");

    // Fake API delay
    await new Promise((res) => setTimeout(res, 1000));

    // Mock resume URL
    const demoUrl = URL.createObjectURL(file);
    setResumeUrl(demoUrl);

    alert("Resume uploaded (demo)!");
  };

  // Demo download handler
  const handleDownload = () => {
    if (!resumeUrl) return;
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = `${user.fullName}_resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  /* -------------------------------------------
     TABS
  ------------------------------------------- */
  const TABS = [
    {
      id: "basic",
      title: "Basic Info",
      cardContent: (
        <section className="relative w-full px-6 md:px-14 py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
            {/* LEFT — IDENTITY COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 space-y-10"
            >
              {/* Avatar + Status */}
              <div className="flex items-center gap-5">
                <img
                  src={`https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=${user.fullName}`}
                  alt={user.fullName}
                  className="
                      w-20 h-20 rounded-xl
                      border border-neutral-300 dark:border-white/10
                      bg-neutral-100 dark:bg-neutral-900
                    "
                />

                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Identity
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <h2 className="text-4xl font-semibold dark:text-neutral-100">
                      {user.fullName}
                    </h2>
                    {user.isVerified && (
                      <CheckCircle className="w-7 h-full text-blue-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {user.bio}
              </p>

              {/* Meta */}
              <div className="space-y-10 text-cm dark:text-neutral-100">
                <Meta label="Email" value={user.email} />
                <Meta label="Phone" value={user.phone || "—"} />
                <Meta label="Plan" value={user.subscriptionPlan} />
              </div>
            </motion.div>

            {/* RIGHT — CONTENT / STORY */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-8 space-y-12"
            >
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl dark:text-neutral-100 font-medium leading-tight">
                Building digital experiences with
                <span className="block text-neutral-500 dark:text-neutral-400">
                  clarity, motion & intent.
                </span>
              </h1>

              {/* Description block */}
              <div
                className="
                    relative pl-6
                    border-l border-neutral-300 dark:border-white/10
                    text-xl leading-relaxed
                    text-neutral-700 dark:text-neutral-300
                  "
              >
                {user.description}
              </div>

              {/* Actions */}
              <div className="flex justify-center md:gap-20 gap-7 pt-4">
                {[
                  { label: "GitHub", icon: Github },
                  { label: "YouTube", icon: Youtube },
                  { label: "Intro", icon: Video },
                ].map(({ label, icon: Icon }) => (
                  <motion.button
                    key={label}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    className="
                        hover:scale-105
                        flex items-center gap-2
                        px-4 py-2 rounded-lg
                        border border-neutral-300 dark:border-white/10
                        text-sm font-medium dark:text-neutral-100
                        hover:bg-neutral-100 dark:hover:bg-white/5
                        transition
                      "
                  >
                    <Icon size={16} />
                    {label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ),
    },
    {
      id: "education",
      title: "Education",
      cardContent: (
        <section className="relative w-full text-neutral-900 dark:text-neutral-100">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 mt-10"
          >
            <h2 className="text-4xl md:text-5xl font-semibold">Education</h2>
            <p className="mt-3 text-base md:text-lg text-neutral-600 dark:text-neutral-400">
              Academic background and foundational learning journey
            </p>
          </motion.div>

          {/* Content */}
          <div className="w-full px-30 mx-auto space-y-14">
            {EDUCATION_DATA.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="flex gap-6"
                >
                  <div className="flex items-center justify-center w-14 h-14 hover:rotate-3 hover:scale-105 hover:-translate-y-1 transition-all duration-300 rounded-xl bg-neutral-900/5 dark:bg-white/10">
                    <Icon className={item.color} size={22} />
                  </div>

                  <div className=" hover:translate-x-5 transition-all duration-300">
                    <p className="text-xs uppercase tracking-widest opacity-50">
                      {item.label}
                    </p>

                    {/* Value */}
                    {Array.isArray(item.value) ? (
                      <ul className="mt-2 space-y-1 text-neutral-700 dark:text-neutral-300">
                        {item.value.map((point, i) => (
                          <li key={i}>• {point}</li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        <p className="text-xl font-medium mt-1">{item.value}</p>
                        {item.description && (
                          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                            {item.description}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      ),
    },
    {
      id: "Expertice",
      title: "Expertise",
      cardContent: (
        <section className="md:px-24 px-10 py-12 space-y-15">
           <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-start mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-semibold dark:text-amber-50 text-neutral-900">
          Expertise
        </h2>
        <p className="mt-3 text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mx-auto">
          Areas where I excel and bring the most impact. Combining creativity, coding, and strategy to deliver modern solutions.
        </p>
      </motion.div>
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="border-b pb-8"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-xl dark:text-neutral-100">
                    <Icon className="text-violet-500 " />
                    {skill.name}
                  </div>
                  <span className="text-sm dark:text-neutral-400">
                    {skill.level}%
                  </span>
                </div>

                <div className="mt-3 h-2 rounded-full bg-zinc-500 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 transition-all duration-700"
                    style={{
                      width: hoveredIndex === index ? `${skill.level}%` : "0%",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </section>
      ),
    },
  ];

  /* -------------------------------------------
     TAB LOGIC
  ------------------------------------------- */
  const [selected, setSelected] = useState(TABS[0].id);
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

  return (
    <div className="flex flex-col gap-10">

      {/* TAB BAR */}
      <div
        ref={containerRef}
        className="relative mx-auto p-1.5 rounded-2xl bg-violet-100 dark:bg-neutral-900  md:w-[70%] w-[90%]"
      >
        <motion.div
          animate={{ width: indicator.width - 10, x: indicator.left + 5 }}
          className="absolute top-1.5 h-[calc(100%-12px)] rounded-xl bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400"
        />

        <div className="relative z-10 grid grid-cols-3 gap-1">
          {TABS.map(tab => {
            const Icon = TAB_ICONS[tab.id];
            const active = selected === tab.id;

            return (
              <button
                key={tab.id}
                ref={el =>
                  el
                    ? buttonRefs.current.set(tab.id, el)
                    : buttonRefs.current.delete(tab.id)
                }
                onClick={() => setSelected(tab.id)}
                className={clsx(
                  "rounded-xl py-2.5 font-semibold flex items-center justify-center gap-2",
                  active ? "text-white" : "text-neutral-500"
                )}
              >
                {/* Mobile Icon */}
                <span className="md:hidden">
                  <Icon size={18} />
                </span>

                {/* Desktop Text */}
                <span className="hidden md:inline">{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT */}
      <div className="x-none-scrollBar relative overflow-hidden min-h-screen overflow-y-scroll mx-auto w-[95%] rounded-3xl dark:bg-neutral-900 bg-violet-100/70 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="absolute inset-0"
          >
            {TABS.find(t => t.id === selected)?.cardContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
