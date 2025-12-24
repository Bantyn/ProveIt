import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  User,
  Sparkles,
  CheckCircle,
  XCircle,
  Zap,
  Globe,
  Clock,
  Shield,
  Brain,
  Palette,
  Rocket,
  Stars,
} from "lucide-react";

/* =======================
   Animated Background Elements
======================= */
const FloatingShapes = () => {
  const shapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    type: i % 3,
    size: Math.random() * 40 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${
            shape.type === 0
              ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10"
              : shape.type === 1
              ? "bg-gradient-to-br from-cyan-500/10 to-pink-500/10"
              : "bg-gradient-to-br from-emerald-500/10 to-amber-500/10"
          } backdrop-blur-sm`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            borderRadius: shape.type === 2 ? "50%" : "24px",
            rotate: shape.type * 45,
          }}
          animate={{
            x: [0, Math.random() * 60 - 30, 0],
            y: [0, Math.random() * 60 - 30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const ParticleField = () => {
  return (
    <div className="absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 7,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

/* =======================
   Interactive Contact Methods
======================= */
const ContactMethodCard = ({ method, isActive, onClick }) => {
  const icons = {
    chat: MessageSquare,
    call: Phone,
    email: Mail,
    meet: Globe,
  };

  const Icon = icons[method.icon];

  return (
    <motion.div
      onClick={() => onClick(method.id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative cursor-pointer p-4 rounded-2xl transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400/50"
          : "bg-white/5 border border-white/10 hover:border-blue-400/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${method.color}`}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-white">{method.title}</h4>
          <p className="text-sm text-blue-100/70">{method.time}</p>
        </div>
      </div>
      
      {isActive && (
        <motion.div
          layoutId="activeMethod"
          className="absolute inset-0 border-2 border-blue-400/50 rounded-2xl"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
      
      <motion.div
        initial={false}
        animate={{ scale: isActive ? 1 : 0 }}
        className="absolute -top-2 -right-2"
      >
        <Sparkles size={16} className="text-yellow-400" />
      </motion.div>
    </motion.div>
  );
};

