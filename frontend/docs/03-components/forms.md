# Forms

> Catatan: pada fase Landing Page, form bersifat **UI statis** (belum submit ke API — lihat `01-prd/landing-page.md → Out of Scope`).

## Kebutuhan Form di Landing Page

### Form Kontak/Ajukan Naskah Singkat (opsional, jika ada di footer atau modal CTA)
- Field: Nama, Email/WhatsApp, Jenis Naskah (select: Buku Ajar/Novel/Jurnal/dll), Pesan singkat.
- Setiap field: `label` + `input`, style krem/putih dengan border tipis (`--color-border-subtle`), radius medium (`12px`).
- Tombol submit: `Button variant="primary"`.

## Style Guidelines
- Input height minimal `44px` (touch target, lihat `responsive.md`).
- Focus state: border berubah ke `primary-brand`, tanpa menghilangkan outline browser sepenuhnya (aksesibilitas).
- Error state (disiapkan strukturnya walau belum ada logic validasi nyata): border merah + teks kecil di bawah field, terhubung via `aria-describedby`.

## Yang Belum Dikerjakan di Fase Ini
- Validasi real-time.
- Submit handler ke Laravel API (baru di fase *API Integration*, lihat `roadmap.md`).
- Notifikasi sukses/gagal (toast) — cukup siapkan komponen `Modal`/`Toast` placeholder bila diperlukan visualnya.
