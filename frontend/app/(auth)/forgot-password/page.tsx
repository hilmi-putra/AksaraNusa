"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/forgot-password/send-otp", { email });
      setSuccess("Kode OTP telah dikirim ke email Anda.");
      setTimeout(() => {
        router.push(`/forgot-password/verify?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (err: any) {
      setError(err.customMessage || "Gagal mengirim OTP. Pastikan email terdaftar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white p-10 md:p-14 rounded-2xl shadow-xl w-full"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-light tracking-wide text-gray-800">
          FORGOT <span className="text-[#DB8B00]">PASSWORD</span>
        </h1>
        <p className="text-sm text-gray-500 mt-3">
          Masukkan alamat email Anda untuk menerima kode verifikasi OTP.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSendOtp}>
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

        <div className="relative">
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full bg-transparent border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-800 focus:outline-none focus:ring-0 focus:border-[#DB8B00] transition-colors placeholder:text-gray-400 text-sm"
          />
        </div>

        <div className="pt-4 space-y-4">
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 rounded-none bg-[#DB8B00] hover:bg-[#b06d00] text-white font-bold tracking-wider text-sm transition-colors uppercase disabled:opacity-70"
          >
            {loading ? "SENDING OTP..." : "SEND OTP"}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-[#DB8B00] hover:text-[#b06d00] font-semibold text-sm transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
