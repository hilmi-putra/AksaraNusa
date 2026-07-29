"use client";

import React from "react";
import { Container } from "@/components/atoms/Container";
import { CheckoutForm } from "@/features/store/checkout/CheckoutForm";
import { PaymentStep } from "@/features/store/checkout/PaymentStep";
import { OrderConfirmation } from "@/features/store/checkout/OrderConfirmation";
import { CheckoutSummary } from "@/features/store/checkout/CheckoutSummary";
import { CheckoutStepper } from "@/components/molecules/CheckoutStepper";
import { useCheckoutStore } from "@/stores/checkoutStore";

export default function CheckoutPage() {
  const { currentStep } = useCheckoutStore();

  return (
    <div className="flex flex-col bg-[#F9F9F9] min-h-screen pb-20 pt-28 md:pt-32 font-sans text-[#171512]">
      
      <Container>
        <div className="max-w-7xl mx-auto">
          
          <CheckoutStepper currentStep={currentStep} />

          <h1 className="mb-12 mt-6 font-sans font-black text-5xl lg:text-7xl uppercase tracking-tighter text-[#171512]">
            {currentStep === 1 ? "Checkout" : currentStep === 2 ? "Payment" : "Summary"}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Form / Payment / Success */}
            <div className="lg:col-span-7">
              {currentStep === 1 && <CheckoutForm />}
              {currentStep === 2 && <PaymentStep />}
              {currentStep === 3 && <OrderConfirmation />}
            </div>

            {/* Right Column: Summary (Hidden on step 3) */}
            {currentStep < 3 && (
              <div className="lg:col-span-5 relative">
                <CheckoutSummary />
              </div>
            )}
            
          </div>
        </div>
      </Container>
    </div>
  );
}
