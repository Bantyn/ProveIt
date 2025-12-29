import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const ForgotPasswordModal = ({ show, onClose }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        setIsSubmitting(true);

        try {
            // Add your password reset API call here
            // await axios.post('http://localhost:4000/user/forgot-password', { email });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Password reset link sent to your email!');
            setEmail('');
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset link');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!show) return null;

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="relative w-full max-w-md bg-black border-2 border-violet-500/30 rounded-2xl shadow-2xl shadow-violet-900/50 p-8"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-violet-900/30 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-900/50">
                                <Mail className="w-8 h-8 text-white" strokeWidth={2.5} />
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-white text-center mb-2">
                            Forgot Password?
                        </h2>
                        <p className="text-gray-400 text-center mb-6">
                            Enter your email and we'll send you a reset link
                        </p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your.email@example.com"
                                        className="w-full h-12 text-base rounded-xl bg-black/40 border-2 border-violet-900/30 text-white px-4 pr-12 placeholder-gray-500 focus:border-violet-600 focus:ring-2 focus:ring-violet-500/30 transition-all duration-300 hover:border-violet-800/50"
                                    />
                                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" strokeWidth={2} />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold flex items-center justify-center shadow-xl shadow-violet-900/50 hover:from-violet-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                        />
                                        Sending...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <Send className="w-5 h-5 mr-2" strokeWidth={2.5} />
                                        Send Reset Link
                                    </span>
                                )}
                            </motion.button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={onClose}
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Back to login
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ForgotPasswordModal;
