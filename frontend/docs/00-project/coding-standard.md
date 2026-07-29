# Coding Standard — Frontend

## Umum
- TypeScript wajib (`strict: true`), tidak ada `any` kecuali dikomentari alasan (`// TODO: type dari API`).
- Satu komponen = satu file. Tidak menumpuk banyak komponen tak terkait di satu file.
- Props komponen selalu didefinisikan sebagai `type Props = {...}`, diletakkan di atas komponen.

## Styling
- Tailwind utility-first. Tidak menulis CSS custom kecuali untuk animasi kompleks (masukkan ke `globals.css`).
- Warna & spacing **wajib** memakai token dari `styles/tokens.ts` / Tailwind config (`bg-cream`, `text-ink`, `bg-primary-brand`), dilarang hex/pixel manual di JSX.

## Komponen
- Komponen Server by default. Tambahkan `"use client"` hanya jika memakai state, effect, atau event handler.
- Komponen presentational (atoms/molecules) tidak boleh fetch data — hanya menerima props.
- Section besar (`features/landing/*`) boleh mengatur layout & compose banyak molecules/organisms.

## Mock Data (Fase Landing Page)
- Semua mock data mengikuti bentuk (shape) yang sama dengan kontrak API yang direncanakan di `types/`.
- Tidak ada string/angka acak langsung di JSX — semua berasal dari objek mock yang diimpor.

## Penamaan & Import
- Import diurutkan: library eksternal → alias internal (`@/components`, `@/lib`) → relative.
- Gunakan path alias (`@/*`) dari `tsconfig.json`, hindari `../../../`.

## Commit & Review
- Commit message: `feat(landing): tambah section hero`, `style(landing): sesuaikan warna cta`.
- Setiap PR section baru harus menyertakan screenshot desktop + mobile sebelum merge.

## Aksesibilitas Minimum
- Semua gambar punya `alt`.
- Kontras teks vs background minimal AA (lihat `accessibility.md`).
- Tombol CTA dapat diakses via keyboard (fokus terlihat jelas).
