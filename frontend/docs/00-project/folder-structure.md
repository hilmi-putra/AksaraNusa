# Folder Structure — Frontend Repository

```
mega-press-frontend/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              → Landing Page Aksara Nusa (Home)
│   │   ├── tentang-kami/page.tsx
│   │   └── blog/...
│   └── layout.tsx
├── components/
│   ├── atoms/                    → Button, Badge, Icon, Tag
│   ├── molecules/                → NavLink, StatCard, ProcessStep
│   └── organisms/                → Header, Footer, Hero, Showcase
├── features/
│   └── landing/
│       ├── Hero.tsx
│       ├── AboutIntro.tsx
│       ├── WhyAksaraNusa.tsx
│       ├── CatalogShowcase.tsx
│       ├── ProcessSteps.tsx
│       └── landing.mock.ts       → mock data khusus landing page
├── layouts/
│   └── PublicLayout.tsx
├── services/                     → (aktif di fase API Integration)
├── hooks/
│   └── useScrollReveal.ts
├── stores/                       → (belum dipakai di fase landing page)
├── lib/
│   └── mock/
│       └── landing.ts
├── types/
│   └── landing.ts                → interface data landing page
├── styles/
│   ├── tokens.ts                 → design token (warna, spacing, font)
│   └── globals.css
├── public/
│   └── images/landing/
└── docs/                         → dokumen ini
```

## Aturan Penempatan
| Jenis Kode | Lokasi |
|---|---|
| Komponen generik lintas halaman (Button, Card) | `components/atoms` atau `molecules` |
| Section besar khusus 1 halaman (Hero, ProcessSteps) | `features/<nama-halaman>/` |
| Data dummy | `lib/mock/` (bukan hardcode di komponen) |
| Tipe/interface data | `types/` |
| Layout pembungkus halaman | `layouts/` |

## Konvensi Penamaan
- Komponen: `PascalCase.tsx` (mis. `CatalogShowcase.tsx`)
- Hook: `useCamelCase.ts`
- Mock data: `*.mock.ts`
- Tipe: `I` tidak digunakan sebagai prefix — cukup `LandingHero`, `ProcessStep`, dst.
