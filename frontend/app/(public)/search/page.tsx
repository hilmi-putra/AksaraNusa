"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Typography } from "@/components/atoms/Typography";
import { Search, Book, PenTool, FileText, ArrowRight, Clock, Flame } from "lucide-react";
import { mockSearchResults, recentSearches, popularSearches, SearchResult } from "@/lib/mock/search.mock";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL without full reload (shallow routing not explicitly needed in app router, just update state)
    const url = new URL(window.location.href);
    if (query.trim()) {
      url.searchParams.set("q", query);
    } else {
      url.searchParams.delete("q");
    }
    window.history.pushState({}, "", url);
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

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-border/50 overflow-hidden flex flex-col">
      {/* Search Header / Input */}
      <div className="flex items-center border-b border-border/50 bg-white z-10 shrink-0">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center px-6 md:px-8 h-24">
          <Search className="w-8 h-8 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Cari buku, penulis, layanan, atau artikel..."
            className="flex-1 bg-transparent border-none outline-none px-6 text-2xl text-ink font-medium placeholder:text-muted-foreground/60 focus:ring-0 w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Search Body */}
      <div className="flex-1 p-6 md:p-10 min-h-[500px]">
        {!query.trim() ? (
          // Initial State: Recent & Popular
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row gap-16 mt-8"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-8 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <Typography variant="h5" className="font-semibold uppercase tracking-wider text-muted-foreground m-0">Pencarian Terakhir</Typography>
              </div>
              <ul className="space-y-3">
                {recentSearches.map((item, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => setQuery(item)}
                      className="w-full text-left px-5 py-4 rounded-2xl hover:bg-muted/50 border border-transparent hover:border-border/50 hover:shadow-sm transition-all text-ink/80 flex justify-between items-center group text-lg"
                    >
                      <span className="font-medium">{item}</span>
                      <Search className="w-5 h-5 opacity-0 group-hover:opacity-100 text-primary-brand transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-8 text-primary-brand">
                <Flame className="w-5 h-5" />
                <Typography variant="h5" className="font-semibold uppercase tracking-wider text-primary-brand m-0">Populer</Typography>
              </div>
              <div className="flex flex-wrap gap-4">
                {popularSearches.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setQuery(item)}
                    className="px-6 py-3 bg-white rounded-full border border-border/50 hover:border-primary-brand/50 hover:text-primary-brand transition-colors text-base font-medium text-ink/80 shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : results.length > 0 ? (
          // Results State
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row gap-10"
          >
            {/* Left sidebar navigation for result types */}
            <div className="w-full md:w-64 shrink-0">
              <Typography variant="caption" className="text-muted-foreground font-semibold uppercase tracking-wider mb-6 block">Kategori</Typography>
              <ul className="space-y-2">
                {Object.keys(groupedResults).map((type) => (
                  <li key={type}>
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-ink">
                      <span className="font-medium capitalize flex items-center gap-3 text-lg">
                        <span className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            type === "book" ? "bg-amber-100 text-amber-700" :
                            type === "author" ? "bg-blue-100 text-blue-700" :
                            type === "article" ? "bg-emerald-100 text-emerald-700" :
                            "bg-primary-brand/10 text-primary-brand"
                          )}>
                          {getIconForType(type)}
                        </span>
                        {type === "book" ? "Buku" : type === "author" ? "Penulis" : type === "article" ? "Artikel" : "Layanan"}
                      </span>
                      <span className="bg-white border border-border/50 text-ink text-sm py-1 px-3 rounded-full font-bold shadow-sm">
                        {groupedResults[type].length}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main results list */}
            <div className="flex-1 space-y-10">
              {Object.entries(groupedResults).map(([type, items]) => (
                <div key={type} className="space-y-6">
                  <Typography variant="h5" className="text-ink font-semibold uppercase tracking-wider block">
                    {type === "book" ? "Buku" : type === "author" ? "Penulis" : type === "article" ? "Artikel" : "Layanan"}
                  </Typography>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {items.map((item) => (
                      <Link 
                        key={item.id} 
                        href={item.url}
                        className="group bg-white border border-border/50 rounded-2xl p-5 flex gap-5 hover:border-primary-brand/30 hover:shadow-md transition-all items-start"
                      >
                        <div className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                          type === "book" ? "bg-amber-100 text-amber-700" :
                          type === "author" ? "bg-blue-100 text-blue-700" :
                          type === "article" ? "bg-emerald-100 text-emerald-700" :
                          "bg-primary-brand/10 text-primary-brand"
                        )}>
                          {getIconForType(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-semibold text-xl text-ink group-hover:text-primary-brand transition-colors truncate">
                              {item.title}
                            </h4>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-brand opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 shrink-0 mt-1" />
                          </div>
                          <p className="text-base text-ink/70 line-clamp-1 mt-2">
                            {item.description}
                          </p>
                          {item.category && (
                            <div className="mt-4 flex items-center gap-2">
                              <span className="text-xs uppercase tracking-widest font-bold text-primary-brand bg-primary-brand/5 px-3 py-1 rounded-md">
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
          </motion.div>
        ) : (
          // No Results State
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-8">
              <Search className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <Typography variant="h3" className="text-ink mb-4">Tidak ada hasil ditemukan</Typography>
            <Typography variant="description" className="text-muted-foreground max-w-md mx-auto mt-0">
              Kami tidak dapat menemukan apa pun untuk "{query}". Coba gunakan kata kunci lain.
            </Typography>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Section className="bg-cream min-h-screen pt-32 pb-24">
      <Container className="max-w-5xl">
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading search...</div>}>
          <SearchContent />
        </Suspense>
      </Container>
    </Section>
  );
}
