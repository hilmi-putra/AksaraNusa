"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@/components/atoms/Typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, KeyRound, User, Plus } from "lucide-react";
import { getAddresses, createAddress, deleteAddress, updateAddress, updateProfile, updatePassword } from "@/lib/api/user";
import { AddAddressModal } from "@/components/organisms/AddAddressModal";
import Cookies from "js-cookie";
import { USER_COOKIE } from "@/lib/api";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<'personal' | 'password' | 'addresses'>('personal');
  const [user, setUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [profileForm, setProfileForm] = useState({ first_name: '', last_name: '', phone: '' });
  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '', new_password_confirmation: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get(USER_COOKIE);
    if (userCookie) {
      try {
        const u = JSON.parse(userCookie);
        setUser(u);
        const nameParts = u.name ? u.name.split(' ') : [''];
        setProfileForm({
          first_name: u.first_name || nameParts[0] || '',
          last_name: u.last_name || (nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''),
          phone: u.phone || ''
        });
      } catch (e) {}
    }
  }, []);

  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const res = await getAddresses();
      setAddresses(res || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'addresses') {
      fetchAddresses();
    }
  }, [activeTab]);

  const handleProfileSubmit = async () => {
    setIsSavingProfile(true);
    try {
      const res = await updateProfile(profileForm);
      setUser(res.user);
      Cookies.set(USER_COOKIE, JSON.stringify(res.user));
      toast.success("Profil berhasil diperbarui!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal memperbarui profil");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
      toast.error("Konfirmasi sandi baru tidak cocok");
      return;
    }
    setIsSavingPassword(true);
    try {
      await updatePassword(passwordForm);
      setPasswordForm({ current_password: '', new_password: '', new_password_confirmation: '' });
      toast.success("Kata sandi berhasil diperbarui!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal memperbarui kata sandi");
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setAddressToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDeleteAddress = async () => {
    if (!addressToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAddress(addressToDelete);
      toast.success("Alamat berhasil dihapus");
      fetchAddresses();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus alamat");
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
      setAddressToDelete(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-gray-100">
        <Typography variant="h2" className="text-2xl font-black text-[#171512] uppercase tracking-tighter mb-1">
          Profil Saya
        </Typography>
        <p className="text-sm text-gray-500">Kelola informasi pribadi, keamanan, dan alamat Anda.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-6 md:px-8 gap-6 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveTab('personal')}
          className={`py-4 text-xs font-bold tracking-widest uppercase flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'personal' ? 'border-[#171512] text-[#171512]' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
        >
          <User className="w-4 h-4" />
          Info Personal
        </button>
        <button 
          onClick={() => setActiveTab('password')}
          className={`py-4 text-xs font-bold tracking-widest uppercase flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'password' ? 'border-[#171512] text-[#171512]' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
        >
          <KeyRound className="w-4 h-4" />
          Kata Sandi
        </button>
        <button 
          onClick={() => setActiveTab('addresses')}
          className={`py-4 text-xs font-bold tracking-widest uppercase flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'addresses' ? 'border-[#171512] text-[#171512]' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
        >
          <MapPin className="w-4 h-4" />
          Daftar Alamat
        </button>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        
        {activeTab === 'personal' && (
          <div className="max-w-2xl flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Nama Depan</label>
                <input type="text" value={profileForm.first_name} onChange={e => setProfileForm({...profileForm, first_name: e.target.value})} className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Nama Belakang</label>
                <input type="text" value={profileForm.last_name} onChange={e => setProfileForm({...profileForm, last_name: e.target.value})} className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Email</label>
                <input type="email" value={user?.email || ""} disabled className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm text-gray-400 focus:outline-none" />
                <p className="text-[10px] text-gray-400 mt-1">Email tidak dapat diubah karena terhubung ke akun Anda.</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Nomor HP</label>
                <input type="tel" value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} placeholder="e.g. 081234567890" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleProfileSubmit} disabled={isSavingProfile} className="bg-gradient-primary hover:bg-[#b06f00] text-white h-12 px-8 rounded-none font-bold tracking-widest uppercase text-xs transition-colors">
                {isSavingProfile ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="max-w-md flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Sandi Saat Ini</label>
                <input type="password" value={passwordForm.current_password} onChange={e => setPasswordForm({...passwordForm, current_password: e.target.value})} placeholder="Masukkan kata sandi saat ini" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Sandi Baru</label>
                <input type="password" value={passwordForm.new_password} onChange={e => setPasswordForm({...passwordForm, new_password: e.target.value})} placeholder="Masukkan kata sandi baru" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Konfirmasi Sandi Baru</label>
                <input type="password" value={passwordForm.new_password_confirmation} onChange={e => setPasswordForm({...passwordForm, new_password_confirmation: e.target.value})} placeholder="Ulangi kata sandi baru" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handlePasswordSubmit} disabled={isSavingPassword} className="bg-[#171512] hover:bg-black text-white h-12 px-8 rounded-none font-bold tracking-widest uppercase text-xs transition-colors">
                {isSavingPassword ? "Memperbarui..." : "Perbarui Sandi"}
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-bold text-[#171512] uppercase tracking-wider text-sm">Daftar Alamat Tersimpan</h3>
                <p className="text-xs text-gray-500 mt-1">Kelola alamat pengiriman untuk pesanan Anda</p>
              </div>
              <Button onClick={() => setIsAddAddressModalOpen(true)} className="bg-[#171512] hover:bg-black text-white h-10 px-4 rounded-none font-bold tracking-widest uppercase text-xs transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Tambah Alamat
              </Button>
            </div>

            {loadingAddresses ? (
              <div className="text-center py-10 text-gray-500">Memuat alamat...</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {addresses.length === 0 && (
                  <div className="col-span-full py-10 text-center text-gray-500">
                    Belum ada alamat tersimpan.
                  </div>
                )}
                {addresses.map((addr) => (
                  <div key={addr.id} className="border border-gray-200 rounded-lg p-5 hover:border-[#004A8F] transition-colors group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#171512] uppercase tracking-wide">{addr.label}</span>
                        {addr.is_primary && (
                          <span className="bg-gradient-primary/10 text-gradient-primary text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                            Utama
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleDeleteClick(addr.id)} className="text-xs font-bold text-red-500 hover:underline uppercase">Hapus</button>
                      </div>
                    </div>
                    
                    <p className="font-semibold text-[#171512] text-sm mb-1">{addr.recipient_name}</p>
                    <p className="text-sm text-gray-600 mb-2">{addr.phone}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {addr.address}<br/>
                      {addr.village_name && `${addr.village_name}, `}{addr.district_name && `${addr.district_name}, `}{addr.regency_name || addr.regency_code}<br/>
                      {addr.province_name || addr.province_code} {addr.postal_code ? `, ${addr.postal_code}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
      
      <ConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDeleteAddress}
        title="Hapus Alamat"
        description="Apakah Anda yakin ingin menghapus alamat ini? Aksi ini tidak dapat dibatalkan."
        confirmText="Hapus"
        cancelText="Batal"
        isLoading={isDeleting}
      />

      <AddAddressModal 
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
        onSave={async (payload: any) => {
          try {
            await createAddress(payload);
            setIsAddAddressModalOpen(false);
            fetchAddresses();
            toast.success("Alamat berhasil ditambahkan!");
          } catch (err: any) {
            toast.error(err.response?.data?.message || "Gagal menambahkan alamat");
          }
        }}
      />
    </div>
  );
}
