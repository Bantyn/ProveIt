import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Github, Mail, Lock, ArrowRight, ArrowLeft, Sparkles, Moon, Sun, User, Phone, GraduationCap, Calendar, Briefcase, Upload, CheckCircle, XCircle, Check } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import { Step2Fields, Step3PlanSelection } from './ClientSignupSteps';
import Step3Summary from './Step3Summary';
import PlanSelectionModal from '../../../components/PlanSelectionModal';

import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";


/* ----------------Brand Badge ---------------- */
const BrandBadge = ({ isDark }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs shadow-sm ${isDark
      ? "border-violet-500/30 bg-violet-900/20 text-violet-300"
      : "border-violet-300 bg-violet-50 text-violet-700"
      }`}
  >
    <span className={`h-2 w-2 rounded-full ${isDark ? "bg-violet-400" : "bg-violet-600"}`} />
    <Sparkles className="w-3 h-3" />
    Join the skill-verified community
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
const GlassInputWrapper = ({ children, error, focused, icon: Icon, isDark, success }) => (
  <div
    className={`rounded-xl border transition-all duration-300 relative overflow-hidden
        ${error
        ? "border-red-500/60 bg-red-500/5"
        : success
          ? "border-green-500/60 bg-green-500/5"
          : focused
            ? isDark
              ? "border-violet-500 bg-violet-900/10 shadow-lg shadow-violet-500/10"
              : "border-violet-500 bg-violet-50 shadow-lg shadow-violet-500/10"
            : isDark
              ? "border-violet-900/30 bg-violet-900/5 hover:border-violet-700/50"
              : "border-violet-200 bg-white hover:border-violet-300"
      }`}
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
      <Icon className={`w-5 h-5 transition-colors duration-300 ${error
        ? "text-red-400"
        : success
          ? "text-green-400"
          : focused
            ? isDark ? "text-violet-400" : "text-violet-600"
            : isDark ? "text-gray-500" : "text-gray-400"
        }`} />
    </motion.div>

    {children}
  </div>
);

/* ---------------- VALIDATION ---------------- */
const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces")
    .required("Full name is required"),

  email: Yup.string()
    .email("Enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format"
    )
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),

  college: Yup.string()
    .min(2, "College name must be at least 2 characters")
    .max(100, "College name must not exceed 100 characters")
    .required("College/University name is required"),

  degree: Yup.string()
    .min(2, "Degree must be at least 2 characters")
    .max(50, "Degree must not exceed 50 characters")
    .required("Degree is required"),

  graduationYear: Yup.number()
    .min(1950, "Graduation year must be after 1950")
    .max(new Date().getFullYear() + 10, `Graduation year cannot exceed ${new Date().getFullYear() + 10}`)
    .required("Graduation year is required")
    .typeError("Graduation year must be a valid number"),

  skills: Yup.string()
    .test("min-skills", "Please enter at least 3 skills", (value) => {
      if (!value) return false;
      const skillsArray = value.split(",").map(s => s.trim()).filter(s => s.length > 0);
      return skillsArray.length >= 3;
    })
    .test("max-skills", "Maximum 15 skills allowed", (value) => {
      if (!value) return true;
      const skillsArray = value.split(",").map(s => s.trim()).filter(s => s.length > 0);
      return skillsArray.length <= 15;
    })
    .required("Skills are required"),

  resumeUrl: Yup.string()
    .url("Please enter a valid URL")
    .matches(
      /^https?:\/\/.+/,
      "Resume URL must start with http:// or https://"
    )
    .required("Resume URL is required"),

  termsAccepted: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

/* ---------------- MAIN COMPONENT ---------------- */
export const RegisterPage = ({
  heroImageSrc,
  onGoogleSignUp,
  onGithubSignUp,
  onSignIn,
  defaultTheme = "dark"
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isDark, setIsDark] = useState(defaultTheme === "dark");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [showPlanModal, setShowPlanModal] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  const parseSkills = (value = "") =>
    value
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

  const showSuccessToast = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: "✨",
    });

  // Step validation schemas
  const step1Schema = Yup.object({
    fullName: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must not exceed 50 characters")
      .matches(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces")
      .required("Full name is required"),
    email: Yup.string()
      .email("Enter a valid email address")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const step2Schema = Yup.object({
    college: Yup.string()
      .min(2, "College name must be at least 2 characters")
      .max(100, "College name must not exceed 100 characters")
      .required("College/University name is required"),
    degree: Yup.string()
      .min(2, "Degree must be at least 2 characters")
      .max(50, "Degree must not exceed 50 characters")
      .required("Degree is required"),
    graduationYear: Yup.number()
      .min(1950, "Graduation year must be after 1950")
      .max(new Date().getFullYear() + 10, `Graduation year cannot exceed ${new Date().getFullYear() + 10}`)
      .required("Graduation year is required")
      .typeError("Graduation year must be a valid number"),
    skills: Yup.string()
      .test("min-skills", "Please enter at least 3 skills", (value) => {
        if (!value) return false;
        const skillsArray = value.split(",").map(s => s.trim()).filter(s => s.length > 0);
        return skillsArray.length >= 3;
      })
      .test("max-skills", "Maximum 15 skills allowed", (value) => {
        if (!value) return true;
        const skillsArray = value.split(",").map(s => s.trim()).filter(s => s.length > 0);
        return skillsArray.length <= 15;
      })
      .required("Skills are required"),
    resumeUrl: Yup.string()
      .url("Please enter a valid URL")
      .matches(/^https?:\/\/.+/, "Resume URL must start with http:// or https://")
      .required("Resume URL is required"),
    termsAccepted: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  });


  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      college: "",
      degree: "",
      graduationYear: "",
      skills: "",
      resumeUrl: "",
      termsAccepted: false,
      selectedPlan: "free",
    },

    validationSchema: currentStep === 1 ? step1Schema : step2Schema,

    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        await new Promise(res => setTimeout(res, 2000));

        const userData = {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          role: "user",
          isVerified: false,
          isBlocked: false,
          education: {
            college: values.college,
            degree: values.degree,
            graduationYear: Number(values.graduationYear),
          },
          skills: parseSkills(values.skills),
          resumeUrl: values.resumeUrl,
          subscriptionPlan: selectedPlan,
          hasPriorityAccess: selectedPlan !== "free",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        console.log("REGISTRATION DATA:", userData);

        showSuccessToast("🎉 Registration successful! Welcome to ProveIt!");

        setTimeout(() => {
          toast.info("📧 Please check your email to verify your account", {
            position: "top-right",
            autoClose: 5000,
            icon: "📬",
          });
        }, 1000);

      } catch (error) {
        toast.error("❌ Registration failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleNextStep = async () => {
    if (currentStep === 1) {
      // Validate step 1 fields
      const step1Fields = ['fullName', 'email', 'phone', 'password', 'confirmPassword'];
      const errors = await formik.validateForm();
      const step1Errors = Object.keys(errors).filter(key => step1Fields.includes(key));

      if (step1Errors.length > 0) {
        step1Errors.forEach(field => {
          formik.setFieldTouched(field, true);
        });
        toast.error("⚠️ Please fill all required fields correctly", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate step 2 fields
      const step2Fields = ['college', 'degree', 'graduationYear', 'skills', 'resumeUrl', 'termsAccepted'];
      const errors = await formik.validateForm();
      const step2Errors = Object.keys(errors).filter(key => step2Fields.includes(key));

      if (step2Errors.length > 0) {
        step2Errors.forEach(field => {
          formik.setFieldTouched(field, true);
        });
        toast.error("⚠️ Please fill all required fields correctly", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 3) {
      formik.handleSubmit();
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const getFieldSuccess = (name) =>
    Boolean(
      formik.touched?.[name] &&
      !formik.errors?.[name] &&
      formik.values?.[name]
    );


  const showErrorToast = (msg) =>
    toast.error(`⚠️ ${msg}`, { autoClose: 3000 });


  return (
    <div className={`w-full flex relative overflow-hidden transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"
      }`}>
      {/* Simple Background - No animations */}
      <div className={`absolute inset-0 transition-all duration-700 ${isDark
        ? "bg-black"
        : "bg-white"
        }`}>
      </div>

      {/* Subtle static gradient overlay */}
      <div className={`absolute inset-0 ${isDark
        ? "bg-gradient-to-br from-violet-900/10 via-transparent to-violet-900/10"
        : "bg-gradient-to-br from-violet-50/50 via-transparent to-violet-50/50"
        }`} />

      {/* Theme Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-xl shadow-lg transition-all ${isDark
          ? "bg-violet-900/30 border border-violet-500/20 text-violet-400 hover:bg-violet-900/50"
          : "bg-white border border-violet-200 text-violet-600 hover:bg-violet-50"
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
          ? "backdrop-blur-xl bg-slate-900/90 border border-violet-500/20"
          : "backdrop-blur-xl bg-white/90 border border-violet-300/40"
        }
      />

      {/* LEFT - Content Section (Half Width - Always show) */}
      <section className="w-1/2 hidden lg:flex relative p-8">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          {/* Main Content Container with Border */}
          <div className={`h-full rounded-2xl border shadow-xl p-10 space-y-6 relative overflow-hidden ${isDark
            ? 'border-violet-900/30 bg-black'
            : 'border-violet-200 bg-white'
            }`}>
            {/* Logo Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`mb-12 p-12 rounded-3xl border-2 border-dashed flex items-center justify-center ${isDark
                ? 'border-violet-500/30 bg-violet-600/5'
                : 'border-violet-300 bg-violet-50'
                }`}
            >
              <div className="text-center">
                <div className={`text-6xl mb-3 ${isDark ? 'text-violet-400' : 'text-violet-600'
                  }`}>
                  🚀
                </div>
                <p className={`text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                  Logo Coming Soon
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {[
                { value: '50K+', label: 'Users' },
                { value: '500+', label: 'Projects' },
                { value: '94%', label: 'Success' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl text-center ${isDark
                    ? 'bg-violet-600/10 border border-violet-500/20'
                    : 'bg-violet-100 border border-violet-300'
                    }`}
                >
                  <div className="text-2xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className={`text-xs font-medium mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                }`}>
                Why Join ProveIt?
              </h3>
              {[
                { icon: '✨', text: 'Join skill-based competitions' },
                { icon: '🎯', text: 'Get noticed by top companies' },
                { icon: '🏆', text: 'Build your portfolio' },
                { icon: '⚡', text: 'Land your dream job faster' }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className={`font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={`p-6 rounded-2xl backdrop-blur-xl border ${isDark
                ? 'bg-violet-600/10 border-violet-500/20'
                : 'bg-white border-violet-200'
                }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isDark
                  ? 'bg-gradient-to-br from-violet-400 to-blue-400'
                  : 'bg-gradient-to-br from-violet-500 to-blue-600'
                  }`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`text-sm leading-relaxed mb-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                    }`}>
                    "Joining ProveIt was the best career decision I made. Landed my dream job in just 3 weeks!"
                  </p>
                  <p className={`text-xs font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                    Marcus Johnson — Full Stack Engineer
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Additional Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className={`pt-6 border-t ${isDark ? 'border-violet-500/20' : 'border-violet-300'
                }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                    Active job seekers
                  </span>
                  <span className="text-violet-400 font-semibold">50,000+</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                    Projects completed
                  </span>
                  <span className="text-blue-400 font-semibold">500+</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                    Hiring success rate
                  </span>
                  <span className="text-violet-400 font-semibold">94%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* RIGHT - Form Section (Half Width) */}
      <section className="w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div className={`h-full rounded-2xl border shadow-xl p-10 space-y-6 relative overflow-hidden ${isDark
            ? "border-violet-900/30 bg-black"
            : "border-violet-200 bg-white"
            }`}>

            <div className="relative z-10 space-y-6">
              <BrandBadge isDark={isDark} />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-5xl font-bold tracking-tight leading-tight">
                  <span className={isDark ? "text-neutral-100" : "text-neutral-900"}>Start Your</span> <br />
                  <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    Success Journey
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-sm leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
              >
                Create your account to unlock exclusive features and connect with top employers.
              </motion.p>

              {/* OAuth Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onGoogleSignUp}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 border group transition-all shadow-sm ${isDark
                    ? "bg-violet-900/10 border-violet-700/30 hover:bg-violet-900/20 hover:border-violet-600/50"
                    : "bg-white border-violet-200 hover:bg-violet-50 hover:border-violet-300"
                    }`}
                >
                  <GoogleIcon />
                  <span className="font-medium text-sm">Google</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onGithubSignUp}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 border group transition-all shadow-sm ${isDark
                    ? "bg-gray-900 border-violet-700/30 hover:bg-gray-800 hover:border-violet-600/50"
                    : "bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-violet-500/50 text-white"
                    }`}
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium text-sm">GitHub</span>
                </motion.button>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className={`relative flex items-center gap-4 text-xs uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-neutral-600"
                  }`}
              >
                <span className={`flex-1 border-t ${isDark ? "border-white/10" : "border-gray-300"}`} />
                <span className={`px-3 font-semibold ${isDark
                  ? "bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent"
                  }`}>
                  Or register with email
                </span>
                <span className={`flex-1 border-t ${isDark ? "border-white/10" : "border-gray-300"}`} />
              </motion.div>

              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${currentStep === step
                      ? isDark
                        ? "border-violet-500 bg-violet-500 text-white"
                        : "border-violet-600 bg-violet-600 text-white"
                      : currentStep > step
                        ? isDark
                          ? "border-violet-500 bg-violet-900/30 text-violet-400"
                          : "border-violet-600 bg-violet-100 text-violet-600"
                        : isDark
                          ? "border-violet-900/30 bg-transparent text-neutral-500"
                          : "border-gray-300 bg-transparent text-gray-400"
                      }`}>
                      {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`w-12 h-0.5 mx-1 ${currentStep > step
                        ? isDark ? "bg-violet-500" : "bg-violet-600"
                        : isDark ? "bg-violet-900/30" : "bg-neutral-300"
                        }`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className={`text-sm font-medium ${isDark ? "text-neutral-300" : "text-neutral-900"}`}>
                  {currentStep === 1 && "Step 1: Basic Information"}
                  {currentStep === 2 && "Step 2: Professional Details"}
                  {currentStep === 3 && "Step 3: Review & Select Plan"}
                </p>
              </div>

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {/* Full Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`text-sm font-medium mb-2 block ${isDark ? "text-neutral-300" : "text-neutral-900"}`}>
                        Full Name *
                      </label>
                      <GlassInputWrapper
                        error={formik.touched.fullName && formik.errors.fullName}
                        focused={focusedField === "fullName"}
                        icon={User}
                        isDark={isDark}
                      >
                        <input
                          type="text"
                          name="fullName"
                          placeholder="John Doe"
                          onChange={formik.handleChange}
                          onBlur={(e) => {
                            formik.handleBlur(e);
                            setFocusedField(null);
                          }}
                          onFocus={() => setFocusedField("fullName")}
                          value={formik.values.fullName}
                          className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none ${isDark
                            ? "placeholder:text-neutral-500 text-neutral-100"
                            : "placeholder:text-neutral-400 text-neutral-900"
                            }`}
                        />
                      </GlassInputWrapper>
                      <AnimatePresence>
                        {formik.touched.fullName && formik.errors.fullName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xs text-red-400 mt-2 flex items-center gap-1"
                          >
                            <XCircle className="w-3 h-3" />
                            {formik.errors.fullName}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className={`text-sm font-medium mb-2 block ${isDark ? "text-neutral-300" : "text-neutral-900"}`}>
                        Email Address *
                      </label>
                      <GlassInputWrapper
                        error={formik.touched.email && formik.errors.email}
                        focused={focusedField === "email"}
                        icon={Mail}
                        isDark={isDark}
                      >
                        <input
                          type="email"
                          name="email"
                          placeholder="john@company.com"
                          onChange={formik.handleChange}
                          onBlur={(e) => {
                            formik.handleBlur(e);
                            setFocusedField(null);
                          }}
                          onFocus={() => setFocusedField("email")}
                          value={formik.values.email}
                          className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none ${isDark
                            ? "placeholder:text-neutral-500 text-neutral-100"
                            : "placeholder:text-neutral-400 text-neutral-900"
                            }`}
                        />
                      </GlassInputWrapper>
                      <AnimatePresence>
                        {formik.touched.email && formik.errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xs text-red-400 mt-2 flex items-center gap-1"
                          >
                            <XCircle className="w-3 h-3" />
                            {formik.errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={`text-sm font-medium mb-2 block ${isDark ? "text-neutral-300" : "text-neutral-900"}`}>
                      Phone Number *
                    </label>
                    <GlassInputWrapper
                      error={formik.touched.phone && formik.errors.phone}
                      focused={focusedField === "phone"}
                      icon={Phone}
                      isDark={isDark}
                    >
                      <input
                        type="tel"
                        name="phone"
                        placeholder="9876543210"
                        maxLength="10"
                        onChange={formik.handleChange}
                        onBlur={(e) => {
                          formik.handleBlur(e);
                          setFocusedField(null);
                        }}
                        onFocus={() => setFocusedField("phone")}
                        value={formik.values.phone}
                        className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none ${isDark
                          ? "placeholder:text-neutral-500 text-neutral-100"
                          : "placeholder:text-neutral-400 text-neutral-900"
                          }`}
                      />
                    </GlassInputWrapper>
                    <AnimatePresence>
                      {formik.touched.phone && formik.errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-xs text-red-400 mt-2 flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          {formik.errors.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Password *
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
                            placeholder="••••••••"
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              setFocusedField(null);
                            }}
                            onFocus={() => setFocusedField("password")}
                            value={formik.values.password}
                            className={`w-full bg-transparent p-4 pl-14 pr-12 text-sm focus:outline-none ${isDark
                              ? "placeholder:text-gray-500 text-white"
                              : "placeholder:text-gray-400 text-gray-900"
                              }`}
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isDark
                              ? "text-gray-400 hover:text-purple-400"
                              : "text-gray-500 hover:text-purple-600"
                              }`}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                            <XCircle className="w-3 h-3" />
                            {formik.errors.password}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Confirm Password *
                      </label>
                      <GlassInputWrapper
                        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        focused={focusedField === "confirmPassword"}
                        icon={Lock}
                        isDark={isDark}
                      >
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="••••••••"
                            onChange={formik.handleChange}
                            onBlur={(e) => {
                              formik.handleBlur(e);
                              setFocusedField(null);
                            }}
                            onFocus={() => setFocusedField("confirmPassword")}
                            value={formik.values.confirmPassword}
                            className={`w-full bg-transparent p-4 pl-14 pr-12 text-sm focus:outline-none ${isDark
                              ? "placeholder:text-gray-500 text-white"
                              : "placeholder:text-gray-400 text-gray-900"
                              }`}
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isDark
                              ? "text-gray-400 hover:text-purple-400"
                              : "text-gray-500 hover:text-purple-600"
                              }`}
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </motion.button>
                        </div>
                      </GlassInputWrapper>
                      <AnimatePresence>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xs text-red-400 mt-2 flex items-center gap-1"
                          >
                            <XCircle className="w-3 h-3" />
                            {formik.errors.confirmPassword}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleNextStep}
                    className={`w-full rounded-xl py-4 font-semibold tracking-wide text-white transition-all ${isDark
                      ? "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/20"
                      : "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                      }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Continue to Professional Details
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Professional Details */}
              {currentStep === 2 && (
                <>
                  <Step2Fields
                    formik={formik}
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    isDark={isDark}
                    GlassInputWrapper={GlassInputWrapper}
                  />

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handlePrevStep}
                      className={`flex-1 rounded-xl py-4 font-semibold tracking-wide transition-all ${isDark
                        ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 border border-purple-700/30"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300"
                        }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        Back
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleNextStep}
                      className={`flex-1 rounded-xl py-4 font-semibold tracking-wide text-white transition-all ${isDark
                        ? "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/20"
                        : "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                        }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Continue to Plans
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </motion.button>
                  </div>
                </>
              )}

              {/* Step 3: Review & Plan Selection */}
              {currentStep === 3 && (
                <>
                  <Step3Summary
                    formik={formik}
                    setCurrentStep={setCurrentStep}
                    onOpenPlanModal={() => setShowPlanModal(true)}
                    isDark={isDark}
                  />

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handlePrevStep}
                      className={`flex-1 rounded-xl py-4 font-semibold tracking-wide transition-all ${isDark
                        ? "bg-violet-900/20 text-violet-400 hover:bg-violet-900/30 border border-violet-700/30"
                        : "bg-violet-100 text-violet-700 hover:bg-violet-200 border border-violet-300"
                        }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        Back
                      </span>
                    </motion.button>
                  </div>
                </>
              )}

              {/* Form - OLD (Hidden, kept for reference) */}
              <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar" data-aos="fade-up" style={{ display: 'none' }}>
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Full Name *
                    </label>
                    <GlassInputWrapper
                      error={formik.touched.fullName && formik.errors.fullName}
                      success={getFieldSuccess("fullName")}
                      focused={focusedField === "fullName"}
                      icon={User}
                      isDark={isDark}
                    >
                      <input
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        onChange={formik.handleChange}
                        onBlur={(e) => {
                          formik.handleBlur(e);
                          setFocusedField(null);
                        }}
                        onFocus={() => setFocusedField("fullName")}
                        value={formik.values.fullName}
                        className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none ${isDark
                          ? "placeholder:text-gray-500 text-white"
                          : "placeholder:text-gray-400 text-gray-900"
                          }`}
                      />
                    </GlassInputWrapper>
                    <AnimatePresence>
                      {formik.touched.fullName && formik.errors.fullName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-xs text-red-400 mt-2 flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          {formik.errors.fullName}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Email Address *
                    </label>
                    <GlassInputWrapper
                      error={formik.touched.email && formik.errors.email}
                      success={getFieldSuccess("email")}
                      focused={focusedField === "email"}
                      icon={Mail}
                      isDark={isDark}
                    >
                      <input
                        type="email"
                        name="email"
                        placeholder="john@company.com"
                        onChange={formik.handleChange}
                        onBlur={(e) => {
                          formik.handleBlur(e);
                          setFocusedField(null);
                        }}
                        onFocus={() => setFocusedField("email")}
                        value={formik.values.email}
                        className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none ${isDark
                          ? "placeholder:text-gray-500 text-white"
                          : "placeholder:text-gray-400 text-gray-900"
                          }`}
                      />
                    </GlassInputWrapper>
                    <AnimatePresence>
                      {formik.touched.email && formik.errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-xs text-red-400 mt-2 flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          {formik.errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Phone Number *
                  </label>
                  <GlassInputWrapper
                    error={formik.touched.phone && formik.errors.phone}
                    success={getFieldSuccess("phone")}
                    focused={focusedField === "phone"}
                    icon={Phone}
                    isDark={isDark}
                  >
                    <input
                      type="tel"
                      name="phone"
                      placeholder="9876543210"
                      maxLength="10"
                      onChange={formik.handleChange}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        setFocusedField(null);
                      }}
                      onFocus={() => setFocusedField("phone")}
                      value={formik.values.phone}
                      className={`w-full bg-transparent p-4 pl-14 text-sm focus:outline-none ${isDark
                        ? "placeholder:text-gray-500 text-white"
                        : "placeholder:text-gray-400 text-gray-900"
                        }`}
                    />
                  </GlassInputWrapper>
                  <AnimatePresence>
                    {formik.touched.phone && formik.errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-red-400 mt-2 flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3" />
                        {formik.errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Password *
                    </label>
                    <GlassInputWrapper
                      error={formik.touched.password && formik.errors.password}
                      success={getFieldSuccess("password")}
                      focused={focusedField === "password"}
                      icon={Lock}
                      isDark={isDark}
                    >
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="••••••••"
                          onChange={formik.handleChange}
                          onBlur={(e) => {
                            formik.handleBlur(e);
                            setFocusedField(null);
                          }}
                          onFocus={() => setFocusedField("password")}
                          value={formik.values.password}
                          className={`w-full bg-transparent p-4 pl-14 pr-12 text-sm focus:outline-none ${isDark
                            ? "placeholder:text-gray-500 text-white"
                            : "placeholder:text-gray-400 text-gray-900"
                            }`}
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isDark
                            ? "text-gray-400 hover:text-purple-400"
                            : "text-gray-500 hover:text-purple-600"
                            }`}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                          <XCircle className="w-3 h-3" />
                          {formik.errors.password}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Confirm Password *
                    </label>
                    <GlassInputWrapper
                      error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                      success={getFieldSuccess("confirmPassword")}
                      focused={focusedField === "confirmPassword"}
                      icon={Lock}
                      isDark={isDark}
                    >
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="••••••••"
                          onChange={formik.handleChange}
                          onBlur={(e) => {
                            formik.handleBlur(e);
                            setFocusedField(null);
                          }}
                          onFocus={() => setFocusedField("confirmPassword")}
                          value={formik.values.confirmPassword}
                          className={`w-full bg-transparent p-4 pl-14 pr-12 text-sm focus:outline-none ${isDark
                            ? "placeholder:text-gray-500 text-white"
                            : "placeholder:text-gray-400 text-gray-900"
                            }`}
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isDark
                            ? "text-gray-400 hover:text-purple-400"
                            : "text-gray-500 hover:text-purple-600"
                            }`}
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </motion.button>
                      </div>
                    </GlassInputWrapper>
                    <AnimatePresence>
                      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-xs text-red-400 mt-2 flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          {formik.errors.confirmPassword}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Education Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"
                      }`}>
                      College/University *
                    </label>
                    <GlassInputWrapper
                      error={formik.touched.college && formik.errors.college}
                      success={getFieldSuccess("college")}
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
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Degree *
                    </label>
                    <GlassInputWrapper
                      error={formik.touched.degree && formik.errors.degree}
                      success={getFieldSuccess("degree")}
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
                  </motion.div>
                </div>

                {/* Graduation Year */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Graduation Year *
                  </label>
                  <GlassInputWrapper
                    error={formik.touched.graduationYear && formik.errors.graduationYear}
                    success={getFieldSuccess("graduationYear")}
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
                </motion.div>

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Skills * <span className="text-xs opacity-70">(comma-separated, min 3, max 15)</span>
                  </label>
                  <GlassInputWrapper
                    error={formik.touched.skills && formik.errors.skills}
                    success={getFieldSuccess("skills")}
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
                </motion.div>

                {/* Resume URL */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Resume URL *
                  </label>
                  <GlassInputWrapper
                    error={formik.touched.resumeUrl && formik.errors.resumeUrl}
                    success={getFieldSuccess("resumeUrl")}
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
                </motion.div>

                {/* Terms & Conditions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="flex items-start gap-3"
                >
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    id="termsAccepted"
                    onChange={formik.handleChange}
                    checked={formik.values.termsAccepted}
                    className={`mt-1 w-4 h-4 cursor-pointer ${isDark ? "accent-purple-500" : "accent-purple-600"
                      }`}
                  />
                  <label htmlFor="termsAccepted" className={`text-sm cursor-pointer ${isDark ? "text-gray-300" : "text-gray-600"
                    }`}>
                    I agree to the{" "}
                    <span className={`font-medium ${isDark ? "text-purple-400" : "text-purple-600"
                      }`}>
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className={`font-medium ${isDark ? "text-purple-400" : "text-purple-600"
                      }`}>
                      Privacy Policy
                    </span>
                  </label>
                </motion.div>
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
              </div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSubmit}
                disabled={formik.isSubmitting}
                className={`w-full rounded-xl py-4 font-semibold tracking-wide text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group ${isDark
                  ? "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/20"
                  : "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20"
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
                      Creating your account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </motion.button>

              {/* Footer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className={`text-center text-sm pt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Already have an account?{" "}
                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={onSignIn}
                  className={`font-semibold transition-colors inline-flex items-center gap-1 ${isDark
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-purple-600 hover:text-purple-700"
                    }`}
                >
                  Sign in here
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Plan Selection Modal */}
      <PlanSelectionModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        onSelectPlan={(planId) => {
          setSelectedPlan(planId);
          setShowPlanModal(false);
          // Navigate to profile page
          window.location.href = '/profile';
        }}
        isDark={isDark}
      />
    </div>
  );
};

/* ---------------- DEMO ---------------- */
const RegisterPageDemo = () => (
  <RegisterPage
    heroImageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2160&q=80"
    onGoogleSignUp={() => toast.info("🚀 Google sign-up integration coming soon!", {
      icon: "🔐",
    })}
    onGithubSignUp={() => toast.info("🚀 GitHub sign-up integration coming soon!", {
      icon: "💻",
    })}
    onSignIn={() => toast.info("✨ Redirecting to login...", {
      icon: "👋",
    })}
    defaultTheme="dark"
  />
);

export default RegisterPageDemo