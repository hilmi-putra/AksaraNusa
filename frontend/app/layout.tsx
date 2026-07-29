import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Aksara Nusa | Satu Penerbit. Ribuan Cerita Penting.",
  description: "Aksara Nusa - Penerbit buku ajar, buku referensi, novel, dan jurnal.",
  icons: {
    icon: "https://ik.imagekit.io/yqhp1cmbp/favicon?updatedAt=1785316791934"
  }
};

import { FloatingWhatsAppCTA } from "@/components/ui/FloatingWhatsAppCTA";
import { CartDrawer } from "@/components/organisms/CartDrawer";
import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "@/components/ui/sonner";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", plusJakartaSans.variable, manrope.variable, playfairDisplay.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BreadcrumbProvider>
            {children}
            <FloatingWhatsAppCTA />
            <CartDrawer />
            <Toaster />
          </BreadcrumbProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
