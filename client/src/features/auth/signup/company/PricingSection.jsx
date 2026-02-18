import { motion } from "framer-motion";

/* ===================== Utils ===================== */
const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ===================== Data ===================== */
const PLANS = [
  {
    name: "Basic",
    desc: "Perfect for individuals starting out.",
    price: 12,
    isMostPop: false,
    features: [
      "Project-based hiring",
      "Candidate submissions",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Startup",
    desc: "Best for growing teams and startups.",
    price: 35,
    isMostPop: true,
    features: [
      "Everything in Basic",
      "Skill ranking",
      "Team collaboration",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    desc: "Advanced tools for large organizations.",
    price: 60,
    isMostPop: false,
    features: [
      "Everything in Startup",
      "Dedicated manager",
      "Advanced analytics",
      "Custom integrations",
    ],
  },
];

/* ===================== Small Components ===================== */

const SectionHeader = () => (
  <div className="relative max-w-xl mx-auto text-center">
    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200 tracking-tight text-3xl font-semibold sm:text-5xl py-2">
      Pricing for all sizes
    </h3>
    <p className="mt-3 text-black/40 dark:text-white/40">
      Simple pricing. No hidden fees. Cancel anytime.
    </p>
  </div>
);

const MostPopularBadge = () => (
  <span className="absolute -top-5 left-0 right-0 mx-auto w-32 px-3 py-2 rounded-full text-sm font-semibold text-white bg-indigo-600 shadow-lg shadow-indigo-500/30 text-center z-20">
    Most popular
  </span>
);

const FeatureItem = ({ children }) => (
  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-200">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-indigo-600"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      />
    </svg>
    {children}
  </li>
);

/* ===================== Card ===================== */

const PricingCard = ({ plan }) => {
  const { name, desc, price, features, isMostPop } = plan;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative flex flex-col rounded-[2rem] border-2 transition-all duration-300 group
        ${isMostPop
          ? "border-indigo-500 shadow-2xl shadow-indigo-500/20 bg-white dark:bg-zinc-900"
          : "border-gray-100 dark:border-white/10 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm hover:border-indigo-200 dark:hover:border-indigo-500/30"
        }`}
    >
      {isMostPop && <MostPopularBadge />}

      {/* Top */}
      <div className="p-8 space-y-4 border-b dark:border-white/10 relative overflow-hidden">
        {/* Hover Highlight for Component Name */}
        <div className="flex items-center justify-between">
          <motion.span
            whileHover={{ scale: 1.1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest transition-colors duration-300
              ${isMostPop
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white"
              }`}
          >
            {name}
          </motion.span>

          {isMostPop && <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />}
        </div>

        <div className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100">
          ${price}
          <span className={`text-lg font-medium ml-1 ${isMostPop ? "text-indigo-400" : "text-gray-400 font-normal"}`}> /mo</span>
        </div>

        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{desc}</p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-widest transition-all
            ${isMostPop
              ? "bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg shadow-indigo-600/30"
              : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-indigo-600 hover:dark:bg-indigo-100 shadow-md"
            }`}
        >
          Get Started
        </motion.button>
      </div>

      {/* Features */}
      <ul className="p-8 space-y-4 flex-1">
        <li className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 px-1">
          Platforms Perks
        </li>
        {features.map((feature, i) => (
          <FeatureItem key={i}>{feature}</FeatureItem>
        ))}
      </ul>

      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

/* ===================== Main Section ===================== */

export default function PricingSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-indigo-950/20 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeader />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <PricingCard key={idx} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
