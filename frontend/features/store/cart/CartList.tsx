"use client";

import React, { useState } from "react";
import { CartItem } from "@/components/organisms/CartItem";
import { storeMockData } from "@/lib/mock/store.mock";
import { RefreshCw } from "lucide-react";

export function CartList() {
  // Mock cart items based on the books we have
  const [items, setItems] = useState([
    {
      id: "cart-1",
      book: storeMockData.books[0],
      quantity: 1,
    },
    {
      id: "cart-2",
      book: storeMockData.books[1],
      quantity: 1,
    },
  ]);

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        {/* Removed headers, directly showing items with bottom borders */}
        <div className="flex flex-col">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={(id, qty) => handleUpdateQuantity(item.id, qty)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Coupon & Update Actions */}
      <div className="mt-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <label htmlFor="coupon" className="text-sm text-gray-500">
            Have a coupon? Enter your code.
          </label>
          <div className="flex gap-4 items-center">
            <input 
              id="coupon"
              type="text"
              placeholder="Coupon code" 
              className="bg-transparent border-b border-gray-300 pb-2 flex-1 focus:outline-none focus:border-black transition-colors text-sm"
            />
            <button className="px-6 py-2 border border-gray-300 text-xs font-bold tracking-wider hover:bg-black hover:text-white transition-colors uppercase">
              Apply
            </button>
          </div>
        </div>

        <button className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 hover:text-black uppercase transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Update Cart
        </button>
      </div>

    </div>
  );
}
