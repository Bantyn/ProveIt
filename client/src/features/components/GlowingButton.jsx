import React from 'react';

const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

export const GlowingButton = ({
    children,
    className = '',
    glowColor = '#8b5cf6',
    onClick,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                'relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 group',
                className
            )}
            style={{
                background: `linear-gradient(135deg, ${glowColor}, ${glowColor}dd)`,
            }}
            {...props}
        >
            {/* Glow effect */}
            <span
                className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle, ${glowColor}88 0%, transparent 70%)`,
                    filter: 'blur(20px)',
                }}
            />

            {/* Shine effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Content */}
            <span className="relative z-10">{children}</span>
        </button>
    );
};
