"use client";

import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api, { USER_COOKIE } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { AdminDashboardLayout } from '@/components/layout/admin/AdminDashboardLayout';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Profile Form State
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    job_title: "",
    bio: "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response: any = await api.get("/profile");
      const userData = response.data;
      setUser(userData);
      setFormData({
        name: userData.name || "",
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
        job_title: userData.job_title || "",
        bio: userData.bio || "",
      });
      if (userData.avatar) {
        setAvatarPreview(
          userData.avatar.startsWith("http")
            ? userData.avatar
            : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${userData.avatar}`
        );
      }
    } catch (error) {
      toast.error("Gagal memuat profil");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 2MB");
        return;
      }
      setAvatarFile(file);
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setValidationErrors({});

    try {
      const data = new FormData();
      data.append("_method", "PUT");
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key as keyof typeof formData] || "");
      });

      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      const response: any = await api.post("/profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = response.data;
      setUser(updatedUser);
      
      // Update cookie
      Cookies.set(USER_COOKIE, JSON.stringify(updatedUser));
      
      // Trigger event for navbar
      window.dispatchEvent(new Event("userUpdated"));

      toast.success(response.message || "Profil berhasil diperbarui");
    } catch (error: any) {
      if (error.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
        toast.error("Terdapat kesalahan pada isian form");
      } else {
        toast.error(error.response?.data?.message || "Gagal memperbarui profil");
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPassword(true);
    setValidationErrors({});

    try {
      const response: any = await api.put("/profile/password", passwordData);
      toast.success(response.message || "Password berhasil diperbarui");
      setPasswordData({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (error: any) {
      if (error.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
        toast.error("Terdapat kesalahan pada isian form");
      } else {
        toast.error(error.response?.data?.message || "Gagal memperbarui password");
      }
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex h-[400px] items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground mt-2">
          Kelola informasi akun dan preferensi keamanan Anda.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Informasi Profil</TabsTrigger>
          <TabsTrigger value="security">Keamanan Akun</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Foto Profil</CardTitle>
              <CardDescription>
                Pilih foto profil yang akan ditampilkan di seluruh platform. (Maks 2MB, .jpg, .png)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border">
                  <AvatarImage src={avatarPreview || ""} />
                  <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Ubah Foto
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleAvatarChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Disarankan rasio 1:1.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
              <CardDescription>
                Perbarui informasi pribadi dan kontak Anda di sini.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="profile-form" onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama lengkap"
                    />
                    {validationErrors.name && (
                      <p className="text-sm text-red-500">{validationErrors.name[0]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="username"
                    />
                    {validationErrors.username && (
                      <p className="text-sm text-red-500">{validationErrors.username[0]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                    />
                    {validationErrors.email && (
                      <p className="text-sm text-red-500">{validationErrors.email[0]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+62..."
                    />
                    {validationErrors.phone && (
                      <p className="text-sm text-red-500">{validationErrors.phone[0]}</p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="job_title">Jabatan / Posisi</Label>
                    <Input
                      id="job_title"
                      value={formData.job_title}
                      onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                      placeholder="Misal: Editor in Chief"
                    />
                    {validationErrors.job_title && (
                      <p className="text-sm text-red-500">{validationErrors.job_title[0]}</p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio Singkat</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Ceritakan sedikit tentang Anda..."
                      rows={4}
                    />
                    {validationErrors.bio && (
                      <p className="text-sm text-red-500">{validationErrors.bio[0]}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={savingProfile}>
                    {savingProfile ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ubah Password</CardTitle>
              <CardDescription>
                Pastikan Anda menggunakan password yang kuat dan unik.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Password Saat Ini</Label>
                  <Input
                    id="current_password"
                    type="password"
                    value={passwordData.current_password}
                    onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                  />
                  {validationErrors.current_password && (
                    <p className="text-sm text-red-500">{validationErrors.current_password[0]}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password Baru</Label>
                  <Input
                    id="password"
                    type="password"
                    value={passwordData.password}
                    onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                  />
                  {validationErrors.password && (
                    <p className="text-sm text-red-500">{validationErrors.password[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password_confirmation">Konfirmasi Password Baru</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={passwordData.password_confirmation}
                    onChange={(e) => setPasswordData({ ...passwordData, password_confirmation: e.target.value })}
                  />
                </div>

                <Button type="submit" disabled={savingPassword}>
                  {savingPassword ? "Memperbarui..." : "Perbarui Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </AdminDashboardLayout>
  );
}
