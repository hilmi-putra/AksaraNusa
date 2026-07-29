import React from "react";
import { MainNavbar } from "@/components/organisms/MainNavbar";
import { Footer } from "@/components/organisms/Footer";

export interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
