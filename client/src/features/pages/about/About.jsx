import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger, Flip);

const AboutUs = () => {
  const glowRef1 = useRef(null);
  const glowRef2 = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const gsapCtxRef = useRef(null);

  // Framer Motion Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Three.js texture generator
  const makeGradientNoiseTexture = () => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d");

    const grd = g.createLinearGradient(0, 0, 230, 384);
    grd.addColorStop(0, "#a855f7");
    grd.addColorStop(1, "#ec4899");
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);

    for (let i = 0; i < 4000; i++) {
      const x = Math.floor(Math.random() * 256);
      const y = Math.floor(Math.random() * 256);
      const a = Math.random() * 0.08 + 0.02;
      g.fillStyle = `rgba(0,0,0,${a})`;
      g.fillRect(x, y, 3, 3);
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  };

  // Initialize Three.js
  const initThree = (canvas) => {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 3);
    cameraRef.current = camera;

    const mat = new THREE.MeshBasicMaterial({ map: makeGradientNoiseTexture() });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat);
    meshRef.current = mesh;
    scene.add(mesh);

    gsap.ticker.add(render);
    onResize();
  };

  const render = () => {
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  const onResize = () => {
    if (!rendererRef.current || !canvasRef.current) return;
    const r = canvasRef.current.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    rendererRef.current.setPixelRatio(1);
    rendererRef.current.setSize(
      Math.max(1, r.width * dpr),
      Math.max(1, r.height * dpr),
      false
    );
    cameraRef.current.aspect = (r.width || 1) / (r.height || 1);
    cameraRef.current.updateProjectionMatrix();
  };

  const buildTimeline = () => {
    if (gsapCtxRef.current) gsapCtxRef.current.revert();
    
    gsapCtxRef.current = gsap.context(() => {
      const s2 = Flip.getState(".second .marker");
      const s3 = Flip.getState(".third .marker");

      const tl = gsap.timeline({
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 2
        }
      });

      tl.add(Flip.fit(canvasRef.current, s2, { duration: 1, ease: "none" }), 0)
        .to(
          meshRef.current.rotation,
          { x: `+=${Math.PI}`, y: `+=${Math.PI}`, duration: 1, ease: "none" },
          "<"
        )
        .addLabel("mid", "+=0.5")
        .add(Flip.fit(canvasRef.current, s3, { duration: 1, ease: "none" }), "mid")
        .to(
          meshRef.current.rotation,
          { x: `+=${Math.PI}`, y: `+=${Math.PI}`, duration: 1, ease: "none" },
          "<"
        );
    });
  };

  useEffect(() => {
    // Background glows
    const ctx = gsap.context(() => {
      gsap.to(glowRef1.current, {
        x: '20%',
        y: '20%',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(glowRef2.current, {
        x: '-20%',
        y: '-30%',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    });

    // Initialize Three.js canvas
    if (canvasRef.current) {
      initThree(canvasRef.current);
      buildTimeline();
    }

    const handleResize = () => {
      onResize();
      buildTimeline();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      if (gsapCtxRef.current) gsapCtxRef.current.revert();
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(render);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden text-white font-sans">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          ref={glowRef1}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-700 rounded-full mix-blend-screen filter blur-[120px] opacity-40"
        />
        <div 
          ref={glowRef2}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] opacity-30"
        />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-fuchsia-800 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" />
      </div>

      {/* Grid Background */}
      <div 
        className="fixed inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px),
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center mb-32">
          <motion.div 
            style={{ y: yText }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-purple-400 font-medium tracking-[0.2em] mb-4 text-sm uppercase">
              About ProveIt.io
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-purple-900 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              Skills Speak <br /> Louder Than Words
            </h1>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed">
              We're revolutionizing recruitment by putting skills first. No more resume bias. No more empty credentials. Just pure, validated talent meeting opportunity.
            </p>
          </motion.div>
        </div>

        {/* Spacer for scroll */}
        <div className="w-full h-[10vh] flex items-center justify-center">
          <span className="text-gray-600 font-semibold tracking-wider text-sm uppercase animate-pulse">Scroll Down</span>
        </div>

        {/* GSAP Flip Animation Section */}
        <div className="relative h-[200vh]">
          
          {/* Initial Container */}
          <div className="container-initial absolute left-[60%] top-[10%] w-[200px] h-[200px] flex items-center justify-center border-2 border-dashed border-purple-500/30 rounded-xl">
            <canvas 
              ref={canvasRef}
              className="w-[200px] h-[200px] border border-dashed border-purple-300/50 rounded-lg bg-transparent block"
            />
          </div>

          {/* Content Section 1 - Skills Assessment */}
          <div className="second absolute left-[10%] top-[50%] w-[100px] h-[100px] flex items-center justify-center">
            <div className="marker w-[100px] h-[100px] rounded-lg outline outline-1 outline-dashed outline-purple-500/40 outline-offset-[-6px] opacity-60" />
          </div>

          <div className="absolute left-[20%] top-[45%] max-w-md">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-white">
                Real Skills, <span className="text-pink-500">Real Results</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Our platform enables companies to assess candidates through practical, hands-on challenges. No more guesswork—see what they can actually build.
              </p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300">Live Coding</span>
                <span className="px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full text-sm text-pink-300">Real Projects</span>
                <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300">Instant Feedback</span>
              </div>
            </motion.div>
          </div>

          {/* Content Section 2 - Company Benefits */}
          <div className="third absolute right-[10%] bottom-[3rem] w-[200px] h-[200px] flex items-center justify-center">
            <div className="marker w-[200px] h-[200px] rounded-lg outline outline-1 outline-dashed outline-pink-500/40 outline-offset-[-6px] opacity-60" />
          </div>

          <div className="absolute right-[20%] bottom-[8rem] max-w-md text-right">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-white">
                <span className="text-purple-500">Hire Faster,</span> Hire Better
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                For companies, we cut through the noise. Find developers, designers, and creators who can prove their worth from day one.
              </p>
              <div className="flex gap-3 flex-wrap justify-end">
                <span className="px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full text-sm text-pink-300">Zero Bias</span>
                <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300">Skill Verified</span>
                <span className="px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full text-sm text-pink-300">Quality Talent</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* End Spacer */}
        <div className="w-full h-[10vh] flex items-center justify-center mt-16">
          <span className="text-gray-600 font-semibold tracking-wider text-sm uppercase">Keep Scrolling</span>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 mt-32">
          {[
            { label: "Skills Assessed", value: "50K+" },
            { label: "Companies Trust Us", value: "500+" },
            { label: "Successful Hires", value: "10K+" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <h3 className="text-5xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {stat.value}
              </h3>
              <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative h-[400px] w-full bg-black/80 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-4xl">🎯</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Skill-First Hiring</h4>
                <p className="text-gray-400 text-sm">Validate talent through real challenges</p>
              </div>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              The Future of <span className="text-purple-500">Recruitment</span> <br/>
              Starts Here
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              ProveIt.io eliminates resume bias and focuses on what truly matters: demonstrable skills. We're building a world where opportunity is based on capability, not credentials.
            </p>
            <ul className="space-y-4">
              {[
                'Unbiased Assessment Platform',
                'Real-World Coding Challenges', 
                'Transparent Skill Validation'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-4 shadow-[0_0_10px_#a855f7]"></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative rounded-3xl p-12 overflow-hidden text-center border border-purple-500/30 mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-pink-900/20 to-black z-0"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Prove Your Skills?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Join thousands of talented professionals and forward-thinking companies revolutionizing the hiring process.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-colors"
              >
                For Candidates
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-colors"
              >
                For Companies
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutUs;