# 3-Step Registration Implementation Guide

## What Was Created

I've created `ClientSignupSteps.jsx` which contains:
1. **Step2Fields** - Component for professional details (college, degree, skills, resume)
2. **Step3PlanSelection** - Component for plan selection with beautiful cards

## What You Need to Do

### In your `ClientSignup.jsx` file:

1. **Import the new components** at the top:
```javascript
import { Step2Fields, Step3PlanSelection } from './ClientSignupSteps';
```

2. **Add state for selected plan** (already added):
```javascript
const [selectedPlan, setSelectedPlan] = useState("free");
```

3. **Replace the existing form section** with conditional rendering based on `currentStep`:

```javascript
{/* Step 2: Professional Details */}
{currentStep === 2 && (
  <>
    <Step2Fields 
      formik={formik}
      focusedField={focusedField}
      setFocusedField={setFocusedField}
      isDark={isDark}
      GlassInputWrapper={GlassInputWrapper}
    />
    
    {/* Navigation Buttons */}
    <div className="flex gap-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={handlePrevStep}
        className={`flex-1 rounded-xl py-4 font-semibold tracking-wide transition-all ${isDark
          ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 border border-purple-700/30"
          : "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={handleNextStep}
        className={`flex-1 rounded-xl py-4 font-semibold tracking-wide text-white transition-all ${isDark
          ? "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/20"
          : "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          Continue to Plans
          <ArrowRight className="w-5 h-5" />
        </span>
      </motion.button>
    </div>
  </>
)}

{/* Step 3: Plan Selection */}
{currentStep === 3 && (
  <>
    <Step3PlanSelection 
      selectedPlan={selectedPlan}
      setSelectedPlan={setSelectedPlan}
      isDark={isDark}
    />
    
    {/* Navigation Buttons */}
    <div className="flex gap-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={handlePrevStep}
        className={`flex-1 rounded-xl py-4 font-semibold tracking-wide transition-all ${isDark
          ? "bg-purple-900/20 text-purple-400 hover:bg-purple-900/30 border border-purple-700/30"
          : "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={handleSubmit}
        disabled={formik.isSubmitting}
        className={`flex-1 rounded-xl py-4 font-semibold tracking-wide text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark
          ? "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/20"
          : "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          {formik.isSubmitting ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <CheckCircle className="w-5 h-5" />
            </>
          )}
        </span>
      </motion.button>
    </div>
  </>
)}
```

4. **Add missing import** at the top:
```javascript
import { ArrowLeft } from "lucide-react";
```

5. **Update the formik onSubmit** to use selectedPlan:
```javascript
subscriptionPlan: selectedPlan,
hasPriorityAccess: selectedPlan !== "free",
```

## Features Implemented

✅ Step 1: Basic Information (Name, Email, Phone, Password)
✅ Step 2: Professional Details (College, Degree, Year, Skills, Resume)
✅ Step 3: Plan Selection (Free, Pro, Enterprise)
✅ Step indicator with progress
✅ Beautiful plan cards matching your black/purple theme
✅ Smooth animations between steps
✅ Form validation for each step
✅ Back/Next navigation

## Theme Consistency

All components follow your minimalistic black and purple theme:
- Black background in dark mode
- White background in light mode
- Purple accents throughout
- Clean borders and shadows
- No excessive animations
