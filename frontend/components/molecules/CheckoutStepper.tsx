import React from "react";
import { Check } from "lucide-react";

interface CheckoutStepperProps {
  currentStep: 1 | 2 | 3;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const steps = [
    { num: 1, label: "Shipping" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Summary" },
  ];

  return (
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-10">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.num;
        const isActive = currentStep === step.num;

        return (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-gradient-primary text-white"
                    : isActive
                    ? "bg-gradient-primary text-white ring-4 ring-[#004A8F]/20"
                    : "bg-white border-2 border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.num}
              </div>
              <span
                className={`absolute top-12 whitespace-nowrap text-xs font-semibold ${
                  isActive || isCompleted ? "text-[#171512]" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-4 transition-colors duration-300 ${
                  isCompleted ? "bg-gradient-primary" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
