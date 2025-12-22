import React from "react";
import { motion } from "framer-motion";

/* ----------------------------------------
   Utility: className merge
---------------------------------------- */
const cx = (...classes) => classes.filter(Boolean).join(" ");

/* ----------------------------------------
   Reusable Shape Component
---------------------------------------- */
const ElegantShape = ({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  borderRadius = 16,
}) => {
  return (
    <motion.div
      className={cx("absolute", className)}
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
    >
      <motion.div
        className="relative"
        style={{ width, height }}
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className={cx(
            "absolute inset-0",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[1px]",
            "ring-1 ring-black/[0.04] dark:ring-white/[0.05]",
            "shadow-[0_2px_16px_-2px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_16px_-2px_rgba(255,255,255,0.06)]",
            "after:absolute after:inset-0",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]",
            "after:rounded-[inherit]"
          )}
          style={{ borderRadius }}
        />
      </motion.div>
    </motion.div>
  );
};

/* ----------------------------------------
   Reusable Animated Title
---------------------------------------- */
const AnimatedTitle = ({ title1, title2 }) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="text-center">
      <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-8xl">
          <span className="bg-gradient-to-b from-black to-black/80 
                           dark:from-white dark:to-white/80 
                           bg-clip-text text-transparent">
            {title1}
          </span>
          <br />
          <span className="bg-gradient-to-r 
                           from-indigo-400 via-black/90 to-rose-400
                           dark:from-indigo-300 dark:via-white/90 dark:to-rose-300
                           bg-clip-text text-transparent">
            {title2}
          </span>
        </h1>
      </motion.div>

      <motion.p
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeUp}
        className="mx-auto max-w-xl text-base 
                   text-black/40 dark:text-white/40
                   sm:text-lg md:text-xl"
      >
        Employee Dashboard built with Tailwind & Motion.
      </motion.p>
    </div>
  );
};

/* ----------------------------------------
   Employee Dashboard (Main)
---------------------------------------- */
export default function EmployeeDashboard() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden 
                    bg-white dark:bg-black 
                    transition-colors duration-500">

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br 
                      from-indigo-500/[0.04] via-transparent to-rose-500/[0.04]
                      dark:from-indigo-500/[0.08] dark:to-rose-500/[0.08]
                      blur-3xl" />

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          className="top-[-10%] left-[-15%]"
          gradient="from-indigo-500/[0.25] dark:from-indigo-500/[0.35]"
          width={300}
          height={500}
          rotate={-8}
          borderRadius={24}
          delay={0.3}
        />

        <ElegantShape
          className="right-[-20%] bottom-[-5%]"
          gradient="from-rose-500/[0.25] dark:from-rose-500/[0.35]"
          width={600}
          height={200}
          rotate={15}
          borderRadius={20}
          delay={0.5}
        />

        <ElegantShape
          className="top-[40%] left-[-5%]"
          gradient="from-violet-500/[0.25] dark:from-violet-500/[0.35]"
          width={300}
          height={300}
          rotate={24}
          borderRadius={32}
          delay={0.4}
        />

        <ElegantShape
          className="top-[5%] right-[10%]"
          gradient="from-amber-500/[0.25] dark:from-amber-500/[0.35]"
          width={250}
          height={100}
          rotate={-20}
          borderRadius={12}
          delay={0.6}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <AnimatedTitle
          title1="Welcome to"
          title2="Employee Dashboard"
        />
      </div>

      {/* Fade overlay */}
      <div className="pointer-events-none absolute inset-0 
                      bg-gradient-to-t 
                      from-white via-transparent to-white/80
                      dark:from-black dark:via-transparent dark:to-black/80" />
    </div>
  );
}
