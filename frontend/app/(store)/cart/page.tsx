"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/atoms/Container";
import { useCartStore } from "@/stores/cartStore";
import { formatRupiah } from "@/lib/utils";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { USER_COOKIE } from "@/lib/api";

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity, fetchCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get(USER_COOKIE);
    if (!userCookie) {
      router.push("/login?redirect=/cart");
    } else {
      fetchCart();
    }
  }, [router, fetchCart]);

  return (
    <div className="flex flex-col bg-[#F9F9F9] min-h-screen pb-20 pt-28 md:pt-32 font-sans text-[#171512]">
      <Container>
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-12 mt-6 font-sans font-black text-4xl lg:text-5xl uppercase tracking-tighter text-[#171512] flex items-center gap-4">
            <ShoppingBag className="w-10 h-10" />
            Keranjang Belanja
          </h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white border border-gray-200 rounded-lg">
              <p className="mb-4 text-xl">Keranjang Anda kosong</p>
              <Link href="/bookstore" className="text-gradient-primary font-bold underline hover:text-[#b06f00]">
                Mulai Belanja
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
              {/* Items List */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                    <Link href={`/bookstore/buku/${item.book.id}`} className="w-24 sm:w-32 h-36 sm:h-48 relative flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <Image 
                        src={item.book.coverUrl} 
                        alt={item.book.title} 
                        fill 
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <Link href={`/bookstore/buku/${item.book.id}`}>
                            <h3 className="font-bold text-[#171512] text-lg sm:text-xl line-clamp-2 hover:underline">{item.book.title}</h3>
                          </Link>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-gradient-secondary transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.book.author}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 gap-4">
                        <div className="flex items-center border border-gray-300 rounded-md p-1 bg-[#F9F9F9]">
                          <button 
                            className="p-2 text-gray-500 hover:text-black transition-colors rounded-sm hover:bg-gray-200"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            className="p-2 text-gray-500 hover:text-black transition-colors rounded-sm hover:bg-gray-200"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.book.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">{formatRupiah(item.book.price)} / item</p>
                          <div className="font-bold text-xl text-[#171512]">
                            {formatRupiah(item.book.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-4 sticky top-32">
                <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200">Ringkasan Belanja</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-gray-600">
                      <span>Total Harga ({items.reduce((a, b) => a + b.quantity, 0)} Barang)</span>
                      <span>{formatRupiah(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Estimasi Ongkir</span>
                      <span className="text-xs self-center">Dihitung saat checkout</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xl font-black text-[#171512] pt-6 border-t border-gray-200 mb-8">
                    <span>Total tagihan</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>

                  <Link href="/checkout" className="w-full flex">
                    <button className="w-full bg-gradient-primary hover:bg-[#b06f00] text-white py-4 font-bold tracking-widest uppercase rounded-sm transition-colors text-sm">
                      Beli Sekarang
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
