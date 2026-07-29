"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/atoms/Container";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Download, ChevronRight, Package, User, MapPin } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CheckoutStepper } from "@/components/molecules/CheckoutStepper";
import { getOrder } from "@/lib/api/user";

export default function CheckoutSuccessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      getOrder(Number(orderId))
        .then((res) => setOrder(res || null))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId]);

  useGSAP(() => {
    // Icon animation
    gsap.fromTo(iconRef.current, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    );

    // Stagger content sections
    gsap.fromTo(".gsap-section", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.2 }
    );
  }, { scope: containerRef });

  if (loading) {
    return (
      <div className="flex flex-col bg-[#FAF8F4] min-h-screen pt-28 md:pt-32 pb-24 items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Package className="w-10 h-10 text-gray-200 mb-4 animate-bounce" />
          <p className="text-gray-400 font-medium">Memuat detail pesanan...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col bg-[#FAF8F4] min-h-screen pt-28 md:pt-32 pb-24 items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4 text-[#171512]">Pesanan Tidak Ditemukan</h1>
        <p className="text-gray-500 mb-8">Maaf, kami tidak dapat menemukan detail pesanan Anda.</p>
        <Link href="/dashboard/pesanan">
          <Button className="bg-[#DB8B00] hover:bg-[#b06f00] text-white">Lihat Pesanan Saya</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#FAF8F4] min-h-screen pt-28 md:pt-32 pb-24 print:bg-white print:pt-0 print:pb-0" ref={containerRef}>
      <Container className="max-w-4xl print:max-w-none print:w-full print:px-0">
        
        <div className="mb-14 print:hidden">
          <CheckoutStepper currentStep={3} />
        </div>

        {/* Header Success */}
        <div className="text-center mb-12 print:hidden">
          <div 
            ref={iconRef}
            className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-200"
          >
            <Check className="w-10 h-10 stroke-[3]" />
          </div>
          <Typography as="h1" className="font-heading text-4xl text-[#171512] font-bold mb-4">
            Thank you<br/>Your order has been received
          </Typography>
          <Typography variant="p" className="text-gray-500 max-w-lg mx-auto">
            You will receive an email with your download link / order confirmation.
          </Typography>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm gsap-section print:shadow-none print:border-none print:p-0">
          
          {/* Order Details */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#171512]">Order details</h2>
              <Button onClick={() => window.print()} variant="outline" size="sm" className="mt-4 sm:mt-0 text-[#171512] hover:bg-gray-100 self-start print:hidden">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-1 gap-y-4 gap-x-8 text-sm text-gray-600 border-b border-gray-100 pb-8">
              <div className="flex justify-between md:col-span-2">
                <span>Order number:</span>
                <span className="font-semibold text-[#171512]">{order.invoice_number}</span>
              </div>
              <div className="flex justify-between md:col-span-2">
                <span>Date:</span>
                <span className="font-semibold text-[#171512]">
                  {new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between md:col-span-2">
                <span>Payment method:</span>
                <span className="font-semibold text-[#171512] uppercase">{order.payment?.response_payload?.payment_type?.replace(/_/g, ' ') || order.payment?.payment_method || 'Midtrans'}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 text-sm pt-6 w-full md:w-1/2 ml-auto print:w-full print:ml-0">
              <div className="flex justify-between w-full">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold text-[#171512]">{formatRupiah(order.subtotal || 0)}</span>
              </div>
              {order.shipping_fee > 0 && (
                <div className="flex justify-between w-full">
                  <span className="text-gray-600">Ongkos Kirim:</span>
                  <span className="font-semibold text-[#171512]">{formatRupiah(order.shipping_fee)}</span>
                </div>
              )}
              {order.insurance_fee > 0 && (
                <div className="flex justify-between w-full">
                  <span className="text-gray-600">Asuransi:</span>
                  <span className="font-semibold text-[#171512]">{formatRupiah(order.insurance_fee)}</span>
                </div>
              )}
              {order.tax > 0 && (
                <div className="flex justify-between w-full">
                  <span className="text-gray-600">Pajak (PPN 11%):</span>
                  <span className="font-semibold text-[#171512]">{formatRupiah(order.tax)}</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between w-full text-green-600">
                  <span>Diskon:</span>
                  <span className="font-semibold">-{formatRupiah(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between w-full font-bold text-base mt-2 pt-2 border-t border-gray-100">
                <span className="text-[#171512]">Total:</span>
                <span className="text-[#DB8B00]">{formatRupiah(order.grand_total || 0)}</span>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#171512] mb-6">Products</h2>
            <div className="flex flex-col gap-6">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="w-16 h-24 bg-gray-100 relative rounded overflow-hidden flex-shrink-0">
                    <Image src={item.book?.cover_url || "https://placehold.co/400x600?text=No+Cover"} alt={item.book?.title || "Buku"} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row justify-between">
                    <div className="flex flex-col justify-start">
                      <span className="font-semibold text-[#171512]">{item.quantity} x {item.book?.title}</span>
                      <span className="text-xs text-gray-500 mt-1">{item.book?.author}</span>
                    </div>
                    <div className="mt-4 sm:mt-0 font-semibold text-[#171512]">
                      {formatRupiah(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#171512] mb-6">Customer details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-1 gap-8 text-sm pt-8">
              <div>
                <h3 className="font-semibold text-[#171512] mb-4 flex items-center gap-2">
                   Contact
                </h3>
                <div className="flex flex-col gap-2 text-gray-600">
                  <p>Email: <span className="text-[#171512]">{order.user?.email}</span></p>
                  <p>Phone: <span className="text-[#171512]">{order.user?.phone || '-'}</span></p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#171512] mb-4 flex items-center gap-2">
                   Shipping address
                </h3>
                {order.shipping_address ? (
                  <div className="flex flex-col gap-2 text-gray-600">
                    <p className="text-[#171512] font-medium">{order.shipping_address.recipient_name}</p>
                    <p>{order.shipping_address.phone}</p>
                    <p>{order.shipping_address.address}</p>
                    <p>{order.shipping_address.district_name}, {order.shipping_address.city_name}</p>
                    <p>{order.shipping_address.province_name} {order.shipping_address.postal_code}</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 text-gray-600">
                    <p>Ambil di Toko (Pickup Store)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 gsap-section print:hidden">
          {order.status === 'Pending' && order.payment?.status === 'Pending' && order.payment?.response_payload?.redirect_url && (
            <Button 
              onClick={() => window.location.href = order.payment.response_payload.redirect_url}
              size="lg" 
              className="rounded-full w-full sm:w-auto h-14 px-8 bg-green-600 hover:bg-green-700 text-white shadow-md animate-pulse"
            >
              Bayar Sekarang
            </Button>
          )}
          <Link href="/bookstore">
            <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto h-14 px-8 border-gray-300 text-[#171512] hover:bg-white">
              Lanjut Belanja
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" className="rounded-full w-full sm:w-auto h-14 px-8 bg-[#DB8B00] hover:bg-[#b06f00] text-white shadow-md">
              Lacak Pesanan
            </Button>
          </Link>
        </div>

      </Container>
    </div>
  );
}
