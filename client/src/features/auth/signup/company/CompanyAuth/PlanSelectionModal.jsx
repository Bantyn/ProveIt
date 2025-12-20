import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

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

const PlanSelectionModal = ({ show, onSelect }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full p-6"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Choose Your Plan
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border border-gray-700 rounded-xl p-5 hover:border-blue-500 transition"
            >
              <h3 className="text-lg font-semibold text-white">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold text-blue-400 mt-2">
                {plan.price}
              </p>

              <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelect(plan.id)}
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlanSelectionModal;
