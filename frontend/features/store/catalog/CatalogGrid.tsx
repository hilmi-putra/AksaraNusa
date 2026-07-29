import React from "react";
import { BookCard } from "@/components/molecules/BookCard";
import { Book } from "@/types/book";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface CatalogGridProps {
  books: Book[];
}

export function CatalogGrid({ books }: CatalogGridProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {books.map((book, index) => (
          <FadeIn key={book.id} delay={(index % 8) * 0.05}>
            <BookCard book={book} variant="grid" />
          </FadeIn>
        ))}
      </div>

      <Pagination className="mt-8 justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
