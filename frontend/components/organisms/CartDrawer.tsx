"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { formatRupiah } from "@/lib/utils";
import { X, Trash2, Minus, Plus } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ComingSoonVinyl } from "@/components/ui/ComingSoonVinyl";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal } = useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(drawerRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
    }
  }, [isOpen]);

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm invisible opacity-0"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 z-[70] h-full w-full sm:w-[450px] bg-[#FAF8F4] shadow-2xl translate-x-full flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-[#171512] uppercase tracking-wider">Keranjang Belanja</h2>
            <p className="text-sm text-gray-500 mt-1">{items.length} Produk</p>
          </div>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#171512]" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center h-full">
            <ComingSoonVinyl title="CART" subtitle="Fitur keranjang belanja akan segera hadir untuk Anda." variant="compact" />
            <button 
              onClick={closeCart}
              className="mt-6 text-gradient-primary font-bold underline hover:text-[#b06f00] text-xs uppercase tracking-widest"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
