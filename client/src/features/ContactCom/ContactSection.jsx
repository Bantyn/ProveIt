// src/features/ContactCom/ContactSection.jsx - JOB SEEKER CONTACT TO ADMIN
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Mail, Phone, MessageSquare, Send, CheckCircle2,
  User, Briefcase, GraduationCap, Clock, ShieldCheck,
  Sparkles, Award, Zap, Rocket, Building, MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';


const ContactSection = ({ darkMode = true }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: { 
      name: '', 
      email: '', 
      phone: '', 
      company: '',
      role: '',
      message: '' 
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/, 'Invalid phone number'),
      company: Yup.string().required('Company is required'),
      role: Yup.string().required('Your role is required'),
      message: Yup.string().min(30, 'Message must be at least 30 characters').required('Message is required'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      formik.resetForm();
    }
  });

  // Success Metrics
  const successMetrics = [
    { value: '24h', label: 'Avg Response Time', icon: Clock, color: 'amber' },
    { value: '94%', label: 'Satisfaction Rate', icon: Award, color: 'purple' },
    { value: 'Expert', label: 'Support Team', icon: Building, color: 'emerald' },
    { value: 'Secure', label: 'Confidential', icon: ShieldCheck, color: 'rose' }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Subtle gradient accents */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-emerald-500/5 via-transparent to-rose-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Contact Support</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            <span className="block">Get in Touch</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400">
              With Our Team
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Reach out to our dedicated support team for assistance with your account, 
            questions about our platform, or partnership inquiries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column - Contact Info & Metrics */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Success Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-purple-500 rounded-full" />
                Why Choose Our Support
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {successMetrics.map((metric, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm"
                  >
                    <div className={`text-2xl font-bold ${
                      metric.color === 'amber' ? 'text-amber-400' :
                      metric.color === 'purple' ? 'text-purple-400' :
                      metric.color === 'emerald' ? 'text-emerald-400' :
                      'text-rose-400'
                    }`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-2 flex items-center justify-center gap-2">
                      <metric.icon className="w-4 h-4" />
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-emerald-500 rounded-full" />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm">
                  <div className="p-3 rounded-xl bg-black/50 border border-gray-800">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300">Email Support</h4>
                    <p className="text-lg font-bold mt-1 text-white">support@proveit.ai</p>
                    <p className="text-sm text-gray-400 mt-2">General inquiries & support</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
                  <div className="p-3 rounded-xl bg-black/50 border border-gray-800">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300">Phone Support</h4>
                    <p className="text-lg font-bold mt-1 text-white">+1 (555) 789-0123</p>
                    <p className="text-sm text-gray-400 mt-2">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm">
                  <div className="p-3 rounded-xl bg-black/50 border border-gray-800">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300">Location</h4>
                    <p className="text-lg font-bold mt-1 text-white">San Francisco, CA</p>
                    <p className="text-sm text-gray-400 mt-2">Headquarters</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Response Time Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-400" />
                Response Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Initial Response</span>
                  <span className="text-sm font-bold text-amber-400">Within 24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Complex Issues</span>
                  <span className="text-sm font-bold text-purple-400">48-72 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Urgent Matters</span>
                  <span className="text-sm font-bold text-emerald-400">Immediate priority</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {/* Form Container */}
              <div className="relative rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-purple-500/5 to-emerald-500/5" />
                
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-emerald-500/10 rounded-3xl"
                />
                
                <div className="relative p-8 md:p-10">
                  {/* Form Header */}
                  <div className="mb-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-purple-600 shadow-lg">
                        <MessageSquare className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">Send us a Message</h2>
                        <p className="text-gray-400 mt-2">
                          Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <form onSubmit={formik.handleSubmit} className="space-y-8">
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <User className="w-5 h-5 text-amber-400" />
                        Personal Information
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">
                            Full Name *
                          </label>
                          <input
                            {...formik.getFieldProps('name')}
                            className={`w-full px-5 py-4 rounded-xl bg-gray-900/30 border ${
                              formik.touched.name && formik.errors.name
                                ? 'border-rose-500/50 focus:border-rose-500'
                                : 'border-gray-700 focus:border-amber-500'
                            } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all backdrop-blur-sm`}
                            placeholder="John Doe"
                          />
                          {formik.touched.name && formik.errors.name && (
                            <p className="mt-2 text-sm text-rose-400">{formik.errors.name}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">
                            Email Address *
                          </label>
                          <input
                            {...formik.getFieldProps('email')}
                            type="email"
                            className={`w-full px-5 py-4 rounded-xl bg-gray-900/30 border ${
                              formik.touched.email && formik.errors.email
                                ? 'border-rose-500/50 focus:border-rose-500'
                                : 'border-gray-700 focus:border-purple-500'
                            } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm`}
                            placeholder="john@example.com"
                          />
                          {formik.touched.email && formik.errors.email && (
                            <p className="mt-2 text-sm text-rose-400">{formik.errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">
                            Phone Number
                          </label>
                          <input
                            {...formik.getFieldProps('phone')}
                            type="tel"
                            className="w-full px-5 py-4 rounded-xl bg-gray-900/30 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all backdrop-blur-sm"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">
                            Company *
                          </label>
                          <input
                            {...formik.getFieldProps('company')}
                            className={`w-full px-5 py-4 rounded-xl bg-gray-900/30 border ${
                              formik.touched.company && formik.errors.company
                                ? 'border-rose-500/50 focus:border-rose-500'
                                : 'border-gray-700 focus:border-emerald-500'
                            } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all backdrop-blur-sm`}
                            placeholder="Your company name"
                          />
                          {formik.touched.company && formik.errors.company && (
                            <p className="mt-2 text-sm text-rose-400">{formik.errors.company}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Your Role *
                        </label>
                        <input
                          {...formik.getFieldProps('role')}
                          className={`w-full px-5 py-4 rounded-xl bg-gray-900/30 border ${
                            formik.touched.role && formik.errors.role
                              ? 'border-rose-500/50 focus:border-rose-500'
                              : 'border-gray-700 focus:border-purple-500'
                          } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm`}
                          placeholder="e.g., HR Manager, Recruiter, Team Lead"
                        />
                        {formik.touched.role && formik.errors.role && (
                          <p className="mt-2 text-sm text-rose-400">{formik.errors.role}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-300">
                          Your Message *
                        </label>
                        <span className="text-xs text-gray-500">
                          {formik.values.message.length}/30 characters
                        </span>
                      </div>
                      <textarea
                        {...formik.getFieldProps('message')}
                        rows={4}
                        className={`w-full px-5 py-4 rounded-xl bg-gray-900/30 border ${
                          formik.touched.message && formik.errors.message
                            ? 'border-rose-500/50 focus:border-rose-500'
                            : 'border-gray-700 focus:border-purple-500'
                        } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none backdrop-blur-sm`}
                        placeholder="Please describe your inquiry in detail..."
                      />
                      {formik.touched.message && formik.errors.message && (
                        <p className="mt-2 text-sm text-rose-400">{formik.errors.message}</p>
                      )}
                      <div className="text-sm text-gray-500">
                        Be specific about what you need help with for better assistance.
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-5 px-6 rounded-xl font-bold text-lg transition-all duration-500 relative overflow-hidden group backdrop-blur-sm ${
                        submitted
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                          : isSubmitting
                            ? 'bg-gray-700 cursor-not-allowed'
                            : 'bg-gradient-to-r from-amber-500 via-purple-500 to-emerald-500'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-purple-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending Message...
                          </>
                        ) : submitted ? (
                          <>
                            <CheckCircle2 className="w-6 h-6" />
                            Message Sent Successfully!
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </span>
                    </motion.button>
                  </form>

                  {/* Form Footer */}
                  <div className="mt-10 pt-8 border-t border-gray-800">
                    <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400 gap-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-amber-400" />
                        <span>Your information is secure and confidential</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <span>Response within 24 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What Happens Next */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-6 rounded-2xl border border-gray-800 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-3">
                <Rocket className="w-5 h-5 text-amber-400" />
                What happens next?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { step: '1', title: 'Confirmation', desc: 'Email received', color: 'amber' },
                  { step: '2', title: 'Review', desc: 'Team assignment', color: 'purple' },
                  { step: '3', title: 'Contact', desc: 'Expert response', color: 'emerald' },
                  { step: '4', title: 'Resolution', desc: 'Issue solved', color: 'rose' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                      item.color === 'amber' ? 'from-amber-500 to-orange-600' :
                      item.color === 'purple' ? 'from-purple-500 to-pink-600' :
                      item.color === 'emerald' ? 'from-emerald-500 to-teal-600' :
                      'from-rose-500 to-red-600'
                    } flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                      <span className="font-bold text-white text-xs">{item.step}</span>
                    </div>
                    <div className="font-bold text-gray-300 text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-white">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How long does it take to get a response?",
                a: "Most inquiries receive an initial response within 24 hours. Complex issues may take 48-72 hours.",
                icon: Clock
              },
              {
                q: "What information should I include?",
                a: "Include your name, company, role, and specific details about your inquiry for faster resolution.",
                icon: MessageSquare
              },
              {
                q: "Is my information secure?",
                a: "Yes, all information is encrypted and handled with strict confidentiality.",
                icon: ShieldCheck
              },
              {
                q: "Can I contact specific departments?",
                a: "Yes, mention your specific needs and we'll route your inquiry to the right team.",
                icon: Building
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/30 to-black/30 backdrop-blur-sm hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <faq.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-2">{faq.q}</h4>
                    <p className="text-gray-400">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;