"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";
  
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!email || !otp) {
      router.replace("/forgot-password");
    }
  }, [email, otp, router]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== passwordConfirmation) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/forgot-password/reset", {
        email,
        otp,
        password,
        password_confirmation: passwordConfirmation,
      });
      setSuccess("Password berhasil diubah! Silakan login.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.customMessage || "Gagal mengubah password.");
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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light tracking-wide text-gray-800">
          NEW <span className="text-[#DB8B00]">PASSWORD</span>
        </h1>
        <p className="text-gray-500 text-sm mt-4">
          Silakan buat password baru Anda.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleReset}>
        
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
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password Baru"
            className="w-full bg-transparent border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-800 focus:outline-none focus:ring-0 focus:border-[#DB8B00] transition-colors placeholder:text-gray-400 text-sm"
          />
        </div>

        <div className="relative">
          <input
            id="password_confirmation"
            type="password"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Konfirmasi Password Baru"
            className="w-full bg-transparent border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-800 focus:outline-none focus:ring-0 focus:border-[#DB8B00] transition-colors placeholder:text-gray-400 text-sm"
          />
        </div>

        <div className="pt-4 space-y-4">
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 rounded-none bg-[#DB8B00] hover:bg-[#b06d00] text-white font-bold tracking-wider text-sm transition-colors uppercase disabled:opacity-70"
          >
            {loading ? "SAVING..." : "RESET PASSWORD"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
