
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
} from "lucide-react";
import AuroraBackground from "./AuroraBackground";

/* ===================== Analytics Tracking ===================== */

const trackEvent = (event, data = {}) => {
  // Google Analytics (if configured)
  if (window.gtag) {
    window.gtag('event', event, {
      ...data,
      app_name: 'ProveIt.io',
      event_timestamp: new Date().toISOString(),
    });
  }

  // Custom analytics
  console.log(`[Analytics] ${event}:`, data);

  // Send to your analytics endpoint
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, ...data }),
  }).catch(() => { }); // Silent fail
};

/* ===================== Theme Toggle ===================== */

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = stored || (prefersDark ? "dark" : "light"); // FIXED: Changed second "dark" to "light"
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

    // Analytics
    trackEvent('theme_toggle', { theme: next });
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-6 right-6 z-50
        p-3 rounded-full
        bg-zinc-100/80 dark:bg-black/50
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
        <Sun className="w-5 h-5 text-purple-400 group-hover:text-yellow-300 transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-zinc-600 group-hover:text-purple-600 transition-colors" />
      )}
    </button>
  );
};

/* ===================== Brand ===================== */

const BrandLogo = () => (
  <div className="flex items-center gap-4 mb-10 select-none group">
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-900 to-black border border-purple-500/20 flex items-center justify-center shadow-2xl shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
        <Building2 className="text-white w-7 h-7" />
        {/* Animated ring */}
        <div className="absolute -inset-1 rounded-2xl border-2 border-purple-500/30 animate-ping opacity-0 group-hover:opacity-100"></div>
      </div>
    </div>
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
        ProveIt<span className="text-purple-500 group-hover:text-transparent mx-0.5">.</span>io
      </h2>
      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-purple-600 dark:text-purple-400 opacity-80 group-hover:opacity-100 transition-opacity">
        Skill-Verified Recruitment
      </p>
    </div>
  </div>
);

/* ===================== TypeWrite Effect ===================== */

const TypeWriterText = ({ texts, gradient = "from-purple-600 via-pink-500 to-orange-400", typingSpeed = 100, deletingSpeed = 50, pauseDuration = 1500 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    const currentFullText = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="relative">
      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} font-black`}>
        {currentText}
      </span>
      {/* Blinking cursor */}
      <span className={`inline-block w-1 h-12 ml-1 bg-gradient-to-b from-purple-500 to-pink-500 ${!isPaused ? 'animate-pulse' : ''}`}></span>

      {/* Animated underline */}
      <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-orange-500/30 rounded-full overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-slideRight"></span>
      </span>
    </span>
  );
};

/* ===================== Password Strength Indicator ===================== */

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return Math.min(score, 5);
  };

  const strength = calculateStrength(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-emerald-600'
  ];

  if (!password) return null;

  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${i <= strength ? strengthColors[strength - 1] || 'bg-red-500' : 'bg-zinc-200 dark:bg-zinc-700'
              }`}
          />
        ))}
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Password strength: <span className={`font-bold ${strength >= 4 ? 'text-green-500' :
          strength >= 3 ? 'text-blue-500' :
            strength >= 2 ? 'text-yellow-500' :
              'text-red-500'
          }`}>
          {strengthLabels[strength - 1] || 'None'}
        </span>
      </p>
    </div>
  );
};

