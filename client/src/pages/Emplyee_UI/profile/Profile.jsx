"use client";

import { useState } from "react";
import clsx from "clsx";
import ProfileHero from "./ProfileHero";
import ProfileSmoothTabs from "./ProfileSmoothTabs";
import LightRays from "./LightRays";
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
  const [resume, setResume] = useState(null);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <main className="min-h-screen w-full bg-background">

      {/* LightRays Effect */}
            {/* <div className="absolute inset-0 pointer-events-none z-[1] md:inline hidden">
                <LightRays
                    raysOrigin="top-center"
                    raysColor=""
                    raysSpeed={0.2}
                    lightSpread={1.1}
                    rayLength={1.5}
                    followMouse={true}
                    mouseInfluence={0.15}
                    noiseAmount={0.1}
                    distortion={0.03}
                    fadeDistance={0.1}
                    saturation={0.1}
                />
            </div> */}
      <div className=" mx-auto space-y-10">
        {/* ================= HERO ================= */}
        <ProfileHero isVerified={user.isVerified} />
        
        {/* ================= EDITABLE DETAILS ================= */}
        {viewerRole === "employee" && (
          <section className="space-y-12 flex flex-col bg-violet-100 dark:bg-neutral-900 rounded-4xl -mt-50 pb-10 pt-60 mx-auto w-[95%]">
            <SectionTitle title="Profile Details" />

            {/* Grid Inputs */}
            <form
              handleChange={handleChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-20 px-7"
            >
              {/* Basic Info */}
              <Input
                label="Full Name"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <Input
                label="Phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
              <Input
                label="Role"
                name="role"
                value={user.role}
                onChange={handleChange}
              />

              {/* Education */}
              <Input
                label="College"
                name="education.college"
                value={user.education?.college || ""}
                onChange={handleChange}
              />
              <Input
                label="Degree"
                name="education.degree"
                value={user.education?.degree || ""}
                onChange={handleChange}
              />
              <Input
                label="Graduation Year"
                name="education.graduationYear"
                type="number"
                value={user.education?.graduationYear || ""}
                onChange={handleChange}
              />

              {/* Skills */}
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
              />

              {/* Resume Upload */}
              <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                <div className="flex md:flex-row flex-col items-center gap-2">
                  <Input
                    label="Resume"
                    type="file"
                    accept=".pdf,.doc,.docx,.png"
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "resumeFile",
                          value: e.target.files[0],
                        },
                      })
                    }
                    className="rounded-lg border border-neutral-300 dark:border-white/20 px-3 py-2 flex-1"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      if (!user.resumeFile)
                        return alert("Select a file first!");
                      // Demo API upload simulation
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
                    className="px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 font-semibold text-white rounded-lg hover:scale-105 transition"
                  >
                    Upload
                  </button>
                </div>
                {user.resumeUrl && (
                  <a
                    href={user.resumeUrl}
                    target="_blank"
                    className="text-blue-500 underline mt-1 block text-sm"
                  >
                    View Current Resume
                  </a>
                )}
              </div>

              {/* Subscription */}
              <Input
                label="Subscription Plan"
                name="subscriptionPlan"
                value={user.subscriptionPlan}
                onChange={handleChange}
              />

              {/* Save Button */}
              <button
                type="submit"
                className="text-sm w-50 mx-auto font-semibold text-white px-6 py-2
            bg-gradient-to-r from-violet-500 to-blue-500
            rounded-xl hover:opacity-90 transition col-span-1 md:col-span-2"
              >
                Save Changes
              </button>
            </form>
          </section>
        )}



        {/* ================= tabs ================= */}
        <section className="mx-auto">
          <ProfileSmoothTabs user={currentUser} />
        </section>



      </div>
    </main>
  );
}





/* ================= REUSABLE ================= */

function SectionTitle({ title }) {
  return (
    <div className="flex items-center gap-4  w-full ">
      <h2 className="font-bold w-full text-center  text-4xl bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
  );
}

export function Input({
  label,
  icon: Icon,
  error,
  value,
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
            "absolute left-4 top-4 transition-colors duration-300",
            error
              ? "text-red-400"
              : "text-zinc-400 group-focus-within:text-violet-500"
          )}
        />
      )}

      {/* Input */}
      <input
        {...props}
        value={value}
        placeholder={label}
        className={clsx(
          `
          peer w-full
          ${Icon ? "pl-12" : "pl-4"} pr-4 py-4
          rounded-xl
          bg-zinc-50 dark:bg-zinc-900/50
          backdrop-blur-md
          border-2
          text-sm font-medium
          text-zinc-900 dark:text-white
          placeholder-transparent
          transition-all duration-300
          focus:outline-none focus:bg-white dark:focus:bg-violet-900/10 hover:bg-violet-500/10 shadow-md hover:shadow-violet-700/50
          `,
          error
            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            : "border-zinc-200 dark:border-white/5 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10",
          className
        )}
      />

      {/* Floating Label */}
      <label
        className={clsx(
          `
          absolute
          ${Icon ? "left-12" : "left-4"}
          px-1 text-[11px] font-semibold uppercase tracking-wider
          transition-all duration-300 pointer-events-none rounded
          `,
          hasValue
            ? "-top-1.5 bg-white dark:bg-neutral-900 px-2 text-violet-600 dark:text-violet-400"
            : `
              top-4 bg-transparent
              text-zinc-500 dark:text-zinc-500
              peer-focus:-top-2.5
              peer-focus:bg-white dark:peer-focus:bg-black
              peer-focus:text-violet-600 dark:peer-focus:text-violet-400/10
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
