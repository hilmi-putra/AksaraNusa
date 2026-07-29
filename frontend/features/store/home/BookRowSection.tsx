import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { BookCard } from "@/components/molecules/BookCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { Book } from "@/types/book";

export interface BookRowSectionProps {
  title: string;
  description?: string;
  books: Book[];
  viewAllLink?: string;
  bgClass?: string;
  cardVariant?: "grid" | "bestseller";
}

export function BookRowSection({
  title,
  description,
  books,
  viewAllLink,
  bgClass = "bg-white",
  cardVariant = "grid",
}: BookRowSectionProps) {
  if (!books || books.length === 0) return null;

  return (
    <Section className={`py-16 ${bgClass}`}>
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <FadeIn>
              <Typography  variant="h2" className="mb-2">
                {title}
              </Typography>
              {description && (
                <Typography variant="p" className="mt-0">
                  {description}
                </Typography>
              )}
            </FadeIn>
          </div>
          {viewAllLink && (
            <FadeIn delay={0.2}>
              <Link href={viewAllLink}>
                <Button variant="ghost" className="group text-primary hover:bg-primary/10 rounded-full px-6">
                  Lihat Semua
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </FadeIn>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {books.map((book, index) => (
            <FadeIn key={book.id} delay={index * 0.05}>
              <BookCard 
                book={book} 
                variant={cardVariant} 
                rank={cardVariant === "bestseller" ? index + 1 : undefined} 
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
