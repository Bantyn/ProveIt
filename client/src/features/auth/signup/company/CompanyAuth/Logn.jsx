import React, { useState, useEffect } from 'react';

// ======================== LoginHeader Component ========================
const LoginHeader = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="url(#gradient)"/>
            <path d="M12 20L17 25L28 15" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4F46E5"/>
                <stop offset="1" stopColor="#7C3AED"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="text-2xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ProveIt.io
          </span>
        </div>
        <span className="bg-gray-50 text-slate-500 px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200">
          For Companies
        </span>
      </div>
      
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Welcome back
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Access your company dashboard to manage recruitment, 
          view analytics, and evaluate candidates
        </p>
      </div>
      
      <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200 w-fit">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 5V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V5L12 2Z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Enterprise-grade security • GDPR compliant</span>
      </div>
    </div>
  );
};

// ======================== LoginForm Component ========================
const LoginForm = ({ onLogin, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

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
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    <form 
      className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100"
      onSubmit={handleSubmit} 
      noValidate
    >
      <div className="mb-6">
        <label htmlFor="email" className="block text-slate-800 font-medium mb-2 text-sm">
          Company Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200`}
          placeholder="admin@company.com"
          disabled={isLoading}
          autoComplete="username"
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="password" className="block text-slate-800 font-medium text-sm">
            Password
          </label>
          <a 
            href="/forgot-password" 
            className="text-indigo-600 text-sm font-medium hover:text-indigo-800 hover:underline transition-colors"
          >
            Forgot password?
          </a>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all duration-200`}
          placeholder="••••••••"
          disabled={isLoading}
          autoComplete="current-password"
        />
        {errors.password && (
          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
        )}
      </div>

      <div className="mb-8">
        <label className="flex items-center cursor-pointer text-slate-600 text-sm select-none">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            disabled={isLoading}
            className="hidden"
          />
          <span className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center transition-all ${formData.rememberMe ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'}`}>
            {formData.rememberMe && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          Remember this device
        </label>
      </div>

      <button 
        type="submit" 
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-3 mb-6"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Signing in...
          </>
        ) : (
          'Sign in to Dashboard'
        )}
      </button>

      <div className="flex items-center my-8 text-slate-500 text-sm">
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="px-4 bg-white">or continue with</span>
        <div className="flex-1 h-px bg-slate-200"></div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button 
          type="button" 
          className="p-3.5 border-2 border-slate-200 rounded-xl bg-white text-slate-600 font-medium hover:border-indigo-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-3"
          disabled={isLoading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google SSO
        </button>
        
        <button 
          type="button" 
          className="p-3.5 border-2 border-slate-200 rounded-xl bg-white text-slate-600 font-medium hover:border-indigo-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-3"
          disabled={isLoading}
        >
          <svg className="w-5 h-5" viewBox="0 0 23 23">
            <path fill="#f25022" d="M1 1h10v10H1z"/>
            <path fill="#00a4ef" d="M12 1h10v10H12z"/>
            <path fill="#7fba00" d="M1 12h10v10H1z"/>
            <path fill="#ffb900" d="M12 12h10v10H12z"/>
          </svg>
          Microsoft SSO
        </button>
      </div>

      <div className="text-center text-slate-500 text-sm pt-6 border-t border-slate-200">
        Not registered yet?{' '}
        <a 
          href="/company-signup" 
          className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline transition-colors"
        >
          Create company account
        </a>
      </div>
    </form>
  );
};

// ======================== LoginFooter Component ========================
const LoginFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative z-10 py-8 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 mb-6">
          <a href="/privacy" className="text-slate-500 text-sm hover:text-indigo-600 hover:underline transition-colors">Privacy Policy</a>
          <a href="/terms" className="text-slate-500 text-sm hover:text-indigo-600 hover:underline transition-colors">Terms of Service</a>
          <a href="/security" className="text-slate-500 text-sm hover:text-indigo-600 hover:underline transition-colors">Security</a>
          <a href="/support" className="text-slate-500 text-sm hover:text-indigo-600 hover:underline transition-colors">Support Center</a>
          <a href="/contact" className="text-slate-500 text-sm hover:text-indigo-600 hover:underline transition-colors">Contact Sales</a>
        </div>
        
        <div className="text-center">
          <p className="text-slate-400 text-sm mb-4">
            © {currentYear} ProveIt.io. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-medium">SOC 2 Type II</span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-medium">GDPR</span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-medium">ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ======================== Main LoginPage Component ========================
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    setParticles(newParticles);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden font-sans">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${particle.speed * 20 + 10}s linear infinite`,
              animationDelay: `${particle.id * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500/15 to-purple-600/15 blur-3xl -top-60 -left-48"
          style={{ animation: 'pulse 20s infinite alternate' }}
        ></div>
        <div 
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/15 to-violet-400/15 blur-3xl -bottom-60 -right-36"
          style={{ animation: 'pulse 15s infinite alternate-reverse' }}
        ></div>
        <div 
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-violet-400/15 to-indigo-200/15 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ animation: 'pulse 25s infinite' }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center py-8 lg:py-16 px-4 lg:px-12">
          <div className="max-w-lg">
            <LoginHeader />
            
            <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Platform Features</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                  <div className="text-2xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">📋</div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Project-Based Hiring</h4>
                    <p className="text-slate-600 text-sm">Evaluate candidates through real work samples</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                  <div className="text-2xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">📊</div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Advanced Analytics</h4>
                    <p className="text-slate-600 text-sm">Track recruitment metrics and candidate performance</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                  <div className="text-2xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">🛡️</div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Admin Controls</h4>
                    <p className="text-slate-600 text-sm">Manage job postings, evaluations, and team access</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-2xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">⚡</div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Plagiarism Detection</h4>
                    <p className="text-slate-600 text-sm">Built-in verification for candidate submissions</p>
                  </div>
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
      
      {/* Inject keyframe animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;