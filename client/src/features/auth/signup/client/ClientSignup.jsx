import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Github, Mail, Lock, ArrowRight, Sparkles, Moon, Sun, User, Phone, GraduationCap, Calendar, Briefcase, Upload, CheckCircle, XCircle, ArrowLeft, Star, Shield, Zap } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";

import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";

/* ---------------- REUSABLE COMPONENTS ---------------- */

const BrandBadge = ({ isDark }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs shadow-lg backdrop-blur-xl ${isDark
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
    Join the skill-verified community
  </motion.div>
);

const GlassInputWrapper = ({ children, error, focused, icon: Icon, isDark, success }) => (
  <div
    className={`rounded-2xl border backdrop-blur-sm transition-all duration-300 relative overflow-hidden group
      ${error
        ? "border-red-500/60 bg-red-500/10 shadow-lg shadow-red-500/20"
        : success
          ? "border-green-500/60 bg-green-500/10 shadow-lg shadow-green-500/20"
          : focused
            ? isDark
              ? "border-purple-400/80 bg-gradient-to-br from-purple-500/20 to-violet-500/20 shadow-2xl shadow-purple-500/40 scale-[1.01]"
              : "border-purple-500/80 bg-gradient-to-br from-purple-100/60 to-violet-100/60 shadow-2xl shadow-purple-400/40 scale-[1.01]"
            : isDark
              ? "border-white/10 bg-white/5 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20 hover:bg-white/10"
              : "border-gray-300/40 bg-white/40 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-400/30 hover:bg-purple-50/50"
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
            ? isDark ? "text-purple-400" : "text-purple-600"
            : isDark ? "text-gray-400" : "text-gray-600"
        }`} />
    </motion.div>

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

// Optimized Form Input Component to reduce repetition
const FormInput = ({ 
  label, name, icon, isDark, formik, type = "text", placeholder, 
  focusedField, setFocusedField, delay = 0, ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = name.toLowerCase().includes("password");
  const displayType = isPassword ? (showPassword ? "text" : "password") : type;
  
  const getFieldSuccess = (fieldName) =>
    Boolean(formik.touched?.[fieldName] && !formik.errors?.[fieldName] && formik.values?.[fieldName]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="w-full"
    >
      <label className={`text-sm font-medium mb-2 block ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        {label}
      </label>
      <GlassInputWrapper
        error={formik.touched[name] && formik.errors[name]}
        success={getFieldSuccess(name)}
        focused={focusedField === name}
        icon={icon}
        isDark={isDark}
      >
        <div className="relative">
          <input
            type={displayType}
            name={name}
            placeholder={placeholder}
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              setFocusedField(null);
            }}
            onFocus={() => setFocusedField(name)}
            value={formik.values[name]}
            className={`w-full bg-transparent p-4 pl-14 ${isPassword ? "pr-12" : ""} text-sm focus:outline-none ${isDark
              ? "placeholder:text-gray-500 text-white"
              : "placeholder:text-gray-400 text-gray-900"
            }`}
            {...props}
          />
          {isPassword && (
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
          )}
        </div>
      </GlassInputWrapper>
      <AnimatePresence>
        {formik.touched[name] && formik.errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-red-400 mt-2 flex items-center gap-1"
          >
            <XCircle className="w-3 h-3" />
            {formik.errors[name]}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PlanCard = ({ title, price, features, selected, onClick, isDark, recommended }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`relative cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
      selected 
        ? isDark 
          ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20" 
          : "border-purple-600 bg-purple-50 shadow-lg shadow-purple-200"
        : isDark
          ? "border-white/10 bg-white/5 hover:border-white/20"
          : "border-gray-200 bg-white/50 hover:border-purple-200"
    }`}
  >
    {recommended && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
        Recommended
      </div>
    )}
    <div className="flex items-center justify-between mb-4">
      <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-800"}`}>{title}</h3>
      {selected && <CheckCircle className="w-6 h-6 text-purple-500" />}
    </div>
    <div className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
      {price}<span className="text-sm font-normal opacity-60">/mo</span>
    </div>
    <ul className="space-y-2">
      {features.map((feat, i) => (
        <li key={i} className={`text-sm flex items-center gap-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
           <CheckCircle className="w-3 h-3 text-purple-400" /> {feat}
        </li>
      ))}
    </ul>
  </motion.div>
);

/* ---------------- VALIDATION ---------------- */
const validationSchema = Yup.object({
  // Step 1
  fullName: Yup.string().min(2, "Min 2 chars").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "10 digits required").required("Required"),
  password: Yup.string().min(8, "Min 8 chars").matches(/[A-Z]/, "Needs uppercase").required("Required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
  
  // Step 2
  college: Yup.string().min(2, "Required").required("Required"),
  degree: Yup.string().required("Required"),
  graduationYear: Yup.number().required("Required"),
  skills: Yup.string().required("Required"),
  resumeUrl: Yup.string().url("Valid URL required").required("Required"),
  
  // Step 3
  subscriptionPlan: Yup.string().required("Please select a plan"),
  termsAccepted: Yup.boolean().oneOf([true], "Must accept terms").required("Must accept terms"),
});

/* ---------------- MAIN COMPONENT ---------------- */
export const RegisterPage = ({
  heroImageSrc,
  onGoogleSignUp,
  onGithubSignUp,
  onSignIn,
  defaultTheme = "dark"
}) => {
  const [focusedField, setFocusedField] = useState(null);
  const [isDark, setIsDark] = useState(defaultTheme === "dark");
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const parseSkills = (value) => value ? value.split(",").map(s => s.trim()).filter(Boolean) : [];

  const formik = useFormik({
    initialValues: {
      fullName: "", email: "", phone: "", password: "", confirmPassword: "",
      college: "", degree: "", graduationYear: "", skills: "", resumeUrl: "",
      termsAccepted: false,
      subscriptionPlan: "free" // Default
    },
    validationSchema,
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
          subscriptionPlan: values.subscriptionPlan,
          hasPriorityAccess: values.subscriptionPlan === "pro",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        console.log("REGISTRATION DATA:", userData);
        toast.success("🎉 Registration successful! Welcome to ProveIt!");
        setTimeout(() => toast.info("📧 Please check your email to verify your account"), 1000);
      } catch (error) {
        toast.error("❌ Registration failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const stepsFields = {
    1: ['fullName', 'email', 'phone', 'password', 'confirmPassword'],
    2: ['college', 'degree', 'graduationYear', 'skills', 'resumeUrl'],
    3: ['subscriptionPlan', 'termsAccepted']
  };

  const handleNext = async () => {
    const fieldsToValidate = stepsFields[currentStep];
    const touchedFields = {};
    fieldsToValidate.forEach(field => touchedFields[field] = true);
    await formik.setTouched({ ...formik.touched, ...touchedFields });
    
    // Validate specifically current step fields
    const errors = await formik.validateForm();
    const hasError = fieldsToValidate.some(field => errors[field]);

    if (!hasError) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast.error("⚠️ Please fix errors before proceeding");
    }
  };

  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`w-full flex relative overflow-hidden min-h-screen transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}>
      {/* Background Effects */}
      <div className={`absolute inset-0 transition-all duration-700 ${isDark ? "bg-gradient-to-br from-black via-black/80 to-black" : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"}`}>
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
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

      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl shadow-2xl transition-all ${isDark
          ? "bg-white/10 border border-white/20 text-purple-300 hover:bg-white/20"
          : "bg-purple-100/80 border border-purple-200 text-purple-700 hover:bg-purple-200/80"
        }`}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      <ToastContainer theme={isDark ? "dark" : "light"} />

      {/* Main Content Area */}
      <section className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <div className={`rounded-3xl border backdrop-blur-2xl shadow-2xl p-6 sm:p-10 space-y-6 relative overflow-hidden ${isDark
            ? "border-white/10 bg-gradient-to-b from-white/10 to-white/5"
            : "border-purple-200/50 bg-gradient-to-b from-white/80 to-white/60"
          }`}>
            
            {/* Header & Stepper */}
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                   <BrandBadge isDark={isDark} />
                   <h1 className={`text-4xl mt-4 font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                     {currentStep === 1 && "Create Account"}
                     {currentStep === 2 && "Your Profile"}
                     {currentStep === 3 && "Select Plan"}
                   </h1>
                </div>
                {/* Stepper Indicator */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className={`h-2 rounded-full transition-all duration-300 ${
                      step === currentStep 
                        ? "w-8 bg-purple-600" 
                        : step < currentStep 
                          ? "w-2 bg-green-500" 
                          : `w-2 ${isDark ? "bg-white/20" : "bg-gray-300"}`
                    }`} />
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={formik.handleSubmit} className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Personal Info */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {/* Social Logins - Only on Step 1 */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <button type="button" onClick={onGoogleSignUp} className={`flex items-center justify-center gap-2 rounded-xl py-3 border transition-all ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-gray-200 hover:bg-gray-50"}`}>
                           {/* Using text for icon to save space, assuming SVG component exists */}
                           <span className="text-sm font-medium">Google</span>
                        </button>
                        <button type="button" onClick={onGithubSignUp} className={`flex items-center justify-center gap-2 rounded-xl py-3 border transition-all ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-gray-200 hover:bg-gray-50"}`}>
                           <Github className="w-4 h-4" /> <span className="text-sm font-medium">GitHub</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Full Name *" name="fullName" icon={User} isDark={isDark} formik={formik} focusedField={focusedField} setFocusedField={setFocusedField} />
                        <FormInput label="Email *" name="email" type="email" icon={Mail} isDark={isDark} formik={formik} focusedField={focusedField} setFocusedField={setFocusedField} />
                      </div>
                      <FormInput label="Phone *" name="phone" type="tel" icon={Phone} isDark={isDark} formik={formik} focusedField={focusedField} setFocusedField={setFocusedField} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Password *" name="password" type="password" icon={Lock} isDark={isDark} formik={formik} focusedField={focusedField} setFocusedField={setFocusedField} />
                        <FormInput label="Confirm Password *" name="confirmPassword" type="password" icon={Lock} isDark={isDark} formik={formik} focusedField={focusedField} setFocusedField={setFocusedField} />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Professional Info */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="College/University *" name="college" icon={GraduationCap} isDark={isDark} formik={formik} focusedField={focusedField} setFocusedField={setFocusedField} />
                        <FormInput label="Degree *" name="degree" icon={Briefcase} isDark={isDark} formik={formik} focusedField={focusedField} setFocusedField={setFocusedField} />
                      </div>
                      <FormInput label="Graduation Year *" name="graduationYear" type="number" icon={Calendar} isDark={isDark} formik={formik} focusedField={focusedField} setFocusedField={setFocusedField} />
                      <FormInput label="Skills (min 3) *" name="skills" placeholder="React, Node, Python..." icon={Sparkles} isDark={isDark} formik={formik} focusedField={focusedField} setFocusedField={setFocusedField} />
                      <FormInput label="Resume URL *" name="resumeUrl" type="url" placeholder="https://..." icon={Upload} isDark={isDark} formik={formik} focusedField={focusedField} setFocusedField={setFocusedField} />
                    </motion.div>
                  )}

                  {/* STEP 3: Plans & Terms */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <PlanCard 
                          title="Free Starter" 
                          price="$0" 
                          features={["Basic Profile", "Community Access", "Limited Job Views"]} 
                          selected={formik.values.subscriptionPlan === "free"}
                          onClick={() => formik.setFieldValue("subscriptionPlan", "free")}
                          isDark={isDark}
                        />
                        <PlanCard 
                          title="Pro Career" 
                          price="$29" 
                          features={["Priority Access", "Verified Badge", "Unlimited Applications"]} 
                          selected={formik.values.subscriptionPlan === "pro"}
                          onClick={() => formik.setFieldValue("subscriptionPlan", "pro")}
                          isDark={isDark}
                          recommended
                        />
                      </div>
                      
                      {/* Terms */}
                      <div className="pt-4 border-t border-gray-200/10">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            formik.values.termsAccepted 
                              ? "bg-purple-600 border-purple-600" 
                              : isDark ? "border-gray-600" : "border-gray-300"
                          }`}>
                            {formik.values.termsAccepted && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <input 
                            type="checkbox" 
                            name="termsAccepted" 
                            className="hidden" 
                            onChange={formik.handleChange} 
                            checked={formik.values.termsAccepted} 
                          />
                          <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            I agree to the <span className="text-purple-500 font-medium">Terms of Service</span> and <span className="text-purple-500 font-medium">Privacy Policy</span>.
                          </div>
                        </label>
                         {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                           <div className="text-red-400 text-xs mt-1 ml-8">{formik.errors.termsAccepted}</div>
                         )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-4 mt-8 pt-4">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${isDark ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      Back
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={currentStep === 3 ? formik.handleSubmit : handleNext}
                    disabled={formik.isSubmitting}
                    className={`flex-1 py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${isDark
                      ? "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-purple-500/20"
                      : "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-purple-400/30"
                    }`}
                  >
                    {formik.isSubmitting ? (
                       <Sparkles className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {currentStep === 3 ? "Complete Registration" : "Continue"}
                        {currentStep !== 3 && <ArrowRight className="w-5 h-5" />}
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Already have an account? <button type="button" onClick={onSignIn} className="text-purple-500 hover:underline">Sign In</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// Demo Wrapper for preview
const RegisterPageDemo = () => (
  <RegisterPage
    heroImageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2160&q=80"
    onGoogleSignUp={() => toast.info("🚀 Google sign-up integration coming soon!")}
    onGithubSignUp={() => toast.info("🚀 GitHub sign-up integration coming soon!")}
    onSignIn={() => toast.info("✨ Redirecting to login...")}
    defaultTheme="dark"
  />
);

export default RegisterPageDemo;