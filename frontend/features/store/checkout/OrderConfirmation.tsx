"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatRupiah } from "@/lib/utils";

export function OrderConfirmation() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('order_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  useEffect(() => {
      // In a real scenario we'd fetch the order details here by orderId.
      // For now we'll just show a success message.
      if (orderId) {
          import("@/lib/api").then(({ default: api }) => {
              api.get(`/store/orders/${orderId}`).then(res => {
                  setOrderDetails(res.data.data);
              }).catch(console.error);
          });
      }
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center min-h-[50vh]">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      
      <h2 className="text-3xl font-black text-[#171512] uppercase tracking-tight mb-4">
        Order Placed Successfully
      </h2>
      
      <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
        Thank you for your purchase! Your order <strong className="text-black">{orderDetails?.invoice_number || orderId || '#...'}</strong> has been placed and is currently being processed.
      </p>

      {orderDetails && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 w-full max-w-md mb-8 text-left">
              <h3 className="font-bold text-sm uppercase mb-4 border-b pb-2">Order Summary</h3>
              <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className="font-semibold">{orderDetails.status}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold">{formatRupiah(orderDetails.grand_total)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2 mt-2">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-semibold">{orderDetails.payment?.payment_method || 'Midtrans'}</span>
              </div>
          </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link 
          href="/dashboard" 
          className="flex-1 bg-white border border-[#171512] text-[#171512] py-4 font-bold uppercase tracking-wider text-xs hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          View Order
        </Link>
        <Link 
          href="/books" 
          className="flex-1 bg-[#171512] text-white py-4 font-bold uppercase tracking-wider text-xs hover:bg-[#333] transition-colors flex items-center justify-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
