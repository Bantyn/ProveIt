"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";
import { useRef } from "react";
import { TestimonialsColumn } from "../../../components/ui/testominals/testimonials-columns-1.jsx";
import { CheckCircle, Clock } from "lucide-react";
import {Particles} from "./Partical.jsx";

// --- default Landing Component ---
export default function Landing() {
  // ---  icons array ---
  const demoIcons = [
    { id: 1, icon: IconGoogle, className: "top-[10%] left-[10%] w-10 h-10" },
    { id: 2, icon: IconApple, className: "top-[20%] right-[8%] w-10 h-10" },
    { id: 3, icon: IconMicrosoft, className: "top-[80%] left-[10%] w-10 h-10" },
    { id: 4, icon: IconFigma, className: "bottom-[10%] right-[10%] w-10 h-10" },
    { id: 5, icon: IconGitHub, className: "top-[5%] left-[30%] w-10 h-10" },
    { id: 6, icon: IconSlack, className: "top-[5%] right-[30%] w-10 h-10" },
    { id: 7, icon: IconVercel, className: "bottom-[8%] left-[25%] w-10 h-10" },
    { id: 8, icon: IconStripe, className: "top-[40%] left-[15%] w-10 h-10" },
    { id: 9, icon: IconDiscord, className: "top-[75%] right-[25%] w-10 h-10" },
    { id: 10, icon: IconX, className: "top-[90%] left-[70%] w-10 h-10" },
    { id: 11, icon: IconNotion, className: "top-[50%] right-[5%] w-10 h-10" },
    { id: 12, icon: IconSpotify, className: "top-[55%] left-[5%] w-10 h-10" },
    { id: 13, icon: IconDropbox, className: "top-[5%] left-[55%] w-10 h-10" },
    {
      id: 14,
      icon: IconTwitch,
      className: "bottom-[5%] right-[45%] w-10 h-10",
    },
    { id: 15, icon: IconLinear, className: "top-[25%] right-[20%] w-10 h-10" },
    { id: 16, icon: IconYouTube, className: "top-[60%] left-[30%] w-10 h-10" },
  ];

  return (
    <>
      <section>
        {/* // Hero Section */}
        
        
        
        {/* <Particles
        className="absolute h-full" // make it cover the container
        quantity={150}               // number of particles
        size={0.8}                   // particle size
        color="#fff010"              // particle color
        staticity={80}               // magnetism strength
        ease={30}                    // movement ease
      /> */}
        
        
        <FloatingIconsHero
          title="Skill-Verified Hiring Platform"
          subtitle="proveIt.io is a centralized platform for skill-based hiring. Companies post jobs with project tasks; candidates submit work (e.g., GitHub repos) for evaluation. Admins manage postings, evaluate submissions, and shortlist candidates. Features: rankings, plagiarism checks, analytics, and subscriptions."
          ctaText="Expolore"
          ctaHref="/home"
          icons={demoIcons}
        />
      </section>

      
      {/* // second section */}
      <section className="min-h-screen">
        
        {/* Second Sub Title */}
        <WordFadeIn
          className="mt-60  tracking-widest text-5xl text-black dark:text-white/80 "
          text="Show Your Skills and Get Hired"
          delay={0.06}
        ></WordFadeIn>
          
        <HiredEmployeesTimeline
          title="Hired Employees This Week"
          employees={employees}
        />

        {/* // Testimonials */}
        <Testimonials />
        
      </section>

      {/* // third section */}
      <section></section>
    </>
  );
}

// --- Reusable Icon Component ---
const Icon = ({ mouseX, mouseY, iconData, index }) => {
  const ref = React.useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
 
  React.useEffect(() => {
    const handleMouseMove = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
          Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
      );

      if (distance < 150) {
        const angle = Math.atan2(
          mouseY.current - (rect.top + rect.height / 2),
          mouseX.current - (rect.left + rect.width / 2)
        );
        const force = (1 - distance / 150) * 50;
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, mouseX, mouseY]);
  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={clsx("absolute", iconData.className)}
    >
      <motion.div
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-card/80 backdrop-blur-md dark:bg-white/10"
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <iconData.icon className="w-8 h-8 md:w-10 md:h-10 text-foreground" />
      </motion.div>
    </motion.div>
  );
};

