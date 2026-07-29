import React from "react";
import { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IconProps extends LucideProps {
  icon: LucideIcon;
}

export function Icon({ icon: LucideIcon, className, ...props }: IconProps) {
  return (
    <LucideIcon
      className={cn("w-5 h-5", className)}
      strokeWidth={2}
      {...props}
    />
  );
}
