import { motion } from "framer-motion";

const logos = [
  "ProveIt.io",
  "TechFlow",
  "DataDrive",
  "CloudSync",
  "InnovateTech",
  "NextGen",
  "FutureLab",
  "QuantumAI",
];

export const LogoMarquee = () => {
  return (
    <div className="relative overflow-hidden py-12 ">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r dark:from-black dark:to-transparent from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l dark:from-black dark:to-transparent from-white to-transparent z-10" />

      <div className="flex animate-marquee">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.07 }}
            className="flex-shrink-0 mx-12 flex items-center justify-center"
          >
            <span className="text-2xl md:text-4xl font-bold font-display text-black/30 dark:text-white/30 transition-colors hover:text-black  dark:hover:text-white duration-500">
              {logo}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;