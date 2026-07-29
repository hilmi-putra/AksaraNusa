"use client";

import React from "react";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export function OrderSummary() {
  const subtotal = 100000; 
  const total = subtotal;

  return (
    <div className="w-full pl-0 lg:pl-10">
      <h2 className="text-2xl font-light uppercase tracking-wider text-[#171512] mb-8 pb-4 border-b border-gray-300">
        Cart Totals
      </h2>

      <div className="flex flex-col gap-4 mb-6 text-sm">
        <div className="flex justify-between items-center text-gray-500">
          <span>Shipping (3-5 Business Days)</span>
          <span className="font-semibold text-black">Free</span>
        </div>
        <div className="flex justify-between items-center text-gray-500">
          <span>TAX (estimated for the United States (US))</span>
          <span className="font-semibold text-black">Rp 0</span>
        </div>
        <div className="flex justify-between items-center text-gray-500">
          <span>Subtotal</span>
          <span className="font-semibold text-black">{formatRupiah(subtotal)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center py-4 border-t border-black mb-8">
        <span className="text-base text-[#171512]">Total</span>
        <span className="font-bold text-lg text-[#171512]">{formatRupiah(total)}</span>
      </div>

      <Link href="/checkout" className="block w-full">
        {/* ORANGE button as requested by user */}
        <button className="w-full bg-[#DB8B00] hover:bg-[#b06f00] text-white h-14 text-xs font-bold tracking-widest uppercase rounded-none transition-colors mb-6">
          Proceed to Checkout
        </button>
      </Link>

      <div className="text-center">
        <Link href="/bookstore" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-black transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
