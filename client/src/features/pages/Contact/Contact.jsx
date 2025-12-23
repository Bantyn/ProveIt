import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, MessageSquare, Building2, User, 
  HelpCircle, Handshake, Send, Clock, 
  Shield, CheckCircle, ChevronRight,
  Sun, Moon, ExternalLink
} from 'lucide-react';

const ProveItContact = () => {
  const [contactReason, setContactReason] = useState('Candidate');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    companyName: '',
    teamSize: '',
    workEmail: '',
    username: '',
    issueType: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check system preference on mount
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Contact reasons with icons
  const contactReasons = [
    { id: 'Company', label: 'Company / Employer', icon: <Building2 size={20} />, color: 'blue' },
    { id: 'Candidate', label: 'Candidate', icon: <User size={20} />, color: 'green' },
    { id: 'Support', label: 'Support', icon: <HelpCircle size={20} />, color: 'purple' },
    { id: 'Partnership', label: 'Partnership', icon: <Handshake size={20} />, color: 'orange' }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const buttonHover = {
    scale: 1.03,
    transition: { duration: 0.2 }
  };

  const buttonTap = {
    scale: 0.98
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, connect to your backend here
    console.log('Form submitted:', { ...formData, contactReason });
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '', email: '', message: '',
        companyName: '', teamSize: '', workEmail: '',
        username: '', issueType: ''
      });
    }, 3000);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Render dynamic fields based on contact reason
  const renderDynamicFields = () => {
    switch(contactReason) {
      case 'Company':
        return (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Team Size</label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select team size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201+">201+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Work Email *</label>
                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="company@email.com"
                  required
                />
              </div>
            </div>
          </motion.div>
        );

      case 'Candidate':
        return (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Username / Profile Email *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Your Provely.io username or email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Issue Type *</label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              >
                <option value="">Select issue type</option>
                <option value="account">Account Issues</option>
                <option value="project">Project Submission</option>
                <option value="verification">Verification Process</option>
                <option value="technical">Technical Support</option>
                <option value="other">Other</option>
              </select>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Determine CTA button text
  const getCtaText = () => {
    switch(contactReason) {
      case 'Company': return 'Request Demo';
      case 'Candidate': return 'Send Message';
      case 'Support': return 'Get Help';
      case 'Partnership': return 'Start Partnership';
      default: return 'Send Message';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Theme Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-700" />}
      </button>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* 1️⃣ HEADER / HERO SECTION */}
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <MessageSquare size={16} />
            <span>Contact Provely.io</span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Provely</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Get help, book a demo, or talk hiring.
          </motion.p>
        </motion.header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2">
            {/* 2️⃣ CONTACT REASON SELECTOR */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Why are you contacting us? *</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {contactReasons.map((reason) => (
                  <motion.button
                    key={reason.id}
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    onClick={() => setContactReason(reason.id)}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                      contactReason === reason.id 
                        ? `border-${reason.color}-500 bg-${reason.color}-50 dark:bg-${reason.color}-900/20` 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className={`p-2 rounded-full bg-${reason.color}-100 dark:bg-${reason.color}-900/30`}>
                      <div className={`text-${reason.color}-600 dark:text-${reason.color}-400`}>
                        {reason.icon}
                      </div>
                    </div>
                    <span className="font-medium text-sm text-center">{reason.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* 3️⃣ DYNAMIC CONTACT FORM */}
            <motion.form 
              onSubmit={handleSubmit}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              {/* Common Fields */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Dynamic Fields */}
                <AnimatePresence mode="wait">
                  {renderDynamicFields()}
                </AnimatePresence>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us what you need..."
                    required
                  />
                </div>
              </motion.div>

              {/* 4️⃣ PRIMARY CTA */}
              <motion.div variants={fadeInUp}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitted}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    isSubmitted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {getCtaText()}
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </div>

          {/* Right Column - Contact Info & Trust */}
          <div className="space-y-8">
            {/* 5️⃣ QUICK CONTACT OPTIONS */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Mail size={20} className="text-blue-500" />
                Quick Contact
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Mail size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Support Email</p>
                    <p className="font-medium">support@provely.io</p>
                  </div>
                </div>

                <motion.a
                  whileHover={{ x: 5 }}
                  href="/demo"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <ExternalLink size={18} />
                    </div>
                    <div>
                      <p className="font-bold">Book a Demo</p>
                      <p className="text-sm opacity-90">Schedule a live platform tour</p>
                    </div>
                  </div>
                  <ChevronRight size={20} />
                </motion.a>
              </div>
            </motion.div>

            {/* 6️⃣ TRUST & REASSURANCE BLOCK */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Shield size={20} className="text-green-500" />
                Your Trust Matters
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Fast Response</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Shield size={18} className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Secure & Private</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your data is encrypted and secure</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">No Spam Promise</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">We never share your information</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center p-6 bg-gray-900 text-white rounded-2xl"
            >
              <p className="text-3xl font-bold mb-2">24h</p>
              <p className="text-sm text-gray-300">Average Response Time</p>
              <div className="mt-4 text-xs text-gray-400">
                <p>Trusted by 500+ companies</p>
                <p>98% customer satisfaction</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 7️⃣ FOOTER / LEGAL LINKS */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Provely.io. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <a 
                href="/privacy" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="/cookies" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default ProveItContact;