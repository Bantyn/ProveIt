import { motion } from "framer-motion";

const STEP_THEMES = {
  1: {
    blob1: "bg-violet-400/25 dark:bg-violet-500/15",
    blob2: "bg-fuchsia-400/25 dark:bg-fuchsia-500/15",
    blob3: "bg-indigo-400/25 dark:bg-indigo-500/15",
    energy: 1,
  },
  2: {
    blob1: "bg-cyan-400/25 dark:bg-cyan-500/15",
    blob2: "bg-sky-400/25 dark:bg-sky-500/15",
    blob3: "bg-blue-400/25 dark:bg-blue-500/15",
    energy: 1.2,
  },
  3: {
    blob1: "bg-emerald-400/25 dark:bg-emerald-500/15",
    blob2: "bg-green-400/25 dark:bg-green-500/15",
    blob3: "bg-teal-400/25 dark:bg-teal-500/15",
    energy: 0.8,
  },
};

const AuroraBlob = ({ className, animate, duration }) => (
  <motion.div
    className={className}
    animate={animate}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const AuroraBackground = ({ step = 1, children }) => {
  const theme = STEP_THEMES[step] || STEP_THEMES[1];

  return (
    <div className="relative min-h-screen">
      {/* 🌌 Aurora Layer */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <AuroraBlob
          duration={22 / theme.energy}
          className={`absolute w-[900px] h-[900px] rounded-full blur-[140px] ${theme.blob1} -top-64 -left-64`}
          animate={{
            x: [0, 80 * theme.energy, -60 * theme.energy, 0],
            y: [0, -40 * theme.energy, 60 * theme.energy, 0],
          }}
        />

        <AuroraBlob
          duration={26 / theme.energy}
          className={`absolute w-[700px] h-[700px] rounded-full blur-[130px] ${theme.blob2} -bottom-64 -right-64`}
          animate={{
            x: [0, -70 * theme.energy, 50 * theme.energy, 0],
            y: [0, 60 * theme.energy, -40 * theme.energy, 0],
          }}
        />

        <AuroraBlob
          duration={30 / theme.energy}
          className={`absolute w-[600px] h-[600px] rounded-full blur-[120px] ${theme.blob3} top-1/3 left-1/3`}
          animate={{
            x: [0, 50 * theme.energy, -50 * theme.energy, 0],
            y: [0, -50 * theme.energy, 50 * theme.energy, 0],
          }}
        />

        {/* subtle grain */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-15" />
      </div>

      {/* 🧩 Page Content */}
      {children}
    </div>
  );
};

export default AuroraBackground;
