import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SpectrumBackground = () => {
    const containerRef = useRef(null);
    const svgContainerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        tl.to(svgContainerRef.current, {
            autoAlpha: 1,
            duration: 0.01
        }, 0)
            .to(svgContainerRef.current, {
                transform: "scaleY(0.05) translateY(-30px)",
                duration: 0.3,
                ease: "power2.out"
            }, 0)
            .to(svgContainerRef.current, {
                transform: "scaleY(1) translateY(0px)",
                duration: 1.2,
                ease: "power2.out"
            }, 0.3);

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const styles = {
        container: {
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: 'transparent',
        },
        gradients: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.15,
        },
        gradientBase: {
            position: 'absolute',
            transition: 'opacity 0.5s ease',
            willChange: 'opacity, filter',
        },
        gradient1: {
            top: '-20%',
            left: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, #000000 0%, #0F172A 35%, transparent 70%)',
        },
        gradient2: {
            top: '30%',
            right: '-15%',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, #1E293B 0%, #000000 40%, transparent 70%)',
        },
        gradient3: {
            bottom: '-25%',
            left: '20%',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, #0F172A 0%, #000000 45%, transparent 75%)',
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 5,
            opacity: 0,
            filter: 'blur(20px)',
            transition: 'opacity 0.6s ease',
            willChange: 'opacity, filter',
        },
        svgContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100vh',
            transformOrigin: 'bottom',
            transform: 'scaleY(0.05) translateY(100vh)',
            opacity: 0,
            zIndex: 15,
            willChange: 'transform, opacity',
        },
        svg: {
            width: '100%',
            height: '100%',
        },
        bottomShadow: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)',
            zIndex: 25,
            pointerEvents: 'none',
        }
    };

    return (
        <div style={styles.container} ref={containerRef}>
            <div style={styles.gradients}>
                <div style={{ ...styles.gradientBase, ...styles.gradient1 }}></div>
                <div style={{ ...styles.gradientBase, ...styles.gradient2 }}></div>
                <div style={{ ...styles.gradientBase, ...styles.gradient3 }}></div>
            </div>

            <div style={styles.overlay}></div>

            <div style={styles.svgContainer} ref={svgContainerRef}>
                <svg style={styles.svg} viewBox="0 0 1567 584" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip)">
                        <path d="M1219 584H1393V184H1219V584Z" fill="url(#grad0)" />
                        <path d="M1045 584H1219V104H1045V584Z" fill="url(#grad1)" />
                        <path d="M348 584H174L174 184H348L348 584Z" fill="url(#grad2)" />
                        <path d="M522 584H348L348 104H522L522 584Z" fill="url(#grad3)" />
                        <path d="M697 584H522L522 54H697L697 584Z" fill="url(#grad4)" />
                        <path d="M870 584H1045V54H870V584Z" fill="url(#grad5)" />
                        <path d="M870 584H697L697 0H870L870 584Z" fill="url(#grad6)" />
                        <path d="M174 585H0.000183105L-3.75875e-06 295H174L174 585Z" fill="url(#grad7)" />
                        <path d="M1393 584H1567V294H1393V584Z" fill="url(#grad8)" />
                    </g>
                    <defs>
                        <filter id="blur" x="-30" y="-30" width="1627" height="644" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="0" result="effect1_foregroundBlur" />
                        </filter>

                        <linearGradient id="grad0" x1="1306" y1="584" x2="1306" y2="184" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#000000" />
                            <stop offset="0.18" stopColor="#0F172A" />
                            <stop offset="0.28" stopColor="#1E293B" />
                            <stop offset="0.41" stopColor="#334155" />
                            <stop offset="0.58" stopColor="#475569" />
                            <stop offset="0.68" stopColor="#64748B" />
                            <stop offset="0.80" stopColor="#94A3B8" />
                            <stop offset="1" stopColor="#CBD5E1" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="grad1" x1="1132" y1="584" x2="1132" y2="104" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#000000" />
                            <stop offset="0.18" stopColor="#0F172A" />
                            <stop offset="0.28" stopColor="#1E293B" />
                            <stop offset="0.41" stopColor="#334155" />
                            <stop offset="0.58" stopColor="#475569" />
                            <stop offset="0.68" stopColor="#64748B" />
                            <stop offset="0.80" stopColor="#94A3B8" />
                            <stop offset="1" stopColor="#CBD5E1" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="261" y1="584" x2="261" y2="184" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#000000" />
                            <stop offset="0.18" stopColor="#0F172A" />
                            <stop offset="0.28" stopColor="#1E293B" />
                            <stop offset="0.41" stopColor="#334155" />
                            <stop offset="0.58" stopColor="#475569" />
                            <stop offset="0.68" stopColor="#64748B" />
                            <stop offset="0.80" stopColor="#94A3B8" />
                            <stop offset="1" stopColor="#CBD5E1" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="grad3" x1="435" y1="584" x2="435" y2="104" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#000000" />
                            <stop offset="0.18" stopColor="#0F172A" />
                            <stop offset="0.28" stopColor="#1E293B" />
                            <stop offset="0.41" stopColor="#334155" />
                            <stop offset="0.58" stopColor="#475569" />
                            <stop offset="0.68" stopColor="#64748B" />
                            <stop offset="0.80" stopColor="#94A3B8" />
                            <stop offset="1" stopColor="#CBD5E1" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="grad4" x1="609.501" y1="584" x2="609.501" y2="54" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#000000" />
                            <stop offset="0.18" stopColor="#0F172A" />
                            <stop offset="0.28" stopColor="#1E293B" />
                            <stop offset="0.41" stopColor="#334155" />
                            <stop offset="0.58" stopColor="#475569" />
                            <stop offset="0.68" stopColor="#64748B" />
                            <stop offset="0.80" stopColor="#94A3B8" />
                            <stop offset="1" stopColor="#CBD5E1" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="grad5" x1="957.5" y1="584" x2="957.5" y2="54" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#000000" />
                            <stop offset="0.18" stopColor="#0F172A" />
                            <stop offset="0.28" stopColor="#1E293B" />
                            <stop offset="0.41" stopColor="#334155" />
                            <stop offset="0.58" stopColor="#475569" />
                            <stop offset="0.68" stopColor="#64748B" />
                            <stop offset="0.80" stopColor="#94A3B8" />
                            <stop offset="1" stopColor="#CBD5E1" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="grad6" x1="783.501" y1="584" x2="783.501" y2="0" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#000000" />
                            <stop offset="0.18" stopColor="#0F172A" />
                            <stop offset="0.28" stopColor="#1E293B" />
                            <stop offset="0.41" stopColor="#334155" />
                            <stop offset="0.58" stopColor="#475569" />
                            <stop offset="0.68" stopColor="#64748B" />
                            <stop offset="0.80" stopColor="#94A3B8" />
                            <stop offset="1" stopColor="#CBD5E1" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="grad7" x1="87.0003" y1="585" x2="87.0003" y2="295" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#000000" />
                            <stop offset="0.18" stopColor="#0F172A" />
                            <stop offset="0.28" stopColor="#1E293B" />
                            <stop offset="0.41" stopColor="#334155" />
                            <stop offset="0.58" stopColor="#475569" />
                            <stop offset="0.68" stopColor="#64748B" />
                            <stop offset="0.80" stopColor="#94A3B8" />
                            <stop offset="1" stopColor="#CBD5E1" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="grad8" x1="1480" y1="584" x2="1480" y2="294" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#000000" />
                            <stop offset="0.18" stopColor="#0F172A" />
                            <stop offset="0.28" stopColor="#1E293B" />
                            <stop offset="0.41" stopColor="#334155" />
                            <stop offset="0.58" stopColor="#475569" />
                            <stop offset="0.68" stopColor="#64748B" />
                            <stop offset="0.80" stopColor="#94A3B8" />
                            <stop offset="1" stopColor="#CBD5E1" stopOpacity="0" />
                        </linearGradient>
                        <clipPath id="clip">
                            <rect width="1567" height="584" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>

            <div style={styles.bottomShadow}></div>
        </div>
    );
};

export default SpectrumBackground;
