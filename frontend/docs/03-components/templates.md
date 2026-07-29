# Templates

Template adalah kerangka penyusunan organisms menjadi 1 halaman utuh, tanpa data nyata (skeleton komposisi).

## `LandingPageTemplate`
Susunan organism untuk halaman utama Mega Press:

```
<PublicLayout>
  <Header />
  <HeroSection />
  <AboutIntroSection />
  <WhyMegaPressSection />
  <CatalogShowcaseSection />
  <ProcessStepsSection />
  <Footer />
</PublicLayout>
```

## Aturan Template
- Template hanya mengatur **urutan & spacing antar organism** (lihat `spacing.md` untuk vertical rhythm), tidak menyimpan logic/data.
- Perubahan urutan section (mis. showcase katalog dipindah sebelum "Kenapa Mega Press") cukup diubah di level template ini tanpa menyentuh isi organism.
- Template dipakai di `app/(public)/page.tsx` sebagai satu-satunya tempat komposisi halaman.
