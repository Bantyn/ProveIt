import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const DEFAULT_COLORS = [
    "from-cyan-400 to-blue-500",
  "from-blue-400 to-indigo-500",
];

const ScreenLoader = ({
  bars = 7,
  maxHeight = 80,
  colors = DEFAULT_COLORS,
  fullscreen = true,
}) => {
  const [heights, setHeights] = useState(Array(bars).fill(0));
  const [droplets, setDroplets] = useState(Array(bars).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.now() * 0.001;

      setHeights((prev) =>
        prev.map((_, index) => {
          const delay = index * 0.8;

          const primary = Math.sin(time + delay);
          const bounce = Math.sin(time * 4 + delay) * 0.15;
          const ripple = Math.sin(time * 8 + delay) * 0.05;

          return maxHeight * (primary + bounce + ripple);
        })
      );

      setDroplets((prev) =>
        prev.map((_, index) => {
          const delay = index * 0.8;
          return Math.sin(time + delay) > 0.8;
        })
      );
    }, 32);

    return () => clearInterval(interval);
  }, [bars, maxHeight]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
     className={`flex items-center justify-center backdrop-blur-[2px] select-none ${
  fullscreen
    ? "fixed inset-0 z-50 bg-black/10 dark:bg-white/6"
    : ""
}`}
    >
      <div className="flex items-end space-x-4 p-8 md:scale-25 scale-20 sm:scale-22">
        {heights.map((height, index) => {
          const color = colors[index % colors.length];

          return (
            <div key={index} className="relative flex flex-col items-center">
              {/* Top Droplet */}
              <div
                className={`w-4 h-4 rounded-full bg-gradient-to-r ${color} mb-3`}
                style={{
                  opacity: droplets[index] ? 1 : 0,
                  transform: droplets[index]
                    ? `translateY(${Math.sin(Date.now() * 0.008 + index) * 3}px) scale(1)`
                    : "translateY(10px) scale(0.5)",
                }}
              />

              {/* Liquid Bar */}
              <div
                className={`w-10 rounded-full bg-gradient-to-t ${color} relative overflow-hidden shadow-lg`}
                style={{
                  height: `${Math.abs(height)}px`,
                  transform: height < 0 ? "scaleY(-1)" : "scaleY(1)",
                  transformOrigin: "bottom",
                }}
              >
                {/* Shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              {/* Base Droplet */}
              <div
                className={`w-3 h-3 mt-2 rounded-full bg-gradient-to-r ${color}`}
                style={{
                  opacity:
                    Math.sin(Date.now() * 0.003 + index) * 0.4 + 0.6,
                  transform: `scale(${
                    0.6 + Math.sin(Date.now() * 0.002 + index) * 0.4
                  })`,
                }}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ScreenLoader;
