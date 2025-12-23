import React, { useEffect, useState } from "react";

const AuroraBackground = ({ children }) => {
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 20 + 20,
        opacity: Math.random() * 0.3 + 0.1,
      }))
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />

      {/* Aurora layers */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full
                      bg-gradient-to-tr from-indigo-400/40 to-purple-400/30
                      dark:from-indigo-700/30 dark:to-purple-700/20
                      blur-[140px] animate-aurora" />
      <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full
                      bg-gradient-to-tr from-purple-400/40 to-fuchsia-400/30
                      dark:from-purple-700/30 dark:to-fuchsia-700/20
                      blur-[160px] animate-aurora-slow" />
      <div className="absolute bottom-[-200px] left-1/3 w-[600px] h-[600px] rounded-full
                      bg-gradient-to-tr from-fuchsia-400/30 to-indigo-400/20
                      dark:from-fuchsia-700/20 dark:to-indigo-700/10
                      blur-[180px] animate-aurora-slower" />

      {/* Grid overlay */}
      <div className="
        absolute inset-0
        bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]
        bg-[size:36px_36px]
        dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),
                linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]
        pointer-events-none
      " />

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02]
                      bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      {/* Floating particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white dark:bg-indigo-300"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatParticle ${p.speed}s linear infinite`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Animations */}
      <style>{`
        @keyframes aurora {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(30px,-40px) rotate(5deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }
        @keyframes aurora-slow {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(-20px,30px) rotate(-5deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }
        @keyframes aurora-slower {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(15px,-15px) rotate(3deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0px); opacity: 0; }
          50% { transform: translateY(-10px); opacity: 0.6; }
          100% { transform: translateY(0px); opacity: 0; }
        }
        .animate-aurora { animation: aurora 20s ease-in-out infinite; }
        .animate-aurora-slow { animation: aurora-slow 32s ease-in-out infinite; }
        .animate-aurora-slower { animation: aurora-slower 45s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AuroraBackground;
