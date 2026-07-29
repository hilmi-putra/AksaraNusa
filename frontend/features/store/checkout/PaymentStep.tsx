"use client";

import React, { useState } from "react";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { processCheckout } from "@/lib/api/store";
import { syncPaymentStatus } from "@/lib/api/user";
import { formatRupiah } from "@/lib/utils";
import { MidtransService } from "@/lib/services/MidtransService";
import { useMidtransStore } from "@/stores/midtransStore";
import { useCartStore } from "@/stores/cartStore";
import { AlertCircle, ArrowLeft, MapPin, Package, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export function PaymentStep() {
  const { 
    prevStep, 
    nextStep,
    paymentMethod, 
    setPaymentMethod,
    shippingMethod,
    selectedCourier,
    isInsuranceSelected,
    setSnapToken: setStoreSnapToken,
    setOrderId: setStoreOrderId
  } = useCheckoutStore();

  const { items, subtotal } = useCartStore();
  const { isLoaded } = useMidtransStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [address, setAddress] = useState<any>(null);

  React.useEffect(() => {
    const addressId = localStorage.getItem('checkout_address_id');
    if (addressId && shippingMethod === 'delivery') {
      api.get('/store/user/addresses').then((res: any) => {
        // Some endpoints return data wrapped in { data: [...] }, check which one it is
        const addressList = res.data || res;
        const found = addressList.find((a: any) => a.id.toString() === addressId);
        if (found) setAddress(found);
      }).catch(console.error);
    }
  }, [shippingMethod]);



  const handlePlaceOrder = async () => {
    if (!isLoaded) {
      setError("Payment gateway is still loading. Please wait a moment and try again.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    try {
      // Get address ID from local storage
      const addressId = typeof window !== 'undefined' ? localStorage.getItem('checkout_address_id') : null;
      if (!addressId && shippingMethod === 'delivery') {
        throw new Error("No shipping address selected.");
      }

      const res = await processCheckout({
        address_id: Number(addressId) || 1, // fallback to 1 if pickup
        shipping_cost: shippingMethod === 'pickup' ? 0 : (selectedCourier?.cost || 0),
        shipping_courier: shippingMethod === 'pickup' ? 'pickup' : (selectedCourier?.courier || ''),
        shipping_service: shippingMethod === 'pickup' ? 'store' : (selectedCourier?.service || ''),
        shipping_etd: shippingMethod === 'pickup' ? '-' : (selectedCourier?.etd || ''),
        use_insurance: isInsuranceSelected
      });

      if (res?.snap_token) {
        setStoreSnapToken(res.snap_token);
        setStoreOrderId(res.order_id);
        if (res.redirect_url) {
          setRedirectUrl(res.redirect_url);
        }
        
        MidtransService.pay(res.snap_token, res.redirect_url, {
          onSuccess: (result: any) => {
            console.log('success', result);
            syncPaymentStatus(res.transaction_number).finally(() => {
              window.location.href = `/checkout/success?order_id=${res.order_id}`;
            });
          },
          onPending: (result: any) => {
            console.log('pending', result);
            syncPaymentStatus(res.transaction_number).finally(() => {
              window.location.href = `/checkout/success?order_id=${res.order_id}`;
            });
          },
          onError: (result: any) => {
            console.error('error', result);
            setError("Payment failed or encountered an error.");
            setIsProcessing(false);
          },
          onClose: () => {
            console.log('customer closed the popup');
            setError("Payment popup closed. Please try again.");
            setIsProcessing(false);
          }
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to place order.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col pr-0 lg:pr-10 border-r-0 lg:border-r border-gray-200 min-h-[50vh]">
      
      <button 
        onClick={prevStep}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8 w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Shipping
      </button>

      <section className="mb-12">
        <h2 className="text-2xl font-light text-[#171512] mb-6">Order Summary</h2>
        
        {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex flex-col gap-3 border border-red-200">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
          {redirectUrl && (
            <Button
              onClick={() => window.location.href = redirectUrl}
              className="bg-red-600 hover:bg-red-700 text-white w-full font-bold h-10 mt-2"
            >
              Buka Halaman Pembayaran (Alternatif)
            </Button>
          )}
        </div>
        )}

        <div className="flex flex-col gap-6">
          {/* Items Section */}
          <div className="border border-gray-200 rounded-lg p-5 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-gray-600" />
              <h3 className="font-bold text-sm uppercase tracking-wide">Products ({items.length})</h3>
            </div>
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 truncate pr-4">{item.quantity}x {item.book.title}</span>
                  <span className="font-medium whitespace-nowrap">{formatRupiah(item.book.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Section */}
          <div className="border border-gray-200 rounded-lg p-5 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-gray-600" />
              <h3 className="font-bold text-sm uppercase tracking-wide">Shipping Method</h3>
            </div>
            {shippingMethod === 'pickup' ? (
              <p className="text-sm text-gray-600">Ambil di Toko (Pickup Store)</p>
            ) : (
              <div className="text-sm text-gray-600">
                <p className="font-medium text-black mb-1">{selectedCourier?.courier_name} - {selectedCourier?.service}</p>
                <p>Estimasi: {selectedCourier?.etd} hari</p>
                <p>Biaya: {formatRupiah(selectedCourier?.cost || 0)}</p>
              </div>
            )}
          </div>

          {/* Address Section */}
          {shippingMethod === 'delivery' && address && (
            <div className="border border-gray-200 rounded-lg p-5 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-sm uppercase tracking-wide">Delivery Address</h3>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-black mb-1">{address.recipient_name} ({address.phone})</p>
                <p>{address.address}</p>
                <p>{address.village_name}, {address.district_name}</p>
                <p>{address.regency_name}, {address.province_name} {address.postal_code}</p>
              </div>
            </div>
          )}

          {/* Insurance Section */}
          {isInsuranceSelected && (
            <div className="border border-gray-200 rounded-lg p-5 bg-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-sm uppercase tracking-wide">Shipping Insurance</h3>
              </div>
              <span className="text-sm text-green-600 font-medium">Applied</span>
            </div>
          )}
        </div>

        <div className="p-5 bg-[#FFF4E5] border border-[#FFD9A6] rounded-lg mt-8">
            <h4 className="font-bold text-[#b34700] text-sm mb-2 uppercase tracking-wide">Secure Payment</h4>
            <p className="text-sm text-[#b34700] opacity-90 leading-relaxed">
                Anda akan diarahkan ke pop-up pembayaran Midtrans yang aman. Kami tidak menyimpan informasi kartu kredit atau kredensial perbankan Anda di server kami.
            </p>
        </div>
      </section>

      <button 
        type="button" 
        onClick={handlePlaceOrder}
        disabled={isProcessing}
        className="w-full bg-[#171512] text-white py-5 font-bold uppercase tracking-wider text-sm hover:bg-[#333] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Place Order & Pay
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">Secure</span>
          </>
        )}
      </button>
    </div>
  );
}
