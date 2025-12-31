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
      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
      >
        <h1 className="mb-6 text-6xl font-bold tracking-tight sm:text-7xl md:text-9xl">
          <span
            className="bg-gradient-to-b from-neutral-900 to-slate-700 
                           dark:from-white dark:to-white/80 
                           bg-clip-text text-transparent "
          >
            {title1}
          </span>
          <br />
          <span
            className="bg-gradient-to-r 
                           from-violet-400 via-pink-400 to-blue-400
                           dark:from-violet-400 dark:via-pink-400 dark:to-blue-400
                           bg-clip-text text-transparent"
          >
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
                   text-slate-700 dark:text-white/80
                   sm:text-lg md:text-xl"
      >
        "Where technology meets exceptional client experience."
      </motion.p>
    </div>
  );
};

/* ----------------------------------------
   Employee Dashboard (Main)
---------------------------------------- */
export default function EmployeeDashboard() {
  return (
    <>
      {/* Main Hero */}
      <section>
        <div
          className="relative flex pb-50 md:pb-40 min-h-screen items-center justify-center  
                    bg-slate-50 dark:bg-neutral-900 
                    transition-colors duration-500"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 bg-gradient-to-br 
                      from-violet-500/[0.04] via-pink-500/[0.04] to-blue-500/[0.04]
                      dark:from-violet-500/[0.08] dark:via-pink-500/[0.08] dark:to-blue-500/[0.08]
                      blur-3xl"
          />

          {/* Floating Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <ElegantShape
              className="top-[-10%] left-[-15%]"
              gradient="from-violet-500/[0.25] dark:from-violet-500/[0.35]"
              width={300}
              height={500}
              rotate={-8}
              borderRadius={24}
              delay={0.3}
            />

            <ElegantShape
              className="right-[-20%] bottom-[-5%]"
              gradient="from-pink-500/[0.25] dark:from-pink-500/[0.35]"
              width={600}
              height={200}
              rotate={15}
              borderRadius={20}
              delay={0.5}
            />

            <ElegantShape
              className="top-[40%] left-[-5%]"
              gradient="from-blue-500/[0.25] dark:from-blue-500/[0.35]"
              width={300}
              height={300}
              rotate={24}
              borderRadius={32}
              delay={0.4}
            />

            <ElegantShape
              className="top-[5%] right-[10%]"
              gradient="from-violet-500/[0.25] dark:from-violet-500/[0.35]"
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
              title2="Your Digital Experience"
            />
          </div>
          {/* Fade overlay */}
          <div
            className="pointer-events-none absolute inset-0 
                      bg-gradient-to-t 
                      from-slate-50 via-transparent to-slate-50/80
                      dark:from-neutral-900 dark:via-transparent dark:to-neutral-900/80"
          />
        </div>
      </section>
      {/* Carusale */}
      <section>
      </section>
    </>
  );
}
