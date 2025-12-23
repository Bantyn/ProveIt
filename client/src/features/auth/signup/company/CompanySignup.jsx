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










import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";
import AuroraBackground from "./AuroraBackground";

/* ===================== Theme Toggle ===================== */

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark"); // Defaulting to dark for the requested theme

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Priority: Stored -> Prefers Dark -> Default Dark
    const initialTheme = stored || (prefersDark ? "dark" : "dark");
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

/* ===================== Floating Input ===================== */

const InputField = ({ label, name, formik, type = "text", icon: Icon }) => {
  const error = formik.touched[name] && formik.errors[name];
  const hasValue = Boolean(formik.values[name]);

  return (
    <div className="relative group">
      <Icon 
        className={`absolute left-4 top-4 transition-colors duration-300 ${
          error ? "text-red-400" : "text-zinc-400 group-focus-within:text-purple-500"
        }`} 
        size={20} 
      />

      <input
        type={type}
        {...formik.getFieldProps(name)}
        className={`
          peer w-full pl-12 pr-4 py-4 rounded-xl
          bg-zinc-50 dark:bg-zinc-900/50
          backdrop-blur-md
          border-2 transition-all duration-300
          text-zinc-900 dark:text-white font-medium
          placeholder-transparent
          focus:outline-none focus:bg-white dark:focus:bg-black
          ${error
            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            : "border-zinc-200 dark:border-white/5 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"}
        `}
        placeholder={label}
      />

      <label
        className={`
          absolute left-12 px-1 text-xs font-bold uppercase tracking-wider
          transition-all duration-300 pointer-events-none rounded
          ${hasValue
            ? "-top-2.5 bg-white dark:bg-black text-purple-600 dark:text-purple-400"
            : "top-4 bg-transparent text-zinc-500 dark:text-zinc-500 peer-focus:-top-2.5 peer-focus:bg-white dark:peer-focus:bg-black peer-focus:text-purple-600 dark:peer-focus:text-purple-400"}
        `}
      >
        {label}
      </label>

      {error && (
        <div className="flex items-center gap-1 mt-1.5 ml-1 animate-fadeIn">
          <div className="w-1 h-1 rounded-full bg-red-500" />
          <p className="text-[11px] text-red-500 font-semibold tracking-wide">
            {formik.errors[name]}
          </p>
        </div>
      )}
    </div>
  );
};

/* ===================== Stepper ===================== */

const Stepper = ({ step }) => {
  const steps = ["Account", "Verification", "Review"];

  return (
    <div className="flex items-center justify-between mb-12 relative">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 dark:bg-zinc-800 -z-0"></div>
      
      {steps.map((s, i) => {
        const isActive = step === i + 1;
        const isCompleted = step > i + 1;

        return (
          <React.Fragment key={s}>
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-4
                ${
                  isCompleted
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
            
            {/* Progress Line Fill */}
            {i < steps.length - 1 && (
               <div 
                 className={`absolute top-1/2 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-700 ease-out -z-0
                 ${step > i + 1 ? "w-1/2" : step > i ? "w-0" : "w-0"}`} // Simplified logic for visual clarity in this snippet
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

/* ===================== Validation ===================== */

const stepOneSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
  website: Yup.string().url("Must be a valid URL").nullable(),
});

const stepTwoSchema = Yup.object({
  gst: Yup.string().required("GST Number is required"),
  address: Yup.string().required("Address is required"),
  teamSize: Yup.string().required("Please select team size"),
});

/* ===================== Main ===================== */

const CompanySignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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
    onSubmit: async () => {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1200));
      navigate("/signup/companySignup/plan_selection");
    },
  });

  const next = async () => {
    const errors = await formik.validateForm();
    if (!Object.keys(errors).length) setStep(step + 1);
    else formik.setTouched(errors);
  };

  return (
    <AuroraBackground>
      <ThemeToggle />

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
             {/* Decorative Background Blobs */}
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
                        {step === 1 ? "Create Account" : step === 2 ? "Business Details" : "Review"}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        {step === 1 ? "Start your 30-day free trial." : step === 2 ? "Tell us about your organization." : "Verify your information."}
                    </p>
                </div>

                <Stepper step={step} />

                <form className="space-y-5">
                {step === 1 && (
                    <div className="space-y-5 animate-slideUpFade">
                    <InputField label="Company Name" name="companyName" icon={Building2} formik={formik} />
                    <InputField label="Work Email" name="email" icon={Mail} formik={formik} />
                    <InputField label="Password" name="password" type="password" icon={Lock} formik={formik} />
                    <InputField label="Website URL" name="website" icon={Globe} formik={formik} />
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-5 animate-slideUpFade">
                    <InputField label="GST Number" name="gst" icon={Fingerprint} formik={formik} />
                    <InputField label="Business Address" name="address" icon={MapPin} formik={formik} />
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
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-center animate-scaleIn">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4">
                        <CheckCircle2 className="text-white w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Everything looks good!</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                        By clicking "Create Account", you agree to our Terms of Service and Privacy Policy.
                    </p>
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    {step > 1 && (
                    <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="
                        px-6 py-4 rounded-xl font-bold transition-all duration-300
                        bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400
                        hover:bg-zinc-200 dark:hover:bg-zinc-800
                        "
                    >
                        <ChevronLeft />
                    </button>
                    )}

                    <button
                    type="button"
                    onClick={step === 3 ? formik.handleSubmit : next}
                    className="
                        flex-1 py-4 rounded-xl font-bold text-white shadow-lg shadow-purple-500/25
                        bg-gradient-to-r from-purple-600 to-pink-600
                        hover:from-purple-500 hover:to-pink-500
                        active:scale-[0.98] transition-all duration-300
                        flex items-center justify-center gap-2
                    "
                    >
                    {step === 3 ? "Create Account" : "Continue"}
                    <ChevronRight size={18} />
                    </button>
                </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default CompanySignup;