"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "./SearchOverlay";
import { useCartStore } from "@/stores/cartStore";
import Cookies from "js-cookie";
import { USER_COOKIE } from "@/lib/api";
import { toast } from "sonner";

export function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const pathname = usePathname();
  const { openCart, items, fetchCart } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userCookie = Cookies.get(USER_COOKIE);
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie));
        fetchCart();
      } catch (e) {}
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchCart]);

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Layanan", href: "/#layanan" },
    { name: "Publishing", href: "/#publishing" },
    { name: "Aksara Nusa Bookstore", href: "/bookstore", isHighlight: true },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm py-1" : "bg-white border-transparent py-1.5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="inline-flex items-center">
              <img 
                src="https://ik.imagekit.io/yqhp1cmbp/Teks%20paragraf%20Anda%201.png" 
                alt="Aksara Nusa Logo" 
                className="w-[120px] md:w-[140px] lg:w-[150px] h-auto object-contain transition-all duration-300" 
              />
            </Link>
          </div>

          {/* CENTER: Edge-to-Edge Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              const finalHref = pathname === "/" && link.href.startsWith("/#") 
                ? link.href.substring(1) 
                : link.href;
                
              return (
                <Link
                  key={link.name}
                  href={finalHref}
                  className="relative group py-2"
                >
                  <span
                    className={cn(
                      "text-[15px] transition-colors duration-300",
                      isActive
                        ? "text-[#004A8F] font-bold"
                        : link.isHighlight
                        ? "text-[#004A8F] font-semibold"
                        : "text-slate-600 font-medium hover:text-[#004A8F]"
                    )}
                  >
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-underline"
                      className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#004A8F] rounded-t-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex-shrink-0 flex items-center justify-end gap-3">
            <div className="hidden lg:flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 h-10 w-10"
              >
                <Search className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative h-10 w-10"
                onClick={() => toast.info("Coming Soon", { description: "Fitur keranjang belanja akan segera hadir!" })}
              >
                <ShoppingBag className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute 2 top-1 right-1 bg-[#EF7A08] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
              
              <div className="w-px h-6 bg-slate-200 mx-2" />

              {user ? (
                <Link href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className={cn(buttonVariants({ variant: "ghost" }), "rounded-full text-[#004A8F] hover:bg-[#004A8F]/10 font-bold flex items-center gap-2")}>
                  <User className="w-4 h-4" />
                  {user.name}
                </Link>
              ) : (
                <>
                  <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }), "rounded-full text-slate-600 hover:text-slate-900 font-semibold hover:bg-transparent px-4")}>
                    Log in
                  </Link>
                  <Link href="/register" className={cn(buttonVariants({ variant: "ghost" }), "rounded-full text-slate-600 hover:text-slate-900 font-semibold hover:bg-transparent px-4")}>
                    Sign up
                  </Link>
                </>
              )}
            </div>

            <div className="hidden md:block ml-2">
              <Button className="rounded-xl px-6 h-11 font-bold shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-primary hover:brightness-110 text-white border-0">
                Terbitkan Buku
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full text-slate-600"
              >
                <Search className="w-5 h-5" />
              </Button>
              
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger render={
                  <Button variant="ghost" size="icon" className="rounded-full text-slate-600 bg-slate-50 border border-slate-200" />
                }>
                  <Menu className="w-5 h-5" />
                </SheetTrigger>
                <SheetContent side="right" showCloseButton={false} className="!w-full !max-w-full h-full bg-white border-0 p-0 rounded-none flex flex-col">
                  <div className="flex justify-between items-center border-b border-slate-100 h-16 px-6">
                    <img src="https://ik.imagekit.io/yqhp1cmbp/Teks%20paragraf%20Anda%201.png" alt="Logo" className="w-[120px] h-auto object-contain" />
                    <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-900 h-full flex items-center justify-center">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <nav className="flex flex-col w-full h-full overflow-y-auto">
                    <div className="flex flex-col py-4">
                      {mainLinks.map((link) => {
                        const finalHref = pathname === "/" && link.href.startsWith("/#") 
                          ? link.href.substring(1) 
                          : link.href;

                        return (
                          <Link
                            key={link.name}
                            href={finalHref}
                            className={cn(
                              "text-xl font-bold text-slate-800 px-6 py-4 border-b border-slate-50 transition-colors hover:bg-slate-50",
                              pathname === link.href ? "text-[#004A8F]" : ""
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {link.name}
                          </Link>
                        );
                      })}
                    </div>

                    <div className="flex flex-col gap-4 px-6 py-8 mt-auto bg-slate-50">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          toast.info("Coming Soon", { description: "Fitur keranjang belanja akan segera hadir!" });
                        }}
                        className="text-base font-semibold text-slate-700 flex items-center justify-between py-2"
                      >
                        Shopping Cart 
                        <span className="bg-[#EF7A08] text-white text-xs font-bold px-2 py-0.5 rounded-full">{itemCount}</span>
                      </button>
                      
                      {user ? (
                        <Link href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="text-base font-semibold text-[#004A8F] flex items-center gap-2 py-2" onClick={() => setIsOpen(false)}>
                          <User className="w-5 h-5" />
                          Dashboard ({user.name})
                        </Link>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <Link href="/login" className="flex items-center justify-center py-3 rounded-xl border border-slate-300 text-slate-700 font-bold" onClick={() => setIsOpen(false)}>
                            Log in
                          </Link>
                          <Link href="/register" className="flex items-center justify-center py-3 rounded-xl bg-slate-900 text-white font-bold" onClick={() => setIsOpen(false)}>
                            Sign up
                          </Link>
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <Button className="w-full rounded-xl h-12 font-bold bg-gradient-primary text-white">
                          Terbitkan Buku Sekarang
                        </Button>
                      </div>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
