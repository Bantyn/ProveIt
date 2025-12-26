import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const FlippingCard = ({
    width = 300,
    frontContent,
    backContent,
    className = ''
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`relative cursor-pointer ${className}`}
            style={{ width: `${width}px`, height: '400px', perspective: '1000px' }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div
                    className="absolute w-full h-full rounded-2xl border border-violet-500/30 bg-black dark:bg-black overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                >
                    {frontContent}
                </div>

                {/* Back */}
                <div
                    className="absolute w-full h-full rounded-2xl border border-violet-500/30 bg-black dark:bg-black overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    {backContent}
                </div>
            </motion.div>
        </div>
    );
};
