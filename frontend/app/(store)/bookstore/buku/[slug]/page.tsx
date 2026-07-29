"use client";

import React, { useEffect, useState, use } from "react";
import { Container } from "@/components/atoms/Container";
import { ProductGallery } from "@/features/store/product/ProductGallery";
import { ProductInfo } from "@/features/store/product/ProductInfo";
import { ProductMetadata } from "@/features/store/product/ProductMetadata";
import { ProductReviews } from "@/features/store/product/ProductReviews";
import { BookCard } from "@/components/molecules/BookCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { getPublicBook, getPublicBooks, mapApiBookToFrontendBook } from "@/lib/api/books";
import { ProductDetailSkeleton } from "@/features/store/product/ProductDetailSkeleton";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const [book, setBook] = useState<any>(null);
  const [relatedBooks, setRelatedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getPublicBook(unwrappedParams.slug);
        if (response.data) {
          const fetchedBook = mapApiBookToFrontendBook(response.data);
          setBook(fetchedBook);
          
          // Fetch related books from the same category
          const categorySlug = response.data.categories?.[0]?.slug;
          const relatedRes = await getPublicBooks({ category: categorySlug, limit: 6 });
          if (relatedRes.data) {
             setRelatedBooks(
               relatedRes.data
                 .map(mapApiBookToFrontendBook)
                 .filter((b: any) => b.id !== fetchedBook.id)
             );
          }
        }
      } catch (error) {
        console.error("Failed to fetch book detail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [unwrappedParams.slug]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!book) {
    return <div className="min-h-screen flex items-center justify-center">Book not found.</div>;
  }

  // Use real gallery if available, otherwise fallback
  const images = (book.image_gallery && book.image_gallery.length > 0 && book.image_gallery.some((img: string) => img !== ""))
    ? book.image_gallery.filter((img: string) => img !== "")
    : [
        book.coverUrl,
        "https://placehold.co/400x600/EFEADD/171512?text=Back+Cover",
        "https://placehold.co/400x600/DAD6C9/171512?text=Spine",
        "https://placehold.co/400x600/EFEADD/171512?text=Inside+Pages"
      ];

  return (
    <div className="flex flex-col bg-white min-h-screen pt-28 md:pt-36">
      <Container>
        {/* Main Product Section - Clean E-commerce Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Gallery */}
            <div className="w-full">
              <ProductGallery images={images} title={book.title} />
            </div>
            
            {/* Right Column: Book Info */}
            <div className="w-full lg:pl-4">
              <ProductInfo 
                book={book} 
                prevSlug={relatedBooks.length > 0 ? relatedBooks[0].slug : undefined}
                nextSlug={relatedBooks.length > 1 ? relatedBooks[1].slug : undefined}
              />
            </div>
          </div>
        </div>

        {/* Metadata Tabs */}
        <div className="max-w-6xl mx-auto mt-20">
          <ProductMetadata book={book} />
        </div>

      </Container>

      {/* Related Books */}
      <div className="bg-[#FAF7F3] mt-24 pt-16 pb-24 md:pb-32">
        <Container>
           <div className="flex flex-col mb-10 max-w-6xl mx-auto">
              <h3 className="font-sans font-bold tracking-widest uppercase text-lg text-[#171512] mb-3">
                Related Products
              </h3>
              <div className="h-[2px] w-16 bg-[#084c3c]"></div>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto">
             {relatedBooks.map((book, index) => (
               <FadeIn key={book.id} delay={index * 0.05}>
                 <BookCard book={book} />
               </FadeIn>
             ))}
           </div>
        </Container>
      </div>
    </div>
  );
}
