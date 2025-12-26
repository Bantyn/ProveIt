import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, GraduationCap, Briefcase, Calendar, Sparkles, Upload, Edit2, CheckCircle } from 'lucide-react';

const Step3Summary = ({ formik, setCurrentStep, onOpenPlanModal, isDark }) => {
    const skills = formik.values.skills ? formik.values.skills.split(',').map(s => s.trim()) : [];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="text-center space-y-2">
                <h3 className={`text-2xl font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                    Review Your Information
                </h3>
                <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Please review your details before selecting a plan
                </p>
            </div>

            {/* Summary Cards */}
            <div className="space-y-4">
                {/* Personal Information */}
                <div className={`p-6 rounded-xl border ${isDark
                        ? 'bg-violet-600/5 border-violet-500/20'
                        : 'bg-violet-50 border-violet-300'
                    }`}>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                            }`}>
                            <User className="w-5 h-5 text-violet-400" />
                            Personal Information
                        </h4>
                        <button
                            onClick={() => setCurrentStep(1)}
                            className={`p-2 rounded-lg transition-colors ${isDark
                                    ? 'hover:bg-violet-600/20 text-violet-400'
                                    : 'hover:bg-violet-100 text-violet-600'
                                }`}
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className={`text-xs font-medium mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                                }`}>
                                Full Name
                            </p>
                            <p className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                }`}>
                                {formik.values.fullName || 'Not provided'}
                            </p>
                        </div>
                        <div>
                            <p className={`text-xs font-medium mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                                }`}>
                                Email Address
                            </p>
                            <p className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                }`}>
                                {formik.values.email || 'Not provided'}
                            </p>
                        </div>
                        <div>
                            <p className={`text-xs font-medium mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                                }`}>
                                Phone Number
                            </p>
                            <p className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                }`}>
                                {formik.values.phone || 'Not provided'}
                            </p>
                        </div>
                        <div>
                            <p className={`text-xs font-medium mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                                }`}>
                                Password
                            </p>
                            <p className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                }`}>
                                ••••••••
                            </p>
                        </div>
                    </div>
                </div>

                {/* Professional Details */}
                <div className={`p-6 rounded-xl border ${isDark
                        ? 'bg-blue-600/5 border-blue-500/20'
                        : 'bg-blue-50 border-blue-300'
                    }`}>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                            }`}>
                            <GraduationCap className="w-5 h-5 text-blue-400" />
                            Professional Details
                        </h4>
                        <button
                            onClick={() => setCurrentStep(2)}
                            className={`p-2 rounded-lg transition-colors ${isDark
                                    ? 'hover:bg-blue-600/20 text-blue-400'
                                    : 'hover:bg-blue-100 text-blue-600'
                                }`}
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className={`text-xs font-medium mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                                }`}>
                                College/University
                            </p>
                            <p className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                }`}>
                                {formik.values.college || 'Not provided'}
                            </p>
                        </div>
                        <div>
                            <p className={`text-xs font-medium mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                                }`}>
                                Degree
                            </p>
                            <p className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                }`}>
                                {formik.values.degree || 'Not provided'}
                            </p>
                        </div>
                        <div>
                            <p className={`text-xs font-medium mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                                }`}>
                                Graduation Year
                            </p>
                            <p className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                }`}>
                                {formik.values.graduationYear || 'Not provided'}
                            </p>
                        </div>
                        <div>
                            <p className={`text-xs font-medium mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                                }`}>
                                Resume URL
                            </p>
                            <p className={`font-medium truncate ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                }`}>
                                {formik.values.resumeUrl || 'Not provided'}
                            </p>
                        </div>
                    </div>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <div className="mt-4">
                            <p className={`text-xs font-medium mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'
                                }`}>
                                Skills
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${isDark
                                                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                                                : 'bg-violet-100 text-violet-700 border border-violet-300'
                                            }`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Choose Plan Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenPlanModal}
                className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
                Choose Your Plan
            </motion.button>

            {/* Info Note */}
            <div className={`p-4 rounded-lg border ${isDark
                    ? 'bg-violet-600/5 border-violet-500/20'
                    : 'bg-violet-50 border-violet-300'
                }`}>
                <p className={`text-sm flex items-start gap-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                    <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                    After selecting a plan, you'll be redirected to your profile page where you can complete your setup and start participating in competitions.
                </p>
            </div>
        </motion.div>
    );
};

export default Step3Summary;
