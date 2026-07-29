"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/atoms/Typography";
import { SearchOverlay } from "./SearchOverlay";
import { useCartStore } from "@/stores/cartStore";
import Cookies from "js-cookie";
import { USER_COOKIE } from "@/lib/api";
import { useEffect } from "react";

export function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
  }, [fetchCart]);

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Layanan", href: "/#layanan" },
    { name: "Publishing", href: "/#publishing" },
    { name: "Mega Bookstore", href: "/bookstore", isHighlight: true },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* LEFT: Logo */}
          <div className="flex-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <img src="https://ik.imagekit.io/yqhp1cmbp/logo_megapress.svg" alt="Mega Press Logo" className="w-8 h-8" />
              <Typography variant="h4" className="text-primary-brand font-sans font-bold tracking-tight mb-0">
                Mega Press.
              </Typography>
            </Link>
          </div>

          {/* CENTER: Navigation Pill */}
          <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center rounded-full border border-white/40 bg-white/70 shadow-sm backdrop-blur-md px-2 py-1"
          >
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              // Fix for double hash: if on root, use relative hash, otherwise absolute
              const finalHref = pathname === "/" && link.href.startsWith("/#") 
                ? link.href.substring(1) 
                : link.href;
                
              return (
                <Link
                  key={link.name}
                  href={finalHref}
                  className="relative px-4 py-2 group rounded-full"
                >
                  <Typography
                    variant="navigation"
                    className={cn(
                      "relative z-10 transition-colors duration-300",
                      isActive
                        ? "text-primary-brand font-semibold"
                        : link.isHighlight
                        ? "text-primary-brand font-medium"
                        : "text-muted-foreground group-hover:text-ink"
                    )}
                  >
                    {link.name}
                  </Typography>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-primary-brand/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/5 rounded-full opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                </Link>
              );
            })}
            
            <div className="w-px h-6 bg-border/50 mx-2" />
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(true)}
              className="rounded-full text-muted-foreground hover:bg-black/5 hover:text-ink h-9 w-9"
            >
              <Search className="w-4 h-4" />
              <span className="sr-only">Search</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-muted-foreground hover:bg-black/5 hover:text-ink relative h-9 w-9"
              onClick={openCart}
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6E0000] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </motion.nav>

          {/* RIGHT: Actions */}
          <div className="flex-1 flex items-center justify-end gap-2">
            <div className="hidden md:flex items-center gap-1 mr-2">
              {user ? (
                <Link href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className={cn(buttonVariants({ variant: "ghost" }), "rounded-full text-primary-brand hover:bg-primary-brand/10 hover:text-primary-brand font-semibold flex items-center gap-2")}>
                  <User className="w-4 h-4" />
                  {user.name}
                </Link>
              ) : (
                <>
                  <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }), "rounded-full text-muted-foreground hover:bg-black/5 hover:text-ink font-medium")}>
                    Log in
                  </Link>
                  <Link href="/register" className={cn(buttonVariants({ variant: "ghost" }), "rounded-full text-muted-foreground hover:bg-black/5 hover:text-ink font-medium")}>
                    Sign up
                  </Link>
                </>
              )}
            </div>

            <div className="hidden lg:block">
              <Button className="rounded-full px-6 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 bg-primary-brand hover:bg-primary-brand/90 text-white">
                Terbitkan Buku
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full text-muted-foreground"
              >
                <Search className="w-4 h-4" />
              </Button>
              
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger render={<Button variant="ghost" size="icon" className="rounded-full text-muted-foreground bg-white/70 backdrop-blur-md shadow-sm border border-white/40" />}>
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Toggle Menu</span>
                </SheetTrigger>
                <SheetContent side="right" showCloseButton={false} className="!w-full !max-w-full h-full bg-[#084c3c] border-0 p-0 rounded-none flex flex-col">
                  {/* Custom Close Button area to match reference */}
                  <div className="flex justify-between items-center border-b border-white/20 h-16 px-6">
                    <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">Menu</span>
                    <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white border-l border-white/20 pl-6 h-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <nav className="flex flex-col w-full h-full overflow-y-auto">
                    {/* Main Links */}
                    <div className="flex flex-col border-b border-white/20">
                      {mainLinks.map((link) => {
                        const finalHref = pathname === "/" && link.href.startsWith("/#") 
                          ? link.href.substring(1) 
                          : link.href;

                        return (
                          <Link
                            key={link.name}
                            href={finalHref}
                            className={cn(
                              "text-3xl md:text-4xl font-serif text-white px-6 py-6 border-b border-white/20 transition-colors hover:bg-white/5",
                              pathname === link.href ? "text-[#DB8B00]" : ""
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {link.name}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Secondary Links / Actions */}
                    <div className="flex flex-col gap-4 px-6 py-8 mt-auto mb-8">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          openCart();
                        }}
                        className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center justify-between"
                      >
                        Cart ({itemCount})
                      </button>
                      {user ? (
                        <Link href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="text-sm font-medium text-[#DB8B00] hover:text-[#DB8B00]/80 transition-colors flex items-center gap-2" onClick={() => setIsOpen(false)}>
                          <User className="w-4 h-4" />
                          Dashboard ({user.name})
                        </Link>
                      ) : (
                        <>
                          <Link href="/login" className="text-sm font-medium text-white/80 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                            Login
                          </Link>
                          
                          <div className="h-4" /> {/* Spacer */}
                          
                          <Link href="/register" className="text-sm font-medium text-white/80 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                            Sign up / Register
                          </Link>
                        </>
                      )}
                      <Link href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                        Instagram
                      </Link>
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
