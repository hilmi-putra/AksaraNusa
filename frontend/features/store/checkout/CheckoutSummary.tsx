"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { Check, ShieldCheck } from "lucide-react";
import { storeMockData } from "@/lib/mock/store.mock";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { useCartStore } from "@/stores/cartStore";

export function CheckoutSummary() {
  const { shippingMethod, selectedCourier, isInsuranceSelected, insuranceCost } = useCheckoutStore();
  const { items: cartItems, subtotal } = useCartStore();
  
  let shipping = 0;
  if (shippingMethod === 'delivery') {
    shipping = selectedCourier ? selectedCourier.cost : 0; 
  }
  
  const discount = 0;
  
  // Calculate dynamic insurance: 0.2% of subtotal, minimum Rp 1.000
  const calculatedInsurance = Math.max(Math.ceil(subtotal * 0.002), 1000);
  
  // Update store (avoid infinite loop, maybe only use local for now, but store is needed for step 2)
  // We'll dispatch it to store in useEffect
  React.useEffect(() => {
    useCheckoutStore.getState().setInsuranceCost(calculatedInsurance);
  }, [calculatedInsurance]);

  const activeInsuranceCost = isInsuranceSelected ? calculatedInsurance : 0;
  const total = subtotal + shipping + activeInsuranceCost - discount;

  return (
    <div className="w-full pl-0 lg:pl-10 pb-20">
      <h2 className="text-xl lg:text-2xl font-light text-[#171512] mb-8">
        Shopping Bag ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
      </h2>

      {/* Items Preview */}
      <div className="flex flex-col gap-6 mb-8">
        {cartItems.map(item => (
          <div key={item.id} className="flex gap-4">
             <div className="shrink-0 w-16 h-24 bg-[#EBEBEB] flex items-center justify-center p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={item.book.coverUrl || "https://placehold.co/60x90"} alt={item.book.title} className="w-full h-full object-contain" />
             </div>
             <div className="flex flex-col flex-1 text-sm text-[#171512]">
               <div className="flex justify-between items-start gap-4">
                 <span className="font-medium">{item.book.title}</span>
                 <span className="font-semibold whitespace-nowrap">{formatRupiah(item.book.price * item.quantity)}</span>
               </div>
               <div className="text-gray-500 mt-2 space-y-1">
                 <div className="flex gap-2">
                   <span className="w-16">Author:</span>
                   <span>{item.book.author}</span>
                 </div>
                 <div className="flex gap-2">
                   <span className="w-16">Qty:</span>
                   <span>{item.quantity}</span>
                 </div>
               </div>
             </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-300 pt-8 mb-8">
        <div className="flex gap-4 items-center">
          <input 
            type="text"
            placeholder="Promocode" 
            className="bg-transparent border-b border-gray-300 pb-2 flex-1 focus:outline-none focus:border-black transition-colors text-sm"
          />
          <button className="px-8 py-2 bg-[#EBEBEB] text-[#171512] text-xs font-bold tracking-wider hover:bg-black hover:text-white transition-colors uppercase">
            Apply
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6 text-sm text-[#171512]">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium">{shipping === 0 ? "Free" : formatRupiah(shipping)}</span>
        </div>
        
        {isInsuranceSelected && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Shipping Insurance</span>
            <span className="font-medium text-gradient-primary">{formatRupiah(activeInsuranceCost)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Discount</span>
            <span className="font-medium">-{formatRupiah(discount)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-end pt-6 border-t border-gray-300 mb-8">
        <span className="text-lg text-[#171512]">Total:</span>
        <span className="font-bold text-xl text-[#171512]">{formatRupiah(total)}</span>
      </div>

    </div>
  );
}
