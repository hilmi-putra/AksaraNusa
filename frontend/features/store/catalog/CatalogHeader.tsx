"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface CatalogHeaderProps {
  title: string;
  totalResults: number;
  onFilterToggle: () => void;
}

export function CatalogHeader({ title, totalResults, onFilterToggle }: CatalogHeaderProps) {
  return (
    <div className="flex flex-col gap-6 mb-8 pt-8">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>Beranda</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="w-4 h-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/bookstore" />}>Bookstore</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="w-4 h-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Typography  variant="h1" className="md: mb-2">
            {title}
          </Typography>
          <Typography variant="caption">
            Menampilkan {totalResults} hasil buku
          </Typography>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="md:hidden flex-1" 
            onClick={onFilterToggle}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filter
          </Button>
          
          <div className="flex-1 min-w-[200px]">
            <Select defaultValue="newest">
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Urutkan berdasarkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Terbaru</SelectItem>
                <SelectItem value="popular">Terpopuler</SelectItem>
                <SelectItem value="price-asc">Harga: Rendah ke Tinggi</SelectItem>
                <SelectItem value="price-desc">Harga: Tinggi ke Rendah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
