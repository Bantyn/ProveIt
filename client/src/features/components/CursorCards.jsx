import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const CursorCardsContainer = ({ children, className = '' }) => {
    return (
        <div className={`relative ${className}`}>
            {children}
        </div>
    );
};

export const CursorCard = ({
    children,
    borderColor = '#262626',
    className = ''
}) => {
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative overflow-hidden ${className}`}
            style={{
                background: isHovered
                    ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`
                    : 'transparent',
            }}
        >
            {/* Border glow effect */}
            <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                    background: isHovered
                        ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${borderColor === '#262626' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(139, 92, 246, 0.3)'}, transparent 40%)`
                        : 'transparent',
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
