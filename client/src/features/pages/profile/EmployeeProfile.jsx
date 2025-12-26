import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap,
    Award, FileText, Link as LinkIcon, Github, Linkedin, Globe,
    Edit2, Save, X, Upload, Download, Settings, Bell, Shield,
    TrendingUp, Target, CheckCircle, Star, Crown, Zap, Activity,
    BellRing
} from 'lucide-react';
import { CursorCard, CursorCardsContainer } from '../../components/CursorCards';
import { FlippingCard } from '../../components/FlippingCard';
import { SwipeButton } from '../../components/SwipeButton';
import { GlowingButton } from '../../components/GlowingButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeProfile = ({ isDark = true }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [twoFactorCode, setTwoFactorCode] = useState('');

    // Mock user data
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        title: 'Full Stack Developer',
        bio: 'Passionate developer with 5+ years of experience in building scalable web applications.',
        college: 'Stanford University',
        degree: 'B.S. Computer Science',
        graduationYear: '2019',
        gpa: '3.8',
        skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'],
        resumeUrl: 'https://drive.google.com/resume',
        portfolio: 'https://johndoe.dev',
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        plan: 'Premium',
        planExpiry: '2025-06-27',
        competitionsJoined: 24,
        projectsCompleted: 18,
        successRate: 94,
        rank: 'Gold'
    });

    const handleSave = () => {
        console.log('Saving profile...');
        toast.success('Profile updated successfully! 🎉', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        setIsEditing(false);
    };

    const handlePasswordChange = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match!', { position: "top-right" });
            return;
        }
        if (passwordData.newPassword.length < 8) {
            toast.error('Password must be at least 8 characters!', { position: "top-right" });
            return;
        }
        // API call would go here
        toast.success('Password changed successfully! 🔒', { position: "top-right" });
        setShowPasswordModal(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const handleEnable2FA = () => {
        if (twoFactorCode.length !== 6) {
            toast.error('Please enter a valid 6-digit code!', { position: "top-right" });
            return;
        }
        // API call would go here
        toast.success('Two-Factor Authentication enabled! 🔐', { position: "top-right" });
        setShow2FAModal(false);
        setTwoFactorCode('');
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'education', label: 'Education & Skills', icon: GraduationCap },
        { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
        { id: 'subscription', label: 'Subscription', icon: Crown },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    return (
        <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-900'} transition-colors duration-300 pb-20`}>
            {/* Header */}
            <div className={`border-b ${isDark ? 'border-violet-500/20 bg-black' : 'border-violet-300 bg-white'}`}>
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                                My Profile
                            </h1>
                            <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                Manage your account and preferences
                            </p>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${isEditing
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white'
                                }`}
                        >
                            {isEditing ? (
                                <span className="flex items-center gap-2">
                                    <X className="w-4 h-4" />
                                    Cancel
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Header Card */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CursorCard
                        borderColor={isDark ? '#8b5cf6' : '#a78bfa'}
                        className={`rounded-3xl border-2 p-10 shadow-2xl ${isDark
                            ? 'bg-gradient-to-br from-violet-600/20 via-blue-600/10 to-violet-600/20 border-violet-500/40'
                            : 'bg-gradient-to-br from-white via-violet-50/50 to-white border-violet-400'
                            }`}
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                            {/* Profile Picture with Ring Effect */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                                <div className={`relative w-40 h-40 rounded-full flex items-center justify-center text-5xl font-black shadow-2xl ${isDark
                                    ? 'bg-gradient-to-br from-violet-600 via-blue-600 to-violet-600'
                                    : 'bg-gradient-to-br from-violet-500 via-blue-500 to-violet-500'
                                    } text-white ring-4 ring-violet-500/30`}>
                                    {userData.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {isEditing && (
                                    <button className="absolute bottom-2 right-2 p-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700 shadow-lg">
                                        <Upload className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="space-y-3">
                                    <h2 className={`text-4xl font-black ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                        {userData.name}
                                    </h2>
                                    <p className="text-xl font-semibold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                                        {userData.title}
                                    </p>
                                    <div className="flex items-center justify-center md:justify-start gap-4 mt-4 flex-wrap">
                                        <span className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-violet-600/20 text-neutral-300' : 'bg-violet-100 text-neutral-700'
                                            }`}>
                                            <MapPin className="w-4 h-4 text-violet-400" />
                                            {userData.location}
                                        </span>
                                        <span className={`px-4 py-2 rounded-full text-sm font-black shadow-lg ${userData.rank === 'Gold'
                                            ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white'
                                            : 'bg-gradient-to-r from-violet-600 to-blue-600 text-white'
                                            }`}>
                                            ⭐ {userData.rank} Member
                                        </span>
                                    </div>
                                </div>
                                <p className={`mt-6 text-lg leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                    {userData.bio}
                                </p>

                                {/* Quick Stats - Enhanced */}
                                <div className="grid grid-cols-3 gap-6 mt-8">
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className={`p-6 rounded-2xl text-center shadow-xl cursor-pointer ${isDark
                                            ? 'bg-gradient-to-br from-violet-600/30 to-violet-600/10 border border-violet-500/30'
                                            : 'bg-gradient-to-br from-violet-100 to-violet-50 border border-violet-300'
                                            }`}
                                    >
                                        <div className="text-4xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                                            {userData.competitionsJoined}
                                        </div>
                                        <div className={`text-sm mt-2 font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                            Competitions
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className={`p-6 rounded-2xl text-center shadow-xl cursor-pointer ${isDark
                                            ? 'bg-gradient-to-br from-blue-600/30 to-blue-600/10 border border-blue-500/30'
                                            : 'bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-300'
                                            }`}
                                    >
                                        <div className="text-4xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                                            {userData.projectsCompleted}
                                        </div>
                                        <div className={`text-sm mt-2 font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                            Completed
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className={`p-6 rounded-2xl text-center shadow-xl cursor-pointer ${isDark
                                            ? 'bg-gradient-to-br from-violet-600/30 to-violet-600/10 border border-violet-500/30'
                                            : 'bg-gradient-to-br from-violet-100 to-violet-50 border border-violet-300'
                                            }`}
                                    >
                                        <div className="text-4xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                                            {userData.successRate}%
                                        </div>
                                        <div className={`text-sm mt-2 font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                            Success Rate
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </CursorCard>
                </motion.div>

                {/* Tabs */}
                <div className={`flex gap-2 mt-6 p-2 rounded-xl ${isDark ? 'bg-violet-600/5' : 'bg-white border border-violet-300'
                    }`}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg'
                                : isDark
                                    ? 'text-neutral-400 hover:text-neutral-100 hover:bg-violet-600/10'
                                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-violet-100'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="hidden md:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6"
                        >
                            <CursorCardsContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Personal Information Card */}
                                <CursorCard
                                    borderColor={isDark ? '#262626' : '#e5e5e5'}
                                    className={`rounded-2xl border p-6 shadow-md ${isDark ? 'bg-black border-violet-500/20' : 'bg-white border-violet-300'
                                        }`}
                                >
                                    <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                        }`}>
                                        <User className="w-5 h-5 text-violet-400" />
                                        Personal Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                                Email
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    value={userData.email}
                                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                    className={`w-full mt-1 px-3 py-2 rounded-lg border ${isDark
                                                        ? 'bg-violet-600/10 border-violet-500/30 text-neutral-100'
                                                        : 'bg-violet-50 border-violet-300 text-neutral-900'
                                                        }`}
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Mail className="w-4 h-4 text-violet-400" />
                                                    <span className={isDark ? 'text-neutral-100' : 'text-neutral-900'}>
                                                        {userData.email}
                                                    </span>
                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                                Phone
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    value={userData.phone}
                                                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                                    className={`w-full mt-1 px-3 py-2 rounded-lg border ${isDark
                                                        ? 'bg-violet-600/10 border-violet-500/30 text-neutral-100'
                                                        : 'bg-violet-50 border-violet-300 text-neutral-900'
                                                        }`}
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Phone className="w-4 h-4 text-violet-400" />
                                                    <span className={isDark ? 'text-neutral-100' : 'text-neutral-900'}>
                                                        {userData.phone}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                                Location
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={userData.location}
                                                    onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                                                    className={`w-full mt-1 px-3 py-2 rounded-lg border ${isDark
                                                        ? 'bg-violet-600/10 border-violet-500/30 text-neutral-100'
                                                        : 'bg-violet-50 border-violet-300 text-neutral-900'
                                                        }`}
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <MapPin className="w-4 h-4 text-violet-400" />
                                                    <span className={isDark ? 'text-neutral-100' : 'text-neutral-900'}>
                                                        {userData.location}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CursorCard>

                                {/* Notifications Card */}
                                <CursorCard
                                    borderColor={isDark ? '#262626' : '#e5e5e5'}
                                    className={`rounded-2xl border p-6 shadow-md ${isDark ? 'bg-black border-violet-500/20' : 'bg-white border-violet-300'
                                        }`}
                                >
                                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                        Notifications
                                    </h3>
                                    <p className={`text-sm mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                        You have 3 unread messages.
                                    </p>
                                    <div className={`flex items-center space-x-4 rounded-xl border p-4 ${isDark ? 'bg-neutral-950 border-violet-500/20' : 'bg-neutral-50 border-violet-300'
                                        }`}>
                                        <BellRing className="w-5 h-5 text-violet-400" />
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm leading-none font-medium">
                                                Push Notifications
                                            </p>
                                            <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                                Send notifications to device.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                                            className={`w-12 h-6 rounded-full transition-colors ${notificationsEnabled ? 'bg-violet-600' : isDark ? 'bg-neutral-700' : 'bg-neutral-300'
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                                                }`} />
                                        </button>
                                    </div>
                                </CursorCard>
                            </CursorCardsContainer>
                        </motion.div>
                    )}

                    {activeTab === 'education' && (
                        <motion.div
                            key="education"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6"
                        >
                            <CursorCardsContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Education Card */}
                                <CursorCard
                                    borderColor={isDark ? '#262626' : '#e5e5e5'}
                                    className={`rounded-2xl border p-6 shadow-md ${isDark ? 'bg-black border-violet-500/20' : 'bg-white border-violet-300'
                                        }`}
                                >
                                    <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                        }`}>
                                        <GraduationCap className="w-5 h-5 text-violet-400" />
                                        Education
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                                College/University
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={userData.college}
                                                    onChange={(e) => setUserData({ ...userData, college: e.target.value })}
                                                    className={`w-full mt-1 px-3 py-2 rounded-lg border ${isDark
                                                        ? 'bg-violet-600/10 border-violet-500/30 text-neutral-100'
                                                        : 'bg-violet-50 border-violet-300 text-neutral-900'
                                                        }`}
                                                />
                                            ) : (
                                                <p className={`mt-1 font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                                    {userData.college}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                                Degree
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={userData.degree}
                                                    onChange={(e) => setUserData({ ...userData, degree: e.target.value })}
                                                    className={`w-full mt-1 px-3 py-2 rounded-lg border ${isDark
                                                        ? 'bg-violet-600/10 border-violet-500/30 text-neutral-100'
                                                        : 'bg-violet-50 border-violet-300 text-neutral-900'
                                                        }`}
                                                />
                                            ) : (
                                                <p className={`mt-1 font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                                    {userData.degree}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                                    Graduation Year
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={userData.graduationYear}
                                                        onChange={(e) => setUserData({ ...userData, graduationYear: e.target.value })}
                                                        className={`w-full mt-1 px-3 py-2 rounded-lg border ${isDark
                                                            ? 'bg-violet-600/10 border-violet-500/30 text-neutral-100'
                                                            : 'bg-violet-50 border-violet-300 text-neutral-900'
                                                            }`}
                                                    />
                                                ) : (
                                                    <p className={`mt-1 font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                                        {userData.graduationYear}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                                    GPA
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={userData.gpa}
                                                        onChange={(e) => setUserData({ ...userData, gpa: e.target.value })}
                                                        className={`w-full mt-1 px-3 py-2 rounded-lg border ${isDark
                                                            ? 'bg-violet-600/10 border-violet-500/30 text-neutral-100'
                                                            : 'bg-violet-50 border-violet-300 text-neutral-900'
                                                            }`}
                                                    />
                                                ) : (
                                                    <p className={`mt-1 font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                                        {userData.gpa}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CursorCard>

                                {/* Skills Card */}
                                <CursorCard
                                    borderColor={isDark ? '#262626' : '#e5e5e5'}
                                    className={`rounded-2xl border p-6 shadow-md ${isDark ? 'bg-black border-violet-500/20' : 'bg-white border-violet-300'
                                        }`}
                                >
                                    <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                        }`}>
                                        <Zap className="w-5 h-5 text-blue-400" />
                                        Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {userData.skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className={`px-4 py-2 rounded-lg font-medium ${isDark
                                                    ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                                                    : 'bg-violet-100 text-violet-700 border border-violet-300'
                                                    }`}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {isEditing && (
                                            <button className={`px-4 py-2 rounded-lg border-2 border-dashed ${isDark
                                                ? 'border-violet-500/30 text-violet-400 hover:bg-violet-600/10'
                                                : 'border-violet-300 text-violet-600 hover:bg-violet-50'
                                                }`}>
                                                + Add Skill
                                            </button>
                                        )}
                                    </div>
                                </CursorCard>
                            </CursorCardsContainer>
                        </motion.div>
                    )}

                    {activeTab === 'portfolio' && (
                        <motion.div
                            key="portfolio"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6"
                        >
                            <CursorCardsContainer className="grid grid-cols-1 gap-6">
                                <CursorCard
                                    borderColor={isDark ? '#262626' : '#e5e5e5'}
                                    className={`rounded-2xl border p-6 shadow-md ${isDark ? 'bg-black border-violet-500/20' : 'bg-white border-violet-300'
                                        }`}
                                >
                                    <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                        }`}>
                                        <FileText className="w-5 h-5 text-violet-400" />
                                        Resume & Portfolio
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className={`p-4 rounded-lg border ${isDark ? 'border-violet-500/20 bg-violet-600/5' : 'border-violet-300 bg-violet-50'
                                            }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-5 h-5 text-violet-400" />
                                                    <span className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                                        Resume
                                                    </span>
                                                </div>
                                                <button className="p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {isEditing && (
                                                <input
                                                    type="text"
                                                    value={userData.resumeUrl}
                                                    onChange={(e) => setUserData({ ...userData, resumeUrl: e.target.value })}
                                                    placeholder="Resume URL"
                                                    className={`w-full mt-2 px-3 py-2 rounded-lg border text-sm ${isDark
                                                        ? 'bg-violet-600/10 border-violet-500/30 text-neutral-100'
                                                        : 'bg-white border-violet-300 text-neutral-900'
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <div className={`p-4 rounded-lg border ${isDark ? 'border-blue-500/20 bg-blue-600/5' : 'border-blue-300 bg-blue-50'
                                            }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-5 h-5 text-blue-400" />
                                                    <span className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                                        Portfolio
                                                    </span>
                                                </div>
                                                <a href={userData.portfolio} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                                                    <LinkIcon className="w-4 h-4" />
                                                </a>
                                            </div>
                                            {isEditing && (
                                                <input
                                                    type="text"
                                                    value={userData.portfolio}
                                                    onChange={(e) => setUserData({ ...userData, portfolio: e.target.value })}
                                                    placeholder="Portfolio URL"
                                                    className={`w-full mt-2 px-3 py-2 rounded-lg border text-sm ${isDark
                                                        ? 'bg-blue-600/10 border-blue-500/30 text-neutral-100'
                                                        : 'bg-white border-blue-300 text-neutral-900'
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <div className={`p-4 rounded-lg border ${isDark ? 'border-violet-500/20 bg-violet-600/5' : 'border-violet-300 bg-violet-50'
                                            }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Github className="w-5 h-5 text-violet-400" />
                                                    <span className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                                        GitHub
                                                    </span>
                                                </div>
                                                <a href={userData.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700">
                                                    <LinkIcon className="w-4 h-4" />
                                                </a>
                                            </div>
                                            {isEditing && (
                                                <input
                                                    type="text"
                                                    value={userData.github}
                                                    onChange={(e) => setUserData({ ...userData, github: e.target.value })}
                                                    placeholder="GitHub URL"
                                                    className={`w-full mt-2 px-3 py-2 rounded-lg border text-sm ${isDark
                                                        ? 'bg-violet-600/10 border-violet-500/30 text-neutral-100'
                                                        : 'bg-white border-violet-300 text-neutral-900'
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <div className={`p-4 rounded-lg border ${isDark ? 'border-blue-500/20 bg-blue-600/5' : 'border-blue-300 bg-blue-50'
                                            }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Linkedin className="w-5 h-5 text-blue-400" />
                                                    <span className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                                        LinkedIn
                                                    </span>
                                                </div>
                                                <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                                                    <LinkIcon className="w-4 h-4" />
                                                </a>
                                            </div>
                                            {isEditing && (
                                                <input
                                                    type="text"
                                                    value={userData.linkedin}
                                                    onChange={(e) => setUserData({ ...userData, linkedin: e.target.value })}
                                                    placeholder="LinkedIn URL"
                                                    className={`w-full mt-2 px-3 py-2 rounded-lg border text-sm ${isDark
                                                        ? 'bg-blue-600/10 border-blue-500/30 text-neutral-100'
                                                        : 'bg-white border-blue-300 text-neutral-900'
                                                        }`}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </CursorCard>
                            </CursorCardsContainer>
                        </motion.div>
                    )}

                    {activeTab === 'settings' && (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6"
                        >
                            <CursorCardsContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Notifications Settings */}
                                <CursorCard
                                    borderColor={isDark ? '#262626' : '#e5e5e5'}
                                    className={`rounded-2xl border p-6 shadow-md ${isDark ? 'bg-black border-violet-500/20' : 'bg-white border-violet-300'
                                        }`}
                                >
                                    <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                        }`}>
                                        <Bell className="w-5 h-5 text-violet-400" />
                                        Notifications
                                    </h3>
                                    <div className="space-y-4">
                                        {['Email notifications', 'Competition updates', 'New opportunities', 'Weekly digest'].map((setting, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                                                    {setting}
                                                </span>
                                                <button className={`w-12 h-6 rounded-full transition-colors ${idx % 2 === 0
                                                    ? 'bg-violet-600'
                                                    : isDark ? 'bg-neutral-700' : 'bg-neutral-300'
                                                    }`}>
                                                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${idx % 2 === 0 ? 'translate-x-6' : 'translate-x-1'
                                                        }`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </CursorCard>

                                {/* Security Settings */}
                                <CursorCard
                                    borderColor={isDark ? '#262626' : '#e5e5e5'}
                                    className={`rounded-2xl border p-6 shadow-md ${isDark ? 'bg-black border-violet-500/20' : 'bg-white border-violet-300'
                                        }`}
                                >
                                    <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'
                                        }`}>
                                        <Shield className="w-5 h-5 text-blue-400" />
                                        Security
                                    </h3>
                                    <div className="space-y-3">
                                        <GlowingButton
                                            glowColor="#10b981"
                                            className="w-full"
                                            onClick={() => setShowPasswordModal(true)}
                                        >
                                            Change Password
                                        </GlowingButton>
                                        <GlowingButton
                                            glowColor="#a855f7"
                                            className="w-full"
                                            onClick={() => setShow2FAModal(true)}
                                        >
                                            Two-Factor Authentication
                                        </GlowingButton>
                                        <GlowingButton
                                            glowColor="#f43f5e"
                                            className="w-full"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                                                    toast.error('Account deletion initiated. Please check your email.', { position: "top-right" });
                                                }
                                            }}
                                        >
                                            Delete Account
                                        </GlowingButton>
                                    </div>
                                </CursorCard>
                            </CursorCardsContainer>
                        </motion.div>
                    )}

                    {activeTab === 'subscription' && (
                        <motion.div
                            key="subscription"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6"
                        >
                            <div>
                                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                    Choose Your Plan
                                </h2>
                                <div className="flex gap-6 flex-wrap">
                                    <FlippingCard
                                        width={350}
                                        frontContent={
                                            <div className="flex h-full flex-col p-6">
                                                <div className="flex-1">
                                                    <Crown className="w-12 h-12 text-violet-400 mb-4" />
                                                    <h3 className="text-2xl font-bold text-white mb-2">Free Plan</h3>
                                                    <p className="text-neutral-400 text-sm mb-4">Perfect for getting started</p>
                                                    <div className="text-4xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-6">
                                                        ₹0<span className="text-lg text-neutral-400">/forever</span>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {['5 competitions/month', 'Basic profile', 'Community support'].map((feature, i) => (
                                                            <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                                                                <CheckCircle className="w-4 h-4 text-violet-400" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                        backContent={
                                            <div className="flex h-full flex-col items-center justify-center p-6">
                                                <p className="text-neutral-300 text-center text-sm mb-6">
                                                    Start your journey with our free plan. Access basic features and join the community.
                                                </p>
                                                <button className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-violet-700 hover:to-blue-700">
                                                    Select Free Plan
                                                </button>
                                            </div>
                                        }
                                    />

                                    <FlippingCard
                                        width={350}
                                        frontContent={
                                            <div className="flex h-full flex-col p-6">
                                                <div className="flex-1">
                                                    <Star className="w-12 h-12 text-yellow-400 mb-4" />
                                                    <h3 className="text-2xl font-bold text-white mb-2">Premium Plan</h3>
                                                    <p className="text-neutral-400 text-sm mb-4">Unlock all features</p>
                                                    <div className="text-4xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-6">
                                                        ₹2,999<span className="text-lg text-neutral-400">/6 months</span>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {['Unlimited access', 'Priority visibility', '24/7 support', 'Advanced analytics'].map((feature, i) => (
                                                            <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                                                                <CheckCircle className="w-4 h-4 text-yellow-400" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                        backContent={
                                            <div className="flex h-full flex-col items-center justify-center p-6">
                                                <p className="text-neutral-300 text-center text-sm mb-6">
                                                    Get premium access with unlimited competitions, priority support, and advanced features.
                                                </p>
                                                <button className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:from-yellow-700 hover:to-orange-700">
                                                    Upgrade to Premium
                                                </button>
                                            </div>
                                        }
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Save Button - Green */}
                {isEditing && (
                    <div className="mt-8">
                        <SwipeButton
                            text="Swipe to Save Changes"
                            onSwipeComplete={handleSave}
                            color="#10b981"
                        />
                    </div>
                )}

                {/* Password Change Modal */}
                <AnimatePresence>
                    {showPasswordModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            onClick={() => setShowPasswordModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`max-w-md w-full rounded-2xl p-6 ${isDark ? 'bg-neutral-900 border border-violet-500/30' : 'bg-white border border-violet-300'
                                    } shadow-2xl`}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className={`text-2xl font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                        Change Password
                                    </h3>
                                    <button
                                        onClick={() => setShowPasswordModal(false)}
                                        className={`p-2 rounded-lg ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            className={`w-full mt-2 px-4 py-3 rounded-lg border ${isDark
                                                ? 'bg-neutral-800 border-violet-500/30 text-neutral-100'
                                                : 'bg-neutral-50 border-violet-300 text-neutral-900'
                                                }`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            className={`w-full mt-2 px-4 py-3 rounded-lg border ${isDark
                                                ? 'bg-neutral-800 border-violet-500/30 text-neutral-100'
                                                : 'bg-neutral-50 border-violet-300 text-neutral-900'
                                                }`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            className={`w-full mt-2 px-4 py-3 rounded-lg border ${isDark
                                                ? 'bg-neutral-800 border-violet-500/30 text-neutral-100'
                                                : 'bg-neutral-50 border-violet-300 text-neutral-900'
                                                }`}
                                        />
                                    </div>
                                    <GlowingButton
                                        glowColor="#10b981"
                                        className="w-full mt-6"
                                        onClick={handlePasswordChange}
                                    >
                                        Update Password
                                    </GlowingButton>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 2FA Modal */}
                <AnimatePresence>
                    {show2FAModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            onClick={() => setShow2FAModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`max-w-md w-full rounded-2xl p-6 ${isDark ? 'bg-neutral-900 border border-violet-500/30' : 'bg-white border border-violet-300'
                                    } shadow-2xl`}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className={`text-2xl font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                                        Enable 2FA
                                    </h3>
                                    <button
                                        onClick={() => setShow2FAModal(false)}
                                        className={`p-2 rounded-lg ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                        Scan the QR code with your authenticator app and enter the 6-digit code below.
                                    </p>
                                    <div className={`w-48 h-48 mx-auto rounded-lg ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'} flex items-center justify-center`}>
                                        <span className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>QR Code Here</span>
                                    </div>
                                    <div>
                                        <label className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                            6-Digit Code
                                        </label>
                                        <input
                                            type="text"
                                            maxLength={6}
                                            value={twoFactorCode}
                                            onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                                            placeholder="000000"
                                            className={`w-full mt-2 px-4 py-3 rounded-lg border text-center text-2xl tracking-widest ${isDark
                                                ? 'bg-neutral-800 border-violet-500/30 text-neutral-100'
                                                : 'bg-neutral-50 border-violet-300 text-neutral-900'
                                                }`}
                                        />
                                    </div>
                                    <GlowingButton
                                        glowColor="#a855f7"
                                        className="w-full mt-6"
                                        onClick={handleEnable2FA}
                                    >
                                        Enable 2FA
                                    </GlowingButton>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toast Container */}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={isDark ? "dark" : "light"}
                />
            </div>
        </div>
    );
};

export default EmployeeProfile;
