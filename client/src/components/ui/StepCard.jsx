import { motion } from "framer-motion"
import clsx from "clsx"

const StatCard = ({
  icon: Icon,
  title,
  description,
  trend,
  trendUp = true,
  delay = 0,
  gradient = "primary",
}) => {
  const gradientClasses = {
    primary: "from-pink-400/25 via-purple-400/20 to-blue-400/10",
    secondary: "from-blue-400/25 via-cyan-400/20 to-transparent",
    accent: "from-purple-400/25 via-pink-400/20 to-transparent",
  }

  const iconBgClasses = {
    primary: "bg-pink-400/15 text-pink-400 border border-pink-400/30",
    secondary: "bg-blue-400/15 text-blue-400 border border-blue-400/30",
    accent: "bg-purple-400/15 text-purple-400 border border-purple-400/30",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30,filter: "blur(10px)"}}
      whileInView={{ opacity: 1, y: 0,filter: "blur(0px)"}}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      <div
        className={clsx(
          "relative overflow-hidden rounded-3xl p-6 hover:-translate-y-2",
          "bg-white/60 dark:bg-white/5 backdrop-blur-xl",
          "border border-white/20 dark:border-white/10",
          "hover:border-white/40 transition-all duration-500"
        )}
      >
        {/* Hover Gradient */}
        <div
          className={clsx(
            "absolute inset-0 bg-gradient-to-br opacity-0",
            "group-hover:opacity-100 transition-opacity duration-700 ",
            gradientClasses[gradient]
          )}
        />

        <div className="relative z-10 ">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={clsx(
                "p-3 rounded-2xl backdrop-blur-md",
                iconBgClasses[gradient]
              )}
            >
              <Icon className="w-6 h-6" />
            </div>

            {trend && (
              <span
                className={clsx(
                  "text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-md",
                  trendUp
                    ? "bg-emerald-400/15 text-emerald-400 border-emerald-400/30"
                    : "bg-red-400/15 text-red-400 border-red-400/30"
                )}
              >
                {trendUp ? "↑" : "↓"} {trend}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold font-display mb-2 text-slate-900 dark:text-white">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Glow */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-400/20 via-purple-400/10 to-transparent blur-3xl group-hover:scale-150 transition-transform duration-700" />
      </div>
    </motion.div>
  )
}

export default StatCard
