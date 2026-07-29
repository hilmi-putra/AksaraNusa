import React from "react";
import Link from "next/link";
import { Typography } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  className?: string;
}

export function CategoryCard({ id, name, description, imageUrl, className }: CategoryCardProps) {
  const categorySlug = `/bookstore/kategori/${id}`; // Dummy slug

  return (
    <Link 
      href={categorySlug} 
      className={cn("group relative overflow-hidden rounded-xl aspect-[4/3] flex items-end p-6", className)}
    >
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 bg-muted z-0">
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-ink/20" />
      </div>
      
      <div className="relative z-10">
        <Typography as="h3" className="font-heading text-cream mb-1 group-hover:text-primary-brand transition-colors">
          {name}
        </Typography>
        {description && (
          <Typography variant="caption" className="text-cream/80 line-clamp-2">
            {description}
          </Typography>
        )}
      </div>
    </Link>
  );
}
