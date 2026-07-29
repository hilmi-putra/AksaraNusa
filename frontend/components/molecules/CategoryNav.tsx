"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getPublicBlogCategories } from "@/lib/api/blog";

export function CategoryNav() {
  const [active, setActive] = useState("All articles");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getPublicBlogCategories();
        setCategories(response.data?.data || response.data || []);
      } catch (error) {
        console.error("Failed to fetch blog categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex items-center justify-start lg:justify-end gap-x-6 gap-y-3 min-w-max">
      <button
        onClick={() => setActive("All articles")}
        className={cn(
          "text-sm font-semibold transition-colors",
          active === "All articles" 
            ? "text-gradient-primary" 
            : "text-gray-500 hover:text-[#171512]"
        )}
      >
        All articles
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActive(cat.name)}
          className={cn(
            "text-sm font-semibold transition-colors",
            active === cat.name 
              ? "text-gradient-primary" 
              : "text-gray-500 hover:text-[#171512]"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
