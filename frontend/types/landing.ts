import { LucideIcon } from "lucide-react";

export interface HeroContent {
  headline: string;
  subcopy: string;
  ctaText: string;
  images: string[];
}

export interface AboutIntro {
  paragraph: string;
  highlights: string[];
  ctaText: string;
}

export interface Advantage {
  title: string;
  description: string;
  icon: string; // We'll map string to LucideIcon in the component
}

export interface CatalogItem {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  size: "large" | "small";
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image?: string;
}

export interface LandingData {
  heroContent: HeroContent;
  aboutIntro: AboutIntro;
  advantages: Advantage[];
  catalogShowcase: CatalogItem[];
  processSteps: ProcessStep[];
}
