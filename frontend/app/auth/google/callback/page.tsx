"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import api, { TOKEN_COOKIE, USER_COOKIE } from "@/lib/api";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [error, setError] = useState("");
  const isVerifying = React.useRef(false);

  useEffect(() => {
    if (!code) {
      setError("Authorization code missing.");
      setTimeout(() => router.push("/login"), 3000);
      return;
    }

    if (isVerifying.current) return;
    isVerifying.current = true;

    const verifyGoogleCode = async () => {
      try {
        const response: any = await api.get(`/auth/google/callback?code=${encodeURIComponent(code)}`);
        
        // ApiResponse wraps data in response.data.data
        const responseData = response.data.data || response.data;
        
        Cookies.set(TOKEN_COOKIE, responseData.token, { expires: 7 });
        Cookies.set(USER_COOKIE, JSON.stringify(responseData.user), { expires: 7 });

        const redirectUrl = responseData.user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
        router.push(redirectUrl);
      } catch (err: any) {
        if (err.response?.status === 403 && err.customMessage?.includes("belum diverifikasi")) {
          const parts = err.customMessage.split('|');
          const email = parts.length > 1 ? parts[1] : '';
          setError("Pendaftaran berhasil! Silakan periksa email untuk OTP.");
          setTimeout(() => {
            router.push(`/verify?email=${encodeURIComponent(email)}`);
          }, 2000);
          return;
        }

        setError(err.customMessage?.split('|')[0] || "Gagal verifikasi login Google.");
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    verifyGoogleCode();
  }, [code, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        {error ? (
          <div>
            <div className="text-red-500 mb-4 text-xl">⚠️</div>
            <h2 className="text-xl text-gray-800 mb-2">Login Gagal</h2>
            <p className="text-red-500 text-sm">{error}</p>
            <p className="text-gray-400 text-xs mt-4">Mengalihkan ke halaman login...</p>
          </div>
        ) : (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DB8B00] mx-auto mb-6"></div>
            <h2 className="text-xl font-light text-gray-800 tracking-wide">
              Memverifikasi Login Google...
            </h2>
            <p className="text-gray-500 text-sm mt-2">Mohon tunggu sebentar.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <CallbackHandler />
    </Suspense>
  );
}
