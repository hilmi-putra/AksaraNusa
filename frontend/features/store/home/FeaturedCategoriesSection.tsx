import React from "react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { CategoryCard } from "@/components/molecules/CategoryCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { storeMockData } from "@/lib/mock/store.mock";

export function FeaturedCategoriesSection() {
  return (
    <Section className="bg-white pt-4 pb-16">
      <Container>
        <div className="mb-10">
          <FadeIn>
            <Typography  variant="h2" className="mb-2">
              Kategori Pilihan
            </Typography>
            <Typography variant="p" className="mt-0">
              Temukan buku berdasarkan minat dan genre favorit Anda.
            </Typography>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {storeMockData.categories.map((category, index) => (
            <FadeIn key={category.id} delay={index * 0.1}>
              <CategoryCard {...category} className="h-full" />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
