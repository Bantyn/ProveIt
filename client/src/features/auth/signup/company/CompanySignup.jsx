// // import { Link } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import {Link} from "react-router-dom"
// /* ===================== Reusable UI ===================== */

// const BrandLogo = () => (
//   <div className="flex items-center gap-3">
//     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
//       P
//     </div>
//     <span className="text-2xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//       ProveIt.io
//     </span>
//   </div>
// );

// const InputField = ({
//   label,
//   name,
//   value,
//   onChange,
//   placeholder,
//   type = "text",
//   error,
// }) => (
//   <div className="animate-fade-in">
//     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//       {label}
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className={`w-full px-4 py-3.5 rounded-xl border-1 bg-slate-50 dark:bg-slate-800/10 
//       dark:text-white transition-all duration-300 focus:outline-none focus:border-indigo-500
//       ${error ? "border-red-400" : "border-slate-200 dark:border-slate-700"}`}
//     />
//     {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//   </div>
// );

// const FeatureCard = ({ icon, title, desc }) => (
//   <div className="flex items-start gap-4 hover:-translate-y-1 bg-neutral-50/2 hover:bg-neutral-50/10 transition-all duration-300 p-3 rounded-xl">
//     <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow flex items-center justify-center text-xl">
//       {icon}
//     </div>
//     <div>
//       <h4 className="font-semibold text-slate-800 dark:text-white">{title}</h4>
//       <p className="text-slate-600 dark:text-slate-400 text-sm">{desc}</p>
//     </div>
//   </div>
// );

// /* ===================== Progress ===================== */

// const ProgressBar = ({ step, total }) => (
//   <div className="mb-6">
//     <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
//       <span>Step {step} of {total}</span>
//       <span>{Math.round((step / total) * 100)}%</span>
//     </div>
//     <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
//       <div
//         className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-700"
//         style={{ width: `${(step / total) * 100}%`,boxShadow:"0px 0px 10px 30px #9333EA" }}
//       />
//     </div>
//   </div>
// );

// /* ===================== Steps ===================== */

// const StepCompany = ({ data, onChange, errors }) => (
//   <div className="space-y-5 animate-slide-in">
//     <InputField label="Company Name" name="companyName" value={data.companyName} onChange={onChange} placeholder="Acme Technologies Pvt Ltd" error={errors.companyName} />
//     <InputField label="Company Website" name="website" value={data.website} onChange={onChange} placeholder="https://www.acme.com" />
//     <InputField label="Official Email" name="email" type="email" value={data.email} onChange={onChange} placeholder="hr@acme.com" error={errors.email} />
//     <InputField label="Create Password" name="password" type="password" value={data.password} onChange={onChange} placeholder="Minimum 6 characters" error={errors.password} />
//   </div>
// );

// const StepVerification = ({ data, onChange, errors }) => (
//   <div className="space-y-5 animate-slide-in">
//     <InputField label="GST / Tax ID" name="taxId" value={data.taxId} onChange={onChange} placeholder="27AAECS1234F1Z5" error={errors.taxId} />
//     <InputField label="Company PAN / Registration ID" name="pan" value={data.pan} onChange={onChange} placeholder="AAECS1234F" error={errors.pan} />
//     <InputField label="Registered Company Address" name="address" value={data.address} onChange={onChange} placeholder="401, Tech Park, Bengaluru, Karnataka, India" />
//     <InputField label="Team Size" name="teamSize" value={data.teamSize} onChange={onChange} placeholder="10 – 50 employees" />
//   </div>
// );

// const StepReview = ({ data }) => (
//   <div className="space-y-3 animate-slide-in text-sm">
//     {Object.entries(data).map(([k, v]) => (
//       <div key={k} className="flex justify-between border-b border-slate-200 dark:border-slate-700 py-2">
//         <span className="text-slate-600 dark:text-slate-400 capitalize">
//           {k.replace(/([A-Z])/g, " $1")}
//         </span>
//         <span className="font-medium text-slate-800 dark:text-white">{v || "-"}</span>
//       </div>
//     ))}
//   </div>
// );

// /* ===================== Main Page ===================== */

