"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Package, Heart, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { Typography } from "@/components/atoms/Typography";
import Cookies from "js-cookie";
import api, { TOKEN_COOKIE, USER_COOKIE } from "@/lib/api";
import { useEffect, useState } from "react";

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get(USER_COOKIE);
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie));
      } catch (e) {}
    }
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error(e);
    } finally {
      Cookies.remove(TOKEN_COOKIE);
      Cookies.remove(USER_COOKIE);
      router.push("/login");
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Profil Saya",
      href: "/dashboard/profil",
      icon: User,
    },
    {
      title: "Pesanan Saya",
      href: "/dashboard/pesanan",
      icon: Package,
    },
    {
      title: "Wishlist",
      href: "/dashboard/wishlist",
      icon: Heart,
    },
  ];

  return (
    <>
      <div className="bg-white md:rounded-full rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center justify-between px-6 py-4 md:py-3 mb-8 w-full gap-4 md:gap-0">
        
        {/* Left: Navigation Menu (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-1 w-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.title} href={item.href} className="shrink-0">
                <span className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-bold text-xs tracking-wider uppercase",
                  isActive 
                    ? "bg-gradient-primary/10 text-gradient-primary" 
                    : "hover:bg-gray-50 text-gray-500 hover:text-[#171512]"
                )}>
                  <item.icon className={cn("w-4 h-4", isActive ? "text-gradient-primary" : "text-gray-400")} strokeWidth={isActive ? 2.5 : 2} />
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: User Profile Summary */}
        <div className="flex items-center gap-4 md:border-l border-gray-100 pt-0 pl-0 md:pl-6 w-full md:w-auto justify-between md:justify-end shrink-0">
          <div className="flex flex-col items-start md:items-end">
            <Typography variant="p" className="font-bold text-[#171512] text-sm leading-none mb-1">
              {user?.name || 'Guest User'}
            </Typography>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
              Member
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#171512] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm overflow-hidden">
              {user?.avatar && !imgError ? (
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  onError={() => setImgError(true)}
                />
              ) : (
                (user?.name ? user.name.substring(0, 2).toUpperCase() : 'GU')
              )}
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors ml-1" 
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation (Mobile Only) */}
      <div className="md:hidden fixed bottom-8 left-0 right-0 px-6 z-40 pointer-events-none flex justify-center">
        {/* 
          Using pointer-events-auto on the nav so we can click it, 
          and adding right margin/padding to avoid WhatsApp floating button which is typically bottom-right.
          The width is tight around the items.
        */}
        <nav className="pointer-events-auto bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 px-3 py-2 flex items-center justify-center gap-6 relative">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.title} href={item.href} className="relative z-10 flex flex-col items-center justify-center w-12 h-12">
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#004A8F] to-[#0074B7] rounded-full shadow-sm z-[-1]"></div>
                )}
                
                <item.icon 
                  className={cn("w-5 h-5 transition-colors duration-300", isActive ? "text-white" : "text-gray-400")} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
