export const GRADIENTS = {
    brand: {
        light: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)", // Purple → Pink → Amber
        dark: "linear-gradient(135deg, #0891B2 0%, #7C3AED 50%, #059669 100%)", // Increased contrast
    },
    premium: {
        light: "linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B)",
        dark: "linear-gradient(135deg, #0891B2, #7C3AED, #059669)",
    },
    card: {
        light: "bg-gradient-to-br from-white via-purple-50/30 to-white",
        dark: "bg-gradient-to-br from-gray-900 via-indigo-950/30 to-gray-900",
    },
    glass: {
        light: "backdrop-blur-xl bg-white/70 border border-white/20 shadow-xl",
        dark: "backdrop-blur-xl bg-gray-900/70 border border-white/10 shadow-xl",
    }
};

export const THEME_TOKENS = {
    light: {
        background: "bg-white/95 bg-gradient-to-br from-white via-purple-50 to-pink-50",
        surface: "bg-white/90 backdrop-blur-md",
        border: "border-purple-200/50",
        textPrimary: "text-slate-900",
        textSecondary: "text-slate-600",
        accent: "text-violet-600",
        cardBorder: "border-purple-100",
        shadow: "shadow-lg shadow-purple-500/5",
    },
    dark: {
        background: "bg-gray-950 bg-gradient-to-br from-gray-950 via-indigo-950/20 to-cyan-950/20",
        surface: "bg-gray-900/90 backdrop-blur-md",
        border: "border-indigo-500/20",
        textPrimary: "text-slate-50",
        textSecondary: "text-slate-400",
        accent: "text-cyan-400",
        cardBorder: "border-indigo-500/10",
        shadow: "shadow-lg shadow-indigo-500/10",
    },
};
