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


const LoginHeader = () => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-2xl font-bold text-slate-800">
            Prove<span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">It</span>
          </span>
        </div>
        <span className="bg-gradient-to-r from-slate-100 to-white text-slate-700 px-4 py-2 rounded-full text-sm font-medium border border-slate-200 shadow-sm">
          Enterprise Platform
        </span>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          Welcome back to 
          <span className="block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            ProveIt Dashboard
          </span>
        </h1>
        <p className="text-slate-600 leading-relaxed">
          Manage recruitment, evaluate candidates, and track performance in one unified platform
        </p>
      </div>
      
      <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span>Live • 24,589 active sessions</span>
        </div>
        <div className="w-px h-4 bg-slate-200"></div>
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Enterprise Security</span>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ onLogin, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(formData);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Sign in to your account</h2>
          <p className="text-slate-600 text-sm">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-slate-700 font-medium text-sm">
              Work email address
            </label>
            <div className="relative">
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 transition-opacity ${activeField === 'email' ? 'opacity-100' : 'opacity-0'}`}></div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
                className={`relative w-full px-4 py-3.5 rounded-xl border ${errors.email ? 'border-red-300' : 'border-slate-200'} bg-white/50 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all duration-200`}
                placeholder="name@company.com"
                disabled={isLoading}
                autoComplete="username"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className={`w-5 h-5 transition-colors ${errors.email ? 'text-red-400' : activeField === 'email' ? 'text-teal-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {errors.email && (
              <div className="text-red-500 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-slate-700 font-medium text-sm">
                Password
              </label>
              <a 
                href="/forgot-password" 
                className="text-sm font-medium text-gradient hover:underline transition-all"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 transition-opacity ${activeField === 'password' ? 'opacity-100' : 'opacity-0'}`}></div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setActiveField('password')}
                onBlur={() => setActiveField(null)}
                className={`relative w-full px-4 py-3.5 rounded-xl border ${errors.password ? 'border-red-300' : 'border-slate-200'} bg-white/50 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all duration-200`}
                placeholder="••••••••"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className={`w-5 h-5 transition-colors ${errors.password ? 'text-red-400' : activeField === 'password' ? 'text-teal-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.password}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer text-slate-600 text-sm select-none group">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
                className="hidden"
              />
              <span className={`w-5 h-5 border rounded mr-3 flex items-center justify-center transition-all group-hover:border-teal-500 ${formData.rememberMe ? 'bg-gradient-to-r from-teal-500 to-cyan-500 border-transparent' : 'bg-white border-slate-300'}`}>
                {formData.rememberMe && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              Remember for 30 days
            </label>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-cyan-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 flex items-center justify-center gap-3 group"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                Sign in to Dashboard
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            type="button" 
            className="p-3 border border-slate-200 rounded-xl bg-white text-slate-700 font-medium hover:border-teal-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="group-hover:text-slate-900 transition-colors">Google</span>
          </button>
          
          <button 
            type="button" 
            className="p-3 border border-slate-200 rounded-xl bg-white text-slate-700 font-medium hover:border-teal-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 23 23">
              <path fill="#f25022" d="M1 1h10v10H1z"/>
              <path fill="#00a4ef" d="M12 1h10v10H12z"/>
              <path fill="#7fba00" d="M1 12h10v10H1z"/>
              <path fill="#ffb900" d="M12 12h10v10H12z"/>
            </svg>
            <span className="group-hover:text-slate-900 transition-colors">Microsoft</span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm">
          <p className="text-slate-600">
            Don't have an account?{' '}
            <a 
              href="/company-signup" 
              className="font-semibold text-gradient hover:underline transition-all"
            >
              Get started
            </a>
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Contact sales for enterprise solutions
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="group relative p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/20 hover:border-teal-200/50 hover:bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:from-teal-500/20 group-hover:to-cyan-500/20 transition-all">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

const LoginFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative z-10 py-6 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <a href="/privacy" className="text-slate-500 text-sm hover:text-teal-600 hover:underline transition-colors">Privacy</a>
          <a href="/terms" className="text-slate-500 text-sm hover:text-teal-600 hover:underline transition-colors">Terms</a>
          <a href="/security" className="text-slate-500 text-sm hover:text-teal-600 hover:underline transition-colors">Security</a>
          <a href="/support" className="text-slate-500 text-sm hover:text-teal-600 hover:underline transition-colors">Support</a>
          <a href="/contact" className="text-slate-500 text-sm hover:text-teal-600 hover:underline transition-colors">Contact</a>
        </div>
        
        <div className="text-center">
          <p className="text-slate-400 text-sm mb-3">
            © {currentYear} ProveIt Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-white/50 text-slate-600 px-3 py-1 rounded-lg text-xs font-medium border border-white/20">SOC 2 Type II</span>
            <span className="bg-white/50 text-slate-600 px-3 py-1 rounded-lg text-xs font-medium border border-white/20">GDPR</span>
            <span className="bg-white/50 text-slate-600 px-3 py-1 rounded-lg text-xs font-medium border border-white/20">ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login attempt:', formData);
      alert(`Login successful for ${formData.email}`);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: "📋", title: "Project-Based Hiring", description: "Evaluate candidates through real work samples" },
    { icon: "📊", title: "Advanced Analytics", description: "Track recruitment metrics and performance" },
    { icon: "🛡️", title: "Admin Controls", description: "Manage job postings and team access" },
    { icon: "⚡", title: "Plagiarism Detection", description: "Built-in verification for submissions" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 relative overflow-hidden font-sans">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-teal-500/5 to-cyan-500/5 blur-3xl -top-60 -left-48"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.1s linear'
          }}
        ></div>
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-3xl -bottom-60 -right-36"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 0.15s linear'
          }}
        ></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, #0d9488 1px, transparent 1px), linear-gradient(to bottom, #0d9488 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
            }}
          ></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center py-8 lg:py-16 px-4 lg:px-12">
          <div className="max-w-lg">
            <LoginHeader />
            
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-slate-700 mb-6">Trusted by innovative teams</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={index * 100}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                    99%
                  </div>
                  <span>Customer satisfaction</span>
                </div>
                <div className="w-px h-4 bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                    24/7
                  </div>
                  <span>Support available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center py-8 lg:py-16 px-4 lg:px-12">
          <div className="w-full max-w-md">
            <LoginForm onLogin={handleLogin} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <LoginFooter />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;