/* ===================== Enhanced InputField Component ===================== */

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
    <div className="relative group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Icon
            className={`transition-colors duration-300 ${error || apiError ? "text-red-400" : "text-zinc-400 group-focus-within:text-purple-500"
              }`}
            size={16}
          />
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            {label}
            {optional && <span className="text-zinc-400 ml-1">(Optional)</span>}
          </label>
        </div>
        {optional && !hasValue && (
          <span className="text-[10px] text-zinc-400 italic">Optional</span>
        )}
      </div>

      <div className="relative">
        <input
          type={isPasswordField && showPassword ? "text" : type}
          {...formik.getFieldProps(name)}
          autoComplete={autoComplete}
          className={`
            peer w-full pl-12 pr-4 py-3 rounded-xl
            bg-white/50 dark:bg-zinc-900/70
            backdrop-blur-md
            border-2 transition-all duration-300
            text-zinc-900 dark:text-white font-medium
            placeholder-transparent
            focus:outline-none
            ${error || apiError
              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : "border-zinc-200 dark:border-white/10 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"}
          `}
          placeholder={label}
        />

        <Icon
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${error || apiError ? "text-red-400" : "text-zinc-400 peer-focus:text-purple-500"
            }`}
          size={20}
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
          <div className="flex items-start gap-2 mt-1.5 animate-fadeIn">
            <AlertCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-red-500 font-semibold">
              {error || apiError}
            </p>
          </div>
        )}
        {showPasswordStrength && name === 'password' && (
          <PasswordStrengthIndicator password={formik.values.password} />
        )}
        {helperText && !error && !apiError && (
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
};

/* ===================== Stepper ===================== */

const Stepper = ({ step }) => {
  const steps = ["Account", "Verification", "Review"];

  return (
    <div className="flex items-center justify-between mb-12 relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 dark:bg-zinc-800 -z-0"></div>

      {steps.map((s, i) => {
        const isActive = step === i + 1;
        const isCompleted = step > i + 1;

        return (
          <React.Fragment key={s}>
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-4
                ${isCompleted
                    ? "bg-green-500 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    : isActive
                      ? "bg-purple-600 border-purple-950 text-white shadow-[0_0_20px_rgba(147,51,234,0.5)] scale-110"
                      : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400"
                  }`}
              >
                {isCompleted ? <CheckCircle2 size={18} /> : i + 1}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300
                ${isActive || isCompleted ? "text-purple-600 dark:text-purple-400" : "text-zinc-400 dark:text-zinc-600"}`}
              >
                {s}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className={`absolute top-1/2 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-700 ease-out -z-0
                 ${step > i + 1 ? "w-1/2" : step > i ? "w-0" : "w-0"}`}
                style={{
                  left: i === 0 ? '16%' : '50%',
                  width: step > i + 1 ? '34%' : '0%'
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* ===================== Enhanced Validation ===================== */

const stepOneSchema = Yup.object({
  companyName: Yup.string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email address is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .test('work-email', 'Please use a work email address', (value) => {
      if (!value) return true;
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
      const domain = value.split('@')[1];
      return !personalDomains.includes(domain?.toLowerCase());
    }),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  website: Yup.string()
    .url("Please enter a valid URL")
    .test('is-valid-domain', 'Please enter a valid domain (e.g., https://example.com)', value =>
      !value || /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/.test(value)
    )
    .nullable(),
});

const stepTwoSchema = Yup.object({
  gst: Yup.string()
    .required("GST Number is required")
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GST format (e.g., 22AAAAA0000A1Z5)"
    )
    .uppercase(),
  address: Yup.string()
    .required("Business address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
  teamSize: Yup.string().required("Please select your team size"),
});

/* ===================== Main Component ===================== */

const CompanySignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [emailValidating, setEmailValidating] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [emailValidationAbort] = useState({ current: null });

  // Track initial page view
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
    validationSchema: step === 1 ? stepOneSchema : stepTwoSchema,
    onSubmit: async (values) => {
      if (!termsAccepted) {
        toast.error('Please accept the terms and conditions');
        return;
      }

      setIsSubmitting(true);
      setApiErrors({});

      trackEvent('form_submission_start', { step: 3 });

      try {
        // Simulate API call
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.1) { // 90% success rate for demo
              resolve();
            } else {
              reject(new Error('Server error. Please try again.'));
            }
          }, 1500);
        });

        trackEvent('form_submission_success', {
          company_name_length: values.companyName.length,
          team_size: values.teamSize,
          marketing_opt_in: marketingOptIn
        });

        toast.success('Account created successfully! Redirecting...', {
          duration: 3000,
          icon: '🎉',
        });

        // Clear saved data
        localStorage.removeItem('companySignupData');

        // Navigate after success
        setTimeout(() => {
          navigate("/signup/companySignup/plan_selection");
        }, 2000);

      } catch (error) {
        console.error('Signup error:', error);
        trackEvent('form_submission_error', { error: error.message });

        // Simulated API errors
        const mockErrors = {
          email: Math.random() > 0.5 ? 'Email already exists' : null,
          gst: Math.random() > 0.7 ? 'Invalid GST number' : null,
        };

        const realErrors = {};
        Object.entries(mockErrors).forEach(([key, value]) => {
          if (value) realErrors[key] = value;
        });

        if (Object.keys(realErrors).length > 0) {
          setApiErrors(realErrors);
          toast.error('Please check the highlighted fields');
        } else {
          toast.error(error.message || 'Signup failed. Please try again.');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Save form data to localStorage (MOVED BELOW formik declaration)
  useEffect(() => {
    localStorage.setItem('companySignupData', JSON.stringify(formik.values));
  }, [formik.values]);

  // Load saved data on mount (MOVED BELOW formik declaration)
  useEffect(() => {
    const saved = localStorage.getItem('companySignupData');
    if (saved) {
      formik.setValues(JSON.parse(saved));
      toast.success('Loaded previously saved data', { duration: 2000 });
    }
  }, []); // Empty dependency array since formik is stable

  // Email validation (debounced) with cleanup
  useEffect(() => {
    // Abort previous validation
    if (emailValidationAbort.current) {
      emailValidationAbort.current();
    }

    const currentEmail = formik.values.email;

    const validateEmail = async () => {
      if (currentEmail && currentEmail.length > 3 && !formik.errors.email) {
        setEmailValidating(true);
        try {
          // Create abort controller for this validation
          let aborted = false;
          emailValidationAbort.current = () => { aborted = true; };

          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));

          // Check if still valid (not aborted)
          if (aborted || currentEmail !== formik.values.email) return;

          const isValid = Math.random() > 0.3; // Mock validation
          if (!isValid) {
            formik.setFieldError('email', 'This email is already registered');
          }
        } catch (error) {
          console.error('Email validation error:', error);
        } finally {
          if (currentEmail === formik.values.email) {
            setEmailValidating(false);
          }
        }
      }
    };

    const timeoutId = setTimeout(validateEmail, 1000);
    return () => {
      clearTimeout(timeoutId);
      if (emailValidationAbort.current) {
        emailValidationAbort.current();
        emailValidationAbort.current = null;
      }
    };
  }, [formik.values.email]);

  // Keyboard navigation support (MOVED BELOW formik declaration)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (step < 3) {
          next();
        } else if (termsAccepted) {
          formik.handleSubmit();
        } else {
          toast.error('Please accept the terms and conditions');
        }
      }

      if (e.key === 'Escape' && step > 1) {
        e.preventDefault();
        setStep(step - 1);
        trackEvent('form_step_back', { step });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [step, termsAccepted, formik]);

  const next = useCallback(async () => {
    const errors = await formik.validateForm();
    if (!Object.keys(errors).length) {
      trackEvent('form_step_complete', {
        step,
        step_name: ['Account', 'Verification', 'Review'][step - 1],
        field_values: formik.values
      });
      setStep(step + 1);
      toast.success(`Moving to step ${step + 1}`, { duration: 1500 });
    } else {
      trackEvent('form_validation_error', {
        step,
        errors: Object.keys(errors),
        error_count: Object.keys(errors).length
      });
      // FIXED: Convert errors to touched format
      const touched = Object.keys(errors).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      formik.setTouched(touched);
      toast.error(`Please fix ${Object.keys(errors).length} error(s) before continuing`);
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
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            // Modern Glassmorphism Base
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            color: '#1e293b', // slate-800
            borderRadius: '16px',
            padding: '12px 20px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            fontSize: '15px',
            fontWeight: '600',
            letterSpacing: '-0.01em',
          },
          success: {
            iconTheme: {
              primary: '#7c3aed', // violet-600 to match your theme
              secondary: '#fff',
            },
            style: {
              // Subtle left accent border for success
              borderLeft: '5px solid #10b981', // emerald-500
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#064e3b', // emerald-900
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444', // red-500
              secondary: '#fff',
            },
            style: {
              // Subtle left accent border for error
              borderLeft: '5px solid #ef4444',
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#7f1d1d', // red-900
            },
          },
        }}
      />

      <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 xl:p-10">
        <div className="
    w-full max-w-8xl 2xl:max-w-8xl grid xl:grid-cols-2
    bg-white/85 dark:bg-black/70
    backdrop-blur-3xl rounded-[2.5rem]
    border border-white/25 dark:border-white/15
    shadow-[0_25px_100px_-25px_rgba(0,0,0,0.4)]
    dark:shadow-[0_0_60px_-15px_rgba(107,33,168,0.25)]
    overflow-hidden
    transition-colors duration-500
  ">
          {/* LEFT - Branding Side */}
          <div className="hidden xl:flex relative p-16 xl:p-20 2xl:p-24 flex-col justify-center bg-gradient-to-br from-zinc-50 via-white to-purple-50/30 dark:from-zinc-950 dark:via-black dark:to-purple-950/20 overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
              <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-[180px] animate-blob"></div>
              <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-multiply filter blur-[180px] animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500 rounded-full mix-blend-multiply filter blur-[180px] animate-blob animation-delay-4000 opacity-60"></div>
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] opacity-30"></div>

            <div className="relative z-10">
              <div className="mb-12">
                <BrandLogo />
              </div>

              {/* Main Heading with Typewriter Effect */}
              <div className="mb-6">
                <h1 className="text-xl xl:text-2xl 2xl:text-4xl font-black text-zinc-900 dark:text-white mb-4 leading-[1.1] tracking-tight">
                  Scale Teams With <br />
                  <TypeWriterText
                    texts={[
                      "Skills.",
                      "People.",
                      "Proof,not promises.",
                      "Growth."
                    ]}
                    gradient="from-purple-600 via-pink-500 to-orange-400"
                    typingSpeed={80}
                    deletingSpeed={40}
                    pauseDuration={1500}
                  />
                </h1>
              </div>

              {/* Platform Description */}
              <div className="mb-10 p-7 rounded-3xl bg-white/60 dark:bg-black/60 backdrop-blur-lg border border-white/40 dark:border-white/10 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Building2 className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        ProveIt.io
                      </span> – The ultimate skill-verified recruitment platform where candidates demonstrate real abilities through practical projects, not just resumes. Transform your hiring with merit-based evaluations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
                <div className="p-5 rounded-xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 group hover:scale-[1.02]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <CheckCircle2 className="text-purple-600 dark:text-purple-400 w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-800 dark:text-white">Project-Based Hiring</h3>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Candidates submit GitHub repos or source files to demonstrate real skills.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 group hover:scale-[1.02]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Users className="text-pink-600 dark:text-pink-400 w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-800 dark:text-white">Skill-Verified Recruitment</h3>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Merit-driven selection with built-in plagiarism checks and ranking system.
                  </p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-purple-500/20 backdrop-blur-sm relative overflow-hidden group">
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
                      style={{
                        top: `${20 + i * 30}%`,
                        left: `${10 + i * 40}%`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    />
                  ))}
                </div>

                {/* Glowing border on hover */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500"></div>

                <div className="text-center relative z-10">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1 flex items-center justify-center">
                    500+
                    <div className="ml-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-medium">
                    Companies
                  </div>
                  <div className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-500">
                    Trusted partners
                  </div>
                </div>

                <div className="text-center relative z-10">
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1 flex items-center justify-center">
                    15K+
                    <div className="ml-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-medium">
                    Candidates
                  </div>
                  <div className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-500">
                    Skill-verified
                  </div>
                </div>

                <div className="text-center relative z-10">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1 flex items-center justify-center">
                    95%
                    <div className="ml-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-medium">
                    Success Rate
                  </div>
                  <div className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-500">
                    Hiring success
                  </div>
                </div>
              </div>

              {/* Trusted By Section */}
              <div className="mt-8 relative">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mb-4 uppercase tracking-wider">
                  <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    Trusted by innovators
                  </span>
                </p>

                <div className="flex justify-center items-center gap-3">
                  {[
                    { initials: "TC", color: "purple", name: "TechCorp" },
                    { initials: "IN", color: "blue", name: "InnovateNow" },
                    { initials: "FB", color: "green", name: "FutureBuild" },
                    { initials: "GG", color: "orange", name: "GlobalGrid" },
                    { initials: "AM", color: "yellow", name: "AlphaMind" }
                  ].map((company, index) => (
                    <div key={company.initials} className="group relative">
                      {/* Particle explosion container */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className={`absolute w-1 h-1 bg-${company.color}-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700`}
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              animation: `explode 0.7s ease-out forwards`,
                              animationDelay: `${i * 0.05}s`
                            }}
                          />
                        ))}
                      </div>

                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br from-${company.color}-500 to-${company.color}-600 flex items-center justify-center text-white font-bold text-xs shadow-lg transition-all duration-300 cursor-pointer relative z-10
          group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-${company.color}-500/30`}>
                        {company.initials}

                        {/* Inner glow */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Simple tooltip */}
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[10px] text-zinc-600 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {company.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Form Side */}
          <div className="p-8 lg:p-12 xl:p-16 2xl:p-20 bg-white/60 dark:bg-black/50 backdrop-blur-xl relative">
            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-tr-full"></div>

            <div className="max-w-xl mx-auto">
              <div className="mb-10 text-center lg:text-left">
                <div className="flex items-center gap-2 mb-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                      style={{ width: i === step ? '40px' : '20px' }}
                    />
                  ))}
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                  {step === 1 ? "Create Account" : step === 2 ? "Business Details" : "Review & Submit"}
                </h3>

                <p className="text-base text-zinc-500 dark:text-zinc-400 mb-3">
                  {step === 1 ? "Start your 30-day free trial with full access." : step === 2 ? "Tell us about your organization." : "Verify your information and submit."}
                </p>

                <div className="text-sm text-zinc-600 dark:text-zinc-500">
                  <span className="font-medium text-purple-600 dark:text-purple-400">Step {step}</span> • {step === 1 ? "Account Information" : step === 2 ? "Company Details" : "Final Review"}
                </div>
              </div>

              <Stepper step={step} />

              <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
                {step === 1 && (
                  <div className="space-y-7 animate-slideUpFade">
                    <InputField
                      label="Company Name"
                      name="companyName"
                      icon={Building2}
                      formik={formik}
                      autoComplete="organization"
                      helperText="Legal business name"
                      apiErrors={apiErrors}
                    />
                    <InputField
                      label="Work Email"
                      name="email"
                      icon={Mail}
                      formik={formik}
                      type="email"
                      autoComplete="email"
                      helperText={emailValidating ? "Checking availability..." : "Use your company email"}
                      apiErrors={apiErrors}
                    />
                    <InputField
                      label="Password"
                      name="password"
                      type="password"
                      icon={Lock}
                      formik={formik}
                      autoComplete="new-password"
                      helperText="At least 8 characters with uppercase, lowercase, number & special character"
                      showPasswordStrength={true}
                      apiErrors={apiErrors}
                    />
                    <InputField
                      label="Website URL"
                      name="website"
                      icon={Globe}
                      formik={formik}
                      optional={true}
                      autoComplete="url"
                      helperText="e.g., https://yourcompany.com"
                      apiErrors={apiErrors}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-7 animate-slideUpFade">
                    <InputField
                      label="GST Number"
                      name="gst"
                      icon={Fingerprint}
                      formik={formik}
                      helperText="15-character GSTIN format (e.g., 22AAAAA0000A1Z5)"
                      apiErrors={apiErrors}
                    />
                    <InputField
                      label="Business Address"
                      name="address"
                      icon={MapPin}
                      formik={formik}
                      helperText="Registered business address"
                      apiErrors={apiErrors}
                    />
                    <div className="relative group">
                      <Users className="absolute left-4 top-4 text-zinc-400" size={20} />
                      <select
                        {...formik.getFieldProps("teamSize")}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white appearance-none focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all hover:border-purple-400 cursor-pointer"
                      >
                        <option value="" disabled>Select Team Size</option>
                        <option value="1-10">1-10 Employees</option>
                        <option value="11-50">11-50 Employees</option>
                        <option value="51-200">51-200 Employees</option>
                        <option value="200+">200+ Employees</option>
                        <option value="500+">500+ Employees</option>
                      </select>
                      <ChevronRight className="absolute right-4 top-4 text-zinc-400 rotate-90" size={16} />
                      {formik.touched.teamSize && formik.errors.teamSize && (
                        <p className="mt-1 ml-2 text-[11px] text-red-500 font-medium">{formik.errors.teamSize}</p>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-7 animate-scaleIn">
                    {/* Data Summary */}
                    <div className="p-7 rounded-3xl bg-gradient-to-br from-purple-500/15 via-pink-500/15 to-orange-500/15 border border-purple-500/25 backdrop-blur-sm">
                      <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                          <CheckCircle2 className="text-white w-5 h-5" />
                        </div>
                        Review Your Information
                      </h4>

                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="p-4 rounded-xl bg-white/50 dark:bg-black/50">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Company Name</p>
                            <p className="font-semibold text-zinc-900 dark:text-white">{formik.values.companyName || "—"}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/50 dark:bg-black/50">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Email</p>
                            <p className="font-semibold text-zinc-900 dark:text-white">{formik.values.email || "—"}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/50 dark:bg-black/50">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">GST Number</p>
                            <p className="font-semibold font-mono text-zinc-900 dark:text-white">{formik.values.gst || "—"}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/50 dark:bg-black/50">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Team Size</p>
                            <p className="font-semibold text-zinc-900 dark:text-white">
                              {formik.values.teamSize ? `${formik.values.teamSize} employees` : "—"}
                            </p>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/50 dark:bg-black/50">
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Business Address</p>
                          <p className="font-semibold text-zinc-900 dark:text-white">{formik.values.address || "—"}</p>
                        </div>
                        {formik.values.website && (
                          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/20">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Website</p>
                            <p className="font-semibold text-purple-600 dark:text-purple-400">
                              {formik.values.website}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900/70 dark:to-black/70 backdrop-blur-sm border border-zinc-200 dark:border-white/10">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => {
                          setTermsAccepted(e.target.checked);
                          trackEvent('terms_toggle', { accepted: e.target.checked });
                        }}
                        className="mt-1 w-5 h-5 rounded-md accent-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-zinc-600 dark:text-zinc-400 flex-1 cursor-pointer">
                        I agree to the{" "}
                        <button
                          type="button"
                          className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                          onClick={(e) => {
                            e.preventDefault();
                            trackEvent('terms_click');
                            window.open('/terms', '_blank');
                          }}
                        >
                          Terms of Service
                        </button>
                        ,{" "}
                        <button
                          type="button"
                          className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                          onClick={(e) => {
                            e.preventDefault();
                            trackEvent('privacy_click');
                            window.open('/privacy', '_blank');
                          }}
                        >
                          Privacy Policy
                        </button>
                        , and acknowledge that this is a business account subject to additional verification and compliance checks.
                      </label>
                    </div>

                    {/* Marketing preferences */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/15">
                      <label className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={marketingOptIn}
                          onChange={(e) => {
                            setMarketingOptIn(e.target.checked);
                            trackEvent('marketing_opt_in', { opted_in: e.target.checked });
                          }}
                          className="w-5 h-5 rounded-md accent-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer group-hover:scale-110 transition-transform"
                        />
                        <span className="group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                          Send me product updates, hiring insights, and exclusive offers via email
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex gap-5 pt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={isSubmitting}
                      className="
                  px-8 py-4 rounded-xl font-bold transition-all duration-300
                  bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 
                  text-zinc-700 dark:text-zinc-300
                  hover:from-zinc-200 hover:to-zinc-300 dark:hover:from-zinc-800 dark:hover:to-zinc-700
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                  shadow-md hover:shadow-lg
                  min-w-[140px]
                "
                    >
                      <ChevronLeft size={18} />
                      Back
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={step === 3 ? formik.handleSubmit : next}
                    disabled={isSubmitting || emailValidating || (step === 3 && !termsAccepted)}
                    className={`
                flex-1 py-5 rounded-xl font-bold text-white shadow-xl
                bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500
                hover:from-purple-500 hover:via-pink-500 hover:to-orange-400
                transition-all duration-300
                flex items-center justify-center gap-3
                ${(isSubmitting || emailValidating || (step === 3 && !termsAccepted))
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:shadow-2xl hover:shadow-purple-500/30 active:scale-[0.98]'
                      }
                group
                text-lg
              `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : step === 3 ? (
                      termsAccepted ? (
                        <>
                          <span>Create Account</span>
                          <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
                        </>
                      ) : (
                        <span>Accept Terms to Continue</span>
                      )
                    ) : (
                      <>
                        <span>Continue</span>
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Progress indicator */}
              {isSubmitting && (
                <div className="mt-10 text-center">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                    Creating your enterprise account... This may take a moment
                  </p>
                  <div className="relative h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-pink-500 to-blue-500 animate-shimmer"></div>
                  </div>
                </div>
              )}

              {/* Security Badge */}
              <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Lock className="w-3 h-3 text-green-500" />
                  </div>
                  <span>256-bit SSL Encryption • GDPR Compliant • ISO 27001 Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default CompanySignup;