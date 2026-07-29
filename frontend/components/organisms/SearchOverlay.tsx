"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight, Book, PenTool, FileText, ArrowRight, Clock, Flame } from "lucide-react";
import { Typography } from "@/components/atoms/Typography";
import { mockSearchResults, recentSearches, popularSearches, SearchResult } from "@/lib/mock/search.mock";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden"; // Prevent scrolling when overlay is open
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle search logic
  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = mockSearchResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle keyboard shortcuts (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "book":
        return <Book className="w-5 h-5" />;
      case "author":
        return <PenTool className="w-5 h-5" />;
      case "article":
      case "service":
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  // Group results by type for the UI
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex justify-center items-start pt-24 md:pt-28 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-ink/20 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Search Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-border/50"
          >
            {/* Search Header / Input */}
            <div className="flex items-center border-b border-border/50 bg-white z-10 shrink-0">
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center px-6 h-20">
                <Search className="w-6 h-6 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Cari buku, penulis, layanan, atau artikel..."
                  className="flex-1 bg-transparent border-none outline-none px-6 text-xl text-ink font-medium placeholder:text-muted-foreground/60 focus:ring-0 w-full"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground shrink-0 mr-4 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </form>
              
              <div className="flex items-center h-full px-6 border-l border-border/50 bg-muted/10 shrink-0">
                <button
                  onClick={() => query ? handleSearchSubmit({ preventDefault: () => {} } as any) : router.push('/search')}
                  className="flex items-center gap-2 text-sm font-semibold text-primary-brand hover:text-primary-brand/80 transition-colors"
                >
                  Buka di tab baru
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-cream/30 p-6 sm:p-8">
              {!query.trim() ? (
                // Initial State: Recent & Popular
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-6 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <Typography variant="caption" className="font-semibold uppercase tracking-wider m-0">Pencarian Terakhir</Typography>
                    </div>
                    <ul className="space-y-2">
                      {recentSearches.map((item, idx) => (
                        <li key={idx}>
                          <button 
                            onClick={() => setQuery(item)}
                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-white border border-transparent hover:border-border/50 hover:shadow-sm transition-all text-ink/80 flex justify-between items-center group"
                          >
                            <span className="font-medium">{item}</span>
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-primary-brand transition-opacity" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-6 text-primary-brand">
                      <Flame className="w-4 h-4" />
                      <Typography variant="caption" className="font-semibold uppercase tracking-wider m-0">Populer</Typography>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {popularSearches.map((item, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setQuery(item)}
                          className="px-4 py-2 bg-white rounded-full border border-border/50 hover:border-primary-brand/50 hover:text-primary-brand transition-colors text-sm font-medium text-ink/80 shadow-sm"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length > 0 ? (
                // Results State
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left sidebar navigation for result types */}
                  <div className="w-full md:w-48 shrink-0">
                    <Typography variant="caption" className="text-muted-foreground font-semibold uppercase tracking-wider mb-4 block">Kategori</Typography>
                    <ul className="space-y-1">
                      {Object.keys(groupedResults).map((type) => (
                        <li key={type}>
                          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white shadow-sm border border-border/50 text-primary-brand mb-2">
                            <span className="font-medium capitalize flex items-center gap-2">
                              {getIconForType(type)}
                              {type === "book" ? "Buku" : type === "author" ? "Penulis" : type === "article" ? "Artikel" : "Layanan"}
                            </span>
                            <span className="bg-primary-brand/10 text-primary-brand text-xs py-0.5 px-2 rounded-full font-bold">
                              {groupedResults[type].length}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Main results list */}
                  <div className="flex-1 space-y-6">
                    {Object.entries(groupedResults).map(([type, items]) => (
                      <div key={type} className="space-y-4">
                        <Typography variant="caption" className="text-muted-foreground font-semibold uppercase tracking-wider block md:hidden">
                          {type === "book" ? "Buku" : type === "author" ? "Penulis" : type === "article" ? "Artikel" : "Layanan"}
                        </Typography>
                        
                        <div className="grid grid-cols-1 gap-3">
                          {items.map((item) => (
                            <Link 
                              key={item.id} 
                              href={item.url}
                              onClick={onClose}
                              className="group bg-white border border-border/50 rounded-2xl p-4 flex gap-4 hover:border-primary-brand/30 hover:shadow-md transition-all items-start"
                            >
                              <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                                type === "book" ? "bg-amber-100 text-amber-700" :
                                type === "author" ? "bg-blue-100 text-blue-700" :
                                type === "article" ? "bg-emerald-100 text-emerald-700" :
                                "bg-primary-brand/10 text-primary-brand"
                              )}>
                                {getIconForType(item.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                  <h4 className="font-semibold text-ink group-hover:text-primary-brand transition-colors truncate">
                                    {item.title}
                                  </h4>
                                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-brand opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 shrink-0 mt-1" />
                                </div>
                                <p className="text-sm text-ink/60 line-clamp-1 mt-1">
                                  {item.description}
                                </p>
                                {item.category && (
                                  <div className="mt-3 flex items-center gap-2">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                                      {item.category}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // No Results State
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <Search className="w-10 h-10 text-muted-foreground/30" />
                  </div>
                  <Typography variant="h4" className="text-ink mb-2">Tidak ada hasil ditemukan</Typography>
                  <Typography variant="p" className="text-muted-foreground max-w-md mt-0">
                    Kami tidak dapat menemukan apa pun untuk "{query}". Coba gunakan kata kunci lain.
                  </Typography>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-white border-t border-border/50 py-3 px-6 text-center shrink-0">
              <Typography variant="caption" className="text-muted-foreground">
                Gunakan <kbd className="bg-muted px-2 py-1 rounded text-xs font-mono mx-1">Esc</kbd> untuk menutup
              </Typography>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
