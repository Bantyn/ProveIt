import React from "react";

export function Marquee({
    children,
    direction = "left",
    className = "",
    pauseOnHover = true
}) {
    return (
        <div className={`flex w-full overflow-hidden group ${className}`}>
            <div className={`flex shrink-0 gap-6 py-4 px-3 ${direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
                } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}>
                {children}
            </div>
            <div className={`flex shrink-0 gap-6 py-4 px-3 ${direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
                } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}>
                {children}
            </div>
        </div>
    );
}
