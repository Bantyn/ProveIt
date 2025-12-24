import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import {
  Building2,
  Mail,
  Lock,
  Globe,
  Fingerprint,
  MapPin,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  Eye,
  EyeOff,
  AlertCircle,
  Shield,
  Rocket,
  Target,
  Zap,
  Star,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react";
import AuroraBackground from "./AuroraBackground";

/* ===================== Analytics Tracking ===================== */
const trackEvent = (event, data = {}) => {
  if (window.gtag) {
    window.gtag('event', event, {
      ...data,
      app_name: 'ProveIt.io',
      event_timestamp: new Date().toISOString(),
    });
  }
  console.log(`[Analytics] ${event}:`, data);
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, ...data }),
  }).catch(() => { });
};

/* ===================== Theme Toggle ===================== */
const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = stored || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
    trackEvent('theme_toggle', { theme: next });
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-4 right-4 sm:top-6 sm:right-6 z-50
        p-2.5 sm:p-3 rounded-full
        bg-white/80 dark:bg-black/50
        backdrop-blur-xl
        border border-zinc-200 dark:border-white/10
        shadow-lg shadow-purple-500/5
        transition-all duration-300
        hover:scale-110 active:scale-95
        hover:border-purple-500/30
        group
      "
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-yellow-300 transition-colors" />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 group-hover:text-purple-600 transition-colors" />
      )}
    </button>
  );
};

/* ===================== Brand ===================== */
const BrandLogo = ({ isMobile = false }) => (
  <div className={`flex items-center gap-3 sm:gap-4 ${isMobile ? 'mb-6' : 'mb-8 sm:mb-10'} select-none group`}>
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-900 to-black border border-purple-500/20 flex items-center justify-center shadow-2xl shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
        <Building2 className="text-white w-5 h-5 sm:w-7 sm:h-7" />
        <div className="absolute -inset-1 rounded-2xl border-2 border-purple-500/30 animate-ping opacity-0 group-hover:opacity-100"></div>
      </div>
    </div>
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
        ProveIt<span className="text-purple-500 group-hover:text-transparent mx-0.5">.</span>io
      </h2>
      <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold text-purple-600 dark:text-purple-400 opacity-80 group-hover:opacity-100 transition-opacity">
        Skill-Verified Recruitment
      </p>
    </div>
  </div>
);

/* ===================== TypeWrite Effect ===================== */
const TypeWriterText = ({ texts, gradient = "from-purple-600 via-pink-500 to-orange-400" }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1500);
      return () => clearTimeout(pauseTimeout);
    }

    const currentFullText = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentTextIndex, texts]);

  return (
    <span className="relative">
      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} font-black`}>
        {currentText}
      </span>
      <span className={`inline-block w-1 h-6 sm:h-8 ml-1 bg-gradient-to-b from-purple-500 to-pink-500 ${!isPaused ? 'animate-pulse' : ''}`}></span>
    </span>
  );
};

/* ===================== Background Elements ===================== */
const FloatingShapes = () => {
  const shapes = [
    { color: 'from-purple-500/20 to-pink-500/20', size: 'w-32 h-32', position: 'top-10 left-10', animation: 'animate-float-slow' },
    { color: 'from-blue-500/15 to-cyan-500/15', size: 'w-24 h-24', position: 'bottom-20 right-16', animation: 'animate-float-medium' },
    { color: 'from-orange-500/15 to-yellow-500/15', size: 'w-40 h-40', position: 'top-1/3 right-1/4', animation: 'animate-float-slowest' },
    { color: 'from-green-500/10 to-emerald-500/10', size: 'w-28 h-28', position: 'bottom-1/4 left-1/3', animation: 'animate-float-medium' },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <div
          key={index}
          className={`absolute ${shape.position} ${shape.size} ${shape.animation} rounded-full bg-gradient-to-br ${shape.color} blur-2xl pointer-events-none`}
        />
      ))}
    </>
  );
};

const GridPattern = () => (
  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
    <div className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                        linear-gradient(to bottom, #888 1px, transparent 1px)`,
      backgroundSize: '50px 50px',
    }} />
  </div>
);

const FloatingStars = () => {
  const stars = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <>
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 animate-pulse pointer-events-none"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </>
  );
};

