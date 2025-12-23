// import React, { useState, useEffect } from 'react';

// // ======================== LoginHeader Component ========================
// const LoginHeader = () => {
//   return (
//     <div className="mb-12">
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center gap-3">
//           <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
//             <rect width="40" height="40" rx="10" fill="url(#gradient)"/>
//             <path d="M12 20L17 25L28 15" stroke="white" strokeWidth="3" strokeLinecap="round"/>
//             <defs>
//               <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
//                 <stop stopColor="#4F46E5"/>
//                 <stop offset="1" stopColor="#7C3AED"/>
//               </linearGradient>
//             </defs>
//           </svg>
//           <span className="text-2xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             ProveIt.io
//           </span>
//         </div>
//         <span className="bg-gray-50 text-slate-500 px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200">
//           For Companies
//         </span>
//       </div>
      
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold text-slate-800 mb-3">
//           Welcome back
//         </h1>
//         <p className="text-lg text-slate-600 leading-relaxed">
//           Access your company dashboard to manage recruitment, 
//           view analytics, and evaluate candidates
//         </p>
//       </div>
      
//       <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200 w-fit">
//         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
//           <path d="M12 2L4 5V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V5L12 2Z" 
//                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//         <span>Enterprise-grade security • GDPR compliant</span>
//       </div>
//     </div>
//   );
// };

// // ======================== LoginForm Component ========================
// const LoginForm = ({ onLogin, isLoading = false }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onLogin(formData);
//     }
//   };

//   return (
//     <form 
//       className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100"
//       onSubmit={handleSubmit} 
//       noValidate
//     >
//       <div className="mb-6">
//         <label htmlFor="email" className="block text-slate-800 font-medium mb-2 text-sm">
//           Company Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200`}
//           placeholder="admin@company.com"
//           disabled={isLoading}
//           autoComplete="username"
//         />
//         {errors.email && (
//           <div className="text-red-500 text-sm mt-1">{errors.email}</div>
//         )}
//       </div>

//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-2">
//           <label htmlFor="password" className="block text-slate-800 font-medium text-sm">
//             Password
//           </label>
//           <a 
//             href="/forgot-password" 
//             className="text-indigo-600 text-sm font-medium hover:text-indigo-800 hover:underline transition-colors"
//           >
//             Forgot password?
//           </a>
//         </div>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200`}
//           placeholder="••••••••"
//           disabled={isLoading}
//           autoComplete="current-password"
//         />
//         {errors.password && (
//           <div className="text-red-500 text-sm mt-1">{errors.password}</div>
//         )}
//       </div>

//       <div className="mb-8">
//         <label className="flex items-center cursor-pointer text-slate-600 text-sm select-none">
//           <input
//             type="checkbox"
//             name="rememberMe"
//             checked={formData.rememberMe}
//             onChange={handleChange}
//             disabled={isLoading}
//             className="hidden"
//           />
//           <span className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center transition-all ${formData.rememberMe ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'}`}>
//             {formData.rememberMe && (
//               <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//               </svg>
//             )}
//           </span>
//           Remember this device
//         </label>
//       </div>

//       <button 
//         type="submit" 
//         className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-3 mb-6"
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <>
//             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//             Signing in...
//           </>
//         ) : (
//           'Sign in to Dashboard'
//         )}
//       </button>

//       <div className="flex items-center my-8 text-slate-500 text-sm">
//         <div className="flex-1 h-px bg-slate-200"></div>
//         <span className="px-4 bg-white">or continue with</span>
//         <div className="flex-1 h-px bg-slate-200"></div>
//       </div>

//       <div className="grid grid-cols-2 gap-3 mb-6">
//         <button 
//           type="button" 
//           className="p-3.5 border-2 border-slate-200 rounded-xl bg-white text-slate-600 font-medium hover:border-indigo-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-3"
//           disabled={isLoading}
//         >
//           <svg className="w-5 h-5" viewBox="0 0 24 24">
//             <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//             <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//             <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//             <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//           </svg>
//           Google SSO
//         </button>
        
