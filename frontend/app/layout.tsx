import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Manrope, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce");
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        manrope.variable,
        plusJakartaSans.variable,
        playfairDisplay.variable
      )}
    >
      <head>
        <meta property="csp-nonce" content={nonce ?? ""} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
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