// --- Main Floating Icons Hero Component ---
export const FloatingIconsHero = React.forwardRef(
  ({ className, title, subtitle, ctaText, ctaHref, icons, ...props }, ref) => {
    const mouseX = React.useRef(0);
    const mouseY = React.useRef(0);

    const handleMouseMove = (event) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    return (
      <>
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          className={clsx(
            "relative w-full h-screen flex items-center justify-center bg-white dark:bg-black ",
            className
          )}
          {...props}
        >
          {/* Background Floating Icons */}
          <div className="absolute inset-0 w-full h-full ">
            {icons.map((iconData, index) => (
              <Icon
                key={iconData.id}
                mouseX={mouseX}
                mouseY={mouseY}
                iconData={iconData}
                index={index}
              />
            ))}
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 text-center px-4 ">
            <div className="text-4xl md:text-7xl font-bold tracking-tight  bg-gradient-to-b from-black via-gray-950  to-gray-100/70 bg-clip-text text-transparent dark:text-white/80">
              <WordFadeIn
                text={title}
                delay={0.3}
                className="text-black dark:text-white/80"
              />
             

            </div>

            <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground dark:text-white/50">
              {subtitle}
            </p>

            <div className="md:mt-15 mt-30">
              <UltimateGlassCTA
                ctaHref={ctaHref}
                ctaText={ctaText}
              ></UltimateGlassCTA>

             
            </div>
          </div>
        </div>
      </>
    );
  }
);

