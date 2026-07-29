"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!email) {
      router.replace("/login");
    }
  }, [email, router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (otp.length !== 6) {
      setError("Kode OTP harus terdiri dari 6 angka.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/verify-otp", { email, otp });
      setSuccess("Email berhasil diverifikasi! Mengalihkan ke halaman login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.customMessage || "Kode OTP salah atau sudah kedaluwarsa.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    setResending(true);

    try {
      await api.post("/auth/resend-otp", { email });
      setSuccess("Kode OTP baru telah dikirim ke email Anda.");
    } catch (err: any) {
      setError(err.customMessage || "Gagal mengirim ulang OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white p-10 md:p-14 rounded-2xl shadow-xl w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light tracking-wide text-gray-800">
          VERIFY <span className="text-[#DB8B00]">EMAIL</span>
        </h1>
        <p className="text-gray-500 text-sm mt-4">
          Masukkan 6 digit kode OTP yang telah dikirimkan ke <br />
          <span className="font-semibold text-gray-700">{email}</span>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleVerify}>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center border border-red-100">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded text-sm text-center border border-green-100">
            {success}
          </div>
        )}

        {/* OTP Input */}
        <div className="relative flex justify-center pb-2">
          <input
            id="otp"
            type="text"
            required
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="w-full sm:w-3/4 md:w-1/2 bg-transparent border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-800 focus:outline-none focus:ring-0 focus:border-[#DB8B00] transition-colors placeholder:text-gray-300 text-3xl tracking-[0.3em] md:tracking-[0.5em] text-center"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 space-y-4">
          <Button 
            type="submit" 
            disabled={loading || otp.length !== 6}
            className="w-full h-12 rounded-none bg-[#DB8B00] hover:bg-[#b06d00] text-white font-bold tracking-wider text-sm transition-colors uppercase disabled:opacity-70"
          >
            {loading ? "VERIFYING..." : "VERIFY ACCOUNT"}
          </Button>

          <div className="text-center">
            <span className="text-gray-500 text-sm">Belum menerima kode? </span>
            <button
              type="button"
              disabled={resending}
              onClick={handleResend}
              className="text-[#DB8B00] hover:text-[#b06d00] font-semibold text-sm disabled:opacity-50"
            >
              {resending ? "MENGIRIM ULANG..." : "KIRIM ULANG OTP"}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <VerifyForm />
    </Suspense>
  );
}
