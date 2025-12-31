import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

/* ----------------------------------------
   Utility: class merge
---------------------------------------- */
const cx = (...classes) => classes.filter(Boolean).join(" ");

/* ----------------------------------------
   Main FAQ Component
---------------------------------------- */
export default function FAQ ({
  title = "FAQs",
  subtitle = "Frequently Asked Questions",
  categories = {},
  faqData = {},
  className = "",
}){
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section
      className={cx(
        "relative  px-4 py-16 bg-slate-50 dark:bg-neutral-900 text-neutral-900 dark:text-white",
        className
      )}
    >
      <FAQHeader title={title} subtitle={subtitle} />

      <FAQTabs
        categories={categories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />

      <FAQList faqData={faqData} selected={selectedCategory} />
    </section>
  );
};

/* ----------------------------------------
   Header
---------------------------------------- */
const FAQHeader = ({ title, subtitle }) => (
  <div className="relative z-10 mb-12 flex flex-col items-center text-center">
    <span className="mb-3 bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-medium">
      {subtitle}
    </span>

    <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>

    <span className="absolute -top-[300px] left-1/2 -translate-x-1/2 h-[450px] md:w-[550px] rounded-full bg-gradient-to-r from-violet-500/10 via-pink-500/5 to-blue-500/10 blur-3xl" />
  </div>
);

/* ----------------------------------------
   Tabs
---------------------------------------- */
const FAQTabs = ({ categories, selected, setSelected }) => (
  <div className="relative z-10 flex flex-wrap justify-center gap-3">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setSelected(key)}
        className={cx(
          "relative overflow-hidden rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
          selected === key
            ? "border-violet-500 text-white"
            : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-neutral-900 dark:hover:text-white"
        )}
      >
        <span className="relative z-10">{label}</span>

        <AnimatePresence>
          {selected === key && (
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: "backIn" }}
              className="absolute inset-0 z-0 bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400"
            />
          )}
        </AnimatePresence>
      </button>
    ))}
  </div>
);

/* ----------------------------------------
   FAQ List
---------------------------------------- */
const FAQList = ({ faqData, selected }) => (
  <div className="mx-auto mt-12 max-w-3xl">
    <AnimatePresence mode="wait">
      {Object.entries(faqData).map(([category, questions]) =>
        selected === category ? (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-4"
          >
            {questions.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </motion.div>
        ) : null
      )}
    </AnimatePresence>
  </div>
);

/* ----------------------------------------
   FAQ Item
---------------------------------------- */
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className={cx(
        "rounded-xl border transition-colors",
        open
          ? "bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/10"
          : "bg-white dark:bg-black border-gray-200 dark:border-white/5"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <span
          className={cx(
            "text-lg font-medium transition-colors",
            open
              ? "text-black dark:text-white"
              : "text-gray-600 dark:text-gray-400"
          )}
        >
          {question}
        </span>

        <motion.span
          variants={{ open: { rotate: 45 }, closed: { rotate: 0 } }}
          transition={{ duration: 0.2 }}
        >
          <Plus
            className={cx(
              "h-5 w-5",
              open
                ? "text-black dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            )}
          />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          marginBottom: open ? 16 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-4"
      >
        <p className="text-gray-600 dark:text-gray-400">{answer}</p>
      </motion.div>
    </motion.div>
  );
};