// ------------------- SVG ICONS -------------------
const IconGoogle = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path
      d="M21.9999 12.24C21.9999 11.4933 21.9333 10.76 21.8066 10.0533H12.3333V14.16H17.9533C17.7333 15.3467 17.0133 16.3733 15.9666 17.08V19.68H19.5266C21.1933 18.16 21.9999 15.4533 21.9999 12.24Z"
      fill="#4285F4"
    />
    <path
      d="M12.3333 22C15.2333 22 17.6866 21.0533 19.5266 19.68L15.9666 17.08C15.0199 17.7333 13.7933 18.16 12.3333 18.16C9.52659 18.16 7.14659 16.28 6.27992 13.84H2.59326V16.5133C4.38659 20.0267 8.05992 22 12.3333 22Z"
      fill="#34A853"
    />
    <path
      d="M6.2799 13.84C6.07324 13.2267 5.9599 12.58 5.9599 11.92C5.9599 11.26 6.07324 10.6133 6.2799 10L2.59326 7.32667C1.86659 8.78667 1.45326 10.32 1.45326 11.92C1.45326 13.52 1.86659 15.0533 2.59326 16.5133L6.2799 13.84Z"
      fill="#FBBC05"
    />
    <path
      d="M12.3333 5.68C13.8933 5.68 15.3133 6.22667 16.3866 7.24L19.6 4.02667C17.68 2.29333 15.2266 1.33333 12.3333 1.33333C8.05992 1.33333 4.38659 3.97333 2.59326 7.32667L6.27992 10C7.14659 7.56 9.52659 5.68 12.3333 5.68Z"
      fill="#EA4335"
    />
  </svg>
);
const IconApple = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.482 15.334C16.274 16.146 15.238 17.554 15.238 19.138C15.238 21.694 17.062 22.846 19.33 22.99C21.682 23.122 23.53 21.73 23.53 19.138C23.53 16.57 21.742 15.334 19.438 15.334C18.23 15.334 17.482 15.334 17.482 15.334ZM19.438 1.018C17.074 1.018 15.238 2.41 15.238 4.982C15.238 7.554 17.062 8.702 19.33 8.842C21.682 8.974 23.53 7.582 23.53 4.982C23.518 2.41 21.742 1.018 19.438 1.018Z" />
  </svg>
);
const IconMicrosoft = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.4 2H2v9.4h9.4V2Z" fill="#F25022" />
    <path d="M22 2h-9.4v9.4H22V2Z" fill="#7FBA00" />
    <path d="M11.4 12.6H2V22h9.4V12.6Z" fill="#00A4EF" />
    <path d="M22 12.6h-9.4V22H22V12.6Z" fill="#FFB900" />
  </svg>
);
const IconFigma = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z"
      fill="#2C2C2C"
    />
    <path d="M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5V7z" fill="#0ACF83" />
    <path d="M12 12a5 5 0 0 1-5-5 5 5 0 0 1 5-5v10z" fill="#A259FF" />
    <path d="M12 17a5 5 0 0 1-5-5h10a5 5 0 0 1-5 5z" fill="#F24E1E" />
    <path d="M7 12a5 5 0 0 1 5 5v-5H7z" fill="#FF7262" />
  </svg>
);
const IconGitHub = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-foreground/80"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
const IconSlack = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" fill="#36C5F0" />
    <path d="M9 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="#2EB67D" />
    <path d="M14 8.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" fill="#ECB22E" />
    <path d="M15.5 15a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" fill="#E01E5A" />
    <path
      d="M10 14h4v-1.5a1.5 1.5 0 0 0-1.5-1.5h-1a1.5 1.5 0 0 0-1.5 1.5V14Z"
      fill="#E01E5A"
    />
    <path
      d="M8.5 14a1.5 1.5 0 0 0 1.5 1.5h1.5v-1a1.5 1.5 0 0 0-1.5-1.5H8.5v1Z"
      fill="#ECB22E"
    />
    <path
      d="M15.5 10a1.5 1.5 0 0 0-1.5-1.5H12.5v4a1.5 1.5 0 0 0 1.5 1.5h1.5v-4Z"
      fill="#36C5F0"
    />
    <path
      d="M14 8.5a1.5 1.5 0 0 0-1.5-1.5h-1v4a1.5 1.5 0 0 0 1.5 1.5h1v-4Z"
      fill="#2EB67D"
    />
  </svg>
);
const IconVercel = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-foreground/90"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);
const IconStripe = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
      fill="#635BFF"
    />
    <path d="M6 7H18V9H6V7Z" fill="white" />
    <path d="M6 11H18V13H6V11Z" fill="white" />
    <path d="M6 15H14V17H6V15Z" fill="white" />
  </svg>
);
const IconDiscord = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.317 4.482a1.88 1.88 0 0 0-1.635-.482C17.398 3.42 16.02 3 12 3s-5.398.42-6.682 1.001a1.88 1.88 0 0 0-1.635.483c-1.875 1.2-2.325 3.61-1.568 5.711 1.62 4.47 5.063 7.8 9.885 7.8s8.265-3.33 9.885-7.8c.757-2.1-.307-4.51-1.568-5.711ZM8.45 13.4c-.825 0-1.5-.75-1.5-1.65s.675-1.65 1.5-1.65c.825 0 1.5.75 1.5 1.65s-.675 1.65-1.5 1.65Zm7.1 0c-.825 0-1.5-.75-1.5-1.65s.675-1.65 1.5-1.65c.825 0 1.5.75 1.5 1.65s-.675 1.65-1.5 1.65Z"
      fill="#5865F2"
    />
  </svg>
);
const IconX = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-foreground/90"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25zM17.03 19.75h1.866L7.156 4.25H5.16l11.874 15.5z" />
  </svg>
);
const IconNotion = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-foreground/80"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm.111 5.889h3.222v10.222h-3.222V7.889zm-4.333 0h3.222v10.222H7.778V7.889z" />
  </svg>
);
const IconSpotify = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.125 14.175c-.188.3-.563.413-.863.225-2.437-1.5-5.5-1.725-9.15-1.012-.338.088-.675-.15-.763-.488-.088-.337.15-.675.488-.762 3.937-.787 7.287-.525 9.975 1.125.3.187.412.562.225.862zm.9-2.7c-.225.363-.675.488-1.037.263-2.7-1.65-6.825-2.1-9.975-1.162-.413.113-.825-.15-1-.562-.15-.413.15-.825.563-1 .362-.112 3.487-.975 6.6 1.312.362.225.487.675.262 1.038v.112zm.113-2.887c-3.225-1.875-8.55-2.025-11.512-1.125-.487.15-.975-.15-1.125-.637-.15-.488.15-.975.638-1.125 3.337-.975 9.15-.787 12.825 1.312.45.263.6.825.337 1.275-.263.45-.825.6-1.275.337v-.038z"
      fill="#1DB954"
    />
  </svg>
);
const IconDropbox = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 8l-6 4 6 4 6-4-6-4z" fill="#0061FF" />
    <path d="M6 12l6 4 6-4-6-4-6 4z" fill="#007BFF" />
    <path d="M12 16l6-4-6-4-6 4 6 4z" fill="#4DA3FF" />
    <path d="M18 12l-6-4-6 4 6 4 6-4z" fill="#0061FF" />
  </svg>
);
const IconTwitch = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.149 0L.707 3.028v17.944h5.66v3.028h3.028l3.028-3.028h4.243l7.07-7.07V0H2.15zm19.799 13.434l-3.535 3.535h-4.95l-3.029 3.029v-3.03H5.14V1.414h16.808v12.02z"
      fill="#9146FF"
    />
    <path
      d="M15.53 5.303h2.12v6.36h-2.12v-6.36zm-4.95 0h2.12v6.36h-2.12v-6.36z"
      fill="#9146FF"
    />
  </svg>
);
const IconLinear = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="linear-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5E5CE6" />
        <stop offset="100%" stopColor="#2C2C2C" />
      </linearGradient>
    </defs>
    <path
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-4 9h8v2H8v-2z"
      fill="url(#linear-grad)"
    />
  </svg>
);
const IconYouTube = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.582 6.186A2.482 2.482 0 0 0 19.82 4.42C18.1 4 12 4 12 4s-6.1 0-7.82.42c-.98.26-1.74.98-1.762 1.766C2 7.94 2 12 2 12s0 4.06.418 5.814c.022.786.782 1.506 1.762 1.766C6.1 20 12 20 12 20s6.1 0 7.82-.42c.98-.26 1.74-.98 1.762-1.766C22 16.06 22 12 22 12s0-4.06-.418-5.814zM9.75 15.5V8.5L15.75 12 9.75 15.5z"
      fill="#FF0000"
    />
  </svg>
);