//         <button 
//           type="button" 
//           className="p-3.5 border-2 border-slate-200 rounded-xl bg-white text-slate-600 font-medium hover:border-indigo-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-3"
//           disabled={isLoading}
//         >
//           <svg className="w-5 h-5" viewBox="0 0 23 23">
//             <path fill="#f25022" d="M1 1h10v10H1z"/>
//             <path fill="#00a4ef" d="M12 1h10v10H12z"/>
//             <path fill="#7fba00" d="M1 12h10v10H1z"/>
//             <path fill="#ffb900" d="M12 12h10v10H12z"/>
//           </svg>
//           Microsoft SSO
//         </button>
//       </div>

//       <div className="text-center text-slate-500 text-sm pt-6 border-t border-slate-200">
//         Not registered yet?{' '}
//         <a 
//           href="/company-signup" 
//           className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline transition-colors"
//         >
//           Create company account
//         </a>
//       </div>
//     </form>
//   );
// };

// // ======================== LoginFooter Component ========================
// const LoginFooter = () => {
//   const currentYear = new Date().getFullYear();
  
//   return (
//     <footer className="relative z-10 py-8 border-t border-slate-200/50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex flex-wrap justify-center gap-8 mb-6">
//           <a href="/privacy" className="text-slate-500 text-sm hover:text-indigo-600 hover:underline transition-colors">Privacy Policy</a>
//           <a href="/terms" className="text-slate-500 text-sm hover:text-indigo-600 hover:underline transition-colors">Terms of Service</a>
//           <a href="/security" className="text-slate-500 text-sm hover:text-indigo-600 hover:underline transition-colors">Security</a>
//           <a href="/support" className="text-slate-500 text-sm hover:text-indigo-600 hover:underline transition-colors">Support Center</a>
//           <a href="/contact" className="text-slate-500 text-sm hover:text-indigo-600 hover:underline transition-colors">Contact Sales</a>
//         </div>
        
//         <div className="text-center">
//           <p className="text-slate-400 text-sm mb-4">
//             © {currentYear} ProveIt.io. All rights reserved.
//           </p>
//           <div className="flex flex-wrap justify-center gap-3">
//             <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-medium">SOC 2 Type II</span>
//             <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-medium">GDPR</span>
//             <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-medium">ISO 27001</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// // ======================== Main LoginPage Component ========================
// const LoginPage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [particles, setParticles] = useState([]);

//   useEffect(() => {
//     const newParticles = [];
//     for (let i = 0; i < 20; i++) {
//       newParticles.push({
//         id: i,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         size: Math.random() * 4 + 1,
//         speed: Math.random() * 0.5 + 0.2,
//         opacity: Math.random() * 0.3 + 0.1
//       });
//     }
//     setParticles(newParticles);
//   }, []);

//   const handleLogin = async (formData) => {
//     setIsLoading(true);
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       console.log('Login attempt:', formData);
//       alert(`Login successful for ${formData.email}`);
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Login failed. Please check your credentials.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden font-sans">
//       {/* Animated background particles */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         {particles.map(particle => (
//           <div
//             key={particle.id}
//             className="absolute rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"
//             style={{
//               left: `${particle.x}%`,
//               top: `${particle.y}%`,
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               opacity: particle.opacity,
//               animation: `float ${particle.speed * 20 + 10}s linear infinite`,
//               animationDelay: `${particle.id * 0.1}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Animated gradient background */}
//       <div className="fixed inset-0 z-0">
//         <div 
//           className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500/15 to-purple-600/15 blur-3xl -top-60 -left-48"
//           style={{ animation: 'pulse 20s infinite alternate' }}
//         ></div>
//         <div 
//           className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/15 to-violet-400/15 blur-3xl -bottom-60 -right-36"
//           style={{ animation: 'pulse 15s infinite alternate-reverse' }}
//         ></div>
//         <div 
//           className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-violet-400/15 to-indigo-200/15 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//           style={{ animation: 'pulse 25s infinite' }}
//         ></div>
//       </div>

//       {/* Main content */}
//       <div className="relative z-10 grid lg:grid-cols-2 min-h-screen max-w-7xl mx-auto px-4 lg:px-8">
//         <div className="flex items-center py-8 lg:py-16 px-4 lg:px-12">
//           <div className="max-w-lg">
//             <LoginHeader />
            
//             <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
//               <h3 className="text-xl font-semibold text-slate-800 mb-6">Platform Features</h3>
              
