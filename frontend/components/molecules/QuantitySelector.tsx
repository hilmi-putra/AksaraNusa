"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  return (
    <div className={cn("flex items-center border border-border rounded-md w-fit h-9", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="h-full w-9 rounded-none rounded-l-md hover:bg-muted text-muted-foreground hover:text-foreground"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <div className="w-10 flex items-center justify-center text-sm font-medium border-x border-border h-full">
        {quantity}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-full w-9 rounded-none rounded-r-md hover:bg-muted text-muted-foreground hover:text-foreground"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
