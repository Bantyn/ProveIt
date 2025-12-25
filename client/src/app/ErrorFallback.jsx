import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ---------------- VARIANTS ---------------- */

const container = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96],
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const floating = {
  animate: {
    y: [-10, 10],
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function ErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-6">
      <AnimatePresence>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* 404 */}
          <motion.h1
            variants={item}
            className="text-[96px] font-bold text-[#222] dark:text-red-800 opacity-70 select-none"
          >
            Oops !
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl text-[#222] dark:text-white/40 opacity-50 mt-4"
          >
            Something went wrong on this page
          </motion.p>

          {/* Ghost */}
          <motion.img
            variants={floating}
            animate="animate"   
            src="https://xubohuah.github.io/xubohua.top/Group.png"
            alt="Ghost"
            className="w-24 mx-auto my-8 select-none"
            draggable="false"
          />

          {/* Actions */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 justify-center"
          >
            
            <FlowButton text="Go Home" onClick={() => (window.location.href = "/")} />
            <FlowButton text="Go Back" onClick={() => window.history.back()} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- FLOW BUTTON ---------------- */

function FlowButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-1 overflow-hidden rounded-full
        border border-[#555]/40 px-7 py-3 text-sm font-semibold text-[#555]
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:border-transparent hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white "
    >
      {/* Left Arrow */}
      <ArrowRight className="absolute left-[-30%] w-4 h-4 group-hover:left-4 transition-all duration-700" />

      {/* Text */}
      <span className="relative z-10 -translate-x-3 group-hover:translate-x-3 transition-all duration-700">
        {text}
      </span>

      {/* Expanding circle */}
      <span className="absolute inset-0 w-full h-full bg-black/80 dark:bg-white/80 rounded-full opacity-0
        group-hover:w-[200px] group-hover:h-[200px] group-hover:opacity-100
        transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />

      {/* Right Arrow */}
      <ArrowRight className="absolute right-4 w-4 h-4 group-hover:right-[-30%] transition-all duration-700" />
    </button>
  );
}