//               <div className="space-y-6">
//                 <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
//                   <div className="text-2xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">📋</div>
//                   <div>
//                     <h4 className="font-semibold text-slate-800 mb-1">Project-Based Hiring</h4>
//                     <p className="text-slate-600 text-sm">Evaluate candidates through real work samples</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
//                   <div className="text-2xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">📊</div>
//                   <div>
//                     <h4 className="font-semibold text-slate-800 mb-1">Advanced Analytics</h4>
//                     <p className="text-slate-600 text-sm">Track recruitment metrics and candidate performance</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
//                   <div className="text-2xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">🛡️</div>
//                   <div>
//                     <h4 className="font-semibold text-slate-800 mb-1">Admin Controls</h4>
//                     <p className="text-slate-600 text-sm">Manage job postings, evaluations, and team access</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-4">
//                   <div className="text-2xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">⚡</div>
//                   <div>
//                     <h4 className="font-semibold text-slate-800 mb-1">Plagiarism Detection</h4>
//                     <p className="text-slate-600 text-sm">Built-in verification for candidate submissions</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-center py-8 lg:py-16 px-4 lg:px-12">
//           <div className="w-full max-w-md">
//             <LoginForm onLogin={handleLogin} isLoading={isLoading} />
//           </div>
//         </div>
//       </div>

//       <LoginFooter />
      
//       {/* Inject keyframe animations */}
//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) translateX(0); }
//           25% { transform: translateY(-20px) translateX(10px); }
//           50% { transform: translateY(0) translateX(20px); }
//           75% { transform: translateY(20px) translateX(10px); }
//         }
        
//         @keyframes pulse {
//           0% { transform: scale(1); opacity: 0.1; }
//           50% { transform: scale(1.1); opacity: 0.15; }
//           100% { transform: scale(1); opacity: 0.1; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoginPage;







import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const shakeVariant = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  }
};

const LoginHeader = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-10 relative z-20">
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-fuchsia-400 rounded-full border-2 border-white"
            ></motion.div>
          </div>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">
            Prove<span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">It</span>
          </span>
        </div>
        <span className="hidden md:block bg-white/80 backdrop-blur-md text-slate-600 px-4 py-2 rounded-full text-sm font-medium border border-slate-200 shadow-sm">
          Enterprise Platform
        </span>
      </motion.div>
      
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          Welcome back to <br />
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ProveIt Dashboard
          </span>
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
          Manage recruitment, evaluate candidates, and track performance in one unified platform.
        </p>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white shadow-lg shadow-slate-200/50"
      >
        <div className="flex items-center gap-2 text-violet-700 text-sm font-semibold">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
          </span>
          <span>Live • 24,589 active sessions</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Input Component with Floating Label ---