// ------------------- Button -------------------
export function UltimateGlassCTA({ ctaText, ctaHref }) {
  const ref = useRef(null);

  // 🎯 Magnetic cursor
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.25);
    y.set(offsetY * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={ctaHref}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.92 }}
      className="relative group inline-flex"
    >
      <span
        className="absolute inset-0 rounded-3xl blur-2xl opacity-60
        bg-gradient-to-r
        from-amber-400 via-orange-500 to-pink-500
        dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600
        transition-all duration-700
        group-hover:opacity-100"
      />

      <span
        className="relative overflow-hidden rounded-3xl
        px-12 py-4
        font-semibold text-white tracking-wide
        backdrop-blur-xl
        bg-white/10 dark:bg-black/20
        border dark:border-white/20 border-black/20 
        shadow-xl"
      >
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 2.5, opacity: 0.15 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-full
          bg-white"
        />

        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{
              opacity: 1,
              scale: 1,
              x: Math.cos((i * Math.PI) / 3) * 20,
              y: Math.sin((i * Math.PI) / 3) * 20,
            }}
            transition={{ duration: 0.4 }}
            className="absolute top-1/2 left-1/2 h-1.5 w-1.5
            rounded-full bg-white"
          />
        ))}

        <motion.span
          whileHover={{ x: "120%" }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-[-120%] h-full w-[120%]
          bg-gradient-to-r from-transparent via-white/40 to-transparent
          skew-x-12"
        />

        <span className="relative z-10 text-black dark:text-white">
          {ctaText}
        </span>
      </span>
    </motion.a>
  );
}
// --------------------------------------------------------------------------------------------------------
// Word Fead Effect
export function WordFadeIn({ text, className = "", delay = 0.15, variants }) {
  const words = text.split(" ");

  const defaultVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * delay,
      },
    }),
  };

  return (
    <motion.h1
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={variants || defaultVariants}
      className={clsx(
        "font-display text-center tracking-[-0.02em] mb-15 drop-shadow-sm",
        className
      )}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={variants || defaultVariants}
          custom={i}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.h1>
  );
}

// --------------------------------------------------------------------------------------------------------
// Testimonial Slider

