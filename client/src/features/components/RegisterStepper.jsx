import Stepper, { Step } from "./Stepper";

export default function RegisterStepper({ children, onComplete }) {
  return (
    <Stepper
      initialStep={1}
      onFinalStepCompleted={onComplete}
      backButtonText="Back"
      nextButtonText="Next"
      className="w-full"
    >
      {children}
    </Stepper>
  );
}
