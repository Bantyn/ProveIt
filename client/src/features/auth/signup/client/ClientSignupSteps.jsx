import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, User, Phone, GraduationCap, Calendar, Briefcase, Upload, CheckCircle, XCircle, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Step 2 Fields Component
export const Step2Fields = ({ formik, focusedField, setFocusedField, isDark, GlassInputWrapper }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      {/* College & Degree */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            College/University *
          </label>
          <GlassInputWrapper
            error={formik.touched.college && formik.errors.college}
            focused={focusedField === "college"}
            icon={GraduationCap}
            isDark={isDark}
          >
            <input
              type="text"
              name="college"
              placeholder="MIT"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                setFocusedField(null);
              }}
              onFocus={() => setFocusedField("college")}
              value={formik.values.college}
              className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none ${isDark
                ? "placeholder:text-gray-500 text-white"
                : "placeholder:text-gray-400 text-gray-900"
              }`}
            />
          </GlassInputWrapper>
          <AnimatePresence>
            {formik.touched.college && formik.errors.college && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs text-red-400 mt-2 flex items-center gap-1"
              >
                <XCircle className="w-3 h-3" />
                {formik.errors.college}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Degree *
          </label>
          <GlassInputWrapper
            error={formik.touched.degree && formik.errors.degree}
            focused={focusedField === "degree"}
            icon={Briefcase}
            isDark={isDark}
          >
            <input
              type="text"
              name="degree"
              placeholder="B.Tech Computer Science"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                setFocusedField(null);
              }}
              onFocus={() => setFocusedField("degree")}
              value={formik.values.degree}
              className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none ${isDark
                ? "placeholder:text-gray-500 text-white"
                : "placeholder:text-gray-400 text-gray-900"
              }`}
            />
          </GlassInputWrapper>
          <AnimatePresence>
            {formik.touched.degree && formik.errors.degree && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs text-red-400 mt-2 flex items-center gap-1"
              >
                <XCircle className="w-3 h-3" />
                {formik.errors.degree}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Graduation Year */}
      <div>
        <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Graduation Year *
        </label>
        <GlassInputWrapper
          error={formik.touched.graduationYear && formik.errors.graduationYear}
          focused={focusedField === "graduationYear"}
          icon={Calendar}
          isDark={isDark}
        >
          <input
            type="number"
            name="graduationYear"
            placeholder="2024"
            min="1950"
            max={new Date().getFullYear() + 10}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              setFocusedField(null);
            }}
            onFocus={() => setFocusedField("graduationYear")}
            value={formik.values.graduationYear}
            className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none ${isDark
              ? "placeholder:text-gray-500 text-white"
              : "placeholder:text-gray-400 text-gray-900"
            }`}
          />
        </GlassInputWrapper>
        <AnimatePresence>
          {formik.touched.graduationYear && formik.errors.graduationYear && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs text-red-400 mt-2 flex items-center gap-1"
            >
              <XCircle className="w-3 h-3" />
              {formik.errors.graduationYear}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Skills */}
      <div>
        <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Skills * <span className="text-xs opacity-70">(comma-separated, min 3, max 15)</span>
        </label>
        <GlassInputWrapper
          error={formik.touched.skills && formik.errors.skills}
          focused={focusedField === "skills"}
          icon={Sparkles}
          isDark={isDark}
        >
          <input
            type="text"
            name="skills"
            placeholder="React, Node.js, TypeScript, Python"
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              setFocusedField(null);
            }}
            onFocus={() => setFocusedField("skills")}
            value={formik.values.skills}
            className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none ${isDark
              ? "placeholder:text-gray-500 text-white"
              : "placeholder:text-gray-400 text-gray-900"
            }`}
          />
        </GlassInputWrapper>
        <AnimatePresence>
          {formik.touched.skills && formik.errors.skills && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs text-red-400 mt-2 flex items-center gap-1"
            >
              <XCircle className="w-3 h-3" />
              {formik.errors.skills}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Resume URL */}
      <div>
        <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Resume URL *
        </label>
        <GlassInputWrapper
          error={formik.touched.resumeUrl && formik.errors.resumeUrl}
          focused={focusedField === "resumeUrl"}
          icon={Upload}
          isDark={isDark}
        >
          <input
            type="url"
            name="resumeUrl"
            placeholder="https://drive.google.com/your-resume"
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              setFocusedField(null);
            }}
            onFocus={() => setFocusedField("resumeUrl")}
            value={formik.values.resumeUrl}
            className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none ${isDark
              ? "placeholder:text-gray-500 text-white"
              : "placeholder:text-gray-400 text-gray-900"
            }`}
          />
        </GlassInputWrapper>
        <AnimatePresence>
          {formik.touched.resumeUrl && formik.errors.resumeUrl && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs text-red-400 mt-2 flex items-center gap-1"
            >
              <XCircle className="w-3 h-3" />
              {formik.errors.resumeUrl}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="termsAccepted"
          id="termsAccepted"
          onChange={formik.handleChange}
          checked={formik.values.termsAccepted}
          className={`mt-1 w-4 h-4 cursor-pointer ${isDark ? "accent-purple-500" : "accent-purple-600"}`}
        />
        <label htmlFor="termsAccepted" className={`text-sm cursor-pointer ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          I agree to the{" "}
          <span className={`font-medium ${isDark ? "text-purple-400" : "text-purple-600"}`}>
            Terms of Service
          </span>{" "}
          and{" "}
          <span className={`font-medium ${isDark ? "text-purple-400" : "text-purple-600"}`}>
            Privacy Policy
          </span>
        </label>
      </div>
      <AnimatePresence>
        {formik.touched.termsAccepted && formik.errors.termsAccepted && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-red-400 flex items-center gap-1"
          >
            <XCircle className="w-3 h-3" />
            {formik.errors.termsAccepted}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Step 3: Plan Selection Component
export const Step3PlanSelection = ({ selectedPlan, setSelectedPlan, isDark }) => {
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Basic profile",
        "5 project showcases",
        "Community support",
        "Basic analytics",
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$19",
      period: "/month",
      features: [
        "Premium profile badge",
        "Unlimited projects",
        "Priority support",
        "Advanced analytics",
        "Featured in search",
        "Custom domain",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$49",
      period: "/month",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
      ],
      popular: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          Choose Your Plan
        </h3>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Select the plan that best fits your needs. You can upgrade anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all ${
              selectedPlan === plan.id
                ? isDark
                  ? "border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-500/20"
                  : "border-purple-600 bg-purple-50 shadow-lg shadow-purple-500/20"
                : isDark
                ? "border-purple-900/30 bg-purple-900/5 hover:border-purple-700/50"
                : "border-purple-200 bg-white hover:border-purple-300"
            }`}
          >
            {plan.popular && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold ${
                isDark ? "bg-purple-600 text-white" : "bg-purple-600 text-white"
              }`}>
                Most Popular
              </div>
            )}

            {selectedPlan === plan.id && (
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center ${
                isDark ? "bg-purple-600" : "bg-purple-600"
              }`}>
                <Check className="w-4 h-4 text-white" />
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h4 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h4>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      isDark ? "text-purple-400" : "text-purple-600"
                    }`} />
                    <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
