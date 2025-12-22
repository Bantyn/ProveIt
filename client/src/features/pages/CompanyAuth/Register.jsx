"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  AlertTriangle,
  ArrowUpRight,
  X,
} from "lucide-react";

/* ======================================================
   Utility
====================================================== */
const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ======================================================
   Reusable UI Components (Dark + Light)
====================================================== */

// ---------- Button ----------
const Button = ({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}) => {
  const variants = {
    default:
      "bg-primary text-primary-foreground hover:opacity-90",
    outline:
      "border border-border bg-background hover:bg-accent",
    ghost:
      "hover:bg-accent",
  };

  const sizes = {
    default: "h-10 px-4",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        "rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-ring",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// ---------- Input ----------
const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring",
      className
    )}
    {...props}
  />
);

// ---------- Label ----------
const Label = ({ children }) => (
  <label className="text-sm font-medium text-foreground">
    {children}
  </label>
);

// ---------- Alert ----------
const Alert = ({ children }) => (
  <div className="flex gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
    {children}
  </div>
);

// ---------- Progress ----------
const Progress = ({ value }) => (
  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
    <div
      className="h-full bg-primary transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
);

// ---------- Tooltip ----------
const TooltipIcon = ({ text }) => (
  <div className="group relative">
    <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
    <div className="absolute left-6 top-0 z-10 hidden w-52 rounded-md bg-popover p-2 text-xs text-popover-foreground shadow group-hover:block">
      {text}
    </div>
  </div>
);

// ---------- Select ----------
const Select = ({ children }) => (
  <select className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground">
    {children}
  </select>
);

/* ======================================================
   Reusable MultiStepForm
====================================================== */
const MultiStepForm = ({
  title,
  description,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onClose,
  footerContent,
  children,
}) => {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-2xl rounded-xl border border-border bg-card text-card-foreground shadow-sm">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X />
            </Button>
          )}
        </div>

        <div className="mt-4 flex items-center gap-4">
          <Progress value={progress} />
          <span className="text-sm text-muted-foreground">
            {currentStep}/{totalSteps}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[300px] p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border p-6">
        <div>{footerContent}</div>
        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button onClick={onNext}>Next Step</Button>
        </div>
      </div>
    </div>
  );
};

/* ======================================================
   Smart Vignette Purchase Page
====================================================== */
const SmartVignettePurchase = () => {
  const [step, setStep] = useState(2);
  const totalSteps = 3;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">

      

      <MultiStepForm
        title="Smart Vignette Purchase"
        description="Securely purchase your vehicle vignette in a few simple steps."
        currentStep={step}
        totalSteps={totalSteps}
        onBack={() => setStep(step - 1)}
        onNext={() => setStep(step + 1)}
        onClose={() => alert("Form closed")}
        footerContent={
          <a className="flex items-center gap-1 text-sm text-primary hover:underline">
            Need Help? <ArrowUpRight className="h-4 w-4" />
          </a>
        }
      >
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Vehicle Registered Country</Label>
                  <TooltipIcon text="Select the country where your vehicle is registered." />
                </div>
                <Select>
                  <option>Select country...</option>
                  <option>United States</option>
                  <option>Germany</option>
                  <option>France</option>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Start Date</Label>
                  <TooltipIcon text="Vignette validity start date." />
                </div>
                <Input placeholder="DD / MM / YYYY" />
              </div>

              <div className="space-y-2">
                <Label>Registration Number</Label>
                <Input placeholder="Enter registration number" />
              </div>

              <div className="space-y-2">
                <Label>Confirm Registration Number</Label>
                <Input placeholder="Confirm registration number" />
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              Please select a valid start date before proceeding.
            </Alert>
          </div>
        )}
      </MultiStepForm>
    </div>
  );
};

export default SmartVignettePurchase;
