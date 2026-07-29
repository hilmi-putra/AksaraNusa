"use client";

import React from "react";
import { Truck, Store } from "lucide-react";
import { Typography } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  type: "delivery" | "pickup";
  estimatedDays?: string;
}

export interface ShippingCardProps {
  method: ShippingMethod;
  isSelected: boolean;
  onSelect: (id: string) => void;
  className?: string;
}

export function ShippingCard({ method, isSelected, onSelect, className }: ShippingCardProps) {
  const formatPrice = (price: number) => {
    if (price === 0) return "Gratis";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(method.id)}
      className={cn(
        "relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border text-left transition-all w-full",
        isSelected 
          ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm" 
          : "border-border bg-white hover:border-primary/50 hover:bg-muted/50",
        className
      )}
    >
      <div className="flex items-start sm:items-center gap-4">
        <div className={cn(
          "p-2.5 rounded-lg shrink-0",
          isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          {method.type === "delivery" ? <Truck className="w-5 h-5" /> : <Store className="w-5 h-5" />}
        </div>
        <div>
          <Typography as="h4" className="font-heading mb-1">
            {method.name}
          </Typography>
          <Typography variant="caption">
            {method.description} {method.estimatedDays && `(${method.estimatedDays})`}
          </Typography>
        </div>
      </div>
      <div className="sm:text-right mt-2 sm:mt-0 pl-14 sm:pl-0">
        <Typography as="span">
          {formatPrice(method.price)}
        </Typography>
      </div>
    </button>
  );
}
