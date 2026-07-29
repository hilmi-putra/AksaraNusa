"use client";

import React from "react";
import { Typography } from "@/components/atoms/Typography";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function CatalogSidebar() {
  const categories = [
    { id: "fiksi", label: "Fiksi", count: 120 },
    { id: "non-fiksi", label: "Non Fiksi", count: 85 },
    { id: "pengembangan-diri", label: "Pengembangan Diri", count: 42 },
    { id: "bisnis", label: "Bisnis & Keuangan", count: 38 },
    { id: "biografi", label: "Biografi", count: 15 },
    { id: "puisi", label: "Puisi & Sastra", count: 27 },
  ];

  const prices = [
    { id: "under-50", label: "Di bawah Rp 50.000" },
    { id: "50-100", label: "Rp 50.000 - Rp 100.000" },
    { id: "100-200", label: "Rp 100.000 - Rp 200.000" },
    { id: "above-200", label: "Di atas Rp 200.000" },
  ];

  return (
    <aside className="w-full">
      <div className="bg-white p-6 rounded-2xl border border-border sticky top-24">
        <Typography as="h3" className="font-heading mb-6">
          Filter Pencarian
        </Typography>

        {/* Category Filter */}
        <div className="mb-8">
          <Typography as="h4" className="mb-4">
            Kategori
          </Typography>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id={`cat-${category.id}`} />
                  <Label htmlFor={`cat-${category.id}`} className="font-normal cursor-pointer text-muted-foreground hover:text-ink">
                    {category.label}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Price Filter */}
        <div className="mb-8">
          <Typography as="h4" className="mb-4">
            Harga
          </Typography>
          <div className="space-y-3">
            {prices.map((price) => (
              <div key={price.id} className="flex items-center space-x-2">
                <Checkbox id={`price-${price.id}`} />
                <Label htmlFor={`price-${price.id}`} className="font-normal cursor-pointer text-muted-foreground hover:text-ink">
                  {price.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Others */}
        <div>
          <Typography as="h4" className="mb-4">
            Status
          </Typography>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="status-instock" defaultChecked />
              <Label htmlFor="status-instock" className="font-normal cursor-pointer text-muted-foreground hover:text-ink">
                Tersedia (In Stock)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="status-promo" />
              <Label htmlFor="status-promo" className="font-normal cursor-pointer text-muted-foreground hover:text-ink">
                Sedang Diskon
              </Label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
