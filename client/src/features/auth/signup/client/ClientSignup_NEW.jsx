import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Github, Mail, Lock, ArrowRight, ArrowLeft, Home, UserPlus, Sparkles, Moon, Sun, User, Phone, GraduationCap, Calendar, Briefcase, Upload, CheckCircle, XCircle, Check, Target, Shield, TrendingUp } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import Step3Summary from './Step3Summary';
import PlanSelectionModal from '../../../components/PlanSelectionModal';

import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";

/* ---------------- ICONS ---------------- */
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path
            fill="#FFC107"
            d="M43.611 20.083H24v8h11.303c-1.65 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        />
    </svg>
);

/* ---------------- VALIDATION ---------------- */
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

/* ---------------- MAIN COMPONENT ---------------- */
const RegisterPage = ({
    heroImageSrc = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2160&q=80",
    onGoogleSignUp,
    onGithubSignUp,
    onSignIn,
    defaultTheme = "dark"
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

                toast.success("🎉 Registration successful! Welcome to ProveIt!", {
                    position: "top-right",
                    autoClose: 3000,
                    icon: "✨",
                });

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

    const inputClasses = `w-full h-12 text-base rounded-xl bg-black/40 border-2 border-violet-900/30 text-white px-4 pr-12 placeholder-gray-500 focus:border-violet-600 focus:ring-2 focus:ring-violet-500/30 transition-all duration-300 hover:border-violet-800/50`;

    return (
        <div
            className="min-h-screen bg-black flex"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {/* Home Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => window.location.href = '/'}
                className="absolute z-20 w-14 h-14 bg-violet-600/20 backdrop-blur-lg border-2 border-violet-500/40 rounded-full flex items-center justify-center text-violet-400 hover:bg-violet-600/40 hover:text-white hover:scale-110 hover:rotate-90 transition-all duration-300 shadow-lg shadow-violet-900/50"
                style={{ top: '40px', right: '40px' }}
            >
                <Home size={22} strokeWidth={2.5} />
            </motion.button>

            <ToastContainer
                position="top-right"
                theme={isDark ? "dark" : "light"}
            />

            {/* Left Side - Form */}
            <div className="flex w-full lg:w-1/2 relative overflow-hidden items-center justify-center lg:pr-[7rem]">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md px-6"
                >
                    {/* Header */}
                    <div className="text-center mb-10 mt-24">
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 to-violet-800 rounded-2xl border-2 border-violet-500/50 mb-6 shadow-xl shadow-violet-900/50"
                        >
                            <UserPlus className="w-10 h-10 text-white" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-4xl font-black text-white mb-3">
                            Create Account
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Join ProveIt and unlock exclusive skill-based competitions
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {currentStep === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                {/* Full Name */}
                                <div>
                                    <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            {...formik.getFieldProps("fullName")}
                                            placeholder="Enter your full name"
                                            className={inputClasses}
                                        />
                                        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" strokeWidth={2} />
                                    </div>
                                    {formik.touched.fullName && formik.errors.fullName && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-2 block font-medium"
                                        >
                                            {formik.errors.fullName}
                                        </motion.span>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            {...formik.getFieldProps("email")}
                                            placeholder="Enter your email"
                                            className={inputClasses}
                                        />
                                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" strokeWidth={2} />
                                    </div>
                                    {formik.touched.email && formik.errors.email && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-2 block font-medium"
                                        >
                                            {formik.errors.email}
                                        </motion.span>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            {...formik.getFieldProps("phone")}
                                            placeholder="10-digit phone number"
                                            className={inputClasses}
                                        />
                                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" strokeWidth={2} />
                                    </div>
                                    {formik.touched.phone && formik.errors.phone && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-2 block font-medium"
                                        >
                                            {formik.errors.phone}
                                        </motion.span>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...formik.getFieldProps("password")}
                                            type={showPassword ? "text" : "password"}
                                            className={inputClasses}
                                            placeholder="At least 8 characters"
                                        />
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400/60" strokeWidth={2} />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent rounded-full p-1 hover:bg-violet-900/30 transition-all"
                                            style={{ outline: "none", border: "none" }}
                                        >
                                            <AnimatePresence mode="wait" initial={false}>
                                                {showPassword ? (
                                                    <motion.div
                                                        key="eye-off"
                                                        initial={{ opacity: 0, rotate: -180 }}
                                                        animate={{ opacity: 1, rotate: 0 }}
                                                        exit={{ opacity: 0, rotate: 180 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <EyeOff className="w-5 h-5 text-violet-400 hover:text-violet-300 transition" strokeWidth={2} />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="eye"
                                                        initial={{ opacity: 0, rotate: -180 }}
                                                        animate={{ opacity: 1, rotate: 0 }}
                                                        exit={{ opacity: 0, rotate: 180 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <Eye className="w-5 h-5 text-violet-400 hover:text-violet-300 transition" strokeWidth={2} />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </div>
                                    <style>{`
                    input[type="password"]:not(:placeholder-shown),
                    input[type="text"]:not(:placeholder-shown) {
                      padding-left: 3rem;
                    }
                    input[type="password"]:placeholder-shown + svg:first-of-type,
                    input[type="text"]:placeholder-shown + svg:first-of-type {
                      display: none;
                    }
                  `}</style>
                                    {formik.touched.password && formik.errors.password && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-2 block font-medium"
                                        >
                                            {formik.errors.password}
                                        </motion.span>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...formik.getFieldProps("confirmPassword")}
                                            type={showConfirmPassword ? "text" : "password"}
                                            className={inputClasses}
                                            placeholder="Re-enter your password"
                                        />
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400/60" strokeWidth={2} />
                                        {formik.touched.confirmPassword &&
                                            !formik.errors.confirmPassword &&
                                            formik.values.confirmPassword && (
                                                <CheckCircle className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" strokeWidth={2.5} />
                                            )}
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent rounded-full p-1 hover:bg-violet-900/30 transition-all"
                                            style={{ outline: "none", border: "none" }}
                                        >
                                            <AnimatePresence mode="wait" initial={false}>
                                                {showConfirmPassword ? (
                                                    <motion.div
                                                        key="eye-off"
                                                        initial={{ opacity: 0, rotate: -180 }}
                                                        animate={{ opacity: 1, rotate: 0 }}
                                                        exit={{ opacity: 0, rotate: 180 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <EyeOff className="w-5 h-5 text-violet-400 hover:text-violet-300 transition" strokeWidth={2} />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="eye"
                                                        initial={{ opacity: 0, rotate: -180 }}
                                                        animate={{ opacity: 1, rotate: 0 }}
                                                        exit={{ opacity: 0, rotate: 180 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <Eye className="w-5 h-5 text-violet-400 hover:text-violet-300 transition" strokeWidth={2} />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </div>
                                    {formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword && (
                                            <motion.span
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-sm mt-2 block font-medium"
                                            >
                                                {formik.errors.confirmPassword}
                                            </motion.span>
                                        )}
                                </div>

                                {/* Next Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handleNextStep}
                                    className="w-full h-14 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700
                   text-white text-lg font-bold flex items-center justify-center
                   shadow-2xl shadow-violet-900/50 hover:shadow-violet-800/60 hover:-translate-y-1 hover:from-violet-500 hover:to-violet-600
                   transition-all duration-300 border-2 border-violet-500/30 uppercase tracking-wider"
                                >
                                    <span className="flex items-center">
                                        Next Step
                                        <ArrowRight className="w-5 h-5 ml-3" strokeWidth={2.5} />
                                    </span>
                                </motion.button>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                {/* College */}
                                <div>
                                    <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                        College/University
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            {...formik.getFieldProps("college")}
                                            placeholder="Enter your college name"
                                            className={inputClasses}
                                        />
                                        <GraduationCap className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" strokeWidth={2} />
                                    </div>
                                    {formik.touched.college && formik.errors.college && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-2 block font-medium"
                                        >
                                            {formik.errors.college}
                                        </motion.span>
                                    )}
                                </div>

                                {/* Degree */}
                                <div>
                                    <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                        Degree
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            {...formik.getFieldProps("degree")}
                                            placeholder="B.Tech Computer Science"
                                            className={inputClasses}
                                        />
                                        <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" strokeWidth={2} />
                                    </div>
                                    {formik.touched.degree && formik.errors.degree && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-2 block font-medium"
                                        >
                                            {formik.errors.degree}
                                        </motion.span>
                                    )}
                                </div>

                                {/* Graduation Year */}
                                <div>
                                    <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                        Graduation Year
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            {...formik.getFieldProps("graduationYear")}
                                            placeholder="2024"
                                            min="1950"
                                            max={new Date().getFullYear() + 10}
                                            className={inputClasses}
                                        />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" strokeWidth={2} />
                                    </div>
                                    {formik.touched.graduationYear && formik.errors.graduationYear && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-2 block font-medium"
                                        >
                                            {formik.errors.graduationYear}
                                        </motion.span>
                                    )}
                                </div>

                                {/* Skills */}
                                <div>
                                    <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                        Skills <span className="text-xs opacity-70">(comma-separated, min 3)</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            {...formik.getFieldProps("skills")}
                                            placeholder="React, Node.js, TypeScript, Python"
                                            className={inputClasses}
                                        />
                                        <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" strokeWidth={2} />
                                    </div>
                                    {formik.touched.skills && formik.errors.skills && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-2 block font-medium"
                                        >
                                            {formik.errors.skills}
                                        </motion.span>
                                    )}
                                </div>

                                {/* Resume URL */}
                                <div>
                                    <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                        Resume URL
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="url"
                                            {...formik.getFieldProps("resumeUrl")}
                                            placeholder="https://drive.google.com/your-resume"
                                            className={inputClasses}
                                        />
                                        <Upload className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" strokeWidth={2} />
                                    </div>
                                    {formik.touched.resumeUrl && formik.errors.resumeUrl && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-2 block font-medium"
                                        >
                                            {formik.errors.resumeUrl}
                                        </motion.span>
                                    )}
                                </div>

                                {/* Terms & Conditions */}
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        name="termsAccepted"
                                        id="termsAccepted"
                                        onChange={formik.handleChange}
                                        checked={formik.values.termsAccepted}
                                        className="mt-1 w-4 h-4 cursor-pointer accent-violet-500"
                                    />
                                    <label htmlFor="termsAccepted" className="text-sm cursor-pointer text-gray-300">
                                        I agree to the{" "}
                                        <span className="font-medium text-violet-400">
                                            Terms of Service
                                        </span>{" "}
                                        and{" "}
                                        <span className="font-medium text-violet-400">
                                            Privacy Policy
                                        </span>
                                    </label>
                                </div>
                                {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                                    <motion.span
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-sm block font-medium flex items-center gap-1"
                                    >
                                        <XCircle className="w-3 h-3" />
                                        {formik.errors.termsAccepted}
                                    </motion.span>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={handlePrevStep}
                                        className="flex-1 h-14 rounded-xl bg-black/40 border-2 border-violet-600/50 hover:border-violet-500 hover:bg-violet-900/20
                     text-white text-lg font-bold flex items-center justify-center
                     transition-all duration-300 uppercase tracking-wider"
                                    >
                                        <ArrowLeft className="w-5 h-5 mr-3" strokeWidth={2.5} />
                                        Back
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={handleNextStep}
                                        className="flex-1 h-14 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700
                     text-white text-lg font-bold flex items-center justify-center
                     shadow-2xl shadow-violet-900/50 hover:shadow-violet-800/60 hover:-translate-y-1 hover:from-violet-500 hover:to-violet-600
                     transition-all duration-300 border-2 border-violet-500/30 uppercase tracking-wider"
                                    >
                                        Next Step
                                        <ArrowRight className="w-5 h-5 ml-3" strokeWidth={2.5} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                        {currentStep === 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <Step3Summary
                                    formik={formik}
                                    selectedPlan={selectedPlan}
                                    setShowPlanModal={setShowPlanModal}
                                    setCurrentStep={setCurrentStep}
                                    isDark={isDark}
                                />

                                {/* Navigation Buttons */}
                                <div className="flex gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={handlePrevStep}
                                        className="flex-1 h-14 rounded-xl bg-black/40 border-2 border-violet-600/50 hover:border-violet-500 hover:bg-violet-900/20
                     text-white text-lg font-bold flex items-center justify-center
                     transition-all duration-300 uppercase tracking-wider"
                                    >
                                        <ArrowLeft className="w-5 h-5 mr-3" strokeWidth={2.5} />
                                        Back
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={formik.isSubmitting}
                                        className="flex-1 h-14 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700
                     text-white text-lg font-bold flex items-center justify-center
                     shadow-2xl shadow-violet-900/50 hover:shadow-violet-800/60 hover:-translate-y-1 hover:from-violet-500 hover:to-violet-600
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-2 border-violet-500/30 uppercase tracking-wider"
                                    >
                                        {formik.isSubmitting ? (
                                            <span className="flex items-center">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                                                />
                                                Creating Account...
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                <UserPlus className="w-5 h-5 mr-3" strokeWidth={2.5} />
                                                Register
                                            </span>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-violet-900/30"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-6 bg-black text-gray-400 font-semibold uppercase tracking-wide">
                                Already have an account?
                            </span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={onSignIn}
                        className="block w-full h-14 text-center text-white font-bold bg-black/40 border-2 border-violet-600/50 hover:border-violet-500 hover:bg-violet-900/20 rounded-xl transition-all duration-300 cursor-pointer group uppercase tracking-wider"
                    >
                        <span className="inline-flex items-center">
                            Login to ProveIt
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Right Side - Info */}
            <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center p-8 lg:p-12">
                <div
                    className="absolute left-[40%] inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${heroImageSrc})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        opacity: "0.5",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-bl from-black/80 via-violet-950/40 to-black/90"></div>
                </div>
                <div className="absolute left-[40%] inset-0 bg-gradient-to-l from-transparent via-transparent to-black z-10"></div>

                <div className="relative z-20 flex flex-col justify-center items-start p-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="max-w-md"
                    >
                        <div className="flex items-center mb-8">
                            <div
                                className="w-14 h-14 bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-violet-900/50"
                            >
                                <Target className="w-8 h-8 text-white" strokeWidth={2.5} />
                            </div>
                            <h1 className="text-5xl font-black bg-gradient-to-r from-violet-500 to-violet-700 bg-clip-text text-transparent">
                                ProveIt
                            </h1>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                            Unlock Exclusive{" "}
                            <span className="text-violet-500">Skill Competitions</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                            Join our elite community and gain instant access to premium competitions, limited opportunities, and insider perks.
                        </p>

                        <div className="space-y-5">
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="flex items-center group"
                            >
                                <div className="w-10 h-10 bg-violet-600/20 border border-violet-500/40 rounded-lg flex items-center justify-center mr-4 group-hover:bg-violet-600/40 transition-all">
                                    <Target className="w-5 h-5 text-violet-400" strokeWidth={2.5} />
                                </div>
                                <span className="text-gray-200 font-medium">Real-World Challenges</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="flex items-center group"
                            >
                                <div className="w-10 h-10 bg-violet-600/20 border border-violet-500/40 rounded-lg flex items-center justify-center mr-4 group-hover:bg-violet-600/40 transition-all">
                                    <Shield className="w-5 h-5 text-violet-400" strokeWidth={2.5} />
                                </div>
                                <span className="text-gray-200 font-medium">Bias-Free Selection</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="flex items-center group"
                            >
                                <div className="w-10 h-10 bg-violet-600/20 border border-violet-500/40 rounded-lg flex items-center justify-center mr-4 group-hover:bg-violet-600/40 transition-all">
                                    <TrendingUp className="w-5 h-5 text-violet-400" strokeWidth={2.5} />
                                </div>
                                <span className="text-gray-200 font-medium">Career Acceleration</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Plan Selection Modal */}
            <PlanSelectionModal
                isOpen={showPlanModal}
                onClose={() => setShowPlanModal(false)}
                onSelectPlan={(planId) => {
                    setSelectedPlan(planId);
                    setShowPlanModal(false);
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
        onSignIn={() => window.location.href = '/login'}
        defaultTheme="dark"
    />
);

export default RegisterPageDemo;
