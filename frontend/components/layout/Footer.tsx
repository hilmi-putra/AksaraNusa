import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-surface-white py-12 mt-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Aksara Nusa</h3>
            <p className="text-text-muted mb-6 max-w-sm">
              Satu Penerbit. Ribuan Cerita Penting. Kami berdedikasi untuk menerbitkan naskah berkualitas dari penulis berbakat ke seluruh penjuru negeri.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-surface-muted">Tautan</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="#about" className="text-text-muted hover:text-primary-brand transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="text-text-muted hover:text-primary-brand transition-colors">
                  Katalog
                </Link>
              </li>
              <li>
                <Link href="#process" className="text-text-muted hover:text-primary-brand transition-colors">
                  Proses Kerja
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-surface-muted">Kontak</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-text-muted">
                Email: hello@megapress.com
              </li>
              <li className="text-text-muted">
                WhatsApp: +62 812-3456-7890
              </li>
              <li className="text-text-muted mt-4">
                Jl. Penerbitan No. 1, Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-text-muted/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} Aksara Nusa. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-text-muted">
            <Link href="#" className="hover:text-surface-white">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-surface-white">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
