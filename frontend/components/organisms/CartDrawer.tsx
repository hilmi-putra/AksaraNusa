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
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="mb-4">Keranjang Anda kosong</p>
              <button 
                onClick={closeCart}
                className="text-[#DB8B00] font-bold underline hover:text-[#b06f00]"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <div className="w-20 h-28 relative flex-shrink-0 bg-gray-100">
                  <Image 
                    src={item.book.coverUrl} 
                    alt={item.book.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[#171512] text-sm">{item.book.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.book.author} &bull; {item.book.category}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-[#6E0000] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="mt-2">
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-sm tracking-wider uppercase">
                      In Stock
                    </span>
                  </div>

                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex items-center border border-gray-300 rounded-sm">
                      <button 
                        className="px-2 py-1 text-gray-500 hover:text-black transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        className="px-2 py-1 text-gray-500 hover:text-black transition-colors"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="font-bold text-[#171512]">
                      {formatRupiah(item.book.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sticky Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-200">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-[#171512]">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Estimasi Ongkir</span>
                <span className="font-semibold text-[#171512]">Dihitung saat checkout</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#171512] pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#DB8B00] hover:bg-[#b06f00] text-white h-12 text-sm font-bold tracking-widest uppercase rounded-sm transition-colors mb-3 flex items-center justify-center"
            >
              Lanjut ke Checkout
            </button>
            <button 
              onClick={closeCart}
              className="w-full bg-transparent text-gray-500 hover:text-[#171512] h-10 text-xs font-bold tracking-widest uppercase transition-colors"
            >
              Lanjut Belanja
            </button>
          </div>
        )}
      </div>
    </>
  );
}
