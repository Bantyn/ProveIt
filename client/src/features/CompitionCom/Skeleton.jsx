import React from 'react';

export const CardSkeleton = ({ darkMode = false }) => {
    return (
        <div className={`rounded-[2.5rem] border transition-all duration-300 ${darkMode ? 'bg-gray-900/40 border-white/5' : 'bg-white/80 border-indigo-100/50'} p-8 animate-pulse flex flex-col lg:flex-row gap-8 items-center lg:items-stretch`}>
            {/* Section 1: Job Info */}
            <div className="flex-1 w-full space-y-4">
                <div className="flex gap-2">
                    <div className={`h-6 w-20 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                    <div className={`h-6 w-24 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                </div>
                <div className={`h-8 w-3/4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                    <div className={`h-4 w-32 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                </div>
            </div>

            {/* Section 2: Assessment Path (Center) */}
            <div className="hidden lg:flex flex-1 max-w-md flex-col justify-center border-l border-r border-dashed border-gray-500/20 px-8 space-y-3">
                <div className={`h-3 w-24 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                <div className={`h-4 w-full rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                <div className={`h-3 w-2/3 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
            </div>

            {/* Section 3: Rewards & Apply (Right) */}
            <div className="w-full lg:w-72 flex flex-col justify-between gap-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className={`h-2 w-16 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                        <div className={`h-5 w-24 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                    </div>
                    <div className="space-y-2 text-right">
                        <div className={`h-2 w-16 ml-auto rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                        <div className={`h-5 w-24 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                    </div>
                </div>
                <div className={`h-12 w-full rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                <div className="flex justify-between">
                    <div className={`h-3 w-20 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                    <div className={`h-3 w-20 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                </div>
            </div>
        </div>
    );
};

export const GridSkeleton = ({ count = 6, darkMode = false }) => (
    <div className="flex flex-col gap-8">
        {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} darkMode={darkMode} />
        ))}
    </div>
);
