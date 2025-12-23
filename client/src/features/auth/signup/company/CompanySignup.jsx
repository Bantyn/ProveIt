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
import AuroraBackground from "./AuroraBackground";

/* ===================== Theme Toggle ===================== */

const ThemeToggle = () => {
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      root.classList.contains("dark") ? "dark" : "light"
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-6 right-6 z-20 px-3 py-2 rounded-lg
                 bg-slate-200 dark:bg-slate-800
                 text-slate-800 dark:text-slate-200"
    >
      🌙 / ☀️
    </button>
  );
};

/* ===================== Reusable UI ===================== */

const BrandLogo = () => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600
                    flex items-center justify-center text-white font-bold shadow-lg">
      P
    </div>
    <span className="text-2xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600
                     bg-clip-text text-transparent">
      ProveIt.io
    </span>
  </div>
);

const InputField = ({ label, name, formik, type = "text", placeholder }) => {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <input
        type={type}
        {...formik.getFieldProps(name)}
        placeholder={placeholder}
        className={`w-full px-4 py-3.5 rounded-xl border
          bg-slate-50 dark:bg-slate-800/40
          text-slate-900 dark:text-white
          placeholder-slate-400 dark:placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${error ? "border-red-400" : "border-slate-200 dark:border-slate-700"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>}
    </div>
  );
};

const SelectField = ({ label, name, formik, options }) => {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <select
        {...formik.getFieldProps(name)}
        className={`w-full px-4 py-3.5 rounded-xl border
          bg-slate-50 dark:bg-slate-800/40
          text-slate-900 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${error ? "border-red-400" : "border-slate-200 dark:border-slate-700"}`}
      >
        <option value="">Select industry</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>}
    </div>
  );
};

/* ===================== Progress ===================== */

const ProgressBar = ({ step, total }) => (
  <div className="mb-6">
    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
      <span>Step {step} of {total}</span>
      <span>{Math.round((step / total) * 100)}%</span>
    </div>
    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-700"
        style={{ width: `${(step / total) * 100}%` }}
      />
    </div>
  </div>
);

/* ===================== Yup Schemas ===================== */

const stepOneSchema = Yup.object({
  companyName: Yup.string().required("Company name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password required"),
  website: Yup.string().url("Invalid URL").nullable()
});

const GST_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

const stepTwoSchema = Yup.object({
  gst: Yup.string()
    .matches(GST_REGEX, "Invalid GST Number")
    .required("GST is required"),
  industry: Yup.string().required("Industry required"),
  address: Yup.string().required("Address required"),
  teamSize: Yup.string().required("Team size required")
});

/* ===================== Main Component ===================== */

const CompanySignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 20 + 10
      }))
    );
  }, []);

  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      password: "",
      website: "",
      gst: "",
      industry: "",
      address: "",
      teamSize: ""
    },
    validationSchema: step === 1 ? stepOneSchema : stepTwoSchema,
    onSubmit: async values => {
      setLoading(true);

      const payload = {
        ...values,
        isApproved: false,
        isSuspended: false,
        subscriptionId: null,
        createdAt: new Date()
      };

      console.log("COMPANY PAYLOAD 👉", payload);

      await new Promise(r => setTimeout(r, 1200));
      setLoading(false);

      navigate("/signup/companySignup/plan_selection");
    }
  });

  const next = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      setStep(s => s + 1);
    } else {
      const touched = {};
      Object.keys(errors).forEach(k => (touched[k] = true));
      formik.setTouched(touched);
    }
  };

  return (
    <AuroraBackground>
      <ThemeToggle />

      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-dark-500/10 dark:bg-white-400/10"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `float ${p.speed}s linear infinite`
          }}
        />
      ))}

      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen max-w-7xl mx-auto px-6">

        <div className="flex items-center">
          <div className="max-w-lg">
            <BrandLogo />
            <h1 className="text-4xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">
              Create your company account
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Verified hiring for serious companies only.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-md p-8 rounded-2xl
                       bg-white/80 dark:bg-slate-900/60
                       border border-slate-200 dark:border-slate-700
                       backdrop-blur-xl shadow-2xl"
          >
            <ProgressBar step={step} total={totalSteps} />

            {step === 1 && (
              <div className="space-y-5">
                <InputField label="Company Name" name="companyName" formik={formik} />
                <InputField label="Official Email" name="email" type="email" formik={formik} />
                <InputField label="Password" name="password" type="password" formik={formik} />
                <InputField label="Website" name="website" formik={formik} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <InputField label="GST Number" name="gst" formik={formik} />
                <SelectField
                  label="Industry"
                  name="industry"
                  formik={formik}
                  options={["IT Services", "SaaS", "FinTech", "HealthTech", "E-commerce"]}
                />
                <InputField label="Company Address" name="address" formik={formik} />
                <InputField label="Team Size" name="teamSize" formik={formik} />
              </div>
            )}

            {step === 3 && (
              <div className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
                {Object.entries(formik.values).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b py-2">
                    <span className="capitalize text-slate-500">{k}</span>
                    <span className="font-medium">{v || "-"}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button type="button" onClick={() => setStep(s => s - 1)}
                  className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-700">
                  Back
                </button>
              )}

              {step < totalSteps && (
                <button type="button" onClick={next}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  Continue
                </button>
              )}

              {step === totalSteps && (
                <button type="submit" disabled={loading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  {loading ? "Submitting..." : "Submit & Verify"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </AuroraBackground>
  );
};

export default CompanySignup;
