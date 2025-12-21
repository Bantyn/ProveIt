"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white dark:bg-transparent font-sans md:px-10"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          How to join proveIt.io's Compitition
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          Follow these simple steps to participate and prove your skills.
        </p>
      </div>

      {/* Timeline */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Left sticky title */}
            <div className="sticky top-40 z-40 self-start max-w-xs lg:max-w-sm md:w-full flex items-center">
              <div className="h-10 w-10 absolute left-3 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
              </div>

              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-300">
                {item.title}
              </h3>
            </div>

            {/* Content */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full ">
              <h3 className="md:hidden block text-2xl mb-4 font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              <p className="text-2xl opacity-60 ">{item.content}</p>
              

              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full mt-10 rounded-[50px] opacity-90 hover:opacity-100 hover:-translate-y-1 transition-all duration-300"
              >
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>


              {/* Sign Up button at first elemtn */}
              {index === 0 && (
                <div className="flex justify-center gap-8 pt-8">
                  {/* Employee */}
                  <Link
                    to={item.ClientSignup}
                    className="relative px-8 py-3 rounded-xl font-semibold text-white
               bg-gradient-to-r from-purple-500 to-pink-500
               shadow-lg shadow-purple-500/30
               hover:scale-[1.05] hover:shadow-purple-500/50
               active:scale-95
               transition-all duration-300"
                  >
                    Join as an Employee
                  </Link>

                  {/* Company */}
                  <Link
                    to={item.CompanySignup}
                    className="relative px-8 py-3 rounded-xl font-semibold
               text-neutral-900 dark:text-white
               bg-white/70 dark:bg-neutral-900/60
               backdrop-blur-md
               border border-neutral-300/40 dark:border-neutral-700/40
               shadow-lg
               hover:scale-[1.05] hover:bg-white/90 dark:hover:bg-neutral-900/80
               active:scale-95
               transition-all duration-300"
                  >
                    Company
                  </Link>
                </div>
              )}

              {index === 3 && (
                <div className="flex justify-center gap-8 pt-8">
                  <Link
                    to={item.join}
                    className="relative px-8 py-3 rounded-xl font-semibold text-white
               bg-gradient-to-r from-purple-500 to-pink-500
               shadow-lg shadow-purple-500/30
               hover:scale-[1.05] hover:shadow-purple-500/50
               active:scale-95
               transition-all duration-300"
                  >
                    Join Now
                  </Link>
                  <Link
                    to={item.rules}
                     className="relative px-8 py-3 rounded-xl font-semibold
               text-neutral-900 dark:text-white
               bg-white/70 dark:bg-neutral-900/60
               backdrop-blur-md
               border border-neutral-300/40 dark:border-neutral-700/40
               shadow-lg
               hover:scale-[1.05] hover:bg-white/90 dark:hover:bg-neutral-900/80
               active:scale-95
               transition-all duration-300"
                  >
                    Rules
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Vertical line */}
        <div
          style={{ height: height }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] 
          from-transparent via-neutral-200 dark:via-neutral-700 to-transparent 
          [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full 
            bg-gradient-to-t from-purple-500 via-blue-500 to-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
