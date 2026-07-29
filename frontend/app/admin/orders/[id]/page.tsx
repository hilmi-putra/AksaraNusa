"use client";

import React, { useEffect, useState } from "react";
import { AdminDashboardLayout } from "@/components/layout/admin/AdminDashboardLayout";
import { getAdminOrder, updateAdminOrderStatus, cancelAdminOrder, downloadInvoice, downloadPackingSlip } from "@/lib/api/admin-orders";
import { Button } from "@/components/ui/button";
import {
  FileText, ArrowLeft, Package, User, MapPin, CreditCard, Clock, CheckCircle2,
  AlertCircle, XCircle, Download, MoreVertical, RefreshCw
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { formatRupiah } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useParams, useRouter } from "next/navigation";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const router = useRouter();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { setItems } = useBreadcrumb();
  
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await getAdminOrder(orderId);
      setOrder(response.data || response);
      
      setItems([
        { label: "Pesanan", href: "/admin/orders" },
        { label: response.data?.invoice_number || "Detail" }
      ]);
    } catch (error) {
      console.error("Failed to fetch order:", error);
      toast.error("Gagal memuat detail pesanan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const handleUpdateStatus = async (status: string) => {
    setIsUpdating(true);
    try {
      await updateAdminOrderStatus(orderId, status);
      toast.success(`Status berhasil diubah menjadi ${status}`);
      fetchOrder();
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Gagal mengubah status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      toast.error("Alasan pembatalan harus diisi");
      return;
    }
    setIsUpdating(true);
    try {
      await cancelAdminOrder(orderId, cancelReason);
      toast.success("Pesanan berhasil dibatalkan");
      setIsCancelModalOpen(false);
      fetchOrder();
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Gagal membatalkan pesanan");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string, color: string }> = {
      'Pending': { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-800' },
      'Paid': { label: 'Dibayar', color: 'bg-blue-100 text-blue-800' },
      'Processing': { label: 'Diproses', color: 'bg-purple-100 text-purple-800' },
      'Ready to Pack': { label: 'Siap Dikemas', color: 'bg-indigo-100 text-indigo-800' },
      'Shipped': { label: 'Dikirim', color: 'bg-blue-100 text-blue-800' },
      'Completed': { label: 'Selesai', color: 'bg-green-100 text-green-800' },
      'Cancelled': { label: 'Dibatalkan', color: 'bg-red-100 text-red-800' },
      'Refund Requested': { label: 'Pengajuan Refund', color: 'bg-orange-100 text-orange-800' },
      'Refunded': { label: 'Dikembalikan', color: 'bg-gray-100 text-gray-800' },
    };
    const s = statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
    return <Badge className={`${s.color} hover:${s.color} border-none font-bold uppercase tracking-wider text-[10px] px-2 py-1`}>{s.label}</Badge>;
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="lg:col-span-2 h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (!order) {
    return (
      <AdminDashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Pesanan tidak ditemukan</h2>
          <Link href="/admin/orders">
            <Button className="mt-4">Kembali ke Daftar Pesanan</Button>
          </Link>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin/orders">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-gray-200">
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-black text-[#171512] tracking-tight">{order.invoice_number}</h1>
                {getStatusBadge(order.status)}
              </div>
              <p className="text-sm text-gray-500 font-medium">
                {format(new Date(order.created_at), "EEEE, dd MMMM yyyy HH:mm", { locale: id })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={() => {
              toast.promise(downloadInvoice(orderId), {
                loading: 'Mengunduh Invoice...',
                success: 'Invoice berhasil diunduh',
                error: 'Gagal mengunduh Invoice'
              });
            }} variant="outline" className="h-10 gap-2 font-bold text-xs uppercase tracking-wider">
              <Download className="w-4 h-4" />
              Invoice PDF
            </Button>
            
            <Button onClick={() => {
              toast.promise(downloadPackingSlip(orderId), {
                loading: 'Mengunduh Packing Slip...',
                success: 'Packing Slip berhasil diunduh',
                error: 'Gagal mengunduh Packing Slip'
              });
            }} variant="outline" className="h-10 gap-2 font-bold text-xs uppercase tracking-wider hidden sm:flex">
              <FileText className="w-4 h-4" />
              Packing Slip
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button className="h-10 gap-2 bg-[#171512] hover:bg-black font-bold text-xs uppercase tracking-wider" />}>
                Ubah Status
                <MoreVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Update Status Pesanan</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['Pending', 'Paid', 'Processing', 'Ready to Pack', 'Shipped', 'Completed'].map((s) => (
                  <DropdownMenuItem 
                    key={s} 
                    onClick={() => handleUpdateStatus(s)}
                    disabled={isUpdating || order.status === s || order.status === 'Cancelled' || order.status === 'Refunded'}
                    className="font-medium"
                  >
                    Set ke {s}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setIsCancelModalOpen(true)}
                  disabled={isUpdating || ['Cancelled', 'Completed', 'Shipped', 'Refunded'].includes(order.status)}
                  className="text-red-600 font-bold focus:text-red-600 focus:bg-red-50"
                >
                  Batalkan Pesanan
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Products List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#171512]">Daftar Produk</h3>
              </div>
              <div className="p-0">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="py-3 px-6 text-left font-bold text-xs uppercase tracking-wider text-gray-500">Produk</th>
                      <th className="py-3 px-6 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Harga</th>
                      <th className="py-3 px-6 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Qty</th>
                      <th className="py-3 px-6 text-right font-bold text-xs uppercase tracking-wider text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order.items?.map((item: any) => (
                      <tr key={item.id}>
                        <td className="py-4 px-6 flex items-center gap-4">
                          {item.book_cover ? (
                            <img src={item.book_cover} alt={item.book_title} className="w-12 h-16 object-cover rounded shadow-sm" />
                          ) : (
                            <div className="w-12 h-16 bg-gray-100 rounded flex items-center justify-center">
                              <FileText className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-semibold text-[#171512]">{item.book_title}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">{item.format}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center text-gray-600">{formatRupiah(item.price)}</td>
                        <td className="py-4 px-6 text-center font-medium">{item.quantity}</td>
                        <td className="py-4 px-6 text-right font-bold text-[#171512]">{formatRupiah(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col items-end gap-2 text-sm">
                <div className="flex justify-between w-full max-w-xs">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-semibold">{formatRupiah(order.subtotal)}</span>
                </div>
                <div className="flex justify-between w-full max-w-xs">
                  <span className="text-gray-500 font-medium">Ongkos Kirim</span>
                  <span className="font-semibold">{formatRupiah(order.shipping_fee)}</span>
                </div>
                <div className="flex justify-between w-full max-w-xs">
                  <span className="text-gray-500 font-medium">Asuransi</span>
                  <span className="font-semibold">{formatRupiah(order.insurance_fee)}</span>
                </div>
                <div className="flex justify-between w-full max-w-xs">
                  <span className="text-gray-500 font-medium">Diskon</span>
                  <span className="font-semibold text-green-600">-{formatRupiah(order.discount)}</span>
                </div>
                <div className="flex justify-between w-full max-w-xs pt-2 mt-2 border-t border-gray-200">
                  <span className="font-bold text-[#171512] uppercase tracking-wider">Grand Total</span>
                  <span className="font-black text-[#DB8B00] text-lg">{formatRupiah(order.grand_total)}</span>
                </div>
              </div>
            </div>

            {/* Timeline Log */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#171512]">Riwayat Pesanan</h3>
              </div>
              <div className="p-6">
                {order.timeline && order.timeline.length > 0 ? (
                  <div className="relative pl-6 space-y-6 before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-gray-100">
                    {order.timeline.map((log: any, idx: number) => (
                      <div key={log.id} className="relative">
                        <div className={`absolute -left-6 w-4 h-4 rounded-full border-4 border-white ${idx === order.timeline.length - 1 ? 'bg-[#DB8B00]' : 'bg-gray-300'}`} />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                            {format(new Date(log.created_at), "dd MMM yyyy HH:mm", { locale: id })}
                          </span>
                          <span className="font-bold text-sm text-[#171512]">{log.status}</span>
                          {log.description && <span className="text-sm text-gray-600 mt-1">{log.description}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">Belum ada riwayat pesanan.</p>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="flex flex-col gap-6">
            
            {/* Customer Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <User className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#171512]">Pelanggan</h3>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm text-[#171512]">{order.user?.name}</span>
                <span className="text-sm text-gray-600">{order.user?.email}</span>
                <span className="text-sm text-gray-600">{order.user?.phone || 'Belum ada nomor HP'}</span>
                <Link href={`/admin/customers/${order.user?.id}`} className="text-xs font-bold text-[#DB8B00] mt-3 hover:underline uppercase tracking-wider">
                  Lihat Profil Pelanggan →
                </Link>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <MapPin className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#171512]">Pengiriman</h3>
              </div>
              {order.shipping_address ? (
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm text-[#171512]">{order.shipping_address.recipient_name}</span>
                  <span className="text-sm text-gray-600">{order.shipping_address.phone}</span>
                  <span className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {order.shipping_address.address}<br/>
                    {order.shipping_address.village_name && `${order.shipping_address.village_name}, `}
                    {order.shipping_address.district_name && `${order.shipping_address.district_name}, `}
                    {order.shipping_address.regency_name || order.shipping_address.regency_code}<br/>
                    {order.shipping_address.province_name || order.shipping_address.province_code} 
                    {order.shipping_address.postal_code && ` ${order.shipping_address.postal_code}`}
                  </span>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Kurir</span>
                    <span className="font-bold text-sm uppercase">{order.shipping_method || 'Belum dipilih'}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Informasi alamat tidak tersedia.</p>
              )}
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#171512]">Pembayaran</h3>
              </div>
              {order.payment ? (
                <div className="flex flex-col gap-3">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Status</span>
                    {order.payment.status === 'Paid' ? (
                      <Badge className="bg-green-100 text-green-800 border-none font-bold">LUNAS</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800 border-none font-bold">{order.payment.status}</Badge>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Metode</span>
                    <span className="font-medium text-sm text-[#171512]">{order.payment.payment_method}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Transaksi ID</span>
                    <span className="font-mono text-xs text-gray-600 break-all">{order.payment.transaction_number || '-'}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Informasi pembayaran tidak tersedia.</p>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-tight text-red-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Batalkan Pesanan
            </DialogTitle>
            <DialogDescription>
              Tindakan ini tidak dapat diurungkan. Pesanan akan dibatalkan secara permanen.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-xs font-bold uppercase tracking-wider text-[#171512] mb-2 block">Alasan Pembatalan</label>
            <Textarea
              placeholder="Masukkan alasan pembatalan (misal: Stok barang kosong, pembeli minta batal)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelModalOpen(false)}>Batal</Button>
            <Button 
              variant="destructive" 
              onClick={handleCancelOrder} 
              disabled={isUpdating || !cancelReason.trim()}
              className="font-bold uppercase tracking-wider"
            >
              {isUpdating ? "Memproses..." : "Konfirmasi Batal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  );
}