// const CompanySignup = () => {
//   const [step, setStep] = useState(1);
//   const totalSteps = 3;
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [data, setData] = useState({
//     companyName: "", website: "", email: "", password: "",
//     taxId: "", pan: "", address: "", teamSize: ""
//   });
//   const [particles, setParticles] = useState([]);

//   useEffect(() => {
//     setParticles(Array.from({ length: 18 }).map((_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 4 + 1,
//       speed: Math.random() * 20 + 10,
//     })));
//   }, []);

//   const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

//   const validate = () => {
//     const err = {};
//     if (step === 1) {
//       if (!data.companyName) err.companyName = "Required";
//       if (!data.email) err.email = "Required";
//       if (data.password.length < 6) err.password = "Minimum 6 characters";
//     }
//     if (step === 2) {
//       if (!data.taxId) err.taxId = "Required";
//       if (!data.pan) err.pan = "Required";
//     }
//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const next = () => validate() && setStep(s => s + 1);
//   const back = () => setStep(s => s - 1);

//   const submit = async () => {
//     setLoading(true);
//     await new Promise(r => setTimeout(r, 1500));
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br  relative overflow-hidden">

//       {/* Particles */}
//       {particles.map(p => (
//         <div key={p.id} className="absolute rounded-full bg-indigo-500/20"
//           style={{
//             left: `${p.x}%`,
//             top: `${p.y}%`,
//             width: p.size,
//             height: p.size,
//             animation: `float ${p.speed}s linear infinite`
//           }}
//         />
//       ))}

//       <div className="relative z-10 grid lg:grid-cols-2 min-h-screen max-w-7xl mx-auto px-6">

//         {/* LEFT */}
//         <div className="flex items-center">
//           <div className="max-w-lg">
//             <BrandLogo />
//             <h1 className="text-4xl font-bold text-slate-800 dark:text-white mt-8 mb-3">
//               Create your company account
//             </h1>
//             <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
//               Hire based on real skills — verified, secure, and compliant.
//             </p>

//             <div className="space-y-6 bg-white/70 dark:bg-slate-800/20 backdrop-blur-[2px] border-2  dark:border-neutral-50/10 p-8 rounded-2xl border backdrop-blur">
//               <FeatureCard icon="🧪" title="Skill-Based Hiring" desc="Assess real-world project submissions" />
//               <FeatureCard icon="🛡️" title="Verified Companies" desc="Tax & identity validation required" />
//               <FeatureCard icon="📊" title="Hiring Analytics" desc="Track performance & candidate quality" />
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center justify-center">
//           <div className="w-full max-w-md bg-white dark:bg-slate-800/20 backdrop-blur-[2px] border-2  dark:border-neutral-50/10 p-8 rounded-2xl shadow-xl ">
//             <ProgressBar step={step} total={totalSteps} />

//             {step === 1 && <StepCompany data={data} onChange={handleChange} errors={errors} />}
//             {step === 2 && <StepVerification data={data} onChange={handleChange} errors={errors} />}
//             {step === 3 && <StepReview data={data} />}

//             <div className="mt-8 flex justify-between">
//               {step > 1 && <button onClick={back} className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-700">Back</button>}
//               {step < totalSteps && <button onClick={next} className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">Continue</button>}
//               {step === totalSteps && (
//                 <Link to="/signup/companySignup/plan_selection" onClick={submit} disabled={loading} className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//                   {loading ? "Submitting..." : "Submit & Verify"}
//                 </Link>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//           100% { transform: translateY(0); }
//         }
//         .animate-slide-in {
//           animation: slideIn 0.5s ease-out;
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.4s ease-in;
//         }
//         @keyframes slideIn {
//           from { opacity: 0; transform: translateX(20px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CompanySignup;










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
  <div className="flex items-center gap-4 mb-10 select-none">
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-2xl">
        <Building2 className="text-white w-7 h-7" />
      </div>
    </div>
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
        ProveIt<span className="text-purple-500">.</span>io
      </h2>
      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-purple-600 dark:text-purple-400">
        Enterprise Portal
      </p>
    </div>
  </div>
);

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

      <div className="min-h-screen flex items-center justify-center p-4 lg:p-6">
        <div className="
          w-full max-w-6xl grid lg:grid-cols-2
          bg-white/80 dark:bg-black/60
          backdrop-blur-3xl rounded-[2rem]
          border border-white/20 dark:border-white/10
          shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)]
          dark:shadow-[0_0_50px_-10px_rgba(107,33,168,0.15)]
          overflow-hidden
          transition-colors duration-500
        ">
          {/* LEFT - Branding Side */}
          <div className="hidden lg:flex relative p-16 flex-col justify-center bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
              <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] animate-blob"></div>
              <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10">
              <BrandLogo />
              <h1 className="text-6xl font-black text-zinc-900 dark:text-white mb-8 leading-[1.1]">
                Scale your <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
                  ambition.
                </span>
              </h1>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <p className="text-sm font-medium">Enterprise-grade security built-in.</p>
                </div>
                <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                  <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
                    <Users size={20} />
                  </div>
                  <p className="text-sm font-medium">Manage teams of any size efficiently.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Form Side */}
          <div className="p-8 lg:p-16 bg-white/50 dark:bg-black/40 backdrop-blur-xl relative">
            <div className="max-w-md mx-auto">
              <div className="mb-10 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  {step === 1 ? "Create Account" : step === 2 ? "Business Details" : "Review & Submit"}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  {step === 1 ? "Start your 30-day free trial." : step === 2 ? "Tell us about your organization." : "Verify your information and submit."}
                </p>
              </div>

              <Stepper step={step} />

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {step === 1 && (
                  <div className="space-y-5 animate-slideUpFade">
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
                  <div className="space-y-5 animate-slideUpFade">
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
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-white/5 text-zinc-900 dark:text-white appearance-none focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                      >
                        <option value="" disabled>Select Team Size</option>
                        <option value="1-10">1-10 Employees</option>
                        <option value="11-50">11-50 Employees</option>
                        <option value="51-200">51-200 Employees</option>
                        <option value="200+">200+ Employees</option>
                      </select>
                      <ChevronRight className="absolute right-4 top-4 text-zinc-400 rotate-90" size={16} />
                      {formik.touched.teamSize && formik.errors.teamSize && (
                        <p className="mt-1 ml-2 text-[11px] text-red-500 font-medium">{formik.errors.teamSize}</p>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-scaleIn">
                    {/* Data Summary */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                        <CheckCircle2 className="text-green-500" />
                        Review Your Information
                      </h4>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Company Name</p>
                            <p className="font-medium">{formik.values.companyName || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Email</p>
                            <p className="font-medium">{formik.values.email || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">GST Number</p>
                            <p className="font-medium font-mono">{formik.values.gst || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Team Size</p>
                            <p className="font-medium">
                              {formik.values.teamSize ? `${formik.values.teamSize} employees` : "—"}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Business Address</p>
                          <p className="font-medium">{formik.values.address || "—"}</p>
                        </div>
                        {formik.values.website && (
                          <div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Website</p>
                            <p className="font-medium text-purple-600 dark:text-purple-400">
                              {formik.values.website}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => {
                          setTermsAccepted(e.target.checked);
                          trackEvent('terms_toggle', { accepted: e.target.checked });
                        }}
                        className="mt-1 accent-purple-600"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-zinc-600 dark:text-zinc-400 flex-1">
                        I agree to the{" "}
                        <a
                          href="/terms"
                          className="text-purple-600 hover:underline font-medium"
                          onClick={(e) => {
                            e.preventDefault();
                            trackEvent('terms_click');
                            window.open('/terms', '_blank');
                          }}
                        >
                          Terms of Service
                        </a>
                        ,{" "}
                        <a
                          href="/privacy"
                          className="text-purple-600 hover:underline font-medium"
                          onClick={(e) => {
                            e.preventDefault();
                            trackEvent('privacy_click');
                            window.open('/privacy', '_blank');
                          }}
                        >
                          Privacy Policy
                        </a>
                        , and acknowledge that this is a business account subject to additional verification.
                      </label>
                    </div>

                    {/* Marketing preferences */}
                    <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                      <label className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={marketingOptIn}
                          onChange={(e) => {
                            setMarketingOptIn(e.target.checked);
                            trackEvent('marketing_opt_in', { opted_in: e.target.checked });
                          }}
                          className="accent-purple-600"
                        />
                        Send me product updates, tips, and special offers via email
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={isSubmitting}
                      className="
                        px-6 py-4 rounded-xl font-bold transition-all duration-300
                        bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400
                        hover:bg-zinc-200 dark:hover:bg-zinc-800
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center
                      "
                    >
                      <ChevronLeft />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={step === 3 ? formik.handleSubmit : next}
                    disabled={isSubmitting || emailValidating || (step === 3 && !termsAccepted)}
                    className={`
                      flex-1 py-4 rounded-xl font-bold text-white shadow-lg 
                      bg-gradient-to-r from-purple-600 to-pink-600
                      hover:from-purple-500 hover:to-pink-500
                      transition-all duration-300
                      flex items-center justify-center gap-2
                      ${(isSubmitting || emailValidating || (step === 3 && !termsAccepted))
                        ? 'opacity-75 cursor-not-allowed'
                        : 'active:scale-[0.98]'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : step === 3 ? (
                      termsAccepted ? 'Create Account' : 'Accept Terms to Continue'
                    ) : (
                      'Continue'
                    )}
                    {!isSubmitting && step !== 3 && <ChevronRight size={18} />}
                  </button>
                </div>
              </form>

              {/* Progress indicator */}
              {isSubmitting && (
                <div className="mt-4 text-center">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Creating your account... This may take a moment
                  </p>
                  <div className="mt-2 h-1 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default CompanySignup;