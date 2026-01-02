import { motion } from "framer-motion"
import clsx from "clsx"
import { ArrowRight } from "lucide-react"
import {Link} from "react-router-dom"


export const aActionButton = ({
  children,
  variant = "primary",
  icon: Icon,
  showArrow = false,
  className,
  url,
}) => {
    const variants = {
        primary:
          `
          bg-gradient-to-r from-pink-400 to-blue-400
          text-neutral-900 dark:text-neutral-950
          hover:from-pink-500 hover:to-blue-500
          hover:shadow-lg hover:shadow-pink-400/30
          dark:hover:shadow-blue-400/30
          `,
      
        secondary:
          `
          bg-white/70 dark:bg-white/10
          text-neutral-900 dark:text-white
          border border-black/10 dark:border-white/20
          hover:bg-pink-50 dark:hover:bg-white/20
          hover:text-pink-500
          backdrop-blur-md
          `,
      
        outline:
          `
          bg-transparent
          border border-pink-400/60 dark:border-pink-400/50
          text-pink-500 dark:text-pink-400
          hover:bg-pink-400/10 dark:hover:bg-pink-400/20
          `,
      }
      
  return (
    <a
      href={url}
      className={clsx(
        "relative group px-8 py-4 rounded-xl font-semibold font-display text-base flex items-center gap-3 transition-all duration-300",
        variants[variant],
        className
      )}
    >
      {/* Optional Icon */}
      {Icon && <Icon className="w-5 h-5" />}

      {children}

      {/* Arrow Animation */}
      {showArrow && (
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      )}

      {/* Shine Effect (Primary Only) */}
      {variant === "primary" && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
      )}
    </a>
  )
}
export default aActionButton