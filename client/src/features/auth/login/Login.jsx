<<<<<<< HEAD
import React from 'react'
import Loader from '../../../components/ui/loader/ScreenLoader'
export default function Login() {
  
   const [loading, setLoading] = React.useState(true);
  const [fadeOut, setFadeOut] = React.useState(false);

  React.useEffect(() => {
    // Start fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 800); // when fade starts

    // Remove loader after animation
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 1200); // must be fade duration + buffer

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);
  return (
    <div className="relative min-h-screen">
      {loading && (
        <div
          className={`transition-opacity duration-500 ease-out ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Loader maxHeight={150} />
        </div>
      )}

      {!loading && (
        <div className="animate-fadeIn">
          {/* Your Login Page Content */}
        </div>
      )}
    </div>
  )
}
=======
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Github, Mail, Lock, ArrowRight, Sparkles, Moon, Sun } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import LightRays from '../../components/LightRays';

import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";

/* ----------------Brand Badge ---------------- */

const BrandBadge = ({ isDark }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs shadow-lg backdrop-blur-xl ${
      isDark
        ? "border-black/30 bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-200 shadow-purple-500/20"
        : "border-purple-400/40 bg-gradient-to-r from-purple-100/60 to-violet-100/60 text-purple-700 shadow-purple-400/30"
    }`}
  >
    <motion.span
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className={`h-2 w-2 rounded-full ${isDark ? "bg-purple-400" : "bg-purple-600"}`}
    />
    <Sparkles className="w-3 h-3" />
    Skill-verified hiring platform
  </motion.div>
);

/* ---------------- ICONS ---------------- */

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H24v8h11.303c-1.65 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

/* ---------------- UI WRAPPERS ---------------- */

const GlassInputWrapper = ({ children, error, focused, icon: Icon, isDark }) => (
  <div
    className={`rounded-2xl border backdrop-blur-sm transition-all duration-500 relative overflow-hidden group
      ${error
        ? "border-red-500/60 bg-red-500/10 shadow-lg shadow-red-500/20"
        : focused
        ? isDark
          ? "border-purple-400/80 bg-gradient-to-br from-purple-500/20 to-violet-500/20 shadow-2xl shadow-purple-500/40 scale-[1.02]"
          : "border-purple-500/80 bg-gradient-to-br from-purple-100/60 to-violet-100/60 shadow-2xl shadow-purple-400/40 scale-[1.02]"
        : isDark
        ? "border-white/10 bg-white/5 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20 hover:bg-white/10"
        : "border-gray-300/40 bg-white/40 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-400/30 hover:bg-purple-50/50"
      }
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:to-transparent
      before:translate-x-[-200%] group-hover:before:translate-x-[200%] before:transition-transform before:duration-1000
      ${isDark ? "before:via-white/20" : "before:via-purple-400/30"}`}
  >
    <motion.div
      animate={{
        y: focused ? -8 : 0,
        scale: focused ? 0.85 : 1,
        x: focused ? -2 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
    >
      <Icon className={`w-5 h-5 transition-colors duration-300 ${
        error 
          ? "text-red-400" 
          : focused 
          ? isDark ? "text-purple-400" : "text-purple-600"
          : isDark ? "text-gray-400" : "text-gray-600"
      }`} />
    </motion.div>
    
    {/* Animated border gradient */}
    {focused && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 rounded-2xl"
        style={{
          background: isDark 
            ? "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.3), transparent)"
            : "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent)",
          backgroundSize: "200% 100%",
        }}
      />
    )}
    
    {children}
  </div>
);

/* ---------------- VALIDATION ---------------- */

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)")
    .required("Password is required"),
});

/* ---------------- MAIN COMPONENT ---------------- */

export const SignInPage = ({
  heroImageSrc,
  onGoogleSignIn,
  onGithubSignIn,
  onResetPassword,
  onCreateAccount,
  defaultTheme = "dark"
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isDark, setIsDark] = useState(defaultTheme === "dark");

  /* AOS INIT */
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await new Promise((res) => setTimeout(res, 1500));
        toast.success("🎉 Login successful! Welcome back!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("LOGIN DATA:", values);
      } catch {
        toast.error("❌ Invalid credentials. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen w-full flex relative overflow-hidden transition-colors duration-500 ${
      isDark ? "text-white" : "text-gray-900"
    }`}>
      {/* Animated Background */}
      <div className={`absolute inset-0 transition-all duration-700 ${
        isDark 
          ? "bg-gradient-to-br from-black via-black/80 to-black"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      }`}>
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 ${isDark ? "opacity-30" : "opacity-20"}`}
          style={{
            backgroundImage: isDark
              ? "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)"
              : "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl ${
          isDark ? "bg-purple-500/20" : "bg-purple-300/30"
        }`}
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl ${
          isDark ? "bg-violet-500/20" : "bg-violet-300/30"
        }`}
      />

      {/* Theme Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl shadow-2xl transition-all ${
          isDark
            ? "bg-white/10 border border-white/20 text-purple-300 hover:bg-white/20 shadow-purple-500/30"
            : "bg-purple-100/80 border border-purple-200 text-purple-700 hover:bg-purple-200/80 shadow-purple-400/40"
        }`}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <ToastContainer
        position="top-right"
        theme={isDark ? "dark" : "light"}
        toastClassName={isDark 
          ? "backdrop-blur-xl bg-slate-900/90 border border-purple-500/20"
          : "backdrop-blur-xl bg-white/90 border border-purple-300/40"
        }
      />

      {/* LEFT */}
      <section className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className={`rounded-3xl border backdrop-blur-2xl shadow-2xl p-10 space-y-6 relative overflow-hidden ${
            isDark
              ? "border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-black/50"
              : "border-purple-200/50 bg-gradient-to-b from-white/80 to-white/60 shadow-purple-300/40"
          }`}>
            {/* Shimmer effect on card */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)"
                  : "linear-gradient(45deg, transparent 30%, rgba(168, 85, 247,0.4) 50%, transparent 70%)",
                backgroundSize: "200% 200%",
              }}
            />

            <div className="relative z-10 space-y-6">
              <BrandBadge isDark={isDark} />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className={`text-5xl font-bold tracking-tight leading-tight ${
                  isDark 
                    ? "bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                    : "text-gray-900"
                }`}>
                  Welcome to <br />
                  <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                    ProveIt
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Showcase your skills through real projects. Get hired based on proven expertise, not just claims.
              </motion.p>

              <div className="space-y-6" data-aos="fade-up">
                {/* EMAIL */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className={`text-sm font-medium mb-2 block ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Email Address
                  </label>
                  <GlassInputWrapper
                    error={formik.touched.email && formik.errors.email}
                    focused={focusedField === "email"}
                    icon={Mail}
                    isDark={isDark}
                  >
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="your.email@company.com"
                        onChange={formik.handleChange}
                        onBlur={(e) => {
                          formik.handleBlur(e);
                          setFocusedField(null);
                        }}
                        onFocus={() => setFocusedField("email")}
                        value={formik.values.email}
                        className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none transition-all ${
                          isDark 
                            ? "placeholder:text-gray-500 text-white" 
                            : "placeholder:text-gray-400 text-gray-900"
                        }`}
                      />
                    </div>
                  </GlassInputWrapper>
                  <AnimatePresence>
                    {formik.touched.email && formik.errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-red-400 mt-2 flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-red-400" />
                        {formik.errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* PASSWORD */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className={`text-sm font-medium mb-2 block ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Password
                  </label>
                  <GlassInputWrapper
                    error={formik.touched.password && formik.errors.password}
                    focused={focusedField === "password"}
                    icon={Lock}
                    isDark={isDark}
                  >
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        onChange={formik.handleChange}
                        onBlur={(e) => {
                          formik.handleBlur(e);
                          setFocusedField(null);
                        }}
                        onFocus={() => setFocusedField("password")}
                        value={formik.values.password}
                        className={`w-full bg-transparent p-4 pl-14 pr-12 text-sm focus:outline-none transition-all ${
                          isDark 
                            ? "placeholder:text-gray-500 text-white" 
                            : "placeholder:text-gray-400 text-gray-900"
                        }`}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                          isDark 
                            ? "text-gray-400 hover:text-purple-400" 
                            : "text-gray-500 hover:text-purple-600"
                        }`}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                  </GlassInputWrapper>
                  <AnimatePresence>
                    {formik.touched.password && formik.errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-red-400 mt-2 flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-red-400" />
                        {formik.errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* OPTIONS */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-between text-sm"
                >
                  <label className="flex gap-2 items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      onChange={formik.handleChange}
                      className={`w-4 h-4 cursor-pointer ${
                        isDark ? "accent-purple-500" : "accent-purple-600"
                      }`}
                    />
                    <span className={`transition-colors ${
                      isDark 
                        ? "text-gray-300 group-hover:text-white" 
                        : "text-gray-600 group-hover:text-gray-900"
                    }`}>
                      Keep me signed in
                    </span>
                  </label>
                  <motion.button
                    whileHover={{ x: 3 }}
                    type="button"
                    onClick={onResetPassword}
                    className={`transition-colors font-medium ${
                      isDark 
                        ? "text-purple-400 hover:text-purple-300" 
                        : "text-purple-600 hover:text-purple-700"
                    }`}
                  >
                    Forgot password?
                  </motion.button>
                </motion.div>

                {/* SUBMIT */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: isDark 
                      ? "0 20px 40px rgba(168, 85, 247, 0.4)" 
                      : "0 20px 40px rgba(168, 85, 247, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleSubmit}
                  disabled={formik.isSubmitting}
                  className={`w-full rounded-2xl py-4 font-semibold tracking-wide text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group ${
                    isDark
                      ? "bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 hover:from-purple-500 hover:via-violet-500 hover:to-purple-500 shadow-2xl shadow-purple-600/50"
                      : "bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 hover:from-purple-700 hover:via-violet-700 hover:to-purple-700 shadow-2xl shadow-purple-500/40"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {formik.isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Verifying credentials...
                      </>
                    ) : (
                      <>
                        Continue to Dashboard
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.button>
              </div>

              {/* DIVIDER */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className={`relative flex items-center gap-4 text-xs uppercase tracking-wider my-8 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span className={`flex-1 border-t ${isDark ? "border-white/10" : "border-gray-300"}`} />
                <span className={`px-3 font-semibold ${
                  isDark 
                    ? "bg-gradient-to-r from-purple-400/80 to-violet-400/80 bg-clip-text text-transparent"
                    : "text-purple-700"
                }`}>
                  Or continue with
                </span>
                <span className={`flex-1 border-t ${isDark ? "border-white/10" : "border-gray-300"}`} />
              </motion.div>

              {/* OAUTH BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="space-y-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onGoogleSignIn}
                  className={`w-full flex items-center justify-center gap-3 rounded-xl py-4 border backdrop-blur-xl group transition-all shadow-lg ${
                    isDark
                      ? "bg-white/10 border-white/20 hover:bg-white/15 hover:border-purple-400/50 hover:shadow-purple-500/20"
                      : "bg-white/80 border-gray-300 hover:bg-white hover:border-purple-400/60 hover:shadow-purple-400/30"
                  }`}
                >
                  <GoogleIcon />
                  <span className="font-medium">Continue with Google</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onGithubSignIn}
                  className={`w-full flex items-center justify-center gap-3 rounded-xl py-4 border backdrop-blur-xl group transition-all shadow-lg ${
                    isDark
                      ? "bg-gradient-to-r from-gray-800 to-gray-900 border-white/20 hover:from-gray-700 hover:to-gray-800 hover:border-purple-400/50 hover:shadow-purple-500/20"
                      : "bg-gradient-to-r from-gray-800 to-gray-900 border-gray-800 hover:from-gray-700 hover:to-gray-800 hover:border-purple-500/50 hover:shadow-purple-400/30 text-white"
                  }`}
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium">Continue with GitHub</span>
                  <span className={`px-2 py-0.5 text-[10px] rounded-full border ${
                    isDark
                      ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                      : "bg-purple-100 text-purple-700 border-purple-300"
                  }`}>
                    Recommended
                  </span>
                </motion.button>
              </motion.div>

              {/* FOOTER */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className={`text-center text-sm pt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                New to ProveIt?{" "}
                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={onCreateAccount}
                  className={`font-semibold transition-colors inline-flex items-center gap-1 ${
                    isDark 
                      ? "text-purple-400 hover:text-purple-300" 
                      : "text-purple-600 hover:text-purple-700"
                  }`}
                >
                  Create your account
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* RIGHT */}
      {heroImageSrc && (
        <section className="hidden lg:flex flex-1 relative p-8">
          <motion.div
            initial={{ scale: 1.1, opacity: 0, x: 100 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`relative w-full h-full rounded-3xl overflow-hidden border shadow-2xl ${
              isDark ? "border-white/10" : "border-purple-200/50"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImageSrc})` }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-indigo-600/20" />
{/* Floating testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className={`absolute bottom-8 left-8 right-8 p-6 rounded-2xl backdrop-blur-xl border shadow-2xl ${
            isDark
              ? "bg-white/10 border-white/20"
              : "bg-white/80 border-purple-200/50"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              isDark
                ? "bg-gradient-to-br from-purple-400 to-violet-500"
                : "bg-gradient-to-br from-purple-500 to-violet-600"
            }`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className={`text-sm leading-relaxed mb-2 ${
                isDark ? "text-white" : "text-gray-800"
              }`}>
                "ProveIt revolutionized how I showcase my skills. Got hired within 2 weeks!"
              </p>
              <p className={`text-xs font-medium ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}>
                Sarah Chen — Senior Developer at TechCorp
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )}
</div>
);
};
/* ---------------- DEMO ---------------- */
const LoginPage = () => (
<SignInPage
heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
onGoogleSignIn={() => toast.info("🚀 Google login integration coming soon!", {
icon: "🔐",
})}
onGithubSignIn={() => toast.info("🚀 GitHub OAuth integration coming soon!", {
icon: "💻",
})}
onResetPassword={() => toast.info("📧 Password reset flow coming soon!", {
icon: "🔑",
})}
onCreateAccount={() => toast.info("✨ Redirecting to registration...", {
icon: "🎉",
})}
defaultTheme="dark"
/>
);
export default LoginPage;
>>>>>>> bf292ce14d9fcff35b80b3af4f3421dea5cd1366