// Testimonials Datas fetching Reviews API in Future
const testimonials = [
  {
    text: "This Web3-powered platform transformed the way our organization operates. From smart automation to real-time finance tracking, everything feels futuristic and incredibly efficient.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "The AI-driven insights are on another level. Integrating the MERN stack with Gemini AI gives us unmatched speed, reliability, and automation across our workflows.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "Their support team is outstanding. From onboarding to optimization, they helped us unlock the full power of AI automation in our operations.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "The seamless Web3 integration and AI-powered modules drastically improved our data security, efficiency, and decision-making. Truly next-gen technology.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "With intelligent dashboards and real-time analytics, our team works faster and smarter. This solution boosted our productivity like never before.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "Implementation was incredibly smooth. The platform is built with clean UI, powerful features, and outstanding AI capabilities. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our marketing operations improved instantly. The AI workflows automate repetitive tasks and help us make data-driven decisions effortlessly.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They understood our requirements perfectly and delivered a high-performance platform that blends AI, security, and Web3 capabilities flawlessly.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Our online performance doubled after switching. With smart automation and seamless AI tools, our conversions and workflow efficiency skyrocketed.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

// Splitting Testimonials into 3 Columns
const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <>
      <section className="bg-background my-20 relative  bg-white/90 dark:bg-black text-black dark:text-white transition-all duration-500">
        <div className="container z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
          >
            <div className="flex justify-center">
              <div className="border py-1 px-4 mt-30 rounded-lg dark:text-white/50  dark:hover:text-white/80 text-black/30 bg-amber-50/5 hover:text-black transition-all ease-in-out duration-150 hover:scale-105">
                Testimonials
              </div>
            </div>

            <h2 className="text-black/90 text-xl dark:text-white/80 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
              What Our Clients Say
            </h2>
            <p className="text-black/90 text-center mt-5 opacity-75 dark:text-white/75">
              Real feedback from teams who transformed their workflow with our
              AI-powered Web3 platform.
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className=" hidden md:block"
              duration={19}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={17}
            />
          </div>
        </div>
      </section>
    </>
  );
};

// --------------------------------------------------------------------------------------------------------
// Heird Employee section

// Data
const employees = [
  {
    name: "Aarav Patel",
    bio: "Aarav Patel is a Frontend Developer with a strong background in React and Next.js. He has a knack for creating intuitive and responsive user interfaces.",
    role: "Frontend Developer",
    date: "12 Sep 2025",
    status: "completed",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Neha Sharma",
    bio: "Neha Sharma is a UI/UX Designer with a focus on creating visually appealing and user-friendly interfaces. She has a keen eye for detail and a strong understanding of user psychology.",
    role: "UI/UX Designer",
    date: "14 Sep 2025",
    status: "onboarding",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Rohit Verma",
    bio: "Rohit Verma is a Backend Engineer with expertise in Node.js and MongoDB. He has a passion for building scalable and efficient server-side applications.",
    role: "Backend Engineer",
    date: "16 Sep 2025",
    status: "onboarding",
    image: "https://i.pravatar.cc/150?img=45",
  },
];

export function HiredEmployeesTimeline({ title, employees }) {
  return (
    <>
      <section className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          {employees.map((emp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative flex gap-6 mb-10"
            >
              {/* Avatar */}
              <div className="relative z-10">
                <div className="w-15 h-15 rounded-full overflow-hidden border-2 border-white dark:border-amber-50/20 bg-background shadow-lg shadow-gray-500/50 hover:scale-105 transition-all duration-300">
                  <img
                    src={emp.image}
                    alt={emp.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Card */}
              <div className="flex-1">
                <div className="rounded-xl border-1 border-gray-200 hover:border-gray-300 dark:border-amber-50/20 bg-card p-8 shadow-sm hover:shadow-md  transition-all duration-300 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl tracking-widest font-semibold dark:text-amber-50/80">
                        {emp.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-semibold text-black/50 dark:text-amber-50/50 mb-3">
                        {emp.bio}
                      </p>
                      <p className="text-sm text-muted-foreground font-bold text-black/60 dark:text-amber-50/50 mb-3">
                        Joined on {emp.date}
                      </p>
                      <p className="text-md font-semibold text-muted-foreground text-black/50 dark:text-amber-50/50 mb-1">
                        {emp.role}
                      </p>
                    </div>

                    <StatusBadge status={emp.status} />
                  </div>

                  {/* Progress */}
                  <div className="h-1 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: emp.status === "completed" ? "100%" : "60%",
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full ${
                        emp.status === "completed"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

//  Small Status Badge
function StatusBadge({ status }) {
  const isCompleted = status === "completed";

  return (
    <div
      className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium
        ${
          isCompleted
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700"
        }`}
    >
      {isCompleted ? <CheckCircle size={14} /> : <Clock size={14} />}
      {isCompleted ? "Completed" : "Onboarding"}
    </div>
  );
}
