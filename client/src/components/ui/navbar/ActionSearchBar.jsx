import React, { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Send,
  Building2,
  Trophy,
  Briefcase,
  Code2,
  Users,
  ShieldCheck,
} from "lucide-react"

/* ---------------------------------- Utils --------------------------------- */

const cn = (...c) => c.filter(Boolean).join(" ")

function useDebounce(value, delay = 250) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])

  return debounced
}

/* -------------------------------- Dummy API ------------------------------- */

export const MOCK_ACTIONS = [
  {
    id: "c1",
    label: "Post a Job",
    description: "Company hiring challenge",
    icon: Briefcase,
    short: "⌘J",
    end: "Company",
  },
  {
    id: "c2",
    label: "Host Competition",
    description: "Skill-based hiring contest",
    icon: Trophy,
    short: "⌘C",
    end: "Competition",
  },
  {
    id: "c3",
    label: "Company Profile",
    description: "Manage company presence",
    icon: Building2,
    end: "Company",
  },
  {
    id: "c4",
    label: "Coding Challenge",
    description: "Project-based evaluation",
    icon: Code2,
    end: "Competition",
  },
  {
    id: "c5",
    label: "Team Management",
    description: "Recruiter & HR access",
    icon: Users,
    end: "Company",
  },
  {
    id: "c6",
    label: "Verified Submissions",
    description: "Plagiarism & AI checks",
    icon: ShieldCheck,
    end: "Trust",
  },
]
function fakeSearchApi(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) return resolve(MOCK_ACTIONS)
      resolve(
        MOCK_ACTIONS.filter((a) =>
          `${a.label} ${a.description}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      )
    }, 500)
  })
}

/* -------------------------------- Animations ------------------------------ */

const listAnim = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: -8 },
}

const itemAnim = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

/* -------------------------------- Component ------------------------------- */

export default function ActionSearchBar() {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [active, setActive] = useState(-1)

  const debounced = useDebounce(query)

  /* ------------------------------- API Call ------------------------------- */
  useEffect(() => {
    let mounted = true
    setLoading(true)

    fakeSearchApi(debounced).then((data) => {
      if (mounted) {
        setResults(data)
        setActive(-1)
        setLoading(false)
      }
    })

    return () => (mounted = false)
  }, [debounced])

  /* ------------------------------ Keyboard -------------------------------- */
  const onKeyDown = useCallback(
    (e) => {
      if (!results.length) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActive((i) => (i + 1) % results.length)
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActive((i) => (i - 1 + results.length) % results.length)
      }

      if (e.key === "Enter" && active >= 0) {
        console.log("Selected:", results[active])
        setOpen(false)
      }

      if (e.key === "Escape") {
        setOpen(false)
      }
    },
    [results, active]
  )

  return (
    <div className="relative hidden md:block w-[240px]">
      {/* Input */}
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKeyDown}
          placeholder="Search actions…"
          className={cn(
            "h-9 w-full rounded-full px-4 pr-9 text-sm",
            "bg-white/10 dark:bg-black/30",
            "border border-white/10",
            "text-black dark:text-white",
            "placeholder:text-black/50 dark:placeholder:text-white/40",
            "backdrop-blur-md focus:outline-none"
          )}
        />

        {/* Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <AnimatePresence mode="popLayout">
            {query ? (
              <motion.div
                key="send"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
                <Send className="h-4 w-4 opacity-60" />
              </motion.div>
            ) : (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
                <Search className="h-4 w-4 opacity-60" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            variants={listAnim}
            initial="hidden"
            animate="show"
            exit="exit"
            className={cn(
              "absolute mt-6 w-150 right-0 rounded-xl overflow-hidden z-50",
              "bg-white/90 dark:bg-black/80 backdrop-blur-xl",
              "border border-white/10 shadow-xl"
            )}
          >
            {loading && (
              <li className="px-4 py-3 text-sm opacity-60">
                Searching…
              </li>
            )}

            {!loading && results.length === 0 && (
              <li className="px-4 py-3 text-sm opacity-60">
                No results found
              </li>
            )}

            {!loading &&
              results.map((a, i) => {
                const Icon = a.icon
                return (
                  <motion.li
                    key={a.id}
                    variants={itemAnim}
                    onMouseDown={() => console.log("Selected:", a)}
                    className={cn(
                      "px-4 py-2 flex items-center justify-between cursor-pointer",
                      "hover:bg-black/5 dark:hover:bg-white/5",
                      i === active && "bg-black/10 dark:bg-white/10"
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <Icon className="h-5 w-5 text-pink-400" />
                      <div>
                        <p className="text-sm font-medium">{a.label}</p>
                        <p className="text-xs opacity-60">{a.description}</p>
                      </div>
                    </div>

                    <div className="text-xs opacity-50 flex gap-2">
                      {a.short && <span>{a.short}</span>}
                      {a.end && <span>{a.end}</span>}
                    </div>
                  </motion.li>
                )
              })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
