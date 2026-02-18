import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const RightSectionLottie = ({ theme }) => {
  const reduceMotion = useReducedMotion();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
   //fetch("/lottie/code-dark.json")
   fetch("/lottie/code-arena.json")
    //fetch("https://assets9.lottiefiles.com/private_files/lf30_obidsi0t.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading Lottie:", error));
  }, []);

  if (reduceMotion || !animationData) return null;

  const isDark = theme === "dark";

  return (
    <div className="relative w-full h-[520px] lg:h-[560px] flex items-center justify-center overflow-visible">
      {/* Deep Background Glow */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.02, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: isDark
            ? "radial-gradient(ellipse 100% 80% at center, rgba(14, 165, 233, 0.3) 0%, rgba(168, 85, 247, 0.15) 35%, rgba(244, 114, 182, 0.08) 60%, transparent 80%)"
            : "radial-gradient(ellipse 100% 80% at center, rgba(6, 182, 212, 0.22) 0%, rgba(139, 92, 246, 0.12) 35%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Extra Premium Glow */}
      <div
        className="absolute w-[80%] h-[80%] rounded-full z-0"
        style={{
          boxShadow: isDark
            ? "0 0 80px rgba(14,165,233,0.25)"
            : "0 0 70px rgba(139,92,246,0.2)",
        }}
      />

      {/* Outer SVG Ring - Smooth Gradient */}
      <motion.svg
        viewBox="0 0 600 600"
        className="absolute w-[85%] h-[85%] z-0 pointer-events-none"
        style={{ willChange: "transform" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <radialGradient id="outerRing" r="50%">
            <stop offset="0%" stopColor={isDark ? "#22D3EE" : "#06B6D4"} stopOpacity="0.6" />
            <stop offset="70%" stopColor={isDark ? "#6366F1" : "#8B5CF6"} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          cx="300"
          cy="300"
          r="240"
          fill="none"
          stroke="url(#outerRing)"
          strokeWidth="1.5"
        />
      </motion.svg>

      {/* Inner SVG Ring - Opposite Direction */}
      <motion.svg
        viewBox="0 0 600 600"
        className="absolute w-[70%] h-[70%] z-0 pointer-events-none"
        style={{ willChange: "transform" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <radialGradient id="innerRing" r="50%">
            <stop offset="0%" stopColor={isDark ? "#F472B6" : "#EC4899"} stopOpacity="0.5" />
            <stop offset="70%" stopColor={isDark ? "#A855F7" : "#8B5CF6"} stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          cx="300"
          cy="300"
          r="190"
          fill="none"
          stroke="url(#innerRing)"
          strokeWidth="1.2"
        />
      </motion.svg>

      {/* Pulsing Energy Ring */}
      <motion.div
        className="absolute w-[75%] h-[75%] rounded-full z-0"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "transparent",
          boxShadow: isDark
            ? "0 0 60px rgba(14, 165, 233, 0.2), inset 0 0 60px rgba(168, 85, 247, 0.1)"
            : "0 0 50px rgba(6, 182, 212, 0.15), inset 0 0 50px rgba(139, 92, 246, 0.08)",
        }}
      />

      {/* Floating Orbs - Premium */}
      {[
        { top: "12%", right: "18%", size: "w-28 h-28", color: "#0EA5E9", delay: 0, duration: 8 },
        { bottom: "15%", left: "12%", size: "w-36 h-36", color: "#A855F7", delay: 0.5, duration: 10 },
        { top: "45%", left: "8%", size: "w-20 h-20", color: "#22D3EE", delay: 1, duration: 7 },
        { top: "20%", left: "25%", size: "w-16 h-16", color: "#F472B6", delay: 1.5, duration: 9 },
        { bottom: "25%", right: "15%", size: "w-24 h-24", color: "#818CF8", delay: 2, duration: 8 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.size} rounded-full z-0`}
          style={{
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            background: `radial-gradient(circle, ${orb.color}${isDark ? "40" : "30"} 0%, transparent 70%)`,
            filter: "blur(25px)",
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Sparkle Particles - More */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full z-0"
          style={{
            width: `${3 + (i % 3) * 2}px`,
            height: `${3 + (i % 3) * 2}px`,
            top: `${10 + (i * 7) % 80}%`,
            left: `${8 + (i * 11) % 84}%`,
            background: isDark
              ? `rgba(${14 + (i % 3) * 30}, ${165 + (i % 4) * 20}, 233, 0.85)`
              : `rgba(${6 + (i % 3) * 20}, ${182 - (i % 4) * 10}, 212, 0.75)`,
            boxShadow: isDark
              ? `0 0 ${8 + (i % 3) * 4}px rgba(14, 165, 233, 0.9)`
              : `0 0 ${6 + (i % 3) * 3}px rgba(6, 182, 212, 0.85)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1.5, 0.3],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2 + (i % 4) * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Floating Code Symbols */}
      {["</>", "{}", "()"].map((symbol, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute z-0 font-mono font-bold pointer-events-none select-none"
          style={{
            top: `${25 + i * 25}%`,
            right: `${5 + i * 8}%`,
            fontSize: `${14 + i * 2}px`,
            color: isDark ? "rgba(14, 165, 233, 0.4)" : "rgba(6, 182, 212, 0.35)",
            textShadow: isDark
              ? "0 0 10px rgba(14, 165, 233, 0.6)"
              : "0 0 8px rgba(6, 182, 212, 0.5)",
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.2, 0.5, 0.2],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Main Lottie Container */}
      <motion.div
        className="relative z-10 w-[90%] h-[90%]"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.01, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          className="w-full h-full"
          style={{
            filter: isDark
              ? "drop-shadow(0 0 40px rgba(14, 165, 233, 0.5)) drop-shadow(0 0 80px rgba(168, 85, 247, 0.25))"
              : "drop-shadow(0 0 30px rgba(6, 182, 212, 0.45)) drop-shadow(0 0 60px rgba(139, 92, 246, 0.2))",
          }}
        />
      </motion.div>

      {/* Gradient Overlay - Top Fade */}
      <div
        className="absolute top-0 left-0 right-0 h-20 z-20 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(17, 24, 39, 0.5) 0%, transparent 100%)"
            : "linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, transparent 100%)",
        }}
      />
    </div>
  );
};

const RightSectionWithLottie = ({ theme, fadeInUp, children }) => {
  return (
    <motion.div
      className="lg:col-span-6 relative flex items-center justify-center"
      variants={fadeInUp}
    >
      <RightSectionLottie theme={theme} />
      <div className="relative z-30">{children}</div>
    </motion.div>
  );
};

export default RightSectionWithLottie;






// import { motion, useReducedMotion } from "framer-motion";
// import { useState, useMemo } from "react";
// import Lottie from "lottie-react";

// // 1. STATIC IMPORT: Replace the fetch logic with a direct import for instant loading
// // Ensure the path matches your project structure
// import codeArenaData from "/public/lottie/code-arena.json"; 

// const RightSectionLottie = ({ theme }) => {
//   const reduceMotion = useReducedMotion();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const isDark = theme === "dark";

//   // 2. ORB DATA: Memoized to prevent re-calculation on every render
//   const floatingOrbs = useMemo(() => [
//     { top: "12%", right: "18%", size: "w-28 h-28", color: "#0EA5E9", delay: 0, duration: 8 },
//     { bottom: "15%", left: "12%", size: "w-36 h-36", color: "#A855F7", delay: 0.5, duration: 10 },
//     { top: "45%", left: "8%", size: "w-20 h-20", color: "#22D3EE", delay: 1, duration: 7 },
//     { top: "20%", left: "25%", size: "w-16 h-16", color: "#F472B6", delay: 1.5, duration: 9 },
//     { bottom: "25%", right: "15%", size: "w-24 h-24", color: "#818CF8", delay: 2, duration: 8 },
//   ], []);

//   if (reduceMotion) return null;

//   return (
//     <div className="relative w-full h-[520px] lg:h-[560px] flex items-center justify-center overflow-visible">
//       {/* Deep Background Glow - Renders Immediately */}
//       <motion.div
//         className="absolute inset-0 z-0"
//         animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.02, 1] }}
//         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//         style={{
//           background: isDark
//             ? "radial-gradient(ellipse 100% 80% at center, rgba(14, 165, 233, 0.3) 0%, rgba(168, 85, 247, 0.15) 35%, transparent 80%)"
//             : "radial-gradient(ellipse 100% 80% at center, rgba(6, 182, 212, 0.22) 0%, rgba(139, 92, 246, 0.12) 35%, transparent 70%)",
//           filter: "blur(100px)",
//           willChange: "transform, opacity"
//         }}
//       />

//       {/* 3. LOADING SKELETON: Pulses while Lottie hydrates */}
//       {!isLoaded && (
//         <motion.div 
//           className="absolute z-20 w-48 h-48 rounded-full blur-3xl"
//           animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
//           transition={{ duration: 2, repeat: Infinity }}
//           style={{ background: isDark ? "#0EA5E9" : "#8B5CF6" }}
//         />
//       )}

//       {/* Rotating SVG Rings */}
//       <motion.svg
//         viewBox="0 0 600 600"
//         className="absolute w-[85%] h-[85%] z-0 pointer-events-none opacity-40"
//         animate={{ rotate: 360 }}
//         transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
//       >
//         <circle cx="300" cy="300" r="240" fill="none" stroke={isDark ? "#22D3EE" : "#06B6D4"} strokeWidth="1" strokeDasharray="4 4" />
//       </motion.svg>

//       {/* Floating Orbs */}
//       {floatingOrbs.map((orb, i) => (
//         <motion.div
//           key={i}
//           className={`absolute ${orb.size} rounded-full z-0`}
//           style={{
//             top: orb.top, bottom: orb.bottom, left: orb.left, right: orb.right,
//             background: `radial-gradient(circle, ${orb.color}${isDark ? "40" : "30"} 0%, transparent 70%)`,
//             filter: "blur(25px)",
//           }}
//           animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
//           transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
//         />
//       ))}

//       {/* 4. MAIN LOTTIE CONTAINER with Fade-in Transition */}
//       <motion.div
//         className="relative z-10 w-[90%] h-[90%]"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         <Lottie
//           animationData={codeArenaData}
//           loop={true}
//           autoplay={true}
//           onDOMLoaded={() => setIsLoaded(true)} // Triggers the end of skeleton state
//           className="w-full h-full"
//           style={{
//             filter: isDark
//               ? "drop-shadow(0 0 40px rgba(14, 165, 233, 0.4))"
//               : "drop-shadow(0 0 30px rgba(6, 182, 212, 0.3))",
//           }}
//         />
//       </motion.div>
//     </div>
//   );
// };

// const RightSectionWithLottie = ({ theme, fadeInUp, children }) => {
//   return (
//     <motion.div
//       className="lg:col-span-6 relative flex items-center justify-center"
//       variants={fadeInUp}
//     >
//       <RightSectionLottie theme={theme} />
//       <div className="relative z-30 w-full">{children}</div>
//     </motion.div>
//   );
// };

// export default RightSectionWithLottie;