/* ===================== Features Grid ===================== */
const FeaturesGrid = () => {
  const features = [
    {
      icon: Target,
      title: "Project-Based Hiring",
      description: "Real GitHub projects & source files",
      gradient: "from-purple-500 to-pink-500",
      delay: "0"
    },
    {
      icon: Shield,
      title: "Plagiarism Check",
      description: "Built-in verification system",
      gradient: "from-blue-500 to-cyan-500",
      delay: "100"
    },
    {
      icon: Award,
      title: "Skill Ranking",
      description: "Merit-driven automated ranking",
      gradient: "from-orange-500 to-yellow-500",
      delay: "200"
    },
    {
      icon: Rocket,
      title: "Fast Hiring",
      description: "Reduce time by up to 70%",
      gradient: "from-green-500 to-emerald-500",
      delay: "300"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="p-4 rounded-2xl bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-500 group hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10"
          style={{ animationDelay: `${feature.delay}ms` }}
        >
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <feature.icon className="text-white w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-zinc-800 dark:text-white mb-2">{feature.title}</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

/* ===================== Stats Counter ===================== */
const StatsCounter = () => {
  const stats = [
    { value: "10K+", label: "Companies", icon: Building2 },
    { value: "500K+", label: "Candidates", icon: Users },
    { value: "85%", label: "Faster Hiring", icon: TrendingUp },
    { value: "4.9★", label: "Rating", icon: Star },
  ];

  return (
    <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-white/20 dark:border-white/10">
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <stat.icon className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ===================== Stepper ===================== */
const Stepper = ({ step }) => {
  const steps = ["Account", "Company", "Review"];

  return (
    <div className="relative mb-8 sm:mb-12">
      <div className="absolute top-5 left-4 right-4 h-0.5 bg-zinc-200 dark:bg-zinc-800 -z-0"></div>
      <div 
        className="absolute top-5 left-4 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 -z-0 transition-all duration-700"
        style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
      />

      <div className="flex justify-between relative z-10">
        {steps.map((s, i) => {
          const isActive = step === i + 1;
          const isCompleted = step > i + 1;

          return (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2
                ${isCompleted
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                    : isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-950 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400"
                  }`}
              >
                {isCompleted ? <CheckCircle2 size={14} className="sm:w-4 sm:h-4" /> : i + 1}
              </div>
              <span
                className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-2 transition-colors duration-300
                ${isActive || isCompleted ? "text-purple-600 dark:text-purple-400" : "text-zinc-400 dark:text-zinc-600"}`}
              >
                {s}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ===================== InputField Component ===================== */
const InputField = ({
  label,
  name,
  formik,
  type = "text",
  icon: Icon,
  helperText,
  optional = false,
  autoComplete,
  apiErrors = {},
  showPasswordStrength = false
}) => {
  const error = formik.touched[name] && formik.errors[name];
  const apiError = apiErrors[name];
  const hasValue = Boolean(formik.values[name]);
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${error || apiError ? "text-red-400" : "text-zinc-400"}`} />
          <label className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
            {label}
            {optional && <span className="text-zinc-400 ml-1 text-[10px]">(Optional)</span>}
          </label>
        </div>
        {optional && !hasValue && (
          <span className="text-[10px] text-zinc-400">Optional</span>
        )}
      </div>

      <div className="relative">
        <input
          type={isPasswordField && showPassword ? "text" : type}
          {...formik.getFieldProps(name)}
          autoComplete={autoComplete}
          className={`
            w-full pl-10 pr-4 py-3 rounded-xl
            bg-white/70 dark:bg-zinc-900/70
            backdrop-blur-sm
            border transition-all duration-300
            text-zinc-900 dark:text-white
            placeholder:text-zinc-400 dark:placeholder:text-zinc-500
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${error || apiError
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
              : "border-zinc-200 dark:border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"}
          `}
          placeholder={`Enter ${label.toLowerCase()}`}
        />

        <Icon
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300
          ${error || apiError ? "text-red-400" : "text-zinc-400"}`}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-purple-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      <div className="min-h-[20px]">
        {(error || apiError) && (
          <div className="flex items-center gap-1.5 mt-1">
            <AlertCircle className="w-3 h-3 text-red-500" />
            <p className="text-[11px] text-red-500 font-medium">
              {error || apiError}
            </p>
          </div>
        )}
        {helperText && !error && !apiError && (
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
            {helperText}
          </p>
        )}
        {showPasswordStrength && name === 'password' && (
          <div className="mt-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i <= (formik.values.password?.length || 0) / 2 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-zinc-200 dark:bg-zinc-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ===================== Main Component ===================== */
const CompanySignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [emailValidating, setEmailValidating] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  useEffect(() => {
    trackEvent('page_view', { page: 'company_signup' });
  }, []);

  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      password: "",
      website: "",
      gst: "",
      address: "",
      teamSize: "",
    },
    validationSchema: step === 1 ? Yup.object({
      companyName: Yup.string().required("Company name is required").min(2),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required").min(8),
      website: Yup.string().url("Invalid URL").nullable(),
    }) : step === 2 ? Yup.object({
      gst: Yup.string().required("GST is required"),
      address: Yup.string().required("Address is required").min(10),
      teamSize: Yup.string().required("Team size is required"),
    }) : Yup.object({}),
    onSubmit: async (values) => {
      if (!termsAccepted) {
        toast.error('Please accept the terms');
        return;
      }

      setIsSubmitting(true);
      setApiErrors({});
      trackEvent('form_submission_start', { step: 3 });

      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        trackEvent('form_submission_success', values);
        
        toast.success('Account created successfully!', { duration: 3000 });
        localStorage.removeItem('companySignupData');
        
        setTimeout(() => navigate("/signup/companySignup/plan_selection"), 2000);
      } catch (error) {
        toast.error('Signup failed. Please try again.');
        trackEvent('form_submission_error', { error: error.message });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    localStorage.setItem('companySignupData', JSON.stringify(formik.values));
  }, [formik.values]);

  useEffect(() => {
    const saved = localStorage.getItem('companySignupData');
    if (saved) {
      formik.setValues(JSON.parse(saved));
    }
  }, []);

  const next = useCallback(async () => {
    const errors = await formik.validateForm();
    if (!Object.keys(errors).length) {
      trackEvent('form_step_complete', { step });
      setStep(step + 1);
    } else {
      const touched = Object.keys(errors).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      formik.setTouched(touched);
      toast.error(`Please fix ${Object.keys(errors).length} error(s)`);
    }
  }, [step, formik]);

  const goBack = useCallback(() => {
    trackEvent('form_step_back', { step });
    setStep(step - 1);
  }, [step]);

  return (
    <AuroraBackground>
      <ThemeToggle />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            color: '#1e293b',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
          },
        }}
      />

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white/90 dark:bg-black/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden">
          {/* Mobile Header - Visible only on small screens */}
          <div className="xl:hidden p-6 pb-0">
            <BrandLogo isMobile={true} />
            <div className="mt-6 text-center">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                Scale Teams With <br />
                <TypeWriterText
                  texts={["Skills.", "Proof.", "Growth.", "Excellence."]}
                  gradient="from-purple-600 via-pink-500 to-orange-400"
                />
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Join thousands of companies hiring with confidence
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2">
            {/* LEFT SIDE - Enhanced Background */}
            <div className="hidden lg:flex flex-col p-8 xl:p-12 relative overflow-hidden">
              {/* Animated Gradient Background */}
              <div className="absolute inset-0">
                {/* Main gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50/30 dark:from-purple-950/30 dark:via-black dark:to-pink-950/20" />
                
                {/* Animated blobs */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
                
                {/* Grid pattern */}
                <GridPattern />
                
                {/* Floating shapes */}
                <FloatingShapes />
                
                {/* Floating stars */}
                <FloatingStars />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col">
                <BrandLogo />
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                        Trusted by 10,000+ Companies
                      </span>
                    </div>
                    
                    <h1 className="text-3xl xl:text-4xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
                      Hire Based on <br />
                      <TypeWriterText
                        texts={["Real Skills.", "Actual Projects.", "Verified Talent.", "Proven Results."]}
                        gradient="from-purple-600 via-pink-500 to-orange-400"
                      />
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-300 text-lg mb-6">
                      Transform your hiring with skill-verified recruitment. 
                      Candidates demonstrate abilities through real projects.
                    </p>
                  </div>

                  <FeaturesGrid />
                  
                  <StatsCounter />

                  <div className="mt-12 pt-8 border-t border-white/20 dark:border-white/10">
                    <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>Enterprise Security</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-500" />
                        <span>30-Day Free Trial</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Form */}
            <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
              <div className="max-w-md mx-auto">
                {/* Desktop Step Title */}
                <div className="hidden sm:block mb-8">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                    {step === 1 ? "Create Company Account" : 
                     step === 2 ? "Business Details" : 
                     "Review & Submit"}
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {step === 1 ? "Start your free trial today" : 
                     step === 2 ? "Tell us about your company" : 
                     "Final step to get started"}
                  </p>
                </div>

                <Stepper step={step} />

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-6">
                      <InputField
                        label="Company Name"
                        name="companyName"
                        icon={Building2}
                        formik={formik}
                        autoComplete="organization"
                        helperText="Legal business name"
                      />
                      <InputField
                        label="Work Email"
                        name="email"
                        icon={Mail}
                        formik={formik}
                        type="email"
                        autoComplete="email"
                        helperText="Use your company email"
                      />
                      <InputField
                        label="Password"
                        name="password"
                        type="password"
                        icon={Lock}
                        formik={formik}
                        autoComplete="new-password"
                        showPasswordStrength={true}
                      />
                      <InputField
                        label="Website"
                        name="website"
                        icon={Globe}
                        formik={formik}
                        optional={true}
                        autoComplete="url"
                        helperText="Optional - e.g., https://company.com"
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <InputField
                        label="GST Number"
                        name="gst"
                        icon={Fingerprint}
                        formik={formik}
                        helperText="15-character GSTIN format"
                      />
                      <InputField
                        label="Business Address"
                        name="address"
                        icon={MapPin}
                        formik={formik}
                        helperText="Registered business address"
                      />
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Team Size
                        </label>
                        <select
                          {...formik.getFieldProps("teamSize")}
                          className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                        >
                          <option value="">Select Team Size</option>
                          <option value="1-10">1-10 Employees</option>
                          <option value="11-50">11-50 Employees</option>
                          <option value="51-200">51-200 Employees</option>
                          <option value="200+">200+ Employees</option>
                        </select>
                        {formik.touched.teamSize && formik.errors.teamSize && (
                          <p className="text-[11px] text-red-500 mt-1">{formik.errors.teamSize}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
                        <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                          <CheckCircle2 className="text-green-500" />
                          Review Information
                        </h3>
                        <div className="space-y-4">
                          {[
                            { label: "Company", value: formik.values.companyName },
                            { label: "Email", value: formik.values.email },
                            { label: "GST", value: formik.values.gst },
                            { label: "Team Size", value: formik.values.teamSize },
                            { label: "Address", value: formik.values.address },
                            { label: "Website", value: formik.values.website }
                          ].map((item, index) => (
                            item.value && (
                              <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.label}</span>
                                <span className="text-sm font-medium text-zinc-900 dark:text-white">{item.value}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="mt-1 w-4 h-4 rounded accent-purple-600"
                          />
                          <label htmlFor="terms" className="text-sm text-zinc-600 dark:text-zinc-400">
                            I agree to the <button type="button" className="text-purple-600 dark:text-purple-400 hover:underline">Terms</button> and <button type="button" className="text-purple-600 dark:text-purple-400 hover:underline">Privacy Policy</button>
                          </label>
                        </div>

                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={marketingOptIn}
                            onChange={(e) => setMarketingOptIn(e.target.checked)}
                            className="mt-1 w-4 h-4 rounded accent-purple-600"
                          />
                          <label className="text-sm text-zinc-600 dark:text-zinc-400">
                            Send me product updates and hiring insights
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={goBack}
                        disabled={isSubmitting}
                        className="px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 flex items-center gap-2"
                      >
                        <ChevronLeft size={16} />
                        Back
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={step === 3 ? formik.handleSubmit : next}
                      disabled={isSubmitting || (step === 3 && !termsAccepted)}
                      className={`
                        flex-1 py-3 rounded-lg font-semibold text-white
                        bg-gradient-to-r from-purple-600 to-pink-600
                        hover:from-purple-500 hover:to-pink-500
                        transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2
                      `}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : step === 3 ? (
                        <>
                          Create Account
                          <CheckCircle2 size={16} />
                        </>
                      ) : (
                        <>
                          Continue
                          <ChevronRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Footer Links */}
                <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="text-center text-xs text-zinc-500 dark:text-zinc-400">
                    <p className="mb-2">Already have an account? <button className="text-purple-600 dark:text-purple-400 hover:underline">Sign in</button></p>
                    <div className="flex items-center justify-center gap-4">
                      <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Secure & Encrypted
                      </span>
                      <span>•</span>
                      <span>GDPR Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes float-slowest {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        .animate-float-slowest {
          animation: float-slowest 8s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </AuroraBackground>
  );
};

export default CompanySignup;