const FloatingInput = ({ id, label, value, onChange, type = "text", error, icon, onIconClick, showPasswordToggle }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative mb-2">
      <div className={`relative rounded-xl border transition-all duration-200 ${error ? 'border-red-300 bg-red-50/50' : isFocused ? 'border-violet-500 ring-4 ring-violet-500/10 bg-white' : 'border-slate-200 bg-slate-50/50'}`}>
        <label 
          htmlFor={id}
          className={`absolute left-4 transition-all duration-200 pointer-events-none text-slate-500
            ${(isFocused || hasValue) ? 'text-xs top-2 font-semibold text-violet-600' : 'text-base top-4'}
          `}
        >
          {label}
        </label>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 pt-6 pb-2 bg-transparent rounded-xl outline-none text-slate-800 font-medium ${(isFocused || hasValue) ? 'opacity-100' : 'opacity-0'}`} // Hide actual text cursor until focused or typed
          style={{ opacity: 1 }} // Override opacity hack
        />
        
        {/* Icons */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {showPasswordToggle && (
            <button 
              type="button" 
              onClick={onIconClick}
              className="text-slate-400 hover:text-violet-600 transition-colors focus:outline-none"
            >
              {icon}
            </button>
          )}
          {!showPasswordToggle && (
             <div className={`transition-colors ${isFocused ? 'text-violet-600' : 'text-slate-400'}`}>
               {icon}
             </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 font-medium overflow-hidden"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const controls = useAnimation(); // Animation controls for shaking

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Min 8 characters required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        onLogin(formData);
      }, 2000);
    } else {
      // Trigger Shake Animation
      controls.start('shake');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/50 overflow-hidden min-h-[600px] flex flex-col">
        
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="form"
              animate={controls}
              variants={shakeVariant}
              exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex flex-col"
            >
              {/* Image Section */}
              <div className="w-full flex justify-center mb-8 relative">
                 <div className="absolute inset-0 bg-violet-500/10 blur-2xl rounded-full transform -translate-y-4"></div>
                 <img 
                   src="/image_c9372d.png" 
                   alt="Step 1 Account" 
                   className="relative w-full max-w-[280px] object-contain drop-shadow-lg z-10"
                 />
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Sign in</h2>
                <p className="text-slate-500 text-sm">Access your candidate dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                <FloatingInput 
                  id="email" 
                  label="Work Email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  error={errors.email}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />
                
                <FloatingInput 
                  id="password" 
                  label="Password" 
                  type={showPassword ? "text" : "password"}
                  value={formData.password} 
                  onChange={handleChange} 
                  error={errors.password}
                  showPasswordToggle={true}
                  onIconClick={() => setShowPassword(!showPassword)}
                  icon={
                    showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )
                  }
                />

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center cursor-pointer text-slate-600 text-sm select-none group">
                    <div className="relative">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="hidden"
                        />
                        <div className={`w-5 h-5 border rounded mr-3 flex items-center justify-center transition-all ${formData.rememberMe ? 'bg-violet-600 border-transparent' : 'bg-white border-slate-300 group-hover:border-violet-400'}`}>
                            {formData.rememberMe && (
                                <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </motion.svg>
                            )}
                        </div>
                    </div>
                    Remember me
                  </label>
                  <a href="#" className="text-sm font-medium text-violet-600 hover:text-violet-800 transition-colors">
                    Forgot password?
                  </a>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full relative overflow-hidden py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
                  disabled={isLoading}
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="animate-pulse">Verifying...</span>
                    </div>
                  ) : (
                    <>
                      Sign in to Dashboard
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
                
               {/* Footer of card */}
              <div className="mt-8 text-center text-sm">
                <span className="text-slate-500">Or continue with</span>
                <div className="flex gap-4 justify-center mt-4">
                     {/* Social Icons (simplified) */}
                     {['Google', 'Microsoft'].map((provider) => (
                         <button key={provider} type="button" className="p-2 px-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-violet-200 transition-colors text-xs font-semibold text-slate-600">
                             {provider}
                         </button>
                     ))}
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <motion.svg 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-12 h-12 text-green-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back!</h3>
              <p className="text-slate-500">Redirecting to dashboard...</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

// ... FeatureCard and Footer (kept mostly same but refined) ...
const FeatureCard = ({ icon, title, description, delay }) => {
    return (
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -5 }}
        className="group relative p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-violet-200/50"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-50/50 to-fuchsia-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-2xl border border-slate-100">
            {icon}
          </div>
          <h3 className="font-bold text-slate-800 mb-2 group-hover:text-violet-700 transition-colors">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
        </div>
      </motion.div>
    );
  };

const LoginPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = (formData) => {
    console.log('User Logged In:', formData);
    // Redirect logic would go here
  };

  const features = [
    { icon: "📋", title: "Project Hiring", description: "Evaluate via real work samples" },
    { icon: "🛡️", title: "Enterprise Ready", description: "SOC2 Type II & GDPR Compliant" },
    { icon: "⚡", title: "Smart Detect", description: "AI-powered plagiarism check" },
    { icon: "👥", title: "Team Collab", description: "Seamless hiring team access" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans selection:bg-violet-200 selection:text-violet-900">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: mousePosition.x * 20, y: mousePosition.y * 20 }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          className="absolute w-[800px] h-[800px] rounded-full bg-violet-300/20 blur-3xl -top-60 -left-48 mix-blend-multiply"
        />
        <motion.div 
          animate={{ x: mousePosition.x * -30, y: mousePosition.y * -30 }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          className="absolute w-[600px] h-[600px] rounded-full bg-fuchsia-300/20 blur-3xl -bottom-60 -right-36 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen max-w-7xl mx-auto px-4 lg:px-8 gap-12 lg:gap-0">
        <div className="flex flex-col justify-center py-12 lg:py-16 px-4 lg:px-8">
          <LoginHeader />
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-8 hidden lg:block">
            <h3 className="text-lg font-semibold text-slate-700 mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-slate-300"></span>
              Platform Features
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} delay={index * 100} />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center py-12 lg:py-16 px-4">
          <div className="w-full max-w-md">
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>

      {/* Tailwind Custom Styles for Animation */}
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;