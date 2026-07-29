"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Expand, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog";

export interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-[#F5F5F5] flex items-center justify-center">
        <span className="text-muted-foreground">No image available</span>
      </div>
    );
  }

  const handlePrev = () => setActiveImage(prev => Math.max(0, prev - 1));
  const handleNext = () => setActiveImage(prev => Math.min(images.length - 1, prev + 1));

  return (
    <div className="flex flex-col md:flex-row gap-4 lg:gap-6 items-start w-full">
      
      {/* Vertical Thumbnails (Desktop) */}
      {images.length > 1 && (
        <div className="hidden md:flex flex-col gap-3 w-20 shrink-0 h-full">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={cn(
                "w-20 aspect-[3/4] bg-[#F5F5F5] overflow-hidden flex items-center justify-center p-2 transition-all duration-300",
                activeImage === idx ? "opacity-100 ring-1 ring-black/10" : "opacity-60 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
            </button>
          ))}
          
          <div className="flex items-center justify-between w-full mt-2">
             <button 
               onClick={handlePrev}
               disabled={activeImage === 0}
               className="w-9 h-9 flex items-center justify-center bg-[#F5F5F5] text-gray-500 hover:text-black hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:hover:bg-[#F5F5F5]"
             >
               <ChevronUp className="w-4 h-4" />
             </button>
             <button 
               onClick={handleNext}
               disabled={activeImage === images.length - 1}
               className="w-9 h-9 flex items-center justify-center bg-[#F5F5F5] text-gray-500 hover:text-black hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:hover:bg-[#F5F5F5]"
             >
               <ChevronDown className="w-4 h-4" />
             </button>
          </div>
        </div>
      )}

      {/* Main Cover */}
      <div className="w-full aspect-square bg-[#F5F5F5] relative flex items-center justify-center p-8 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={images[activeImage]} 
          alt={`${title} - View ${activeImage + 1}`}
          className="w-auto h-full max-h-[500px] object-contain drop-shadow-xl mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Expand Button inside Dialog */}
        <Dialog>
          <DialogTrigger className="absolute bottom-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-black shadow-sm transition-all z-10">
             <Expand className="w-4 h-4" />
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full h-[90vh] bg-white border-none p-0 flex flex-col" showCloseButton={false}>
            <DialogTitle className="sr-only">View full image</DialogTitle>
            <div className="flex justify-end p-4 absolute top-0 right-0 z-50">
               <DialogClose className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow-sm cursor-pointer">
                 <X className="w-5 h-5 text-gray-700" />
               </DialogClose>
            </div>
            <div className="flex-1 bg-[#F5F5F5] flex items-center justify-center p-8 relative overflow-hidden">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img 
                 src={images[activeImage]} 
                 alt={`${title} - Full View`}
                 className="w-auto h-full max-h-full object-contain drop-shadow-2xl mix-blend-multiply"
               />
               {/* Arrows in full screen */}
               {images.length > 1 && (
                 <>
                   <button 
                     onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                     disabled={activeImage === 0}
                     className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white disabled:opacity-0 transition-all shadow-sm"
                   >
                     <ChevronUp className="w-5 h-5 -rotate-90" />
                   </button>
                   <button 
                     onClick={(e) => { e.stopPropagation(); handleNext(); }}
                     disabled={activeImage === images.length - 1}
                     className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white disabled:opacity-0 transition-all shadow-sm"
                   >
                     <ChevronDown className="w-5 h-5 -rotate-90" />
                   </button>
                 </>
               )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Horizontal Thumbnails (Mobile Only) */}
      {images.length > 1 && (
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 w-full">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={cn(
                "w-16 shrink-0 aspect-[3/4] bg-[#F5F5F5] overflow-hidden flex items-center justify-center p-2 transition-all duration-300",
                activeImage === idx ? "opacity-100 ring-1 ring-black/10" : "opacity-60 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