/* =======================
   Animated Input Field
======================= */
const AnimatedInput = ({ icon: Icon, label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      animate={{ y: isFocused ? -2 : 0 }}
      className="relative"
    >
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Icon size={20} className={isFocused ? "text-blue-400" : "text-blue-300/50"} />
        </div>
        
        <input
          type={type}
          className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
          placeholder={label}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        <motion.div
          initial={false}
          animate={{
            width: isFocused ? "100%" : "0%",
            opacity: isFocused ? 0.1 : 0,
          }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

/* =======================
   AI Assistant Preview
======================= */
const AIAssistantPreview = () => {
  const [aiTyping, setAiTyping] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-white/10"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
          <Brain size={20} className="text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-white">AI Assistant Preview</h4>
          <p className="text-sm text-blue-100/70">Powered by GPT-4</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
            <p className="text-white text-sm">Hi, I need help with my project...</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-600 flex items-center justify-center">
            <Brain size={16} className="text-white" />
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
            <div className="flex items-center gap-2 mb-1">
              <motion.div
                animate={{ opacity: aiTyping ? 1 : 0.5 }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="w-2 h-2 bg-blue-400 rounded-full"
              />
              <motion.div
                animate={{ opacity: aiTyping ? 0.5 : 1 }}
                transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                className="w-2 h-2 bg-blue-400 rounded-full"
              />
              <motion.div
                animate={{ opacity: aiTyping ? 1 : 0.5 }}
                transition={{ repeat: Infinity, duration: 0.5, delay: 0.4 }}
                className="w-2 h-2 bg-blue-400 rounded-full"
              />
              <span className="text-xs text-blue-300">AI is thinking...</span>
            </div>
            <p className="text-white text-sm">I'd be happy to help! Based on your inquiry, I can connect you with our...</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* =======================
   Main Contact Form Component
======================= */
const ContactFormSection = () => {
  const [activeMethod, setActiveMethod] = useState("chat");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    priority: "normal",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    { id: "chat", icon: "chat", title: "Live Chat", time: "Instant", color: "bg-gradient-to-br from-green-500 to-emerald-600" },
    { id: "call", icon: "call", title: "Schedule Call", time: "15 min", color: "bg-gradient-to-br from-blue-500 to-cyan-600" },
    { id: "email", icon: "email", title: "Email", time: "6-12 hrs", color: "bg-gradient-to-br from-purple-500 to-pink-600" },
    { id: "meet", icon: "meet", title: "Video Meeting", time: "30 min", color: "bg-gradient-to-br from-orange-500 to-red-600" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "", priority: "normal" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/50 py-20">
      {/* Background Elements */}
      <FloatingShapes />
      <ParticleField />
      
      {/* Animated Orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl animate-pulse" />
      
      {/* Main Grid */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 mb-6 backdrop-blur-sm"
          >
            <Rocket size={20} className="text-blue-400" />
            <span className="text-lg font-medium text-blue-100">
              Connect with Innovation
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Contact Us
            </span>{" "}
            <br />
            <span className="text-white">In a Whole New Way</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100/80 max-w-3xl mx-auto"
          >
            Choose your preferred communication method. Our AI-enhanced system ensures
            your message reaches the right person, at the right time.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Methods & Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Contact Methods Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette size={20} className="text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Choose Your Channel</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {contactMethods.map((method) => (
                  <ContactMethodCard
                    key={method.id}
                    method={method}
                    isActive={activeMethod === method.id}
                    onClick={setActiveMethod}
                  />
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-sm border border-emerald-400/30"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="inline-flex mb-4"
                    >
                      <CheckCircle size={64} className="text-emerald-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-emerald-100/80">
                      Our AI assistant has received your message and will route it to the best specialist.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <AnimatedInput
                    icon={User}
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  
                  <AnimatedInput
                    icon={Mail}
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  
                  <div className="relative">
                    <div className="absolute left-4 top-4 z-10">
                      <MessageSquare size={20} className="text-blue-300/50" />
                    </div>
                    <textarea
                      className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-blue-100/50 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300 resize-none min-h-[120px]"
                      placeholder="Your Message..."
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {/* Priority Selection */}
                  <div>
                    <label className="block text-sm font-medium text-blue-100/70 mb-2">
                      Priority Level
                    </label>
                    <div className="flex gap-2">
                      {[
                        { value: "low", label: "Low", color: "bg-blue-500" },
                        { value: "normal", label: "Normal", color: "bg-purple-500" },
                        { value: "high", label: "High", color: "bg-pink-500" },
                        { value: "urgent", label: "Urgent", color: "bg-red-500" },
                      ].map((priority) => (
                        <motion.button
                          key={priority.value}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                          className={`flex-1 py-2 rounded-lg text-white font-medium transition-all ${
                            formData.priority === priority.value
                              ? `${priority.color} shadow-lg`
                              : "bg-white/10 hover:bg-white/20"
                          }`}
                        >
                          {priority.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-full group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
                    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl py-4 px-8 flex items-center justify-center gap-3 font-semibold text-white overflow-hidden">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles size={20} />
                          </motion.div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                          <Stars size={20} className="ml-auto" />
                        </>
                      )}
                    </div>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              {[
                { icon: Clock, value: "6h", label: "Avg Response" },
                { icon: Shield, value: "100%", label: "Secure" },
                { icon: Zap, value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <stat.icon size={20} className="inline-block mb-2 text-blue-400" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-100/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - AI Assistant & Visualizations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* AI Assistant Preview */}
            <AIAssistantPreview />

            {/* Contact Visualization */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-gradient-to-br from-pink-500 to-rose-600">
                  <Globe size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Global Reach</h4>
                  <p className="text-sm text-blue-100/70">Connected Worldwide</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: "North America", width: "90%", color: "bg-blue-500" },
                  { label: "Europe", width: "85%", color: "bg-purple-500" },
                  { label: "Asia Pacific", width: "75%", color: "bg-pink-500" },
                  { label: "Global Coverage", width: "95%", color: "bg-cyan-500" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm text-blue-100/70 mb-1">
                      <span>{item.label}</span>
                      <span>{item.width}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: item.width }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "End-to-End Encrypted", color: "from-emerald-500 to-green-600" },
                { icon: Brain, title: "AI-Powered Routing", color: "from-blue-500 to-cyan-600" },
                { icon: Clock, title: "Smart Scheduling", color: "from-purple-500 to-pink-600" },
                { icon: Zap, title: "Instant Notifications", color: "from-amber-500 to-orange-600" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-blue-400/30 transition-colors"
                >
                  <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${feature.color} mb-2`}>
                    <feature.icon size={16} className="text-white" />
                  </div>
                  <h5 className="text-sm font-medium text-white">{feature.title}</h5>
                </motion.div>
              ))}
            </div>

            {/* Live Status */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-white">Support Team Status</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm text-emerald-400">Online</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="relative"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-blue-900" />
                  </motion.div>
                ))}
                <div className="text-sm text-blue-100/70">
                  <div className="font-medium text-white">12 agents online</div>
                  <div>Ready to assist you</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-blue-100/60">
            Your data is protected with enterprise-grade security. We never share your information.
          </p>
        </motion.div>
      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl"
        >
          <MessageSquare size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default ContactFormSection;