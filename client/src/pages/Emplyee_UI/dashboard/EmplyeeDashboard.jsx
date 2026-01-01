import React from "react";
import { motion } from "framer-motion";
import LinkActionButton from "../../../components/ui/button/LinkActionButton.jsx";
import SectionHeader from "../../../components/ui/SectionHeader.jsx";
import StepCard from "../../../components/ui/StepCard.jsx";
import {
  Home,
  Rocket,
  Building2,
  FolderGit2,
  Search,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import LogoMarquee from "../../../components/ui/LogoMarquee.jsx";
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
      initial={{ opacity: 0, y: -250, rotate: rotate - 15 }}
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
    hidden: { opacity: 0, y: 30, filter: "blur(20px)" },
    visible: (i) => ({
      opacity: 1,
      filter: "blur(0px)",
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
                           bg-clip-text text-transparent "
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
        className="mx-auto max-w-3xl text-base 
                   text-slate-800 dark:text-white/50
                   sm:text-lg md:text-xl mt-10"
      >
        The first recruitment platform where candidates prove their abilities
        through real project work. No more resume-only screening — showcase your
        talent through verified project submissions.
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
      <section className="mt-10 ">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-400/5 to-transparent" />

        <div
          className="relative flex pb-50 md:pb-40 min-h-screen items-center justify-center  
                    bg-white dark:bg-black 
                    transition-colors duration-500"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-pink-500/[0.04] to-blue-500/[0.04] dark:from-violet-500/[0.08] dark:via-pink-500/[0.08] dark:to-blue-500/[0.08]
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
          <div className="relative z-10 container mx-auto px-6 pt-30">
            <AnimatedTitle title1="Prove Your Skills," title2="Get Hired" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap justify-center gap-4 mt-12"
            >
              <LinkActionButton variant="outline" icon={Rocket} showArrow url="/competitions">
                  Get Started Compititons
              </LinkActionButton>
            </motion.div>
          </div>
         
        </div>
      </section>

      {/* Carusale */}
      <section className="">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(20px)" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          className="pt-12 mx-auto px-6 "
        >
          <p className="text-center text-md font-normal text-black/40  dark:text-amber-50/40 mb-6">
            Trusted by leading tech companies for skill-based hiring
          </p>
          <LogoMarquee />
        </motion.div>
      </section>

      <section className="h-screen w-full">
        {/* Provit.io */}
        <div className="relative w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(20px)" }}
            // animate={{y:0,filter:"blur(0px)"}}
            transition={{ duration: 0.4, delay: 0.6 }}
            whileInView={{ opacity: 0.3, y: 0, filter: "blur(0px)" }}
            className="bg-black opacity-30 dark:bg-gradient-to-r text-center font-bold dark:from-violet-500 dark:via-pink-400 dark:to-blue-500 dark: dark:opacity-30
                           bg-clip-text text-transparent text-[20rem] hidden md:block">
          ProveIt.io
          <motion.span
  initial={{ width: "50%",}}
  whileInView={{ width: "0%",}}
  viewport={{ once: true }}
  transition={{ duration: 1.2,delay:1.1, ease: "easeInOut" }}
  className="bg-white h-full absolute left-0"
/>
          <motion.span
  initial={{ width: "50%" }}
  whileInView={{ width: "0%" }}
  viewport={{ once: true }}
  transition={{ duration: 1.2,delay:1.1, ease: "easeInOut" }}
  className="bg-white h-full absolute right-0"
/>
          </motion.h1>
          <span
            className="
                absolute  inset-0
                bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.5)_20%,rgba(255,255,255,0.95)_70%)]
                dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_20%,rgba(0,0,0,0.95)_70%)]">
                
          </span>
        </div>
        

        <div className="container mx-auto mt-10 px-6 relative z-10">
          <SectionHeader
            badge="How It Works"
            title="Simple 4-Step Process"
            subtitle="From job posting to verified hire in a streamlined workflow"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            <StepCard
              step={1}
              icon={Building2}
              title="Company Posts Job"
              description="Companies create job roles with required skills and project-based challenges or problem statements."
              delay={0}
            />
            <StepCard
              step={2}
              icon={FolderGit2}
              title="Candidates Submit Work"
              description="Candidates apply by submitting verified projects — GitHub repos, source files, or live demos."
              delay={0.1}
            />
            <StepCard
              step={3}
              icon={Search}
              title="Admin Evaluates"
              description="Our admin team reviews submissions, runs plagiarism checks, and ranks candidates based on work quality."
              delay={0.2}
            />
            <StepCard
              step={4}
              icon={UserCheck}
              title="Verified Hire"
              description="Shortlisted candidates proceed to interviews, leading to merit-based, transparent hiring."
              delay={0.3}
            />
          </div>

          {/* Connector lines for desktop */}
          <div className="hidden lg:flex justify-center mt-8">
            <div className="w-3/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />
          </div>
        </div>

      </section>

      <section className="py-24 -mt-24 relative"></section>
    </>
  );
}
