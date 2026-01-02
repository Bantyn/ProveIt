import React from "react";

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
  <span className="absolute -top-5 left-0 right-0 mx-auto w-32 px-3 py-2 rounded-full text-sm font-semibold text-white bg-indigo-950/60 shadow-md text-center">
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
    <div className="relative flex flex-col rounded-xl border-2 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm">
      {isMostPop && <MostPopularBadge />}

      {/* Top */}
      <div className="p-8 space-y-4 border-b dark:border-white/10">
        <span className="text-indigo-600 font-medium">{name}</span>

        <div className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
          ${price}
          <span className="text-xl text-gray-500 font-normal"> /mo</span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>

        <button className="w-full rounded-md bg-gradient-to-br from-indigo-500 to-indigo-700 px-4 py-2 text-white font-medium transition-transform hover:scale-[1.03] active:scale-[0.97]">
          Get Started
        </button>
      </div>

      {/* Features */}
      <ul className="p-8 space-y-3">
        <li className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Features
        </li>
        {features.map((feature, i) => (
          <FeatureItem key={i}>{feature}</FeatureItem>
        ))}
      </ul>
    </div>
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
