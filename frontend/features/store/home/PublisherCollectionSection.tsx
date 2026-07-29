import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { BookCard } from "@/components/molecules/BookCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { storeMockData } from "@/lib/mock/store.mock";

export function PublisherCollectionSection() {
  // Take first 4 books as publisher collection for demo
  const books = storeMockData.books.slice(0, 4);

  return (
    <Section className="py-16 bg-muted/50">
      <Container>
        <div className="bg-white rounded-3xl p-6 md:p-12 border border-border shadow-sm">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <FadeIn>
                <div className="inline-block px-3 py-1 bg-ink text-cream rounded-full text-xs font-medium uppercase tracking-wider mb-4">
                  Koleksi Pilihan
                </div>
                <Typography  variant="h2" className="mb-4">
                  Karya Fenomenal Aksara Nusa
                </Typography>
                <Typography variant="p" className="mb-8">
                  Pilihan buku terbaik terbitan Aksara Nusa yang telah menginspirasi ribuan pembaca. Wajib ada di rak buku Anda.
                </Typography>
                <Link href="/bookstore/penerbit/mega-press">
                  <Button size="lg" className="rounded-full w-full sm:w-auto group">
                    Eksplorasi Katalog
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </FadeIn>
            </div>

            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {books.map((book, index) => (
                  <FadeIn key={book.id} delay={index * 0.1}>
                    <BookCard book={book} variant="grid" />
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
