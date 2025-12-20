import { motion } from "framer-motion";

const LoadingOverlay = ({ show, text = "Processing..." }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-gray-900 border border-gray-700 rounded-2xl px-8 py-6 text-center">
        <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-medium">{text}</p>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
