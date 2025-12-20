import React, { useState } from 'react';
import { 
  Building2, Mail, Globe, FileText, Users, CreditCard, 
  Shield, CheckCircle, AlertCircle, Upload, Lock,
  Calendar, Phone, Briefcase
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CompanyRegisterForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    companyName: '',
    legalName: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    industry: '',
    foundedYear: new Date().getFullYear(),
    
    // Step 2: Company Details
    size: '',
    description: '',
    hqLocation: '',
    logo: null,
    
    // Step 3: Subscription Plan
    plan: 'professional',
    
    // Step 4: Verification
    taxId: '',
    contactPerson: '',
    contactPhone: '',
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$299',
      period: '/month',
      description: 'Perfect for startups',
      features: ['5 job posts/month', '100 candidate views', 'Basic analytics', 'Email support', '3 active job slots'],
      color: 'from-blue-500 to-cyan-500',
      highlighted: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$699',
      period: '/month',
      description: 'Best for growing teams',
      features: ['15 job posts/month', '500 candidate views', 'Advanced analytics', 'Priority support', 'AI screening', '10 active job slots'],
      color: 'from-indigo-600 to-purple-600',
      highlighted: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: ' /month',
      description: 'For large organizations',
      features: ['Unlimited job posts', 'Unlimited candidates', 'Dedicated manager', 'Custom integrations', 'White-label', 'API access'],
      color: 'from-gray-700 to-gray-900',
      highlighted: false
    }
  ];

  const industries = [
    'Technology & Software',
    'Finance & Banking', 
    'Healthcare & Medical',
    'Education & E-learning',
    'E-commerce & Retail',
    'Manufacturing & Industry',
    'Consulting & Services',
    'Marketing & Advertising',
    'Real Estate & Construction',
    'Media & Entertainment',
    'Other'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees', 
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    if (stepNumber === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.industry) newErrors.industry = 'Please select an industry';
    }
    
    if (stepNumber === 2) {
      if (!formData.size) newErrors.size = 'Please select company size';
      if (!formData.description.trim()) newErrors.description = 'Company description is required';
      else if (formData.description.length < 100) newErrors.description = 'Description should be at least 100 characters';
    }
    
    if (stepNumber === 4) {
      if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
      if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
      if (!formData.taxId.trim()) newErrors.taxId = 'Tax ID is required';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store registration data
      localStorage.setItem('companyRegistration', JSON.stringify({
        email: formData.email,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }));
      
      // Redirect to success page
      navigate('/company/registration-success');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size <= 5 * 1024 * 1024) { // 5MB limit
        setFormData(prev => ({ ...prev, logo: file }));
      } else {
        setErrors(prev => ({ ...prev, logo: 'File size must be less than 5MB' }));
      }
    }
  };

  const StepIndicator = () => (
    <div className="px-4 py-6 border-b border-gray-800">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {[
          { number: 1, label: 'Company Info', icon: Building2 },
          { number: 2, label: 'Details', icon: Briefcase },
          { number: 3, label: 'Plan', icon: CreditCard },
          { number: 4, label: 'Verification', icon: Shield }
        ].map((stepItem, index) => (
          <React.Fragment key={stepItem.number}>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                step === stepItem.number 
                  ? 'border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                  : step > stepItem.number 
                  ? 'border-green-500 bg-green-500 text-white' 
                  : 'border-gray-700 bg-gray-800 text-gray-400'
              }`}>
                {step > stepItem.number ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <stepItem.icon className="w-5 h-5" />
                )}
              </div>
              <span className={`text-xs mt-2 font-medium ${
                step >= stepItem.number ? 'text-white' : 'text-gray-500'
              }`}>
                {stepItem.label}
              </span>
            </div>
            {index < 3 && (
              <div className={`flex-1 h-1 mx-4 rounded-full ${
                step > stepItem.number ? 'bg-green-500' : 'bg-gray-800'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <StepIndicator />
      
      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Company Information</h3>
              <p className="text-gray-400">Tell us about your company</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Company Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border ${
                      errors.companyName ? 'border-red-500/50' : 'border-gray-700'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.companyName && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Legal Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Legal Business Name
                </label>
                <input
                  type="text"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleChange}
                  placeholder="Legal entity name"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Official Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hr@company.com"
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border ${
                      errors.email ? 'border-red-500/50' : 'border-gray-700'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Industry */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Industry *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border ${
                      errors.industry ? 'border-red-500/50' : 'border-gray-700'
                    } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none`}
                  >
                    <option value="">Select your industry</option>
                    {industries.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                {errors.industry && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.industry}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border ${
                      errors.password ? 'border-red-500/50' : 'border-gray-700'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border ${
                      errors.confirmPassword ? 'border-red-500/50' : 'border-gray-700'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://company.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Founded Year */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Founded Year
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="foundedYear"
                    value={formData.foundedYear}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Company Details */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Company Details</h3>
              <p className="text-gray-400">More about your organization</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Size */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Company Size *
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border ${
                      errors.size ? 'border-red-500/50' : 'border-gray-700'
                    } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  >
                    <option value="">Select company size</option>
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                {errors.size && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.size}
                  </p>
                )}
              </div>

              {/* HQ Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Headquarters Location
                </label>
                <input
                  type="text"
                  name="hqLocation"
                  value={formData.hqLocation}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Company Logo
              </label>
              <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all hover:border-blue-500/50 ${
                formData.logo ? 'border-blue-500/30 bg-blue-500/5' : 'border-gray-700'
              }`}>
                <Upload className={`w-12 h-12 mx-auto mb-4 ${
                  formData.logo ? 'text-blue-400' : 'text-gray-500'
                }`} />
                <p className="text-gray-400 mb-3">
                  {formData.logo ? formData.logo.name : 'Drag & drop or click to upload logo'}
                </p>
                <p className="text-gray-500 text-sm mb-4">PNG, JPG up to 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="inline-block px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 cursor-pointer transition-colors font-medium"
                >
                  {formData.logo ? 'Change File' : 'Browse Files'}
                </label>
              </div>
              {errors.logo && (
                <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.logo}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Company Description *
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                <textarea
                  name="description"
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your company's mission, culture, values, and what makes you unique..."
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/50 border ${
                    errors.description ? 'border-red-500/50' : 'border-gray-700'
                  } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                {errors.description && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
                <span className={`text-sm ml-auto ${
                  formData.description.length > 450 ? 'text-red-400' : 'text-gray-500'
                }`}>
                  {formData.description.length}/500 characters
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Subscription Plans */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Choose Your Plan</h3>
              <p className="text-gray-400">Select the plan that best fits your hiring needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                    formData.plan === plan.id
                      ? 'border-blue-500 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl shadow-blue-500/20'
                      : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                  } ${plan.highlighted ? 'md:-translate-y-2' : ''}`}
                  onClick={() => handleChange({ target: { name: 'plan', value: plan.id } })}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-white mb-3">{plan.name}</h4>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400">{plan.period}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300 text-sm">
                        <CheckCircle className={`w-4 h-4 mr-3 ${
                          formData.plan === plan.id ? 'text-blue-400' : 'text-green-500'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className={`py-3 rounded-xl text-center font-medium transition-all ${
                    formData.plan === plan.id
                      ? `bg-gradient-to-r ${plan.color} text-white`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}>
                    {formData.plan === plan.id ? '✓ Selected' : 'Select Plan'}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Admin Approval Note */}
            <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Admin Approval Required</h4>
                  <p className="text-gray-300">
                    All companies on ProveIt.io undergo manual verification to ensure platform quality. 
                    Your account will be reviewed within 24-48 hours. Once approved, you'll receive an 
                    email confirmation and can start posting jobs immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Verification */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Verification & Legal</h3>
              <p className="text-gray-400">Final steps to complete your registration</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tax ID */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Tax ID / Business Registration Number *
                </label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  placeholder="For verification purposes only"
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                    errors.taxId ? 'border-red-500/50' : 'border-gray-700'
                  } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.taxId && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.taxId}
                  </p>
                )}
              </div>

              {/* Contact Person */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Primary Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border ${
                    errors.contactPerson ? 'border-red-500/50' : 'border-gray-700'
                  } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.contactPerson && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.contactPerson}
                  </p>
                )}
              </div>

              {/* Contact Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Contact Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border ${
                      errors.contactPhone ? 'border-red-500/50' : 'border-gray-700'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.contactPhone && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.contactPhone}
                  </p>
                )}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="p-6 bg-gray-900/30 rounded-2xl border border-gray-700">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id="terms"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded bg-gray-800 border-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <div>
                  <label htmlFor="terms" className="text-gray-300">
                    I agree to the ProveIt.io{' '}
                    <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Terms of Service</a>,{' '}
                    <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Privacy Policy</a>, and understand that:
                  </label>
                  <ul className="mt-3 space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      <span>Admin approval is required before accessing the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      <span>All job postings are reviewed by ProveIt.io admins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      <span>Project-based evaluations are mandatory for all candidates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      <span>Subscription fees are billed monthly and auto-renew</span>
                    </li>
                  </ul>
                </div>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-red-400 flex items-center gap-1 mt-3">
                  <AlertCircle className="w-4 h-4" />
                  {errors.termsAccepted}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-8 border-t border-gray-800 gap-4">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3.5 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-all font-medium flex items-center gap-2"
              >
                ← Back
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">
              Step {step} of 4
            </span>
            
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium transition-all shadow-lg shadow-blue-500/20"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20 flex items-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Complete Registration
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/company/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign in to your company dashboard
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegisterForm;
