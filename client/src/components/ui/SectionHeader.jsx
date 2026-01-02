import { motion } from "framer-motion"
import clsx from "clsx"

/* ----------------------------------------
   Reusable Section Header
---------------------------------------- */
const SectionHeader = ({
  badge,
  title,
  subtitle,
  align = "center",
  className,
  textVariants
}) => {


  const textVariant = {
    default: "bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent",

  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {/* Badge */}
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="
            inline-block px-4 py-2 mb-4 rounded-full
            bg-pink-400/15 dark:bg-pink-400/10
            text-pink-500 dark:text-pink-400
            border border-pink-400/30
            backdrop-blur-md
            text-sm font-medium
          "
        >
          {badge}
        </motion.span>
      )}

      {/* Title */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
        <span
          className={clsx(textVariants == "default" && textVariant.default ,className)}
        >
          {title}
        </span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="
            text-slate-700 dark:text-white/75
            text-lg md:text-xl
            max-w-2xl
            mx-auto
          "
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeader
