import React from "react";
import Link from "next/link";
import { Typography } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface Author {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  booksCount?: number;
}

export interface AuthorCardProps {
  author: Author;
  variant?: "default" | "featured";
  className?: string;
}

export function AuthorCard({ author, variant = "default", className }: AuthorCardProps) {
  const authorSlug = `/bookstore/author/${author.id}`; // Dummy slug

  if (variant === "featured") {
    return (
      <Link href={authorSlug} className={cn("flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-border hover:-translate-y-1 transition-transform group", className)}>
        <div className="w-24 h-24 rounded-full overflow-hidden bg-muted mb-4 ring-4 ring-background group-hover:ring-primary/20 transition-all">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={author.avatarUrl || "https://placehold.co/200x200/DAD6C9/171512?text=Author"} alt={author.name} className="object-cover w-full h-full" />
        </div>
        <Typography as="h3" className="font-heading mb-2">{author.name}</Typography>
        {author.bio && <Typography variant="caption" className="line-clamp-2">{author.bio}</Typography>}
        {author.booksCount && (
          <Typography variant="caption" className="text-primary mt-4">{author.booksCount} Buku</Typography>
        )}
      </Link>
    );
  }

  return (
    <Link href={authorSlug} className={cn("flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow", className)}>
      <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={author.avatarUrl || "https://placehold.co/100x100"} alt={author.name} className="object-cover w-full h-full" />
      </div>
      <div>
        <Typography as="h4" className="font-heading mb-1">{author.name}</Typography>
        {author.booksCount && (
          <Typography variant="caption">{author.booksCount} Karya diterbitkan</Typography>
        )}
      </div>
    </Link>
  );
}
