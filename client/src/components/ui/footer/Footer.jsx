"use client";
import { Github, Linkedin, Twitter } from "lucide-react";
import React, { useRef } from "react";
import { Particles } from "./Partical";
import SocialIcons from "./SocialIcons";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";
import clsx from "clsx";
import { Link } from "react-router-dom";
/* ---------------------------------------
   Footer with Infinite Grid Background
---------------------------------------- */

export default function Footer() {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  /* Infinite grid movement */
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  useAnimationFrame(() => {
    offsetX.set((offsetX.get() + 0.3) % 40);
    offsetY.set((offsetY.get() + 0.3) % 40);
  });

  const maskImage = useMotionTemplate`
    radial-gradient(220px circle at ${mouseX}px ${mouseY}px, black, transparent)
  `;

  return (
    <>
      <footer
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={clsx(
          " relative bg-background overflow-hidden",
          "h-[50vh] flex flex-col justify-center items-center px-6"
        )}
      >
        <Particles
          className="absolute overflow-hidden h-full w-screen" // make it cover the container
          quantity={150} // number of particles
          size={0.8} // particle size
          color="#ff66ff" // particle color
          staticity={20} // magnetism strength
          ease={10} // movement ease
        />
        {/* Grid base */}
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]">
          <GridPattern offsetX={offsetX} offsetY={offsetY} />
        </div>

        {/* Hover reveal grid */}
        <motion.div
          className="absolute inset-0 opacity-100 dark:opacity-100"
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          <GridPattern offsetX={offsetX} offsetY={offsetY} />
        </motion.div>

        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Orange glow */}
          <div
            className="
    absolute right-[-20%] top-[-30%]
    w-[40%] h-[40%] rounded-full
    bg-orange-400/30 dark:bg-orange-500/20
    blur-[120px]
  "
          />

          {/* Blue glow */}
          <div
            className="
    absolute left-[-15%] bottom-[-30%]
    w-[40%] h-[40%] rounded-full
    bg-blue-400/30 dark:bg-blue-600/20
    blur-[120px]
  "
          />
        </div>
          
        {/* Footer content */}
        <div className="relative z-10 w-full flex justify-around flex-col-reverse md:flex-row items-center text-center space-y-6">
          
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight dark:text-white text-black">
              Build trust. Prove authenticity. Grow with confidence.
            </h3>

            <p className="text-muted-foreground dark:text-white/20 mt-2 text-black/60 max-w-xl mx-auto">
              ProveIt.io helps businesses and creators verify content, establish
              credibility, and deliver transparent digital experiences powered
              by modern technology.
            </p>

            <div className="flex justify-between w-full text-sm font-medium text-foreground mt-10">
              <div className="flex flex-col gap-5 transition-colors hover:text-primary text-black dark:text-amber-50 ">
                <Link to="#" className="relative group ">
                  Privacy Policy
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full bg-black dark:bg-white" />
                </Link>
              </div>
              <div className="flex flex-col gap-5 transition-colors hover:text-primary text-black dark:text-amber-50">
                <Link to="#" className="relative group">
                  {" "}
                  Terms of Service
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full bg-black dark:bg-white" />
                </Link>
              </div>
              <div className="flex flex-col gap-5 transition-colors hover:text-primary text-black dark:text-amber-50">
                <Link to="#" className="relative group">
                  Contact Us
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full bg-black dark:bg-white" />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <SocialIcons></SocialIcons>
          </div>
          
        </div>
        <p className="pt-4 text-xs text-muted-foreground text-black/20 dark:text-amber-50/20">
            © {new Date().getFullYear()} ProveIt.io — All rights reserved.
          </p>
      </footer>
      
    </>
  );
}

/* ---------------------------------------
   Grid Pattern (Reusable)
---------------------------------------- */

function GridPattern({ offsetX, offsetY }) {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="footer-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground dark:text-white/20 text-black/20"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-grid)" />
    </svg>
  );
}
