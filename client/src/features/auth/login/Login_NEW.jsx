import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";

import {
    LogIn,
    Eye,
    EyeOff,
    Mail,
    ArrowRight,
    Shield,
    Users,
    Zap,
    Home,
    Lock,
    Target,
    TrendingUp,
    Github,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Google Icon Component
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path
            fill="#FFC107"
            d="M43.611 20.083H24v8h11.303c-1.65 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        />
    </svg>
);

// Yup Validation Schema
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

const Login_NEW = ({ setIsUserLogedIn, setUserData, setProfilePic }) => {
    const navigate = useNavigate();
    const isReqSend = useRef(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);

    // Check if already logged in
    const checkUserLogIn = async () => {
        try {
            const res = await axios.get("http://localhost:4000/user/isUserLoggedIn", {
                withCredentials: true,
            });
            if (res.data.message !== "New User") {
                toast.success(res.data.message, {
                    style: { fontFamily: "Inter, sans-serif" },
                });
                navigate("/");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something Went Wrong!",
                { style: { fontFamily: "Inter, sans-serif" } }
            );
            console.error(error.response?.data?.error || error.message);
        }
    };

    useEffect(() => {
        if (!isReqSend.current) {
            checkUserLogIn();
            isReqSend.current = true;
        }
    }, []);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            isRemember: false,
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            if (!values.email || !values.password) {
                toast.error("Email and Password are required!", {
                    style: { fontFamily: "Inter, sans-serif" },
                });
                setSubmitting(false);
                return;
            }

            try {
                const res = await axios.post(
                    "http://localhost:4000/user/login",
                    values,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );
                setIsUserLogedIn(true);
                toast.success(res.data.message, {
                    style: { fontFamily: "Inter, sans-serif" },
                });
                setSubmitting(false);
                resetForm();
                document.querySelector("#chkBox_Remember").checked = false;
                const user = await axios.get("http://localhost:4000/user/getOneUserData", {
                    withCredentials: true,
                });
                setUserData(user.data.user);
                setProfilePic(user.data.user.profile_picture);
                navigate("/");
            } catch (error) {
                toast.error(error.response?.data?.message || "Something Went Wrong!", {
                    style: { fontFamily: "Inter, sans-serif" },
                });
                console.error(error.response?.data?.error || error.message);
                setSubmitting(false);
            }
        },
    });

    // Google OAuth Handler
    const handleGoogleSignIn = () => {
        window.location.href = "http://localhost:4000/auth/google";
    };

    // GitHub OAuth Handler
    const handleGithubSignIn = () => {
        window.location.href = "http://localhost:4000/auth/github";
    };

    const inputClasses =
        "w-full h-12 text-base rounded-xl bg-black/40 border-2 border-violet-900/30 text-white px-4 pr-12 placeholder-gray-500 focus:border-violet-600 focus:ring-2 focus:ring-violet-500/30 transition-all duration-300 hover:border-violet-800/50";

    return (
        <div
            className="min-h-screen bg-black flex"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {/* Back to Home Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => navigate("/")}
                className="absolute z-20 w-14 h-14 bg-violet-600/20 backdrop-blur-lg border-2 border-violet-500/40 rounded-full flex items-center justify-center text-violet-400 hover:bg-violet-600/40 hover:text-white hover:scale-110 hover:rotate-90 transition-all duration-300 shadow-lg shadow-violet-900/50"
                style={{ top: '90px', right: '40px' }}
            >
                <Home size={22} strokeWidth={2.5} />
            </motion.button>

            {/* Left Side - Hero Content */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-violet-950/40 to-black/90"></div>
                <div className="absolute ml-[50%] inset-0 bg-gradient-to-r from-transparent via-transparent to-black z-10"></div>

                {/* Overlay Content */}
                <div className="relative z-20 flex flex-col justify-center items-start p-12 ml-20 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-md"
                    >
                        <div className="flex items-center mb-8">
                            <motion.div
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                                className="w-14 h-14 bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-violet-900/50"
                            >
                                <Target className="w-7 h-7 text-white" strokeWidth={2.5} />
                            </motion.div>
                            <h1 className="text-5xl font-black bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                                ProveIt
                            </h1>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                            Welcome Back to Your{" "}
                            <span className="text-violet-500">Skill-Based</span> Journey
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                            Access exclusive competitions, showcase your skills, and connect with top employers through ProveIt's premium platform.
                        </p>

                        <div className="space-y-5">
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="flex items-center group"
                            >
                                <div className="w-10 h-10 bg-violet-600/20 border border-violet-500/40 rounded-lg flex items-center justify-center mr-4 group-hover:bg-violet-600/40 transition-all">
                                    <Zap className="w-5 h-5 text-violet-400" strokeWidth={2.5} />
                                </div>
                                <span className="text-gray-200 font-medium">Skill-Based Competitions</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="flex items-center group"
                            >
                                <div className="w-10 h-10 bg-violet-600/20 border border-violet-500/40 rounded-lg flex items-center justify-center mr-4 group-hover:bg-violet-600/40 transition-all">
                                    <Users className="w-5 h-5 text-violet-400" strokeWidth={2.5} />
                                </div>
                                <span className="text-gray-200 font-medium">Direct Employer Connections</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="flex items-center group"
                            >
                                <div className="w-10 h-10 bg-violet-600/20 border border-violet-500/40 rounded-lg flex items-center justify-center mr-4 group-hover:bg-violet-600/40 transition-all">
                                    <Shield className="w-5 h-5 text-violet-400" strokeWidth={2.5} />
                                </div>
                                <span className="text-gray-200 font-medium">Verified Skill Assessments</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-10 mt-20">
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl border-2 border-violet-500/50 mb-6 shadow-xl shadow-violet-900/50"
                        >
                            <LogIn className="w-10 h-10 text-white" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-4xl font-black text-white mb-3">
                            Welcome Back
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Sign in to access your ProveIt account
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    {...formik.getFieldProps("email")}
                                    className={inputClasses}
                                    placeholder="Enter your email"
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

                        {/* Password */}
                        <div>
                            <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...formik.getFieldProps("password")}
                                    className={inputClasses}
                                    placeholder="Enter your password"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400/60" strokeWidth={2} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400 rounded-full p-1 hover:bg-violet-900/30 transition-all"
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
                                                <EyeOff className="w-5 h-5 hover:text-violet-300 transition" strokeWidth={2} />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="eye"
                                                initial={{ opacity: 0, rotate: -180 }}
                                                animate={{ opacity: 1, rotate: 0 }}
                                                exit={{ opacity: 0, rotate: 180 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Eye className="w-5 h-5 hover:text-violet-300 transition" strokeWidth={2} />
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

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center cursor-pointer group">
                                <input
                                    {...formik.getFieldProps("isRemember")}
                                    id="chkBox_Remember"
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 rounded-md border-2 border-violet-600 bg-violet-500/30
                          flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer
                          checked:bg-violet-600 checked:border-violet-600 hover:border-violet-500
                          checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:opacity-100
                          after:opacity-0 after:transition-opacity after:duration-300"
                                />
                                <span className="ml-3 text-gray-300 font-medium group-hover:text-white transition">
                                    Remember me
                                </span>
                            </label>

                            <button
                                type="button"
                                onClick={() => setShowForgotModal(true)}
                                className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-all hover:underline"
                            >
                                Forgot password?
                            </button>

                            <ForgotPasswordModal
                                show={showForgotModal}
                                onClose={() => setShowForgotModal(false)}
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="w-full h-14 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600
               text-white text-lg font-bold flex items-center justify-center
               shadow-2xl shadow-violet-900/50 hover:shadow-violet-800/60 hover:-translate-y-1 hover:from-violet-500 hover:to-blue-500
               disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-2 border-violet-500/30"
                        >
                            {formik.isSubmitting ? (
                                <span className="flex items-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                    />
                                    Signing In...
                                </span>
                            ) : (
                                <span className="flex items-center uppercase tracking-wider">
                                    <LogIn className="w-5 h-5 mr-2" strokeWidth={2.5} />
                                    Login
                                </span>
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-violet-900/30"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-6 bg-black text-gray-400 font-semibold uppercase tracking-wide">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 rounded-xl py-4 border group transition-all shadow-sm bg-violet-900/10 border-violet-700/30 hover:bg-violet-900/20 hover:border-violet-600/50 text-white"
                        >
                            <GoogleIcon />
                            <span className="font-medium">Continue with Google</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={handleGithubSignIn}
                            className="w-full flex items-center justify-center gap-3 rounded-xl py-4 border group transition-all shadow-sm bg-gray-900 border-violet-700/30 hover:bg-gray-800 hover:border-violet-600/50 text-white"
                        >
                            <Github className="w-5 h-5" />
                            <span className="font-medium">Continue with GitHub</span>
                            <span className="px-2 py-0.5 text-[10px] rounded-full border bg-violet-500/20 text-violet-300 border-violet-500/30">
                                Recommended
                            </span>
                        </motion.button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-violet-900/30"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-6 bg-black text-gray-400 font-semibold uppercase tracking-wide">
                                New to ProveIt?
                            </span>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => navigate("/signup/clientSignup")}
                        className="block w-full h-14 text-center text-white font-bold bg-black/40 border-2 border-violet-600/50 hover:border-violet-500 hover:bg-violet-900/20 rounded-xl transition-all duration-300 cursor-pointer group uppercase tracking-wider"
                    >
                        <span className="inline-flex items-center">
                            Create Account
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Login_NEW;
