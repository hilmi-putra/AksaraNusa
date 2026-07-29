import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface BookCardSkeletonProps {
  variant?: "grid" | "featured" | "bestseller";
}

export function BookCardSkeleton({ variant = "grid" }: BookCardSkeletonProps) {
  if (variant === "featured") {
    return (
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
        {/* Left: Decorative blob & cover */}
        <div className="relative w-full md:w-1/2 aspect-square flex items-center justify-center">
          <Skeleton className="absolute inset-0 w-full h-full rounded-full opacity-20" />
          <Skeleton className="relative z-10 w-[55%] aspect-[2/3] shadow-lg rounded-sm" />
        </div>
        
        {/* Right: Info */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <div className="flex flex-col gap-2 w-full items-center md:items-start">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-12 md:h-16 w-3/4 mb-4" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    );
  }

  // Default "grid" variant skeleton
  return (
    <div className="w-full flex flex-col items-center bg-transparent">
      {/* Top Section: Cover + Blob */}
      <div className="relative w-full aspect-square sm:aspect-[4/5] flex items-center justify-center mb-8">
        <Skeleton className="absolute inset-0 w-full h-full rounded-full opacity-20" />
        <Skeleton className="relative z-10 w-[60%] sm:w-[65%] aspect-[2/3] shadow-md rounded-sm" />
      </div>

      {/* Bottom Section: Info */}
      <div className="w-full flex flex-col items-center px-4 relative z-20 gap-3 text-center">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-6 w-3/4 mb-1" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-10 w-32 mt-2" />
      </div>
    </div>
  );
}
