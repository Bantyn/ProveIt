import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    features: ["Limited job posts", "Basic admin review", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹1,999 / mo",
    features: [
      "Unlimited job posts",
      "Priority admin review",
      "Advanced analytics",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    features: [
      "Dedicated account manager",
      "Instant verification",
      "Custom integrations",
    ],
  },
];

const PlanSelectionPage = ({ onSelect }) => {
  return (
    <div className="min-h-screen w-full bg-[#05070f] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-500/30 blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-indigo-500/30 blur-[160px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-20"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-4">
          Choose Your Plan
        </h1>
        <p className="text-center text-slate-400 mb-12">
          Select a plan that fits your hiring needs
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 hover:border-blue-500/60 transition"
            >
              <h3 className="text-lg font-semibold text-white">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold text-blue-400 mt-2">
                {plan.price}
              </p>

              <ul className="mt-6 space-y-3 text-slate-300 text-sm">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelect(plan)}
                className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PlanSelectionPage;
