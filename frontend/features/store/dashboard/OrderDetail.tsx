"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { getOrder, syncPaymentStatus, requestRefund } from "@/lib/api/user";
import Link from "next/link";
import { ArrowLeft, Package, CreditCard, Undo2 } from "lucide-react";
import { getPaymentConfig } from "@/lib/api/shipping";
import { useMidtransStore } from "@/stores/midtransStore";
import { MidtransService } from "@/lib/services/MidtransService";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface OrderDetailProps {
  id: string;
}

export function OrderDetail({ id }: OrderDetailProps) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isLoaded } = useMidtransStore();
  
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [refundFile, setRefundFile] = useState<File | null>(null);
  const [isRefunding, setIsRefunding] = useState(false);

  useEffect(() => {
    // Fetch Order details
    getOrder(Number(id))
      .then((res) => {
        setOrder(res || null);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center">
          <Package className="w-10 h-10 text-gray-200 mb-4 animate-bounce" />
          <p className="text-gray-400 font-medium">Memuat detail pesanan...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 flex flex-col items-center justify-center min-h-[400px]">
        <Package className="w-16 h-16 text-gray-200 mb-4" />
        <h3 className="text-xl font-bold text-[#171512] mb-2">Pesanan Tidak Ditemukan</h3>
        <p className="text-gray-500 mb-6">Pesanan yang Anda cari tidak ada atau telah dihapus.</p>
        <Link href="/dashboard/pesanan">
          <Button className="bg-[#171512] hover:bg-black text-white px-6 font-bold tracking-widest uppercase text-xs">
            Kembali ke Pesanan
          </Button>
        </Link>
      </div>
    );
  }

  const orderDate = new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const shipTo = order.shipping_address 
    ? `${order.shipping_address.recipient_name}, ${order.shipping_address.address}, ${order.shipping_address.district || ''}, ${order.shipping_address.city?.city_name || order.shipping_address.city_id || ''}, ${order.shipping_address.province?.name || order.shipping_address.province_id || ''} ${order.shipping_address.postal_code || ''}`
    : "Pick Up di Toko";

  const handlePay = () => {
    if (!isLoaded) {
      alert("Sistem pembayaran belum siap. Silakan tunggu sebentar atau refresh halaman.");
      return;
    }

    if (order.payment?.snap_token) {
      const redirectUrl = order.payment?.response_payload?.redirect_url || "";
      
      MidtransService.pay(order.payment.snap_token, redirectUrl, {
        onSuccess: (result: any) => {
          syncPaymentStatus(order.payment.transaction_number).finally(() => {
            window.location.reload();
          });
        },
        onPending: (result: any) => {
          syncPaymentStatus(order.payment.transaction_number).finally(() => {
            window.location.reload();
          });
        },
        onError: (result: any) => {
          alert("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: () => {
          // User closed popup
        }
      });
    } else {
      alert("Token pembayaran tidak ditemukan.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pesanan">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#171512]" />
          </button>
        </Link>
        <div>
          <Typography variant="h2" className="text-2xl font-black text-[#171512] uppercase tracking-tighter mb-1">
            Detail Pesanan
          </Typography>
          <p className="text-sm text-gray-500">Invoice #{order.invoice_number}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {/* Status Header */}
        <div className="bg-gray-50/80 p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Pesanan</span>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full 
                ${order.status === 'Completed' ? 'bg-green-100 text-green-700' 
                : order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700'
                : order.status === 'Cancelled' ? 'bg-red-100 text-red-700'
                : 'bg-gradient-primary/10 text-gradient-primary'}`}>
                {order.status}
              </span>
              <span className="text-sm text-gray-600 font-medium">{orderDate}</span>
            </div>
          </div>
          
          {order.status === 'Pending' && order.payment?.status === 'Pending' && (
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <Button onClick={handlePay} className="bg-gradient-primary hover:bg-[#b06f00] text-white rounded-none h-12 px-8 font-bold tracking-widest uppercase text-xs transition-colors w-full md:w-auto">
                Lanjutkan Pembayaran
              </Button>
            </div>
          )}

          {['Paid', 'Processing', 'Ready to Pack', 'Shipped', 'Completed'].includes(order.status) && !order.refund_request && (
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
              <Dialog open={isRefundModalOpen} onOpenChange={setIsRefundModalOpen}>
                <DialogTrigger render={<Button variant="outline" className="h-10 gap-2 font-bold text-xs uppercase tracking-wider text-red-600 border-red-200 hover:bg-red-50" />}>
                  <Undo2 className="w-4 h-4" />
                  Ajukan Refund
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Pengajuan Pengembalian Dana / Retur</DialogTitle>
                    <DialogDescription>
                      Jelaskan alasan Anda mengajukan pengembalian dana untuk pesanan ini. Jika ada kerusakan barang, harap lampirkan foto bukti.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold">Alasan</label>
                      <Textarea 
                        placeholder="Pesanan rusak, tidak sesuai deskripsi, dll..."
                        value={refundReason}
                        onChange={(e) => setRefundReason(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold">Foto Bukti (Opsional)</label>
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setRefundFile(e.target.files ? e.target.files[0] : null)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsRefundModalOpen(false)}>Batal</Button>
                    <Button 
                      onClick={async () => {
                        if (!refundReason.trim()) {
                          toast.error("Alasan harus diisi");
                          return;
                        }
                        setIsRefunding(true);
                        try {
                          const formData = new FormData();
                          formData.append("reason", refundReason);
                          if (refundFile) {
                            formData.append("proof_image", refundFile);
                          }
                          await requestRefund(order.id, formData);
                          toast.success("Pengajuan refund berhasil dikirim");
                          setIsRefundModalOpen(false);
                          window.location.reload();
                        } catch (error: any) {
                          toast.error(error.response?.data?.message || "Gagal mengajukan refund");
                        } finally {
                          setIsRefunding(false);
                        }
                      }} 
                      disabled={isRefunding || !refundReason.trim()}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold"
                    >
                      {isRefunding ? "Memproses..." : "Kirim Pengajuan"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {order.refund_request && (
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
               <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md border
                ${order.refund_request.status === 'Approved' ? 'border-green-200 text-green-700 bg-green-50' 
                : order.refund_request.status === 'Pending' ? 'border-yellow-200 text-yellow-700 bg-yellow-50'
                : 'border-red-200 text-red-700 bg-red-50'}`}>
                Refund: {order.refund_request.status}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-100">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-gradient-primary" />
              <h3 className="font-bold text-[#171512] uppercase tracking-wider text-sm">Info Pengiriman</h3>
            </div>
            {order.shipping_method === 'pickup' ? (
              <p className="text-sm text-gray-600">Pick up di Toko Aksara Nusa</p>
            ) : (
              <>
                <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                  <span className="font-semibold text-[#171512] block mb-1">{order.shipping_address?.recipient_name}</span>
                  {shipTo}
                </p>
                {order.shipping_service && (
                  <div className="mt-2 text-sm bg-gray-50 p-3 rounded border border-gray-100">
                    <span className="font-semibold text-[#171512] block">Kurir Pengiriman</span>
                    <span className="text-gray-600">{order.shipping_courier} {order.shipping_service} (Resi: {order.tracking_number || '-'})</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-gradient-primary" />
              <h3 className="font-bold text-[#171512] uppercase tracking-wider text-sm">Info Pembayaran</h3>
            </div>
            <div className="text-sm bg-gray-50 p-3 rounded border border-gray-100 flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Metode</span>
                <span className="font-medium text-[#171512] uppercase">{order.payment?.response_payload?.payment_type?.replace(/_/g, ' ') || order.payment?.payment_method || 'Belum dipilih'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status Pembayaran</span>
                <span className={`font-bold ${order.payment?.status?.toLowerCase() === 'success' ? 'text-green-600' : order.payment?.status?.toLowerCase() === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {order.payment?.status?.toLowerCase() === 'success' ? 'LUNAS' : order.payment?.status?.toLowerCase() === 'failed' ? 'GAGAL' : 'MENUNGGU'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-6 md:p-8">
          <h3 className="font-bold text-[#171512] uppercase tracking-wider text-sm mb-6">Daftar Produk</h3>
          <div className="flex flex-col gap-6">
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-28 bg-[#EBEBEB] shrink-0 p-2 flex items-center justify-center rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.book?.cover_url || "https://placehold.co/80x120?text=No+Cover"} 
                    alt={item.book?.title} 
                    className="max-w-full max-h-full object-contain shadow-sm" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-bold text-[#171512] leading-tight">{item.book?.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.book?.author?.name}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-semibold text-[#171512]">{item.quantity} x {formatRupiah(item.price)}</span>
                    <span className="font-bold text-gradient-primary">{formatRupiah(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="bg-gray-50/50 p-6 md:p-8 border-t border-gray-100 flex flex-col items-end">
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal Produk</span>
              <span className="font-medium text-[#171512]">{formatRupiah(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Ongkos Kirim</span>
              <span className="font-medium text-[#171512]">{formatRupiah(order.shipping_fee || 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Asuransi</span>
              <span className="font-medium text-[#171512]">{formatRupiah(order.insurance_fee || 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Diskon</span>
              <span className="font-medium text-red-500">-{formatRupiah(order.discount || 0)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 mt-1">
              <span className="font-bold text-[#171512] uppercase tracking-wider text-sm">Grand Total</span>
              <span className="font-black text-xl text-gradient-primary">{formatRupiah(order.grand_total)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
