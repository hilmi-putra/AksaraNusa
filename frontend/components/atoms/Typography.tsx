import React from "react";
import { cn } from "@/lib/utils";

type TypographyVariant = 
  // Headings (Plus Jakarta Sans)
  | "display" 
  | "hero" 
  | "h1" 
  | "h2" 
  | "h3" 
  | "h4" 
  | "h5" 
  | "h6" 
  // Body (Manrope)
  | "p" 
  | "description" 
  | "navigation" 
  | "button" 
  | "input" 
  | "card" 
  | "footer" 
  | "form" 
  | "caption" 
  | "badge"
  | "dashboard"
  | "commerce";

export interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLQuoteElement | HTMLSpanElement> {
  variant?: TypographyVariant;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function Typography({
  variant = "p",
  className,
  children,
  as,
  ...props
}: TypographyProps) {
  // Determine default element if `as` is not provided
  let Component: React.ElementType = as || "p";
  if (!as) {
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(variant)) {
      Component = variant as React.ElementType;
    } else if (["display", "hero"].includes(variant)) {
      Component = "h1";
    } else if (["caption", "badge", "navigation", "button", "footer"].includes(variant)) {
      Component = "span";
    }
  }

  const variants: Record<TypographyVariant, string> = {
    // Headings (Plus Jakarta Sans and Playfair Display)
    display: "font-serif text-6xl md:text-7xl font-bold tracking-tight leading-tight",
    hero: "font-serif text-5xl md:text-6xl font-bold tracking-tight leading-tight",
    h1: "font-heading text-4xl md:text-5xl font-bold tracking-tight leading-tight",
    h2: "font-heading text-3xl md:text-4xl font-semibold tracking-tight leading-snug pb-2 first:mt-0",
    h3: "font-heading text-2xl md:text-3xl font-semibold tracking-tight leading-snug",
    h4: "font-heading text-xl md:text-2xl font-semibold tracking-tight leading-snug",
    h5: "font-heading text-lg md:text-xl font-semibold tracking-tight leading-snug",
    h6: "font-heading text-base md:text-lg font-semibold tracking-tight leading-snug",
    
    // Body (Manrope - mapped to font-sans)
    p: "font-sans text-base leading-relaxed [&:not(:first-child)]:mt-6",
    description: "font-sans text-lg text-muted-foreground leading-relaxed",
    navigation: "font-sans text-sm font-medium",
    button: "font-sans text-sm font-semibold",
    input: "font-sans text-sm",
    card: "font-sans text-sm leading-relaxed",
    footer: "font-sans text-sm text-muted-foreground leading-relaxed",
    form: "font-sans text-sm font-medium",
    caption: "font-sans text-xs text-muted-foreground leading-tight",
    badge: "font-sans text-xs font-semibold uppercase tracking-wider",
    dashboard: "font-sans text-sm leading-relaxed",
    commerce: "font-sans text-base font-medium",
  };

  return (
    <Component
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
