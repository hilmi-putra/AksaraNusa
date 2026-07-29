import Link from "next/link";
import { Mail, MessageCircle, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export function Header() {
  const { openCart, items } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-cream/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-ink">
          Aksara Nusa
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-ink hover:text-primary-brand transition-colors font-medium text-sm">
            Tentang Kami
          </Link>
          <Link href="#catalog" className="text-ink hover:text-primary-brand transition-colors font-medium text-sm">
            Katalog
          </Link>
          <Link href="#process" className="text-ink hover:text-primary-brand transition-colors font-medium text-sm">
            Proses Kerja
          </Link>
          <Link href="#services" className="text-ink hover:text-primary-brand transition-colors font-medium text-sm">
            Layanan
          </Link>
        </nav>

        {/* Contact & Cart Icons */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:contact@megapress.com"
            className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-ink hover:bg-primary-brand hover:text-surface-white transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/123456789"
            className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-ink hover:bg-primary-brand hover:text-surface-white transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <button
            onClick={openCart}
            className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-ink hover:bg-primary-brand hover:text-surface-white transition-colors relative"
            aria-label="Keranjang Belanja"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-secondary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
