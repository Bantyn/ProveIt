"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import ProfileHero from "./ProfileHero";
import ProfileSmoothTabs from "./ProfileSmoothTabs";
import LightRays from "./LightRays";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Upload,
  Save,
  Edit3,
  CheckCircle2,
  Sparkles,
  Target,
  Code2,
} from "lucide-react";
/* -------------------------------------------
   User Data
------------------------------------------- */
const currentUser = {
  fullName: "Banty Patel",
  email: "banty123@gmail.com",
  phone: "1234567890",
  bio: "Frontend Developer passionate about building interactive web apps.",
  description:
    "I specialize in React, Tailwind CSS, and full-stack development. I love crafting responsive, modern, and user-friendly web applications while continuously learning new technologies to improve my skills.",
  role: "user",
  isVerified: true,
  isBlocked: false,
  education: {
    college: "XYZ University",
    degree: "BCA",
    graduationYear: 2023,
  },
  skills: ["React", "Tailwind", "MERN"],
  resumeUrl: "",
  subscriptionPlan: "premium",
  hasPriorityAccess: true,
};
const viewerRole = "employee"; // <-- change to "user" to allow form editing





export default function Profile() {
  const [user, setUser] = useState(currentUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add save logic here
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-neutral-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ================= HERO SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProfileHero isVerified={user.isVerified} />
        </motion.div>

        {/* ================= MAIN CONTENT GRID ================= */}
        {viewerRole === "employee" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SIDEBAR - Quick Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Quick Stats Card */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-white/10 shadow-lg">
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <StatItem
                    icon={<CheckCircle2 className="w-5 h-5" />}
                    label="Verified"
                    value={user.isVerified ? "Yes" : "No"}
                    color="text-emerald-500"
                  />
                  <StatItem
                    icon={<Award className="w-5 h-5" />}
                    label="Plan"
                    value={user.subscriptionPlan}
                    color="text-violet-500"
                  />
                  <StatItem
                    icon={<Target className="w-5 h-5" />}
                    label="Skills"
                    value={user.skills?.length || 0}
                    color="text-blue-500"
                  />
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-white/10 shadow-lg">
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-400/10 via-pink-400/10 to-blue-400/10 border border-violet-400/20 text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CENTER - Main Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-200/50 dark:border-white/10 shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      Profile Details
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Manage your personal information
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    {isEditing ? "Cancel" : "Edit"}
                  </motion.button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      icon={User}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      icon={Mail}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      icon={Phone}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Role"
                      name="role"
                      value={user.role}
                      onChange={handleChange}
                      icon={Briefcase}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Education Section */}
                  <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-violet-500" />
                      Education
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="College"
                        name="education.college"
                        value={user.education?.college || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                      <Input
                        label="Degree"
                        name="education.degree"
                        value={user.education?.degree || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                      <Input
                        label="Graduation Year"
                        name="education.graduationYear"
                        type="number"
                        value={user.education?.graduationYear || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-pink-500" />
                      Skills
                    </h3>
                    <Input
                      label="Skills (comma separated)"
                      name="skills"
                      value={user.skills?.join(", ") || ""}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: "skills",
                            value: e.target.value.split(",").map((s) => s.trim()),
                          },
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-500" />
                      Resume
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Input
                          label="Upload Resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) =>
                            handleChange({
                              target: {
                                name: "resumeFile",
                                value: e.target.files[0],
                              },
                            })
                          }
                          disabled={!isEditing}
                          className="flex-1"
                        />
                        {isEditing && (
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={async () => {
                              if (!user.resumeFile)
                                return alert("Select a file first!");
                              const formData = new FormData();
                              formData.append("resume", user.resumeFile);
                              await new Promise((res) => setTimeout(res, 1000));
                              alert(`Resume uploaded: ${user.resumeFile.name}`);
                              handleChange({
                                target: {
                                  name: "resumeUrl",
                                  value: URL.createObjectURL(user.resumeFile),
                                },
                              });
                            }}
                            className="px-6 py-4 rounded-xl bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 font-semibold text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                          >
                            <Upload className="w-5 h-5" />
                            Upload
                          </motion.button>
                        )}
                      </div>
                      {user.resumeUrl && (
                        <a
                          href={user.resumeUrl}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 hover:underline"
                        >
                          <FileText className="w-4 h-4" />
                          View Current Resume
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 font-semibold text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </motion.button>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* ================= TABS SECTION ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto"
        >
          <ProfileSmoothTabs user={currentUser} />
        </motion.section>
      </div>
    </main>
  );
}





/* ================= REUSABLE COMPONENTS ================= */

function StatItem({ icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
      <div className="flex items-center gap-3">
        <div className={clsx("p-2 rounded-lg bg-slate-100 dark:bg-slate-600", color)}>
          {icon}
        </div>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {label}
        </span>
      </div>
      <span className="text-sm font-bold text-neutral-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}

export function Input({
  label,
  icon: Icon,
  error,
  value,
  disabled,
  className,
  ...props
}) {
  const hasValue = Boolean(value && value.length > 0);

  return (
    <div className="relative group w-full">
      {/* Icon */}
      {Icon && (
        <Icon
          size={18}
          className={clsx(
            "absolute left-4 top-4 z-10 transition-colors duration-300",
            error
              ? "text-red-400"
              : disabled
              ? "text-slate-400 dark:text-slate-500"
              : "text-slate-400 group-focus-within:text-violet-500"
          )}
        />
      )}

      {/* Input */}
      <input
        {...props}
        value={value}
        placeholder={label}
        disabled={disabled}
        className={clsx(
          `
          peer w-full
          ${Icon ? "pl-12" : "pl-4"} pr-4 py-4
          rounded-xl
          bg-slate-50 dark:bg-slate-700/50
          backdrop-blur-sm
          border-2
          text-sm font-medium
          text-neutral-900 dark:text-white
          placeholder-transparent
          transition-all duration-300
          `,
          disabled
            ? "cursor-not-allowed opacity-60 border-slate-200 dark:border-slate-600"
            : `
              focus:outline-none 
              focus:bg-white dark:focus:bg-slate-700 
              hover:bg-slate-100 dark:hover:bg-slate-700 
              shadow-sm hover:shadow-md
            `,
          error
            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            : "border-slate-200 dark:border-white/10 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10",
          className
        )}
      />

      {/* Floating Label */}
      <label
        className={clsx(
          `
          absolute
          ${Icon ? "left-12" : "left-4"}
          px-1 text-xs font-semibold uppercase tracking-wider
          transition-all duration-300 pointer-events-none rounded
          `,
          hasValue || disabled
            ? "-top-2.5 bg-white dark:bg-slate-800 px-2 text-violet-600 dark:text-violet-400"
            : `
              top-4 bg-transparent
              text-slate-500 dark:text-slate-400
              peer-focus:-top-2.5
              peer-focus:bg-white dark:peer-focus:bg-slate-800
              peer-focus:text-violet-600 dark:peer-focus:text-violet-400
            `
        )}
      >
        {label}
      </label>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-1 mt-1.5 ml-1 animate-fadeIn">
          <span className="w-1 h-1 rounded-full bg-red-500" />
          <p className="text-[11px] text-red-500 font-semibold tracking-wide">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
