import React from "react";
import { MainNavbar } from "@/components/organisms/MainNavbar";
import { Footer } from "@/components/organisms/Footer";

export interface StoreLayoutProps {
  children: React.ReactNode;
}

export function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F4]">
      {/* Di masa depan, mungkin ada TopBar khusus promo Bookstore di atas Navbar */}
      <MainNavbar />
      <main className="flex-1 w-full relative overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
