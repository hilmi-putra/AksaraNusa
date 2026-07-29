"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === "confirm-password" ? "password_confirmation" : id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});
    
    if (!formData.terms) {
      setError("Anda harus menyetujui Syarat dan Ketentuan.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", formData);
      router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (err: any) {
      setError(err.customMessage || "Gagal mendaftar. Silakan periksa kembali data Anda.");
      if (err.validationErrors) {
        setValidationErrors(err.validationErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response: any = await api.get("/auth/google");
      if (response.data?.redirect_url) {
        window.location.href = response.data.redirect_url;
      }
    } catch (err: any) {
      setError(err.customMessage || "Gagal menghubungi server Google.");
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
          <Link href="/login" className="text-gray-400 hover:text-gray-600 transition-colors">LOGIN</Link> <span className="text-gray-300 mx-1">/</span> REGISTER
        </h1>
      </div>

      <form className="space-y-8" onSubmit={handleRegister}>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        {/* Full Name Input */}
        <div className="relative">
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full bg-transparent border-0 border-b-2 px-0 py-2 text-gray-800 focus:outline-none focus:ring-0 focus:border-[#DB8B00] transition-colors placeholder:text-gray-400 text-sm ${validationErrors.name ? 'border-red-400' : 'border-gray-200'}`}
          />
          {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name[0]}</p>}
        </div>

        {/* Email Input */}
        <div className="relative">
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className={`w-full bg-transparent border-0 border-b-2 px-0 py-2 text-gray-800 focus:outline-none focus:ring-0 focus:border-[#DB8B00] transition-colors placeholder:text-gray-400 text-sm ${validationErrors.email ? 'border-red-400' : 'border-gray-200'}`}
          />
          {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email[0]}</p>}
        </div>

        {/* Password Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
          <div className="relative">
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full bg-transparent border-0 border-b-2 px-0 py-2 text-gray-800 focus:outline-none focus:ring-0 focus:border-[#DB8B00] transition-colors placeholder:text-gray-400 text-sm ${validationErrors.password ? 'border-red-400' : 'border-gray-200'}`}
            />
            {validationErrors.password && <p className="text-red-500 text-xs mt-1">{validationErrors.password[0]}</p>}
          </div>
          <div className="relative">
            <input
              id="confirm-password"
              type="password"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full bg-transparent border-0 border-b-2 border-gray-200 px-0 py-2 text-gray-800 focus:outline-none focus:ring-0 focus:border-[#DB8B00] transition-colors placeholder:text-gray-400 text-sm"
            />
          </div>
        </div>
        
        {/* Terms */}
        <div className="flex items-start space-x-3 pt-2">
          <Checkbox 
            id="terms" 
            checked={formData.terms} 
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, terms: checked === true }))}
            className="rounded-sm border-gray-300 data-[state=checked]:bg-[#DB8B00] data-[state=checked]:border-[#DB8B00] mt-0.5" 
          />
          <label
            htmlFor="terms"
            className="text-xs text-gray-500 cursor-pointer"
          >
            By creating an account, you agree to our <Link href="#" className="underline hover:text-[#DB8B00]">Terms</Link> and <Link href="#" className="underline hover:text-[#DB8B00]">Privacy Policy</Link>.
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4 space-y-4">
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 rounded-none bg-[#DB8B00] hover:bg-[#b06d00] text-white font-bold tracking-wider text-sm transition-colors uppercase disabled:opacity-70"
          >
            {loading ? "CREATING..." : "Create Account"}
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <Button 
            variant="outline" 
            type="button" 
            onClick={handleGoogleLogin}
            className="w-full h-12 rounded-none border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold tracking-wider text-sm transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            CONTINUE WITH GOOGLE
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
