import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Component = "section", children, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn("py-12 md:py-16 lg:py-24", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Section.displayName = "Section";
