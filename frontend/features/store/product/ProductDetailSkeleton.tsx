import React from "react";
import { Container } from "@/components/atoms/Container";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col bg-white min-h-screen pt-28 md:pt-36">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Gallery Skeleton */}
            <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-6 items-start">
              {/* Vertical Thumbnails */}
              <div className="hidden md:flex flex-col gap-3 w-20 shrink-0 h-full">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-20 aspect-[3/4] rounded-none" />
                ))}
              </div>
              {/* Main Cover */}
              <div className="w-full aspect-square relative flex items-center justify-center p-8">
                 <Skeleton className="w-full h-full rounded-none" />
              </div>
            </div>
            
            {/* Right Column: Book Info Skeleton */}
            <div className="w-full lg:pl-4 flex flex-col mt-4 md:mt-0">
              {/* Breadcrumb */}
              <Skeleton className="h-4 w-64 mb-8 rounded-none" />
              
              {/* Title */}
              <Skeleton className="h-12 w-full mb-2 rounded-none" />
              <Skeleton className="h-12 w-3/4 mb-6 rounded-none" />
              
              {/* Price */}
              <Skeleton className="h-4 w-24 mb-1 rounded-none" />
              <Skeleton className="h-10 w-48 mb-8 rounded-none" />
              
              {/* Description */}
              <div className="flex flex-col gap-2 mb-10">
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-5/6 rounded-none" />
                <Skeleton className="h-4 w-4/5 rounded-none" />
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-4 mb-8">
                <Skeleton className="w-32 h-12 rounded-none" />
                <Skeleton className="w-48 h-12 rounded-none" />
              </div>
              
              {/* Secondary Actions */}
              <div className="flex items-center gap-6">
                <Skeleton className="w-24 h-6 rounded-none" />
                <Skeleton className="w-32 h-6 rounded-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Tabs Skeleton */}
        <div className="max-w-6xl mx-auto mt-20">
          <div className="flex justify-center gap-8 border-b border-gray-100 pb-4 mb-12">
            <Skeleton className="h-6 w-32 rounded-none" />
            <Skeleton className="h-6 w-24 rounded-none" />
            <Skeleton className="h-6 w-40 rounded-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="h-4 w-40 mb-2 rounded-none" />
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-5/6 rounded-none" />
                <Skeleton className="h-4 w-4/5 rounded-none" />
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Related Books Skeleton */}
      <div className="bg-[#FAF7F3] mt-24 pt-16 pb-24 md:pb-32 w-full">
        <Container>
           <div className="flex flex-col mb-10 max-w-6xl mx-auto">
              <Skeleton className="h-6 w-40 mb-3 rounded-none" />
              <div className="h-[2px] w-16 bg-[#084c3c]/20"></div>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto">
             {[1,2,3,4,5].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="w-full aspect-[4/5] bg-transparent flex flex-col items-center">
                    <Skeleton className="w-[60%] aspect-[2/3] rounded-sm mb-4" />
                    <Skeleton className="h-3 w-16 mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
             ))}
           </div>
        </Container>
      </div>

    </div>
  );
}
