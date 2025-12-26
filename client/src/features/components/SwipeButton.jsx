import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export const SwipeButton = ({
    onSwipeComplete,
    text = 'Swipe to Save',
    color = '#8b5cf6',
    className = ''
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragX, setDragX] = useState(0);
    const containerRef = useRef(null);
    const [isComplete, setIsComplete] = useState(false);

    const handleDragEnd = (event, info) => {
        setIsDragging(false);

        if (!containerRef.current) return;

        const containerWidth = containerRef.current.offsetWidth;
        const threshold = containerWidth * 0.8;

        if (info.point.x > threshold) {
            setIsComplete(true);
            setDragX(containerWidth - 60);
            setTimeout(() => {
                onSwipeComplete?.();
                setIsComplete(false);
                setDragX(0);
            }, 500);
        } else {
            setDragX(0);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-16 rounded-2xl border-2 overflow-hidden ${className}`}
            style={{
                background: `linear-gradient(to right, ${color}20, ${color}20)`,
                borderColor: `${color}30`,
            }}
        >
            {/* Background progress */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `linear-gradient(to right, ${color}, ${color})`,
                }}
                initial={{ width: 0 }}
                animate={{ width: isComplete ? '100%' : `${(dragX / (containerRef.current?.offsetWidth || 1)) * 100}%` }}
                transition={{ duration: 0.2 }}
            />

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className={`text-lg font-bold ${isComplete ? 'text-white' : 'text-neutral-300'}`}>
                    {isComplete ? 'Saved!' : text}
                </span>
            </div>

            {/* Draggable button */}
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: containerRef.current ? containerRef.current.offsetWidth - 60 : 0 }}
                dragElastic={0.1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                animate={{ x: dragX }}
                className={`absolute left-2 top-2 w-12 h-12 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing shadow-xl ${isDragging ? 'scale-110' : 'scale-100'
                    }`}
                style={{
                    background: `linear-gradient(to right, ${color}, ${color})`,
                }}
                whileTap={{ scale: 1.1 }}
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </motion.div>
        </div>
    );
};
